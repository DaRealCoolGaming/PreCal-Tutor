import '../js/generators-unit7.js';
import { authoredLesson, authoredUnit } from './lesson-schema.js';

const unitTeks = ['P.4G','P.4H','P.4I','P.4J','P.4K'];

const lessons = [
  authoredLesson({
    id:'7.1', title:'Oblique Triangles', estimatedMinutes:55, teks:['P.4G','P.4H'],
    summary:'Learn how oblique triangles differ from right triangles, organize side-angle notation, identify which information pattern is given, and choose between the Law of Sines and Law of Cosines before doing any calculation.',
    objectives:['Classify a triangle as acute, right, or obtuse from angle measures.','Use standard side-angle notation correctly.','Choose an efficient solution method from ASA, AAS, SAS, SSS, or SSA data.'],
    prerequisites:['Triangle angle sum of 180°.','Right-triangle trigonometric ratios.','Inverse sine and inverse cosine from earlier trig units.'],
    keyIdeas:['An oblique triangle has no right angle.','Lowercase side a lies opposite uppercase angle A, and similarly for b/B and c/C.','Law of Sines needs an opposite side-angle pair; Law of Cosines is strongest for SAS and SSS.'],
    formulas:['A+B+C=180°','a↔A, b↔B, c↔C'],
    sections:[
      {title:'Right-triangle tools are no longer enough',paragraphs:['SOH-CAH-TOA is built around a right angle. In an oblique triangle, no angle is 90°, so the familiar opposite-adjacent-hypotenuse structure does not exist. Instead, we use relationships that work for general triangles: the Law of Sines and Law of Cosines.'],bullets:['Acute oblique triangles have three angles below 90°.','Obtuse oblique triangles have exactly one angle above 90°.','Sketching and labeling before calculating prevents many notation mistakes.']},
      {title:'Read the data pattern before choosing a law',paragraphs:['Triangle problems become much easier when you classify the known information. ASA and AAS usually provide an opposite side-angle pair after finding the third angle, so Law of Sines is natural. SAS and SSS usually point to Law of Cosines. SSA deserves special care because it can create zero, one, or two valid triangles.'],bullets:['ASA/AAS → usually Law of Sines.','SAS/SSS → usually Law of Cosines.','SSA → Law of Sines plus an ambiguity check.']},
      {title:'Use notation as a reasoning tool',paragraphs:['The side opposite angle A is side a. This pairing is not cosmetic: both sine and cosine laws depend on matching sides with their opposite angles. A clean labeled sketch lets you see those relationships instead of trying to hold them mentally.'],bullets:['Write known values directly on a sketch.','Circle any known opposite pair.','Mark the quantity the problem asks you to find.']}
    ],
    workedExamples:[
      {title:'Choose a method',problem:'A triangle has a=8, b=11, and C=54°. Which law should you use first?',steps:['The known angle C lies between sides a and b.','That is SAS information.','SAS is the natural Law of Cosines pattern.'],answer:'Law of Cosines'},
      {title:'Complete the angle data',problem:'A=46° and B=71°. Find C and identify the triangle by angle.',steps:['C=180°−46°−71°=63°.','All three angles are below 90°.'],answer:'C=63°; acute oblique triangle'}
    ],
    commonMistakes:[{mistake:'Using SOH-CAH-TOA on a triangle with no right angle.',fix:'Use a general-triangle law unless you deliberately create a right triangle with an altitude.'},{mistake:'Pairing side a with the nearest-looking angle instead of angle A.',fix:'Opposite side-angle labels are fixed: a↔A, b↔B, c↔C.'}],
    alternateExplanation:'Think of oblique-triangle solving as choosing the right bridge. If you can see an opposite side-angle pair, Law of Sines gives a direct proportion. If the information is built around sides and an included angle, Law of Cosines connects those measurements directly.',
    application:'Surveying, navigation, construction layouts, and distance measurements often form triangles that are not right triangles. Recognizing the data pattern first prevents unnecessary calculations and lets you choose the shortest reliable method.',
    teacherTip:'Before touching a calculator, force a three-line setup: draw the triangle, label knowns, then write ASA/AAS/SAS/SSS/SSA. This habit prevents most law-selection errors.',
    generators:{easy:['u7:obliqueClassify','u7:triangleMissingAngle'],standard:['u7:triangleMissingAngle','u7:chooseTriangleLaw','u7:obliqueClassify'],challenge:['u7:chooseTriangleLaw','u7:triangleMissingAngle']}
  }),
  authoredLesson({
    id:'7.2', title:'Law of Sines', estimatedMinutes:70, teks:['P.4G'],
    summary:'Use the Law of Sines to solve ASA, AAS, and SSA triangles, match every side with its opposite angle, and handle the ambiguous SSA case by checking whether a supplementary angle creates a second valid triangle.',
    objectives:['Solve for missing sides using Law of Sines.','Solve for missing angles using inverse sine.','Determine whether SSA data creates zero, one, or two triangles.'],
    prerequisites:['Lesson 7.1 notation and triangle classification.','Solving proportions.','Inverse sine and the identity sinθ=sin(180°−θ).'],
    keyIdeas:['Law of Sines compares side lengths to sines of opposite angles.','A known opposite pair anchors the proportion.','SSA is ambiguous because sine has the same positive value for supplementary angles.'],
    formulas:['a/sinA=b/sinB=c/sinC','sinB=(b sinA)/a'],
    sections:[
      {title:'Build the proportion from opposite pairs',paragraphs:['Do not memorize the law as a string of letters. Read each fraction as “side divided by sine of its opposite angle.” Once one full opposite pair is known, pair it with the side or angle you need. This keeps the setup compact and reduces label-swapping errors.'],bullets:['Use only two fractions when two are enough.','Solve symbolically before substituting if the algebra feels crowded.','Keep calculator mode in degrees when the problem uses degrees.']},
      {title:'Finding an angle introduces an inverse function',paragraphs:['When the unknown is an angle, isolate its sine first and then apply inverse sine. The resulting calculator angle is only the principal candidate. In ASA/AAS that is usually enough because the remaining angle sum controls the geometry. In SSA, however, a supplementary angle may also work.'],bullets:['Compute sinB first.','Use B=sin⁻¹(value).','For SSA, also test 180°−B.']},
      {title:'Treat the ambiguous case as a geometry check',paragraphs:['If the supplementary angle plus the known angle is less than 180°, a second triangle may exist. If the sum reaches or exceeds 180°, that candidate is impossible. The ambiguity is not a calculator glitch; it comes from the fact that two different angles can share the same positive sine.'],bullets:['First candidate: inverse sine result.','Second candidate: 180°−first candidate.','Reject candidates that leave no positive third angle.']}
    ],
    workedExamples:[
      {title:'Find a missing side',problem:'A=42°, B=73°, and a=9. Find b.',steps:['Write 9/sin42°=b/sin73°.','Solve b=9sin73°/sin42°.','b≈12.86.'],answer:'b≈12.86'},
      {title:'Check SSA ambiguity',problem:'A=35°, a=10, b=12. Explain the angle check for B.',steps:['Compute sinB=12sin35°/10.','Find the principal B with inverse sine.','Also test 180°−B.','Keep only candidates for which A+B<180°.'],answer:'Test both B and 180°−B'}
    ],
    commonMistakes:[{mistake:'Pairing a side with an adjacent angle.',fix:'Every Law of Sines fraction uses a side and its opposite angle.'},{mistake:'Accepting the inverse-sine angle automatically in SSA.',fix:'Check the supplementary angle and the triangle angle sum before deciding how many solutions exist.'}],
    alternateExplanation:'Imagine each opposite side-angle pair as a matched card. Law of Sines says the ratio on every matched card is the same. The only tricky part is that an SSA angle card may have two possible angle faces because sine repeats for supplementary angles.',
    application:'Law of Sines is useful in surveying when a baseline and sight angles are known, in navigation when bearings form an AAS triangle, and in triangulation problems where directly measuring a long distance would be difficult.',
    teacherTip:'For SSA, draw both possible shapes lightly before calculating the second triangle. Seeing the side swing to two possible positions makes the ambiguity much easier to remember.',
    generators:{easy:['u7:sineMissingSide','u7:ambiguousCase'],standard:['u7:sineMissingSide','u7:sineMissingAngle','u7:ambiguousCase'],challenge:['u7:sineMissingAngle','u7:ambiguousCase']},
    interactive:{type:'triangle',title:'Oblique triangle explorer'}
  }),
  authoredLesson({
    id:'7.3', title:'Law of Cosines', estimatedMinutes:70, teks:['P.4H'],
    summary:'Use the Law of Cosines for SAS and SSS triangles, interpret it as a generalized Pythagorean Theorem, and solve for either a missing side or angle while maintaining correct opposite-side notation.',
    objectives:['Solve an SAS triangle side using Law of Cosines.','Solve an SSS triangle angle using inverse cosine.','Explain how the formula reduces to the Pythagorean Theorem when the included angle is 90°.'],
    prerequisites:['Lesson 7.1 side-angle notation.','Square roots and inverse cosine.','Pythagorean Theorem.'],
    keyIdeas:['For c²=a²+b²−2ab cosC, side c is opposite angle C.','SAS finds the third side directly.','SSS finds an angle by rearranging the cosine law.'],
    formulas:['c²=a²+b²−2ab cosC','cosC=(a²+b²−c²)/(2ab)'],
    sections:[
      {title:'See the Pythagorean connection',paragraphs:['If C=90°, then cos90°=0, so the correction term disappears and c²=a²+b². For acute angles the cosine term is positive, reducing c²; for obtuse angles cosine is negative, so subtracting the term increases c². This gives the formula geometric meaning instead of making it look arbitrary.'],bullets:['Right angle → ordinary Pythagorean Theorem.','Acute included angle → opposite side tends to be shorter.','Obtuse included angle → opposite side tends to be longer.']},
      {title:'SAS: find the side opposite the known angle',paragraphs:['With two sides and their included angle, name the unknown opposite side first. Then write the version of the cosine law using that side and angle. Square carefully, evaluate cosine in degree mode, and take the positive square root because side lengths are positive.'],bullets:['Included angle must match the opposite unknown side.','Do not drop the square root at the end.','Keep extra calculator digits until the final rounding.']},
      {title:'SSS: isolate cosine before using inverse cosine',paragraphs:['When all three sides are known, rearrange the law so cosC stands alone. The ratio should land between −1 and 1 for a valid triangle. Applying inverse cosine then recovers the angle. Repeat only if additional angles are required.'],bullets:['Choose the angle you want and its opposite side.','Isolate cosine algebraically.','Use a reasonableness check: largest side faces largest angle.']}
    ],
    workedExamples:[
      {title:'SAS side',problem:'a=7, b=10, C=58°. Find c.',steps:['c²=7²+10²−2(7)(10)cos58°.','c²≈74.81.','c≈8.65.'],answer:'c≈8.65'},
      {title:'SSS angle',problem:'a=8, b=11, c=13. Find C.',steps:['cosC=(8²+11²−13²)/(2·8·11).','cosC≈0.0909.','C≈cos⁻¹(0.0909)≈84.8°.'],answer:'C≈84.8°'}
    ],
    commonMistakes:[{mistake:'Using a non-included angle with the two known sides in an SAS setup.',fix:'The angle in the product term must be the angle between the two sides used.'},{mistake:'Forgetting that the unknown side is squared.',fix:'After computing c², take the positive square root to obtain the side length.'}],
    alternateExplanation:'Think of Law of Cosines as the Pythagorean Theorem with an angle correction. The term −2ab cosC adjusts the right-triangle relationship based on whether the included angle closes the sides together or spreads them farther apart.',
    application:'Distances between two routes, structural braces, triangulated land measurements, and any problem with two known lengths plus an included angle are natural Law of Cosines situations.',
    teacherTip:'Have the learner point physically to the included angle and then to the opposite side before writing the formula. That two-second gesture prevents many letter-matching errors.',
    generators:{easy:['u7:cosineLawRecognize','u7:cosineMissingSide'],standard:['u7:cosineMissingSide','u7:cosineMissingAngle','u7:cosineLawRecognize'],challenge:['u7:cosineMissingAngle','u7:cosineMissingSide']},
    interactive:{type:'triangle',title:'Law of Cosines explorer'}
  }),
  authoredLesson({
    id:'7.4', title:'Applications of Oblique Triangles', estimatedMinutes:75, teks:['P.4G','P.4H'],
    summary:'Translate surveying, bearings, distance, and area situations into labeled oblique triangles, choose the appropriate law from the data pattern, and interpret the computed result with units and geometric context.',
    objectives:['Create a labeled triangle model from a word problem.','Use Laws of Sines/Cosines appropriately in applications.','Find triangle area from two sides and an included angle.'],
    prerequisites:['Lessons 7.1–7.3.','Directional angles and bearings from Unit 5.','Unit conversions and rounding.'],
    keyIdeas:['A correct diagram is often the hardest and most important step.','Two sides plus an included angle can find either area or a third side.','Real-world answers require units and a plausibility check.'],
    formulas:['K=½ab sinC','c²=a²+b²−2ab cosC','a/sinA=b/sinB'],
    sections:[
      {title:'Model before calculating',paragraphs:['Word problems hide the triangle inside a story. Identify locations as vertices, traveled or measured distances as sides, and bearings or sight angles as angles. Once the picture is labeled, the problem becomes the same mathematics as Lessons 7.2 and 7.3.'],bullets:['Convert bearings into included angles when needed.','Write units on side labels.','Mark the requested distance or angle clearly.']},
      {title:'Choose the law from the geometry, not the story vocabulary',paragraphs:['Words such as “boat,” “tower,” or “survey” do not determine the method. The known measurements do. A baseline and two sight angles suggest Law of Sines; two travel distances with an included heading change suggest Law of Cosines.'],bullets:['AAS/ASA → Sines.','SAS/SSS → Cosines.','Two sides plus included angle → area formula is available too.']},
      {title:'Interpret the result',paragraphs:['A calculator output is not a finished application answer. State the measurement with units, round appropriately, and ask whether it fits the drawing. A separation distance larger than both sides may be reasonable for an obtuse included angle but suspicious for a very small angle.'],bullets:['Keep guard digits until the final step.','Include units.','Use the sketch to sanity-check magnitude and direction.']}
    ],
    workedExamples:[
      {title:'Endpoint separation',problem:'Two hikers leave camp on routes 8 km and 11 km long with a 67° included angle. Find their separation.',steps:['Use Law of Cosines with sides 8 and 11 and included angle 67°.','d²=8²+11²−2(8)(11)cos67°.','d≈10.78 km.'],answer:'≈10.78 km'},
      {title:'Area from SAS',problem:'A triangular plot has sides 120 m and 85 m with included angle 52°. Find the area.',steps:['K=½ab sinC.','K=½(120)(85)sin52°.','K≈4018.85 m².'],answer:'≈4018.85 m²'}
    ],
    commonMistakes:[{mistake:'Using compass bearing numbers directly as interior angles without checking the diagram.',fix:'Translate each direction into the actual angle between routes before choosing a formula.'},{mistake:'Reporting a bare decimal.',fix:'State what the number measures, include units, and round only at the end.'}],
    alternateExplanation:'Treat every application as a translation exercise: story → labeled triangle → data pattern → formula → interpreted result. The trigonometry itself usually becomes routine once the translation is accurate.',
    application:'This is the application lesson: land surveying, navigation, indirect distance measurement, route separation, and triangular area are exactly the kinds of situations the oblique-triangle laws were designed to solve.',
    teacherTip:'If a story feels confusing, temporarily replace place names with A, B, and C. Solve the geometry first, then translate the result back into the original context.',
    generators:{easy:['u7:triangleApplicationLaw','u7:triangleAreaSAS'],standard:['u7:triangleAreaSAS','u7:bearingDistance','u7:triangleApplicationLaw'],challenge:['u7:bearingDistance','u7:triangleAreaSAS']},
    interactive:{type:'triangle',title:'Triangle distance and area explorer'}
  }),
  authoredLesson({
    id:'7.5', title:'Introduction to Vectors', estimatedMinutes:55, teks:['P.4I'],
    summary:'Distinguish vectors from scalars, represent directed quantities with arrows and component notation, and convert a directed segment between two points into a vector by subtracting initial coordinates from terminal coordinates.',
    objectives:['Explain the difference between scalar and vector quantities.','Represent vectors geometrically and in component form.','Find the vector from an initial point to a terminal point.'],
    prerequisites:['Coordinate-plane displacement.','Signed numbers.','Distance and direction vocabulary.'],
    keyIdeas:['A vector has magnitude and direction; a scalar has magnitude only.','Vectors can be translated without changing them as long as length and direction stay fixed.','From P to Q, component form is Q−P.'],
    formulas:['⟨a,b⟩ = horizontal/vertical components','PQ = ⟨x₂−x₁, y₂−y₁⟩'],
    sections:[
      {title:'Magnitude plus direction creates a vector',paragraphs:['Speed is a scalar because 40 km/h says how fast but not where. Velocity is a vector because 40 km/h east includes both size and direction. Forces, displacements, and many physical motions are naturally vector quantities.'],bullets:['Scalar: magnitude only.','Vector: magnitude and direction.','Changing direction changes the vector even if magnitude stays the same.']},
      {title:'Arrows and components describe the same object',paragraphs:['Geometrically, a vector is drawn as a directed arrow. Algebraically, ⟨a,b⟩ records its horizontal and vertical changes. Sliding the arrow to another position without rotating or stretching it creates an equivalent vector.'],bullets:['First component = horizontal change.','Second component = vertical change.','Equivalent vectors share components even if drawn elsewhere.']},
      {title:'Terminal minus initial',paragraphs:['For a vector from P(x₁,y₁) to Q(x₂,y₂), subtract initial coordinates from terminal coordinates. This subtraction records exactly how far you move horizontally and vertically to get from P to Q.'],bullets:['x change = x₂−x₁.','y change = y₂−y₁.','Order matters because reversing the path negates the vector.']}
    ],
    workedExamples:[
      {title:'Vector from points',problem:'Find the vector from P(−2,3) to Q(5,−1).',steps:['Horizontal change: 5−(−2)=7.','Vertical change: −1−3=−4.'],answer:'⟨7,−4⟩'},
      {title:'Scalar or vector?',problem:'Classify “18 m/s southwest.”',steps:['18 m/s gives magnitude.','Southwest gives direction.','Both are present.'],answer:'vector'}
    ],
    commonMistakes:[{mistake:'Using initial minus terminal coordinates.',fix:'The vector from P to Q is always Q−P: terminal minus initial.'},{mistake:'Treating speed and velocity as interchangeable.',fix:'Speed is scalar; velocity includes direction and is therefore a vector.'}],
    alternateExplanation:'A vector is an instruction for movement: “go this far horizontally and this far vertically.” The same instruction works no matter where you place its starting point, which is why vectors can slide around the plane without changing identity.',
    application:'Wind velocity, force, acceleration, displacement, and navigation all require direction as well as magnitude. Vector notation gives a compact mathematical language for combining those effects.',
    teacherTip:'Have the learner physically trace from initial to terminal point and say “right/left, then up/down” before subtracting coordinates. The component signs become intuitive instead of memorized.',
    generators:{easy:['u7:vectorDefinition','u7:vectorScalarVsVector'],standard:['u7:vectorFromPoints','u7:vectorDefinition','u7:vectorScalarVsVector'],challenge:['u7:vectorFromPoints','u7:vectorScalarVsVector']},
    interactive:{type:'vector',title:'Vector explorer'}
  }),
  authoredLesson({
    id:'7.6', title:'Vector Components', estimatedMinutes:65, teks:['P.4I'],
    summary:'Resolve magnitude-and-direction descriptions into horizontal and vertical components, interpret component signs geometrically, and use component form to move between points or rebuild a vector from its direction angle.',
    objectives:['Convert magnitude and direction into component form.','Interpret signs and sizes of vector components.','Apply a component vector to a starting point.'],
    prerequisites:['Lesson 7.5 vector notation.','Sine and cosine of angles.','Quadrant signs.'],
    keyIdeas:['For standard direction angle θ, v=⟨r cosθ,r sinθ⟩.','Cosine controls horizontal contribution; sine controls vertical contribution.','Component signs encode left/right and up/down direction.'],
    formulas:['v=⟨r cosθ, r sinθ⟩','endpoint = start + vector'],
    sections:[
      {title:'Resolve a directed magnitude into x and y',paragraphs:['A vector of magnitude r at standard angle θ forms a right triangle with its horizontal and vertical components. The horizontal leg is r cosθ and the vertical leg is r sinθ. This is the same trigonometry from right triangles, now used to describe motion.'],bullets:['x=r cosθ.','y=r sinθ.','Standard angle is measured counterclockwise from +x.']},
      {title:'Let the quadrant determine the signs',paragraphs:['The formulas automatically produce the correct signs if the angle is entered correctly. A vector in Quadrant II has negative x and positive y; Quadrant IV has positive x and negative y. Those signs are meaningful directions, not errors to remove.'],bullets:['Negative x = left.','Negative y = down.','Do not take absolute values unless a magnitude is specifically requested.']},
      {title:'Components also move points',paragraphs:['If a vector ⟨a,b⟩ starts at (x,y), its endpoint is (x+a,y+b). This connects vector notation to coordinate geometry and makes component form especially useful for modeling displacement step by step.'],bullets:['Starting coordinate + component = ending coordinate.','A component vector is a displacement instruction.','Multiple displacements can later be added componentwise.']}
    ],
    workedExamples:[
      {title:'Magnitude and direction to components',problem:'Find components of a vector with magnitude 10 at 30°.',steps:['x=10cos30°=5√3≈8.66.','y=10sin30°=5.'],answer:'⟨8.66,5⟩ approximately'},
      {title:'Apply a displacement',problem:'Start at (−3,4) and apply vector ⟨6,−2⟩.',steps:['x: −3+6=3.','y: 4−2=2.'],answer:'endpoint (3,2)'}
    ],
    commonMistakes:[{mistake:'Swapping sine and cosine components.',fix:'For a standard angle from +x, cosine is horizontal and sine is vertical.'},{mistake:'Discarding negative component signs.',fix:'Signs carry directional information; only magnitude is always nonnegative.'}],
    alternateExplanation:'Picture the vector arrow casting two shadows: one on the x-axis and one on the y-axis. Cosine gives the horizontal shadow and sine gives the vertical shadow. Together, those shadows reconstruct the original arrow.',
    application:'Pilots, boaters, robotics systems, and physics simulations routinely decompose a directed speed or force into horizontal and vertical components so independent effects can be combined mathematically.',
    teacherTip:'Whenever components feel abstract, draw the vector as the hypotenuse of a right triangle. Label the angle at the origin and let ordinary sine/cosine identify the legs.',
    generators:{easy:['u7:componentMeaning','u7:vectorEndpoint'],standard:['u7:componentsFromMagnitude','u7:vectorEndpoint','u7:componentMeaning'],challenge:['u7:componentsFromMagnitude','u7:vectorEndpoint']},
    interactive:{type:'vector',title:'Component explorer'}
  }),
  authoredLesson({
    id:'7.7', title:'Vector Magnitude & Direction', estimatedMinutes:65, teks:['P.4I'],
    summary:'Recover a vector’s magnitude and standard direction angle from its components, use quadrant-aware inverse tangent reasoning, and normalize vectors to unit length when only direction should remain.',
    objectives:['Compute vector magnitude from components.','Find a standard direction angle from x/y components.','Construct a unit vector in the same direction.'],
    prerequisites:['Vector components.','Pythagorean Theorem.','Inverse tangent and quadrant signs.'],
    keyIdeas:['Magnitude is √(x²+y²).','Direction uses tangent but must respect the vector’s quadrant.','A unit vector is v/|v| and has magnitude 1.'],
    formulas:['|v|=√(a²+b²)','θ=atan2(b,a) or quadrant-adjusted tan⁻¹(b/a)','u=v/|v|'],
    sections:[
      {title:'Magnitude comes from a right triangle',paragraphs:['The components of ⟨a,b⟩ form perpendicular legs, so the vector itself is the hypotenuse. The Pythagorean Theorem therefore gives |v|=√(a²+b²). Squaring removes component signs, which is appropriate because magnitude is always nonnegative.'],bullets:['Magnitude measures length only.','Opposite vectors have equal magnitude.','A zero vector has magnitude 0 and no unique direction.']},
      {title:'Direction needs quadrant awareness',paragraphs:['The reference angle can be found from inverse tangent, but tan⁻¹ alone often returns an angle between −90° and 90°. Use component signs to place the vector in the correct quadrant, or use an atan2-style calculation that handles the quadrant automatically.'],bullets:['(+,+) → Quadrant I.','(−,+) → Quadrant II.','(−,−) → Quadrant III; (+,−) → Quadrant IV.']},
      {title:'Normalize when direction matters more than size',paragraphs:['Dividing a nonzero vector by its magnitude produces a unit vector pointing in the same direction. This strips away scale while preserving direction, which is useful when a separate scalar will later determine the desired magnitude.'],bullets:['u=v/|v|.','Unit vectors have magnitude 1.','Multiplying a unit vector by r creates magnitude r in the same direction.']}
    ],
    workedExamples:[
      {title:'Magnitude and angle',problem:'For v=⟨−3,4⟩, find magnitude and direction.',steps:['|v|=√(9+16)=5.','The vector is in Quadrant II.','Reference angle tan⁻¹(4/3)≈53.13°.','Direction≈180°−53.13°=126.87°.'],answer:'|v|=5, θ≈126.9°'},
      {title:'Unit vector',problem:'Find a unit vector in the direction of ⟨5,12⟩.',steps:['Magnitude=13.','Divide both components by 13.'],answer:'⟨5/13,12/13⟩'}
    ],
    commonMistakes:[{mistake:'Using tan⁻¹(y/x) and accepting the calculator angle without a quadrant check.',fix:'Use component signs to place the direction in standard position, or use atan2.'},{mistake:'Dividing only one component when forming a unit vector.',fix:'Divide the entire vector, meaning every component, by the same magnitude.'}],
    alternateExplanation:'Components tell you “how much east/west” and “how much north/south.” Magnitude recombines those perpendicular changes into total length; direction tells you which way the resulting arrow points.',
    application:'Navigation systems routinely convert between component velocities and speed/direction displays. Unit vectors also provide direction templates for forces, rays, and movement commands in engineering and computer graphics.',
    teacherTip:'For direction angles, sketch the vector before touching inverse tangent. A five-second quadrant sketch prevents the most common 180° error.',
    generators:{easy:['u7:vectorMagnitude','u7:unitVector'],standard:['u7:vectorMagnitude','u7:vectorDirection','u7:unitVector'],challenge:['u7:vectorDirection','u7:unitVector']},
    interactive:{type:'vector',title:'Magnitude and direction explorer'}
  }),
  authoredLesson({
    id:'7.8', title:'Vector Operations', estimatedMinutes:65, teks:['P.4J'],
    summary:'Add, subtract, and scale vectors symbolically and geometrically, connect componentwise arithmetic to tip-to-tail diagrams, and interpret how scalar multiplication changes magnitude and possibly reverses direction.',
    objectives:['Add and subtract vectors in component form.','Represent vector addition geometrically with the tip-to-tail rule.','Multiply a vector by a scalar and describe the geometric effect.'],
    prerequisites:['Lessons 7.5–7.7.','Signed-number arithmetic.','Coordinate-plane translations.'],
    keyIdeas:['Vector addition and subtraction operate component by component.','Tip-to-tail geometry represents the same addition as component arithmetic.','Multiplying by k scales magnitude by |k|; negative k reverses direction.'],
    formulas:['⟨a,b⟩+⟨c,d⟩=⟨a+c,b+d⟩','k⟨a,b⟩=⟨ka,kb⟩'],
    sections:[
      {title:'Add effects componentwise',paragraphs:['If one vector contributes horizontal/vertical changes ⟨a,b⟩ and another contributes ⟨c,d⟩, their combined effect is ⟨a+c,b+d⟩. This is why vector addition is so useful for combining motions, forces, and displacements.'],bullets:['x-components combine with x-components.','y-components combine with y-components.','Subtraction is addition of the opposite vector.']},
      {title:'Tip-to-tail gives the geometric meaning',paragraphs:['To add vectors geometrically, translate the second vector so its tail begins at the first vector’s tip. The resultant runs from the original starting point to the final tip. Translating a vector does not change it because its magnitude and direction stay the same.'],bullets:['Do not rotate the second vector.','Resultant connects first tail to last tip.','Parallelogram and tip-to-tail methods agree.']},
      {title:'Scalar multiplication changes scale',paragraphs:['Multiplying by 3 triples every component and therefore triples the magnitude. Multiplying by 1/2 halves the length. A negative scalar also points the vector in the opposite direction because every component changes sign.'],bullets:['Magnitude scales by |k|.','k<0 reverses direction.','k=0 produces the zero vector.']}
    ],
    workedExamples:[
      {title:'Add vectors',problem:'u=⟨3,−5⟩ and v=⟨−2,7⟩. Find u+v.',steps:['x: 3+(−2)=1.','y: −5+7=2.'],answer:'⟨1,2⟩'},
      {title:'Scale a vector',problem:'Find −3⟨2,−4⟩ and describe the effect.',steps:['Multiply both components: ⟨−6,12⟩.','Magnitude is tripled.','Direction is reversed because the scalar is negative.'],answer:'⟨−6,12⟩; triple length and reverse direction'}
    ],
    commonMistakes:[{mistake:'Adding magnitudes instead of components.',fix:'Vectors with different directions must be combined componentwise before finding the resultant magnitude.'},{mistake:'Applying a scalar to only one component.',fix:'Scalar multiplication distributes to every component of the vector.'}],
    alternateExplanation:'Think of each vector as a pair of instructions: horizontal move and vertical move. Combining vectors simply combines each type of instruction separately. A scalar tells you to repeat, shrink, or reverse the entire instruction set.',
    application:'Force systems, repeated displacements, wind corrections, and computer movement all rely on vector addition and scaling. These operations let many separate directional effects collapse into one resultant vector.',
    teacherTip:'Switch between algebra and a quick sketch. If the component sum says the resultant points northwest but the diagram clearly points southeast, that mismatch immediately exposes a sign error.',
    generators:{easy:['u7:vectorAdd','u7:scalarMultiply'],standard:['u7:vectorAdd','u7:vectorSubtract','u7:scalarMultiply','u7:vectorGeometry'],challenge:['u7:vectorSubtract','u7:scalarMultiply','u7:vectorGeometry']},
    interactive:{type:'vector',title:'Vector operation explorer'}
  }),
  authoredLesson({
    id:'7.9', title:'Vector Applications', estimatedMinutes:75, teks:['P.4I','P.4K'],
    summary:'Model combined velocities, forces, and displacements with vectors, add or scale component forms to obtain a resultant, and translate the resulting components back into meaningful magnitude and direction.',
    objectives:['Model a real situation with component vectors.','Find a resultant using vector addition and scalar multiplication.','Interpret the resultant magnitude and direction in context.'],
    prerequisites:['Vector components, magnitude, direction, and operations.','Trigonometric component conversion.','Units and rate interpretation.'],
    keyIdeas:['Real-world effects combine as vectors when direction matters.','Add vectors first, then compute the resultant magnitude/direction.','A model is incomplete until the resulting vector is interpreted with units.'],
    formulas:['resultant = v₁+v₂+…','|v|=√(x²+y²)','v=⟨r cosθ,r sinθ⟩'],
    sections:[
      {title:'Translate each effect into a common coordinate system',paragraphs:['A plane’s air velocity and the wind cannot be combined correctly until both are expressed using compatible horizontal and vertical axes. The same is true for forces or currents. Components provide a common language for directional quantities.'],bullets:['Choose axes and state them.','Convert magnitude/direction vectors to components when necessary.','Keep units consistent.']},
      {title:'Combine first, interpret second',paragraphs:['After all vectors are in component form, add them. The component sum is the resultant vector. Only then should you compute resultant speed, force magnitude, or direction angle. Adding individual magnitudes directly is generally wrong unless all vectors point exactly the same direction.'],bullets:['Component addition gives the true net effect.','Magnitude comes after the addition.','Use quadrant-aware direction calculations.']},
      {title:'Check whether the result makes physical sense',paragraphs:['A strong current should noticeably shift a boat’s direction; equal opposite forces should cancel; scaling a displacement by two should double its magnitude. These qualitative checks catch arithmetic errors before a final answer is trusted.'],bullets:['State resultant units.','Describe direction in context.','Compare the result with the original vectors.']}
    ],
    workedExamples:[
      {title:'Boat and current',problem:'A boat moves 8 km/h east relative to the water while current moves 6 km/h north. Find ground speed and direction.',steps:['Resultant=⟨8,6⟩.','Magnitude=√(64+36)=10 km/h.','Direction=tan⁻¹(6/8)≈36.9° north of east.'],answer:'10 km/h at about 36.9° north of east'},
      {title:'Combined forces',problem:'Forces ⟨5,4⟩ N and ⟨−2,3⟩ N act together. Find the resultant.',steps:['Add components: ⟨3,7⟩ N.','Magnitude=√58≈7.62 N.','Direction≈66.8° from +x.'],answer:'⟨3,7⟩ N; magnitude≈7.62 N'}
    ],
    commonMistakes:[{mistake:'Adding speeds or force magnitudes without considering direction.',fix:'Convert to vectors and add components before calculating the resultant magnitude.'},{mistake:'Giving a component pair with no contextual interpretation.',fix:'State what the components mean and, when requested, convert the resultant to magnitude and direction.'}],
    alternateExplanation:'Imagine every force or velocity as an arrow tugging on the same point. Components tell you how much each arrow contributes horizontally and vertically. Add those contributions, and one final arrow replaces the entire collection.',
    application:'Aircraft wind correction, river-current navigation, net force, robotics, and multi-stage displacement are direct vector applications. These models are foundational in physics and engineering because directional effects rarely act alone.',
    teacherTip:'Require a “coordinate convention” sentence in application work, such as “east is +x and north is +y.” That tiny habit makes component signs much more reliable.',
    generators:{easy:['u7:scaleVectorModel','u7:vectorApplicationStrategy'],standard:['u7:resultantVelocity','u7:forceResultant','u7:vectorApplicationStrategy'],challenge:['u7:resultantVelocity','u7:forceResultant','u7:scaleVectorModel']},
    interactive:{type:'vector',title:'Resultant vector explorer'}
  }),
  authoredLesson({
    id:'7.10', title:'Unit Review / Assessment', estimatedMinutes:80, teks:unitTeks,
    summary:'Synthesize oblique-triangle and vector reasoning by selecting the correct law, solving triangle measurements, resolving and combining vectors, and interpreting modeled results instead of treating each topic as an isolated formula exercise.',
    objectives:['Choose among Laws of Sines/Cosines and vector methods from a mixed prompt.','Solve and interpret multi-step triangle and vector problems.','Identify common setup errors before they propagate through calculations.'],
    prerequisites:['Lessons 7.1–7.9.','Comfort with inverse trig functions.','Reliable signed-number and calculator work.'],
    keyIdeas:['Triangle method choice depends on known-data structure.','Vector models depend on magnitude, direction, and component operations.','A labeled diagram plus a reasonableness check is the best defense against setup errors.'],
    formulas:['a/sinA=b/sinB=c/sinC','c²=a²+b²−2ab cosC','v=⟨r cosθ,r sinθ⟩, |v|=√(x²+y²)'],
    sections:[
      {title:'Triangle review map',paragraphs:['Start by classifying the triangle data. Opposite side-angle pair available? Consider Law of Sines. SAS or SSS? Consider Law of Cosines. SSA? Use Law of Sines but check the supplementary-angle possibility. For area with two sides and included angle, K=½ab sinC may be the fastest route.'],bullets:['ASA/AAS → Sines.','SAS/SSS → Cosines.','SSA → ambiguity check.']},
      {title:'Vector review map',paragraphs:['Identify whether the problem gives components directly or magnitude/direction. Convert to components when combining effects. Perform addition or scalar multiplication componentwise, then recover magnitude/direction only after the resultant is known.'],bullets:['Components are the workhorse representation.','Magnitude is nonnegative; direction needs a quadrant check.','Scalars multiply every component.']},
      {title:'Assessment strategy',paragraphs:['The strongest review habit is not memorizing more formulas; it is slowing down for the setup. Label every triangle, state vector axes, identify units, and estimate what the answer should roughly look like. Those checks make the later arithmetic far more trustworthy.'],bullets:['Diagram first.','Formula second.','Interpret and sanity-check last.']}
    ],
    workedExamples:[
      {title:'Mixed triangle decision',problem:'Given b=14, c=19, and A=63°, what method should begin the solution?',steps:['The two known sides are adjacent to the known angle A.','This is SAS data.','Use Law of Cosines first to find a.'],answer:'Law of Cosines'},
      {title:'Mixed vector decision',problem:'A velocity of 20 m/s at 40° is combined with a wind vector ⟨−3,2⟩. What is the workflow?',steps:['Convert the 20 m/s vector to ⟨20cos40°,20sin40°⟩.','Add ⟨−3,2⟩ componentwise.','Find resultant magnitude and direction if requested.'],answer:'components → add → magnitude/direction'}
    ],
    commonMistakes:[{mistake:'Choosing a formula by topic title instead of known data.',fix:'Classify the actual information pattern before selecting Law of Sines or Cosines.'},{mistake:'Computing vector magnitude before combining vectors.',fix:'Add/scale components first; magnitude belongs to the final resultant unless the prompt asks otherwise.'}],
    alternateExplanation:'Unit 7 has one unifying idea: represent geometry in a form that makes the unknown reachable. Triangle laws translate side-angle relationships into equations; vector components translate magnitude-direction relationships into coordinate arithmetic.',
    application:'The review deliberately mixes navigation, surveying, force, and displacement contexts because real problems rarely announce which formula to use. Method selection is part of the mathematical skill.',
    teacherTip:'On the review, award yourself a setup check before arithmetic: identify the data pattern, write the governing relationship, and predict the rough scale/sign of the answer. Then calculate.',
    generators:{easy:['u7:obliqueClassify','u7:sineMissingSide','u7:cosineLawRecognize','u7:vectorDefinition','u7:vectorMagnitude','u7:vectorAdd'],standard:['u7:chooseTriangleLaw','u7:sineMissingAngle','u7:cosineMissingSide','u7:triangleAreaSAS','u7:componentsFromMagnitude','u7:vectorDirection','u7:vectorSubtract','u7:resultantVelocity'],challenge:['u7:ambiguousCase','u7:cosineMissingAngle','u7:bearingDistance','u7:componentsFromMagnitude','u7:forceResultant','u7:vectorApplicationStrategy']},
    guidedPractice:['u7:chooseTriangleLaw','u7:sineMissingSide','u7:vectorFromPoints','u7:vectorMagnitude'],
    independentPractice:['u7:sineMissingAngle','u7:cosineMissingSide','u7:triangleAreaSAS','u7:componentsFromMagnitude','u7:vectorDirection','u7:vectorAdd','u7:resultantVelocity'],
    mastery:['u7:ambiguousCase','u7:cosineMissingAngle','u7:bearingDistance','u7:vectorDirection','u7:forceResultant','u7:vectorApplicationStrategy']
  })
];

export const unit = authoredUnit(7,'Additional Trigonometry Topics','~3 weeks',unitTeks,lessons);
export default unit;
