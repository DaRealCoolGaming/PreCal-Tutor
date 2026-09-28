export const STORAGE_KEY = 'precalc-classroom-core-v1';
export const SCHEMA_VERSION = 1;

const LEGACY_KEYS = [
    'precalc-classroom-v3',
    'precalc-classroom-v1'
];

export function createDefaultState(now = Date.now()) {
    return {
        schemaVersion: SCHEMA_VERSION,
        navigation: {
            lastRoute: '#/home',
            lastLessonId: '1.1'
        },
        lessons: {},
        mistakes: {},
        recentAttempts: [],
        settings: {
            practiceDifficulty: 'standard',
            reducedMotion: false
        },
        meta: {
            createdAt: now,
            updatedAt: now
        }
    };
}

function isRecord(value) {
    return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function clone(value) {
    if (typeof structuredClone === 'function') {
        return structuredClone(value);
    }
    return JSON.parse(JSON.stringify(value));
}

function sanitizeLessonProgress(value = {}) {
    const source = isRecord(value) ? value : {};
    const count = key => Math.max(0, Number(source[key]) || 0);

    return {
        visits: count('visits'),
        attempts: count('attempts'),
        correct: count('correct'),
        guidedAttempts: count('guidedAttempts'),
        guidedCorrect: count('guidedCorrect'),
        masteryAttempts: count('masteryAttempts'),
        masteryCorrect: count('masteryCorrect'),
        lastVisitedAt: count('lastVisitedAt'),
        firstVisitedAt: count('firstVisitedAt')
    };
}

function sanitizeState(value, now = Date.now()) {
    const defaults = createDefaultState(now);
    if (!isRecord(value)) return defaults;

    const lessons = {};
    if (isRecord(value.lessons)) {
        Object.entries(value.lessons).forEach(([lessonId, progress]) => {
            if (/^\d+\.\d+$/.test(lessonId)) {
                lessons[lessonId] = sanitizeLessonProgress(progress);
            }
        });
    }

    const mistakes = isRecord(value.mistakes) ? clone(value.mistakes) : {};
    const recentAttempts = Array.isArray(value.recentAttempts)
        ? value.recentAttempts.filter(isRecord).slice(0, 100)
        : [];

    return {
        schemaVersion: SCHEMA_VERSION,
        navigation: {
            lastRoute: String(value.navigation?.lastRoute || defaults.navigation.lastRoute),
            lastLessonId: /^\d+\.\d+$/.test(value.navigation?.lastLessonId || '')
                ? value.navigation.lastLessonId
                : defaults.navigation.lastLessonId
        },
        lessons,
        mistakes,
        recentAttempts,
        settings: {
            ...defaults.settings,
            ...(isRecord(value.settings) ? value.settings : {})
        },
        meta: {
            createdAt: Number(value.meta?.createdAt) || defaults.meta.createdAt,
            updatedAt: Number(value.meta?.updatedAt) || defaults.meta.updatedAt
        }
    };
}

function migrateLegacyV3(value, now) {
    const migrated = createDefaultState(now);
    migrated.navigation.lastLessonId = /^\d+\.\d+$/.test(value.lastLesson || '')
        ? value.lastLesson
        : migrated.navigation.lastLessonId;
    migrated.lessons = isRecord(value.lessons) ? value.lessons : {};
    migrated.mistakes = isRecord(value.mistakes) ? value.mistakes : {};
    migrated.recentAttempts = Array.isArray(value.recentAttempts) ? value.recentAttempts : [];
    migrated.settings = {
        ...migrated.settings,
        ...(isRecord(value.settings) ? value.settings : {})
    };
    return sanitizeState(migrated, now);
}

function migrateLegacyV1(value, now) {
    const migrated = createDefaultState(now);
    migrated.navigation.lastLessonId = /^\d+\.\d+$/.test(value.last || '')
        ? value.last
        : migrated.navigation.lastLessonId;

    for (const lessonId of Array.isArray(value.done) ? value.done : []) {
        if (!/^\d+\.\d+$/.test(lessonId)) continue;
        migrated.lessons[lessonId] = {
            visits: 1,
            attempts: 5,
            correct: 4,
            guidedAttempts: 0,
            guidedCorrect: 0,
            masteryAttempts: 5,
            masteryCorrect: 4,
            lastVisitedAt: now,
            firstVisitedAt: now
        };
    }

    return sanitizeState(migrated, now);
}

function readJson(storage, key) {
    const raw = storage?.getItem?.(key);
    if (!raw) return null;
    return JSON.parse(raw);
}

function loadInitialState(storage, key, now) {
    if (!storage) return createDefaultState(now);

    try {
        const current = readJson(storage, key);
        if (current) {
            return sanitizeState(current, now);
        }
    } catch (error) {
        console.warn('Saved progress was unreadable. A fresh local state will be used.', error);
    }

    for (const legacyKey of LEGACY_KEYS) {
        try {
            const legacy = readJson(storage, legacyKey);
            if (!legacy) continue;

            const migrated = legacyKey.endsWith('-v3')
                ? migrateLegacyV3(legacy, now)
                : migrateLegacyV1(legacy, now);

            return migrated;
        } catch (error) {
            console.warn(`Could not migrate progress from ${legacyKey}.`, error);
        }
    }

    return createDefaultState(now);
}

function resolveBrowserStorage() {
    try {
        return globalThis.localStorage || null;
    } catch {
        return null;
    }
}

export function createStore({
    storage = resolveBrowserStorage(),
    key = STORAGE_KEY,
    now = () => Date.now()
} = {}) {
    let state = loadInitialState(storage, key, now());
    const subscribers = new Set();

    function persist() {
        if (!storage?.setItem) return false;
        try {
            storage.setItem(key, JSON.stringify(state));
            return true;
        } catch (error) {
            console.warn('Progress could not be saved in this browser.', error);
            return false;
        }
    }

    function notify() {
        const snapshot = getState();
        subscribers.forEach(listener => listener(snapshot));
    }

    function getState() {
        return clone(state);
    }

    function replace(nextState, { save = true } = {}) {
        state = sanitizeState(nextState, now());
        state.meta.updatedAt = now();
        if (save) persist();
        notify();
        return getState();
    }

    function update(mutator, { save = true } = {}) {
        if (typeof mutator !== 'function') {
            throw new TypeError('Store update requires a function.');
        }

        const draft = getState();
        const result = mutator(draft);
        const nextState = result === undefined ? draft : result;
        return replace(nextState, { save });
    }

    function subscribe(listener, { immediate = false } = {}) {
        if (typeof listener !== 'function') {
            throw new TypeError('Store subscriber must be a function.');
        }

        subscribers.add(listener);
        if (immediate) listener(getState());
        return () => subscribers.delete(listener);
    }

    function reset() {
        state = createDefaultState(now());
        persist();
        notify();
        return getState();
    }

    function exportState() {
        return JSON.stringify(state, null, 2);
    }

    function importState(serialized) {
        const parsed = typeof serialized === 'string' ? JSON.parse(serialized) : serialized;
        return replace(parsed);
    }

    // Save migrated/default data once so future reads use the canonical key.
    persist();

    return {
        getState,
        update,
        replace,
        reset,
        subscribe,
        exportState,
        importState,
        persist
    };
}
