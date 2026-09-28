import { generateQuestion } from './generators.js';
import { evaluateAnswer } from './feedback.js';
import { masteryRecommendation, recommendedQuestionCount, summarizeResults } from './mastery.js';

const VALID_MODES = new Set(['guided', 'independent', 'mastery', 'review']);
const VALID_DIFFICULTIES = new Set(['easy', 'standard', 'challenge', 'mixed']);

export function createPracticeEngine({ progressTracker = null, rng = Math.random } = {}) {
    let session = null;

    function start({ lesson, mode = 'independent', difficulty = 'standard', count } = {}) {
        validateLesson(lesson);
        if (!VALID_MODES.has(mode)) throw new Error(`Unknown practice mode: ${mode}`);
        if (!VALID_DIFFICULTIES.has(difficulty)) throw new Error(`Unknown difficulty: ${difficulty}`);
        const total = recommendedQuestionCount(mode, count);
        const seenPrompts = new Set();
        const questions = Array.from({ length: total }, (_, index) => {
            let question = buildQuestion(lesson, difficulty, mode, index);
            for (let retry = 0; retry < 5 && seenPrompts.has(normalizePrompt(question.prompt)); retry += 1) {
                question = buildQuestion(lesson, difficulty, mode, index + retry + 1);
            }
            seenPrompts.add(normalizePrompt(question.prompt));
            return question;
        });
        session = {
            lessonId: lesson.id,
            lessonTitle: lesson.title,
            mode,
            difficulty,
            questions,
            index: 0,
            answers: Array(total).fill(null),
            hintsUsed: Array(total).fill(0),
            complete: false
        };
        return snapshot();
    }

    function buildQuestion(lesson, difficulty, mode, index) {
        const pool = resolveGeneratorPool(lesson, difficulty, mode);
        if (!pool.length) throw new Error(`Lesson ${lesson.id} has no generators for ${difficulty} practice.`);
        const generatorId = pool[index % pool.length];
        return generateQuestion(generatorId, {
            rng,
            lessonId: lesson.id,
            conceptId: lesson.conceptId || lesson.id,
            difficulty: difficulty === 'mixed' ? ['easy', 'standard', 'challenge'][index % 3] : difficulty
        });
    }

    function answer(response) {
        ensureSession();
        if (session.complete) throw new Error('This practice session is already complete.');
        const index = session.index;
        if (session.answers[index]) return session.answers[index];
        const question = session.questions[index];
        const feedback = evaluateAnswer(question, response);
        session.answers[index] = { ...feedback, questionId: question.id };
        progressTracker?.recordAttempt?.({
            lessonId: session.lessonId,
            conceptId: question.conceptId,
            correct: feedback.correct,
            mode: session.mode,
            questionId: question.id,
            generatorId: question.generatorId,
            difficulty: question.difficulty
        });
        return { ...session.answers[index] };
    }

    function hint() {
        ensureSession();
        const question = session.questions[session.index];
        const used = session.hintsUsed[session.index];
        const hints = question.hints || [];
        if (!hints.length) return null;
        const next = hints[Math.min(used, hints.length - 1)];
        session.hintsUsed[session.index] = Math.min(used + 1, hints.length);
        return { text: next, level: session.hintsUsed[session.index], total: hints.length };
    }

    function next() {
        ensureSession();
        if (!session.answers[session.index]) throw new Error('Answer the current question before continuing.');
        if (session.index >= session.questions.length - 1) {
            session.complete = true;
            return summary();
        }
        session.index += 1;
        return snapshot();
    }

    function morePractice({ lesson, difficulty = session?.difficulty || 'standard', count } = {}) {
        if (!lesson || lesson.id !== session?.lessonId) {
            throw new Error('More Practice must stay inside the current lesson.');
        }
        return start({ lesson, mode: 'independent', difficulty, count });
    }

    function summary() {
        ensureSession();
        const stats = summarizeResults(session.answers.filter(Boolean));
        return { ...stats, lessonId: session.lessonId, recommendation: masteryRecommendation(stats) };
    }

    function snapshot() {
        ensureSession();
        return {
            lessonId: session.lessonId,
            lessonTitle: session.lessonTitle,
            mode: session.mode,
            difficulty: session.difficulty,
            index: session.index,
            total: session.questions.length,
            question: { ...session.questions[session.index] },
            answered: Boolean(session.answers[session.index]),
            complete: session.complete
        };
    }

    function getSession() {
        if (!session) return null;
        return {
            ...session,
            questions: session.questions.map(question => ({ ...question })),
            answers: session.answers.map(answer => answer ? { ...answer } : null),
            hintsUsed: [...session.hintsUsed]
        };
    }

    function ensureSession() {
        if (!session) throw new Error('Start a practice session first.');
    }

    function resolveGeneratorPool(lesson, difficulty, mode) {
        const source = lesson.generators;
        const difficultyPool = Array.isArray(source)
            ? source
            : !source || typeof source !== 'object'
                ? []
                : difficulty === 'mixed'
                    ? [...new Set(Object.values(source).flat())]
                    : source[difficulty] || source.standard || [];

        const modePool = mode === 'guided'
            ? lesson.guidedPractice
            : mode === 'mastery'
                ? lesson.mastery
                : mode === 'independent'
                    ? lesson.independentPractice
                    : null;

        if (!Array.isArray(modePool) || modePool.length === 0) return difficultyPool;
        if (!difficultyPool.length) return [...modePool];
        const intersection = modePool.filter(generatorId => difficultyPool.includes(generatorId));
        return intersection.length ? intersection : [...modePool];
    }

    return { start, answer, hint, next, morePractice, summary, getSession };
}

function normalizePrompt(prompt) {
    return String(prompt || '').trim().replace(/\s+/g, ' ').toLowerCase();
}

function validateLesson(lesson) {
    if (!lesson?.id || !lesson?.title) throw new TypeError('Practice requires a lesson with id and title.');
}
