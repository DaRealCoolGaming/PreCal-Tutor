import { shuffle, randomInt, choose } from './generators.js';

export function nonZeroInt(rng, min = -6, max = 6) {
    let value = 0;
    while (value === 0) value = randomInt(rng, min, max);
    return value;
}

export function gcd(a, b) {
    a = Math.abs(Math.trunc(a)); b = Math.abs(Math.trunc(b));
    while (b) [a, b] = [b, a % b];
    return a || 1;
}

export function fractionText(n, d = 1) {
    if (d === 0) return 'undefined';
    if (d < 0) { n = -n; d = -d; }
    const g = gcd(n, d); n /= g; d /= g;
    return d === 1 ? String(n) : `${n}/${d}`;
}

export function signed(n) {
    return n < 0 ? `− ${Math.abs(n)}` : `+ ${n}`;
}

export function linearText(a, b, variable = 'x') {
    const aText = a === 1 ? variable : a === -1 ? `−${variable}` : `${a}${variable}`;
    if (b === 0) return aText;
    return `${aText} ${signed(b)}`;
}

export function choiceQuestion({ rng, prompt, correct, distractors, explanation, steps = [], hints = [], review = '', feedback = {}, conceptId, difficulty }) {
    const values = [String(correct), ...distractors.map(String)].filter((value, index, array) => array.indexOf(value) === index);
    if (values.length < 4) throw new Error(`Question needs four distinct visible choices; got ${values.length}.`);
    const choices = shuffle(rng, values.slice(0, 4)).map((text, index) => ({
        id: `c${index}-${text}`,
        text,
        feedback: text === String(correct) ? '' : feedback[text] || 'That choice reflects a common setup error. Recheck the defining property before calculating.'
    }));
    const right = choices.find(item => item.text === String(correct));
    return {
        prompt,
        conceptId,
        difficulty,
        type: 'choice',
        answer: { kind: 'choice', value: right.id },
        choices,
        explanation,
        solutionSteps: steps,
        hints,
        review
    };
}

export function numberQuestion({ prompt, value, tolerance = 1e-8, explanation, steps = [], hints = [], review = '', conceptId, difficulty }) {
    return {
        prompt,
        conceptId,
        difficulty,
        type: 'input',
        answer: { kind: 'number', value, tolerance },
        explanation,
        solutionSteps: steps,
        hints,
        review
    };
}

export function textQuestion({ prompt, answer, accepted = [], explanation, steps = [], hints = [], review = '', conceptId, difficulty }) {
    return {
        prompt,
        conceptId,
        difficulty,
        type: 'input',
        answer: { kind: 'text', value: answer, accepted: [answer, ...accepted] },
        explanation,
        solutionSteps: steps,
        hints,
        review
    };
}

export { randomInt, choose };
