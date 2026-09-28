const registry = new Map();

export function createSeededRng(seed = 1) {
    let value = (Number(seed) || 1) >>> 0;
    return () => {
        value = (value + 0x6D2B79F5) >>> 0;
        let t = value;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

export function randomInt(rng, min, max) {
    return Math.floor(rng() * (max - min + 1)) + min;
}

export function choose(rng, items) {
    if (!Array.isArray(items) || items.length === 0) throw new Error('Cannot choose from an empty list.');
    return items[Math.floor(rng() * items.length)];
}

export function shuffle(rng, items) {
    const copy = [...items];
    for (let index = copy.length - 1; index > 0; index -= 1) {
        const swap = Math.floor(rng() * (index + 1));
        [copy[index], copy[swap]] = [copy[swap], copy[index]];
    }
    return copy;
}

export function registerGeneratorPack(packId, generators) {
    if (!packId || !generators || typeof generators !== 'object') {
        throw new TypeError('Generator packs need an id and generator object.');
    }
    for (const [name, generator] of Object.entries(generators)) {
        if (typeof generator !== 'function') throw new TypeError(`Generator ${name} is not a function.`);
        const id = `${packId}:${name}`;
        if (registry.has(id)) throw new Error(`Generator already registered: ${id}`);
        registry.set(id, generator);
    }
}

export function unregisterGeneratorPack(packId) {
    const prefix = `${packId}:`;
    for (const id of [...registry.keys()]) if (id.startsWith(prefix)) registry.delete(id);
}

export function hasGenerator(id) {
    return registry.has(id);
}

export function listGenerators() {
    return [...registry.keys()].sort();
}

export function generateQuestion(generatorId, context = {}) {
    const generator = registry.get(generatorId);
    if (!generator) throw new Error(`Unknown question generator: ${generatorId}`);
    const rng = context.rng || Math.random;
    const raw = generator({ ...context, rng });
    return normalizeQuestion(raw, generatorId, context);
}

export function normalizeQuestion(raw, generatorId = '', context = {}) {
    if (!raw || typeof raw !== 'object') throw new TypeError(`Generator ${generatorId} returned no question.`);
    const question = {
        id: String(raw.id || `${generatorId}-${Math.floor((context.rng || Math.random)() * 1e9)}`),
        generatorId,
        lessonId: String(raw.lessonId || context.lessonId || ''),
        conceptId: String(raw.conceptId || context.conceptId || context.lessonId || ''),
        difficulty: raw.difficulty || context.difficulty || 'standard',
        prompt: String(raw.prompt || ''),
        type: raw.type || (raw.choices ? 'choice' : 'input'),
        answer: raw.answer,
        choices: raw.choices ? normalizeChoices(raw.choices, raw.answer) : null,
        hints: Array.isArray(raw.hints) ? raw.hints.map(String) : [],
        explanation: String(raw.explanation || ''),
        solutionSteps: Array.isArray(raw.solutionSteps) ? raw.solutionSteps.map(String) : [],
        review: raw.review ? String(raw.review) : '',
        metadata: raw.metadata && typeof raw.metadata === 'object' ? { ...raw.metadata } : {}
    };
    if (!question.prompt.trim()) throw new TypeError(`Generator ${generatorId} returned a blank prompt.`);
    if (!question.answer || typeof question.answer !== 'object' || !question.answer.kind) {
        throw new TypeError(`Generator ${generatorId} returned an invalid answer contract.`);
    }
    return question;
}

function normalizeChoices(choices, answer) {
    const seen = new Set();
    const normalized = [];
    for (const choice of choices) {
        const item = typeof choice === 'object' ? { ...choice } : { id: String(choice), text: String(choice) };
        item.id = String(item.id ?? item.value ?? item.text);
        item.text = String(item.text ?? item.value ?? item.id);
        const key = item.text.trim().toLowerCase();
        if (!seen.has(key)) {
            seen.add(key);
            normalized.push(item);
        }
    }
    const correct = String(answer.value);
    if (!normalized.some(choice => choice.id === correct || choice.text === correct)) {
        throw new Error('Multiple-choice question does not contain its correct answer.');
    }
    if (normalized.length < 2) throw new Error('Multiple-choice question needs at least two distinct choices.');
    return normalized;
}
