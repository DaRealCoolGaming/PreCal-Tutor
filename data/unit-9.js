import '../js/generators-unit9.js';
import { authoredLesson, authoredUnit } from './lesson-schema.js';

const unitTeks=['P.3A','P.3B','P.3C','P.3D','P.3E'];
const lessons=[
  authoredLesson({
    id:'9.1',title:'Introduction to Parametric Equations',estimatedMinutes:55,teks:['P.3A'],
    summary:'Learn why one parameter can generate both coordinates of a moving point, evaluate parametric equations accurately, and interpret the parameter as information that ordinary rectangular equations may hide.',
    objectives:['Evaluate x(t) and y(t) at a specified parameter value.','Interpret the parameter as an ordering or timing variable.','Explain how a parametric representation differs from y=f(x).'],
    prerequisites:['Function notation and substitution.','Ordered pairs on the coordinate plane.','Basic polynomial evaluation.'],
    keyIdeas:['A parametric curve uses one input t to generate both x and y.','The same geometric path can have different parametrizations and different directions/speeds.','Eliminating t can reveal the path but may discard timing and direction information.'],
    formulas:['x=f(t), y=g(t)','At t=t₀: point = (f(t₀), g(t₀))'],
    sections:[
      {title:'Two outputs from one input',paragraphs:['In rectangular form, x often plays the role of input and y the role of output. Parametric equations loosen that requirement. A third variable, usually t, controls both coordinates. Every permitted t-value produces one ordered pair, so the curve is built point by point.'],bullets:['Evaluate x and y using the same t.','The parameter does not have to equal either coordinate.','A table of t-values is often the fastest first picture.']},
      {title:'The parameter carries extra information',paragraphs:['When t represents time, the parametrization tells not only where the path is, but where the object is at each time. Two different parameter rules can trace the same curve while moving in opposite directions or at different rates.'],bullets:['Path answers “where?”','Parameter order answers “in what direction?”','Parameter spacing can suggest “how fast?”']},
      {title:'Read before you eliminate',paragraphs:['It is tempting to eliminate t immediately, but first inspect the original equations. The parameter interval, starting value, and signs in x(t) and y(t) may tell you which part of a curve is traced and in which direction.'],bullets:['Check any stated t-domain.','Compute a few strategic points.','Notice which coordinate increases or decreases as t grows.']}
    ],
    workedExamples:[
      {title:'Evaluate a point',problem:'For x=2t−1 and y=t²+3, find the point at t=2.',steps:['x=2(2)−1=3.','y=(2)²+3=7.','Pair the coordinates in the order (x,y).'],answer:'(3, 7)'},
      {title:'Interpret time',problem:'A particle has x=5t and y=12−2t. What does t=3 mean?',steps:['The same t-value is used in both coordinates.','At t=3, x=15 and y=6.','If t is measured in seconds, the particle is at (15,6) after 3 seconds.'],answer:'At t=3, the particle is at (15,6).'}
    ],
    commonMistakes:[{mistake:'Using one t-value for x and a different one for y.',fix:'One parameter value creates one ordered pair; substitute the same t into both equations.'},{mistake:'Assuming t is always x.',fix:'Sometimes x=t, but in general x is a function of t and may not equal it.'}],
    alternateExplanation:'Imagine a remote control slider labeled t. As you move the slider, two displays update at once: one display gives x and the other gives y. The graph records the moving dot created by those two synchronized outputs.',
    application:'Parametric equations are natural for animation, projectile motion, robotics, navigation, and any setting where position changes with time or another shared control variable.',
    teacherTip:'Before graphing, have the student build a tiny three-column table t, x(t), y(t). That habit prevents most early parametric substitution errors.',
    generators:{easy:['u9:paramEvaluateLinear','u9:paramMeaning'],standard:['u9:paramEvaluateLinear','u9:paramEvaluateQuadratic','u9:paramMeaning'],challenge:['u9:paramEvaluateQuadratic','u9:paramMeaning']},
    guidedPractice:['u9:paramEvaluateLinear','u9:paramMeaning'],independentPractice:['u9:paramEvaluateLinear','u9:paramEvaluateQuadratic','u9:paramMeaning'],mastery:['u9:paramEvaluateQuadratic','u9:paramMeaning']
  }),
  authoredLesson({
    id:'9.2',title:'Graphing Parametric Equations',estimatedMinutes:65,teks:['P.3A'],
    summary:'Turn parameter values into an oriented graph by building tables, plotting ordered pairs, identifying familiar curve families, and tracking the direction in which the curve is traced.',
    objectives:['Create and plot a parametric table.','Identify the direction of motion as t increases.','Recognize common line, parabola, circle, and ellipse parametrizations.'],
    prerequisites:['Lesson 9.1 parametric evaluation.','Graphing ordered pairs.','Basic sine/cosine values.'],
    keyIdeas:['A parametric graph is a set of ordered pairs plus a tracing direction.','Arrows on the curve record increasing t.','Trig parametrizations naturally trace circles and ellipses.'],
    formulas:['x=a cos t, y=b sin t → ellipse','x=t, y=t² → parabola'],
    sections:[
      {title:'Build a table strategically',paragraphs:['Choose t-values that reveal shape rather than filling a huge table. For polynomial parametrizations, a few integers around zero are usually useful. For trig parametrizations, use familiar unit-circle angles.'],bullets:['Compute both coordinates for every row.','Plot points in increasing t order.','Add arrows after plotting.']},
      {title:'Direction is part of the graph',paragraphs:['The rectangular curve alone does not say which way the parametrization travels. Compare two nearby t-values or inspect whether x(t) and y(t) increase or decrease. Direction matters in motion and modeling problems.'],bullets:['Increasing x often means left-to-right motion.','Trig curves can loop and return to previous locations.','A restricted t-interval may trace only part of the full curve.']},
      {title:'Recognize standard patterns',paragraphs:['Some parametrizations should become visual shortcuts. Linear x(t), y(t) often trace lines. A t and t² pairing traces a parabola. Matching sine and cosine terms trace circular or elliptical paths.'],bullets:['x=r cos t, y=r sin t gives a circle.','Different cosine/sine amplitudes give an ellipse.','Use pattern recognition, then confirm with points.']}
    ],
    workedExamples:[
      {title:'Trace a parabola',problem:'Graph x=t, y=t² for −2≤t≤2.',steps:['Use t=−2,−1,0,1,2.','The points are (−2,4),(−1,1),(0,0),(1,1),(2,4).','As t increases, trace from upper-left through the vertex toward upper-right.'],answer:'The parabola y=x², traced left-to-right.'},
      {title:'Recognize an ellipse',problem:'Describe x=4cos t, y=2sin t.',steps:['Cosine controls horizontal position with amplitude 4.','Sine controls vertical position with amplitude 2.','The path satisfies x²/16+y²/4=1.'],answer:'A horizontal ellipse centered at the origin.'}
    ],
    commonMistakes:[{mistake:'Plotting the correct points but forgetting direction arrows.',fix:'Parametric graphs include orientation; mark how the curve is traced as t increases.'},{mistake:'Treating t as a coordinate axis.',fix:'The plotted axes are still x and y. The parameter generates the points but is not drawn as a third axis.'}],
    alternateExplanation:'Think of the parameter as frame number in an animation. Each frame gives one (x,y) position. The finished graph is the trail left by the moving point, while arrows show the order of the frames.',
    application:'Computer graphics, CAD paths, and moving-object simulations often store a curve parametrically because it gives both the shape and a natural way to move along it.',
    teacherTip:'Ask for three things on every parametric graph: several labeled t-points, the smooth curve, and arrows showing increasing t. Missing any one of those loses information.',
    generators:{easy:['u9:paramTablePoint','u9:paramDirection'],standard:['u9:paramTablePoint','u9:paramDirection','u9:paramGraphIdentify'],challenge:['u9:paramGraphIdentify','u9:paramDirection']},
    guidedPractice:['u9:paramTablePoint','u9:paramDirection'],independentPractice:['u9:paramTablePoint','u9:paramDirection','u9:paramGraphIdentify'],mastery:['u9:paramGraphIdentify','u9:paramDirection']
  }),
  authoredLesson({
    id:'9.3',title:'Eliminating the Parameter',estimatedMinutes:65,teks:['P.3A'],
    summary:'Convert parametric equations into rectangular equations by solving for the parameter or using identities, while recognizing that elimination can lose restrictions and direction information.',
    objectives:['Eliminate t from linear parametrizations.','Eliminate t from simple quadratic and trigonometric parametrizations.','State information that may be lost after elimination.'],
    prerequisites:['Solving equations for a variable.','Substitution.','Pythagorean trig identity.'],
    keyIdeas:['Solve the simplest parametric equation for t whenever possible.','Trig parametrizations often require identities rather than direct isolation.','The rectangular equation may describe more points than the original parameter interval.'],
    formulas:['cos²t+sin²t=1','If x=t+h, then t=x−h'],
    sections:[
      {title:'Substitution is the main tool',paragraphs:['If one coordinate equation can be solved easily for t, isolate t and substitute into the other equation. Then simplify until only x and y remain.'],bullets:['Choose the easier equation to solve.','Substitute carefully with parentheses.','Simplify to a familiar rectangular form.']},
      {title:'Use identities when t is inside trig functions',paragraphs:['For x=a cos t and y=a sin t, directly solving for t is unnecessary. Squaring and adding lets cos²t+sin²t collapse to 1, revealing a circle. Similar identity reasoning works for ellipses.'],bullets:['Square first when matching the Pythagorean identity.','Keep scale factors with their coordinates.','Recognize the resulting conic.']},
      {title:'Keep domain and direction in mind',paragraphs:['Eliminating the parameter preserves the geometric relation but not necessarily the original t-range or direction. A restricted parametrization might trace only half a parabola even though the rectangular equation represents the whole parabola.'],bullets:['Carry parameter restrictions separately.','Do not invent direction from the rectangular equation.','Compare the original and converted forms.']}
    ],
    workedExamples:[
      {title:'Linear elimination',problem:'Eliminate t from x=t+2 and y=3t−1.',steps:['From x=t+2, t=x−2.','Substitute: y=3(x−2)−1.','Simplify: y=3x−7.'],answer:'y=3x−7'},
      {title:'Trig elimination',problem:'Eliminate t from x=5cos t, y=5sin t.',steps:['Square: x²=25cos²t and y²=25sin²t.','Add the equations.','Use cos²t+sin²t=1.'],answer:'x²+y²=25'}
    ],
    commonMistakes:[{mistake:'Substituting x for t without solving the x-equation first.',fix:'If x=t+h, then t=x−h; the shift must be undone before substitution.'},{mistake:'Assuming the rectangular equation preserves the parameter interval.',fix:'Write parameter restrictions separately because elimination can broaden the represented curve.'}],
    alternateExplanation:'Eliminating t is like removing the backstage cue sheet from a performance. You keep the visible path on stage, but you may lose the order and timing that told the performer how to travel along it.',
    application:'Converting between parametric and rectangular forms lets engineers choose the representation best suited to a task: parametric for simulation and motion, rectangular for algebraic analysis.',
    teacherTip:'After every elimination problem, ask “what information disappeared?” This keeps the student from thinking the two forms are always identical in every practical sense.',
    generators:{easy:['u9:eliminateLinear'],standard:['u9:eliminateLinear','u9:eliminateParabola','u9:eliminateCircle'],challenge:['u9:eliminateParabola','u9:eliminateCircle']},
    guidedPractice:['u9:eliminateLinear','u9:eliminateParabola'],independentPractice:['u9:eliminateLinear','u9:eliminateParabola','u9:eliminateCircle'],mastery:['u9:eliminateParabola','u9:eliminateCircle']
  }),
  authoredLesson({
    id:'9.4',title:'Parametric Modeling & Applications',estimatedMinutes:70,teks:['P.3A'],
    summary:'Use parametric equations to model real motion and trajectories, interpret the parameter in context, and connect position equations to questions about location, time, and path.',
    objectives:['Evaluate a parametric motion model at a given time.','Solve a component equation for the parameter.','Explain why parametric form is useful in real-world motion.'],
    prerequisites:['Lessons 9.1–9.3.','Quadratic evaluation.','Units and dimensional reasoning.'],
    keyIdeas:['Separate horizontal and vertical position equations can share the same time parameter.','The parameter domain should match physically meaningful time.','A path equation alone may not preserve timing information.'],
    formulas:['Projectile: x=x₀+vₓt','Projectile: y=y₀+vᵧt−16t² (feet)'],
    sections:[
      {title:'Model components separately',paragraphs:['Motion in two dimensions becomes manageable when horizontal and vertical coordinates are modeled separately but synchronized through time. Horizontal motion is often linear while vertical motion under gravity is quadratic.'],bullets:['Use the same time in both components.','Attach units to every parameter and coordinate.','Interpret only physically meaningful t-values.']},
      {title:'Ask location and timing questions',paragraphs:['A model can answer “where is the object at t=2?” by direct evaluation, or “when does it reach x=100?” by solving the x-equation for t and then using that time in y(t).'],bullets:['Evaluate when time is given.','Solve for t when a coordinate is given.','Substitute the recovered time into the other component if needed.']},
      {title:'Choose the useful representation',paragraphs:['Eliminating t can reveal the shape of a trajectory, but the parametric form is usually better when the question involves time, direction, or synchronized motion. Representation choice is part of mathematical modeling.'],bullets:['Parametric for time and direction.','Rectangular for path shape.','Keep model assumptions visible.']}
    ],
    workedExamples:[
      {title:'Projectile position',problem:'x=24t, y=4+40t−16t². Find position at t=1.5.',steps:['x=24(1.5)=36.','y=4+40(1.5)−16(1.5)²=28.','Combine the coordinates.'],answer:'(36,28)'},
      {title:'Recover time from x',problem:'A robot moves with x=5t+2. When is x=27?',steps:['Set 27=5t+2.','Subtract 2: 25=5t.','Divide by 5.'],answer:'t=5'}
    ],
    commonMistakes:[{mistake:'Using different time values for horizontal and vertical coordinates.',fix:'Both components describe the same object at the same instant, so the parameter must match.'},{mistake:'Keeping negative time when the context begins at launch.',fix:'Use the stated parameter domain and physical meaning to reject nonphysical values.'}],
    alternateExplanation:'A parametric model is two synchronized videos: one tracks horizontal position, the other vertical position. The timestamp t is what keeps the two views aligned.',
    application:'Projectile motion, drone paths, amusement rides, robot arms, and computer animation routinely use parametric equations because the parameter naturally records progression through the motion.',
    teacherTip:'Have the student write the requested quantity first: “given t, find position” or “given coordinate, find t.” That one sentence often determines the whole solution path.',
    generators:{easy:['u9:projectileHorizontalTime','u9:paramModelInterpret'],standard:['u9:projectilePosition','u9:projectileHorizontalTime','u9:paramModelInterpret'],challenge:['u9:projectilePosition','u9:paramModelInterpret']},
    guidedPractice:['u9:projectileHorizontalTime','u9:projectilePosition'],independentPractice:['u9:projectilePosition','u9:projectileHorizontalTime','u9:paramModelInterpret'],mastery:['u9:projectilePosition','u9:paramModelInterpret']
  }),
  authoredLesson({
    id:'9.5',title:'Introduction to Polar Coordinates',estimatedMinutes:55,teks:['P.3B','P.3C'],
    summary:'Replace horizontal-and-vertical location with directed distance and angle, understand the pole and polar axis, and recognize why one Cartesian point can have many polar coordinate descriptions.',
    objectives:['Interpret r and θ in an ordered pair (r,θ).','Locate the pole and polar axis.','Generate equivalent polar coordinates using angle rotations and negative radius.'],
    prerequisites:['Radian measure and unit-circle angles.','Coordinate-plane quadrants.','Directed distance.'],
    keyIdeas:['Polar coordinates describe a point by radius and angle.','Adding 2π to θ reaches the same ray.','Changing r to −r and adding π to θ reaches the same point.'],
    formulas:['(r,θ) ≡ (r,θ+2πk)','(r,θ) ≡ (−r,θ+π)'],
    sections:[
      {title:'Pole, axis, radius, angle',paragraphs:['The polar origin is called the pole, and the positive x-direction is the polar axis. A point (r,θ) is reached by rotating to θ and then moving a directed distance r along that line.'],bullets:['r is directed radial distance.','θ is measured from the polar axis.','r may be negative.']},
      {title:'One point, many names',paragraphs:['Unlike ordinary rectangular coordinates, a polar point has infinitely many coordinate descriptions. Full rotations do not change direction, and a negative radius reverses the ray.'],bullets:['Add or subtract 2π without changing the point.','Negative radius flips direction by π.','Equivalent coordinates are normal, not an error.']},
      {title:'Visualize before calculating',paragraphs:['A quick sketch of the angle and sign of r prevents many mistakes. With r>0, travel along the angle ray. With r<0, travel the opposite direction.'],bullets:['Locate θ first.','Then apply the sign of r.','Check the final quadrant visually.']}
    ],
    workedExamples:[
      {title:'Read a polar point',problem:'Interpret (4,2π/3).',steps:['Rotate 2π/3 from the polar axis.','The angle is in Quadrant II.','Move 4 units along that ray.'],answer:'A point 4 units from the pole in the Quadrant II direction.'},
      {title:'Negative-radius equivalent',problem:'Give an equivalent form of (3,π/4) using negative radius.',steps:['Change 3 to −3.','Add π to the angle.','π/4+π=5π/4.'],answer:'(−3,5π/4)'}
    ],
    commonMistakes:[{mistake:'Treating (r,θ) as if it were (x,y).',fix:'The first value is distance from the pole and the second is an angle, not horizontal/vertical coordinates.'},{mistake:'Negating r without rotating the angle.',fix:'Negative radius points in the opposite direction, so add π when creating an equivalent coordinate.'}],
    alternateExplanation:'Rectangular coordinates say “walk sideways, then vertically.” Polar coordinates say “face this direction, then walk this far.” Both instructions can lead to the same physical point.',
    application:'Radar, sonar, rotating sensors, astronomy, and navigation often measure direction and distance directly, making polar coordinates more natural than rectangular coordinates.',
    teacherTip:'Physically gesture the angle direction and then the radial motion. Polar coordinates become much easier once the student treats them as movement instructions instead of mysterious notation.',
    generators:{easy:['u9:polarParts','u9:polarQuadrant'],standard:['u9:polarParts','u9:polarEquivalentNegative','u9:polarQuadrant'],challenge:['u9:polarEquivalentNegative','u9:polarQuadrant']},
    guidedPractice:['u9:polarParts','u9:polarQuadrant'],independentPractice:['u9:polarParts','u9:polarEquivalentNegative','u9:polarQuadrant'],mastery:['u9:polarEquivalentNegative','u9:polarQuadrant']
  }),
  authoredLesson({
    id:'9.6',title:'Plotting Points in Polar Coordinates',estimatedMinutes:55,teks:['P.3B','P.3C'],
    summary:'Plot polar points accurately by combining angle direction with directed radius, use axis angles as anchors, and verify positions with rectangular coordinates when useful.',
    objectives:['Plot positive-radius polar points.','Plot negative-radius points correctly.','Use rectangular conversion as a coordinate check.'],
    prerequisites:['Lesson 9.5 polar notation.','Special angles.','Basic sine and cosine values.'],
    keyIdeas:['Angle establishes the line of travel; radius chooses distance and direction on that line.','Axis angles provide reliable anchors.','Conversion formulas can verify a sketch.'],
    formulas:['x=r cosθ','y=r sinθ'],
    sections:[
      {title:'Plot positive radius first',paragraphs:['For r>0, rotate to θ and move outward r units. Start with familiar axis and unit-circle directions before tackling less obvious angles.'],bullets:['Mark the angle ray lightly.','Measure radial distance from the pole.','Label the point with its polar coordinates.']},
      {title:'Handle negative radius deliberately',paragraphs:['When r<0, do not move backward vaguely. Rotate to θ, then travel |r| units on the opposite ray. Equivalently, add π to θ and use positive radius.'],bullets:['Opposite ray means a π rotation.','Check the final quadrant.','Equivalent positive-radius coordinates can simplify plotting.']},
      {title:'Verify with rectangular coordinates',paragraphs:['If a point seems surprising, compute x=r cosθ and y=r sinθ. The signs of x and y should match the quadrant shown in the sketch.'],bullets:['Cosine controls x.','Sine controls y.','Use conversion as a check, not always as the first method.']}
    ],
    workedExamples:[
      {title:'Axis point',problem:'Plot (5,π).',steps:['θ=π points along the negative x-axis.','r=5 is positive, so move 5 units on that ray.'],answer:'Rectangular location (−5,0).'},
      {title:'Negative radius',problem:'Plot (−4,π/2).',steps:['π/2 points upward.','Negative radius reverses the direction.','Move 4 units downward.'],answer:'Rectangular location (0,−4).'}
    ],
    commonMistakes:[{mistake:'Using the angle as the radial distance.',fix:'θ controls direction; r controls how far to move.'},{mistake:'Forgetting that negative r reverses direction.',fix:'Either move on the opposite ray or rewrite with positive radius and θ+π.'}],
    alternateExplanation:'Picture a lighthouse beam. θ tells which way the beam points. r tells how far from the lighthouse the point lies; a negative r places the point behind the lighthouse along the same line.',
    application:'Polar plotting mirrors how rotating range sensors report observations: angle is measured by rotation, while distance is measured outward from the sensor. A useful interpretation habit is to narrate a point before plotting it: first name the direction, then the signed distance. That verbal sequence makes negative-radius points much easier to reason about and gives students a reliable self-check before converting coordinates.',
    teacherTip:'Use the four axis angles as checkpoints before any diagonal angle. Students who can instantly place 0, π/2, π, and 3π/2 make far fewer polar plotting mistakes.',
    generators:{easy:['u9:polarAxisPlot'],standard:['u9:polarAxisPlot','u9:plotPolarPoint'],challenge:['u9:plotPolarPoint','u9:polarEquivalentNegative']},
    guidedPractice:['u9:polarAxisPlot','u9:plotPolarPoint'],independentPractice:['u9:polarAxisPlot','u9:plotPolarPoint','u9:polarEquivalentNegative'],mastery:['u9:plotPolarPoint','u9:polarEquivalentNegative']
  }),
  authoredLesson({
    id:'9.7',title:'Rectangular ↔ Polar Coordinate Conversion',estimatedMinutes:70,teks:['P.3B','P.3C'],
    summary:'Convert points between rectangular and polar coordinates using right-triangle relationships, while choosing the correct angle quadrant and understanding that polar answers are not unique.',
    objectives:['Convert a polar point to rectangular coordinates.','Convert a rectangular point to polar coordinates.','Choose θ in the correct quadrant.'],
    prerequisites:['Pythagorean Theorem.','Inverse tangent and quadrant reasoning.','Unit-circle exact values.'],
    keyIdeas:['Polar to rectangular uses x=r cosθ and y=r sinθ.','Rectangular to polar uses r²=x²+y² and a quadrant-correct angle.','A rectangular point has infinitely many polar representations.'],
    formulas:['x=r cosθ, y=r sinθ','r=√(x²+y²), tanθ=y/x'],
    sections:[
      {title:'Polar to rectangular is direct substitution',paragraphs:['Given r and θ, compute cosine and sine, then multiply by r. Exact special-angle values often keep answers clean.'],bullets:['x uses cosine.','y uses sine.','Check coordinate signs against the angle.']},
      {title:'Rectangular to polar begins with distance',paragraphs:['Compute r using the distance formula from the origin. Then find a reference angle and place it in the quadrant determined by x and y.'],bullets:['r is usually taken nonnegative for a standard answer.','atan(y/x) alone does not encode the quadrant.','Axis points need special handling.']},
      {title:'Equivalent answers are expected',paragraphs:['Adding 2π to an angle or using negative radius can produce another valid polar form. Problems often request a specific range such as 0≤θ<2π to make the answer unique.'],bullets:['Read angle-range instructions.','State exact angles when possible.','Verify by converting back.']}
    ],
    workedExamples:[
      {title:'Polar to rectangular',problem:'Convert (4,π/3).',steps:['x=4cos(π/3)=4(1/2)=2.','y=4sin(π/3)=4(√3/2)=2√3.'],answer:'(2,2√3)'},
      {title:'Rectangular to polar',problem:'Convert (−3,3) using r>0 and 0≤θ<2π.',steps:['r=√(9+9)=3√2.','Reference angle is π/4.','The point is in Quadrant II, so θ=3π/4.'],answer:'(3√2,3π/4)'}
    ],
    commonMistakes:[{mistake:'Using tan⁻¹(y/x) without checking quadrant.',fix:'Find the reference angle, then use signs of x and y to choose the correct standard-position angle.'},{mistake:'Swapping sine and cosine in polar-to-rectangular conversion.',fix:'Remember x=r cosθ and y=r sinθ.'}],
    alternateExplanation:'The same right triangle sits behind both coordinate systems. Rectangular coordinates record the horizontal and vertical legs; polar coordinates record the hypotenuse and its direction angle.',
    application:'Navigation systems often receive range-and-bearing measurements but display locations on rectangular maps, so converting between the two coordinate descriptions is a practical data-translation task. The conversion is also a good place to practice estimation: before calculating, predict the quadrant and rough coordinate sizes from the angle. If an exact calculation lands in a different quadrant or produces coordinates larger than the radius, the setup should be checked.',
    teacherTip:'Before inverse tangent, require the student to write the quadrant from the signs of (x,y). That prevents a calculator’s principal-angle output from silently choosing the wrong direction.',
    generators:{easy:['u9:rectToPolar345','u9:polarToRectSpecial'],standard:['u9:rectToPolar345','u9:rectToPolarAngle','u9:polarToRectSpecial'],challenge:['u9:rectToPolarAngle','u9:polarToRectSpecial']},
    guidedPractice:['u9:rectToPolar345','u9:polarToRectSpecial'],independentPractice:['u9:rectToPolar345','u9:rectToPolarAngle','u9:polarToRectSpecial'],mastery:['u9:rectToPolarAngle','u9:polarToRectSpecial']
  }),
  authoredLesson({
    id:'9.8',title:'Rectangular ↔ Polar Equation Conversion',estimatedMinutes:70,teks:['P.3D'],
    summary:'Translate entire equations between rectangular and polar form using the core coordinate identities, while recognizing when multiplying by r or completing the square reveals a familiar graph.',
    objectives:['Convert simple rectangular equations to polar form.','Convert simple polar equations to rectangular form.','Recognize graph families after conversion.'],
    prerequisites:['Lesson 9.7 coordinate identities.','Algebraic substitution.','Completing the square from Unit 8.'],
    keyIdeas:['Equation conversion uses identities, not point-by-point conversion.','Multiplying a polar equation by r can create r² and r cosθ/r sinθ terms.','The converted form should describe the same graph.'],
    formulas:['x=r cosθ, y=r sinθ','x²+y²=r²'],
    sections:[
      {title:'Rectangular to polar: substitute identities',paragraphs:['Replace x with r cosθ, y with r sinθ, and x²+y² with r² whenever those patterns appear. Then simplify.'],bullets:['Use the largest available identity first.','Do not replace x²+y² with r.','Simplify only after correct substitution.']},
      {title:'Polar to rectangular: create useful products',paragraphs:['If the equation contains r alone with a trig function, multiplying both sides by r may produce r² and r cosθ or r sinθ, which convert immediately to rectangular expressions.'],bullets:['r cosθ=x.','r sinθ=y.','r²=x²+y².']},
      {title:'Use graph knowledge as a check',paragraphs:['After conversion, identify the graph. For example, r=a cosθ becomes a circle in rectangular form. If the converted graph family contradicts the original polar shape, recheck the algebra.'],bullets:['Constant r gives a circle centered at the pole.','x=a and y=b become polar line equations.','Polar circle forms convert to shifted rectangular circles.']}
    ],
    workedExamples:[
      {title:'Rectangular circle to polar',problem:'Convert x²+y²=25.',steps:['Use x²+y²=r².','Then r²=25.','For the standard circle, r=5.'],answer:'r=5'},
      {title:'Polar circle to rectangular',problem:'Convert r=6cosθ.',steps:['Multiply by r: r²=6r cosθ.','Substitute x²+y² for r² and x for r cosθ.'],answer:'x²+y²=6x'}
    ],
    commonMistakes:[{mistake:'Replacing x²+y² with r instead of r².',fix:'Distance satisfies r²=x²+y²; the square matters.'},{mistake:'Trying to replace cosθ directly with x.',fix:'The identity is r cosθ=x, so you may need to multiply by r first.'}],
    alternateExplanation:'Equation conversion is a vocabulary translation. The phrases x, y, and x²+y² have polar equivalents r cosθ, r sinθ, and r². Translate the largest recognizable chunks before simplifying.',
    application:'Scientists and engineers often switch equation systems because one form makes symmetry or measurement simpler while another makes geometric location or algebraic analysis simpler. Students should compare both forms after a conversion: the rectangular version may expose center, radius, or slope, while the polar version may expose rotational structure. Treating conversion as a change of viewpoint, not merely symbol replacement, makes later graph recognition much more reliable.',
    teacherTip:'Keep the three conversion identities visible until they are automatic. Most mistakes in this lesson are identity-selection errors, not difficult algebra.',
    generators:{easy:['u9:polarEquationCircle','u9:polarEquationVerticalLine','u9:polarEquationHorizontalLine'],standard:['u9:polarEquationCircle','u9:polarEquationVerticalLine','u9:polarEquationHorizontalLine','u9:polarCircleToRect'],challenge:['u9:polarCircleToRect','u9:polarEquationVerticalLine','u9:polarEquationHorizontalLine']},
    guidedPractice:['u9:polarEquationCircle','u9:polarEquationVerticalLine','u9:polarCircleToRect'],independentPractice:['u9:polarEquationCircle','u9:polarEquationVerticalLine','u9:polarEquationHorizontalLine','u9:polarCircleToRect'],mastery:['u9:polarCircleToRect','u9:polarEquationVerticalLine','u9:polarEquationHorizontalLine']
  }),
  authoredLesson({
    id:'9.9',title:'Graphing Polar Equations',estimatedMinutes:70,teks:['P.3E'],
    summary:'Graph polar equations by evaluating strategic angles, using symmetry, recognizing special equation patterns, and understanding how negative radius affects the traced curve.',
    objectives:['Evaluate r for selected θ-values.','Use symmetry to reduce graphing work.','Recognize common special polar graph families.'],
    prerequisites:['Polar plotting and conversion.','Trig evaluation at special angles.','Graph symmetry.'],
    keyIdeas:['A polar graph records all points satisfying r=f(θ).','Strategic angles reveal intercepts, extrema, and loops.','Symmetry and family recognition make graphing efficient.'],
    formulas:['Polar axis symmetry test: θ→−θ','Pole symmetry can often be tested with θ→θ+π or r→−r'],
    sections:[
      {title:'Make a strategic θ-table',paragraphs:['Do not sample angles randomly. Use axis angles and special angles that make sine/cosine values simple. Record negative r values instead of discarding them.'],bullets:['Start with 0, π/2, π, 3π/2.','Add π/4 or π/6 when useful.','Plot negative r on the opposite ray.']},
      {title:'Exploit symmetry',paragraphs:['Many polar equations are symmetric about the polar axis, vertical axis, or pole. Algebraic symmetry tests and visual equation patterns can reduce the amount of table work.'],bullets:['Cosine-heavy forms often align horizontally.','Sine-heavy forms often align vertically.','Verify symmetry rather than assuming it.']},
      {title:'Recognize before plotting every point',paragraphs:['Constant-radius circles, limaçons, cardioids, roses, and lemniscates have recognizable algebraic patterns. Classification gives you a target shape that the table can confirm.'],bullets:['r=a±b trigθ → limaçon family.','r=a trig(nθ) → rose.','r²=a² trig(2θ) → lemniscate.']}
    ],
    workedExamples:[
      {title:'Evaluate a polar rule',problem:'For r=3+2cosθ, find r at θ=0 and θ=π.',steps:['At 0, cos0=1, so r=5.','At π, cosπ=−1, so r=1.','These values show horizontal extreme distances.'],answer:'r(0)=5, r(π)=1'},
      {title:'Recognize a family',problem:'Classify r=4sin(3θ).',steps:['The equation is r=a sin(nθ).','That is the rose-curve pattern.','n=3 is odd, so the graph has 3 petals.'],answer:'Three-petal rose'}
    ],
    commonMistakes:[{mistake:'Throwing away negative r-values.',fix:'Negative radius is valid and plots on the opposite ray; it often creates important parts of the graph.'},{mistake:'Using an enormous table before checking the equation family.',fix:'Recognize the pattern and symmetry first, then use a small strategic table to confirm it.'}],
    alternateExplanation:'Polar graphing is like sweeping a rotating beam whose length changes with angle. The equation tells the beam length r for each direction θ, including negative lengths that flip to the opposite side.',
    application:'Directional radiation patterns, rotating sensors, microphones, and periodic spatial patterns are often easier to visualize in polar form because the independent variable is direction. A strong modeling check is to connect every large or small value of r to a visible geometric feature: maximum radius should create an outer tip, r=0 should pass through the pole, and sign changes should explain why a loop or petal appears on the opposite ray.',
    teacherTip:'For each polar graph, require four headings: family, symmetry, key θ-values, and sign of r. This turns a messy table exercise into a repeatable graphing strategy.',
    generators:{easy:['u9:polarEvaluate','u9:polarFamilyIdentify'],standard:['u9:polarEvaluate','u9:polarSymmetry','u9:polarFamilyIdentify'],challenge:['u9:polarSymmetry','u9:polarFamilyIdentify']},
    guidedPractice:['u9:polarEvaluate','u9:polarFamilyIdentify'],independentPractice:['u9:polarEvaluate','u9:polarSymmetry','u9:polarFamilyIdentify'],mastery:['u9:polarSymmetry','u9:polarFamilyIdentify']
  }),
  authoredLesson({
    id:'9.10',title:'Circles & Limaçons',estimatedMinutes:65,teks:['P.3E'],
    summary:'Distinguish polar circles, cardioids, and the limaçon family by equation structure, coefficient relationships, orientation, and key radial values.',
    objectives:['Recognize polar circle equations.','Classify limaçons using coefficient ratios.','Determine cardioid/limaçon orientation from sine, cosine, and sign.'],
    prerequisites:['Lesson 9.9 polar graphing.','Sine/cosine range.','Equation conversion basics.'],
    keyIdeas:['r=a cosθ or r=a sinθ describes a circle through the pole.','r=a±b cosθ or a±b sinθ creates the limaçon family.','The a:b relationship controls inner loop, cardioid, dimple, or convex shape.'],
    formulas:['r=a±b cosθ or r=a±b sinθ','r=a cosθ → circle radius |a|/2'],
    sections:[
      {title:'Polar circles are shifted circles',paragraphs:['Equations such as r=a cosθ and r=a sinθ are circles whose diameter is |a|. Converting to rectangular form reveals their centers and radii.'],bullets:['Cosine shifts horizontally.','Sine shifts vertically.','Coefficient magnitude gives diameter.']},
      {title:'Classify limaçons by a and b',paragraphs:['For r=a+b cosθ or r=a+b sinθ, the relative sizes of |a| and |b| determine whether the curve has an inner loop, becomes a cardioid, is dimpled, or is convex.'],bullets:['|a|<|b| → inner loop.','|a|=|b| → cardioid.','Larger a/b ratios smooth the indentation.']},
      {title:'Orientation comes from trig family and sign',paragraphs:['Cosine aligns the graph left/right; sine aligns it up/down. The sign in front of the trig term determines which direction contains the largest lobe.'],bullets:['+cos tends right, −cos left.','+sin tends up, −sin down.','Check θ where the trig term is ±1.']}
    ],
    workedExamples:[
      {title:'Classify a limaçon',problem:'Classify r=2+5cosθ.',steps:['Compare a=2 and b=5.','Because |a|<|b|, r changes sign for some angles.','That creates an inner loop.'],answer:'Inner-loop limaçon'},
      {title:'Read a polar circle',problem:'Describe r=8cosθ.',steps:['Convert: r²=8r cosθ.','x²+y²=8x.','Complete the square: (x−4)²+y²=16.'],answer:'Circle centered at (4,0), radius 4.'}
    ],
    commonMistakes:[{mistake:'Calling every a±b trig graph a cardioid.',fix:'A cardioid occurs only when |a|=|b|; other ratios create different limaçons.'},{mistake:'Using coefficient a as the radius of r=a cosθ.',fix:'For r=a cosθ, |a| is the diameter; the radius is |a|/2.'}],
    alternateExplanation:'Imagine a flexible loop attached at the pole. The constant term sets a baseline radius while the sine/cosine term pushes that radius in and out as the angle turns. Their relative strengths determine whether the loop pinches inward.',
    application:'Limaçon-like polar patterns appear in directional sensitivity and wave/radiation diagrams, where distance from the center represents response strength by direction. The coefficient comparison has a physical interpretation too: the constant term represents a baseline response while the trigonometric term represents directional variation. When that variation becomes large enough to overcome the baseline, the mathematical radius changes sign and an inner loop can appear.',
    teacherTip:'Have the student classify before plotting: circle or limaçon family, a:b relationship, and orientation. Once those three are known, the sketch becomes confirmation rather than guesswork.',
    generators:{easy:['u9:polarCircleFeatures','u9:cardioidDirection'],standard:['u9:polarCircleFeatures','u9:cardioidDirection','u9:limaconClassify'],challenge:['u9:limaconClassify','u9:cardioidDirection']},
    guidedPractice:['u9:polarCircleFeatures','u9:cardioidDirection'],independentPractice:['u9:polarCircleFeatures','u9:cardioidDirection','u9:limaconClassify'],mastery:['u9:limaconClassify','u9:cardioidDirection']
  }),
  authoredLesson({
    id:'9.11',title:'Roses & Lemniscates',estimatedMinutes:65,teks:['P.3E'],
    summary:'Recognize and analyze rose curves and lemniscates using equation patterns, petal counts, maximum radius, orientation, and symmetry instead of relying on memorized pictures.',
    objectives:['Determine the number of petals in a rose curve.','Find maximum radius from the coefficient.','Recognize standard lemniscate orientation.'],
    prerequisites:['Lesson 9.9 special polar graphs.','Trig ranges and multiple-angle notation.','Polar symmetry.'],
    keyIdeas:['Rose petal count depends on whether n is odd or even.','The coefficient a controls maximum petal length.','Lemniscates use r² and double-angle trig expressions.'],
    formulas:['r=a cos(nθ) or a sin(nθ)','r²=a² cos(2θ) or a² sin(2θ)'],
    sections:[
      {title:'Rose curves encode petal count in n',paragraphs:['For r=a cos(nθ) or r=a sin(nθ), odd n produces n petals and even n produces 2n petals. The coefficient |a| sets the maximum petal length.'],bullets:['Odd n → n petals.','Even n → 2n petals.','|a| → maximum radial distance.']},
      {title:'Sine and cosine rotate the rose',paragraphs:['Changing sine to cosine often rotates the orientation of the petals without changing their number or maximum length. A quick test at θ=0 reveals whether a petal lies along the polar axis.'],bullets:['Evaluate r at θ=0.','Use symmetry to place remaining petals.','Do not change petal count when only sine/cosine changes.']},
      {title:'Lemniscates are figure-eight polar curves',paragraphs:['Standard lemniscates involve r² and cos(2θ) or sin(2θ). The cosine version aligns with the horizontal axis, while the sine version rotates to diagonal directions.'],bullets:['Maximum |r| is |a|.','r² requires nonnegative right-hand side.','Orientation depends on sine versus cosine.']}
    ],
    workedExamples:[
      {title:'Count rose petals',problem:'Analyze r=5cos(4θ).',steps:['n=4 is even.','Even n gives 2n=8 petals.','Maximum radial length is 5.'],answer:'8 petals, each reaching radius 5.'},
      {title:'Read a lemniscate',problem:'Analyze r²=16sin(2θ).',steps:['The form is a lemniscate.','Sine rotates the lobes onto diagonal directions.','Maximum |r| occurs when sin(2θ)=1, so |r|=4.'],answer:'Diagonal lemniscate with maximum radius 4.'}
    ],
    commonMistakes:[{mistake:'Always doubling n for rose curves.',fix:'Double n only when n is even; odd n gives exactly n petals.'},{mistake:'Treating r²=a²cos2θ as a rose because of the 2θ.',fix:'The r² form signals a lemniscate; rose equations use r, not r².'}],
    alternateExplanation:'The angle multiplier controls how rapidly the radial pattern repeats while θ makes one rotation. Roses repeat into petals; lemniscates use a squared radius rule that creates two connected lobes.',
    application:'Repeated-lobe polar graphs provide simple mathematical models for directional response patterns in antennas, acoustics, optics, and rotating sensing systems.',
    teacherTip:'Have the student circle two pieces before graphing: whether the left side is r or r², and the multiplier on θ. Those two marks separate roses from lemniscates and determine most key features.',
    generators:{easy:['u9:rosePetals','u9:roseMaxRadius'],standard:['u9:rosePetals','u9:roseMaxRadius','u9:lemniscateOrientation','u9:lemniscateMaxRadius'],challenge:['u9:rosePetals','u9:lemniscateOrientation','u9:lemniscateMaxRadius']},
    guidedPractice:['u9:rosePetals','u9:roseMaxRadius','u9:lemniscateOrientation'],independentPractice:['u9:rosePetals','u9:roseMaxRadius','u9:lemniscateOrientation','u9:lemniscateMaxRadius'],mastery:['u9:rosePetals','u9:lemniscateOrientation','u9:lemniscateMaxRadius']
  }),
  authoredLesson({
    id:'9.12',title:'Polar Modeling / Applications',estimatedMinutes:65,teks:['P.3B','P.3C','P.3D','P.3E'],
    summary:'Use polar representations in navigation, sensing, and directional-pattern contexts, convert measurements when needed, and choose an equation family that matches the geometry of a real situation.',
    objectives:['Convert range-and-angle measurements into rectangular positions.','Select polar graph families for directional patterns.','Interpret radius as a context-dependent measured quantity.'],
    prerequisites:['Lessons 9.5–9.11.','Coordinate conversion.','Special polar graph recognition.'],
    keyIdeas:['Polar coordinates are natural when a measurement originates from a central point.','The meaning of r depends on context: distance, signal strength, response, or another radial quantity.','Model choice should follow geometry and symmetry.'],
    formulas:['x=r cosθ, y=r sinθ','Directional model example: r=a+b cosθ'],
    sections:[
      {title:'Range and bearing become coordinates',paragraphs:['A rotating sensor often reports distance and direction directly. Those are polar data. Converting to x and y places the observation on a rectangular map or screen.'],bullets:['Identify angle convention first.','Use units consistently.','Convert only when the rectangular view is useful.']},
      {title:'Polar graphs can model directional response',paragraphs:['In some applications, r is not physical distance to an object but strength measured in a direction. Rose and limaçon shapes can represent repeated or biased directional responses.'],bullets:['Angle is measurement direction.','Radius is response magnitude.','Symmetry should match the physical system.']},
      {title:'Evaluate the model, not just the formula',paragraphs:['A useful model should be interpreted. Ask whether negative r has physical meaning, whether all angles are relevant, and whether the symmetry and maximum values make sense in context.'],bullets:['State the parameter/angle domain.','Interpret extrema in context.','Check whether the model’s geometry matches reality.']}
    ],
    workedExamples:[
      {title:'Radar conversion',problem:'A target is 20 km away at θ=π/3. Find rectangular coordinates.',steps:['x=20cosπ/3=10.','y=20sinπ/3=10√3≈17.32.'],answer:'Approximately (10,17.32) km.'},
      {title:'Choose a response family',problem:'A device has eight equally spaced sensitivity lobes.',steps:['Repeated equally spaced lobes suggest a rose curve.','For r=a cos(nθ), even n produces 2n petals.','Choose n=4 to produce 8 petals.'],answer:'A model such as r=a cos(4θ).'}
    ],
    commonMistakes:[{mistake:'Assuming r always means physical distance.',fix:'In a polar model, r is whatever radial quantity the context defines; read units and labels.'},{mistake:'Choosing a graph family only because it “looks similar.”',fix:'Match symmetry, number of lobes, maxima, and orientation to the physical conditions.'}],
    alternateExplanation:'Polar modeling is centered modeling. Whenever the important question is “how much, how far, or how strong in this direction from one center?”, polar variables may describe the situation more directly than x and y.',
    application:'Radar, sonar, directional microphones, antenna sensitivity, rotating scanners, navigation, and orbital/rotational descriptions all motivate polar or angle-based representations.',
    teacherTip:'Make the student write one sentence defining r and one sentence defining θ before doing algebra. Context errors usually begin when those meanings are left implicit.',
    generators:{easy:['u9:polarNavigation','u9:polarPatternApplication'],standard:['u9:polarNavigation','u9:polarPatternApplication','u9:polarFamilyIdentify'],challenge:['u9:polarNavigation','u9:polarPatternApplication','u9:limaconClassify','u9:rosePetals']},
    guidedPractice:['u9:polarNavigation','u9:polarPatternApplication'],independentPractice:['u9:polarNavigation','u9:polarPatternApplication','u9:polarFamilyIdentify','u9:limaconClassify'],mastery:['u9:polarNavigation','u9:polarPatternApplication','u9:polarFamilyIdentify']
  }),
  authoredLesson({
    id:'9.13',title:'Unit Review / Assessment',estimatedMinutes:75,teks:unitTeks,
    summary:'Synthesize the entire final unit by moving confidently among parametric, rectangular, and polar representations; interpreting direction and parameter meaning; and recognizing special polar graphs.',
    objectives:['Evaluate, graph, and eliminate simple parametric equations.','Convert points and equations between rectangular and polar forms.','Recognize and analyze special polar graph families.'],
    prerequisites:['Lessons 9.1–9.12.','Trigonometric exact values.','Algebraic substitution and graph interpretation.'],
    keyIdeas:['Choose the representation that preserves the information the problem needs.','Conversions are built from a small set of coordinate identities.','Special polar graph equations encode symmetry and shape in their structure.'],
    formulas:['x=r cosθ, y=r sinθ, r²=x²+y²','Parametric pair: x=f(t), y=g(t)'],
    sections:[
      {title:'Parametric review strategy',paragraphs:['For parametric work, identify the parameter domain, evaluate synchronized coordinates, mark direction, and eliminate t only when a rectangular relationship is useful.'],bullets:['Same t in both coordinates.','Direction follows increasing t.','Keep restrictions after elimination.']},
      {title:'Polar review strategy',paragraphs:['For polar work, separate point conversion, equation conversion, and graph-family recognition. Those are related but require different first moves.'],bullets:['Points: x=r cosθ, y=r sinθ.','Equations: use x, y, r² identities.','Graphs: classify family and symmetry before tabulating.']},
      {title:'Representation choice is the big idea',paragraphs:['The unit is not about replacing rectangular coordinates. It is about choosing a language that exposes the structure you care about: timing and direction for parametric motion, central distance and direction for polar geometry, or familiar algebraic relationships in rectangular form.'],bullets:['Parametric preserves progression.','Polar emphasizes a center and angle.','Rectangular emphasizes horizontal/vertical relation.']}
    ],
    workedExamples:[
      {title:'Mixed parametric review',problem:'x=t+1, y=t²−4. Eliminate t.',steps:['t=x−1.','Substitute into y: y=(x−1)²−4.','Keep any original t restrictions separately.'],answer:'y=(x−1)²−4'},
      {title:'Mixed polar review',problem:'Classify r=3+3sinθ and state its orientation.',steps:['a=b, so the curve is a cardioid.','Sine aligns it vertically.','The positive sign points the main lobe upward.'],answer:'Upward-facing cardioid.'}
    ],
    commonMistakes:[{mistake:'Using the right formula in the wrong representation.',fix:'Identify whether the problem is asking about a parametric pair, a polar point/equation, or a rectangular equation before selecting identities.'},{mistake:'Memorizing polar pictures without reading coefficients.',fix:'Use equation family, coefficient ratio, angle multiplier, and sine/cosine orientation to reconstruct the graph logically.'}],
    alternateExplanation:'Think of Unit 9 as learning three map languages. Parametric maps add a timeline, polar maps organize space around a center, and rectangular maps organize space around perpendicular axes. Fluency means translating and choosing among them.',
    application:'The final unit ties the course together by showing that mathematical objects can have multiple useful representations, a central habit for calculus, physics, engineering, graphics, and data modeling.',
    teacherTip:'For review sessions, alternate representations instead of drilling one type for too long. Interleaving parametric, polar-conversion, and special-graph questions tests whether the student can choose a method independently.',
    generators:{easy:['u9:paramEvaluateLinear','u9:polarParts','u9:polarAxisPlot','u9:rosePetals'],standard:['u9:paramGraphIdentify','u9:eliminateLinear','u9:rectToPolar345','u9:polarCircleToRect','u9:polarFamilyIdentify','u9:limaconClassify','u9:paramVsPolar'],challenge:['u9:eliminateParabola','u9:eliminateCircle','u9:rectToPolarAngle','u9:polarCircleToRect','u9:polarSymmetry','u9:lemniscateOrientation','u9:paramVsPolar']},
    guidedPractice:['u9:paramEvaluateLinear','u9:eliminateLinear','u9:polarToRectSpecial','u9:polarFamilyIdentify'],independentPractice:['u9:paramGraphIdentify','u9:eliminateParabola','u9:projectilePosition','u9:rectToPolarAngle','u9:polarCircleToRect','u9:limaconClassify','u9:rosePetals','u9:paramVsPolar'],mastery:['u9:eliminateCircle','u9:projectilePosition','u9:rectToPolarAngle','u9:polarCircleToRect','u9:polarSymmetry','u9:limaconClassify','u9:lemniscateOrientation','u9:paramVsPolar']
  })
];

export default authoredUnit(9,'Parametric Equations and Polar Coordinates','~4 weeks',unitTeks,lessons);
