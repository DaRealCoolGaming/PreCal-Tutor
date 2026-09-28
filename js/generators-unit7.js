import { registerGeneratorPack } from './generators.js';
import { choiceQuestion as cq, numberQuestion as nq, randomInt, choose } from './generator-helpers.js';

const d2r = d => d * Math.PI / 180;
const r2d = r => r * 180 / Math.PI;
const round = (n, places = 3) => Number(n.toFixed(places));
const fmt = n => Number.isInteger(n) ? String(n) : String(round(n));
const triThird = (A, B) => 180 - A - B;

function safeTriangle(rng) {
  const A = randomInt(rng, 30, 80);
  const B = randomInt(rng, 35, 90);
  const C = triThird(A, B);
  if (C <= 15) return safeTriangle(rng);
  return { A, B, C };
}

function lawSinesSide({a,A,B}) {
  return a * Math.sin(d2r(B)) / Math.sin(d2r(A));
}

function lawCosSide(a,b,C) {
  return Math.sqrt(a*a+b*b-2*a*b*Math.cos(d2r(C)));
}

function lawCosAngle(a,b,c) {
  const value = (a*a+b*b-c*c)/(2*a*b);
  return r2d(Math.acos(Math.max(-1, Math.min(1, value))));
}

const pack = {
  obliqueClassify: ({rng,conceptId,difficulty}) => {
    const item = choose(rng,[
      ['A triangle has angles 42°, 63°, and 75°. How should it be classified by angle?','acute',['right','obtuse','not a triangle']],
      ['A triangle has angles 28°, 47°, and 105°. How should it be classified by angle?','obtuse',['acute','right','equilateral']],
      ['A triangle has angles 35°, 55°, and 90°. How should it be classified by angle?','right',['acute','obtuse','isosceles only']]
    ]);
    return cq({rng,conceptId,difficulty,review:'7.1 Oblique triangles',prompt:item[0],correct:item[1],distractors:item[2],explanation:'Classify by the largest angle: below 90° is acute, exactly 90° is right, and above 90° is obtuse. An oblique triangle is any triangle with no right angle.',steps:['Inspect the angle measures.','Compare the largest angle with 90°.'],hints:['Look at the largest angle first.']});
  },
  triangleMissingAngle: ({rng,conceptId,difficulty}) => {
    const A=randomInt(rng,25,80),B=randomInt(rng,30,85); const C=180-A-B;
    if(C<=10) return pack.triangleMissingAngle({rng,conceptId,difficulty});
    return nq({prompt:`An oblique triangle has A=${A}° and B=${B}°. Find C.`,value:C,tolerance:1e-9,conceptId,difficulty,review:'7.1 Angle sum',explanation:'The interior angles of every triangle total 180°.',steps:[`C=180°−${A}°−${B}°`,`C=${C}°`],hints:['Subtract the two known angles from 180°.']});
  },
  chooseTriangleLaw: ({rng,conceptId,difficulty}) => {
    const item=choose(rng,[
      ['You know two sides and the included angle (SAS). Which law is the natural first choice?','Law of Cosines',['Law of Sines','Pythagorean Theorem','SOH-CAH-TOA only']],
      ['You know an angle-side opposite pair plus another angle (AAS/ASA). Which law is the natural first choice?','Law of Sines',['Law of Cosines','Distance formula','Midpoint formula']],
      ['You know all three sides (SSS) and need an angle. Which law is the natural first choice?','Law of Cosines',['Law of Sines','Pythagorean Theorem only','Unit circle']]
    ]);
    return cq({rng,conceptId,difficulty,review:'7.1 Choosing a method',prompt:item[0],correct:item[1],distractors:item[2],explanation:'Law of Sines needs an opposite angle-side pair. Law of Cosines is ideal for SAS or SSS data.',steps:['Identify what information is given.','Check whether an opposite angle-side pair is known.'],hints:['SAS/SSS usually points to Cosines; ASA/AAS usually points to Sines.']});
  },

  sineMissingSide: ({rng,conceptId,difficulty}) => {
    const {A,B}=safeTriangle(rng); const a=randomInt(rng,6,18); const b=lawSinesSide({a,A,B});
    return nq({prompt:`In triangle ABC, A=${A}°, B=${B}°, and a=${a}. Find side b to the nearest thousandth.`,value:round(b),tolerance:0.002,conceptId,difficulty,review:'7.2 Law of Sines',explanation:'Match each side with its opposite angle and set a/sinA=b/sinB.',steps:[`${a}/sin(${A}°)=b/sin(${B}°)`,`b=${a}·sin(${B}°)/sin(${A}°)`,`b≈${round(b)}`],hints:['Side b pairs with angle B.','Cross-multiply after writing the sine-law proportion.']});
  },
  sineMissingAngle: ({rng,conceptId,difficulty}) => {
    const A=randomInt(rng,30,70), a=randomInt(rng,8,16), B=randomInt(rng,25,Math.min(75,140-A)); const b=lawSinesSide({a,A,B});
    return nq({prompt:`In triangle ABC, A=${A}°, a=${a}, and b≈${round(b)}. Find B to the nearest tenth of a degree.`,value:round(B,1),tolerance:0.15,conceptId,difficulty,review:'7.2 Law of Sines',explanation:'Use sinB/b=sinA/a, isolate sinB, then apply inverse sine.',steps:[`sinB/${round(b)}=sin${A}°/${a}`,`sinB≈${round(b*Math.sin(d2r(A))/a,4)}`,`B≈${B}°`],hints:['Solve for sinB before using inverse sine.']});
  },
  ambiguousCase: ({rng,conceptId,difficulty}) => {
    const item=choose(rng,[
      ['For SSA data, why can Law of Sines sometimes produce two triangles?','Because sine has the same positive value in Quadrants I and II',['Because cosine is always positive','Because triangle angles may exceed 180°','Because side lengths can be negative']],
      ['If inverse sine gives B=38° in an SSA problem, what alternate angle must be checked?','142°',['52°','218°','322°']],
      ['When the alternate angle plus the known angle is at least 180°, how many valid triangles does that alternate create?','0',['1','2','infinitely many']]
    ]);
    return cq({rng,conceptId,difficulty,review:'7.2 SSA ambiguous case',prompt:item[0],correct:item[1],distractors:item[2],explanation:'SSA can be ambiguous because sinθ=sin(180°−θ). The supplementary candidate must still leave room for a positive third angle.',steps:['Find the inverse-sine angle.','Check its supplement.','Reject any candidate that makes the angle sum reach or exceed 180°.'],hints:['Sine repeats across supplementary angles.']});
  },

  cosineMissingSide: ({rng,conceptId,difficulty}) => {
    const a=randomInt(rng,5,15),b=randomInt(rng,6,16),C=randomInt(rng,35,120),c=lawCosSide(a,b,C);
    return nq({prompt:`Two sides of a triangle are a=${a}, b=${b} with included angle C=${C}°. Find c to the nearest thousandth.`,value:round(c),tolerance:0.002,conceptId,difficulty,review:'7.3 Law of Cosines',explanation:'For SAS data, use c²=a²+b²−2ab cosC.',steps:[`c²=${a}²+${b}²−2(${a})(${b})cos${C}°`,`c²≈${round(c*c)}`,`c≈${round(c)}`],hints:['The unknown side is opposite the included angle C.']});
  },
  cosineMissingAngle: ({rng,conceptId,difficulty}) => {
    const a=randomInt(rng,6,14),b=randomInt(rng,7,15),C=randomInt(rng,40,110),c=lawCosSide(a,b,C),calc=lawCosAngle(a,b,c);
    return nq({prompt:`A triangle has a=${a}, b=${b}, and c≈${round(c)}. Find angle C to the nearest tenth of a degree.`,value:round(calc,1),tolerance:0.2,conceptId,difficulty,review:'7.3 Law of Cosines',explanation:'Rearrange c²=a²+b²−2ab cosC to isolate cosC, then use inverse cosine.',steps:[`cosC=(a²+b²−c²)/(2ab)`,`cosC≈${round((a*a+b*b-c*c)/(2*a*b),4)}`,`C≈${round(calc,1)}°`],hints:['When all three sides are known, Law of Cosines can recover an angle.']});
  },
  cosineLawRecognize: ({rng,conceptId,difficulty}) => cq({rng,conceptId,difficulty,review:'7.3 Law of Cosines',prompt:'Which equation correctly relates side c to sides a,b and included angle C?',correct:'c² = a² + b² − 2ab cos C',distractors:['c² = a² + b² + 2ab cos C','c = a + b − 2ab cos C','c² = a² − b² − 2ab cos C'],explanation:'Law of Cosines extends the Pythagorean Theorem with the correction term −2ab cosC.',steps:['Match the side c with its opposite angle C.','Use the two adjacent sides a and b in the product term.'],hints:['The cosine term is subtracted.']}),

  triangleAreaSAS: ({rng,conceptId,difficulty}) => {
    const a=randomInt(rng,7,20),b=randomInt(rng,8,22),C=randomInt(rng,30,120),area=.5*a*b*Math.sin(d2r(C));
    return nq({prompt:`Two sides are ${a} and ${b} with included angle ${C}°. Find the triangle's area to the nearest hundredth.`,value:round(area,2),tolerance:0.02,conceptId,difficulty,review:'7.4 Oblique triangle applications',explanation:'When two sides and the included angle are known, area K=½ab sinC.',steps:[`K=½(${a})(${b})sin${C}°`,`K≈${round(area,2)}`],hints:['Use the area formula involving two sides and their included angle.']});
  },
  bearingDistance: ({rng,conceptId,difficulty}) => {
    const p=randomInt(rng,20,60),q=randomInt(rng,25,70),angle=choose(rng,[45,60,75,90,105]),d=lawCosSide(p,q,angle);
    return nq({prompt:`Two trips of ${p} km and ${q} km leave the same point with an included angle of ${angle}°. How far apart are the endpoints? Round to the nearest tenth.`,value:round(d,1),tolerance:0.11,conceptId,difficulty,review:'7.4 Directional applications',explanation:'The two trip lengths and included angle form an SAS triangle, so Law of Cosines gives the separation.',steps:[`d²=${p}²+${q}²−2(${p})(${q})cos${angle}°`,`d≈${round(d,1)} km`],hints:['Treat the endpoint separation as the side opposite the included angle.']});
  },
  triangleApplicationLaw: ({rng,conceptId,difficulty}) => {
    const item=choose(rng,[
      ['A surveyor knows a baseline, one angle at each end, and needs the opposite distance. Which law?','Law of Sines',['Law of Cosines','Vector addition','Distance formula only']],
      ['Two roads leave an intersection for known distances with a known angle between them. Which law finds the endpoints’ separation?','Law of Cosines',['Law of Sines','Slope formula','Midpoint formula']],
      ['A triangle area problem gives two sides and the included angle. Which formula is most direct?','K = ½ab sin C',['K = ab cos C','K = a+b+c','K = ½(a+b)C']]
    ]);
    return cq({rng,conceptId,difficulty,review:'7.4 Applications',prompt:item[0],correct:item[1],distractors:item[2],explanation:'Translate the situation into a triangle first, then match the known data pattern to the appropriate law or area formula.',steps:['Sketch and label the triangle.','Identify ASA/AAS, SAS, SSS, or area data.','Choose the matching relation.'],hints:['A quick labeled sketch usually reveals the correct method.']});
  },

  vectorDefinition: ({rng,conceptId,difficulty}) => cq({rng,conceptId,difficulty,review:'7.5 Vector fundamentals',prompt:'What two quantities define a vector?',correct:'magnitude and direction',distractors:['slope and intercept','length and area','x-coordinate and y-intercept'],explanation:'A vector represents both size (magnitude) and direction. Components are one coordinate representation of those two ideas.',steps:['Recall that a scalar has magnitude only.','A vector adds direction.'],hints:['Think about velocity versus speed.']}),
  vectorFromPoints: ({rng,conceptId,difficulty}) => {
    const x1=randomInt(rng,-6,4),y1=randomInt(rng,-6,4),dx=randomInt(rng,-5,6)||3,dy=randomInt(rng,-5,6)||-2,x2=x1+dx,y2=y1+dy;
    return cq({rng,conceptId,difficulty,review:'7.5 Component form',prompt:`Find the vector from P(${x1},${y1}) to Q(${x2},${y2}).`,correct:`⟨${dx}, ${dy}⟩`,distractors:[`⟨${dx+1}, ${dy}⟩`,`⟨${dx}, ${dy+1}⟩`,`⟨${dx-1}, ${dy-1}⟩`],explanation:'Subtract initial coordinates from terminal coordinates: Q−P.',steps:[`${x2}−(${x1})=${dx}`,`${y2}−(${y1})=${dy}`,`Vector = ⟨${dx},${dy}⟩`],hints:['Terminal minus initial.']});
  },
  vectorScalarVsVector: ({rng,conceptId,difficulty}) => {
    const item=choose(rng,[
      ['Which quantity is naturally modeled by a vector?','wind velocity',['temperature','mass','elapsed time']],
      ['Which quantity is a scalar rather than a vector?','speed',['velocity','displacement','force']],
      ['A 40 N force directed 30° above horizontal is what kind of quantity?','vector',['scalar','constant only','unitless ratio']]
    ]);
    return cq({rng,conceptId,difficulty,review:'7.5 Vector modeling',prompt:item[0],correct:item[1],distractors:item[2],explanation:'Vectors require both magnitude and direction. Scalars describe magnitude alone.',steps:['Ask whether direction is essential to the quantity.'],hints:['If changing direction changes the quantity, it is probably a vector.']});
  },

  componentsFromMagnitude: ({rng,conceptId,difficulty}) => {
    const mag=randomInt(rng,5,20),angle=choose(rng,[30,60,120,150,210,240,300,330]),x=mag*Math.cos(d2r(angle)),y=mag*Math.sin(d2r(angle));
    return cq({rng,conceptId,difficulty,review:'7.6 Vector components',prompt:`A vector has magnitude ${mag} and direction ${angle}° from the positive x-axis. Which component form is closest?`,correct:`⟨${round(x,2)}, ${round(y,2)}⟩`,distractors:[`⟨${round(y,2)}, ${round(x,2)}⟩`,`⟨${round(-x,2)}, ${round(y,2)}⟩`,`⟨${round(x,2)}, ${round(-y,2)}⟩`],explanation:'For standard-position direction θ, components are ⟨r cosθ, r sinθ⟩.',steps:[`x=${mag}cos${angle}°≈${round(x,2)}`,`y=${mag}sin${angle}°≈${round(y,2)}`],hints:['Cosine gives the horizontal component; sine gives the vertical component.']});
  },
  componentMeaning: ({rng,conceptId,difficulty}) => cq({rng,conceptId,difficulty,review:'7.6 Components',prompt:'For v=⟨−4,7⟩, what does the first component mean geometrically?',correct:'4 units left',distractors:['4 units right','7 units left','7 units down'],explanation:'The x-component controls horizontal change. A negative x-component points left.',steps:['Read the first component as horizontal displacement.','Use its sign for direction.'],hints:['First component = horizontal.']}),
  vectorEndpoint: ({rng,conceptId,difficulty}) => {
    const x=randomInt(rng,-5,5),y=randomInt(rng,-5,5),a=randomInt(rng,-6,6),b=randomInt(rng,-6,6),X=x+a,Y=y+b;
    return cq({rng,conceptId,difficulty,review:'7.6 Vector endpoints',prompt:`Starting at (${x},${y}), apply vector ⟨${a},${b}⟩. Where is the endpoint?`,correct:`(${X}, ${Y})`,distractors:[`(${X+1}, ${Y})`,`(${X}, ${Y+1})`,`(${X-1}, ${Y-1})`],explanation:'Add vector components to the starting coordinates.',steps:[`${x}+${a}=${X}`,`${y}+${b}=${Y}`],hints:['Start point + vector = endpoint.']});
  },

  vectorMagnitude: ({rng,conceptId,difficulty}) => {
    const pair=choose(rng,[[3,4,5],[5,12,13],[8,15,17],[7,24,25],[6,8,10]]); const sx=choose(rng,[-1,1]),sy=choose(rng,[-1,1]); const x=pair[0]*sx,y=pair[1]*sy;
    return nq({prompt:`Find the magnitude of v=⟨${x},${y}⟩.`,value:pair[2],tolerance:1e-9,conceptId,difficulty,review:'7.7 Vector magnitude',explanation:'Magnitude is the hypotenuse formed by the horizontal and vertical components.',steps:[`|v|=√(${x}²+${y}²)`,`|v|=${pair[2]}`],hints:['Use the Pythagorean Theorem on the components.']});
  },
  vectorDirection: ({rng,conceptId,difficulty}) => {
    const x=randomInt(rng,2,9)*choose(rng,[-1,1]),y=randomInt(rng,2,9)*choose(rng,[-1,1]),angle=(r2d(Math.atan2(y,x))+360)%360;
    return nq({prompt:`Find the direction angle of v=⟨${x},${y}⟩ in standard position, nearest tenth of a degree.`,value:round(angle,1),tolerance:0.15,conceptId,difficulty,review:'7.7 Direction angle',explanation:'Use atan2(y,x) or tangent plus a quadrant check. Standard direction angles are measured counterclockwise from +x.',steps:[`Reference angle comes from tan⁻¹(|${y}/${x}|).`,`The signs place the vector in its correct quadrant.`,`θ≈${round(angle,1)}°`],hints:['Do not ignore the quadrant when using inverse tangent.']});
  },
  unitVector: ({rng,conceptId,difficulty}) => {
    const pair=choose(rng,[[3,4,5],[5,12,13],[8,15,17]]),x=pair[0],y=pair[1],m=pair[2];
    return cq({rng,conceptId,difficulty,review:'7.7 Unit vectors',prompt:`Which is a unit vector in the direction of ⟨${x},${y}⟩?`,correct:`⟨${x}/${m}, ${y}/${m}⟩`,distractors:[`⟨${x*m}, ${y*m}⟩`,`⟨${y}/${m}, ${x}/${m}⟩`,`⟨${x}, ${y}⟩`],explanation:'Divide each component by the vector magnitude so the new magnitude becomes 1.',steps:[`|v|=${m}`,`u=v/|v|=⟨${x}/${m},${y}/${m}⟩`],hints:['Normalize by dividing, not multiplying, by the magnitude.']});
  },

  vectorAdd: ({rng,conceptId,difficulty}) => {
    const a=randomInt(rng,-6,6),b=randomInt(rng,-6,6),c=randomInt(rng,-6,6),d=randomInt(rng,-6,6),X=a+c,Y=b+d;
    return cq({rng,conceptId,difficulty,review:'7.8 Vector addition',prompt:`Add ⟨${a},${b}⟩ + ⟨${c},${d}⟩.`,correct:`⟨${X}, ${Y}⟩`,distractors:[`⟨${X+1}, ${Y}⟩`,`⟨${X}, ${Y+1}⟩`,`⟨${X-1}, ${Y-1}⟩`],explanation:'Vector addition is componentwise.',steps:[`${a}+${c}=${X}`,`${b}+${d}=${Y}`],hints:['Add x-components together and y-components together.']});
  },
  vectorSubtract: ({rng,conceptId,difficulty}) => {
    const a=randomInt(rng,-6,6),b=randomInt(rng,-6,6),c=randomInt(rng,-6,6),d=randomInt(rng,-6,6),X=a-c,Y=b-d;
    return cq({rng,conceptId,difficulty,review:'7.8 Vector subtraction',prompt:`Subtract ⟨${a},${b}⟩ − ⟨${c},${d}⟩.`,correct:`⟨${X}, ${Y}⟩`,distractors:[`⟨${X+1}, ${Y}⟩`,`⟨${X}, ${Y+1}⟩`,`⟨${X-1}, ${Y-1}⟩`],explanation:'Subtract corresponding components in the stated order.',steps:[`${a}−(${c})=${X}`,`${b}−(${d})=${Y}`],hints:['Order matters in subtraction.']});
  },
  scalarMultiply: ({rng,conceptId,difficulty}) => {
    const k=choose(rng,[-3,-2,2,3,4]),a=randomInt(rng,-5,5),b=randomInt(rng,-5,5),X=k*a,Y=k*b;
    return cq({rng,conceptId,difficulty,review:'7.8 Scalar multiplication',prompt:`Compute ${k}⟨${a},${b}⟩.`,correct:`⟨${X}, ${Y}⟩`,distractors:[`⟨${X+1}, ${Y}⟩`,`⟨${X}, ${Y+1}⟩`,`⟨${X-1}, ${Y-1}⟩`],explanation:'A scalar multiplies every component. A negative scalar also reverses direction.',steps:[`${k}·${a}=${X}`,`${k}·${b}=${Y}`],hints:['Distribute the scalar to both components.']});
  },
  vectorGeometry: ({rng,conceptId,difficulty}) => cq({rng,conceptId,difficulty,review:'7.8 Geometric vector operations',prompt:'Geometrically, how can u+v be represented?',correct:'Place v tip-to-tail after u; the resultant runs from the start of u to the end of v',distractors:['Reflect both vectors across the x-axis','Multiply their magnitudes and keep u’s direction','Place their tails together and connect the tips only'],explanation:'The tip-to-tail rule gives the geometric meaning of vector addition and matches componentwise addition.',steps:['Draw u.','Move v without rotating it so its tail begins at u’s tip.','Draw the resultant from the original start to the final tip.'],hints:['Translation is allowed; changing the vector’s direction is not.']}),

  resultantVelocity: ({rng,conceptId,difficulty}) => {
    const east=randomInt(rng,4,12),north=randomInt(rng,3,10),mag=Math.hypot(east,north),dir=r2d(Math.atan2(north,east));
    return nq({prompt:`A current contributes ${east} km/h east while a boat contributes ${north} km/h north. Find the resultant speed, nearest tenth.`,value:round(mag,1),tolerance:0.11,conceptId,difficulty,review:'7.9 Vector applications',explanation:'Perpendicular velocity components add as vectors; the resultant magnitude comes from the Pythagorean Theorem.',steps:[`v=⟨${east},${north}⟩`,`|v|=√(${east}²+${north}²)≈${round(mag,1)} km/h`,`Direction would be about ${round(dir,1)}° north of east.`],hints:['Add the components first, then find the magnitude.']});
  },
  forceResultant: ({rng,conceptId,difficulty}) => {
    const f1=randomInt(rng,3,10),f2=randomInt(rng,3,10),x=f1-f2,y=f1+2,mag=Math.hypot(x,y);
    return nq({prompt:`Two modeled force contributions combine to ⟨${f1},${f1+2}⟩ + ⟨${-f2},0⟩ N. Find the resultant magnitude, nearest tenth.`,value:round(mag,1),tolerance:0.11,conceptId,difficulty,review:'7.9 Resultant vectors',explanation:'Add force vectors componentwise, then compute the magnitude of the resultant.',steps:[`Resultant = ⟨${f1-f2},${f1+2}⟩`,`Magnitude = √(${f1-f2}²+${f1+2}²)≈${round(mag,1)} N`],hints:['Do not add magnitudes directly when forces point in different directions.']});
  },
  scaleVectorModel: ({rng,conceptId,difficulty}) => {
    const k=choose(rng,[2,3,0.5,-2]),x=randomInt(rng,2,7),y=choose(rng,[-6,-5,-4,-3,-2,-1,1,2,3,4,5,6]),X=k*x,Y=k*y;
    return cq({rng,conceptId,difficulty,review:'7.9 Scalar modeling',prompt:`A displacement vector is d=⟨${x},${y}⟩. Which vector represents ${k}d?`,correct:`⟨${fmt(X)}, ${fmt(Y)}⟩`,distractors:[`⟨${fmt(X+1)}, ${fmt(Y)}⟩`,`⟨${fmt(X)}, ${fmt(Y+1)}⟩`,`⟨${fmt(X-1)}, ${fmt(Y-1)}⟩`],explanation:'Scaling a vector multiplies every component by the same scalar. Negative scalars reverse direction.',steps:[`Multiply ${x} by ${k}.`,`Multiply ${y} by ${k}.`],hints:['A scalar acts on the whole vector.']});
  },
  vectorApplicationStrategy: ({rng,conceptId,difficulty}) => {
    const item=choose(rng,[
      ['A plane has an air-velocity vector and a wind vector. How is ground velocity found?','Add the two vectors',['Multiply the vectors','Subtract both magnitudes only','Average the directions']],
      ['A force model doubles every component of a vector. What happens to its magnitude?','It doubles',['It is unchanged','It is squared','It is halved']],
      ['If two vectors are exact opposites, what is their sum?','the zero vector',['a unit vector','their product','a vector twice as long']]
    ]);
    return cq({rng,conceptId,difficulty,review:'7.9 Modeling with vectors',prompt:item[0],correct:item[1],distractors:item[2],explanation:'Vector models obey componentwise addition and scalar multiplication while preserving geometric meaning.',steps:['Translate each physical quantity into a vector.','Apply the appropriate vector operation.','Interpret the resultant in context.'],hints:['Ask whether the situation combines effects or scales one effect.']});
  }
};

registerGeneratorPack('u7', pack);
export default pack;
