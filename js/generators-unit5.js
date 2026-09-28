import { registerGeneratorPack } from './generators.js';
import { choiceQuestion, numberQuestion, randomInt, choose, fractionText } from './generator-helpers.js';

const PI = Math.PI;
const round = (value, digits = 4) => Number(value.toFixed(digits));

const standardAngles = [
    { deg: 0, rad: '0', ref: 0, quadrant: 'axis', sin: '0', cos: '1', tan: '0', x: '1', y: '0' },
    { deg: 30, rad: 'π/6', ref: 30, quadrant: 'I', sin: '1/2', cos: '√3/2', tan: '√3/3', x: '√3/2', y: '1/2' },
    { deg: 45, rad: 'π/4', ref: 45, quadrant: 'I', sin: '√2/2', cos: '√2/2', tan: '1', x: '√2/2', y: '√2/2' },
    { deg: 60, rad: 'π/3', ref: 60, quadrant: 'I', sin: '√3/2', cos: '1/2', tan: '√3', x: '1/2', y: '√3/2' },
    { deg: 90, rad: 'π/2', ref: 90, quadrant: 'axis', sin: '1', cos: '0', tan: 'undefined', x: '0', y: '1' },
    { deg: 120, rad: '2π/3', ref: 60, quadrant: 'II', sin: '√3/2', cos: '−1/2', tan: '−√3', x: '−1/2', y: '√3/2' },
    { deg: 135, rad: '3π/4', ref: 45, quadrant: 'II', sin: '√2/2', cos: '−√2/2', tan: '−1', x: '−√2/2', y: '√2/2' },
    { deg: 150, rad: '5π/6', ref: 30, quadrant: 'II', sin: '1/2', cos: '−√3/2', tan: '−√3/3', x: '−√3/2', y: '1/2' },
    { deg: 180, rad: 'π', ref: 0, quadrant: 'axis', sin: '0', cos: '−1', tan: '0', x: '−1', y: '0' },
    { deg: 210, rad: '7π/6', ref: 30, quadrant: 'III', sin: '−1/2', cos: '−√3/2', tan: '√3/3', x: '−√3/2', y: '−1/2' },
    { deg: 225, rad: '5π/4', ref: 45, quadrant: 'III', sin: '−√2/2', cos: '−√2/2', tan: '1', x: '−√2/2', y: '−√2/2' },
    { deg: 240, rad: '4π/3', ref: 60, quadrant: 'III', sin: '−√3/2', cos: '−1/2', tan: '√3', x: '−1/2', y: '−√3/2' },
    { deg: 270, rad: '3π/2', ref: 90, quadrant: 'axis', sin: '−1', cos: '0', tan: 'undefined', x: '0', y: '−1' },
    { deg: 300, rad: '5π/3', ref: 60, quadrant: 'IV', sin: '−√3/2', cos: '1/2', tan: '−√3', x: '1/2', y: '−√3/2' },
    { deg: 315, rad: '7π/4', ref: 45, quadrant: 'IV', sin: '−√2/2', cos: '√2/2', tan: '−1', x: '√2/2', y: '−√2/2' },
    { deg: 330, rad: '11π/6', ref: 30, quadrant: 'IV', sin: '−1/2', cos: '√3/2', tan: '−√3/3', x: '√3/2', y: '−1/2' },
    { deg: 360, rad: '2π', ref: 0, quadrant: 'axis', sin: '0', cos: '1', tan: '0', x: '1', y: '0' }
];

const exactPool = ['−√3', '−1', '−√3/2', '−√2/2', '−1/2', '−√3/3', '0', '√3/3', '1/2', '√2/2', '√3/2', '1', '√3', 'undefined'];
const radianPool = [...new Set(standardAngles.map(item => item.rad))];
const degreePool = standardAngles.map(item => `${item.deg}°`);
const coordinatePool = [...new Set(standardAngles.map(item => `(${item.x}, ${item.y})`))];
const angleByDegree = new Map(standardAngles.map(item => [item.deg, item]));

function distinctDistractors(correct, pool, count = 3) {
    return [...new Set(pool.map(String).filter(item => item !== String(correct)))].slice(0, count);
}

function choiceFromPool({ rng, prompt, correct, pool, explanation, steps, hints, review, conceptId, difficulty, feedback }) {
    const distractors = distinctDistractors(correct, pool, 3);
    if (distractors.length < 3) throw new Error(`Not enough distractors for ${conceptId}: ${correct}`);
    return choiceQuestion({ rng, prompt, correct, distractors, explanation, steps, hints, review, conceptId, difficulty, feedback });
}

const periodCases = [
    { b: 0.5, text: '4π' },
    { b: 1, text: '2π' },
    { b: 2, text: 'π' },
    { b: 3, text: '2π/3' },
    { b: 4, text: 'π/2' }
];

const pack = {
    degreeRadian: ({ rng, conceptId, difficulty }) => {
        const item = choose(rng, standardAngles.filter(a => ![0, 360].includes(a.deg)));
        const toRadians = rng() < 0.5;
        return choiceFromPool({ rng, conceptId, difficulty, review: '5.1 Degree/radian conversion',
            prompt: toRadians ? `Convert ${item.deg}° to radians.` : `Convert ${item.rad} radians to degrees.`,
            correct: toRadians ? item.rad : `${item.deg}°`, pool: toRadians ? radianPool : degreePool,
            explanation: toRadians ? `Multiply by π/180: ${item.deg}(π/180)=${item.rad}.` : `Multiply by 180/π. The π factor cancels, producing ${item.deg}°.`,
            steps: toRadians ? [`${item.deg}° × π/180`, `Reduce the fraction to ${item.rad}.`] : [`${item.rad} × 180/π`, `Simplify to ${item.deg}°.`],
            hints: [toRadians ? 'Degrees → radians: multiply by π/180.' : 'Radians → degrees: multiply by 180/π.'] });
    },
    coterminal: ({ rng, conceptId, difficulty }) => {
        const base = choose(rng, [30, 45, 60, 120, 135, 210, 300, 315]);
        const positive = rng() < 0.5;
        const correct = positive ? `${base + 360}°` : `${base - 360}°`;
        const pool = [`${base + 180}°`, `${base - 180}°`, `${base + 90}°`, `${base - 90}°`, `${base + 720}°`, `${base - 720}°`];
        return choiceFromPool({ rng, conceptId, difficulty, review: '5.1 Coterminal angles',
            prompt: `Which angle is coterminal with ${base}° ${positive ? 'and greater than 360°' : 'and less than 0°'}?`, correct, pool,
            explanation: `Coterminal angles differ by whole revolutions. ${base}° ${positive ? '+' : '−'} 360° = ${correct}.`,
            steps: ['One full revolution is 360°.', `${positive ? 'Add' : 'Subtract'} 360° once.`],
            hints: ['Coterminal angles share a terminal side.', 'Use ±360° in degrees.'] });
    },
    referenceAngle: ({ rng, conceptId, difficulty }) => {
        const item = choose(rng, standardAngles.filter(a => ['II','III','IV'].includes(a.quadrant)));
        const correct = `${item.ref}°`;
        return choiceFromPool({ rng, conceptId, difficulty, review: '5.1 Reference angles',
            prompt: `What is the reference angle for ${item.deg}°?`, correct, pool: ['30°','45°','60°','90°','120°','135°'],
            explanation: `The reference angle is the acute angle between the terminal side and the x-axis. For ${item.deg}° in Quadrant ${item.quadrant}, it is ${correct}.`,
            steps: [item.quadrant === 'II' ? `180°−${item.deg}°=${item.ref}°.` : item.quadrant === 'III' ? `${item.deg}°−180°=${item.ref}°.` : `360°−${item.deg}°=${item.ref}°.`],
            hints: ['Reference angles are positive and at most 90°.', 'Measure from the terminal side to the nearest x-axis.'] });
    },
    arcLength: ({ rng, conceptId, difficulty }) => {
        const radius = randomInt(rng, 2, 12);
        const angle = choose(rng, [{text:'π/6', value:PI/6},{text:'π/4',value:PI/4},{text:'π/3',value:PI/3},{text:'π/2',value:PI/2},{text:'2π/3',value:2*PI/3}]);
        const value = round(radius * angle.value, 2);
        return numberQuestion({ prompt:`A circle has radius ${radius} cm and central angle ${angle.text} radians. Find the arc length to the nearest hundredth.`, value, tolerance:.011, conceptId, difficulty, review:'5.2 Arc length',
            explanation:'When the angle is measured in radians, arc length is s=rθ.', steps:[`s=${radius}(${angle.text}).`,`s≈${value} cm.`], hints:['Use s=rθ.', 'Do not convert a radian angle to degrees for this formula.'] });
    },
    angularSpeed: ({ rng, conceptId, difficulty }) => {
        const revolutions = randomInt(rng, 2, 12), seconds = choose(rng, [2,3,4,5,6]);
        const value = round((revolutions * 2 * PI) / seconds, 4);
        return numberQuestion({ prompt:`A wheel completes ${revolutions} revolutions in ${seconds} seconds. Find its angular speed in rad/s. Round to four decimals.`, value, tolerance:.00011, conceptId, difficulty, review:'5.2 Angular speed',
            explanation:'Each revolution is 2π radians, so angular speed is total radians divided by time.', steps:[`Total angle=${revolutions}(2π) radians.`,`ω=${revolutions*2}π/${seconds}≈${value} rad/s.`], hints:['Convert revolutions to radians first.', 'Angular speed = angle/time.'] });
    },
    linearSpeed: ({ rng, conceptId, difficulty }) => {
        const radius = randomInt(rng,2,12), omega = choose(rng,[.5,1,1.5,2,2.5]);
        const value = radius * omega;
        return numberQuestion({ prompt:`A point ${radius} m from the center rotates at ${omega} rad/s. Find its linear speed.`, value, conceptId, difficulty, review:'5.2 Linear speed',
            explanation:'Linear speed along the circular path is v=rω.', steps:[`v=${radius}(${omega}).`,`v=${value} m/s.`], hints:['Use v=rω.', 'Points farther from the center move faster linearly at the same angular speed.'] });
    },
    unitCircleValue: ({ rng, conceptId, difficulty }) => {
        const item = choose(rng, standardAngles.slice(0,-1));
        const fn = choose(rng,['sin','cos','tan']);
        const correct = item[fn];
        return choiceFromPool({ rng, conceptId, difficulty, review:'5.3 Unit-circle values', prompt:`Find the exact value of ${fn}(${item.rad}).`, correct, pool:exactPool,
            explanation:`${item.rad} corresponds to ${item.deg}°. On the unit circle, cosine is x, sine is y, and tangent is y/x, giving ${correct}.`,
            steps:[`Locate ${item.deg}° (${item.rad}).`,`Use the unit-circle coordinate (${item.x}, ${item.y}).`,`${fn}=${correct}.`],
            hints:['Cosine is the x-coordinate; sine is the y-coordinate.', 'For tangent, divide sine by cosine and watch for cosine = 0.'] });
    },
    unitCircleCoordinate: ({ rng, conceptId, difficulty }) => {
        const item = choose(rng, standardAngles.filter(a => ![0,360].includes(a.deg)));
        const correct = `(${item.x}, ${item.y})`;
        return choiceFromPool({ rng, conceptId, difficulty, review:'5.3 Unit-circle coordinates', prompt:`Which unit-circle coordinate corresponds to ${item.rad} (${item.deg}°)?`, correct, pool:coordinatePool,
            explanation:`The coordinate is (cos θ, sin θ). At ${item.deg}°, that is ${correct}.`, steps:[`Find the reference angle ${item.ref}° and quadrant ${item.quadrant}.`,`Apply quadrant signs to the special-angle coordinates.`,`Coordinate=${correct}.`], hints:['Coordinate order is (cos, sin).','Use the quadrant to determine signs.'] });
    },
    quadrantSign: ({ rng, conceptId, difficulty }) => {
        const q = choose(rng,[1,2,3,4]);
        const correct = ({1:'sin+, cos+, tan+',2:'sin+, cos−, tan−',3:'sin−, cos−, tan+',4:'sin−, cos+, tan−'})[q];
        return choiceQuestion({ rng, conceptId, difficulty, review:'5.3 Trig signs by quadrant', prompt:`Which sign pattern is correct in Quadrant ${q}?`, correct,
            distractors:Object.values({1:'sin+, cos+, tan+',2:'sin+, cos−, tan−',3:'sin−, cos−, tan+',4:'sin−, cos+, tan−'}).filter(v=>v!==correct).slice(0,3),
            explanation:'Sine follows the y-coordinate, cosine follows x, and tangent is their quotient.', steps:['Determine signs of x and y in the quadrant.','Translate x→cos and y→sin.','Use tan=sin/cos.'], hints:['Quadrant signs come from coordinate signs, not a separate rule.'] });
    },
    rightTrig: ({ rng, conceptId, difficulty }) => {
        const [opp,adj,hyp] = choose(rng,[[3,4,5],[5,12,13],[8,15,17],[7,24,25],[9,40,41]]);
        const fn = choose(rng,['sin','cos','tan']);
        const correct = fn==='sin' ? fractionText(opp,hyp) : fn==='cos' ? fractionText(adj,hyp) : fractionText(opp,adj);
        const pool=[fractionText(opp,hyp),fractionText(adj,hyp),fractionText(opp,adj),fractionText(hyp,opp),fractionText(hyp,adj),fractionText(adj,opp)];
        return choiceFromPool({ rng, conceptId, difficulty, review:'5.4 Right-triangle sine/cosine/tangent', prompt:`Relative to θ, opposite=${opp}, adjacent=${adj}, hypotenuse=${hyp}. Find ${fn}(θ).`, correct, pool,
            explanation:`Use SOH-CAH-TOA. ${fn==='sin'?'Sine is opposite/hypotenuse':fn==='cos'?'Cosine is adjacent/hypotenuse':'Tangent is opposite/adjacent'}, so ${fn}(θ)=${correct}.`, steps:[`Label the three sides relative to θ.`,`Choose the ${fn} ratio.`,`Simplify to ${correct}.`], hints:['SOH-CAH-TOA.', 'Label sides before choosing a ratio.'] });
    },
    sinCosRelationship: ({ rng, conceptId, difficulty }) => choiceQuestion({ rng, conceptId, difficulty, review:'5.4 Sine and cosine connections', prompt:'On the unit circle, which statement is always true?', correct:'cos θ is the x-coordinate and sin θ is the y-coordinate', distractors:['sin θ is x and cos θ is y','both sin θ and cos θ are slopes','sin θ and cos θ are always positive'], explanation:'The unit circle point at angle θ is defined as (cos θ, sin θ).', steps:['Start with the point (x,y) on the unit circle.','By definition x=cosθ and y=sinθ.'], hints:['Remember the ordered pair (cos, sin).'] }),
    reciprocalTrig: ({ rng, conceptId, difficulty }) => {
        const pair=choose(rng,[{given:'sin θ = 3/5',fn:'csc θ',correct:'5/3',pool:['3/5','4/5','5/4','3/4']},{given:'cos θ = 4/5',fn:'sec θ',correct:'5/4',pool:['4/5','3/5','5/3','4/3']},{given:'tan θ = 5/12',fn:'cot θ',correct:'12/5',pool:['5/12','13/5','12/13','5/13']}]);
        return choiceFromPool({rng,conceptId,difficulty,review:'5.5 Reciprocal trig functions',prompt:`If ${pair.given}, find ${pair.fn}.`,correct:pair.correct,pool:pair.pool,
            explanation:`${pair.fn.split(' ')[0]} is the reciprocal of the given function, so flip the ratio to get ${pair.correct}.`,steps:['Identify the reciprocal pair.','Invert numerator and denominator.'],hints:['sin↔csc, cos↔sec, tan↔cot.']});
    },
    quotientTrig: ({ rng, conceptId, difficulty }) => choiceQuestion({rng,conceptId,difficulty,review:'5.5 Quotient relationships',prompt:'Which quotient identity is correct?',correct:'tan θ = sin θ / cos θ',distractors:['tan θ = cos θ / sin θ','sec θ = sin θ / cos θ','cot θ = sin θ / cos θ'],explanation:'Tangent is sine divided by cosine; cotangent is the reciprocal quotient.',steps:['Use sin=y/r and cos=x/r.','Their quotient is y/x=tanθ.'],hints:['Tangent is opposite/adjacent.']}),
    reciprocalUndefined: ({ rng, conceptId, difficulty }) => {
        const fn=choose(rng,['sec','csc','cot']);
        const correct=fn==='sec'?'where cos θ = 0':fn==='csc'?'where sin θ = 0':'where sin θ = 0';
        const pool=['where cos θ = 0','where sin θ = 0','where tan θ = 0','never'];
        return choiceFromPool({rng,conceptId,difficulty,review:'5.5 Undefined reciprocal functions',prompt:`When is ${fn} θ undefined?`,correct,pool,explanation:`${fn==='sec'?'sec=1/cos':fn==='csc'?'csc=1/sin':'cot=cos/sin'}, so the denominator cannot be zero.`,steps:['Write the function using sine/cosine.','Set the denominator equal to zero.'],hints:['Undefined points come from a zero denominator.']});
    },
    specialTrig: ({ rng, conceptId, difficulty }) => {
        const item=choose(rng,standardAngles.filter(a=>[30,45,60,120,135,150,210,225,240,300,315,330].includes(a.deg)));
        const fn=choose(rng,['sin','cos','tan']);
        const correct=item[fn];
        return choiceFromPool({rng,conceptId,difficulty,review:'5.6 Exact special-angle values',prompt:`Evaluate ${fn}(${item.deg}°) exactly.`,correct,pool:exactPool,explanation:`The reference angle is ${item.ref}°. Use the 30-60-90 or 45-45-90 exact ratio, then apply the Quadrant ${item.quadrant} sign.`,steps:[`Reference angle=${item.ref}°.` ,`Find the positive special-angle magnitude.`,`Apply the quadrant sign to obtain ${correct}.`],hints:['Find the reference angle first.','Then determine the sign from the quadrant.']});
    },
    specialCoordinate: ({ rng, conceptId, difficulty }) => {
        const item=choose(rng,standardAngles.filter(a=>[30,45,60,120,135,150,210,225,240,300,315,330].includes(a.deg)));
        const correct=`(${item.x}, ${item.y})`;
        return choiceFromPool({rng,conceptId,difficulty,review:'5.6 Special-angle coordinates',prompt:`Give the exact unit-circle coordinate for ${item.deg}°.`,correct,pool:coordinatePool,explanation:`Use the special-triangle coordinate for ${item.ref}° and attach the correct Quadrant ${item.quadrant} signs.`,steps:[`Reference angle=${item.ref}°.` ,`Base coordinate magnitudes come from a special triangle.`,`Apply signs: ${correct}.`],hints:['Coordinates are (cosθ, sinθ).']});
    },
    sinCosParentFeatures: ({ rng, conceptId, difficulty }) => {
        const cases=[
            {prompt:'Which statement about y=sin x is true?',correct:'It has period 2π and passes through (0, 0) moving upward',pool:['It has period π and begins at a maximum','It has period 2π and begins at a maximum','It has period π/2 and begins at the midline']},
            {prompt:'Which statement about y=cos x is true?',correct:'It has period 2π and begins at a maximum when x=0',pool:['It has period π and begins at a maximum','It has period 2π and begins on the midline','It has period π/2 and begins at a minimum']}
        ];
        const item=choose(rng,cases);
        return choiceQuestion({rng,conceptId,difficulty,review:'5.7 Parent sine/cosine graphs',prompt:item.prompt,correct:item.correct,distractors:item.pool,explanation:'Both parent sine and cosine have amplitude 1 and period 2π, but sine starts at the midline while cosine starts at a maximum.',steps:['Use sin0=0 and cos0=1.','One full unit-circle revolution is 2π.'],hints:['Evaluate the function at x=0.','Recall the period of one revolution.']});
    },
    sinCosLandmark: ({ rng, conceptId, difficulty }) => {
        const rows=[{x:'0',sin:'0',cos:'1'},{x:'π/2',sin:'1',cos:'0'},{x:'π',sin:'0',cos:'−1'},{x:'3π/2',sin:'−1',cos:'0'},{x:'2π',sin:'0',cos:'1'}];
        const row=choose(rng,rows), fn=choose(rng,['sin','cos']), correct=row[fn];
        return choiceFromPool({rng,conceptId,difficulty,review:'5.7 Sine/cosine landmarks',prompt:`What is ${fn}(${row.x}) on the parent graph?`,correct,pool:['−1','−1/2','0','1/2','1'],explanation:`The graph height matches the unit-circle ${fn==='sin'?'y':'x'}-coordinate at ${row.x}, giving ${correct}.`,steps:[`Locate ${row.x} on the unit circle.`,`Read the ${fn==='sin'?'y':'x'}-coordinate.`],hints:['Sine records y; cosine records x.']});
    },
    sinCosPeriodFromB: ({ rng, conceptId, difficulty }) => {
        const item=choose(rng,periodCases);
        return choiceFromPool({rng,conceptId,difficulty,review:'5.7 Period of sine/cosine',prompt:`Find the period of y=sin(${item.b}x).`,correct:item.text,pool:periodCases.map(x=>x.text),explanation:`For sine and cosine, T=2π/|B|. With B=${item.b}, T=${item.text}.`,steps:[`T=2π/${item.b}.`,`Simplify to ${item.text}.`],hints:['B changes the period inversely.']});
    },
    trigTransformFeatures: ({ rng, conceptId, difficulty }) => {
        const A=choose(rng,[2,3,4,5]), item=choose(rng,periodCases.slice(1)), D=choose(rng,[-3,-2,1,2,4]);
        const correct=`Amplitude ${A}, period ${item.text}, midline y=${D}`;
        const wrongPeriod=choose(rng,periodCases.filter(x=>x.text!==item.text)).text;
        return choiceQuestion({rng,conceptId,difficulty,review:'5.8 Sinusoid transformations',prompt:`For y=${A}cos(${item.b}x) ${D<0?'−':'+'} ${Math.abs(D)}, identify amplitude, period, and midline.`,correct,distractors:[`Amplitude ${A+1}, period ${item.text}, midline y=${D}`,`Amplitude ${A}, period ${wrongPeriod}, midline y=${D}`,`Amplitude ${A}, period ${item.text}, midline y=${-D}`],explanation:`Amplitude=|A|=${A}, period=2π/|B|=${item.text}, and vertical shift D gives the midline y=${D}.`,steps:[`Amplitude=|${A}|.`,`Period=2π/${item.b}=${item.text}.`,`Midline y=${D}.`],hints:['Read A, B, and D separately.']});
    },
    trigPhaseShift: ({ rng, conceptId, difficulty }) => {
        const item=choose(rng,[{inside:'x − π/4',correct:'π/4 right',wrong:'π/4 left'},{inside:'x + π/4',correct:'π/4 left',wrong:'π/4 right'},{inside:'x − π/2',correct:'π/2 right',wrong:'π/2 left'},{inside:'x + π/2',correct:'π/2 left',wrong:'π/2 right'}]);
        return choiceQuestion({rng,conceptId,difficulty,review:'5.8 Phase shift',prompt:`What is the phase shift of y=sin(${item.inside})?`,correct:item.correct,distractors:[item.wrong,'No horizontal shift','2π right'],explanation:`Match the inside to x−C. The visible sign is opposite the direction wording, so the shift is ${item.correct}.`,steps:[`Write the inside as x−C.`,`Read C as ${item.correct}.`],hints:['Horizontal shifts use the opposite visible sign.']});
    },
    trigWriteEquation: ({ rng, conceptId, difficulty }) => {
        const A=choose(rng,[2,3,4]), D=choose(rng,[-2,1,3]), item=choose(rng,periodCases.slice(1,4)), beginsMax=rng()<.5, fn=beginsMax?'cos':'sin';
        const signD=D<0?`− ${Math.abs(D)}`:`+ ${D}`;
        const correct=`y = ${A}${fn}(${item.b}x) ${signD}`;
        const otherFn=beginsMax?'sin':'cos';
        const wrongB=choose(rng,periodCases.filter(x=>x.b!==item.b)).b;
        return choiceQuestion({rng,conceptId,difficulty,review:'5.8 Writing transformed trig equations',prompt:`A sinusoid has amplitude ${A}, period ${item.text}, midline y=${D}, and at x=0 begins ${beginsMax?'at a maximum':'on the midline moving upward'}. Which equation fits?`,correct,distractors:[`y = ${A}${otherFn}(${item.b}x) ${signD}`,`y = ${A}${fn}(${wrongB}x) ${signD}`,`y = ${A+1}${fn}(${item.b}x) ${signD}`],explanation:`The amplitude determines A, period ${item.text} gives B=${item.b}, the midline gives D=${D}, and the starting landmark selects ${fn}.`,steps:[`A=${A}.`,`T=${item.text} → B=${item.b}.`,`D=${D}.`,`Choose ${fn}.`],hints:['Maximum at x=0 suggests cosine; midline rising suggests sine.']});
    },
    tangentGraphFeatures: ({ rng, conceptId, difficulty }) => {
        const items=[
            {prompt:'Where does y=tan x have vertical asymptotes?',correct:'x = π/2 + kπ',pool:['x = kπ','x = π + 2kπ','x = π/4 + kπ'],ex:'tan x=sin x/cos x, so it is undefined where cos x=0.'},
            {prompt:'What is the period of y=tan x?',correct:'π',pool:['2π','π/2','4π'],ex:'tan(x+π)=tan x, so tangent repeats every π.'},
            {prompt:'Where are the zeros of y=tan x?',correct:'x = kπ',pool:['x = π/2 + kπ','x = π/4 + kπ','x = π + 2kπ'],ex:'tan x=0 where sin x=0 and cos x≠0.'}
        ];
        const item=choose(rng,items);
        return choiceQuestion({rng,conceptId,difficulty,review:'5.9 Tangent graph',prompt:item.prompt,correct:item.correct,distractors:item.pool,explanation:item.ex,steps:['Use tan=sin/cos.','Separate numerator zeros from denominator zeros.'],hints:['Tangent zeros come from sine; asymptotes come from cosine.']});
    },
    reciprocalTrigGraph: ({ rng, conceptId, difficulty }) => {
        const items=[
            {prompt:'What is the range of y=sec x?',correct:'y ≤ −1 or y ≥ 1',pool:['−1 ≤ y ≤ 1','All real numbers','y ≥ 0'],ex:'sec=1/cos, so its magnitude is at least 1 whenever defined.'},
            {prompt:'Where does y=csc x have vertical asymptotes?',correct:'x = kπ',pool:['x = π/2 + kπ','x = π/4 + kπ','x = 2πk + π/2'],ex:'csc=1/sin, so it is undefined where sin x=0.'},
            {prompt:'Where do parent secant branches have vertices?',correct:'where cos x = ±1',pool:['where cos x = 0','where tan x = ±1','only where sin x = 1'],ex:'At cos=±1, the reciprocal secant values are ±1, closest to the x-axis.'}
        ];
        const item=choose(rng,items);
        return choiceQuestion({rng,conceptId,difficulty,review:'5.9 Secant/cosecant graphs',prompt:item.prompt,correct:item.correct,distractors:item.pool,explanation:item.ex,steps:['Write the reciprocal relationship.','Use zeros/extrema of the underlying sine or cosine graph.'],hints:['Reciprocal graphs inherit asymptotes from zeros of the denominator.']});
    },
    otherTrigGraphIdentify: ({ rng, conceptId, difficulty }) => {
        const tangent=rng()<.5;
        return choiceQuestion({rng,conceptId,difficulty,review:'5.9 Identifying trig graphs',prompt:tangent?'A periodic graph has asymptotes x=π/2+kπ, zeros x=kπ, and period π. Which parent is it?':'A periodic graph has reciprocal U-shaped branches, range y≤−1 or y≥1, and asymptotes where cos x=0. Which parent is it?',correct:tangent?'y = tan x':'y = sec x',distractors:tangent?['y = cot x','y = sec x','y = csc x']:['y = csc x','y = tan x','y = cos x'],explanation:tangent?'Those zeros, asymptotes, and period define tangent.':'Secant is the reciprocal of cosine, so cosine zeros create its asymptotes.',steps:['Match the asymptote locations.','Check zeros or branch shape to distinguish the family.'],hints:['Use quotient/reciprocal definitions, not memorized silhouettes alone.']});
    },
    inverseTrigExact: ({ rng, conceptId, difficulty }) => {
        const item=choose(rng,[{expr:'arcsin(1/2)',answer:'π/6'},{expr:'arcsin(−√2/2)',answer:'−π/4'},{expr:'arccos(1/2)',answer:'π/3'},{expr:'arccos(−1)',answer:'π'},{expr:'arctan(1)',answer:'π/4'},{expr:'arctan(−√3)',answer:'−π/3'}]);
        return choiceFromPool({rng,conceptId,difficulty,review:'5.10 Exact inverse trig',prompt:`Evaluate ${item.expr}.`,correct:item.answer,pool:['−π/2','−π/3','−π/4','0','π/6','π/4','π/3','π/2','π'],explanation:`Translate the inverse expression into an ordinary trig equation and choose the angle in the function's principal range.`,steps:['Identify the standard angle with the requested trig value.','Check the principal range.'],hints:['Inverse trig returns an angle, not a reciprocal.']});
    },
    inverseTrigRange: ({ rng, conceptId, difficulty }) => {
        const item=choose(rng,[{fn:'arcsin',correct:'[−π/2, π/2]',pool:['[0, π]','(−π/2, π/2)','[0, 2π)']},{fn:'arccos',correct:'[0, π]',pool:['[−π/2, π/2]','(−π/2, π/2)','[0, 2π)']},{fn:'arctan',correct:'(−π/2, π/2)',pool:['[−π/2, π/2]','[0, π]','(0, π)']}]);
        return choiceQuestion({rng,conceptId,difficulty,review:'5.10 Principal ranges',prompt:`What is the principal output range of ${item.fn} x?`,correct:item.correct,distractors:item.pool,explanation:'Inverse trig functions use restricted parent domains so every input has one principal angle output.',steps:['Recall the one-to-one restriction of the original trig function.','Use that restricted interval as the inverse output range.'],hints:['Arcsine centers on 0, arccos uses 0 to π, and arctan lies between its nearest asymptotes.']});
    },
    inverseTrigComposition: ({ rng, conceptId, difficulty }) => {
        const item=choose(rng,[{prompt:'Evaluate cos(arcsin(3/5)).',correct:'4/5',pool:['3/5','5/4','−4/5'],ex:'Let θ=arcsin(3/5). A 3-4-5 triangle gives cosθ=4/5.'},{prompt:'Evaluate sin(arccos(4/5)).',correct:'3/5',pool:['4/5','5/3','−3/5'],ex:'Let θ=arccos(4/5). A 3-4-5 triangle gives sinθ=3/5.'},{prompt:'Evaluate tan(arcsin(5/13)).',correct:'5/12',pool:['12/5','5/13','12/13'],ex:'Let θ=arcsin(5/13). A 5-12-13 triangle gives tanθ=5/12.'}]);
        return choiceQuestion({rng,conceptId,difficulty,review:'5.10 Inverse-trig compositions',prompt:item.prompt,correct:item.correct,distractors:item.pool,explanation:item.ex,steps:['Let θ equal the inverse-trig expression.','Translate to a known side ratio.','Build the reference triangle.','Evaluate the outer trig function.'],hints:['Do not cancel different trig functions.', 'A reference triangle often turns the composition into side ratios.']});
    },
    sinusoidFeatures: ({ rng, conceptId, difficulty }) => {
        const minimum=randomInt(rng,2,10), amplitude=randomInt(rng,2,8), maximum=minimum+2*amplitude, period=choose(rng,[4,6,8,12,24]), mid=(minimum+maximum)/2;
        const correct=`Amplitude ${amplitude}, midline y=${mid}, period ${period}`;
        return choiceQuestion({rng,conceptId,difficulty,review:'5.11 Sinusoidal model features',prompt:`A periodic quantity has minimum ${minimum}, maximum ${maximum}, and repeats every ${period} time units. Identify amplitude, midline, and period.`,correct,distractors:[`Amplitude ${2*amplitude}, midline y=${mid}, period ${period}`,`Amplitude ${amplitude}, midline y=${maximum}, period ${period}`,`Amplitude ${mid}, midline y=${amplitude}, period ${period}`],explanation:`Amplitude=(${maximum}−${minimum})/2=${amplitude}; midline=(${maximum}+${minimum})/2=${mid}; the stated repeat length is the period.`,steps:[`A=(${maximum}−${minimum})/2=${amplitude}.`,`D=(${maximum}+${minimum})/2=${mid}.`,`T=${period}.`],hints:['Amplitude is half the max-min distance.', 'Midline is the average of max and min.']});
    },
    sinusoidBFromPeriod: ({ rng, conceptId, difficulty }) => {
        const cases=[{T:4,B:'π/2'},{T:6,B:'π/3'},{T:8,B:'π/4'},{T:12,B:'π/6'},{T:24,B:'π/12'}], item=choose(rng,cases);
        return choiceFromPool({rng,conceptId,difficulty,review:'5.11 Period parameter',prompt:`A sinusoidal model has period ${item.T}. What coefficient B belongs in sin(Bt) or cos(Bt)?`,correct:item.B,pool:cases.map(x=>x.B),explanation:`The period-coefficient relationship is B=2π/T. With T=${item.T}, B=2π/${item.T}=${item.B}.`,steps:[`Use B=2π/${item.T}.`,`Simplify to ${item.B}.`],hints:['The coefficient B is not the period; it is inversely related to the period.']});
    },
    sinusoidModelChoice: ({ rng, conceptId, difficulty }) => {
        const A=choose(rng,[3,4,5,6]), D=choose(rng,[8,10,12,15]), item=choose(rng,[{T:4,B:'π/2'},{T:6,B:'π/3'},{T:8,B:'π/4'},{T:12,B:'π/6'}]);
        const correct=`y = ${A}cos(${item.B}t) + ${D}`;
        return choiceQuestion({rng,conceptId,difficulty,review:'5.11 Building sinusoidal models',prompt:`A periodic quantity has amplitude ${A}, midline ${D}, period ${item.T}, and begins at a maximum when t=0. Which model fits?`,correct,distractors:[`y = ${A}sin(${item.B}t) + ${D}`,`y = ${D}cos(${item.B}t) + ${A}`,`y = ${A}cos(${item.T}t) + ${D}`],explanation:`Starting at a maximum suggests positive cosine. Convert period to B using B=2π/T=${item.B}.`,steps:[`A=${A}.`,`D=${D}.`,`B=${item.B}.`,`Use positive cosine because the cycle begins at a maximum.`],hints:['A maximum at t=0 naturally matches cosine.', 'Convert T to B with 2π/T.']});
    },
    sinusoidEvaluate: ({ rng, conceptId, difficulty }) => {
        const A=choose(rng,[2,3,4,5]), D=choose(rng,[8,10,12]), T=choose(rng,[4,8,12]), location=choose(rng,['max','mid','min']);
        let t, value, reason;
        if(location==='max'){t=0;value=D+A;reason='cos(0)=1';}
        else if(location==='mid'){t=T/4;value=D;reason='cos(π/2)=0';}
        else {t=T/2;value=D-A;reason='cos(π)=−1';}
        return numberQuestion({prompt:`For y=${A}cos((2π/${T})t)+${D}, find y when t=${t}.`,value,conceptId,difficulty,review:'5.11 Evaluating sinusoidal models',explanation:`At t=${t}, the inside angle lands on a standard cosine landmark: ${reason}.`,steps:[`Compute (2π/${T})(${t}).`,reason,`y=${value}.`],hints:['Find the phase angle first.','Use the exact cosine landmark before scaling and shifting.']});
    }
};

registerGeneratorPack('u5', pack);
export default pack;
