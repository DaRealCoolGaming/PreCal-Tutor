const FUNCTIONS = {
    sqrt: Math.sqrt,
    abs: Math.abs,
    sin: Math.sin,
    cos: Math.cos,
    tan: Math.tan
};

export function normalizeText(value) {
    return String(value ?? '').trim().replace(/\s+/g, ' ').toLowerCase();
}

export function parseMathInput(value) {
    const source = String(value ?? '')
        .trim()
        .toLowerCase()
        .replaceAll('π', 'pi')
        .replace(/[−–—]/g, '-');
    if (!source) return NaN;
    const tokens = tokenize(source);
    let index = 0;

    function peek() { return tokens[index]; }
    function consume(type) {
        const token = tokens[index];
        if (!token || token.type !== type) throw new Error(`Expected ${type}.`);
        index += 1;
        return token;
    }
    function expression() {
        let value = term();
        while (peek()?.type === '+' || peek()?.type === '-') {
            const op = consume(peek().type).type;
            const right = term();
            value = op === '+' ? value + right : value - right;
        }
        return value;
    }
    function term() {
        let value = power();
        while (peek()?.type === '*' || peek()?.type === '/') {
            const op = consume(peek().type).type;
            const right = power();
            value = op === '*' ? value * right : value / right;
        }
        return value;
    }
    function power() {
        let value = unary();
        if (peek()?.type === '^') {
            consume('^');
            value = value ** power();
        }
        return value;
    }
    function unary() {
        if (peek()?.type === '+') { consume('+'); return unary(); }
        if (peek()?.type === '-') { consume('-'); return -unary(); }
        return primary();
    }
    function primary() {
        const token = peek();
        if (!token) throw new Error('Unexpected end of input.');
        if (token.type === 'number') { index += 1; return token.value; }
        if (token.type === 'pi') { index += 1; return Math.PI; }
        if (token.type === 'name') {
            index += 1;
            const fn = FUNCTIONS[token.value];
            if (!fn) throw new Error(`Unknown function ${token.value}.`);
            consume('(');
            const value = expression();
            consume(')');
            return fn(value);
        }
        if (token.type === '(') {
            consume('(');
            const value = expression();
            consume(')');
            return value;
        }
        throw new Error(`Unexpected token ${token.type}.`);
    }

    try {
        const result = expression();
        if (index !== tokens.length || !Number.isFinite(result)) return NaN;
        return result;
    } catch {
        return NaN;
    }
}

function tokenize(source) {
    const raw = [];
    let index = 0;
    while (index < source.length) {
        const char = source[index];
        if (/\s/.test(char)) { index += 1; continue; }
        if (/[0-9.]/.test(char)) {
            const match = source.slice(index).match(/^(?:\d+(?:\.\d*)?|\.\d+)/);
            if (!match) throw new Error('Invalid number.');
            raw.push({ type: 'number', value: Number(match[0]) });
            index += match[0].length;
            continue;
        }
        if (/[a-z]/.test(char)) {
            const match = source.slice(index).match(/^[a-z]+/);
            const name = match[0];
            raw.push(name === 'pi' ? { type: 'pi' } : { type: 'name', value: name });
            index += name.length;
            continue;
        }
        if ('+-*/^()'.includes(char)) {
            raw.push({ type: char });
            index += 1;
            continue;
        }
        throw new Error(`Invalid character ${char}.`);
    }

    const tokens = [];
    const endsValue = token => token && ['number', 'pi', ')'].includes(token.type);
    const startsValue = token => token && ['number', 'pi', 'name', '('].includes(token.type);
    for (const token of raw) {
        if (endsValue(tokens.at(-1)) && startsValue(token)) tokens.push({ type: '*' });
        tokens.push(token);
    }
    return tokens;
}

export function evaluateAnswer(question, response) {
    const answer = question?.answer;
    if (!answer) throw new TypeError('Question is missing an answer contract.');

    if (answer.kind === 'choice') {
        const selected = String(response ?? '');
        const correct = selected === String(answer.value);
        return feedbackResult(question, correct, selected);
    }

    if (answer.kind === 'number') {
        const numeric = parseMathInput(response);
        const expected = Number(answer.value);
        const tolerance = Number(answer.tolerance ?? 1e-8);
        const correct = Number.isFinite(numeric) && Math.abs(numeric - expected) <= tolerance;
        return feedbackResult(question, correct, numeric);
    }

    if (answer.kind === 'text') {
        const accepted = Array.isArray(answer.accepted) ? answer.accepted : [answer.value];
        const correct = accepted.some(value => normalizeText(value) === normalizeText(response));
        return feedbackResult(question, correct, response);
    }

    throw new Error(`Unsupported answer kind: ${answer.kind}`);
}

function feedbackResult(question, correct, response) {
    let misconception = '';
    if (!correct && question.type === 'choice' && Array.isArray(question.choices)) {
        const choice = question.choices.find(item => item.id === String(response));
        misconception = choice?.feedback || '';
    }
    return {
        correct,
        response,
        headline: correct ? 'Correct.' : 'Not quite yet.',
        explanation: correct
            ? (question.explanation || 'That reasoning reaches the correct result.')
            : (misconception || question.explanation || 'Review the setup and try the next step carefully.'),
        solutionSteps: [...(question.solutionSteps || [])],
        review: question.review || '',
        misconception
    };
}
