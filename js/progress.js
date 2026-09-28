const VALID_MODES = new Set(['guided', 'independent', 'mastery', 'review']);
const VALID_DIFFICULTIES = new Set(['easy', 'standard', 'challenge', 'mixed']);

export const MASTERY_STATUS = Object.freeze({
    NOT_STARTED: 'not-started',
    LEARNING: 'learning',
    PRACTICING: 'practicing',
    ALMOST_THERE: 'almost-there',
    MASTERED: 'mastered'
});

export function statusLabel(status) {
    return ({
        [MASTERY_STATUS.NOT_STARTED]: 'Not started',
        [MASTERY_STATUS.LEARNING]: 'Learning',
        [MASTERY_STATUS.PRACTICING]: 'Practicing',
        [MASTERY_STATUS.ALMOST_THERE]: 'Almost there',
        [MASTERY_STATUS.MASTERED]: 'Mastered'
    })[status] || 'Not started';
}

function emptyLessonProgress() {
    return {
        visits: 0,
        attempts: 0,
        correct: 0,
        guidedAttempts: 0,
        guidedCorrect: 0,
        masteryAttempts: 0,
        masteryCorrect: 0,
        lastVisitedAt: 0,
        firstVisitedAt: 0
    };
}

function ensureLesson(state, lessonId) {
    if (!/^\d+\.\d+$/.test(lessonId)) {
        throw new Error(`Invalid lesson id: ${lessonId}`);
    }

    if (!state.lessons[lessonId]) {
        state.lessons[lessonId] = emptyLessonProgress();
    }

    return state.lessons[lessonId];
}

export function deriveMasteryStatus(progress = emptyLessonProgress()) {
    const visits = Number(progress.visits) || 0;
    const attempts = Number(progress.attempts) || 0;
    const correct = Number(progress.correct) || 0;
    const masteryAttempts = Number(progress.masteryAttempts) || 0;
    const masteryCorrect = Number(progress.masteryCorrect) || 0;

    if (visits === 0 && attempts === 0) {
        return MASTERY_STATUS.NOT_STARTED;
    }

    const accuracy = attempts ? correct / attempts : 0;
    const masteryAccuracy = masteryAttempts ? masteryCorrect / masteryAttempts : 0;

    if (masteryAttempts >= 5 && masteryAccuracy >= 0.8) {
        return MASTERY_STATUS.MASTERED;
    }

    if ((attempts >= 8 && accuracy >= 0.7) || (masteryAttempts >= 3 && masteryAccuracy >= 2 / 3)) {
        return MASTERY_STATUS.ALMOST_THERE;
    }

    if (attempts >= 4) {
        return MASTERY_STATUS.PRACTICING;
    }

    return MASTERY_STATUS.LEARNING;
}

export function createProgressTracker(store, { now = () => Date.now() } = {}) {
    if (!store?.getState || !store?.update) {
        throw new TypeError('Progress tracker requires a compatible store.');
    }

    function getLessonProgress(lessonId) {
        const state = store.getState();
        const progress = state.lessons[lessonId] || emptyLessonProgress();
        return {
            ...progress,
            status: deriveMasteryStatus(progress),
            accuracy: progress.attempts ? progress.correct / progress.attempts : null,
            masteryAccuracy: progress.masteryAttempts
                ? progress.masteryCorrect / progress.masteryAttempts
                : null
        };
    }

    function visitLesson(lessonId, { route = `#/lesson/${lessonId}` } = {}) {
        const timestamp = now();
        store.update(state => {
            const progress = ensureLesson(state, lessonId);
            progress.visits += 1;
            progress.lastVisitedAt = timestamp;
            if (!progress.firstVisitedAt) progress.firstVisitedAt = timestamp;
            state.navigation.lastLessonId = lessonId;
            state.navigation.lastRoute = route;
        });
        return getLessonProgress(lessonId);
    }

    function recordRoute(route) {
        store.update(state => {
            state.navigation.lastRoute = String(route || '#/home');
        });
    }

    function recordAttempt({
        lessonId,
        conceptId = lessonId,
        correct,
        mode = 'independent',
        questionId = '',
        generatorId = '',
        difficulty = 'standard'
    }) {
        if (!VALID_MODES.has(mode)) {
            throw new Error(`Unknown practice mode: ${mode}`);
        }
        if (!VALID_DIFFICULTIES.has(difficulty)) {
            throw new Error(`Unknown difficulty: ${difficulty}`);
        }

        const timestamp = now();
        const wasCorrect = Boolean(correct);

        store.update(state => {
            const progress = ensureLesson(state, lessonId);
            progress.attempts += 1;
            if (wasCorrect) progress.correct += 1;
            progress.lastVisitedAt = timestamp;
            if (!progress.firstVisitedAt) progress.firstVisitedAt = timestamp;

            if (mode === 'guided') {
                progress.guidedAttempts += 1;
                if (wasCorrect) progress.guidedCorrect += 1;
            }

            if (mode === 'mastery') {
                progress.masteryAttempts += 1;
                if (wasCorrect) progress.masteryCorrect += 1;
            }

            const conceptKey = String(conceptId || lessonId);
            const existing = state.mistakes[conceptKey] || {
                lessonId,
                misses: 0,
                correctStreak: 0,
                lastMissedAt: 0,
                lastSeenAt: 0
            };

            existing.lessonId = lessonId;
            existing.lastSeenAt = timestamp;

            if (wasCorrect) {
                existing.correctStreak += 1;
                if (existing.correctStreak >= 3) {
                    delete state.mistakes[conceptKey];
                } else if (existing.misses > 0) {
                    state.mistakes[conceptKey] = existing;
                }
            } else {
                existing.misses += 1;
                existing.correctStreak = 0;
                existing.lastMissedAt = timestamp;
                state.mistakes[conceptKey] = existing;
            }

            state.recentAttempts.unshift({
                lessonId,
                conceptId: conceptKey,
                correct: wasCorrect,
                mode,
                questionId,
                generatorId,
                difficulty,
                at: timestamp
            });
            state.recentAttempts = state.recentAttempts.slice(0, 100);
            state.navigation.lastLessonId = lessonId;
        });

        return getLessonProgress(lessonId);
    }

    function getMistakes({ limit = 12 } = {}) {
        const state = store.getState();
        return Object.entries(state.mistakes)
            .map(([conceptId, value]) => ({ conceptId, ...value }))
            .sort((a, b) => {
                const aWeight = a.misses * 3 - a.correctStreak;
                const bWeight = b.misses * 3 - b.correctStreak;
                return bWeight - aWeight || b.lastMissedAt - a.lastMissedAt;
            })
            .slice(0, Math.max(0, limit));
    }

    function getReviewCandidates(courseUnits = [], { limit = 8 } = {}) {
        const timestamp = now();
        const mistakeLessons = new Set(Object.values(store.getState().mistakes || {}).map(item => item.lessonId));
        const lessonIds = courseUnits.flatMap(unit => Array.isArray(unit.lessons) ? unit.lessons.map(lesson => lesson.id) : []);
        const DAY = 24 * 60 * 60 * 1000;

        return lessonIds
            .map(lessonId => {
                const item = getLessonProgress(lessonId);
                if (item.status === MASTERY_STATUS.NOT_STARTED) return null;
                const age = Math.max(0, timestamp - Number(item.lastVisitedAt || item.firstVisitedAt || timestamp));
                const threshold = item.status === MASTERY_STATUS.MASTERED
                    ? 4 * DAY
                    : item.status === MASTERY_STATUS.ALMOST_THERE
                        ? 2 * DAY
                        : 1 * DAY;
                const overdue = age >= threshold;
                const hasMistake = mistakeLessons.has(lessonId);
                if (!overdue && !hasMistake) return null;
                return {
                    lessonId,
                    status: item.status,
                    ageDays: Math.floor(age / DAY),
                    reason: hasMistake ? 'Recent mistakes' : 'Time for a refresh',
                    priority: (hasMistake ? 100 : 0) + age / DAY + (item.status === MASTERY_STATUS.MASTERED ? 0 : 20)
                };
            })
            .filter(Boolean)
            .sort((a, b) => b.priority - a.priority)
            .slice(0, Math.max(0, limit));
    }

    function getCourseStats(courseUnits = []) {
        const lessonIds = courseUnits.flatMap(unit =>
            Array.isArray(unit.lessons) ? unit.lessons.map(lesson => lesson.id) : []
        );
        const progress = lessonIds.map(getLessonProgress);
        const mastered = progress.filter(item => item.status === MASTERY_STATUS.MASTERED).length;
        const started = progress.filter(item => item.status !== MASTERY_STATUS.NOT_STARTED).length;
        const attempts = progress.reduce((sum, item) => sum + item.attempts, 0);
        const correct = progress.reduce((sum, item) => sum + item.correct, 0);

        return {
            totalLessons: lessonIds.length,
            started,
            mastered,
            masteryPercent: lessonIds.length ? Math.round(mastered / lessonIds.length * 100) : 0,
            attempts,
            accuracyPercent: attempts ? Math.round(correct / attempts * 100) : null
        };
    }

    function getUnitStats(unit) {
        const lessons = Array.isArray(unit?.lessons) ? unit.lessons : [];
        const progress = lessons.map(lesson => getLessonProgress(lesson.id));
        const mastered = progress.filter(item => item.status === MASTERY_STATUS.MASTERED).length;
        const started = progress.filter(item => item.status !== MASTERY_STATUS.NOT_STARTED).length;

        return {
            totalLessons: lessons.length,
            started,
            mastered,
            masteryPercent: lessons.length ? Math.round(mastered / lessons.length * 100) : 0
        };
    }

    function setPracticeDifficulty(difficulty) {
        if (!VALID_DIFFICULTIES.has(difficulty)) {
            throw new Error(`Unknown difficulty: ${difficulty}`);
        }

        store.update(state => {
            state.settings.practiceDifficulty = difficulty;
        });
    }

    function getPracticeDifficulty() {
        const difficulty = store.getState().settings?.practiceDifficulty;
        return VALID_DIFFICULTIES.has(difficulty) ? difficulty : 'standard';
    }

    function resetProgress() {
        return store.reset();
    }

    return {
        getLessonProgress,
        visitLesson,
        recordRoute,
        recordAttempt,
        getMistakes,
        getReviewCandidates,
        getCourseStats,
        getUnitStats,
        getPracticeDifficulty,
        setPracticeDifficulty,
        resetProgress
    };
}
