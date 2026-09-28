import { registerGeneratorPack } from './generators.js';
import { choiceQuestion as cq, numberQuestion as nq, textQuestion as tq, randomInt, choose } from './generator-helpers.js';

const round=(value,places=3)=>Number(Number(value).toFixed(places));
const deg=(theta)=>round(theta*180/Math.PI,1);
const specialAngles=[
  {label:'0',theta:0,c:'1',s:'0',x:1,y:0},
  {label:'π/6',theta:Math.PI/6,c:'√3/2',s:'1/2',x:Math.sqrt(3)/2,y:.5},
  {label:'π/4',theta:Math.PI/4,c:'√2/2',s:'√2/2',x:Math.SQRT1_2,y:Math.SQRT1_2},
  {label:'π/3',theta:Math.PI/3,c:'1/2',s:'√3/2',x:.5,y:Math.sqrt(3)/2},
  {label:'π/2',theta:Math.PI/2,c:'0',s:'1',x:0,y:1},
  {label:'π',theta:Math.PI,c:'−1',s:'0',x:-1,y:0},
  {label:'3π/2',theta:3*Math.PI/2,c:'0',s:'−1',x:0,y:-1}
];
const review=(id,title)=>`${id} ${title}`;

const pack={
  paramEvaluateLinear: ({rng,conceptId,difficulty})=>{
    const t=randomInt(rng,-3,4),a=choose(rng,[1,2,3]),b=randomInt(rng,-4,4),c=choose(rng,[1,2,-1,-2]),d=randomInt(rng,-4,4);
    const x=a*t+b,y=c*t+d;
    return cq({rng,conceptId,difficulty,review:review('9.1','Evaluating parametric equations'),prompt:`For x=${a}t${b>=0?'+':''}${b} and y=${c}t${d>=0?'+':''}${d}, what point is reached when t=${t}?`,correct:`(${x}, ${y})`,distractors:[`(${x+1}, ${y})`,`(${x}, ${y+1})`,`(${x+1}, ${y+1})`],explanation:'A parametric point is found by substituting the same parameter value into both coordinate equations.',steps:[`x=${a}(${t})${b>=0?'+':''}${b}=${x}.`,`y=${c}(${t})${d>=0?'+':''}${d}=${y}.`,`The point is (${x}, ${y}).`],hints:['Use the same t-value in both equations.']});
  },
  paramEvaluateQuadratic: ({rng,conceptId,difficulty})=>{
    const t=randomInt(rng,-3,3),h=randomInt(rng,-3,3),k=randomInt(rng,-4,2); const x=t+h,y=t*t+k;
    return nq({conceptId,difficulty,review:review('9.1','Parametric evaluation'),prompt:`For x=t${h>=0?'+':''}${h} and y=t²${k>=0?'+':''}${k}, find y when t=${t}.`,value:y,explanation:'Evaluate the y-equation directly at the given parameter value.',steps:[`y=(${t})²${k>=0?'+':''}${k}=${y}.`],hints:['Square t before adding the vertical shift.']});
  },
  paramMeaning: ({rng,conceptId,difficulty})=>cq({rng,conceptId,difficulty,review:review('9.1','Meaning of a parameter'),prompt:'In a motion model x=x(t), y=y(t), what does the parameter t usually represent?',correct:'A quantity such as time that controls both coordinates',distractors:['The slope of the path at every point','The y-intercept of the path','A second name for the x-coordinate'],explanation:'The parameter is an independent quantity that generates both coordinates; in motion problems it is commonly time.',steps:['Treat t as the input.','Both x and y depend on that same input.'],hints:['Ask what quantity changes while the point moves.'] }),
  paramDirection: ({rng,conceptId,difficulty})=>{
    const right=choose(rng,[true,false]);
    return cq({rng,conceptId,difficulty,review:review('9.2','Parametric direction'),prompt:`As t increases, x=${right?'2t−1':'−3t+2'} while y=t+4. What is the horizontal direction of motion?`,correct:right?'left to right':'right to left',distractors:[right?'right to left':'left to right','no horizontal motion','the direction cannot be determined'],explanation:'The sign of the coefficient of t in x(t) tells whether x increases or decreases as t increases.',steps:[`The x coefficient is ${right?'positive':'negative'}.`,`Therefore x ${right?'increases':'decreases'} as t increases.`],hints:['Focus only on how x changes with t.']});
  },
  paramGraphIdentify: ({rng,conceptId,difficulty})=>{
    const item=choose(rng,[
      ['x=t, y=t²','parabola',['line','circle','hyperbola']],
      ['x=2t+1, y=−t+3','line',['parabola','circle','ellipse']],
      ['x=3cos t, y=3sin t','circle',['line','parabola','hyperbola']],
      ['x=4cos t, y=2sin t','ellipse',['circle','line','parabola']]
    ]);
    return cq({rng,conceptId,difficulty,review:review('9.2','Recognizing parametric graphs'),prompt:`What rectangular graph is traced by ${item[0]}?`,correct:item[1],distractors:item[2],explanation:'Eliminate or recognize the parameter pattern. Linear pairs trace lines, t/t² pairs trace parabolas, and cosine/sine pairs trace circles or ellipses.',steps:['Look for a recognizable parameter pair.','Match the pair to its rectangular relationship.'],hints:['cos²t+sin²t=1 is especially useful.']});
  },
  paramTablePoint: ({rng,conceptId,difficulty})=>{
    const t=randomInt(rng,-2,3); const x=2*t+1,y=t*t-2;
    return cq({rng,conceptId,difficulty,review:review('9.2','Parametric tables'),prompt:`A table is built for x=2t+1, y=t²−2. Which row is correct for t=${t}?`,correct:`t=${t}, x=${x}, y=${y}`,distractors:[`t=${t}, x=${x+1}, y=${y}`,`t=${t}, x=${x}, y=${y+1}`,`t=${t}, x=${x+1}, y=${y+1}`],explanation:'Each row uses one t-value to compute both coordinates.',steps:[`x=2(${t})+1=${x}.`,`y=(${t})²−2=${y}.`],hints:['Evaluate each coordinate separately.']});
  },
  eliminateLinear: ({rng,conceptId,difficulty})=>{
    const m=choose(rng,[1,2,-1,-2,3]),b=randomInt(rng,-4,4),h=randomInt(rng,-3,3);
    // x=t+h -> t=x-h, y=m t+b -> y=m(x-h)+b = mx + (b-mh)
    const c=b-m*h; const eq=`y = ${m===1?'x':m===-1?'−x':`${m}x`}${c===0?'':c>0?` + ${c}`:` − ${Math.abs(c)}`}`;
    return cq({rng,conceptId,difficulty,review:review('9.3','Eliminating the parameter'),prompt:`Eliminate t: x=t${h>=0?'+':''}${h}, y=${m}t${b>=0?'+':''}${b}.`,correct:eq,distractors:[`y = ${m===1?'x':m===-1?'−x':`${m}x`} ${c+1>=0?`+ ${c+1}`:`− ${Math.abs(c+1)}`}`,`y = ${m+1===1?'x':m+1===-1?'−x':`${m+1}x`} ${c>=0?`+ ${c}`:`− ${Math.abs(c)}`}`,`x = ${m}y ${c>=0?`+ ${c}`:`− ${Math.abs(c)}`}`],explanation:'Solve one parametric equation for t, then substitute into the other.',steps:[`From x=t${h>=0?'+':''}${h}, t=x${h===0?'':h>0?`−${h}`:`+${Math.abs(h)}`}.`,`Substitute into y=${m}t${b>=0?'+':''}${b}.`,`Simplify to ${eq}.`],hints:['Solve the simpler equation for t first.']});
  },
  eliminateParabola: ({rng,conceptId,difficulty})=>{
    const h=randomInt(rng,-3,3),k=randomInt(rng,-3,3); const eq=`y = (x ${h>=0?`− ${h}`:`+ ${Math.abs(h)}`})² ${k>=0?`+ ${k}`:`− ${Math.abs(k)}`}`.replace('− 0','').replace('+ 0','');
    return cq({rng,conceptId,difficulty,review:review('9.3','Eliminating parameters'),prompt:`Eliminate t from x=t${h>=0?'+':''}${h}, y=t²${k>=0?'+':''}${k}.`,correct:eq,distractors:[`y = x² ${k>=0?`+ ${k}`:`− ${Math.abs(k)}`}`,`x = (y ${k>=0?`− ${k}`:`+ ${Math.abs(k)}`})²`,`y = (x ${h>=0?`+ ${h}`:`− ${Math.abs(h)}`})² ${k>=0?`+ ${k}`:`− ${Math.abs(k)}`}`],explanation:'Since t=x−h, replacing t in y=t²+k produces a shifted parabola.',steps:[`t=x${h===0?'':h>0?`−${h}`:`+${Math.abs(h)}`}.`,`Substitute into y=t²${k>=0?'+':''}${k}.`,`The rectangular equation is ${eq}.`],hints:['Isolate t from x first.']});
  },
  eliminateCircle: ({rng,conceptId,difficulty})=>{
    const r=choose(rng,[2,3,4,5]);
    return cq({rng,conceptId,difficulty,review:review('9.3','Trig parametrizations'),prompt:`Eliminate t from x=${r}cos t and y=${r}sin t.`,correct:`x² + y² = ${r*r}`,distractors:[`x² + y² = ${r}`,`x + y = ${r}`,`x² − y² = ${r*r}`],explanation:'Square both equations and add. The identity cos²t+sin²t=1 removes the parameter.',steps:[`x²=${r*r}cos²t and y²=${r*r}sin²t.`,`Add: x²+y²=${r*r}(cos²t+sin²t).`,`Use cos²t+sin²t=1.`],hints:['Square and add the two equations.']});
  },
  projectilePosition: ({rng,conceptId,difficulty})=>{
    const vx=choose(rng,[20,24,30,36]),vy=choose(rng,[32,40,48]),h=choose(rng,[0,4,8]),t=choose(rng,[.5,1,1.5]);
    const x=vx*t,y=h+vy*t-16*t*t;
    return cq({rng,conceptId,difficulty,review:review('9.4','Parametric motion models'),prompt:`A projectile has x=${vx}t and y=${h}+${vy}t−16t². Where is it at t=${t}?`,correct:`(${round(x,2)}, ${round(y,2)})`,distractors:[`(${round(x+1,2)}, ${round(y,2)})`,`(${round(x,2)}, ${round(y+1,2)})`,`(${round(x+1,2)}, ${round(y+1,2)})`],explanation:'In a parametric motion model, evaluate both position equations at the same time.',steps:[`x=${vx}(${t})=${round(x,2)}.`,`y=${h}+${vy}(${t})−16(${t})²=${round(y,2)}.`],hints:['Substitute time into both equations.']});
  },
  projectileHorizontalTime: ({rng,conceptId,difficulty})=>{
    const vx=choose(rng,[15,20,25,30]),t=choose(rng,[2,3,4]),x=vx*t;
    return nq({conceptId,difficulty,review:review('9.4','Parametric modeling'),prompt:`Horizontal position is x=${vx}t feet. How many seconds does it take to reach x=${x} feet?`,value:t,explanation:'Solve the horizontal parameter equation for time.',steps:[`${x}=${vx}t.`,`t=${x}/${vx}=${t}.`],hints:['Divide the horizontal position by horizontal speed.']});
  },
  paramModelInterpret: ({rng,conceptId,difficulty})=>cq({rng,conceptId,difficulty,review:review('9.4','Interpreting parametric models'),prompt:'Why are parametric equations especially useful for motion?',correct:'They preserve where an object is at each parameter value such as time',distractors:['They force every path to be a function y=f(x)','They remove direction information from a path','They can model only straight-line motion'],explanation:'A rectangular equation describes the path, while a parametrization can also retain timing and direction along that path.',steps:['The parameter supplies an ordering of points.','For motion, that parameter is often time.'],hints:['Think about what is lost when t is eliminated.']}),

  polarParts: ({rng,conceptId,difficulty})=>{
    const r=choose(rng,[2,3,5,-4]),angle=choose(rng,['π/6','π/3','π/2','3π/4']);
    return cq({rng,conceptId,difficulty,review:review('9.5','Polar notation'),prompt:`In the polar point (${r}, ${angle}), what does ${r} represent?`,correct:'directed distance from the pole',distractors:['horizontal coordinate x','vertical coordinate y','angle measured from the polar axis'],explanation:'A polar point (r,θ) stores directed radial distance r and angle θ.',steps:['Read the first coordinate as r.','Read the second coordinate as θ.'],hints:['Polar order is (radius, angle).']});
  },
  polarEquivalentNegative: ({rng,conceptId,difficulty})=>{
    const r=choose(rng,[2,3,4,5]),angle=choose(rng,['0','π/6','π/4','π/3']);
    const mapping={'0':'π','π/6':'7π/6','π/4':'5π/4','π/3':'4π/3'};
    return cq({rng,conceptId,difficulty,review:review('9.5','Equivalent polar coordinates'),prompt:`Which point is equivalent to (${r}, ${angle})?`,correct:`(−${r}, ${mapping[angle]})`,distractors:[`(−${r}, ${angle})`,`(${r}, ${mapping[angle]})`,`(−${r}, −${angle})`],explanation:'Negating r points in the opposite direction, so add π to the angle to reach the same Cartesian point.',steps:['Change r to −r.','Rotate the angle by π.'],hints:['Negative radius reverses direction.']});
  },
  polarQuadrant: ({rng,conceptId,difficulty})=>{
    const item=choose(rng,[['π/6','I'],['2π/3','II'],['5π/4','III'],['7π/4','IV']]);
    return cq({rng,conceptId,difficulty,review:review('9.5','Polar angles'),prompt:`For r>0, in which quadrant does θ=${item[0]} place the point?`,correct:`Quadrant ${item[1]}`,distractors:[...['I','II','III','IV'].filter(q=>q!==item[1]).map(q=>`Quadrant ${q}`)],explanation:'With positive radius, the point lies in the standard-position direction of θ.',steps:['Locate θ on the unit circle.','Use r>0 to stay on that ray.'],hints:['Treat θ as an ordinary standard-position angle.']});
  },
  plotPolarPoint: ({rng,conceptId,difficulty})=>{
    const a=choose(rng,specialAngles.slice(0,5)),r=choose(rng,[2,3,4]); const x=round(r*a.x,3),y=round(r*a.y,3);
    return cq({rng,conceptId,difficulty,review:review('9.6','Plotting polar points'),prompt:`Which rectangular location matches the polar point (${r}, ${a.label})?`,correct:`(${x}, ${y})`,distractors:[`(${round(x+1,3)}, ${y})`,`(${x}, ${round(y+1,3)})`,`(${round(x+1,3)}, ${round(y+1,3)})`],explanation:'Use x=r cosθ and y=r sinθ to locate the polar point.',steps:[`x=${r}cos(${a.label})=${x}.`,`y=${r}sin(${a.label})=${y}.`],hints:['Horizontal uses cosine; vertical uses sine.']});
  },
  polarAxisPlot: ({rng,conceptId,difficulty})=>{
    const r=choose(rng,[2,3,5]); const item=choose(rng,[['0',`(${r}, 0)`],['π/2',`(0, ${r})`],['π',`(−${r}, 0)`],['3π/2',`(0, −${r})`]]);
    return cq({rng,conceptId,difficulty,review:review('9.6','Polar axes'),prompt:`Where does (${r}, ${item[0]}) lie in rectangular coordinates?`,correct:item[1],distractors:[`(0, ${r})`,`(${r}, 0)`,`(−${r}, 0)`,`(0, −${r})`].filter(x=>x!==item[1]),explanation:'Axis angles correspond directly to the positive/negative x- or y-axis.',steps:['Locate the angle.','Move r units along that ray.'],hints:['Use the four axis directions first.']});
  },
  rectToPolar345: ({rng,conceptId,difficulty})=>{
    const scale=choose(rng,[1,2,3]),sx=choose(rng,[1,-1]),sy=choose(rng,[1,-1]); const x=3*scale*sx,y=4*scale*sy,r=5*scale;
    const quadrant=sx>0&&sy>0?'I':sx<0&&sy>0?'II':sx<0?'III':'IV';
    return cq({rng,conceptId,difficulty,review:review('9.7','Rectangular to polar'),prompt:`For the rectangular point (${x}, ${y}), what is r?`,correct:String(r),distractors:[String(4*scale),String(6*scale),String(7*scale)],explanation:'Polar radius is the distance from the origin: r=√(x²+y²).',steps:[`r=√(${x}²+${y}²).`,`r=√${25*scale*scale}=${r}.`,`The point lies in Quadrant ${quadrant}, which matters when choosing θ.`],hints:['Use the distance formula from the origin.']});
  },
  rectToPolarAngle: ({rng,conceptId,difficulty})=>{
    const item=choose(rng,[['(1, 1)','π/4'],['(−1, 1)','3π/4'],['(−1, −1)','5π/4'],['(1, −1)','7π/4']]);
    return cq({rng,conceptId,difficulty,review:review('9.7','Rectangular to polar'),prompt:`Using r>0 and 0≤θ<2π, what is θ for ${item[0]}?`,correct:item[1],distractors:['π/4','3π/4','5π/4','7π/4'].filter(v=>v!==item[1]),explanation:'The reference angle is π/4; the signs of x and y determine the quadrant.',steps:['Identify the quadrant from signs.','Use the π/4 reference angle in that quadrant.'],hints:['Both coordinates have equal absolute value, so the reference angle is 45°.']});
  },
  polarToRectSpecial: ({rng,conceptId,difficulty})=>{
    const a=choose(rng,specialAngles.slice(0,5)),r=choose(rng,[2,4,6]); const x=round(r*a.x,3),y=round(r*a.y,3);
    return cq({rng,conceptId,difficulty,review:review('9.7','Polar to rectangular'),prompt:`Convert (${r}, ${a.label}) to rectangular coordinates.`,correct:`(${x}, ${y})`,distractors:[`(${round(x+1,3)}, ${y})`,`(${x}, ${round(y+1,3)})`,`(${round(x+1,3)}, ${round(y+1,3)})`],explanation:'Convert with x=r cosθ and y=r sinθ.',steps:[`x=${r}cos(${a.label})=${x}.`,`y=${r}sin(${a.label})=${y}.`],hints:['Use cosine for x and sine for y.']});
  },
  polarEquationCircle: ({rng,conceptId,difficulty})=>{
    const a=choose(rng,[2,4,6,8]);
    return cq({rng,conceptId,difficulty,review:review('9.8','Polar equations'),prompt:`Convert x²+y²=${a*a} to polar form.`,correct:`r = ${a}`,distractors:[`r = ${a*a}`,`r² = ${a}`,`θ = ${a}`],explanation:'Since x²+y²=r², the equation becomes r²=a², and the standard nonnegative radius description is r=a.',steps:[`Replace x²+y² with r².`,`r²=${a*a}.`,`Use r=${a} for the circle.`],hints:['Use x²+y²=r².']});
  },
  polarEquationVerticalLine: ({rng,conceptId,difficulty})=>{
    const a=choose(rng,[2,3,4,5]);
    return cq({rng,conceptId,difficulty,review:review('9.8','Rectangular/polar equations'),prompt:`Convert x=${a} to polar form.`,correct:`r cos θ = ${a}`,distractors:[`r sin θ = ${a}`,`r = ${a} cos θ`,`r² = ${a}`],explanation:'The rectangular coordinate x equals r cosθ.',steps:['Use x=r cosθ.','Substitute directly into x=a.'],hints:['Which polar identity equals x?']});
  },
  polarEquationHorizontalLine: ({rng,conceptId,difficulty})=>{
    const a=choose(rng,[2,3,4,5]);
    return cq({rng,conceptId,difficulty,review:review('9.8','Rectangular/polar equations'),prompt:`Convert y=${a} to polar form.`,correct:`r sin θ = ${a}`,distractors:[`r cos θ = ${a}`,`r = ${a} sin θ`,`θ = ${a}`],explanation:'The rectangular coordinate y equals r sinθ.',steps:['Use y=r sinθ.','Substitute into y=a.'],hints:['Which polar identity equals y?']});
  },
  polarCircleToRect: ({rng,conceptId,difficulty})=>{
    const a=choose(rng,[2,4,6]);
    return cq({rng,conceptId,difficulty,review:review('9.8','Polar to rectangular equations'),prompt:`Convert r=${a}cosθ to rectangular form.`,correct:`x² + y² = ${a}x`,distractors:[`x² + y² = ${a}y`,`x + y = ${a}`,`x² − y² = ${a}x`],explanation:'Multiply by r: r²=a r cosθ. Then substitute r²=x²+y² and r cosθ=x.',steps:[`r²=${a}r cosθ.`,`x²+y²=${a}x.`],hints:['Multiply by r before substituting identities.']});
  },
  polarEvaluate: ({rng,conceptId,difficulty})=>{
    const a=choose(rng,[2,3,4]),b=choose(rng,[1,2]); const item=choose(rng,[['0',1],['π/2',0],['π',-1]]); const r=a+b*item[1];
    return nq({conceptId,difficulty,review:review('9.9','Evaluating polar equations'),prompt:`For r=${a}+${b}cosθ, find r when θ=${item[0]}.`,value:r,explanation:'Evaluate the polar equation at the stated angle just like evaluating any function.',steps:[`cos(${item[0]})=${item[1]}.`,`r=${a}+${b}(${item[1]})=${r}.`],hints:['Evaluate cosine first.']});
  },
  polarSymmetry: ({rng,conceptId,difficulty})=>{
    const item=choose(rng,[['r=4cosθ','polar axis (x-axis)'],['r=3sinθ','line θ=π/2 (y-axis)'],['r=2cos(2θ)','both coordinate axes'],['r²=9cos(2θ)','both coordinate axes']]);
    return cq({rng,conceptId,difficulty,review:review('9.9','Polar symmetry'),prompt:`Which symmetry is most evident for ${item[0]}?`,correct:item[1],distractors:['polar axis (x-axis)','line θ=π/2 (y-axis)','both coordinate axes','no symmetry'].filter(v=>v!==item[1]),explanation:'Polar symmetry can often be recognized from sine/cosine structure and from replacing θ with −θ or π−θ.',steps:['Inspect whether the equation uses sine or cosine.','Check how the equation responds to reflecting the angle.'],hints:['Cosine commonly aligns symmetry with the polar axis.']});
  },
  polarFamilyIdentify: ({rng,conceptId,difficulty})=>{
    const item=choose(rng,[['r=5','circle centered at the pole'],['r=4+2cosθ','limaçon'],['r=3cos(4θ)','rose'],['r²=16cos(2θ)','lemniscate']]);
    return cq({rng,conceptId,difficulty,review:review('9.9','Recognizing polar graphs'),prompt:`What family is represented by ${item[0]}?`,correct:item[1],distractors:['circle centered at the pole','limaçon','rose','lemniscate'].filter(v=>v!==item[1]),explanation:'Special polar graph families have characteristic equation patterns.',steps:['Look for constant r, a±b trig, trig(nθ), or r² with cos2θ/sin2θ.','Match the pattern to its family.'],hints:['The number multiplying θ is a major clue for roses.']});
  },
  limaconClassify: ({rng,conceptId,difficulty})=>{
    const type=choose(rng,['inner','cardioid','dimpled','convex']); let a,b,correct;
    if(type==='inner'){a=2;b=5;correct='inner-loop limaçon';}
    else if(type==='cardioid'){a=4;b=4;correct='cardioid';}
    else if(type==='dimpled'){a=5;b=4;correct='dimpled limaçon';}
    else {a=7;b=3;correct='convex limaçon';}
    return cq({rng,conceptId,difficulty,review:review('9.10','Limaçon classification'),prompt:`Classify r=${a}+${b}cosθ.`,correct,distractors:['inner-loop limaçon','cardioid','dimpled limaçon','convex limaçon'].filter(v=>v!==correct),explanation:'For r=a+b cosθ, compare |a| and |b|. Equal gives a cardioid; a<b gives an inner loop; intermediate ratios create a dimple; large a/b gives convex.',steps:[`Compare a=${a} and b=${b}.`,`Use the a:b ratio to classify the shape.`],hints:['Start with whether a is less than, equal to, or greater than b.']});
  },
  polarCircleFeatures: ({rng,conceptId,difficulty})=>{
    const a=choose(rng,[2,4,6,8]),radius=a/2;
    return cq({rng,conceptId,difficulty,review:review('9.10','Polar circles'),prompt:`The graph r=${a}cosθ is a circle. What is its radius?`,correct:String(radius),distractors:[String(a),String(a*a),String(a/4)],explanation:'r=a cosθ converts to x²+y²=ax, a circle centered at (a/2,0) with radius |a|/2.',steps:[`Convert to x²+y²=${a}x.`,`Complete the square in x.`,`Radius=${a}/2=${radius}.`],hints:['The coefficient becomes the diameter, not the radius.']});
  },
  cardioidDirection: ({rng,conceptId,difficulty})=>{
    const item=choose(rng,[['r=4+4cosθ','right'],['r=4−4cosθ','left'],['r=4+4sinθ','up'],['r=4−4sinθ','down']]);
    return cq({rng,conceptId,difficulty,review:review('9.10','Cardioid orientation'),prompt:`Which direction does ${item[0]} face?`,correct:item[1],distractors:['right','left','up','down'].filter(v=>v!==item[1]),explanation:'Cosine aligns the cardioid horizontally; sine aligns it vertically. The sign determines the lobe direction.',steps:['Identify cosine vs sine.','Use the sign to determine direction.'],hints:['Test the angle where the trig term equals +1.']});
  },
  rosePetals: ({rng,conceptId,difficulty})=>{
    const n=choose(rng,[2,3,4,5,6]); const petals=n%2===0?2*n:n;
    return cq({rng,conceptId,difficulty,review:review('9.11','Rose curves'),prompt:`How many petals does r=3cos(${n}θ) have?`,correct:String(petals),distractors:[String(petals+1),String(Math.max(1,petals-1)),String(petals+2)],explanation:'For r=a cos(nθ) or a sin(nθ), odd n gives n petals and even n gives 2n petals.',steps:[`n=${n} is ${n%2===0?'even':'odd'}.`,`Therefore the rose has ${petals} petals.`],hints:['Parity of n determines whether to double it.']});
  },
  roseMaxRadius: ({rng,conceptId,difficulty})=>{
    const a=choose(rng,[2,3,4,5,6]),n=choose(rng,[2,3,4,5]);
    return nq({conceptId,difficulty,review:review('9.11','Rose curves'),prompt:`What is the maximum distance from the pole for r=${a}sin(${n}θ)?`,value:a,explanation:'Since sine ranges from −1 to 1, the maximum absolute radius is |a|.',steps:[`|sin(${n}θ)|≤1.`,`Therefore |r|≤${a}.`],hints:['The trig factor can reach 1.']});
  },
  lemniscateOrientation: ({rng,conceptId,difficulty})=>{
    const cos=choose(rng,[true,false]);
    return cq({rng,conceptId,difficulty,review:review('9.11','Lemniscates'),prompt:`What is the main orientation of r²=16${cos?'cos':'sin'}(2θ)?`,correct:cos?'along the horizontal axis':'along the diagonal lines y=±x',distractors:[cos?'along the diagonal lines y=±x':'along the horizontal axis','a single vertical loop','a four-petal rose'],explanation:'cos(2θ) lemniscates align left/right; sin(2θ) rotates the loops onto diagonal directions.',steps:['Identify cos(2θ) versus sin(2θ).','Match the standard lemniscate orientation.'],hints:['Sine rotates the standard horizontal lemniscate by 45°.']});
  },
  lemniscateMaxRadius: ({rng,conceptId,difficulty})=>{
    const a=choose(rng,[3,4,5,6]);
    return nq({conceptId,difficulty,review:review('9.11','Lemniscates'),prompt:`For r²=${a*a}cos(2θ), what is the maximum |r|?`,value:a,explanation:'The largest possible value of cos(2θ) is 1, so r²≤a² and |r|≤a.',steps:[`r²≤${a*a}.`,`Maximum |r|=${a}.`],hints:['Set cos(2θ)=1.']});
  },
  polarNavigation: ({rng,conceptId,difficulty})=>{
    const r=choose(rng,[10,20,30,40]),a=choose(rng,specialAngles.slice(1,4)); const x=round(r*a.x,2),y=round(r*a.y,2);
    return cq({rng,conceptId,difficulty,review:review('9.12','Polar modeling'),prompt:`A sensor reports a target at polar location (${r}, ${a.label}) km. Which rectangular position is correct?`,correct:`(${x}, ${y}) km`,distractors:[`(${round(x+1,2)}, ${y}) km`,`(${x}, ${round(y+1,2)}) km`,`(${round(x+1,2)}, ${round(y+1,2)}) km`],explanation:'Polar measurements translate naturally to rectangular map coordinates using x=r cosθ and y=r sinθ.',steps:[`x=${r}cos(${a.label})=${x}.`,`y=${r}sin(${a.label})=${y}.`],hints:['Resolve the radial measurement into horizontal and vertical components.']});
  },
  polarPatternApplication: ({rng,conceptId,difficulty})=>cq({rng,conceptId,difficulty,review:review('9.12','Polar applications'),prompt:'A directional antenna has strongest reception in several equally spaced directions around a tower. Which polar family is especially useful for modeling that repeated-lobe pattern?',correct:'rose curve',distractors:['constant-radius circle','single parabola','straight line'],explanation:'Rose curves naturally produce repeated, evenly spaced lobes around the pole, making them useful conceptual models for directional patterns.',steps:['Look for a graph family with repeated radial lobes.','Rose equations r=a cos(nθ) or r=a sin(nθ) provide that structure.'],hints:['Think of a flower-like pattern.']}),
  paramVsPolar: ({rng,conceptId,difficulty})=>cq({rng,conceptId,difficulty,review:review('9.13','Unit 9 review'),prompt:'Which statement correctly distinguishes the two major representations in Unit 9?',correct:'Parametric equations generate x and y from a parameter; polar equations locate points using radius and angle',distractors:['Parametric equations use only angles; polar equations use only time','Both systems require every graph to pass the vertical-line test','Polar equations eliminate direction while parametric equations eliminate coordinates'],explanation:'Parametric and polar systems are alternative coordinate/representation tools with different inputs and strengths.',steps:['Parametric: t → (x(t),y(t)).','Polar: (r,θ) describes location relative to a pole and polar axis.'],hints:['Recall what the independent quantity is in each system.']})
};

registerGeneratorPack('u9',pack);
export default pack;
