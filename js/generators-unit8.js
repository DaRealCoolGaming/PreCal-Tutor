import { registerGeneratorPack } from './generators.js';
import { choiceQuestion as cq, numberQuestion as nq, randomInt, choose } from './generator-helpers.js';

const sq = n => n * n;
const round = (n, p = 3) => Number(n.toFixed(p));
const coord = (x, y) => `(${x}, ${y})`;
const term = (v, h) => h === 0 ? v : `${v} ${h > 0 ? '−' : '+'} ${Math.abs(h)}`;
const shiftedSquare = (v, h) => `(${term(v, h)})²`;
const nonzero = (rng, min=-6, max=6) => { let n=0; while(n===0) n=randomInt(rng,min,max); return n; };

function distinctInts(base, deltas) {
  return deltas.map(d => base + d).filter((v,i,a)=>a.indexOf(v)===i);
}

const pack = {
  conicByDefinition: ({rng,conceptId,difficulty}) => {
    const item = choose(rng,[
      ['Which conic is the set of all points equidistant from one focus and one directrix?','Parabola',['Circle','Ellipse','Hyperbola']],
      ['Which conic is the set of points whose sum of distances to two fixed foci is constant?','Ellipse',['Parabola','Hyperbola','Circle only']],
      ['Which conic is the set of points whose absolute difference of distances to two fixed foci is constant?','Hyperbola',['Ellipse','Circle','Parabola']],
      ['Which conic is the set of points a fixed distance from a center?','Circle',['Parabola','Hyperbola','Ellipse only']]
    ]);
    return cq({rng,conceptId,difficulty,review:'8.1 Conic definitions',prompt:item[0],correct:item[1],distractors:item[2],explanation:'Each conic has a geometric locus definition. Connecting the equation to that definition makes the features easier to remember.',steps:['Identify the distance condition in the definition.','Match that condition to the conic family.'],hints:['Focus/directrix points to a parabola; two-foci sum/difference distinguishes ellipse from hyperbola.']});
  },
  coneSlice: ({rng,conceptId,difficulty}) => {
    const item=choose(rng,[
      ['A plane cuts one nappe of a cone parallel to its base. Which conic appears?','Circle',['Parabola','Ellipse','Hyperbola']],
      ['A plane cuts one nappe at a slant but is not parallel to a generator. Which noncircular closed conic appears?','Ellipse',['Circle','Parabola','Hyperbola']],
      ['A plane is parallel to a generator of the cone. Which conic appears?','Parabola',['Circle','Ellipse','Hyperbola']],
      ['A plane intersects both nappes of a double cone. Which conic appears?','Hyperbola',['Circle','Ellipse','Parabola']]
    ]);
    return cq({rng,conceptId,difficulty,review:'8.1 Cone slices',prompt:item[0],correct:item[1],distractors:item[2],explanation:'The angle of the cutting plane relative to the double cone determines the conic section.',steps:['Decide whether the plane meets one nappe or both.','For one nappe, compare the plane with the base/generator.'],hints:['Both nappes means hyperbola.']});
  },
  standardFormIdentify: ({rng,conceptId,difficulty}) => {
    const item=choose(rng,[
      ['x² + y² = 25','Circle',['Ellipse','Hyperbola','Parabola']],
      ['x²/25 + y²/9 = 1','Ellipse',['Circle','Hyperbola','Parabola']],
      ['x²/16 − y²/9 = 1','Hyperbola',['Ellipse','Circle','Parabola']],
      ['(x−2)² = 12(y+1)','Parabola',['Circle','Ellipse','Hyperbola']]
    ]);
    return cq({rng,conceptId,difficulty,review:'8.1 Standard forms',prompt:`Identify the conic: ${item[0]}`,correct:item[1],distractors:item[2],explanation:'The number and signs of the squared coordinate terms reveal the conic family.',steps:['Count the squared coordinate terms.','If both are squared, compare their signs and coefficients.'],hints:['One squared variable → parabola; opposite signs → hyperbola.']});
  },

  circleFeatures: ({rng,conceptId,difficulty}) => {
    const h=randomInt(rng,-5,5), k=randomInt(rng,-5,5), r=randomInt(rng,2,9);
    const correct=`Center ${coord(h,k)}, radius ${r}`;
    const ds=[`Center ${coord(-h,-k)}, radius ${r}`,`Center ${coord(h,k)}, radius ${sq(r)}`,`Center ${coord(k,h)}, radius ${r}`];
    if(new Set([correct,...ds]).size<4) return pack.circleFeatures({rng,conceptId,difficulty});
    return cq({rng,conceptId,difficulty,review:'8.2 Circles',prompt:`For ${shiftedSquare('x',h)} + ${shiftedSquare('y',k)} = ${sq(r)}, identify the center and radius.`,correct,distractors:ds,explanation:'Circle standard form is (x−h)²+(y−k)²=r². The visible signs are opposite the center coordinates, and the radius is the square root of the right side.',steps:[`Read h=${h}, k=${k}.`,`r=√${sq(r)}=${r}.`],hints:['Match the equation to (x−h)²+(y−k)²=r².']});
  },
  circleEquation: ({rng,conceptId,difficulty}) => {
    const h=randomInt(rng,-4,4), k=randomInt(rng,-4,4), r=randomInt(rng,2,7);
    const correct=`${shiftedSquare('x',h)} + ${shiftedSquare('y',k)} = ${sq(r)}`;
    const ds=[`${shiftedSquare('x',-h)} + ${shiftedSquare('y',-k)} = ${sq(r)}`,`${shiftedSquare('x',h)} + ${shiftedSquare('y',k)} = ${r}`,`${shiftedSquare('x',k)} + ${shiftedSquare('y',h)} = ${sq(r)}`];
    if(new Set([correct,...ds]).size<4) return pack.circleEquation({rng,conceptId,difficulty});
    return cq({rng,conceptId,difficulty,review:'8.2 Circle equations',prompt:`Which equation is the circle with center ${coord(h,k)} and radius ${r}?`,correct,distractors:ds,explanation:'Insert the center into (x−h)²+(y−k)²=r² and square the radius.',steps:[`Center gives ${shiftedSquare('x',h)} and ${shiftedSquare('y',k)}.`,`Radius ${r} gives r²=${sq(r)}.`],hints:['The signs inside parentheses are opposite the center coordinates.']});
  },
  circleFromDiameter: ({rng,conceptId,difficulty}) => {
    const h=randomInt(rng,-4,4),k=randomInt(rng,-4,4),dx=choose(rng,[2,3,4,5]);
    const x1=h-dx,x2=h+dx;
    return nq({prompt:`A circle has diameter endpoints ${coord(x1,k)} and ${coord(x2,k)}. What is its radius?`,value:dx,tolerance:1e-9,conceptId,difficulty,review:'8.2 Diameter and radius',explanation:'The center is the midpoint of the diameter and the radius is half the diameter length.',steps:[`Diameter length = ${x2}−(${x1}) = ${2*dx}.`,`Radius = ${2*dx}/2 = ${dx}.`],hints:['Find the distance between the endpoints, then halve it.']});
  },
  circlePointCheck: ({rng,conceptId,difficulty}) => {
    const r=choose(rng,[3,4,5]), pts={3:[[3,0],[0,3]],4:[[4,0],[0,-4]],5:[[3,4],[-3,4]]}[r];
    const yes=choose(rng,pts), no=[r,r]; const chooseYes=rng()<0.5; const p=chooseYes?yes:no;
    return cq({rng,conceptId,difficulty,review:'8.2 Point testing',prompt:`Does the point ${coord(p[0],p[1])} lie on x²+y²=${r*r}?`,correct:chooseYes?'Yes':'No',distractors:chooseYes?['No','Only if x and y are swapped','Cannot tell']:['Yes','Only if the radius is doubled','Cannot tell'],explanation:'Substitute the coordinates into x²+y² and compare the result with r².',steps:[`${p[0]}²+${p[1]}²=${p[0]*p[0]+p[1]*p[1]}.`,`Compare with ${r*r}.`],hints:['A point lies on the circle only when its coordinates satisfy the equation exactly.']});
  },

  parabolaFocus: ({rng,conceptId,difficulty}) => {
    const h=randomInt(rng,-4,4),k=randomInt(rng,-4,4),p=choose(rng,[-3,-2,-1,1,2,3]);
    const correct=coord(h,k+p), ds=[coord(h+p,k),coord(h,k+4*p),coord(-h,-k-p)];
    if(new Set([correct,...ds]).size<4) return pack.parabolaFocus({rng,conceptId,difficulty});
    return cq({rng,conceptId,difficulty,review:'8.3 Parabola focus',prompt:`For ${shiftedSquare('x',h)} = ${4*p}(${term('y',k)}), where is the focus?`,correct,distractors:ds,explanation:'For (x−h)²=4p(y−k), the vertex is (h,k) and the focus is p units vertically from the vertex.',steps:[`4p=${4*p}, so p=${p}.`,`Vertex=${coord(h,k)}.`,`Focus=${coord(h,k+p)}.`],hints:['The coefficient is 4p, not p.']});
  },
  parabolaDirectrix: ({rng,conceptId,difficulty}) => {
    const h=randomInt(rng,-4,4),k=randomInt(rng,-4,4),p=choose(rng,[-3,-2,-1,1,2,3]);
    return cq({rng,conceptId,difficulty,review:'8.3 Parabola directrix',prompt:`For ${shiftedSquare('x',h)} = ${4*p}(${term('y',k)}), what is the directrix?`,correct:`y = ${k-p}`,distractors:[`y = ${k+p}`,`x = ${h-p}`,`x = ${h+p}`],explanation:'A vertical parabola has vertex (h,k), focus (h,k+p), and directrix y=k−p.',steps:[`p=${p}.`,`Directrix y=k−p=${k}−(${p})=${k-p}.`],hints:['The directrix lies the same distance from the vertex as the focus, but on the opposite side.']});
  },
  parabolaOrientation: ({rng,conceptId,difficulty}) => {
    const item=choose(rng,[['(x−2)² = 12(y+1)','up',['down','left','right']],['(x+3)² = −8(y−4)','down',['up','left','right']],['(y−1)² = 16(x+2)','right',['left','up','down']],['(y+5)² = −4(x−1)','left',['right','up','down']]]);
    return cq({rng,conceptId,difficulty,review:'8.3 Parabola orientation',prompt:`Which way does ${item[0]} open?`,correct:item[1],distractors:item[2],explanation:'The squared variable tells the axis direction; the sign of 4p tells which way the parabola opens.',steps:['If x is squared, the parabola is vertical; if y is squared, it is horizontal.','Use the sign of 4p for the opening direction.'],hints:['Positive p points up/right; negative p points down/left.']});
  },
  parabolaFromFocus: ({rng,conceptId,difficulty}) => {
    const h=randomInt(rng,-3,3),k=randomInt(rng,-3,3),p=choose(rng,[1,2,3]);
    const focus=coord(h,k+p); const correct=`${shiftedSquare('x',h)} = ${4*p}(${term('y',k)})`;
    const ds=[`${shiftedSquare('x',h)} = ${p}(${term('y',k)})`,`${shiftedSquare('y',k)} = ${4*p}(${term('x',h)})`,`${shiftedSquare('x',h)} = ${-4*p}(${term('y',k)})`];
    return cq({rng,conceptId,difficulty,review:'8.3 Writing parabolas',prompt:`A parabola has vertex ${coord(h,k)} and focus ${focus}. Which equation matches it?`,correct,distractors:ds,explanation:'The focus is p units above the vertex, so the parabola is vertical and opens upward. Use (x−h)²=4p(y−k).',steps:[`p=${p}.`,`Vertical form uses x squared.`,`4p=${4*p}.`],hints:['Measure the signed distance from vertex to focus.']});
  },

  ellipseAxis: ({rng,conceptId,difficulty}) => {
    const a=choose(rng,[4,5,6]),b=choose(rng,[2,3]),horizontal=rng()<0.5;
    const eq=horizontal?`x²/${a*a} + y²/${b*b} = 1`:`x²/${b*b} + y²/${a*a} = 1`;
    return cq({rng,conceptId,difficulty,review:'8.4 Ellipse axes',prompt:`What is the major-axis direction of ${eq}?`,correct:horizontal?'horizontal':'vertical',distractors:horizontal?['vertical','diagonal','no major axis']:['horizontal','diagonal','no major axis'],explanation:'For an ellipse, the larger denominator belongs to the major-axis variable.',steps:[`Compare ${a*a} and ${b*b}.`,`The larger denominator is under ${horizontal?'x²':'y²'}.`],hints:['The major axis follows the larger denominator.']});
  },
  ellipseFoci: ({rng,conceptId,difficulty}) => {
    const h=randomInt(rng,-3,3),k=randomInt(rng,-3,3); const triples=choose(rng,[[5,4,3],[13,12,5],[10,8,6]]); const [a,b,c]=triples;
    const correct=`${coord(h-c,k)} and ${coord(h+c,k)}`;
    const ds=[`${coord(h-b,k)} and ${coord(h+b,k)}`,`${coord(h,k-c)} and ${coord(h,k+c)}`,`${coord(h-a,k)} and ${coord(h+a,k)}`];
    if(new Set([correct,...ds]).size<4) return pack.ellipseFoci({rng,conceptId,difficulty});
    return cq({rng,conceptId,difficulty,review:'8.4 Ellipse foci',prompt:`For ${shiftedSquare('x',h)}/${a*a} + ${shiftedSquare('y',k)}/${b*b} = 1, where are the foci?`,correct,distractors:ds,explanation:'For a horizontal ellipse, c²=a²−b² and the foci are (h±c,k).',steps:[`c²=${a*a}−${b*b}=${c*c}.`,`c=${c}.`,`Foci=${correct}.`],hints:['For an ellipse, subtract: c²=a²−b².']});
  },
  ellipseVertices: ({rng,conceptId,difficulty}) => {
    const h=randomInt(rng,-3,3),k=randomInt(rng,-3,3),a=choose(rng,[4,5,6]),b=choose(rng,[2,3]);
    const correct=`${coord(h-a,k)} and ${coord(h+a,k)}`;
    const ds=[`${coord(h-b,k)} and ${coord(h+b,k)}`,`${coord(h,k-a)} and ${coord(h,k+a)}`,`${coord(h-a,k-b)} and ${coord(h+a,k+b)}`];
    return cq({rng,conceptId,difficulty,review:'8.4 Ellipse vertices',prompt:`For ${shiftedSquare('x',h)}/${a*a} + ${shiftedSquare('y',k)}/${b*b} = 1, what are the major vertices?`,correct,distractors:ds,explanation:'The larger denominator is under x², so the major axis is horizontal with vertices a units left/right of the center.',steps:[`Center=${coord(h,k)}.`,`a=√${a*a}=${a}.`,`Move ${a} units horizontally.`],hints:['Vertices lie on the major axis, not at the foci.']});
  },
  ellipseRelation: ({rng,conceptId,difficulty}) => cq({rng,conceptId,difficulty,review:'8.4 Ellipse focal relation',prompt:'Which focal relationship is correct for an ellipse with semi-major axis a, semi-minor axis b, and focus distance c?',correct:'c² = a² − b²',distractors:['c² = a² + b²','a² = b² − c²','c = a + b'],explanation:'In an ellipse the foci lie inside the vertices, so c<a and c²=a²−b².',steps:['Start with the larger semi-axis a.','Subtract b² to obtain c².'],hints:['Ellipse uses subtraction; hyperbola uses addition.']}),

  hyperbolaOrientation: ({rng,conceptId,difficulty}) => {
    const horizontal=rng()<0.5; const a=choose(rng,[2,3,4]),b=choose(rng,[2,3,5]);
    const eq=horizontal?`x²/${a*a} − y²/${b*b} = 1`:`y²/${a*a} − x²/${b*b} = 1`;
    return cq({rng,conceptId,difficulty,review:'8.5 Hyperbola orientation',prompt:`Which way does ${eq} open?`,correct:horizontal?'left and right':'up and down',distractors:horizontal?['up and down','in all four directions','it is an ellipse']:['left and right','in all four directions','it is an ellipse'],explanation:'A hyperbola opens along the variable whose squared term is positive.',steps:[`Identify the positive squared term: ${horizontal?'x²':'y²'}.`,`That variable determines the transverse-axis direction.`],hints:['Ignore which denominator is larger; look at the positive term.']});
  },
  hyperbolaAsymptote: ({rng,conceptId,difficulty}) => {
    const a=choose(rng,[2,3,4]),b=choose(rng,[2,3,6]); const h=randomInt(rng,-2,2),k=randomInt(rng,-2,2);
    const correct=`y − ${k} = ±${b}/${a}(x − ${h})`;
    const ds=[`y − ${k} = ±${a}/${b}(x − ${h})`,`y − ${h} = ±${b}/${a}(x − ${k})`,`y = ±${b}/${a}x`];
    if(new Set([correct,...ds]).size<4) return pack.hyperbolaAsymptote({rng,conceptId,difficulty});
    return cq({rng,conceptId,difficulty,review:'8.5 Hyperbola asymptotes',prompt:`For ${shiftedSquare('x',h)}/${a*a} − ${shiftedSquare('y',k)}/${b*b}=1, which asymptotes are correct?`,correct,distractors:ds,explanation:'For a horizontal hyperbola, the asymptotes through (h,k) have slopes ±b/a.',steps:[`Center=${coord(h,k)}.`,`Slope magnitude=b/a=${b}/${a}.`,`Use point-slope form through the center.`],hints:['Horizontal hyperbola: y−k=±(b/a)(x−h).']});
  },
  hyperbolaFoci: ({rng,conceptId,difficulty}) => {
    const a=3,b=4,c=5,h=randomInt(rng,-3,3),k=randomInt(rng,-3,3);
    const correct=`${coord(h-c,k)} and ${coord(h+c,k)}`;
    const ds=[`${coord(h-a,k)} and ${coord(h+a,k)}`,`${coord(h-b,k)} and ${coord(h+b,k)}`,`${coord(h,k-c)} and ${coord(h,k+c)}`];
    return cq({rng,conceptId,difficulty,review:'8.5 Hyperbola foci',prompt:`For ${shiftedSquare('x',h)}/9 − ${shiftedSquare('y',k)}/16 = 1, where are the foci?`,correct,distractors:ds,explanation:'For a hyperbola, c²=a²+b². Here c²=9+16=25, so c=5. The positive x² term makes the transverse axis horizontal.',steps:['c²=9+16=25.','c=5.','Move 5 units left/right from the center.'],hints:['Hyperbola uses c²=a²+b².']});
  },
  hyperbolaVertices: ({rng,conceptId,difficulty}) => {
    const h=randomInt(rng,-3,3),k=randomInt(rng,-3,3),a=choose(rng,[2,3,4]);
    const correct=`${coord(h-a,k)} and ${coord(h+a,k)}`;
    const ds=[`${coord(h,k-a)} and ${coord(h,k+a)}`,`${coord(h-2*a,k)} and ${coord(h+2*a,k)}`,`${coord(-h-a,-k)} and ${coord(-h+a,-k)}`];
    if(new Set([correct,...ds]).size<4) return pack.hyperbolaVertices({rng,conceptId,difficulty});
    return cq({rng,conceptId,difficulty,review:'8.5 Hyperbola vertices',prompt:`A horizontal hyperbola has center ${coord(h,k)} and a=${a}. What are its vertices?`,correct,distractors:ds,explanation:'Horizontal hyperbola vertices lie a units left and right of the center.',steps:[`Center=${coord(h,k)}.`,`Move ±${a} in x.`],hints:['Vertices use a, not c.']});
  },

  generalClassify: ({rng,conceptId,difficulty}) => {
    const item=choose(rng,[
      ['4x² + 4y² − 16x + 8y − 44 = 0','Circle',['Ellipse','Hyperbola','Parabola']],
      ['9x² + 4y² − 18x + 16y − 11 = 0','Ellipse',['Circle','Hyperbola','Parabola']],
      ['9x² − 4y² + 18x + 8y − 31 = 0','Hyperbola',['Ellipse','Circle','Parabola']],
      ['x² − 6x − 8y + 1 = 0','Parabola',['Circle','Ellipse','Hyperbola']]
    ]);
    return cq({rng,conceptId,difficulty,review:'8.6 General equations',prompt:`Classify ${item[0]}.`,correct:item[1],distractors:item[2],explanation:'When there is no xy term: one squared variable suggests a parabola; opposite squared-term signs suggest a hyperbola; same-sign squared terms suggest a circle/ellipse, with equal coefficients indicating a circle.',steps:['Inspect the x² and y² coefficients.','Compare signs and equality of coefficients.'],hints:['Do not complete the square just to identify the family.']});
  },
  coefficientPattern: ({rng,conceptId,difficulty}) => {
    const item=choose(rng,[
      ['Both x² and y² appear with equal nonzero coefficients and the same sign.','circle',['ellipse only','hyperbola','parabola']],
      ['Both x² and y² appear with unequal coefficients and the same sign.','ellipse',['circle','hyperbola','parabola']],
      ['x² and y² have opposite signs.','hyperbola',['circle','ellipse','parabola']],
      ['Only one coordinate variable is squared.','parabola',['circle','ellipse','hyperbola']]
    ]);
    return cq({rng,conceptId,difficulty,review:'8.6 Coefficient patterns',prompt:`In a nonrotated general conic equation, ${item[0]} Which family does that pattern indicate?`,correct:item[1],distractors:item[2],explanation:'The squared-term coefficient pattern provides a fast classification test before standard-form conversion.',steps:['Count squared variables.','Compare coefficient signs and equality.'],hints:['Opposite signs = hyperbola; one squared variable = parabola.']});
  },
  completeSquareConstant: ({rng,conceptId,difficulty}) => {
    const n=choose(rng,[2,3,4,5,6]); const coeff=choose(rng,[1,-1])*2*n; const add=n*n;
    return nq({prompt:`To complete the square for x² ${coeff>=0?'+':'−'} ${Math.abs(coeff)}x, what constant should be added?`,value:add,tolerance:1e-9,conceptId,difficulty,review:'8.6 Completing the square',explanation:'Take half the linear coefficient and square it.',steps:[`${coeff}/2=${coeff/2}.`,`(${coeff/2})²=${add}.`],hints:['Half, then square.']});
  },
  standardizeCircle: ({rng,conceptId,difficulty}) => {
    const h=randomInt(rng,-4,4),k=randomInt(rng,-4,4),r=choose(rng,[3,4,5]);
    const D=-2*h,E=-2*k,F=h*h+k*k-r*r;
    const correct=`${shiftedSquare('x',h)} + ${shiftedSquare('y',k)} = ${r*r}`;
    const ds=[`${shiftedSquare('x',-h)} + ${shiftedSquare('y',-k)} = ${r*r}`,`${shiftedSquare('x',h)} + ${shiftedSquare('y',k)} = ${r}`,`${shiftedSquare('x',k)} + ${shiftedSquare('y',h)} = ${r*r}`];
    if(new Set([correct,...ds]).size<4) return pack.standardizeCircle({rng,conceptId,difficulty});
    const linear=(c,v)=>c===0?'':`${c>0?'+':'−'} ${Math.abs(c)}${v} `;
    return cq({rng,conceptId,difficulty,review:'8.6 General to standard form',prompt:`Rewrite x² + y² ${linear(D,'x')}${linear(E,'y')}${F>=0?'+':'−'} ${Math.abs(F)} = 0 in standard circle form.`,correct,distractors:ds,explanation:'Group x/y terms, move the constant, and complete the square in both variables. The resulting binomial signs are opposite the center coordinates.',steps:[`Complete the square for x²${D>=0?'+':'−'}${Math.abs(D)}x and y²${E>=0?'+':'−'}${Math.abs(E)}y.`,`The center is ${coord(h,k)} and r=${r}.`],hints:['Half each linear coefficient, square, and add to both sides.']});
  },

  translatedCenter: ({rng,conceptId,difficulty}) => {
    const h=randomInt(rng,-5,5),k=randomInt(rng,-5,5), kind=choose(rng,['circle','ellipse','hyperbola']);
    const correct=coord(h,k), ds=[coord(-h,-k),coord(k,h),coord(-k,-h)];
    if(new Set([correct,...ds]).size<4) return pack.translatedCenter({rng,conceptId,difficulty});
    const eq=kind==='circle'?`${shiftedSquare('x',h)} + ${shiftedSquare('y',k)} = 16`:kind==='ellipse'?`${shiftedSquare('x',h)}/25 + ${shiftedSquare('y',k)}/9 = 1`:`${shiftedSquare('x',h)}/16 − ${shiftedSquare('y',k)}/9 = 1`;
    return cq({rng,conceptId,difficulty,review:'8.7 Translations',prompt:`What is the center of ${eq}?`,correct,distractors:ds,explanation:'In translated standard forms, (x−h) and (y−k) reveal the center (h,k).',steps:['Read each coordinate with the sign reversed from the binomial.'],hints:['x+3 means h=−3.']});
  },
  translatedParabolaVertex: ({rng,conceptId,difficulty}) => {
    const h=randomInt(rng,-4,4),k=randomInt(rng,-4,4),p=choose(rng,[-2,-1,1,2]);
    const correct=coord(h,k),ds=[coord(-h,-k),coord(h,k+p),coord(h+p,k)];
    if(new Set([correct,...ds]).size<4) return pack.translatedParabolaVertex({rng,conceptId,difficulty});
    return cq({rng,conceptId,difficulty,review:'8.7 Parabola translation',prompt:`What is the vertex of ${shiftedSquare('x',h)}=${4*p}(${term('y',k)})?`,correct,distractors:ds,explanation:'In (x−h)²=4p(y−k), the vertex is exactly (h,k).',steps:['Read h from the x binomial.','Read k from the y binomial.'],hints:['Do not move p when locating the vertex.']});
  },
  graphFeatureMatch: ({rng,conceptId,difficulty}) => {
    const item=choose(rng,[
      ['A graph has one vertex, one focus, and one directrix.','parabola',['circle','ellipse','hyperbola']],
      ['A graph is closed with two unequal axes and two interior foci.','ellipse',['circle','parabola','hyperbola']],
      ['A graph has two disconnected branches approaching two asymptotes.','hyperbola',['ellipse','circle','parabola']],
      ['A graph is closed and every point is the same distance from one center.','circle',['ellipse','hyperbola','parabola']]
    ]);
    return cq({rng,conceptId,difficulty,review:'8.7 Graph features',prompt:item[0],correct:item[1],distractors:item[2],explanation:'Graph features should agree with the geometric definition and standard-form attributes of the conic.',steps:['Identify the defining geometric feature.','Match it to the conic family.'],hints:['Asymptotes strongly indicate a hyperbola.']});
  },

  circleApplication: ({rng,conceptId,difficulty}) => {
    const r=choose(rng,[4,5,6,8,10]); const d=choose(rng,[1,2,3]); const x=Math.sqrt(r*r-d*d);
    return nq({prompt:`A circular fountain has radius ${r} m. A straight walkway lies ${d} m from the center. Half the chord length cut by the walkway is √(r²−d²). Find that half-chord to the nearest hundredth.`,value:round(x,2),tolerance:0.02,conceptId,difficulty,review:'8.8 Circle applications',explanation:'A radius to the midpoint of a chord is perpendicular to the chord, creating a right triangle with hypotenuse r and one leg d.',steps:[`x²+${d}²=${r}².`,`x=√(${r*r}-${d*d})≈${round(x,2)}.`],hints:['Use the radius, center-to-chord distance, and half-chord as a right triangle.']});
  },
  parabolaReflector: ({rng,conceptId,difficulty}) => {
    const p=choose(rng,[1,1.5,2,2.5,3]); const coeff=4*p;
    return nq({prompt:`A parabolic reflector has cross-section x²=${coeff}y. How far is its focus from the vertex?`,value:p,tolerance:1e-9,conceptId,difficulty,review:'8.8 Parabola applications',explanation:'For x²=4py, the focus is p units from the vertex. Reflectors place receivers near this focus because incoming parallel rays reflect toward it.',steps:[`4p=${coeff}.`,`p=${p}.`],hints:['Divide the y coefficient by 4.']});
  },
  dishDepth: ({rng,conceptId,difficulty}) => {
    const p=choose(rng,[1,2,3,4]); const x=choose(rng,[2,4,6]); const y=x*x/(4*p);
    return nq({prompt:`A parabolic dish is modeled by x²=${4*p}y. At a horizontal distance x=${x} from the axis, what is the depth y?`,value:round(y,3),tolerance:0.002,conceptId,difficulty,review:'8.8 Parabolic models',explanation:'Substitute the horizontal coordinate into x²=4py and solve for y.',steps:[`${x}²=${4*p}y.`,`y=${x*x}/${4*p}=${round(y,3)}.`],hints:['Solve y=x²/(4p).']});
  },
  applicationChoice: ({rng,conceptId,difficulty}) => {
    const item=choose(rng,[
      ['A satellite dish sends parallel incoming signals toward a receiver at one special point. Which conic models the cross-section?','parabola',['circle','ellipse','hyperbola']],
      ['A circular exclusion zone is defined by all points exactly 8 km from a station. Which conic?','circle',['parabola','ellipse','hyperbola']],
      ['Which property explains why a parabolic reflector is useful?','Rays parallel to the axis reflect through the focus',['All points are equally distant from two foci','Its asymptotes guide rays to the center','Its radius is constant']]
    ]);
    return cq({rng,conceptId,difficulty,review:'8.8 Conic applications',prompt:item[0],correct:item[1],distractors:item[2],explanation:'Applications use the defining geometry of the conic rather than only its algebraic appearance.',steps:['Identify the physical condition.','Match it with a geometric conic property.'],hints:['Reflectors strongly point to the focus property of a parabola.']});
  }
};

registerGeneratorPack('u8', pack);
export default pack;
