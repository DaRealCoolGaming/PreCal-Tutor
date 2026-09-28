import { registerGeneratorPack } from './generators.js';
import { choiceQuestion, numberQuestion, randomInt, choose, nonZeroInt, fractionText } from './generator-helpers.js';

const round = (value, digits = 4) => Number(value.toFixed(digits));
const nCr = (n,r) => { r=Math.min(r,n-r); let result=1; for(let k=1;k<=r;k++) result=result*(n-r+k)/k; return Math.round(result); };

const pack = {
    sequenceNextTerm: ({ rng, conceptId, difficulty }) => {
        const arithmetic=rng()<.5, a=nonZeroInt(rng,-8,8), step=arithmetic?nonZeroInt(rng,-5,5):choose(rng,[-3,-2,2,3]);
        const terms=Array.from({length:4},(_,i)=>arithmetic?a+i*step:a*(step**i));
        const next=arithmetic?a+4*step:a*(step**4);
        const raw = arithmetic ? [next-step,next+step,next+2*step,next+1] : [terms[3]+step, next+step, next-step, next+1, next-1];
        const distractors=[...new Set(raw.map(String).filter(value=>value!==String(next)))].slice(0,3);
        if(distractors.length<3) throw new Error('Unable to build distinct sequence distractors.');
        return choiceQuestion({rng,prompt:`Find the next term: ${terms.join(', ')}, …`,correct:String(next),distractors,conceptId,difficulty,review:'4.1 Sequence patterns',
            explanation:arithmetic?'Consecutive terms differ by a constant amount.':'Consecutive terms are related by a constant multiplier.',steps:[arithmetic?`Common difference = ${step}.`:`Common ratio = ${step}.`,`Apply that pattern once more to ${terms[3]} to get ${next}.`],hints:['Compare neighboring terms.','Decide whether subtraction or division reveals a constant pattern.']});
    },
    sequenceNotation: ({ rng, conceptId, difficulty }) => {
        const n=randomInt(rng,4,12);
        return choiceQuestion({rng,prompt:`What does a_${n} mean in sequence notation?`,correct:`the ${n}th term of the sequence`,distractors:[`the sum of the first ${n} terms`,`the common difference multiplied by ${n}`,`the first term raised to the ${n}th power`],conceptId,difficulty,review:'4.1 Sequence notation',
            explanation:'The subscript identifies position. a_n names one term; S_n is commonly used for a partial sum.',steps:[`Read the subscript ${n} as the position number.`,`a_${n} refers to one term, not a sum.`],hints:['The subscript is an index.']});
    },
    arithmeticNth: ({ rng, conceptId, difficulty }) => {
        const a1=nonZeroInt(rng,-10,12), d=nonZeroInt(rng,-6,6), n=randomInt(rng,4,15), value=a1+(n-1)*d;
        return numberQuestion({prompt:`An arithmetic sequence has a₁=${a1} and d=${d}. Find a_${n}.`,value,conceptId,difficulty,review:'4.2 Arithmetic sequences',
            explanation:'An arithmetic sequence adds the common difference once for each step after the first term.',steps:[`Use a_n=a₁+(n−1)d.`,`a_${n}=${a1}+(${n-1})(${d}).`,`a_${n}=${value}.`],hints:['There are n−1 jumps from term 1 to term n.']});
    },
    arithmeticDifference: ({ rng, conceptId, difficulty }) => {
        const a=nonZeroInt(rng,-8,8), d=nonZeroInt(rng,-7,7), terms=[a,a+d,a+2*d,a+3*d];
        return numberQuestion({prompt:`Find the common difference of ${terms.join(', ')}.`,value:d,conceptId,difficulty,review:'4.2 Common difference',
            explanation:'Subtract any term from the next term. In an arithmetic sequence that difference stays constant.',steps:[`${terms[1]}−(${terms[0]})=${d}.`,`Check another pair to confirm the same difference.`],hints:['Use next term minus previous term.']});
    },
    arithmeticFormula: ({ rng, conceptId, difficulty }) => {
        const a1=nonZeroInt(rng,-9,9), d=nonZeroInt(rng,-5,5);
        const correct=`a_n = ${a1} + (n − 1)(${d})`;
        return choiceQuestion({rng,prompt:`Which explicit formula matches an arithmetic sequence with a₁=${a1} and d=${d}?`,correct,distractors:[`a_n = ${a1} + n(${d})`,`a_n = ${a1}(${d})^(n − 1)`,`a_n = ${a1} − (n − 1)(${d})`],conceptId,difficulty,review:'4.2 Explicit arithmetic formulas',
            explanation:'The standard explicit arithmetic formula is a_n=a₁+(n−1)d.',steps:['Start at a₁.','Add d for each of the n−1 steps.'],hints:['Use a₁+(n−1)d.']});
    },
    geometricNth: ({ rng, conceptId, difficulty }) => {
        const a1=choose(rng,[1,2,3,4,5]), r=choose(rng,[-3,-2,2,3]), n=randomInt(rng,3,7), value=a1*(r**(n-1));
        return numberQuestion({prompt:`A geometric sequence has a₁=${a1} and r=${r}. Find a_${n}.`,value,conceptId,difficulty,review:'4.3 Geometric sequences',
            explanation:'A geometric sequence multiplies by r once for each step after the first term.',steps:[`Use a_n=a₁r^(n−1).`,`a_${n}=${a1}(${r})^${n-1}.`,`a_${n}=${value}.`],hints:['The exponent is n−1.']});
    },
    geometricRatio: ({ rng, conceptId, difficulty }) => {
        const a=choose(rng,[1,2,3,4]), r=choose(rng,[-4,-3,-2,2,3,4]), terms=[a,a*r,a*r*r,a*r*r*r];
        return numberQuestion({prompt:`Find the common ratio of ${terms.join(', ')}.`,value:r,conceptId,difficulty,review:'4.3 Common ratio',
            explanation:'Divide a term by the previous term. That quotient is constant in a geometric sequence.',steps:[`${terms[1]}/${terms[0]}=${r}.`,`Check ${terms[2]}/${terms[1]}=${r}.`],hints:['Use second term ÷ first term.']});
    },
    geometricFormula: ({ rng, conceptId, difficulty }) => {
        const a1=choose(rng,[1,2,3,5]), r=choose(rng,[-3,-2,2,3]);
        const correct=`a_n = ${a1}(${r})^(n − 1)`;
        return choiceQuestion({rng,prompt:`Which explicit rule matches a geometric sequence with a₁=${a1} and r=${r}?`,correct,distractors:[`a_n = ${a1} + (n − 1)(${r})`,`a_n = ${a1}(${r})^n`,`a_n = (${r})^n`],conceptId,difficulty,review:'4.3 Explicit geometric formulas',
            explanation:'The first term occurs when the exponent is 0, so the exponent must be n−1.',steps:['Use a_n=a₁r^(n−1).','At n=1, r⁰=1 and the formula returns a₁.'],hints:['Test the formula at n=1.']});
    },
    recursiveArithmetic: ({ rng, conceptId, difficulty }) => {
        const a1=nonZeroInt(rng,-8,8), d=nonZeroInt(rng,-5,5), correct=`a₁ = ${a1}; a_n = a_(n−1) ${d<0?'−':'+'} ${Math.abs(d)}`;
        return choiceQuestion({rng,prompt:`Choose the recursive rule for the arithmetic sequence with a₁=${a1} and d=${d}.`,correct,distractors:[`a₁ = ${a1}; a_n = ${d}a_(n−1)`,`a_n = ${a1} + n(${d})`,`a₁ = ${a1}; a_n = a_(n−1) − (${d})`],conceptId,difficulty,review:'4.4 Recursive formulas',
            explanation:'A recursive arithmetic rule gives the first term, then adds the common difference to the previous term.',steps:[`Record a₁=${a1}.`,`Use a_n=a_(n−1)+d with d=${d}.`],hints:['Recursive means “use the previous term.”']});
    },
    recursiveGeometric: ({ rng, conceptId, difficulty }) => {
        const a1=choose(rng,[1,2,3,4]), r=choose(rng,[-3,-2,2,3]), correct=`a₁ = ${a1}; a_n = ${r}a_(n−1)`;
        return choiceQuestion({rng,prompt:`Choose the recursive rule for the geometric sequence with a₁=${a1} and r=${r}.`,correct,distractors:[`a₁ = ${a1}; a_n = a_(n−1) + ${r}`,`a_n = ${a1}(${r})^n`,`a₁ = ${a1}; a_n = (${r}+1)a_(n−1)`],conceptId,difficulty,review:'4.4 Recursive formulas',
            explanation:'A recursive geometric rule multiplies the previous term by the common ratio.',steps:[`Record a₁=${a1}.`,`Use a_n=r·a_(n−1).`],hints:['Geometric means repeated multiplication.']});
    },
    explicitVsRecursive: ({ rng, conceptId, difficulty }) => choiceQuestion({rng,prompt:'Which statement best distinguishes explicit and recursive sequence formulas?',correct:'An explicit rule finds a_n directly from n; a recursive rule uses one or more previous terms.',distractors:['Explicit rules work only for arithmetic sequences.','Recursive rules never need an initial term.','Explicit and recursive rules always use the same algebraic form.'],conceptId,difficulty,review:'4.4 Explicit vs recursive formulas',
        explanation:'Explicit rules jump directly to a requested position. Recursive rules define a starting point and a relationship from earlier terms to later ones.',steps:['Identify what information the rule requires.','If it needs a previous term, it is recursive.'],hints:['Does the formula depend directly on n or on a previous a-value?']}),
    sigmaEvaluateLinear: ({ rng, conceptId, difficulty }) => {
        const start=randomInt(rng,1,3), end=randomInt(rng,5,8), a=nonZeroInt(rng,-3,4), b=randomInt(rng,-4,4);
        let sum=0; for(let k=start;k<=end;k++) sum+=a*k+b;
        return numberQuestion({prompt:`Evaluate Σ from k=${start} to ${end} of (${a}k ${b<0?'−':'+'} ${Math.abs(b)}).`,value:sum,conceptId,difficulty,review:'4.5 Sigma notation',
            explanation:'Sigma notation means evaluate the expression at every integer index from the lower bound through the upper bound, then add.',steps:[`Use k=${start},${start+1},…,${end}.`,`Evaluate ${a}k ${b<0?'−':'+'} ${Math.abs(b)} for each index.`,`Add the terms to get ${sum}.`],hints:['The lower and upper bounds are both included.']});
    },
    sigmaMeaning: ({ rng, conceptId, difficulty }) => choiceQuestion({rng,prompt:'What does Σ from k=1 to 5 of a_k mean?',correct:'a₁ + a₂ + a₃ + a₄ + a₅',distractors:['5a_k','a₁ · a₂ · a₃ · a₄ · a₅','a₅ − a₁'],conceptId,difficulty,review:'4.5 Sigma notation',
        explanation:'The sigma symbol instructs you to add the expression for each integer value of the index in the stated range.',steps:['Start at k=1.','Continue through k=5.','Add each corresponding term.'],hints:['Σ means sum.']}),
    sigmaRepresentArithmetic: ({ rng, conceptId, difficulty }) => {
        const a1=nonZeroInt(rng,-6,8), d=nonZeroInt(rng,-4,5), n=randomInt(rng,4,8), correct=`Σ(k=1 to ${n}) [${a1} + (k − 1)(${d})]`;
        return choiceQuestion({rng,prompt:`Which sigma expression represents the first ${n} terms of the arithmetic sequence with a₁=${a1}, d=${d}?`,correct,distractors:[`Σ(k=1 to ${n}) [${a1}(${d})^(k − 1)]`,`Σ(k=0 to ${n}) [${a1} + k(${d})]`,`Σ(k=1 to ${n}) [${a1} + k(${d})]`],conceptId,difficulty,review:'4.5 Writing sigma notation',
            explanation:'Insert the arithmetic explicit formula a_k=a₁+(k−1)d inside the summation.',steps:['Write a_k=a₁+(k−1)d.','Use k=1 through n for the first n terms.'],hints:['Put the kth-term formula inside Σ.']});
    },
    arithmeticSum: ({ rng, conceptId, difficulty }) => {
        const a1=nonZeroInt(rng,-8,12), d=nonZeroInt(rng,-4,6), n=randomInt(rng,5,15), an=a1+(n-1)*d, value=n*(a1+an)/2;
        return numberQuestion({prompt:`Find S_${n} for an arithmetic series with a₁=${a1} and d=${d}.`,value,conceptId,difficulty,review:'4.6 Arithmetic series',
            explanation:'An arithmetic sum equals the number of terms times the average of the first and last terms.',steps:[`a_${n}=${a1}+(${n-1})(${d})=${an}.`,`S_${n}=${n}(${a1}+${an})/2.`,`S_${n}=${value}.`],hints:['Find the last term first.','Use S_n=n(a₁+a_n)/2.']});
    },
    arithmeticSumFromEndpoints: ({ rng, conceptId, difficulty }) => {
        const n=randomInt(rng,6,20), first=nonZeroInt(rng,-8,12), last=first+nonZeroInt(rng,4,18), value=n*(first+last)/2;
        return numberQuestion({prompt:`An arithmetic series has ${n} terms, first term ${first}, and last term ${last}. Find the sum.`,value,conceptId,difficulty,review:'4.6 Arithmetic partial sums',
            explanation:'When the first term, last term, and number of terms are known, use S_n=n(a₁+a_n)/2 directly.',steps:[`Average endpoints: (${first}+${last})/2.`,`Multiply that average by ${n}.`,`Sum = ${value}.`],hints:['Pairing first and last terms reveals the average.']});
    },
    finiteGeometricSum: ({ rng, conceptId, difficulty }) => {
        const a1=choose(rng,[1,2,3,4,5]), r=choose(rng,[-3,-2,2,3]), n=randomInt(rng,3,7), value=a1*(1-r**n)/(1-r);
        return numberQuestion({prompt:`Find S_${n} for a geometric series with a₁=${a1} and r=${r}.`,value,conceptId,difficulty,review:'4.7 Finite geometric series',
            explanation:'A finite geometric series can be summed with S_n=a₁(1−r^n)/(1−r), provided r≠1.',steps:[`Compute r^n=${r**n}.`,`Substitute into S_n=${a1}(1−${r}^${n})/(1−${r}).`,`S_${n}=${value}.`],hints:['Use the finite geometric sum formula.','Convergence is not required for a finite sum.']});
    },
    finiteVsInfinite: ({ rng, conceptId, difficulty }) => choiceQuestion({rng,prompt:'Which statement is true about the finite geometric sum formula?',correct:'It can be used for r with |r| greater than 1 because only finitely many terms are being added.',distractors:['It works only when |r|<1.','It requires r=1.','It is identical to the infinite-sum formula a₁/(1−r).'],conceptId,difficulty,review:'4.7 Finite geometric series',
        explanation:'Convergence matters only when infinitely many terms are added. A finite geometric sum is an ordinary finite calculation for any r≠1.',steps:['Separate “finite number of terms” from “infinite limit.”','Use the finite formula regardless of |r|, as long as r≠1.'],hints:['Ask whether infinitely many terms are involved.']}),
    infiniteGeoConvergence: ({ rng, conceptId, difficulty }) => {
        const choices=[-1.4,-1,-0.8,-0.5,0.25,0.75,1,1.2]; const r=choose(rng,choices); const converges=Math.abs(r)<1; const correct=converges?'converges':'diverges';
        return choiceQuestion({rng,prompt:`An infinite geometric series has r=${r}. Does it converge or diverge?`,correct,distractors:[converges?'diverges':'converges','converges only if a₁=1','cannot be determined from r'],conceptId,difficulty,review:'4.8 Infinite geometric series',
            explanation:'An infinite geometric series converges exactly when |r|<1.',steps:[`Compute |r|=${Math.abs(r)}.`,converges?'Because this is less than 1, the terms shrink enough for a finite sum.':'Because this is at least 1, the series does not approach a finite sum.'],hints:['Check the magnitude of r, not just its sign.']});
    },
    infiniteGeoSum: ({ rng, conceptId, difficulty }) => {
        const a1=choose(rng,[2,3,4,5,6,8]), denom=choose(rng,[2,3,4,5]), sign=rng()<.25?-1:1, r=sign/denom, value=a1/(1-r);
        return numberQuestion({prompt:`Find the sum of the infinite geometric series with a₁=${a1} and r=${fractionText(sign,denom)}.`,value:round(value,6),tolerance:1e-6,conceptId,difficulty,review:'4.8 Infinite geometric series',
            explanation:'Since |r|<1, the partial sums approach S=a₁/(1−r).',steps:[`|r|=${round(Math.abs(r),4)}<1, so the series converges.`,`S=${a1}/(1−(${round(r,4)})).`,`S=${round(value,6)}.`],hints:['Check convergence first.','Then use S=a₁/(1−r).']});
    },
    binomialCoefficient: ({ rng, conceptId, difficulty }) => {
        const n=randomInt(rng,4,9), r=randomInt(rng,1,n-1), value=nCr(n,r);
        return numberQuestion({prompt:`Find the binomial coefficient C(${n}, ${r}).`,value,conceptId,difficulty,review:'4.9 Binomial Theorem',
            explanation:'C(n,r)=n!/[r!(n−r)!] gives the coefficient from row n of Pascal’s Triangle.',steps:[`C(${n},${r})=${n}!/[${r}!(${n-r})!].`,`Simplify to ${value}.`],hints:['Use n choose r.','C(n,r)=C(n,n−r) can simplify mental work.']});
    },
    binomialSpecificTerm: ({ rng, conceptId, difficulty }) => {
        const n=randomInt(rng,3,6), r=randomInt(rng,1,n-1), b=choose(rng,[2,3]), coefficient=nCr(n,r)*(b**r), xPower=n-r;
        const correct=`${coefficient}x^${xPower}`;
        const d1=`${nCr(n,r)}x^${xPower}`;
        const d2=`${coefficient}x^${xPower+1}`;
        const d3=`${coefficient+b}x^${xPower}`;
        return choiceQuestion({rng,prompt:`In the expansion of (x + ${b})^${n}, what is the term containing x^${xPower}?`,correct,distractors:[d1,d2,d3],conceptId,difficulty,review:'4.9 Binomial Theorem',
            explanation:'The general term is C(n,r)x^(n−r)b^r. Match the requested x-power to determine r.',steps:[`x-power ${xPower}=n−r, so r=${r}.`,`Coefficient=C(${n},${r})·${b}^${r}=${coefficient}.`,`Term=${correct}.`],hints:['Use C(n,r)x^(n−r)b^r.','Match n−r to the requested exponent.']});
    },
    binomialExpansionSmall: ({ rng, conceptId, difficulty }) => {
        const b=choose(rng,[2,3,4]), correct=`x² + ${2*b}x + ${b*b}`;
        return choiceQuestion({rng,prompt:`Expand (x + ${b})².`,correct,distractors:[`x² + ${b*b}`,`x² + ${b}x + ${b*b}`,`x² + ${2*b}x + ${b*b+b}`],conceptId,difficulty,review:'4.9 Binomial expansion',
            explanation:'Use (a+b)²=a²+2ab+b²; the middle term is essential.',steps:[`x² stays x².`,`2(x)(${b})=${2*b}x.`,`${b}²=${b*b}.`],hints:['Do not forget the middle term 2ab.']});
    },
    arithmeticApplication: ({ rng, conceptId, difficulty }) => {
        const first=choose(rng,[20,30,40,50]), increase=choose(rng,[5,10,15]), weeks=randomInt(rng,5,10), total=weeks*(2*first+(weeks-1)*increase)/2;
        return numberQuestion({prompt:`A student saves $${first} in week 1 and increases the weekly deposit by $${increase} each week. How much is deposited in total during the first ${weeks} weeks?`,value:total,conceptId,difficulty,review:'4.10 Sequence and series applications',
            explanation:'The weekly deposits form an arithmetic sequence, but the question asks for the total, so use an arithmetic series.',steps:[`a₁=${first}, d=${increase}, n=${weeks}.`,`a_n=${first}+(${weeks-1})(${increase})=${first+(weeks-1)*increase}.`,`S_n=${total}.`],hints:['The word “total” means sum the terms.','Use an arithmetic series, not just the nth-term formula.']});
    },
    geometricApplication: ({ rng, conceptId, difficulty }) => {
        const initial=choose(rng,[100,200,500]), rate=choose(rng,[1.05,1.1,1.2]), periods=randomInt(rng,3,6), value=round(initial*rate**(periods-1),2);
        return numberQuestion({prompt:`A quantity is ${initial} in period 1 and multiplies by ${rate} each period. What is the amount in period ${periods}?`,value,tolerance:.011,conceptId,difficulty,review:'4.10 Geometric applications',
            explanation:'Repeated multiplication produces a geometric sequence, so use a_n=a₁r^(n−1).',steps:[`a₁=${initial}, r=${rate}, n=${periods}.`,`a_${periods}=${initial}(${rate})^${periods-1}.`,`a_${periods}≈${value}.`],hints:['Use the geometric nth-term formula.']});
    },
    modelSequenceType: ({ rng, conceptId, difficulty }) => choiceQuestion({rng,prompt:'A payment increases by $25 each month. Which sequence type models the monthly payment amounts?',correct:'arithmetic sequence',distractors:['geometric sequence','infinite geometric series','binomial expansion'],conceptId,difficulty,review:'4.10 Choosing sequence models',
        explanation:'A constant additive change produces an arithmetic sequence. A constant multiplicative factor would produce a geometric sequence.',steps:['Identify how each term changes from the previous term.','Adding the same $25 means constant difference.'],hints:['Constant amount change → arithmetic.']})
};

registerGeneratorPack('u4', pack);
export default pack;
