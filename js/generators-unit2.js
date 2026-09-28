import { registerGeneratorPack } from './generators.js';
import { choiceQuestion, numberQuestion, textQuestion, randomInt, nonZeroInt, fractionText, linearText } from './generator-helpers.js';

const pack = {
    endBehavior: ({ rng, conceptId, difficulty }) => {
        const degree = randomInt(rng,2,7), lead = nonZeroInt(rng,-6,6);
        const even = degree % 2 === 0, positive = lead > 0;
        const correct = even ? (positive?'both ends rise':'both ends fall') : (positive?'left falls, right rises':'left rises, right falls');
        return choiceQuestion({rng,prompt:`A polynomial has degree ${degree} and leading coefficient ${lead}. What is its end behavior?`,correct,distractors:['both ends rise','both ends fall','left falls, right rises','left rises, right falls'].filter(v=>v!==correct).slice(0,3),conceptId,difficulty,
            explanation:'End behavior depends only on the degree parity and the sign of the leading coefficient.',steps:[`Degree ${degree} is ${even?'even':'odd'}.`,`The leading coefficient is ${positive?'positive':'negative'}.`,`Combine those facts: ${correct}.`],hints:['Ignore lower-degree terms.','Even degree means the two ends match; odd degree means they differ.'],review:'2.1 End behavior'});
    },
    turningPoints: ({ rng, conceptId, difficulty }) => {
        const degree=randomInt(rng,2,8),max=degree-1;
        return numberQuestion({prompt:`What is the maximum possible number of turning points of a degree-${degree} polynomial?`,value:max,conceptId,difficulty,
            explanation:'A degree-n polynomial can have at most n−1 turning points.',steps:[`Use n−1 with n=${degree}.`,`Maximum turning points = ${max}.`],hints:['The bound is one less than the degree.'],review:'2.1 Polynomial behavior'});
    },
    zerosFromFactors: ({ rng, conceptId, difficulty }) => {
        const r1=randomInt(rng,-6,-1),r2=randomInt(rng,1,6); const correct=`${r1} and ${r2}`;
        const f1=r1>=0?`(x − ${r1})`:`(x + ${Math.abs(r1)})`,f2=r2>=0?`(x − ${r2})`:`(x + ${Math.abs(r2)})`;
        return choiceQuestion({rng,prompt:`Find the real zeros of f(x) = ${f1}${f2}.`,correct,distractors:[`${-r1} and ${-r2}`,`${r1} only`,`${r2} only`],conceptId,difficulty,
            explanation:'Each factor is zero at its corresponding root. Set each factor equal to zero.',steps:[`${f1}=0 gives x=${r1}.`,`${f2}=0 gives x=${r2}.`],hints:['Use the zero-product property.','Remember the sign inside a factor is opposite the root.'],review:'2.2 Zeros and factors'});
    },
    multiplicityBehavior: ({ rng, conceptId, difficulty }) => {
        const m=randomInt(rng,1,5); const correct=m%2===0?'touches the x-axis and turns around':'crosses the x-axis';
        return choiceQuestion({rng,prompt:`A zero has multiplicity ${m}. How does the graph behave at that x-intercept?`,correct,distractors:[m%2===0?'crosses the x-axis':'touches the x-axis and turns around','has a vertical asymptote','must have a local maximum there'],conceptId,difficulty,
            explanation:`Multiplicity ${m} is ${m%2===0?'even':'odd'}, so the sign of the polynomial ${m%2===0?'does not change':'changes'} across that zero.`,steps:['Check whether the multiplicity is even or odd.','Even multiplicity bounces; odd multiplicity crosses.'],hints:['Parity matters more than the exact multiplicity for crossing versus touching.'],review:'2.2 Multiplicity'});
    },
    polynomialGraphPlan: ({ rng, conceptId, difficulty }) => choiceQuestion({rng,prompt:'Which information should be combined first when sketching a factored polynomial without technology?',correct:'zeros with multiplicities, end behavior, and a few test values',distractors:['only the y-intercept','only the degree','only the leading coefficient'],conceptId,difficulty,
        explanation:'A reliable polynomial sketch comes from several structural features together: intercepts/multiplicity, end behavior, and enough intermediate information to connect them.',steps:['Locate zeros and decide cross/touch behavior.','Determine both ends from the leading term.','Use a y-intercept or test values to place the curve between zeros.'],hints:['No single feature is enough for a trustworthy sketch.'],review:'2.3 Graphing polynomial functions'}),
    evaluateFactored: ({ rng, conceptId, difficulty }) => {
        const r1=randomInt(rng,-4,1),r2=randomInt(rng,2,5),x=randomInt(rng,-3,4); const value=(x-r1)*(x-r2);
        return numberQuestion({prompt:`For f(x) = (x ${r1>=0?'−':'+'} ${Math.abs(r1)})(x − ${r2}), find f(${x}).`,value,conceptId,difficulty,
            explanation:'Substitute the input into each factor, then multiply.',steps:[`First factor: ${x-r1}.`,`Second factor: ${x-r2}.`,`Product: ${value}.`],hints:['Keep the expression factored; substitution is often easier that way.'],review:'2.3 Polynomial graph checkpoints'});
    },
    remainderTheorem: ({ rng, conceptId, difficulty }) => {
        const c=randomInt(rng,-4,4),a=nonZeroInt(rng,-3,3),b=randomInt(rng,-5,5),d=randomInt(rng,-5,5); const rem=a*c*c+b*c+d;
        return numberQuestion({prompt:`Using the Remainder Theorem, find the remainder when P(x) = ${a}x² ${b<0?'−':'+'} ${Math.abs(b)}x ${d<0?'−':'+'} ${Math.abs(d)} is divided by (x ${c>=0?'−':'+'} ${Math.abs(c)}).`,value:rem,conceptId,difficulty,
            explanation:`When dividing by x−c, the remainder is P(c). Here c=${c}.`,steps:[`Evaluate P(${c}).`,`P(${c}) = ${rem}, so the remainder is ${rem}.`],hints:['You do not need to perform polynomial long division.','For divisor x−c, compute P(c).'],review:'2.4 Remainder Theorem'});
    },
    syntheticLinear: ({ rng, conceptId, difficulty }) => {
        const root=randomInt(rng,-4,4),q1=nonZeroInt(rng,-4,4),q0=randomInt(rng,-5,5);
        const a=q1,b=q0-q1*root,c=-q0*root;
        const correct=`${linearText(q1,q0)}`;
        return choiceQuestion({rng,prompt:`Divide ${a}x² ${b<0?'−':'+'} ${Math.abs(b)}x ${c<0?'−':'+'} ${Math.abs(c)} by (x ${root>=0?'−':'+'} ${Math.abs(root)}). What is the quotient?`,correct,distractors:[linearText(-q1,q0),linearText(q1,q0+1),linearText(q1 + (q1 > 0 ? 1 : -1),q0)],conceptId,difficulty,
            explanation:'Synthetic division by x−r uses r. This polynomial was constructed to divide evenly.',steps:[`Use synthetic value ${root}.`,`Bring down ${a}; multiply/add through the coefficients.`,`The quotient is ${correct}.`],hints:['Use the zero of the divisor, not its visible constant sign.'],review:'2.4 Synthetic division'});
    },
    rootCount: ({ rng, conceptId, difficulty }) => {
        const degree=randomInt(rng,2,8); return numberQuestion({prompt:`According to the Fundamental Theorem of Algebra, how many complex zeros does a degree-${degree} polynomial have, counting multiplicity?`,value:degree,conceptId,difficulty,
            explanation:`A degree-${degree} polynomial has exactly ${degree} complex zeros counting multiplicity.`,steps:['Read the polynomial degree.','The Fundamental Theorem of Algebra gives exactly that many complex zeros counting multiplicity.'],hints:['Count multiplicity and include real roots as complex roots too.'],review:'2.5 Fundamental Theorem of Algebra'});
    },
    conjugateRoot: ({ rng, conceptId, difficulty }) => {
        const a=nonZeroInt(rng,-5,5),b=randomInt(rng,1,6); const correct=`${a} − ${b}i`;
        return choiceQuestion({rng,prompt:`A polynomial with real coefficients has zero ${a} + ${b}i. Which zero must also occur?`,correct,distractors:[`${-a} + ${b}i`,`${-a} − ${b}i`,`${a} + ${b}i only`],conceptId,difficulty,
            explanation:'Nonreal complex zeros of polynomials with real coefficients occur in conjugate pairs.',steps:['Keep the real part unchanged.','Reverse the sign of the imaginary part.'],hints:['Conjugates differ only in the sign between the real and imaginary parts.'],review:'2.5 Complex conjugate zeros'});
    },
    rationalDomain: ({ rng, conceptId, difficulty }) => {
        const r=randomInt(rng,-7,7),correct=`x ≠ ${r}`;
        return choiceQuestion({rng,prompt:`State the domain restriction for R(x) = (x² + 1)/(x ${r>=0?'−':'+'} ${Math.abs(r)}).`,correct,distractors:[`x = ${r}`,`x > ${r}`,'No restriction'],conceptId,difficulty,
            explanation:'A rational function is undefined when its denominator is zero.',steps:[`Set x ${r>=0?'−':'+'} ${Math.abs(r)} = 0.`,`Exclude x=${r}.`],hints:['Denominator zeros are excluded before any cancellation.'],review:'2.6 Rational functions'});
    },
    rationalValue: ({ rng, conceptId, difficulty }) => {
        const r=randomInt(rng,-5,5),x=r===0?2:(r===2?3:2),num=x+1,den=x-r,value=num/den;
        return numberQuestion({prompt:`Evaluate R(${x}) for R(x) = (x + 1)/(x ${r>=0?'−':'+'} ${Math.abs(r)}).`,value,tolerance:1e-9,conceptId,difficulty,
            explanation:'Evaluate a rational function by substituting into numerator and denominator separately, provided the denominator is not zero.',steps:[`Numerator = ${num}.`,`Denominator = ${den}.`,`R(${x}) = ${fractionText(num,den)}.`],hints:['Check the denominator first.','Then divide the two evaluated expressions.'],review:'2.6 Rational evaluation'});
    },
    holeLocation: ({ rng, conceptId, difficulty }) => {
        let h=nonZeroInt(rng,-5,5),k=randomInt(rng,-3,3); while (h + k === 0) k = randomInt(rng,-3,3); const y=h+k; const factor=h>=0?`(x − ${h})`:`(x + ${Math.abs(h)})`;
        const correct=`(${h}, ${y})`;
        return choiceQuestion({rng,prompt:`R(x) = ${factor}(x ${k>=0?'+':'−'} ${Math.abs(k)})/${factor}. Where is the removable discontinuity (hole)?`,correct,distractors:[`(${h}, 0)`,`(0, ${y})`,`x = ${h} is a vertical asymptote`],conceptId,difficulty,
            explanation:`The common factor cancels algebraically but its original zero x=${h} remains excluded. Evaluate the simplified function x ${k>=0?'+':'−'} ${Math.abs(k)} at x=${h} to get y=${y}.`,steps:[`Cancel ${factor} but keep x=${h} excluded.`,`Simplified function gives y=${h} ${k>=0?'+':'−'} ${Math.abs(k)} = ${y}.`,`Hole: (${h}, ${y}).`],hints:['A canceled denominator factor creates a hole, not a vertical asymptote.','Use the simplified function to find the hole’s y-coordinate.'],review:'2.7 Holes and discontinuities'});
    },
    discontinuityType: ({ rng, conceptId, difficulty }) => choiceQuestion({rng,prompt:'If a denominator factor cancels completely with the numerator, what kind of discontinuity remains at that factor’s zero?',correct:'removable discontinuity (a hole)',distractors:['vertical asymptote','horizontal asymptote','no discontinuity at all'],conceptId,difficulty,
        explanation:'Cancellation simplifies the formula but does not restore the originally excluded input, so the graph has a missing point.',steps:['Factor numerator and denominator.','A common factor cancels in the simplified expression.','Keep its zero excluded from the original domain.'],hints:['The missing x-value remains missing after simplification.'],review:'2.7 Removable discontinuities'}),
    verticalAsymptote: ({ rng, conceptId, difficulty }) => {
        const r=nonZeroInt(rng,-6,6); const correct=`x = ${r}`;
        return choiceQuestion({rng,prompt:`Find the vertical asymptote of R(x) = (x + 1)/(x ${r>=0?'−':'+'} ${Math.abs(r)}), assuming no cancellation.`,correct,distractors:[`y = ${r}`,`x = ${-r}`,'y = 0'],conceptId,difficulty,
            explanation:'A noncanceled denominator zero creates a vertical asymptote.',steps:[`Set the denominator equal to zero.`,`Solve x=${r}.`],hints:['Vertical asymptotes are x = constant lines.'],review:'2.8 Vertical asymptotes'});
    },
    horizontalAsymptote: ({ rng, conceptId, difficulty }) => {
        let a=nonZeroInt(rng,-6,6),b=nonZeroInt(rng,-6,6); while (Math.abs(a) === Math.abs(b)) b = nonZeroInt(rng,-6,6); const ratio=a/b; const correct=`y = ${fractionText(a,b)}`;
        const d1=`y = ${fractionText(b,a)}`, d2='y = 0', d3=`x = ${fractionText(a,b)}`;
        return choiceQuestion({rng,prompt:`For R(x) = (${a}x² + 1)/(${b}x² − 3), find the horizontal asymptote.`,correct,distractors:[d1,d2,d3],conceptId,difficulty,
            explanation:'When numerator and denominator have the same degree, the horizontal asymptote is the ratio of leading coefficients.',steps:[`Both degrees are 2.`,`Compute leading-coefficient ratio ${a}/${b} = ${fractionText(a,b)}.`],hints:['Compare degrees before calculating.','Equal degrees → ratio of leading coefficients.'],review:'2.8 Horizontal asymptotes'});
    },
    obliqueAsymptote: ({ rng, conceptId, difficulty }) => {
        const m=nonZeroInt(rng,-4,4),b=nonZeroInt(rng,-5,5); const correct=`y = ${linearText(m,b)}`;
        return choiceQuestion({rng,prompt:`Polynomial division gives R(x) = ${linearText(m,b)} + 5/(x − 2). What is the oblique asymptote?`,correct,distractors:[`x = ${linearText(m,b)}`,'y = 0',`y = ${linearText(m,-b)}`],conceptId,difficulty,
            explanation:'The remainder term approaches zero for large |x|, so the quotient line is the slant/oblique asymptote.',steps:['Separate quotient and remainder after division.','Drop the remainder fraction for end behavior.'],hints:['The quotient from polynomial division controls the slant asymptote.'],review:'2.8 Oblique asymptotes'});
    },
    rationalGraphOrder: ({ rng, conceptId, difficulty }) => choiceQuestion({rng,prompt:'Which workflow best supports an accurate rational-function sketch?',correct:'factor → domain/holes → asymptotes → intercepts → interval behavior',distractors:['intercepts only → connect with a smooth line','horizontal asymptote → ignore the denominator','expand everything → choose a parabola shape'],conceptId,difficulty,
        explanation:'Factoring first reveals cancellations and denominator zeros. Those determine holes and vertical asymptotes before you plot intercepts and branch behavior.',steps:['Factor before canceling.','Record every original restriction.','Find asymptotes and intercepts.','Test intervals or use sign/one-sided behavior.'],hints:['Start with structure, not plotting random points.'],review:'2.9 Graphing rational functions'}),
    rationalFeature: ({ rng, conceptId, difficulty }) => {
        const va=nonZeroInt(rng,-5,5),ha=nonZeroInt(rng,-3,3); const correct=`vertical x = ${va}; horizontal y = ${ha}`;
        return choiceQuestion({rng,prompt:`A rational graph is a transformed reciprocal of the form y = 1/(x ${va>=0?'−':'+'} ${Math.abs(va)}) ${ha>=0?'+':'−'} ${Math.abs(ha)}. Identify its asymptotes.`,correct,distractors:[`vertical x = ${-va}; horizontal y = ${ha}`,`vertical x = ${va}; horizontal y = ${-ha}`,`vertical y = ${va}; horizontal x = ${ha}`],conceptId,difficulty,
            explanation:'For y = a/(x−h)+k, the vertical asymptote is x=h and the horizontal asymptote is y=k.',steps:['Read h from the inside horizontal shift.','Read k from the outside vertical shift.'],hints:['Use the reciprocal transformation template.'],review:'2.9 Rational graph features'});
    },
    polynomialEquation: ({ rng, conceptId, difficulty }) => {
        const r1=randomInt(rng,-6,-1),r2=randomInt(rng,1,6); const correct=`x = ${r1} or x = ${r2}`;
        const f1=r1>=0?`(x − ${r1})`:`(x + ${Math.abs(r1)})`,f2=`(x − ${r2})`;
        return choiceQuestion({rng,prompt:`Solve ${f1}${f2} = 0.`,correct,distractors:[`x = ${-r1} or x = ${-r2}`,`x = ${r1+r2}`,`x = ${r1*r2}`],conceptId,difficulty,
            explanation:'Use the zero-product property: a product equals zero when at least one factor equals zero.',steps:[`${f1}=0 → x=${r1}.`,`${f2}=0 → x=${r2}.`],hints:['Set each factor equal to zero separately.'],review:'2.10 Polynomial equations'});
    },
    rationalEquation: ({ rng, conceptId, difficulty }) => {
        const banned=[-5,-4,-3,-2,0,1,3,4,5][randomInt(rng,0,8)],solution=banned===2?3:2; const rhs=(solution+1)/(solution-banned);
        return numberQuestion({prompt:`Solve (x + 1)/(x ${banned>=0?'−':'+'} ${Math.abs(banned)}) = ${fractionText(solution+1,solution-banned)}. The solution is not the excluded value.`,value:solution,conceptId,difficulty,
            explanation:'Clear the denominator only after recording the excluded value, then solve the resulting linear equation and check it.',steps:[`Restriction: x ≠ ${banned}.`,`Multiply both sides by the denominator and solve.`,`The valid solution is x=${solution}.`],hints:['Write the domain restriction first.','Clear denominators, then check the result in the original equation.'],review:'2.10 Rational equations'});
    },
    polynomialInequality: ({ rng, conceptId, difficulty }) => {
        const a=randomInt(rng,-5,-1),b=randomInt(rng,1,5); const correct=`(${a}, ${b})`;
        return choiceQuestion({rng,prompt:`Solve (x ${a>=0?'−':'+'} ${Math.abs(a)})(x − ${b}) < 0.`,correct,distractors:[`(−∞, ${a}) ∪ (${b}, ∞)`,`[${a}, ${b}]`,`(−∞, ${b})`],conceptId,difficulty,
            explanation:`The upward-opening factored quadratic changes sign at ${a} and ${b}; it is negative between the two distinct zeros. Strict inequality excludes endpoints.`,steps:[`Critical numbers: ${a}, ${b}.`,`Test one value in each interval or use the sign pattern.`,`Choose the negative interval: (${a}, ${b}).`],hints:['Zeros split the number line into sign intervals.','Because the leading coefficient is positive, the product is negative between the roots.'],review:'2.10 Polynomial inequalities'});
    },
    rationalInequality: ({ rng, conceptId, difficulty }) => {
        const z=randomInt(rng,-5,-1),p=randomInt(rng,1,5); const correct=`(${z}, ${p})`;
        return choiceQuestion({rng,prompt:`Solve (x ${z>=0?'−':'+'} ${Math.abs(z)})/(x − ${p}) < 0.`,correct,distractors:[`(−∞, ${z}) ∪ (${p}, ∞)`,`[${z}, ${p}]`,`(${z}, ${p}]`],conceptId,difficulty,
            explanation:`Critical numbers are the numerator zero x=${z} and denominator zero x=${p}. The quotient is negative only between them; both endpoints are excluded here.`,steps:[`Mark x=${z} (zero) and x=${p} (undefined).`,`Test signs on the three intervals.`,`Select (${z}, ${p}).`],hints:['Numerator zeros and denominator zeros both split the number line.','A denominator zero is never included.'],review:'2.10 Rational inequalities'});
    },
    polynomialModel: ({ rng, conceptId, difficulty }) => {
        const h=randomInt(rng,2,6),k=randomInt(rng,20,80),a=-randomInt(rng,1,4),x=h+randomInt(rng,1,3),value=a*(x-h)*(x-h)+k;
        return numberQuestion({prompt:`A height model is H(t) = ${a}(t − ${h})² + ${k}. Find H(${x}).`,value,conceptId,difficulty,
            explanation:'The model is already in vertex form; substitute the requested time and evaluate.',steps:[`Compute (${x}−${h})² = ${(x-h)**2}.`,`Multiply by ${a} and add ${k}: ${value}.`],hints:['Substitute before expanding.','Square the parenthesis before multiplying by the coefficient.'],review:'2.11 Polynomial modeling'});
    },
    rationalModel: ({ rng, conceptId, difficulty }) => {
        const fixed=randomInt(rng,60,180),n=randomInt(rng,3,10),value=fixed/n;
        return numberQuestion({prompt:`A $${fixed} fixed cost is shared equally among n people, so C(n) = ${fixed}/n. Find the cost per person for n = ${n}.`,value,conceptId,difficulty,
            explanation:'A fixed quantity divided among a changing number of participants is naturally modeled by a rational function.',steps:[`Substitute n=${n}.`,`C(${n})=${fixed}/${n}=${fractionText(fixed,n)}.`],hints:['The variable is in the denominator because increasing the number of people lowers each share.'],review:'2.11 Rational modeling'});
    }
};

registerGeneratorPack('u2', pack);
export default pack;
