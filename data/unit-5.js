import '../js/generators-unit5.js';
import { authoredLesson, authoredUnit } from './lesson-schema.js';

const unitTeks = ['P.2F','P.2G','P.2H','P.2I','P.2O','P.2P','P.4A','P.4B','P.4C','P.4D','P.4E','P.4F','P.5F'];

const lessons = [
    authoredLesson({
        id:'5.1', title:'Angles, Degrees & Radians', summary:'Measure rotation in degrees and radians, convert fluently between the two systems, identify coterminal angles, and use reference angles to connect any rotation to a familiar acute angle.', estimatedMinutes:55,
        teks:['P.4A','P.4B','P.2H'],
        objectives:['Convert common and noncommon angle measures between degrees and radians.','Generate and recognize coterminal angles.','Find reference angles and use them to organize later trigonometric work.'],
        prerequisites:['Basic fraction simplification.','Understanding that one complete revolution is 360°.','Coordinate-plane quadrants.'],
        keyIdeas:['One full revolution is 360°=2π radians.','Radians measure angle by comparing intercepted arc length to radius.','Coterminal angles differ by whole revolutions.','A reference angle is the positive acute angle between the terminal side and the x-axis.'],
        formulas:['180° = π radians','degrees × π/180 = radians','radians × 180/π = degrees','coterminal angles: θ + 360°k or θ + 2πk'],
        sections:[
            {title:'Why radians matter',paragraphs:['Degrees are convenient for describing turns, but radians are built directly from circle geometry. An angle of 1 radian intercepts an arc whose length equals the circle radius. Because that definition uses the radius itself, formulas for arc length, angular motion, and trigonometric graphs become much cleaner in radians.'],bullets:['A half-turn is π radians.','A quarter-turn is π/2 radians.','A full turn is 2π radians.']},
            {title:'Convert by multiplying by one',paragraphs:['Degree-radian conversion is not a mysterious new formula. Since 180° and π radians describe the same angle, π radians/180° and 180°/π radians are both conversion factors equal to 1. Choose the factor that cancels the unit you do not want.'],bullets:['Degrees → radians: multiply by π/180.','Radians → degrees: multiply by 180/π.','Reduce fractions before deciding you are finished.']},
            {title:'Coterminal and reference angles do different jobs',paragraphs:['Coterminal angles describe the same terminal side after different numbers of complete turns. A reference angle ignores the number of turns and asks only how far the terminal side is from the nearest x-axis. Reference angles let one set of special-angle values work in every quadrant.'],bullets:['Coterminal means same terminal side.','Reference angles are always nonnegative and no larger than 90°.','Quadrant signs are applied after the reference angle gives the magnitude.']}
        ],
        workedExamples:[
            {title:'Convert degrees to radians',problem:'Convert 225° to radians.',steps:['Multiply by π/180: 225π/180.','Divide numerator and denominator by 45.','225π/180=5π/4.'],answer:'5π/4'},
            {title:'Find a reference angle',problem:'Find the reference angle for 310°.',steps:['310° lies in Quadrant IV.','In Quadrant IV, subtract the angle from 360°.','360°−310°=50°.'],answer:'50°'}
        ],
        commonMistakes:[{mistake:'Multiplying degrees by 180/π.',fix:'Check units before calculating. To remove degrees and obtain radians, multiply by π/180.'},{mistake:'Calling a coterminal angle a reference angle.',fix:'Coterminal angles share a terminal side and may be large or negative. A reference angle is the small positive angle to the x-axis.'}],
        alternateExplanation:'Picture an angle as a turn rather than a number. Degrees count the turn in 360 equal pieces. Radians count how many radius-length arcs fit along the circle. Converting only changes the measuring ruler; the physical turn stays exactly the same.',
        application:'Radians are the natural language of rotating machinery, waves, circular motion, and later calculus. Converting accurately now prevents unit mistakes in arc length, angular speed, trig graphs, and sinusoidal models.',
        teacherTip:'Before using a conversion formula, say the desired ending unit aloud. That one habit catches most degree/radian reversals.',
        generators:{easy:['u5:degreeRadian','u5:coterminal'],standard:['u5:degreeRadian','u5:coterminal','u5:referenceAngle'],challenge:['u5:referenceAngle','u5:degreeRadian']}
    }),
    authoredLesson({
        id:'5.2', title:'Arc Length & Angular/Linear Speed', summary:'Use radians to connect central angle, radius, distance traveled along a circle, angular speed, and linear speed in circular-motion situations.', estimatedMinutes:55,
        teks:['P.4A','P.4B','P.2O'],
        objectives:['Use s=rθ when θ is measured in radians.','Distinguish angular speed from linear speed.','Use v=rω to connect rotational and tangential motion.'],
        prerequisites:['Radian measure from Lesson 5.1.','Distance = rate × time reasoning.','Unit conversion.'],
        keyIdeas:['Arc length is proportional to both radius and radian angle.','All points on a rigid rotating object share angular speed, but points farther from the center have greater linear speed.','The formulas s=rθ and v=rω are parallel relationships.'],
        formulas:['s=rθ','ω=θ/t','v=s/t','v=rω'],
        sections:[
            {title:'Radians make arc length direct',paragraphs:['The definition of a radian is built from arc length, so when θ is in radians the intercepted arc is simply radius times angle. If θ is in degrees, convert first.'],bullets:['Check the angle unit before using s=rθ.','Arc length has distance units.','A larger radius produces a longer arc for the same angle.']},
            {title:'Angular speed and linear speed are different',paragraphs:['Angular speed tells how rapidly the angle changes, usually in radians per second. Linear speed tells how quickly a point moves along the circular path. Two points on the same rigid wheel can have the same angular speed but different linear speeds because they travel circles of different radii.'],bullets:['ω measures rotation rate.','v measures distance per time.','v=rω explains why the outer edge moves farther each second.']},
            {title:'Use units as an error detector',paragraphs:['Units can tell you whether a setup makes sense. In v=rω, meters multiplied by radians per second behaves like meters per second because radians are dimensionless ratios. If your final arc length still has degree symbols, the setup is not finished.'],bullets:['Convert before substituting.','Keep radius and desired distance units consistent.','Round only after the main calculation unless instructed otherwise.']}
        ],
        workedExamples:[
            {title:'Find arc length',problem:'A circle has radius 8 cm and central angle 3π/4. Find the arc length.',steps:['The angle is already in radians.','Use s=rθ=8(3π/4).','Simplify 8·3π/4=6π.'],answer:'6π cm'},
            {title:'Connect angular and linear speed',problem:'A point 0.6 m from an axle rotates at 4 rad/s. Find its linear speed.',steps:['Use v=rω.','Substitute r=0.6 and ω=4.','v=0.6(4)=2.4.'],answer:'2.4 m/s'}
        ],
        commonMistakes:[{mistake:'Using s=rθ with θ still in degrees.',fix:'The formula assumes radians. Convert degree measures first.'},{mistake:'Assuming every point on a wheel has the same linear speed.',fix:'Points share angular speed. Linear speed is rω, so it increases with radius.'}],
        alternateExplanation:'Imagine two ants glued to the same spinning record, one near the center and one near the edge. They complete each revolution together, so their angular speeds match. The outer ant travels a larger circle in the same time, so its linear speed must be greater.',
        application:'Arc length and rotational speed appear in tires, pulleys, gears, turbines, amusement rides, machining, and any system that converts rotation into travel distance.',
        teacherTip:'Have the learner label every given number with a unit before choosing a formula. Degree/radian and angular/linear confusion becomes much easier to spot.',
        generators:{easy:['u5:arcLength','u5:linearSpeed'],standard:['u5:arcLength','u5:angularSpeed','u5:linearSpeed'],challenge:['u5:angularSpeed','u5:linearSpeed']}
    }),
    authoredLesson({
        id:'5.3', title:'The Unit Circle', summary:'Use the unit circle as a coordinate model for exact trigonometric values, quadrant signs, standard angles, and the repeating structure behind every trigonometric function.', estimatedMinutes:65,
        teks:['P.4C','P.4D','P.4F','P.2P'],
        objectives:['Interpret the unit-circle point as (cosθ,sinθ).','Recall or derive exact coordinates for standard angles.','Determine trig signs by quadrant and identify when tangent is undefined.'],
        prerequisites:['Reference angles.','45-45-90 and 30-60-90 triangle ratios.','Coordinate quadrants.'],
        keyIdeas:['A unit circle has radius 1.','The point at angle θ is (cosθ,sinθ).','tanθ=sinθ/cosθ whenever cosθ≠0.','Reference-angle magnitudes repeat while signs change by quadrant.'],
        formulas:['x²+y²=1','(x,y)=(cosθ,sinθ)','tanθ=sinθ/cosθ'],
        sections:[
            {title:'Turn triangles into coordinates',paragraphs:['The familiar special right triangles can be placed inside a radius-1 circle. Dividing their side ratios by the hypotenuse produces the exact x- and y-coordinates for 30°, 45°, and 60°. Those three magnitude patterns generate nearly every standard-angle coordinate.'],bullets:['45° uses √2/2 and √2/2.','30°/60° swap 1/2 and √3/2.','Axis angles use coordinates containing 0 and ±1.']},
            {title:'Coordinates are trig values',paragraphs:['The unit circle unifies geometry and functions. The horizontal coordinate is cosine, the vertical coordinate is sine, and their quotient is tangent. This means you do not need six unrelated memorization charts; most values can be reconstructed from one coordinate.'],bullets:['cosθ=x.','sinθ=y.','tanθ=y/x when x≠0.']},
            {title:'Quadrants control signs',paragraphs:['Reference angles determine magnitudes. Quadrants determine signs because x and y have predictable signs in each quadrant. Tangent is positive when sine and cosine have the same sign and negative when they differ.'],bullets:['QI: sin, cos, tan positive.','QII: only sine positive.','QIII: only tangent positive.','QIV: only cosine positive.']}
        ],
        workedExamples:[
            {title:'Evaluate from a coordinate',problem:'Find sin(5π/6), cos(5π/6), and tan(5π/6).',steps:['5π/6=150°, reference angle 30°, Quadrant II.','The 30° coordinate magnitudes are (√3/2,1/2).','Quadrant II makes x negative and y positive: (−√3/2,1/2).','Therefore sin=1/2, cos=−√3/2, tan=−√3/3.'],answer:'sin=1/2, cos=−√3/2, tan=−√3/3'},
            {title:'Recognize an undefined tangent',problem:'Find tan(3π/2).',steps:['At 3π/2, the coordinate is (0,−1).','tanθ=y/x.','Division by x=0 is undefined.'],answer:'undefined'}
        ],
        commonMistakes:[{mistake:'Swapping sine and cosine coordinates.',fix:'The ordered pair is always (cosθ,sinθ): x first, y second.'},{mistake:'Using the reference-angle value without applying a quadrant sign.',fix:'The reference angle gives magnitude only. Apply the actual quadrant signs before reporting the trig value.'}],
        alternateExplanation:'Imagine the terminal point as a tiny coordinate readout attached to a rotating radius. Its x-display is cosine and its y-display is sine. Tangent compares the y-display to the x-display. The entire unit circle is just that readout at important rotations.',
        application:'The unit circle underlies periodic motion, waves, rotations, signal processing, navigation, and every graph studied later in this unit.',
        teacherTip:'If memorization stalls, reconstruct one reference triangle and apply quadrant signs. Derivation is more durable than trying to store dozens of isolated values.',
        generators:{easy:['u5:unitCircleValue','u5:quadrantSign'],standard:['u5:unitCircleValue','u5:unitCircleCoordinate','u5:quadrantSign'],challenge:['u5:unitCircleValue','u5:unitCircleCoordinate']}
    }),
    authoredLesson({
        id:'5.4', title:'Sine & Cosine', summary:'Connect sine and cosine across right triangles, the unit circle, and function notation so the same ideas work for acute, obtuse, negative, and multi-revolution angles.', estimatedMinutes:55,
        teks:['P.4C','P.4D','P.2F','P.2G'],
        objectives:['Use sine and cosine in right triangles.','Explain sine and cosine as unit-circle coordinates.','Move between geometric and functional interpretations of sinθ and cosθ.'],
        prerequisites:['Unit-circle coordinates.','Right-triangle side labels.','Function notation.'],
        keyIdeas:['In a right triangle, sin=opposite/hypotenuse and cos=adjacent/hypotenuse.','On the unit circle, sine is y and cosine is x.','The unit-circle definition extends sine and cosine beyond acute angles.'],
        formulas:['sinθ=opposite/hypotenuse','cosθ=adjacent/hypotenuse','unit circle: (cosθ,sinθ)'],
        sections:[
            {title:'Right-triangle ratios are the starting point',paragraphs:['For acute angles, sine and cosine describe side ratios in similar right triangles. Because all right triangles with the same acute angle are similar, the ratios remain constant even when the triangle is scaled.'],bullets:['Label sides relative to the chosen angle.','The hypotenuse is always opposite the right angle.','Opposite and adjacent can switch when the reference angle changes.']},
            {title:'The unit circle extends the definition',paragraphs:['Right triangles alone cannot directly describe angles such as 150° or −45°. The unit circle extends the same ratios by using a radius of 1, so horizontal and vertical coordinates become cosine and sine for any real angle.'],bullets:['Radius=1 removes the hypotenuse denominator.','Coordinates naturally carry quadrant signs.','Coterminal angles have the same sine and cosine values.']},
            {title:'Think of sine and cosine as functions',paragraphs:['Every angle input produces an output. As the angle rotates continuously, cosine records horizontal position and sine records vertical position. That function viewpoint is what creates the waves in Lessons 5.7–5.8.'],bullets:['Inputs can be degrees or radians, but graphs typically use radians.','Outputs always lie from −1 to 1 for the parent functions.','The values repeat after a full revolution.']}
        ],
        workedExamples:[
            {title:'Use a right triangle',problem:'A right triangle has opposite side 8, adjacent side 15, and hypotenuse 17 relative to θ. Find sinθ and cosθ.',steps:['sinθ=opposite/hypotenuse=8/17.','cosθ=adjacent/hypotenuse=15/17.','Both are positive because θ is acute.'],answer:'sinθ=8/17, cosθ=15/17'},
            {title:'Use a unit-circle angle',problem:'Evaluate sin(225°) and cos(225°).',steps:['Reference angle=45°.','225° is in Quadrant III, so both coordinates are negative.','The 45° magnitudes are √2/2.'],answer:'sin=−√2/2, cos=−√2/2'}
        ],
        commonMistakes:[{mistake:'Using opposite/adjacent for cosine.',fix:'Cosine is adjacent/hypotenuse. Tangent is opposite/adjacent.'},{mistake:'Thinking sine and cosine are only defined for acute angles.',fix:'The unit-circle definition extends both functions to every real angle.'}],
        alternateExplanation:'Sine and cosine are two cameras watching the same rotating point. Cosine reports left-right position; sine reports up-down position. Right-triangle ratios are simply the first-quadrant version of that coordinate story.',
        application:'Horizontal and vertical components of periodic motion, rotations, circular tracking, and wave models all rely on sine and cosine.',
        teacherTip:'Ask “Which coordinate am I reading?” before every unit-circle evaluation. It prevents the most persistent sine/cosine swap.',
        generators:{easy:['u5:rightTrig','u5:sinCosRelationship'],standard:['u5:rightTrig','u5:unitCircleValue','u5:sinCosRelationship'],challenge:['u5:rightTrig','u5:unitCircleValue']}
    }),
    authoredLesson({
        id:'5.5', title:'Tangent, Cotangent, Secant & Cosecant', summary:'Build the remaining four trigonometric functions from sine and cosine using quotient and reciprocal relationships, and identify where each function becomes undefined.', estimatedMinutes:55,
        teks:['P.4C','P.4D','P.4E'],
        objectives:['Use tangent, cotangent, secant, and cosecant as ratios.','Rewrite reciprocal and quotient relationships.','Determine undefined values from zero denominators.'],
        prerequisites:['Sine and cosine.','Fraction reciprocals.','Unit-circle signs and coordinates.'],
        keyIdeas:['tan=sin/cos and cot=cos/sin.','sec=1/cos and csc=1/sin.','Undefined values come from zero denominators.','Learning the relationships is more reliable than memorizing six separate definitions.'],
        formulas:['tanθ=sinθ/cosθ','cotθ=cosθ/sinθ','secθ=1/cosθ','cscθ=1/sinθ'],
        sections:[
            {title:'Build functions instead of memorizing them separately',paragraphs:['The four additional trig functions are not new geometric objects. Tangent and cotangent are quotients of sine and cosine; secant and cosecant are reciprocals. This means any unit-circle coordinate can generate all six values.'],bullets:['sin↔csc.','cos↔sec.','tan↔cot.']},
            {title:'Undefined values are denominator problems',paragraphs:['Whenever a rewritten trig function places zero in a denominator, the function is undefined. For example, secθ is undefined where cosθ=0, while cscθ and cotθ are undefined where sinθ=0.'],bullets:['Do not report infinity as a real function value.','Check the denominator before simplifying.','These undefined inputs become graph asymptotes later.']},
            {title:'Use signs from sine and cosine',paragraphs:['Because tangent is a quotient, its sign follows whether sine and cosine have matching signs. Reciprocal functions keep the sign of the original function. The quadrant pattern therefore follows directly from the unit circle.'],bullets:['sec has the same sign as cos.','csc has the same sign as sin.','cot has the same sign as tan.']}
        ],
        workedExamples:[
            {title:'Use a reciprocal',problem:'If cosθ=−4/5, find secθ.',steps:['Secant is the reciprocal of cosine.','secθ=1/(−4/5).','Flip the ratio: secθ=−5/4.'],answer:'−5/4'},
            {title:'Determine undefined values',problem:'At θ=π/2, which of tan, cot, sec, and csc are undefined?',steps:['At π/2, sinθ=1 and cosθ=0.','tan=sin/cos is undefined.','sec=1/cos is undefined.','cot=cos/sin=0 and csc=1/sin=1 are defined.'],answer:'tan and sec are undefined'}
        ],
        commonMistakes:[{mistake:'Treating inverse notation and reciprocal notation as the same thing.',fix:'secθ=1/cosθ is a reciprocal. arccos or cos⁻¹ denotes an inverse function and returns an angle.'},{mistake:'Saying a function equals 0 when its denominator is 0.',fix:'A zero denominator makes the expression undefined, not zero.'}],
        alternateExplanation:'Start with only sine and cosine. If you can divide them and flip them, you can rebuild tangent, cotangent, secant, and cosecant whenever needed. Four “new” functions collapse into two operations.',
        application:'These relationships make later identity simplification and graph analysis manageable because complicated expressions can be rewritten into sine and cosine.',
        teacherTip:'When unsure, rewrite the function in sine/cosine form before doing anything else. The denominator usually reveals both the value and the domain issue.',
        generators:{easy:['u5:reciprocalTrig','u5:quotientTrig'],standard:['u5:reciprocalTrig','u5:quotientTrig','u5:reciprocalUndefined'],challenge:['u5:reciprocalUndefined','u5:unitCircleValue','u5:reciprocalTrig']}
    }),
    authoredLesson({
        id:'5.6', title:'Exact Values at Special Angles', summary:'Derive and evaluate exact trigonometric values at 30°, 45°, 60° and their quadrant relatives using special triangles, reference angles, radicals, and unit-circle symmetry.', estimatedMinutes:60,
        teks:['P.4F','P.2P'],
        objectives:['Derive exact values from 30-60-90 and 45-45-90 triangles.','Apply reference angles and quadrant signs.','Keep answers exact instead of replacing radicals with premature decimals.'],
        prerequisites:['Special right-triangle ratios.','Reference angles.','Unit-circle coordinates and quadrant signs.'],
        keyIdeas:['There are only two basic special-triangle patterns.','Reference angles reuse those patterns in every quadrant.','Exact values preserve radicals and fractions rather than decimal approximations.'],
        formulas:['45-45-90: 1,1,√2','30-60-90: 1,√3,2','(cosθ,sinθ) gives exact coordinate values'],
        sections:[
            {title:'Derive instead of memorizing a giant chart',paragraphs:['A 45-45-90 triangle with hypotenuse 1 has legs √2/2. A 30-60-90 triangle scaled to hypotenuse 1 has legs 1/2 and √3/2. Those three magnitudes generate the standard special-angle sine and cosine values.'],bullets:['45° gives equal x and y magnitudes.','30° has smaller sine and larger cosine.','60° swaps those magnitudes.']},
            {title:'Reference angles recycle the same magnitudes',paragraphs:['An angle such as 240° does not need a new triangle. Its reference angle is 60°, so the magnitudes match 60°. Quadrant III then makes both sine and cosine negative while tangent becomes positive.'],bullets:['Find the reference angle first.','Choose the correct special-triangle magnitude.','Apply signs last.']},
            {title:'Exact means exact',paragraphs:['When a problem asks for an exact value, √3/2 is preferable to 0.866. Exact forms preserve structure, avoid rounding error, and make identities easier later.'],bullets:['Do not round radicals unless the question requests an approximation.','Rationalize only if your course convention requires it.','Undefined values remain undefined.']}
        ],
        workedExamples:[
            {title:'Evaluate an exact cosine',problem:'Find cos(300°).',steps:['Reference angle=60°.','300° lies in Quadrant IV, where cosine is positive.','cos60°=1/2.'],answer:'1/2'},
            {title:'Evaluate an exact tangent',problem:'Find tan(135°).',steps:['Reference angle=45°.','135° lies in Quadrant II, where tangent is negative.','tan45°=1.'],answer:'−1'}
        ],
        commonMistakes:[{mistake:'Memorizing the magnitude but forgetting the quadrant sign.',fix:'Separate the task: reference-angle magnitude first, quadrant sign second.'},{mistake:'Converting every exact radical to a decimal.',fix:'Keep radicals and fractions when the question asks for an exact value.'}],
        alternateExplanation:'You do not need a 16-angle memory wall. Learn two triangle patterns, understand signs in four quadrants, and combine them. The unit circle becomes a construction system rather than a poster to memorize.',
        application:'Exact values make later identities, inverse trig work, equation solving, and graph landmarks far easier because the relationships stay symbolic and recognizable.',
        teacherTip:'If an exact value is forgotten, redraw a tiny special triangle rather than guessing from memory. A 20-second derivation is better than a memorized error.',
        generators:{easy:['u5:specialTrig','u5:specialCoordinate'],standard:['u5:specialTrig','u5:specialCoordinate','u5:unitCircleValue'],challenge:['u5:specialTrig','u5:unitCircleCoordinate']}
    }),
    authoredLesson({
        id:'5.7', title:'Graphing Sine & Cosine', summary:'Turn unit-circle motion into sine and cosine graphs and sketch one or more cycles using period, midline, intercepts, extrema, and five quarter-period landmarks.', estimatedMinutes:60,
        teks:['P.2F','P.2G','P.2H','P.2I'],
        objectives:['Explain how unit-circle coordinates create sine and cosine graphs.','Sketch parent sine and cosine using five landmark points.','Identify period, zeros, extrema, and repeating behavior.'],
        prerequisites:['Unit-circle values.','Radian measure.','Basic function graph vocabulary.'],
        keyIdeas:['Parent sine and cosine both have amplitude 1, midline y=0, and period 2π.','Sine begins on the midline moving upward; cosine begins at a maximum.','Five landmarks spaced one quarter-period apart define one clean cycle.'],
        formulas:['parent period = 2π','quarter-period spacing = T/4','sin landmarks: 0,1,0,−1,0','cos landmarks: 1,0,−1,0,1'],
        sections:[
            {title:'Unfold the unit circle',paragraphs:['As θ moves around the unit circle, sine records the vertical coordinate and cosine records the horizontal coordinate. Plotting those coordinate values against θ unfolds circular motion into a wave.'],bullets:['One revolution produces one full cycle.','2π radians is one complete parent cycle.','The same exact-angle landmarks appear on both the circle and the graph.']},
            {title:'Build a graph from five landmarks',paragraphs:['Mark the start, one-quarter, halfway, three-quarters, and end of a period. For sine the heights are midline, max, midline, min, midline. For cosine they are max, midline, min, midline, max.'],bullets:['Spacing is T/4.','Connect landmarks smoothly.','Repeat the pattern left and right as needed.']},
            {title:'Read features before drawing details',paragraphs:['A periodic graph becomes easier when you identify its midline and period first. Then locate maxima, minima, and zeros. These features reveal where a cycle begins and whether a parent pattern behaves more naturally like sine or cosine.'],bullets:['Sine and cosine have no vertical asymptotes.','Parent range is [−1,1].','Zeros and extrema repeat every cycle.']}
        ],
        workedExamples:[
            {title:'Sketch parent sine',problem:'List the five key points of y=sinx from 0 to 2π.',steps:['Period=2π, so quarter-period=π/2.','Use x=0,π/2,π,3π/2,2π.','Evaluate sine: 0,1,0,−1,0.'],answer:'(0,0),(π/2,1),(π,0),(3π/2,−1),(2π,0)'},
            {title:'Compare sine and cosine starts',problem:'How do y=sinx and y=cosx differ at x=0?',steps:['sin0=0, so sine starts on its midline.','cos0=1, so cosine starts at a maximum.','Both still repeat every 2π.'],answer:'sine starts at 0; cosine starts at 1'}
        ],
        commonMistakes:[{mistake:'Using π as the full sine/cosine period.',fix:'π is half a parent cycle. A full sine or cosine cycle is 2π.'},{mistake:'Spacing the five landmarks by the whole period.',fix:'Divide the period by four. The five points include both ends of the cycle.'}],
        alternateExplanation:'Think of a Ferris wheel. Sine is the rider’s vertical position and cosine is horizontal position. One complete wheel rotation makes each coordinate complete one wave and return to its starting value.',
        application:'Sine and cosine graphs model any smooth repeating process: sound, alternating current, rotating parts, seasonal cycles, tides, and oscillations.',
        teacherTip:'Draw the midline and mark five x-values before drawing any curve. Structure first, wave second.',
        generators:{easy:['u5:sinCosParentFeatures','u5:sinCosLandmark'],standard:['u5:sinCosParentFeatures','u5:sinCosLandmark','u5:sinCosPeriodFromB'],challenge:['u5:sinCosPeriodFromB','u5:sinCosLandmark']}
    }),
    authoredLesson({
        id:'5.8', title:'Amplitude, Period & Phase Shift', summary:'Analyze and construct transformed sine and cosine functions using amplitude, reflection, period, phase shift, and vertical shift, then rebuild each cycle from transformed landmarks.', estimatedMinutes:65,
        teks:['P.2F','P.2G','P.2H','P.2I'],
        objectives:['Read A, B, C, and D from transformed sine/cosine forms.','Compute amplitude, period, phase shift, and midline.','Write a sinusoidal equation from graph features.'],
        prerequisites:['Parent sine/cosine graphs.','General function transformations.','Solving simple equations.'],
        keyIdeas:['Amplitude=|A|.','Period T=2π/|B|.','In B(x−C), phase shift is C.','D gives midline y=D.','A negative A reflects the wave across its midline.'],
        formulas:['y=A sin(B(x−C))+D','y=A cos(B(x−C))+D','amplitude=|A|','T=2π/|B|','phase shift=C','midline y=D'],
        sections:[
            {title:'Read vertical structure first',paragraphs:['A and D tell you the vertical geometry. |A| is the distance from midline to maximum or minimum; D is the midline itself. Once those are known, the highest and lowest values are D±|A|.'],bullets:['Amplitude is never negative.','Negative A reflects the parent pattern.','D moves every point vertically.']},
            {title:'B controls timing, not height',paragraphs:['The coefficient B changes how quickly the angle inside the trig function advances. Larger |B| means the cycle completes sooner, so period decreases. This inverse relationship is why T=2π/|B|.'],bullets:['B=2 gives period π.','B=1/2 gives period 4π.','Use transformed quarter-period spacing T/4.']},
            {title:'C moves the cycle horizontally',paragraphs:['The expression x−C shifts the cycle right by C; x+C shifts it left. After finding the shift, place the first parent landmark there and space the remaining four landmarks by T/4.'],bullets:['Inside shifts use the opposite visible sign.','Choose sine or cosine based on the desired starting landmark.','A graph can have many equivalent sinusoidal equations.']}
        ],
        workedExamples:[
            {title:'Read all four parameters',problem:'Analyze y=3sin(2(x−π/4))+1.',steps:['Amplitude=|3|=3.','B=2, so period=2π/2=π.','Phase shift=π/4 right.','Midline y=1.'],answer:'amplitude 3, period π, shift π/4 right, midline y=1'},
            {title:'Write a model from features',problem:'Write a simple sinusoid with amplitude 4, period 2π, midline y=−2, beginning at a maximum at x=0.',steps:['Beginning at a maximum suggests cosine.','Period 2π means B=1.','Amplitude 4 gives A=4.','Midline −2 gives D=−2.'],answer:'y=4cosx−2'}
        ],
        commonMistakes:[{mistake:'Using 2π·B instead of 2π/B for period.',fix:'B controls speed inversely. Larger B makes a shorter period.'},{mistake:'Reading x+3 as a shift right 3.',fix:'Horizontal shifts use the opposite visible sign: x+3=x−(−3), so the shift is left 3.'}],
        alternateExplanation:'Imagine a repeating strip with five landmark points. A stretches the strip vertically, D raises or lowers it, B squeezes or widens its horizontal spacing, and C slides the whole strip left or right.',
        application:'Amplitude and period describe signal strength, seasonal range, mechanical oscillation, sound waves, and rotating systems; phase shift synchronizes the model with when a cycle begins.',
        teacherTip:'Always calculate period before choosing graph x-values. Many otherwise-correct sketches fail because the quarter-period spacing was never recomputed.',
        generators:{easy:['u5:trigTransformFeatures','u5:trigPhaseShift'],standard:['u5:trigTransformFeatures','u5:trigPhaseShift','u5:trigWriteEquation','u5:sinCosPeriodFromB'],challenge:['u5:trigWriteEquation','u5:trigTransformFeatures','u5:trigPhaseShift']}
    }),
    authoredLesson({
        id:'5.9', title:'Graphing Other Trigonometric Functions', summary:'Graph and identify tangent, cotangent, secant, and cosecant using quotient/reciprocal relationships, periods, zeros, vertical asymptotes, and branch behavior.', estimatedMinutes:65,
        teks:['P.2F','P.2G','P.2H','P.2I','P.4E'],
        objectives:['Describe tangent and cotangent zeros, periods, and asymptotes.','Build secant and cosecant graphs from cosine and sine.','Identify trig graph families from structural features.'],
        prerequisites:['Sine/cosine graphs.','Reciprocal and quotient trig relationships.','Vertical asymptotes.'],
        keyIdeas:['tan=sin/cos, so cosine zeros become tangent asymptotes.','cot=cos/sin, so sine zeros become cotangent asymptotes.','sec=1/cos and csc=1/sin, so reciprocal graphs inherit asymptotes from parent zeros.','Tangent and cotangent have period π; secant and cosecant have period 2π.'],
        formulas:['tanx=sinx/cosx','cotx=cosx/sinx','secx=1/cosx','cscx=1/sinx'],
        sections:[
            {title:'Tangent and cotangent come from quotients',paragraphs:['A quotient is zero when its numerator is zero and undefined when its denominator is zero. That single fact explains the alternating zeros and vertical asymptotes of tangent and cotangent.'],bullets:['tan zeros: x=kπ.','tan asymptotes: x=π/2+kπ.','cot swaps those roles.']},
            {title:'Secant and cosecant are reciprocal graphs',paragraphs:['Start with a lightly sketched cosine or sine graph. Wherever the base function is zero, the reciprocal is undefined and gets a vertical asymptote. Wherever the base is ±1, the reciprocal also equals ±1 and forms a branch vertex.'],bullets:['Secant range: y≤−1 or y≥1.','Cosecant has the same reciprocal range.','Reciprocal branches never cross the band −1<y<1.']},
            {title:'Identify families by landmarks',paragraphs:['Graph shape alone can be misleading. Use period, zeros, and asymptote locations as fingerprints. Tangent has S-shaped branches between asymptotes; secant/cosecant have U-shaped reciprocal branches.'],bullets:['Ask where the graph is undefined.','Ask whether it crosses the x-axis.','Ask whether its repeat length is π or 2π.']}
        ],
        workedExamples:[
            {title:'Analyze tangent',problem:'State the period, zeros, and vertical asymptotes of y=tanx.',steps:['tanx=sinx/cosx.','Zeros occur where sinx=0: x=kπ.','Asymptotes occur where cosx=0: x=π/2+kπ.','The pattern repeats every π.'],answer:'period π; zeros kπ; asymptotes π/2+kπ'},
            {title:'Construct secant from cosine',problem:'Where does y=secx have asymptotes and vertices over one cycle?',steps:['secx=1/cosx.','Cosine is zero at π/2 and 3π/2, giving asymptotes.','Cosine is ±1 at 0,π,2π, giving secant vertices (0,1),(π,−1),(2π,1).'],answer:'asymptotes π/2,3π/2; vertices at y=±1 landmarks'}
        ],
        commonMistakes:[{mistake:'Putting tangent asymptotes at x=kπ.',fix:'Those are tangent zeros. Asymptotes occur where cosine, the denominator, is zero.'},{mistake:'Drawing secant as a wave between −1 and 1.',fix:'Secant is reciprocal cosine, so |secx|≥1 wherever defined.'}],
        alternateExplanation:'Do not memorize four new pictures. Start from sine and cosine. For quotients, track numerator zeros and denominator zeros. For reciprocals, turn base-function zeros into asymptotes and ±1 points into branch vertices.',
        application:'These functions appear in slope models, optics, periodic geometry, and later identity/equation work. Their asymptotes are especially important when interpreting domains.',
        teacherTip:'Have the learner sketch a faint sine or cosine “guide graph” before secant/cosecant. The reciprocal branches become much less arbitrary.',
        generators:{easy:['u5:tangentGraphFeatures','u5:reciprocalTrigGraph'],standard:['u5:tangentGraphFeatures','u5:reciprocalTrigGraph','u5:otherTrigGraphIdentify'],challenge:['u5:otherTrigGraphIdentify','u5:tangentGraphFeatures','u5:reciprocalTrigGraph']}
    }),
    authoredLesson({
        id:'5.10', title:'Inverse Trigonometric Functions', summary:'Use arcsine, arccosine, and arctangent to recover principal angles, respect restricted output ranges, and evaluate inverse-trig compositions with exact triangle reasoning.', estimatedMinutes:60,
        teks:['P.2G','P.2I','P.5F'],
        objectives:['Explain why trig functions need restricted domains before they can be inverted.','Evaluate exact inverse-trig values in principal ranges.','Solve simple inverse-trig compositions using reference triangles.'],
        prerequisites:['Exact trig values.','Inverse-function concept from Unit 1.','Right-triangle ratios.'],
        keyIdeas:['Inverse trig functions return principal angles.','arcsin range is [−π/2,π/2].','arccos range is [0,π].','arctan range is (−π/2,π/2).','sin⁻¹x means inverse sine, not reciprocal sine.'],
        formulas:['arcsin range [−π/2,π/2]','arccos range [0,π]','arctan range (−π/2,π/2)'],
        sections:[
            {title:'Why principal ranges are necessary',paragraphs:['A full sine or cosine graph fails the horizontal-line test because each output repeats infinitely many times. To create an inverse function, we restrict the original domain to one interval that still covers the full needed range. The inverse then returns one designated principal angle.'],bullets:['arcsin chooses from quadrants IV/I.','arccos chooses from 0 through π.','arctan chooses angles between its nearest asymptotes.']},
            {title:'Translate inverse notation into an ordinary trig equation',paragraphs:['If arcsin(1/2)=θ, rewrite it as sinθ=1/2. Find the standard angle, then keep the one that lies in the arcsine principal range. This translation is safer than trying to treat inverse symbols like algebraic exponents.'],bullets:['Inverse trig output is an angle.','Check the principal range before finalizing.','Use exact angles when the input is an exact special value.']},
            {title:'Compositions may need a triangle',paragraphs:['In cos(arcsin(3/5)), the functions do not simply cancel because they are different functions. Let θ=arcsin(3/5), draw a right triangle with opposite 3 and hypotenuse 5, find the missing side 4, then evaluate cosθ=4/5.'],bullets:['Name the inner inverse result θ.','Translate it into a side ratio.','Use Pythagorean Theorem if a side is missing.']}
        ],
        workedExamples:[
            {title:'Use a principal range',problem:'Evaluate arcsin(−√2/2).',steps:['We need sinθ=−√2/2.','Reference angle=π/4.','Arcsine outputs in [−π/2,π/2].','The allowed angle is −π/4.'],answer:'−π/4'},
            {title:'Evaluate a composition',problem:'Find cos(arcsin(3/5)).',steps:['Let θ=arcsin(3/5), so sinθ=3/5.','Use a right triangle: opposite=3, hypotenuse=5.','Adjacent=4 by the Pythagorean Theorem.','cosθ=adjacent/hypotenuse=4/5.'],answer:'4/5'}
        ],
        commonMistakes:[{mistake:'Reading sin⁻¹x as 1/sinx.',fix:'sin⁻¹x means arcsin, an inverse function that returns an angle. Cosecant is the reciprocal of sine.'},{mistake:'Returning any coterminal angle with the correct trig value.',fix:'Inverse trig requires the one principal angle in its specified output range.'}],
        alternateExplanation:'Inverse trig is a search with a rulebook. First ask “which angles have this trig value?” Then apply the principal-range rule to choose the single angle the inverse function is allowed to return.',
        application:'Inverse trig recovers angles from measured ratios in surveying, navigation, engineering, vectors, and later triangle-solving problems.',
        teacherTip:'Write the relevant principal range next to every inverse-trig problem until choosing the permitted angle becomes automatic.',
        generators:{easy:['u5:inverseTrigExact','u5:inverseTrigRange'],standard:['u5:inverseTrigExact','u5:inverseTrigRange','u5:inverseTrigComposition'],challenge:['u5:inverseTrigComposition','u5:inverseTrigExact']}
    }),
    authoredLesson({
        id:'5.11', title:'Sinusoidal Modeling', summary:'Translate periodic real-world information into sine or cosine models using maximum, minimum, amplitude, midline, period, phase, and meaningful domain interpretation.', estimatedMinutes:70,
        teks:['P.2O','P.2F','P.2G','P.2I'],
        objectives:['Extract amplitude and midline from maximum and minimum values.','Convert physical period T into B=2π/T.','Choose and interpret a sine or cosine model from a starting condition.'],
        prerequisites:['Transformed sine/cosine graphs.','Reading maximum and minimum values.','Basic equation modeling.'],
        keyIdeas:['Amplitude=(max−min)/2.','Midline=(max+min)/2.','If period is T, then |B|=2π/T.','Cosine is convenient for a cycle beginning at a max/min; sine is convenient for a cycle beginning on the midline.','Parameters must be interpreted with units and context.'],
        formulas:['A=(max−min)/2','D=(max+min)/2','B=2π/T','y=Acos(B(t−C))+D or y=Asin(B(t−C))+D'],
        sections:[
            {title:'Extract vertical information first',paragraphs:['Maximum and minimum determine the vertical envelope of the phenomenon. Their average is the midline; half their difference is the amplitude. Once A and D are known, the vertical behavior is settled.'],bullets:['Midline sits halfway between extremes.','Amplitude is a distance and therefore nonnegative.','Maximum=D+A and minimum=D−A.']},
            {title:'Translate repeat time into B',paragraphs:['The real-world period T is the time for one full repeat. The coefficient B in a trig equation is not that period; it converts input units into angular speed. Use B=2π/T.'],bullets:['Longer period means smaller B.','Shorter period means larger B.','Keep time units consistent.']},
            {title:'Choose alignment and interpret',paragraphs:['If data begin at a maximum, positive cosine often avoids an unnecessary phase shift. If data begin on the midline moving upward, sine may be cleaner. Equivalent models are possible, but every parameter should be explainable in context.'],bullets:['State units for amplitude, midline, and period.','Check predicted values against physical limits.','Use a phase shift when the convenient cycle landmark occurs later than t=0.']}
        ],
        workedExamples:[
            {title:'Build a Ferris-wheel height model',problem:'A rider ranges from 2 m to 26 m and completes a revolution every 40 s. At t=0 the rider is at the top.',steps:['Amplitude=(26−2)/2=12.','Midline=(26+2)/2=14.','B=2π/40=π/20.','Starting at a maximum suggests positive cosine.'],answer:'h(t)=12cos((π/20)t)+14'},
            {title:'Interpret a seasonal model',problem:'For T(t)=8sin((2π/12)(t−3))+20, interpret amplitude, period, shift, and midline.',steps:['Amplitude=8.','Period=12 time units.','Phase shift=3 units right.','Midline=20.'],answer:'amplitude 8, period 12, shift 3 right, midline 20'}
        ],
        commonMistakes:[{mistake:'Using max−min as amplitude.',fix:'Amplitude is half of the full max-to-min range.'},{mistake:'Putting the physical period directly in front of t.',fix:'The coefficient is B=2π/T, not T itself.'}],
        alternateExplanation:'Draw the midline halfway between the highest and lowest values. Measure the vertical distance to an extreme for amplitude. Then measure how long the pattern takes to repeat. Those three facts determine most of a sinusoidal model before any equation is written.',
        application:'Sinusoidal models describe daylight hours, tides, Ferris-wheel height, seasonal temperature, alternating current, rotating equipment, and other repeating data.',
        teacherTip:'Use a four-row scratch table labeled max/min, A/D, T/B, and starting landmark. It turns a wordy modeling problem into four manageable decisions.',
        generators:{easy:['u5:sinusoidFeatures','u5:sinusoidBFromPeriod'],standard:['u5:sinusoidFeatures','u5:sinusoidBFromPeriod','u5:sinusoidModelChoice','u5:sinusoidEvaluate'],challenge:['u5:sinusoidModelChoice','u5:sinusoidEvaluate','u5:sinusoidFeatures']}
    }),
    authoredLesson({
        id:'5.12', title:'Unit Review / Assessment', summary:'Synthesize angle measure, circular motion, unit-circle exact values, all six trigonometric functions, graph transformations, inverse trigonometry, and sinusoidal modeling in a mixed Unit 5 review.', estimatedMinutes:80,
        teks:unitTeks,
        objectives:['Choose the correct representation for a mixed trigonometry problem.','Move among angle, coordinate, ratio, graph, inverse, and model representations.','Diagnose repeated errors and return to the exact lesson that needs review.'],
        prerequisites:['Lessons 5.1–5.11.'],
        keyIdeas:['Radians connect circles to trig functions naturally.','The unit circle is the source of exact values and graph landmarks.','Quotient and reciprocal relationships build the remaining trig functions from sine/cosine.','Graph parameters describe periodic structure.','Inverse trig recovers principal angles.','Modeling translates real-world cycles into those same graph parameters.'],
        formulas:['360°=2π','s=rθ','v=rω','(cosθ,sinθ)','T=2π/|B|','A=(max−min)/2','D=(max+min)/2'],
        sections:[
            {title:'Identify the representation first',paragraphs:['Mixed review becomes less intimidating when you decide what kind of information the problem is giving you: an angle, a triangle, a unit-circle coordinate, a graph, an inverse expression, or a real-world cycle. Then choose the representation that makes the relationship visible.'],bullets:['Angle/circle problem → check units.','Exact value → reference angle and quadrant.','Graph problem → identify midline, amplitude, period, shift, asymptotes.','Modeling problem → extract max, min, period, and starting position.']},
            {title:'Run a trig-specific error check',paragraphs:['Before submitting, inspect the places where Unit 5 mistakes cluster: degrees versus radians, swapped sine/cosine coordinates, quadrant signs, period formulas, undefined denominators, and inverse-function principal ranges.'],bullets:['Write units beside angle measures.','Keep exact values exact unless asked to approximate.','For inverse trig, verify the output range.']},
            {title:'Use mistakes as a map',paragraphs:['A review score is useful only if it tells you what to study next. A missed phase-shift problem should send you to 5.8, while a missed exact-value problem should send you to 5.3 or 5.6. Targeted review is faster and less frustrating than rereading the whole unit.'],bullets:['Group misses by concept.','Redo one worked example before attempting more practice.','Use mastery mode only after the weak concept is repaired.']}
        ],
        workedExamples:[
            {title:'Mixed exact-value and graph reasoning',problem:'For y=2sin(3x)−1, state amplitude, period, midline, and y(π/6).',steps:['Amplitude=2.','Period=2π/3.','Midline y=−1.','At x=π/6, inside angle is 3π/6=π/2, so sin=1.','y=2(1)−1=1.'],answer:'amplitude 2, period 2π/3, midline −1, y(π/6)=1'},
            {title:'Mixed modeling decision',problem:'A periodic height ranges from 5 to 17 every 10 seconds and begins at a maximum. Build a simple model.',steps:['Amplitude=(17−5)/2=6.','Midline=(17+5)/2=11.','B=2π/10=π/5.','Beginning at a maximum suggests cosine.'],answer:'h(t)=6cos((π/5)t)+11'}
        ],
        commonMistakes:[{mistake:'Treating every trig question as a memorization problem.',fix:'Choose the right representation first. Most formulas follow from circle, coordinate, quotient, reciprocal, or transformation structure.'},{mistake:'Ignoring a pattern in repeated misses.',fix:'Use the mistake notebook and return to the exact lesson before doing another broad review set.'}],
        alternateExplanation:'Unit 5 is one story rather than eleven unrelated topics: a point rotates around a circle; angle measure tells where it is, coordinates create trig values, those values form graphs over time, transformations reshape the graphs, inverse functions recover angles, and models apply the same structure to real cycles.',
        application:'This cumulative skill set supports physics, engineering, waves, navigation, vectors, later trigonometric identities/equations, and calculus.',
        teacherTip:'After a mixed set, spend more time categorizing errors than counting them. The goal is to identify the next lesson to repair, not merely produce a percentage.',
        generators:{easy:['u5:degreeRadian','u5:unitCircleValue','u5:rightTrig','u5:sinCosParentFeatures','u5:sinusoidFeatures'],standard:['u5:degreeRadian','u5:arcLength','u5:unitCircleValue','u5:reciprocalTrig','u5:specialTrig','u5:trigTransformFeatures','u5:tangentGraphFeatures','u5:inverseTrigExact','u5:sinusoidModelChoice'],challenge:['u5:referenceAngle','u5:unitCircleCoordinate','u5:trigWriteEquation','u5:otherTrigGraphIdentify','u5:inverseTrigComposition','u5:sinusoidEvaluate']}
    })
];

export const unit = authoredUnit(5, 'Trigonometric Functions', '~4 weeks', unitTeks, lessons);
export default unit;
