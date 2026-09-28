import { COURSE } from '../data/course.js';

const unitCache = new Map();
const restoredUnits = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);

export function markUnitRestored(unitNumber) {
    const number = Number(unitNumber);
    if (!Number.isInteger(number) || number < 1 || number > COURSE.units.length) {
        throw new RangeError(`Invalid unit number: ${unitNumber}`);
    }
    restoredUnits.add(number);
}

export function getCourse() {
    return COURSE;
}

export function getUnitMeta(unitNumber) {
    return COURSE.units.find(unit => unit.number === Number(unitNumber)) || null;
}

export function getLessonMeta(lessonId) {
    const match = /^(\d+)\.(\d+)$/.exec(String(lessonId));
    if (!match) return null;
    const unit = getUnitMeta(Number(match[1]));
    return unit?.lessons.find(lesson => lesson.id === lessonId) || null;
}

export function isUnitRestored(unitNumber) {
    return restoredUnits.has(Number(unitNumber));
}

export async function loadUnit(unitNumber) {
    const number = Number(unitNumber);
    const meta = getUnitMeta(number);
    if (!meta) throw new RangeError(`Unknown unit: ${unitNumber}`);

    if (!restoredUnits.has(number)) {
        return {
            ...meta,
            restored: false,
            lessons: meta.lessons.map(lesson => ({ ...lesson, restored: false }))
        };
    }

    if (!unitCache.has(number)) {
        unitCache.set(number, import(`../data/unit-${number}.js`).then(module => {
            const unit = module.default || module.unit;
            validateAuthoredUnit(unit, meta);
            return unit;
        }));
    }

    return unitCache.get(number);
}

export async function loadLesson(lessonId) {
    const meta = getLessonMeta(lessonId);
    if (!meta) return null;
    const unitNumber = Number(lessonId.split('.')[0]);
    const unit = await loadUnit(unitNumber);
    const lesson = unit.lessons.find(item => item.id === lessonId);
    return lesson ? { ...meta, ...lesson, restored: Boolean(unit.restored ?? true) } : null;
}

export function validateAuthoredUnit(unit, meta) {
    if (!unit || Number(unit.number) !== meta.number || !Array.isArray(unit.lessons)) {
        throw new TypeError(`Unit ${meta.number} has an invalid authored module.`);
    }
    const expected = new Set(meta.lessons.map(lesson => lesson.id));
    const actual = new Set(unit.lessons.map(lesson => lesson.id));
    for (const id of expected) {
        if (!actual.has(id)) throw new Error(`Unit ${meta.number} is missing lesson ${id}.`);
    }
    if (actual.size !== expected.size) {
        throw new Error(`Unit ${meta.number} has unexpected or duplicate lesson ids.`);
    }
    unit.lessons.forEach(validateLessonShape);
    return true;
}

export function validateLessonShape(lesson) {
    const requiredStrings = ['id', 'title', 'summary'];
    for (const key of requiredStrings) {
        if (typeof lesson?.[key] !== 'string' || !lesson[key].trim()) {
            throw new TypeError(`Lesson ${lesson?.id || '(unknown)'} is missing ${key}.`);
        }
    }
    for (const key of ['objectives', 'prerequisites', 'sections', 'workedExamples', 'commonMistakes', 'guidedPractice', 'independentPractice', 'mastery']) {
        if (!Array.isArray(lesson[key]) || lesson[key].length === 0) {
            throw new TypeError(`Lesson ${lesson.id} must include non-empty ${key}.`);
        }
    }
    return true;
}
