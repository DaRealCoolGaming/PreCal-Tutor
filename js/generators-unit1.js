import { registerGeneratorPack } from './generators.js';
import { choiceQuestion, numberQuestion, randomInt, nonZeroInt, linearText } from './generator-helpers.js';

const pack = {
    functionValue: ({ rng, conceptId, difficulty }) => {
        const a = nonZeroInt(rng, -6, 6), b = randomInt(rng, -8, 8), x = randomInt(rng, -5, 5);
        const value = a * x + b;
        return numberQuestion({
            prompt: `Let f(x) = ${linearText(a,b)}. Find f(${x}).`, value, conceptId, difficulty,
            explanation: `Function notation asks you to replace every x with ${x}. The result is ${value}.`,
            steps: [`Substitute x = ${x}: f(${x}) = ${a}(${x}) ${b < 0 ? '−' : '+'} ${Math.abs(b)}.`, `Multiply first, then combine: ${a*x} ${b < 0 ? '−' : '+'} ${Math.abs(b)} = ${value}.`],
            hints: ['Function notation is an instruction to substitute an input.', `Replace x with ${x} before simplifying.`],
            review: '1.1 Function notation'
        });
    },
    relationFunction: ({ rng, conceptId, difficulty }) => {
        const x1 = randomInt(rng,-4,1), x2 = x1 + randomInt(rng,1,3), y1 = randomInt(rng,-5,5), y2 = randomInt(rng,-5,5);
        const repeat = rng() < .5;
        const relation = repeat ? `{(${x1}, ${y1}), (${x1}, ${y2 === y1 ? y2+1 : y2}), (${x2}, ${y1+2})}` : `{(${x1}, ${y1}), (${x2}, ${y2}), (${x2+2}, ${y1+1})}`;
        const correct = repeat ? 'No, it is not a function.' : 'Yes, it is a function.';
        return choiceQuestion({ rng, prompt:`Is ${relation} a function?`, correct,
            distractors: repeat ? ['Yes, because every ordered pair is different.','Yes, because repeated y-values are allowed.','No, because the relation has three points.'] : ['No, because the y-values are not consecutive.','No, because a function may contain only two points.','Yes, but only if every y-value is different.'],
            conceptId,difficulty, explanation: repeat ? `The input ${x1} is paired with two different outputs, so the relation fails the definition of a function.` : 'Each input appears only once, so every input has exactly one output.',
            steps:['Inspect the x-values, not the y-values.','A repeated input with different outputs breaks the function rule.'],
            hints:['Ask: can one input point to two outputs?','Look for repeated x-values.'], review:'1.1 Relations and functions'
        });
    },
    domainRational: ({ rng, conceptId, difficulty }) => {
        const excluded = randomInt(rng,-7,7);
        const sign = excluded >= 0 ? '-' : '+';
        const den = `x ${sign} ${Math.abs(excluded)}`;
        const correct = `All real numbers except x = ${excluded}`;
        return choiceQuestion({ rng, prompt:`Find the domain of f(x) = (x + 2)/(${den}).`, correct,
            distractors:[`x > ${excluded}`,`x < ${excluded}`,'All real numbers'], conceptId,difficulty,
            explanation:`A rational expression is undefined only where its denominator is zero. ${den} = 0 at x = ${excluded}.`,
            steps:[`Set the denominator equal to zero: ${den} = 0.`,`Solve to get x = ${excluded}. Exclude that value.`],
            hints:['The numerator does not create domain restrictions here.','Set the denominator equal to zero.'], review:'1.2 Domain restrictions'
        });
    },
    domainRadical: ({ rng, conceptId, difficulty }) => {
        const h = randomInt(rng,-6,6);
        const inside = h >= 0 ? `x − ${h}` : `x + ${Math.abs(h)}`;
        const correct = `x ≥ ${h}`;
        return choiceQuestion({ rng,prompt:`Find the real-valued domain of f(x) = √(${inside}).`, correct,
            distractors:[`x ≤ ${h}`,`x > ${h}`,'All real numbers'], conceptId,difficulty,
            explanation:`For a real square root, the radicand must be nonnegative: ${inside} ≥ 0, so x ≥ ${h}.`,
            steps:[`Require ${inside} ≥ 0.`,`Solve the inequality: x ≥ ${h}.`], hints:['Square roots require the inside to be at least zero.','Write an inequality for the radicand.'], review:'1.2 Domain and range'
        });
    },
    quadraticRange: ({ rng, conceptId, difficulty }) => {
        const k = randomInt(rng,-6,6), opensUp = rng() < .5;
        const correct = opensUp ? `y ≥ ${k}` : `y ≤ ${k}`;
        return choiceQuestion({ rng,prompt:`A parabola has vertex (2, ${k}) and opens ${opensUp?'upward':'downward'}. What is its range?`, correct,
            distractors:[opensUp?`y ≤ ${k}`:`y ≥ ${k}`,`x ≥ ${k}`,'All real numbers'], conceptId,difficulty,
            explanation:`The vertex supplies the extreme output. Because the parabola opens ${opensUp?'up':'down'}, ${k} is the ${opensUp?'minimum':'maximum'} y-value.`,
            steps:['Identify the y-coordinate of the vertex.','Use the opening direction to decide whether outputs extend above or below it.'], hints:['Range describes y-values.','The vertex is the boundary of the range.'], review:'1.2 Range from graphs'
        });
    },
    averageRate: ({ rng, conceptId, difficulty }) => {
        const x1=randomInt(rng,-4,2), x2=x1+randomInt(rng,1,5), a=nonZeroInt(rng,-4,4), b=randomInt(rng,-4,4), c=randomInt(rng,-3,3);
        const f=x=>a*x*x+b*x+c; const rate=(f(x2)-f(x1))/(x2-x1);
        return numberQuestion({ prompt:`For f(x) = ${a}x² ${b<0?'−':'+'} ${Math.abs(b)}x ${c<0?'−':'+'} ${Math.abs(c)}, find the average rate of change from x = ${x1} to x = ${x2}.`, value:rate, conceptId,difficulty,
            explanation:'Average rate of change is the slope of the secant line connecting the two function values.',
            steps:[`Compute f(${x1}) = ${f(x1)} and f(${x2}) = ${f(x2)}.`,`Use [f(${x2}) − f(${x1})]/(${x2} − ${x1}) = ${rate}.`],
            hints:['Use the same slope formula you know from lines, but with two points on the function.','Find both function values before subtracting.'], review:'1.3 Average rate of change'
        });
    },
    symmetry: ({ rng, conceptId, difficulty }) => {
        const kind = rng()<.5?'even':'odd';
        const prompt = kind==='even' ? 'Suppose f(−x) = f(x) for every x in the domain. Which symmetry does f have?' : 'Suppose f(−x) = −f(x) for every x in the domain. Which symmetry does f have?';
        const correct = kind==='even'?'Even; y-axis symmetry':'Odd; origin symmetry';
        return choiceQuestion({rng,prompt,correct,distractors:[kind==='even'?'Odd; origin symmetry':'Even; y-axis symmetry','Neither; x-axis symmetry','One-to-one; line y = x symmetry'],conceptId,difficulty,
            explanation:kind==='even'?'The equation f(−x)=f(x) defines an even function and corresponds to reflection symmetry across the y-axis.':'The equation f(−x)=−f(x) defines an odd function and corresponds to 180° rotational symmetry about the origin.',
            steps:['Compare f(−x) with f(x).','Match the relationship to the even/odd definition.'],hints:['Even means the output does not change after replacing x with −x.','Odd means the output changes sign too.'],review:'1.3 Symmetry'
        });
    },
    parentFamily: ({ rng, conceptId, difficulty }) => {
        const items=[['y = |x|','absolute value'],['y = √x','square root'],['y = x²','quadratic'],['y = 1/x','reciprocal'],['y = x³','cubic']];
        const [eq,family]=items[randomInt(rng,0,items.length-1)];
        return choiceQuestion({rng,prompt:`Which parent-function family contains ${eq}?`,correct:family,distractors:items.map(i=>i[1]).filter(v=>v!==family).slice(0,3),conceptId,difficulty,
            explanation:`${eq} is the standard parent equation for the ${family} family.`,steps:['Ignore shifts or stretches because this is already a parent equation.','Match the equation shape to the named family.'],hints:['Think about the characteristic graph shape.','Recall the core parent equations.'],review:'1.4 Parent functions'});
    },
    transformShift: ({ rng, conceptId, difficulty }) => {
        const h=nonZeroInt(rng,-6,6), k=nonZeroInt(rng,-6,6);
        const inside=h>0?`x − ${h}`:`x + ${Math.abs(h)}`; const outside=k>0?`+ ${k}`:`− ${Math.abs(k)}`;
        const correct=`${Math.abs(h)} ${h>0?'right':'left'} and ${Math.abs(k)} ${k>0?'up':'down'}`;
        return choiceQuestion({rng,prompt:`Relative to y = f(x), describe y = f(${inside}) ${outside}.`,correct,distractors:[`${Math.abs(h)} ${h>0?'left':'right'} and ${Math.abs(k)} ${k>0?'up':'down'}`,`${Math.abs(h)} ${h>0?'right':'left'} and ${Math.abs(k)} ${k>0?'down':'up'}`,`${Math.abs(h)} ${h>0?'left':'right'} and ${Math.abs(k)} ${k>0?'down':'up'}`],conceptId,difficulty,
            explanation:'Horizontal shifts work opposite the sign seen inside the input; vertical shifts follow the outside sign.',steps:[`Inside f: ${inside} shifts ${Math.abs(h)} ${h>0?'right':'left'}.`,`Outside f: ${outside} shifts ${Math.abs(k)} ${k>0?'up':'down'}.`],hints:['Inside changes x-values and uses the opposite direction.','Outside changes y-values and uses the visible sign.'],review:'1.5 Transformations'});
    },
    transformScaleReflection: ({ rng, conceptId, difficulty }) => {
        const a=[-3,-2,-0.5,0.5,2,3][randomInt(rng,0,5)];
        const parts=[]; if(a<0) parts.push('reflect across the x-axis'); const mag=Math.abs(a); parts.push(mag>1?`vertical stretch by ${mag}`:`vertical compression by ${mag}`);
        const correct=parts.join(' and ');
        const distractors=['reflect across the y-axis only',mag>1?`vertical compression by ${mag}`:`vertical stretch by ${mag}`,'horizontal shift'];
        return choiceQuestion({rng,prompt:`Describe the main effect of y = ${a}f(x) on y = f(x).`,correct,distractors,conceptId,difficulty,
            explanation:'A multiplier outside a function changes output values. Its magnitude controls vertical scale; a negative sign reflects outputs across the x-axis.',steps:[`Use |${a}| = ${mag} for the scale.`,a<0?'Because the multiplier is negative, include an x-axis reflection.':'Because the multiplier is positive, there is no reflection.'],hints:['Outside multipliers act vertically.','Separate the sign from the magnitude.'],review:'1.5 Transformations'});
    },
    operationValue: ({ rng, conceptId, difficulty }) => {
        const a=nonZeroInt(rng,-4,4),b=randomInt(rng,-5,5),c=nonZeroInt(rng,-3,3),d=randomInt(rng,-5,5),x=randomInt(rng,-4,4);
        const op=['sum','difference','product'][randomInt(rng,0,2)]; const fx=a*x+b,gx=c*x+d; const value=op==='sum'?fx+gx:op==='difference'?fx-gx:fx*gx;
        const notation=op==='sum'?'(f + g)':op==='difference'?'(f − g)':'(fg)';
        return numberQuestion({prompt:`Let f(x) = ${linearText(a,b)} and g(x) = ${linearText(c,d)}. Find ${notation}(${x}).`,value,conceptId,difficulty,
            explanation:`Evaluate both functions at the same input, then perform the requested ${op}.`,steps:[`f(${x}) = ${fx}; g(${x}) = ${gx}.`,`Apply the ${op}: ${value}.`],hints:['Evaluate f and g separately first.','The operation happens to the outputs.'],review:'1.6 Operations on functions'});
    },
    quotientRestriction: ({ rng, conceptId, difficulty }) => {
        const root=randomInt(rng,-6,6); const correct=`x ≠ ${root}`;
        return choiceQuestion({rng,prompt:`If (f/g)(x) = (x² + 1)/(x ${root>=0?'−':'+'} ${Math.abs(root)}), what extra domain restriction comes from the quotient?`,correct,distractors:[`x = ${root}`,`x > ${root}`,'No extra restriction'],conceptId,difficulty,
            explanation:'For a quotient of functions, the denominator function cannot equal zero.',steps:[`Set g(x)=x ${root>=0?'−':'+'} ${Math.abs(root)} equal to zero.`,`The zero occurs at x=${root}, so exclude it.`],hints:['Division by zero is undefined.','Find where the denominator is zero.'],review:'1.6 Quotient domains'});
    },
    compositionValue: ({ rng, conceptId, difficulty }) => {
        const a=nonZeroInt(rng,-4,4),b=randomInt(rng,-4,4),c=nonZeroInt(rng,-3,3),d=randomInt(rng,-4,4),x=randomInt(rng,-3,3);
        const gx=c*x+d, value=a*gx+b;
        return numberQuestion({prompt:`Let f(x) = ${linearText(a,b)} and g(x) = ${linearText(c,d)}. Find (f ∘ g)(${x}).`,value,conceptId,difficulty,
            explanation:'Composition means use the output of g as the input of f.',steps:[`Inner function first: g(${x}) = ${gx}.`,`Then f(${gx}) = ${value}.`],hints:['Read f ∘ g from right to left.','Compute g of the input first.'],review:'1.7 Composition'});
    },
    compositionOrder: ({ rng, conceptId, difficulty }) => {
        const correct='g is applied first, then f';
        return choiceQuestion({rng,prompt:'What does (f ∘ g)(x) mean?',correct,distractors:['f is applied first, then g','multiply f(x) by g(x)','add f(x) and g(x)'],conceptId,difficulty,
            explanation:'By definition, (f ∘ g)(x) = f(g(x)); the function closest to x acts first.',steps:['Rewrite the notation as f(g(x)).','Read from the inside outward.'],hints:['Expand the composition notation.','Which function touches x first?'],review:'1.7 Composition order'});
    },
    inverseLinear: ({ rng, conceptId, difficulty }) => {
        const a=[-5,-4,-3,-2,2,3,4,5][randomInt(rng,0,7)],b=nonZeroInt(rng,-6,6);
        const correct=`f⁻¹(x) = (x ${b>=0?'−':'+'} ${Math.abs(b)})/${a}`;
        return choiceQuestion({rng,prompt:`If f(x) = ${linearText(a,b)}, which formula gives f⁻¹(x)?`,correct,distractors:[`f⁻¹(x) = (${a}x ${b>=0?'−':'+'} ${Math.abs(b)})`,`f⁻¹(x) = (x ${b>=0?'+':'−'} ${Math.abs(b)})/${a}`,`f⁻¹(x) = 1/(${linearText(a,b)})`],conceptId,difficulty,
            explanation:'To find an inverse, write y=f(x), swap x and y, then solve the new equation for y.',steps:[`Start y = ${linearText(a,b)}.`,`Swap: x = ${a}y ${b<0?'−':'+'} ${Math.abs(b)}.`,`Undo the ${b>=0?'+':'−'} ${Math.abs(b)}, then divide by ${a}.`],hints:['An inverse function is not the reciprocal 1/f(x).','Swap x and y, then solve for y.'],review:'1.8 Inverse functions'});
    },
    inverseOneToOne: ({ rng, conceptId, difficulty }) => choiceQuestion({rng,prompt:'Why does y = x² on all real numbers not have an inverse that is also a function?',correct:'It fails the horizontal line test.',distractors:['It fails the vertical line test.','Its domain contains negative numbers.','Quadratics cannot have inverses under any restriction.'],conceptId,difficulty,
        explanation:'Different inputs such as 2 and −2 produce the same output. Swapping inputs and outputs would give one input two outputs, unless the original domain is restricted.',steps:['Check whether each output comes from only one input.','A horizontal line crosses the full parabola twice.'],hints:['Invertibility requires one-to-one behavior.','Use the horizontal line test.'],review:'1.8 One-to-one functions'}),
    piecewiseValue: ({ rng, conceptId, difficulty }) => {
        const cut=randomInt(rng,-2,3),x=rng()<.5?cut-randomInt(rng,1,3):cut+randomInt(rng,0,3),a=nonZeroInt(rng,-3,3),b=randomInt(rng,-3,3),c=nonZeroInt(rng,-3,3),d=randomInt(rng,-3,3);
        const left=x<cut, value=(left?a:c)*x+(left?b:d);
        return numberQuestion({prompt:`p(x) = { ${linearText(a,b)} if x < ${cut}; ${linearText(c,d)} if x ≥ ${cut} }. Find p(${x}).`,value,conceptId,difficulty,
            explanation:`The input ${x} belongs to the ${left?`x < ${cut}`:`x ≥ ${cut}`} branch, so only that formula is used.`,steps:[`Compare ${x} with ${cut}.`,`Use ${left?linearText(a,b):linearText(c,d)} and substitute x=${x}.`,`The value is ${value}.`],hints:['Choose the branch before doing arithmetic.','Pay attention to whether the endpoint uses < or ≥.'],review:'1.9 Piecewise functions'});
    },
    piecewiseEndpoint: ({ rng, conceptId, difficulty }) => {
        const cut=randomInt(rng,-4,4); const correct='Use the branch whose inequality includes equality.';
        return choiceQuestion({rng,prompt:`At x = ${cut}, a piecewise definition has one branch x < ${cut} and another branch x ≥ ${cut}. Which branch determines the function value?`,correct,distractors:['Use the x < branch because it is written first.','Use both branches and average the outputs.','The function is automatically undefined at the breakpoint.'],conceptId,difficulty,
            explanation:'The symbol ≥ includes the breakpoint, while < does not.',steps:['Check which condition is true at the breakpoint.','Only x ≥ the breakpoint includes equality.'],hints:['Look for the equality bar.','Exactly one branch should own the endpoint.'],review:'1.9 Piecewise endpoints'});
    },
    linearModel: ({ rng, conceptId, difficulty }) => {
        const start=randomInt(rng,20,100),rate=randomInt(rng,2,15),t=randomInt(rng,2,8),value=start+rate*t;
        return numberQuestion({prompt:`A service costs $${start} initially and then $${rate} per month. What is the total cost after ${t} months?`,value,conceptId,difficulty,
            explanation:'A constant starting amount plus a constant rate is a linear model.',steps:[`Model: C(t) = ${start} + ${rate}t.`,`Substitute t=${t}: C(${t}) = ${value}.`],hints:['Identify the initial value and the rate.','Use initial + rate × time.'],review:'1.10 Linear modeling'});
    },
    modelChoice: ({ rng, conceptId, difficulty }) => choiceQuestion({rng,prompt:'A quantity rises, reaches one maximum, and then falls at an increasing rate. Which basic function family is usually the best first model?',correct:'quadratic',distractors:['linear','reciprocal','square root'],conceptId,difficulty,
        explanation:'A quadratic can model a single turning point such as the peak of a projectile or a revenue curve over a limited interval.',steps:['Focus on the shape described by the context.','One smooth maximum suggests a downward-opening parabola.'],hints:['Which parent graph has one vertex?','Think parabola.'],review:'1.10 Choosing models'})
};

registerGeneratorPack('u1', pack);
export default pack;
