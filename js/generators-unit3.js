import { registerGeneratorPack } from './generators.js';
import { choiceQuestion, numberQuestion, randomInt, choose, nonZeroInt, fractionText } from './generator-helpers.js';

const round = (value, digits = 4) => Number(value.toFixed(digits));
const signedText = value => value < 0 ? `− ${Math.abs(value)}` : `+ ${value}`;

function powerChoice(rng, base, exponent, conceptId, difficulty, review) {
    const value = base ** exponent;
    const candidates = [base * exponent, base ** Math.max(1, exponent - 1), value + base, value - base, value + exponent, value + 1];
    const distractors = [...new Set(candidates.map(String).filter(item => item !== String(value)))].slice(0,3);
    if (distractors.length < 3) throw new Error('Unable to build distinct exponential distractors.');
    return choiceQuestion({
        rng,
        prompt: `Evaluate ${base}^${exponent}.`,
        correct: String(value),
        distractors,
        conceptId, difficulty, review,
        explanation: 'An exponent counts repeated multiplication by the base, not multiplication of the base and exponent.',
        steps: [`Write ${base} as a factor ${exponent} times.`, `Multiply to get ${value}.`],
        hints: ['The exponent tells how many copies of the base are multiplied.', 'Do not multiply the base by the exponent.']
    });
}

const pack = {
    expEvaluate: ({ rng, conceptId, difficulty }) => {
        const base = choose(rng, [2,3,4,5]);
        const exponent = randomInt(rng, 2, 5);
        return powerChoice(rng, base, exponent, conceptId, difficulty, '3.1 Exponential functions');
    },
    expGrowthOrDecay: ({ rng, conceptId, difficulty }) => {
        const base = choose(rng, [0.25,0.5,0.8,1.2,1.5,2,3]);
        const correct = base > 1 ? 'exponential growth' : 'exponential decay';
        return choiceQuestion({rng,prompt:`Classify f(x) = 7(${base})^x.`,correct,distractors:[correct==='exponential growth'?'exponential decay':'exponential growth','linear growth','quadratic'],conceptId,difficulty,review:'3.1 Exponential functions',
            explanation:'For f(x)=ab^x with a>0, the base b controls growth or decay: b>1 grows, while 0<b<1 decays.',steps:[`Identify the base b=${base}.`,base>1?'Because b>1, outputs grow by a constant factor.':'Because 0<b<1, outputs shrink by a constant factor.'],hints:['Ignore the leading coefficient first.','Compare the base with 1.']});
    },
    expInterceptAsymptote: ({ rng, conceptId, difficulty }) => {
        const a = randomInt(rng, 2, 8), k = nonZeroInt(rng, -4, 4);
        const correct = `y-intercept ${a+k}; horizontal asymptote y = ${k}`;
        return choiceQuestion({rng,prompt:`For f(x) = ${a}(2)^x ${signedText(k)}, identify the y-intercept value and horizontal asymptote.`,correct,distractors:[`y-intercept ${a}; horizontal asymptote y = ${k}`,`y-intercept ${a+k}; vertical asymptote x = ${k}`,`y-intercept ${a+k}; horizontal asymptote y = 0`],conceptId,difficulty,review:'3.1 Exponential graph features',
            explanation:'At x=0, b^0=1, so f(0)=a+k. A vertical shift by k moves the parent asymptote y=0 to y=k.',steps:['Substitute x=0.','Use b⁰=1.','Shift the parent horizontal asymptote from y=0 to y=k.'],hints:['Find f(0) for the y-intercept.','Exponential parents have a horizontal, not vertical, asymptote.']});
    },
    percentFactor: ({ rng, conceptId, difficulty }) => {
        const percent = choose(rng,[5,8,10,12,15,20,25,30]);
        const growth = rng() < .5;
        const factor = growth ? 1 + percent/100 : 1 - percent/100;
        const correct = String(round(factor,2));
        return choiceQuestion({rng,prompt:`A quantity ${growth?'increases':'decreases'} by ${percent}% each period. What exponential multiplier should be used?`,correct,distractors:[String(percent/100),String(round(growth?1-percent/100:1+percent/100,2)),String(round(factor+0.13,2))],conceptId,difficulty,review:'3.2 Growth and decay',
            explanation:`Convert ${percent}% to ${percent/100}. For ${growth?'growth, add':'decay, subtract'} that rate ${growth?'to':'from'} 1.`,steps:[`${percent}% = ${percent/100}.`,`${growth?'1 +':'1 −'} ${percent/100} = ${correct}.`],hints:['Percent change is not the multiplier by itself.','Start from 1 = 100% of the previous amount.']});
    },
    growthDecayValue: ({ rng, conceptId, difficulty }) => {
        const start = randomInt(rng, 20, 120), rate = choose(rng,[10,20,25,50]), periods = randomInt(rng,2,4), growth = rng()<.55;
        const factor = growth ? 1+rate/100 : 1-rate/100;
        const value = round(start * factor ** periods, 2);
        return numberQuestion({prompt:`A quantity starts at ${start} and ${growth?'grows':'decays'} by ${rate}% each period. Find its value after ${periods} periods.`,value,tolerance:.011,conceptId,difficulty,review:'3.2 Exponential growth and decay',
            explanation:'Repeated percent change is multiplicative, so apply the same growth/decay factor once per period.',steps:[`Multiplier = ${growth?'1 +':'1 −'} ${rate/100} = ${factor}.`,`Model: A=${start}(${factor})^${periods}.`,`A≈${value}.`],hints:['Build the multiplier from the percent.','Use initial · factor^time.']});
    },
    compareLinearExponential: ({ rng, conceptId, difficulty }) => choiceQuestion({rng,prompt:'Which description signals an exponential model rather than a linear model?',correct:'The quantity changes by the same percent over equal time intervals.',distractors:['The quantity changes by the same amount over equal intervals.','The graph has a constant slope.','The first differences are constant.'],conceptId,difficulty,review:'3.2 Choosing models',
        explanation:'Linear models add a constant amount. Exponential models multiply by a constant factor, which appears as a constant percent change.',steps:['Ask whether the change is additive or multiplicative.','Constant percent means constant multiplier, so exponential.'],hints:['Percent change is multiplicative.','Linear models use constant differences.']}),
    naturalExpValue: ({ rng, conceptId, difficulty }) => {
        const a = choose(rng,[2,5,10,20]), rate = choose(rng,[0.05,0.08,0.1,0.12]), t=randomInt(rng,2,6), growth=rng()<.6;
        const signedRate = growth ? rate : -rate;
        const value = round(a*Math.exp(signedRate*t),2);
        return numberQuestion({prompt:`Evaluate A(t)=${a}e^(${signedRate}t) at t=${t}. Round to the nearest hundredth.`,value,tolerance:.011,conceptId,difficulty,review:'3.3 Natural exponential functions',
            explanation:'For continuous growth or decay, substitute time into the exponent and evaluate e to that power.',steps:[`Exponent = ${signedRate}(${t}) = ${round(signedRate*t,3)}.`,`A=${a}e^${round(signedRate*t,3)}.`,`A≈${value}.`],hints:['Evaluate the exponent first.','A negative exponent models continuous decay.']});
    },
    continuousRateMeaning: ({ rng, conceptId, difficulty }) => {
        const rate = choose(rng,[0.03,0.05,0.08,0.12]);
        const correct = `${Math.round(rate*100)}% continuous growth rate`;
        return choiceQuestion({rng,prompt:`In A(t)=400e^(${rate}t), what does ${rate} represent?`,correct,distractors:[`${rate}% continuous growth rate`,`${Math.round(rate*100)}% simple interest rate`,'the initial amount'],conceptId,difficulty,review:'3.3 Continuous models',
            explanation:'In A=A₀e^{rt}, r is written as a decimal continuous rate. Multiplying by 100 converts it to a percent rate.',steps:[`r=${rate}.`,`Convert to percent: ${rate}×100=${Math.round(rate*100)}%.`],hints:['The coefficient of t in the exponent is r.','Convert a decimal rate to percent.']});
    },
    expLogConvert: ({ rng, conceptId, difficulty }) => {
        const base=choose(rng,[2,3,4,5]), exponent=randomInt(rng,2,4), value=base**exponent;
        const correct=`log_${base}(${value}) = ${exponent}`;
        return choiceQuestion({rng,prompt:`Rewrite ${base}^${exponent} = ${value} in logarithmic form.`,correct,distractors:[`log_${value}(${base}) = ${exponent}`,`log_${base}(${exponent}) = ${value}`,`${base}log(${value}) = ${exponent}`],conceptId,difficulty,review:'3.4 Exponential and logarithmic forms',
            explanation:'b^y=x and log_b(x)=y are equivalent statements.',steps:[`Base stays ${base}.`,`The exponential result ${value} becomes the log argument.`,`The exponent ${exponent} becomes the logarithm value.`],hints:['Keep the same base.','A logarithm answers: “what exponent?”']});
    },
    logExpConvert: ({ rng, conceptId, difficulty }) => {
        const base=choose(rng,[2,3,5,10]), exponent=randomInt(rng,2,4), value=base**exponent;
        const correct=`${base}^${exponent} = ${value}`;
        return choiceQuestion({rng,prompt:`Rewrite log_${base}(${value}) = ${exponent} in exponential form.`,correct,distractors:[`${value}^${base} = ${exponent}`,`${base}^${value} = ${exponent}`,`${base} × ${exponent} = ${value}`],conceptId,difficulty,review:'3.4 Exponential and logarithmic forms',
            explanation:'log_b(x)=y means exactly b^y=x.',steps:[`Base = ${base}.`,`Exponent = ${exponent}.`,`Result = ${value}.`],hints:['Read log_b(x)=y as b to the y equals x.']});
    },
    inverseRelationship: ({ rng, conceptId, difficulty }) => choiceQuestion({rng,prompt:'Why are y = 3^x and y = log₃(x) inverse functions?',correct:'Their coordinates swap, so their graphs reflect across y = x.',distractors:['They have the same domain and range.','Their graphs are reflections across the x-axis.','Their outputs are always reciprocals.'],conceptId,difficulty,review:'3.4 Inverse functions',
        explanation:'Exponential and logarithmic forms undo each other. Inverse graphs exchange x- and y-coordinates and reflect across y=x.',steps:['Write y=3^x.','Swap x and y: x=3^y.','Solve for y: y=log₃(x).'],hints:['Inverses swap input and output.','Think about reflection across y=x.']}),
    exactLog: ({ rng, conceptId, difficulty }) => {
        const base=choose(rng,[2,3,4,5,10]), exponent=randomInt(rng,1,4), value=base**exponent;
        return numberQuestion({prompt:`Evaluate log_${base}(${value}).`,value:exponent,conceptId,difficulty,review:'3.5 Evaluating logarithms',
            explanation:`A logarithm asks for the exponent on ${base} that produces ${value}.`,steps:[`${base}^${exponent}=${value}.`,`Therefore log_${base}(${value})=${exponent}.`],hints:[`Ask: ${base} to what power equals ${value}?`]});
    },
    naturalLogExact: ({ rng, conceptId, difficulty }) => {
        const exponent=randomInt(rng,-4,5);
        return numberQuestion({prompt:`Evaluate ln(e^${exponent}).`,value:exponent,conceptId,difficulty,review:'3.5 Natural logarithms',
            explanation:'ln and e^x are inverse functions, so ln(e^k)=k.',steps:['Recognize ln as logarithm base e.','The inverse operations cancel.'],hints:['ln(e^x)=x.']});
    },
    commonLogPower: ({ rng, conceptId, difficulty }) => {
        const exponent=randomInt(rng,-3,5);
        return numberQuestion({prompt:`Evaluate log(10^${exponent}).`,value:exponent,conceptId,difficulty,review:'3.5 Common logarithms',
            explanation:'When no base is shown in standard precalculus notation, log means base 10. Therefore log(10^k)=k.',steps:['Interpret log as log₁₀.','Base 10 logarithm and 10^x undo each other.'],hints:['Common log uses base 10.']});
    },
    logProductExpand: ({ rng, conceptId, difficulty }) => choiceQuestion({rng,prompt:'Expand log_b(xy³).',correct:'log_b(x) + 3log_b(y)',distractors:['log_b(x) · 3log_b(y)','log_b(x) + log_b(y)/3','3log_b(xy)'],conceptId,difficulty,review:'3.6 Logarithm properties',
        explanation:'The product rule turns multiplication into addition, and the power rule moves an exponent in front as a coefficient.',steps:['log_b(xy³)=log_b(x)+log_b(y³).','log_b(y³)=3log_b(y).'],hints:['Product becomes a sum.','Exponent becomes a coefficient.']}),
    logQuotientExpand: ({ rng, conceptId, difficulty }) => choiceQuestion({rng,prompt:'Expand ln(x²/y).',correct:'2ln(x) − ln(y)',distractors:['2ln(x) + ln(y)','ln(2x − y)','ln(x²) / ln(y)'],conceptId,difficulty,review:'3.6 Logarithm properties',
        explanation:'The quotient rule turns division into subtraction, and the power rule moves the exponent 2 to the front.',steps:['ln(x²/y)=ln(x²)−ln(y).','ln(x²)=2ln(x).'],hints:['Quotient becomes a difference.','Use the power rule on x².']}),
    logCondense: ({ rng, conceptId, difficulty }) => choiceQuestion({rng,prompt:'Condense 2log_b(x) + log_b(y) − log_b(z).',correct:'log_b(x²y/z)',distractors:['log_b(2xy − z)','log_b(x²yz)','log_b(xy²/z)'],conceptId,difficulty,review:'3.6 Condensing logarithms',
        explanation:'Move coefficients to exponents, combine added logs as a product, then use subtraction as a quotient.',steps:['2log_b(x)=log_b(x²).','log_b(x²)+log_b(y)=log_b(x²y).','Subtract log_b(z) to get log_b(x²y/z).'],hints:['Coefficients become exponents.','Addition means product; subtraction means quotient.']}),
    changeOfBase: ({ rng, conceptId, difficulty }) => {
        const base=choose(rng,[2,3,5,7]), value=choose(rng,[8,10,20,50]);
        const answer=round(Math.log(value)/Math.log(base),4);
        return numberQuestion({prompt:`Use change of base to approximate log_${base}(${value}) to four decimal places.`,value:answer,tolerance:.00011,conceptId,difficulty,review:'3.6 Change of base',
            explanation:'Change of base rewrites a logarithm using any convenient common base: log_b(x)=ln(x)/ln(b).',steps:[`Compute ln(${value})/ln(${base}).`,`Round the quotient to four decimals: ${answer}.`],hints:['Use ln(value) ÷ ln(base).']});
    },
    expEquationSameBase: ({ rng, conceptId, difficulty }) => {
        const base=choose(rng,[2,3,5]), x=randomInt(rng,-3,6), shift=randomInt(rng,-4,4), exponent=x+shift;
        return numberQuestion({prompt:`Solve ${base}^(x ${shift<0?'−':'+'} ${Math.abs(shift)}) = ${base}^${exponent}.`,value:x,conceptId,difficulty,review:'3.7 Exponential equations',
            explanation:'When both sides have the same positive base other than 1, their exponents must be equal.',steps:[`Set x ${shift<0?'−':'+'} ${Math.abs(shift)} = ${exponent}.`,`Solve to get x=${x}.`],hints:['The bases already match.','Equate the exponents.']});
    },
    expEquationLog: ({ rng, conceptId, difficulty }) => {
        const base=choose(rng,[2,3,5,7]), target=choose(rng,[10,15,20,40,75]), answer=round(Math.log(target)/Math.log(base),4);
        return numberQuestion({prompt:`Solve ${base}^x = ${target}. Round x to four decimal places.`,value:answer,tolerance:.00011,conceptId,difficulty,review:'3.7 Solving with logarithms',
            explanation:'When the target is not a convenient power of the base, take logarithms and isolate x.',steps:[`ln(${base}^x)=ln(${target}).`,`x ln(${base})=ln(${target}).`,`x=ln(${target})/ln(${base})≈${answer}.`],hints:['Take ln of both sides.','Use the power rule to bring x down.']});
    },
    logEquationSingle: ({ rng, conceptId, difficulty }) => {
        const base=choose(rng,[2,3,5]), result=randomInt(rng,1,4), shift=nonZeroInt(rng,-6,6), inside=base**result, x=inside-shift;
        return numberQuestion({prompt:`Solve log_${base}(x ${shift<0?'−':'+'} ${Math.abs(shift)}) = ${result}.`,value:x,conceptId,difficulty,review:'3.8 Logarithmic equations',
            explanation:'Convert to exponential form, solve the resulting equation, and verify the log argument is positive.',steps:[`x ${shift<0?'−':'+'} ${Math.abs(shift)} = ${base}^${result} = ${inside}.`,`x=${x}.`,`Check the argument equals ${inside}>0.`],hints:['Convert log form to exponential form.','Check the argument after solving.']});
    },
    logEquationProduct: ({ rng, conceptId, difficulty }) => {
        const base=choose(rng,[2,3]), result=2, a=randomInt(rng,1,4), product=base**result, x=product/a;
        if (!Number.isInteger(x) || x<=0) return pack.logEquationProduct({rng,conceptId,difficulty});
        return numberQuestion({prompt:`Solve log_${base}(${a}) + log_${base}(x) = ${result}.`,value:x,conceptId,difficulty,review:'3.8 Combining logarithms',
            explanation:'Use the product rule to combine the logarithms before converting to exponential form.',steps:[`log_${base}(${a}x)=${result}.`,`${a}x=${base}^${result}=${product}.`,`x=${x}, which keeps both arguments positive.`],hints:['Sum of logs becomes log of a product.','Then convert to exponential form.']});
    },
    logDomainCheck: ({ rng, conceptId, difficulty }) => choiceQuestion({rng,prompt:'After solving a logarithmic equation, why must every proposed solution be checked in the original equation?',correct:'Logarithm arguments must stay positive, so algebra can produce extraneous values.',distractors:['Logarithms only accept integer outputs.','All logarithmic equations have two solutions.','A logarithm cannot contain variables.'],conceptId,difficulty,review:'3.8 Domain checks',
        explanation:'The real logarithm log_b(u) is defined only when u>0. Transforming or combining an equation can produce candidates that violate that original restriction.',steps:['Solve the transformed equation.','Substitute each candidate into every original log argument.','Reject any candidate making an argument ≤0.'],hints:['Think about the domain of log_b(x).']}),
    expGraphFeature: ({ rng, conceptId, difficulty }) => {
        const h=randomInt(rng,-4,4), k=randomInt(rng,-3,3), a=choose(rng,[1,2,3]);
        const correct=`horizontal asymptote y = ${k}`;
        return choiceQuestion({rng,prompt:`For y = ${a}·2^(x ${h>0?'−':'+'} ${Math.abs(h)}) ${signedText(k)}, which statement is always true?`,correct,distractors:[`vertical asymptote x = ${h}`,`horizontal asymptote y = ${k+1}`,`there is no asymptote`],conceptId,difficulty,review:'3.9 Exponential graphs',
            explanation:'Horizontal shifts move the curve left/right, while an outside vertical shift k moves the exponential parent asymptote y=0 to y=k.',steps:[`Parent 2^x has asymptote y=0.`,`Adding ${k} outside shifts the asymptote to y=${k}.`],hints:['Track the parent horizontal asymptote.','Only the outside vertical shift changes its y-value.']});
    },
    logGraphFeature: ({ rng, conceptId, difficulty }) => {
        const h=randomInt(rng,-4,4), k=randomInt(rng,-3,3);
        const correct=`vertical asymptote x = ${h}`;
        return choiceQuestion({rng,prompt:`For y = log₂(x ${h>=0?'−':'+'} ${Math.abs(h)}) ${signedText(k)}, identify the vertical asymptote.`,correct,distractors:[`horizontal asymptote y = ${h}`,`vertical asymptote x = ${h+1}`,`there is no asymptote`],conceptId,difficulty,review:'3.9 Logarithmic graphs',
            explanation:'The parent log has vertical asymptote x=0. Replacing x with x−h shifts that boundary to x=h.',steps:['Set the shifted log input boundary x−h=0.','Solve x=h.'],hints:['The logarithm input must be positive.','The asymptote occurs at the domain boundary.']});
    },
    inverseGraphAsymptotes: ({ rng, conceptId, difficulty }) => choiceQuestion({rng,prompt:'How do the parent asymptotes change when y=b^x and y=log_b(x) are viewed as inverse functions?',correct:'The exponential asymptote y = 0 reflects to the logarithmic asymptote x = 0.',distractors:['Both keep the same horizontal asymptote y = 0.','The exponential asymptote x = 0 reflects to y = 0.','Neither function has an asymptote.'],conceptId,difficulty,review:'3.9 Inverse graphs',
        explanation:'Inverse graphs reflect across y=x, so horizontal and vertical features swap orientation.',steps:['Parent exponential approaches y=0.','Reflect y=0 across y=x.','The reflected line is x=0.'],hints:['Reflect the line y=0 across y=x.']}),
    compoundInterest: ({ rng, conceptId, difficulty }) => {
        const principal=choose(rng,[500,800,1000,1200]), rate=choose(rng,[0.04,0.05,0.06,0.08]), n=choose(rng,[1,4,12]), years=randomInt(rng,2,5), value=round(principal*(1+rate/n)**(n*years),2);
        return numberQuestion({prompt:`$${principal} is invested at ${Math.round(rate*100)}% annual interest compounded ${n===1?'annually':n===4?'quarterly':'monthly'} for ${years} years. Find the balance to the nearest cent.`,value,tolerance:.011,conceptId,difficulty,review:'3.10 Exponential modeling',
            explanation:'Compound interest uses A=P(1+r/n)^(nt), where n counts compounding periods per year.',steps:[`Use P=${principal}, r=${rate}, n=${n}, t=${years}.`,`A=${principal}(1+${rate}/${n})^(${n*years}).`,`A≈${value}.`],hints:['Use the compound-interest model.','The exponent is n·t.']});
    },
    continuousTime: ({ rng, conceptId, difficulty }) => {
        const ratio=choose(rng,[2,3,4]), rate=choose(rng,[0.05,0.08,0.1,0.12]), time=round(Math.log(ratio)/rate,3);
        return numberQuestion({prompt:`A continuously growing quantity follows A=A₀e^(${rate}t). How long does it take to become ${ratio} times its initial value? Round to the nearest thousandth.`,value:time,tolerance:.0011,conceptId,difficulty,review:'3.10 Solving models with logarithms',
            explanation:'Divide by the initial amount first, then take natural logs to bring the time variable down from the exponent.',steps:[`${ratio}=e^(${rate}t).`,`ln(${ratio})=${rate}t.`,`t=ln(${ratio})/${rate}≈${time}.`],hints:['Cancel A₀ by dividing.','Take ln of both sides.']});
    },
    halfLifeModel: ({ rng, conceptId, difficulty }) => {
        const initial=choose(rng,[80,100,160,200]), half=choose(rng,[2,4,5,10]), periods=randomInt(rng,1,4), time=half*periods, value=initial/(2**periods);
        return numberQuestion({prompt:`A sample starts at ${initial} grams and has a half-life of ${half} years. How many grams remain after ${time} years?`,value,conceptId,difficulty,review:'3.10 Decay modeling',
            explanation:'Each half-life multiplies the amount by 1/2.',steps:[`${time}/${half}=${periods} half-lives pass.`,`A=${initial}(1/2)^${periods}.`,`A=${value}.`],hints:['Count how many half-lives pass.','Multiply by 1/2 once per half-life.']});
    }
};

registerGeneratorPack('u3', pack);
export default pack;
