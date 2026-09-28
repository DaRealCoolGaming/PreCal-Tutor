import '../js/generators-unit8.js';
import { authoredLesson, authoredUnit } from './lesson-schema.js';

const unitTeks=['P.3F','P.3G','P.3H','P.3I'];

const lessons=[
  authoredLesson({
    id:'8.1',title:'Introduction to Conic Sections',estimatedMinutes:55,teks:['P.3F','P.3G'],
    summary:'Build a map of the four conic families by connecting cone slices, geometric locus definitions, equation patterns, and graph shapes so later formulas feel organized rather than disconnected.',
    objectives:['Recognize circles, parabolas, ellipses, and hyperbolas from geometric descriptions.','Connect each conic to a characteristic standard-form equation pattern.','Use the number and signs of squared variables to make an initial classification.'],
    prerequisites:['Coordinate-plane graph vocabulary.','Distance and midpoint ideas.','Squaring and square roots.'],
    keyIdeas:['Conics are related because they can all be created by slicing a double cone.','A parabola uses one squared coordinate variable; circles, ellipses, and hyperbolas use two.','Opposite signs on squared terms signal a hyperbola; same signs signal a circle or ellipse.'],
    formulas:['Circle: (x−h)²+(y−k)²=r²','Ellipse: (x−h)²/a²+(y−k)²/b²=1','Hyperbola: (x−h)²/a²−(y−k)²/b²=1','Parabola: (x−h)²=4p(y−k) or (y−k)²=4p(x−h)'],
    sections:[
      {title:'One family, four shapes',paragraphs:['A conic section is the curve formed when a plane intersects a double-napped cone. Changing the plane changes the curve: a level slice can create a circle, a slanted closed slice creates an ellipse, a slice parallel to a generator creates a parabola, and a slice through both nappes creates a hyperbola. The common origin is useful because the four graphs share structural ideas such as centers, axes, vertices, and foci.'],bullets:['Circle: closed and equally distant from one center.','Ellipse: closed and organized around two foci.','Parabola: one focus and one directrix.','Hyperbola: two separate branches and two foci.']},
      {title:'Definitions explain the geometry',paragraphs:['The geometric definition tells you why each graph has its shape. A circle keeps one distance fixed. An ellipse keeps the sum of two focus distances fixed. A hyperbola keeps their absolute difference fixed. A parabola balances distance to a focus with distance to a line called the directrix.'],bullets:['Definitions are more durable than memorizing pictures.','Foci are not decorative labels; they encode the distance rule.','The algebraic standard forms preserve these geometric relationships.']},
      {title:'Equation patterns give a fast first classification',paragraphs:['Before completing any square, inspect the squared terms. One squared coordinate variable suggests a parabola. Two squared variables with opposite signs suggest a hyperbola. Two squared variables with the same sign suggest a circle or ellipse; equal coefficients indicate the circle case before normalization.'],bullets:['Count squared variables first.','Compare signs second.','Compare coefficients only after the sign test.']}
    ],
    workedExamples:[
      {title:'Read the pattern',problem:'Classify x²/25 + y²/9 = 1.',steps:['Both coordinate variables are squared.','Both squared terms have the same sign.','The denominators are unequal, so the graph is an ellipse rather than a circle.'],answer:'Ellipse'},
      {title:'Use the geometric definition',problem:'A curve consists of points equidistant from a fixed point and a fixed line.',steps:['One fixed point is a focus.','The fixed line is a directrix.','Equal focus/directrix distance is the defining property of a parabola.'],answer:'Parabola'}
    ],
    commonMistakes:[{mistake:'Calling every closed oval a circle.',fix:'A circle has equal radius in every direction; an ellipse generally has different major and minor axes.'},{mistake:'Using denominator size to identify a hyperbola.',fix:'The key hyperbola signal is subtraction between squared coordinate terms, not which denominator is larger.'}],
    alternateExplanation:'Think of the four conics as four distance rules. Circle: one fixed distance. Parabola: two equal distances, one to a point and one to a line. Ellipse: two-focus distances add to a constant. Hyperbola: two-focus distances differ by a constant. The equations are compact ways to store those rules.',
    application:'Conic sections appear in reflector design, orbital models, acoustic rooms, navigation regions, bridge arches, and many engineered cross-sections. This unit focuses on the algebra/geometry connection needed to recognize and graph them reliably.',
    teacherTip:'For every new conic, keep a four-column comparison chart: equation pattern, center/vertex, focus information, and graph shape. Comparing families side-by-side reduces formula confusion.',
    generators:{easy:['u8:conicByDefinition','u8:coneSlice'],standard:['u8:standardFormIdentify','u8:conicByDefinition','u8:coneSlice'],challenge:['u8:standardFormIdentify','u8:conicByDefinition']},
    guidedPractice:['u8:conicByDefinition','u8:coneSlice','u8:standardFormIdentify'],independentPractice:['u8:standardFormIdentify','u8:conicByDefinition','u8:coneSlice'],mastery:['u8:standardFormIdentify','u8:conicByDefinition']
  }),
  authoredLesson({
    id:'8.2',title:'Circles',estimatedMinutes:60,teks:['P.3F','P.3G','P.3I'],
    summary:'Read, write, and interpret circle equations by linking standard form to center, radius, diameter, points on the graph, and geometric applications.',
    objectives:['Identify center and radius from standard form.','Write a circle equation from center/radius or diameter information.','Test whether a point lies on a circle and interpret circle geometry in context.'],
    prerequisites:['Distance and midpoint formulas.','Squaring and square roots.','Function-independent equation graphing.'],
    keyIdeas:['A circle is determined by one center and one radius.','The signs inside (x−h) and (y−k) are opposite the center coordinates.','The right side is r², so radius requires a square root.'],
    formulas:['(x−h)²+(y−k)²=r²','center=(h,k)','diameter=2r'],
    sections:[
      {title:'Read standard form as geometry',paragraphs:['The standard form (x−h)²+(y−k)²=r² is a distance equation. It says the squared horizontal and vertical changes from (h,k) add to the fixed squared distance r². That is exactly the Pythagorean distance relationship from the center to any point on the circle.'],bullets:['Center coordinates come from h and k.','Radius is positive and equals √(right side).','Every point on the circle is exactly r units from the center.']},
      {title:'Write equations from geometric information',paragraphs:['If the center and radius are known, the equation is immediate. If diameter endpoints are known, first take their midpoint for the center and half their distance for the radius. Do the geometry first, then substitute into standard form.'],bullets:['Diameter midpoint → center.','Half the endpoint distance → radius.','Always square the radius in the final equation.']},
      {title:'Use substitution to verify points',paragraphs:['A coordinate lies on a circle only if substituting it makes the equation true. This is useful for checking graphs, locating intersections, and verifying modeled boundaries. A point producing a smaller distance lies inside; a larger distance lies outside.'],bullets:['Equal to r² → on the circle.','Less than r² → inside.','Greater than r² → outside.']}
    ],
    workedExamples:[
      {title:'Read a circle',problem:'Find the center and radius of (x+3)²+(y−2)²=49.',steps:['x+3 means h=−3.','y−2 means k=2.','r=√49=7.'],answer:'Center (−3,2), radius 7'},
      {title:'Write from diameter',problem:'Diameter endpoints are (−2,4) and (8,4). Write the circle equation.',steps:['Midpoint is ((−2+8)/2,(4+4)/2)=(3,4).','Diameter length is 10, so r=5.','Substitute center and r²=25.'],answer:'(x−3)²+(y−4)²=25'}
    ],
    commonMistakes:[{mistake:'Reading (x+4) as h=4.',fix:'Standard form is x−h, so x+4=x−(−4) and h=−4.'},{mistake:'Calling the right side the radius.',fix:'The right side is r². Take its positive square root to get r.'}],
    alternateExplanation:'Imagine drawing a right triangle from the circle center to any point on the circumference. The horizontal and vertical legs are x−h and y−k, and the hypotenuse is always r. Pythagoras gives the circle equation immediately.',
    application:'Circular safety zones, rotating mechanisms, round enclosures, and radial coverage regions are modeled by center-radius equations. TEKS applications emphasize using circle properties to solve geometric and real-world problems.',
    teacherTip:'Say the center out loud before doing anything else. Then check one obvious point, such as moving r units right from the center, to verify the equation’s signs.',
    generators:{easy:['u8:circleFeatures','u8:circleFromDiameter'],standard:['u8:circleEquation','u8:circlePointCheck','u8:circleFeatures'],challenge:['u8:circleEquation','u8:circlePointCheck','u8:circleFromDiameter']},
    guidedPractice:['u8:circleFeatures','u8:circleEquation','u8:circleFromDiameter'],independentPractice:['u8:circleEquation','u8:circlePointCheck','u8:circleFeatures'],mastery:['u8:circleEquation','u8:circlePointCheck','u8:circleFromDiameter'],interactive:{type:'conic',title:'Circle explorer'}
  }),
  authoredLesson({
    id:'8.3',title:'Parabolas',estimatedMinutes:70,teks:['P.3F','P.3G','P.3I'],
    summary:'Connect a parabola’s standard equation to its vertex, focus, directrix, axis of symmetry, opening direction, and reflective geometry.',
    objectives:['Identify vertex, focus, directrix, and opening direction from standard form.','Write a parabola equation from vertex/focus information.','Explain how p controls focal distance and shape.'],
    prerequisites:['Quadratic graph vocabulary.','Coordinate transformations.','Signed distance on a coordinate plane.'],
    keyIdeas:['A parabola is equidistant from its focus and directrix.','The coefficient in standard conic form is 4p, not p.','The squared variable tells whether the parabola is vertical or horizontal.'],
    formulas:['(x−h)²=4p(y−k)','(y−k)²=4p(x−h)','focus: (h,k+p) or (h+p,k)','directrix: y=k−p or x=h−p'],
    sections:[
      {title:'Vertex, focus, and directrix work together',paragraphs:['For a vertical parabola, the vertex sits midway between the focus and directrix. If p is positive, the focus is above the vertex and the parabola opens upward; if p is negative, the focus is below and it opens downward. Horizontal forms use the same idea left/right.'],bullets:['Vertex=(h,k).','|p| is the vertex-to-focus distance.','The directrix is the same distance on the opposite side.']},
      {title:'Read orientation from the squared variable',paragraphs:['If x is squared, y changes freely and the axis is vertical. If y is squared, x changes freely and the axis is horizontal. The sign of p then chooses the positive or negative direction along that axis.'],bullets:['x squared → up/down.','y squared → left/right.','positive p → up/right; negative p → down/left.']},
      {title:'Write the equation from geometry',paragraphs:['Start with the vertex. Compare the focus coordinate with the vertex to find p, including its sign. Then choose the vertical or horizontal standard form and multiply p by 4. This is more reliable than trying to memorize many special cases.'],bullets:['Focus aligned vertically → x is squared.','Focus aligned horizontally → y is squared.','Use 4p as the equation coefficient.']}
    ],
    workedExamples:[
      {title:'Find focus and directrix',problem:'For (x−1)²=−12(y+2), find the vertex, focus, and directrix.',steps:['Vertex is (1,−2).','4p=−12, so p=−3.','Focus=(1,−5).','Directrix y=−2−(−3)=1.'],answer:'Vertex (1,−2), focus (1,−5), directrix y=1'},
      {title:'Write from a focus',problem:'Vertex (−2,1), focus (−2,4).',steps:['Focus is 3 units above vertex, so p=3.','Vertical form uses (x−h)²=4p(y−k).','4p=12.'],answer:'(x+2)²=12(y−1)'}
    ],
    commonMistakes:[{mistake:'Using 4p as the focus distance.',fix:'The equation contains 4p, but the focus is only |p| units from the vertex.'},{mistake:'Assuming x² means the parabola opens horizontally.',fix:'If x is squared, the unsquared y is the direction of opening, so the axis is vertical.'}],
    alternateExplanation:'Picture the focus pulling points toward it while the directrix pushes an equal-distance condition from the opposite side. The vertex is the balance point between them. The equation encodes that balance after simplifying the distance formulas.',
    application:'Parabolic reflectors exploit the focus property: rays parallel to the axis reflect toward the focus. Satellite dishes, headlights, microphones, and solar concentrators use this geometry.',
    teacherTip:'Draw the vertex first, then place the focus from p, then draw the directrix the same distance opposite. The opening direction becomes visually obvious before graphing anything else.',
    generators:{easy:['u8:parabolaOrientation','u8:parabolaFocus'],standard:['u8:parabolaFocus','u8:parabolaDirectrix','u8:parabolaFromFocus'],challenge:['u8:parabolaDirectrix','u8:parabolaFromFocus','u8:parabolaOrientation']},
    guidedPractice:['u8:parabolaOrientation','u8:parabolaFocus','u8:parabolaDirectrix'],independentPractice:['u8:parabolaFocus','u8:parabolaDirectrix','u8:parabolaFromFocus'],mastery:['u8:parabolaFromFocus','u8:parabolaDirectrix','u8:parabolaOrientation'],interactive:{type:'conic',title:'Parabola explorer'}
  }),
  authoredLesson({
    id:'8.4',title:'Ellipses',estimatedMinutes:65,teks:['P.3F','P.3G','P.3H'],
    summary:'Analyze ellipses from standard form by locating the center, major/minor axes, vertices, co-vertices, and foci and by using c²=a²−b² correctly.',
    objectives:['Determine ellipse orientation from standard form.','Find vertices, co-vertices, and foci.','Relate a, b, and c to the geometry of the ellipse.'],
    prerequisites:['Circle standard form.','Square roots.','Coordinate translations.'],
    keyIdeas:['The larger denominator determines the major-axis direction.','a is the semi-major length and b is the semi-minor length.','For ellipses, c²=a²−b², so the foci lie inside the vertices.'],
    formulas:['(x−h)²/a²+(y−k)²/b²=1 (horizontal major axis)','c²=a²−b²','horizontal foci: (h±c,k)','vertical foci: (h,k±c)'],
    sections:[
      {title:'Center first, then compare denominators',paragraphs:['The center comes from the translated binomials just as it does for circles. After that, identify the larger denominator. Its variable tells you the direction of the major axis, and its square root is the semi-major length a.'],bullets:['Larger denominator under x → horizontal ellipse.','Larger denominator under y → vertical ellipse.','The smaller square root is b.']},
      {title:'Vertices and co-vertices come from axis lengths',paragraphs:['Move a units from the center along the major axis to reach the two vertices. Move b units along the minor axis to reach the co-vertices. These four points establish the basic sketch before the foci are added.'],bullets:['Vertices use a.','Co-vertices use b.','All four points are symmetric around the center.']},
      {title:'Foci use subtraction',paragraphs:['The focal distance c satisfies c²=a²−b². Because b² is positive, c<a, which places each focus inside its corresponding vertex. This is an excellent built-in error check: if your focus falls beyond a vertex, something went wrong.'],bullets:['Compute c after identifying a and b.','Foci lie on the major axis.','Always verify c<a.']}
    ],
    workedExamples:[
      {title:'Analyze a horizontal ellipse',problem:'Analyze (x−2)²/25+(y+1)²/9=1.',steps:['Center=(2,−1).','a=5, b=3; major axis is horizontal.','Vertices=(−3,−1),(7,−1).','c²=25−9=16, so c=4; foci=(−2,−1),(6,−1).'],answer:'Center (2,−1), horizontal; vertices (−3,−1),(7,−1); foci (−2,−1),(6,−1)'},
      {title:'Analyze a vertical ellipse',problem:'For x²/4+(y−3)²/36=1, identify the major vertices.',steps:['Center=(0,3).','Larger denominator 36 is under y², so major axis is vertical.','a=6.','Move 6 units up/down from the center.'],answer:'(0,−3) and (0,9)'}
    ],
    commonMistakes:[{mistake:'Calling the denominator under x² “a²” automatically.',fix:'a² is the larger denominator, regardless of which variable it is under.'},{mistake:'Using c²=a²+b² for an ellipse.',fix:'Ellipse foci are inside, so use subtraction: c²=a²−b².'}],
    alternateExplanation:'Imagine an ellipse stretched along one axis. The longer stretch is a, the shorter is b, and the foci sit somewhere inside the long axis. As the ellipse becomes more circle-like, a and b get closer and the foci move toward the center.',
    application:'Elliptical geometry appears in orbital approximations, acoustical reflector rooms, and mechanical designs. In this course, the key skill is translating between equation parameters and the graph’s visible attributes.',
    teacherTip:'Before computing c, mark the center and the four axis endpoints. That sketch tells you where the foci are allowed to be and catches orientation mistakes quickly.',
    generators:{easy:['u8:ellipseAxis','u8:ellipseRelation'],standard:['u8:ellipseVertices','u8:ellipseFoci','u8:ellipseAxis'],challenge:['u8:ellipseFoci','u8:ellipseVertices','u8:ellipseRelation']},
    guidedPractice:['u8:ellipseAxis','u8:ellipseVertices','u8:ellipseRelation'],independentPractice:['u8:ellipseVertices','u8:ellipseFoci','u8:ellipseAxis'],mastery:['u8:ellipseFoci','u8:ellipseVertices','u8:ellipseRelation'],interactive:{type:'conic',title:'Ellipse explorer'}
  }),
  authoredLesson({
    id:'8.5',title:'Hyperbolas',estimatedMinutes:70,teks:['P.3F','P.3G','P.3H'],
    summary:'Analyze hyperbolas from standard form by finding center, orientation, vertices, foci, and asymptotes and by distinguishing their formulas from ellipse formulas.',
    objectives:['Determine hyperbola orientation from the positive squared term.','Find vertices, foci, and asymptotes.','Use c²=a²+b² and the correct asymptote slope.'],
    prerequisites:['Ellipse features.','Slope and point-slope form.','Square roots and coordinate translations.'],
    keyIdeas:['A hyperbola has one positive and one negative squared coordinate term.','The positive term determines the opening direction.','For hyperbolas, c²=a²+b², so foci lie beyond the vertices.'],
    formulas:['(x−h)²/a²−(y−k)²/b²=1','c²=a²+b²','horizontal asymptotes: y−k=±(b/a)(x−h)','vertical asymptotes: y−k=±(a/b)(x−h)'],
    sections:[
      {title:'The positive term controls the opening',paragraphs:['Unlike an ellipse, denominator size does not determine hyperbola direction. A positive x² term produces left/right branches; a positive y² term produces up/down branches. The center is still read from the translated binomials.'],bullets:['Positive x² → horizontal transverse axis.','Positive y² → vertical transverse axis.','The negative term belongs to the conjugate direction.']},
      {title:'Vertices and foci lie on the transverse axis',paragraphs:['Move a units from the center along the opening direction to find vertices. The foci are farther out at distance c, where c²=a²+b². That addition rule contrasts with ellipses and provides a useful conceptual check.'],bullets:['Vertices use a.','Foci use c.','For hyperbolas, c>a.']},
      {title:'Asymptotes guide the branches',paragraphs:['The graph approaches two lines through the center. For a horizontal hyperbola, their slopes are ±b/a; for a vertical hyperbola, ±a/b. Sketching the asymptote rectangle first gives a reliable framework for the branches.'],bullets:['Asymptotes intersect at the center.','They are guides, not part of the hyperbola.','The branches open toward the vertices and approach the asymptotes.']}
    ],
    workedExamples:[
      {title:'Horizontal hyperbola',problem:'Analyze x²/9−y²/16=1.',steps:['Center=(0,0), positive x² means horizontal.','a=3, b=4, so vertices=(±3,0).','c²=9+16=25, c=5, so foci=(±5,0).','Asymptotes y=±(4/3)x.'],answer:'Horizontal; vertices (±3,0), foci (±5,0), asymptotes y=±4x/3'},
      {title:'Translated center',problem:'For (y−2)²/25−(x+1)²/4=1, find center and vertices.',steps:['Center=(−1,2).','Positive y term means vertical.','a=5.','Move 5 units vertically from center.'],answer:'Center (−1,2); vertices (−1,−3) and (−1,7)'}
    ],
    commonMistakes:[{mistake:'Using the larger denominator to choose opening direction.',fix:'Use whichever squared term is positive.'},{mistake:'Using ellipse focal formula c²=a²−b².',fix:'Hyperbola foci lie beyond the vertices, so use c²=a²+b².'}],
    alternateExplanation:'Think of a hyperbola as two branches organized around a center and a pair of diagonal guide lines. The positive term says which direction the branches face; a gives the first vertex distance, while b controls the asymptote steepness.',
    application:'Hyperbolic geometry appears in some navigation and signal-time-difference models, telescope optics, and engineering structures. The course emphasis is reading the graph architecture accurately from the equation.',
    teacherTip:'Draw the asymptote rectangle before the branches. It makes orientation, slopes, and vertex placement much harder to mix up.',
    generators:{easy:['u8:hyperbolaOrientation','u8:hyperbolaVertices'],standard:['u8:hyperbolaAsymptote','u8:hyperbolaFoci','u8:hyperbolaOrientation'],challenge:['u8:hyperbolaFoci','u8:hyperbolaAsymptote','u8:hyperbolaVertices']},
    guidedPractice:['u8:hyperbolaOrientation','u8:hyperbolaVertices','u8:hyperbolaAsymptote'],independentPractice:['u8:hyperbolaFoci','u8:hyperbolaAsymptote','u8:hyperbolaOrientation'],mastery:['u8:hyperbolaFoci','u8:hyperbolaAsymptote','u8:hyperbolaVertices'],interactive:{type:'conic',title:'Hyperbola explorer'}
  }),
  authoredLesson({
    id:'8.6',title:'Identifying Conics from General Equations',estimatedMinutes:70,teks:['P.3F','P.3G'],
    summary:'Classify nonrotated conics from general second-degree equations and convert equations toward standard form using grouping and completing the square.',
    objectives:['Classify a conic from the x² and y² coefficient pattern.','Complete the square correctly in one or two variables.','Rewrite representative general-form equations into standard form.'],
    prerequisites:['Completing the square.','Conic standard forms.','Equation balancing.'],
    keyIdeas:['Classification usually begins before completing the square.','One squared variable indicates a parabola; opposite signs indicate a hyperbola.','Completing the square reveals translated centers, vertices, and scale parameters.'],
    formulas:['Ax²+Cy²+Dx+Ey+F=0 (nonrotated form)','complete square: x²+bx → (x+b/2)²−(b/2)²'],
    sections:[
      {title:'Classify from the quadratic terms first',paragraphs:['For the nonrotated equations used here, inspect the x² and y² terms. If only one appears, the conic is a parabola. If both appear with opposite signs, it is a hyperbola. If both have the same sign, it is an ellipse-type equation; equal coefficients give the circle case.'],bullets:['One squared coordinate → parabola.','Opposite signs → hyperbola.','Same sign unequal coefficients → ellipse.','Same sign equal coefficients → circle.']},
      {title:'Complete the square without changing the equation',paragraphs:['Group x terms and y terms, move the constant, and add the needed square-completion constants to both sides. If a squared group has a coefficient other than 1, factor it before completing the square. Every addition on one side must be balanced on the other.'],bullets:['Group like variables.','Factor quadratic coefficients if needed.','Half the linear coefficient, square it, and balance the equation.']},
      {title:'Normalize after completing squares',paragraphs:['Once the square groups are formed, divide if needed so the right side matches the standard form, commonly 1 for ellipses and hyperbolas. Then read the geometric parameters from the standard equation. Classification and graphing become much easier after normalization.'],bullets:['Finish algebra before reading features.','Keep track of the center signs.','Check that the final form matches the initial classification.']}
    ],
    workedExamples:[
      {title:'Classify quickly',problem:'Classify 9x²−4y²+18x+8y−31=0.',steps:['Both x and y are squared.','Their coefficients have opposite signs.'],answer:'Hyperbola'},
      {title:'Complete a circle',problem:'Rewrite x²+y²−6x+4y−12=0.',steps:['Move constant: x²−6x+y²+4y=12.','Add 9 and 4 to both sides.','(x−3)²+(y+2)²=25.'],answer:'(x−3)²+(y+2)²=25'}
    ],
    commonMistakes:[{mistake:'Completing the square before doing the easy sign classification.',fix:'Classify from squared terms first; then do algebra only when features/graphing are needed.'},{mistake:'Adding a completion constant inside one side without balancing the other side.',fix:'Adding to the equation means adding the same amount to both sides, with outside coefficients accounted for.'}],
    alternateExplanation:'Treat the general equation as a compressed standard form. The squared-term pattern tells you which family is hidden inside. Completing the square is the unpacking process that reveals its center or vertex and dimensions.',
    application:'Real equations from modeling or algebra systems often arrive expanded rather than in textbook standard form. Classification plus completing the square lets you recover the geometry from that expanded representation.',
    teacherTip:'Make classification a separate first line on every problem. That prediction becomes a checksum: if the completed-square result turns into a different family, revisit the algebra.',
    generators:{easy:['u8:coefficientPattern','u8:completeSquareConstant'],standard:['u8:generalClassify','u8:standardizeCircle','u8:completeSquareConstant'],challenge:['u8:generalClassify','u8:standardizeCircle','u8:coefficientPattern']},
    guidedPractice:['u8:coefficientPattern','u8:completeSquareConstant','u8:generalClassify'],independentPractice:['u8:generalClassify','u8:standardizeCircle','u8:completeSquareConstant'],mastery:['u8:generalClassify','u8:standardizeCircle','u8:coefficientPattern'],interactive:{type:'conic',title:'Conic family explorer'}
  }),
  authoredLesson({
    id:'8.7',title:'Translating & Graphing Conics',estimatedMinutes:70,teks:['P.3F','P.3G','P.3H'],
    summary:'Use translations and defining attributes to sketch conics efficiently from standard form instead of relying on point-by-point plotting.',
    objectives:['Read centers or vertices from translated standard forms.','Build a conic sketch from its structural points and guide lines.','Explain how h and k translate a conic without changing its basic family.'],
    prerequisites:['Standard forms of all four conics.','Coordinate translations.','Vertices, foci, asymptotes, and axis vocabulary.'],
    keyIdeas:['h shifts horizontally and k shifts vertically.','Translation changes location, not the underlying conic family.','Graph structure should be built from defining features before adding a smooth curve.'],
    formulas:['x→x−h shifts right h','y→y−k shifts up k','center/vertex=(h,k) in translated standard form'],
    sections:[
      {title:'Read translation before scale',paragraphs:['The binomials reveal where the conic’s reference point moved. Circles, ellipses, and hyperbolas use a center; parabolas use a vertex. Read that point first, then use denominators or p to build the rest of the graph around it.'],bullets:['x−h moves right h; x+h moves left h.','y−k moves up k; y+k moves down k.','Do not confuse translation with axis length.']},
      {title:'Graph using landmarks, not a cloud of points',paragraphs:['For circles, mark center and four radius points. For ellipses, mark center, vertices, and co-vertices. For hyperbolas, mark center, vertices, and asymptotes. For parabolas, mark vertex, focus, directrix, and opening direction. These landmarks make the shape predictable.'],bullets:['Circle: center + radius.','Ellipse: center + a/b axis endpoints.','Hyperbola: center + vertices + asymptotes.','Parabola: vertex + focus/directrix.']},
      {title:'Use symmetry as a built-in check',paragraphs:['Conics have strong symmetry. Circles and ellipses are symmetric across both center axes; a standard hyperbola is also symmetric around its center axes; a parabola is symmetric around one axis through its vertex. If one side of a sketch violates that symmetry, the graph is likely wrong.'],bullets:['Plot paired points together.','Check branch/axis orientation before drawing curves.','Use the equation features to justify the sketch.']}
    ],
    workedExamples:[
      {title:'Translate an ellipse',problem:'Graph (x+2)²/16+(y−3)²/4=1 using landmarks.',steps:['Center=(−2,3).','a=4 horizontally, b=2 vertically.','Vertices=(−6,3),(2,3); co-vertices=(−2,1),(−2,5).','Sketch a smooth ellipse through those four points.'],answer:'Center (−2,3), horizontal major axis'},
      {title:'Translate a parabola',problem:'Graph (x−1)²=8(y+2).',steps:['Vertex=(1,−2).','4p=8, so p=2 and it opens upward.','Focus=(1,0); directrix y=−4.','Sketch symmetrically around x=1.'],answer:'Upward parabola with vertex (1,−2)'}
    ],
    commonMistakes:[{mistake:'Treating h and k as added graph dimensions.',fix:'h and k only move the reference point; radius/a/b/p determine size and shape.'},{mistake:'Sketching a hyperbola before drawing its asymptotes.',fix:'Use the asymptotes as guide rails first, then draw the branches through the vertices.'}],
    alternateExplanation:'Graphing a conic is like placing a stencil. First move the stencil to its center or vertex using h and k. Then size it with r, a/b, or p. The basic family does not change just because it was translated.',
    application:'Translations let conic models be placed around real objects rather than being forced to the origin. That is essential when a circular boundary, reflector, or elliptical feature is centered somewhere meaningful in a coordinate system.',
    teacherTip:'Require a “landmark list” before any sketch: reference point, orientation, key lengths, and guide features. A 20-second list usually prevents a several-minute redraw.',
    generators:{easy:['u8:translatedCenter','u8:translatedParabolaVertex'],standard:['u8:translatedCenter','u8:translatedParabolaVertex','u8:graphFeatureMatch'],challenge:['u8:graphFeatureMatch','u8:translatedCenter','u8:standardizeCircle']},
    guidedPractice:['u8:translatedCenter','u8:translatedParabolaVertex','u8:graphFeatureMatch'],independentPractice:['u8:translatedCenter','u8:graphFeatureMatch','u8:standardizeCircle'],mastery:['u8:graphFeatureMatch','u8:translatedParabolaVertex','u8:standardizeCircle'],interactive:{type:'conic',title:'Translated conic explorer'}
  }),
  authoredLesson({
    id:'8.8',title:'Conic Applications',estimatedMinutes:65,teks:['P.3I','P.3G'],
    summary:'Apply circle and parabola properties to geometric and real-world situations, with emphasis on translating a physical condition into the correct conic parameter or equation.',
    objectives:['Use circle geometry to solve radius/chord/boundary problems.','Use parabola focus relationships in reflector models.','Choose a conic from the physical property described in a context.'],
    prerequisites:['Circle center/radius equations.','Parabola vertex/focus/directrix relationships.','Right-triangle algebra.'],
    keyIdeas:['Applications begin with a geometric property, not a formula hunt.','Circle models use fixed distance from a center.','Parabolic reflector models use the focus and the 4p parameter.'],
    formulas:['circle: (x−h)²+(y−k)²=r²','parabola: x²=4py or y²=4px','focus distance=|p|'],
    sections:[
      {title:'Translate the physical description into geometry',paragraphs:['Ask what is fixed. If every boundary point is the same distance from a center, use a circle. If incoming parallel rays are redirected to one point, the relevant cross-section is parabolic. Identifying the property first is more reliable than guessing from vocabulary.'],bullets:['Fixed radius → circle.','Focus/directrix or reflector property → parabola.','Write units beside parameters before calculating.']},
      {title:'Circle applications often hide a right triangle',paragraphs:['A radius drawn to the midpoint of a chord is perpendicular to the chord. That produces a right triangle involving the radius, the center-to-chord distance, and half the chord length. Combining circle geometry with Pythagoras solves many boundary and clearance problems.'],bullets:['Radius is the hypotenuse.','Use half a chord, not the full chord, in the right triangle.','Double only after solving for the half-chord if full length is requested.']},
      {title:'Parabolic applications revolve around p',paragraphs:['In x²=4py, p is the focus distance from the vertex. If a dish equation is known, divide the coefficient by 4 to locate the focus. If the dish width/depth is known, substitute a rim point and solve for p.'],bullets:['The receiver belongs at the focus in an idealized reflector.','Use consistent length units.','A wider/flatter parabola corresponds to a larger |p|.']}
    ],
    workedExamples:[
      {title:'Circular chord',problem:'A circular plaza has radius 10 m. A chord is 6 m from the center. Find the chord length.',steps:['Draw the perpendicular from center to chord; it bisects the chord.','Half-chord x satisfies x²+6²=10².','x=8, so full chord=16.'],answer:'16 m'},
      {title:'Reflector focus',problem:'A dish cross-section is x²=20y. How far is the receiver from the vertex?',steps:['Compare with x²=4py.','4p=20, so p=5.'],answer:'5 units'}
    ],
    commonMistakes:[{mistake:'Using the full chord as a leg in the center-to-chord right triangle.',fix:'The perpendicular from the center bisects the chord, so use half the chord.'},{mistake:'Placing a parabola focus 4p units from the vertex.',fix:'4p is the equation coefficient; the focus distance is p.'}],
    alternateExplanation:'Applications become easier when you ignore the story nouns for a moment and ask what distance relationship is being enforced. “Same distance from one point” is circle language. “Parallel rays meet at one focus” is parabola language.',
    application:'Circular zones model coverage and boundaries; parabolic cross-sections model satellite dishes, headlights, radio telescopes, and acoustic reflectors. Northside’s Unit 8 specifically emphasizes applications of circle and parabola properties.',
    teacherTip:'Before writing an equation, state the modeling sentence: “This is a circle because…” or “This is a parabola because…”. That sentence usually reveals the needed parameter.',
    generators:{easy:['u8:applicationChoice','u8:parabolaReflector'],standard:['u8:circleApplication','u8:parabolaReflector','u8:dishDepth'],challenge:['u8:circleApplication','u8:dishDepth','u8:applicationChoice']},
    guidedPractice:['u8:applicationChoice','u8:parabolaReflector','u8:circleApplication'],independentPractice:['u8:circleApplication','u8:dishDepth','u8:parabolaReflector'],mastery:['u8:circleApplication','u8:dishDepth','u8:applicationChoice'],interactive:{type:'conic',title:'Application geometry explorer'}
  }),
  authoredLesson({
    id:'8.9',title:'Unit Review / Assessment',estimatedMinutes:80,teks:unitTeks,
    summary:'Synthesize Unit 8 by classifying conics, extracting graph attributes, converting general equations, translating graphs, and applying circle/parabola geometry without relying on a single memorized template.',
    objectives:['Classify all four conic families from equations and descriptions.','Find the defining graph features needed for an accurate sketch.','Convert and interpret representative general equations.','Apply circle and parabola properties in mixed contexts.'],
    prerequisites:['Lessons 8.1–8.8.','Completing the square.','Careful sign and square-root work.'],
    keyIdeas:['Start every conic problem by identifying the family.','Use the family-specific parameter relationships only after classification.','A quick sketch is both a solution tool and an error check.'],
    formulas:['circle: (x−h)²+(y−k)²=r²','parabola: one squared variable, coefficient 4p','ellipse: c²=a²−b²','hyperbola: c²=a²+b²'],
    sections:[
      {title:'Classification review map',paragraphs:['One squared coordinate variable means parabola. Two squared variables with opposite signs mean hyperbola. Same-sign squared terms mean circle or ellipse, with equal coefficients indicating the circle case before normalization. This first classification determines the correct feature formulas.'],bullets:['Classify first.','Standardize second when necessary.','Read/graph attributes third.']},
      {title:'Feature review map',paragraphs:['Circles use center/radius. Parabolas use vertex/focus/directrix. Ellipses use center, vertices, co-vertices, and interior foci. Hyperbolas use center, vertices, foci, and asymptotes. Keep the family-specific c relation straight: subtract for ellipse, add for hyperbola.'],bullets:['Ellipse: c<a.','Hyperbola: c>a.','Parabola: focus is |p| from vertex.']},
      {title:'Assessment strategy',paragraphs:['Slow down at signs and squares. Read translated centers with opposite binomial signs, distinguish r from r², distinguish p from 4p, and sketch orientation before calculating. Most conic errors are setup errors rather than difficult arithmetic.'],bullets:['Write the standard form you are matching.','Label the reference point.','Use symmetry and geometric reasonableness to check the result.']}
    ],
    workedExamples:[
      {title:'Mixed classification',problem:'Classify 4x²+9y²−16x+18y−11=0.',steps:['Both squared variables appear with the same sign.','Their coefficients are unequal.'],answer:'Ellipse'},
      {title:'Mixed feature',problem:'For (x+1)²/16−(y−2)²/9=1, state center, vertices, and asymptote slopes.',steps:['Center=(−1,2).','a=4, so vertices=(−5,2),(3,2).','Horizontal hyperbola slopes are ±b/a=±3/4.'],answer:'Center (−1,2); vertices (−5,2),(3,2); slopes ±3/4'}
    ],
    commonMistakes:[{mistake:'Using the same c formula for ellipse and hyperbola.',fix:'Ellipse subtracts because foci are inside; hyperbola adds because foci lie beyond vertices.'},{mistake:'Trying to graph an expanded equation without first classifying/standardizing it.',fix:'Use squared-term patterns to classify, then complete the square to expose the geometric features.'}],
    alternateExplanation:'Unit 8 is not four unrelated formula lists. Every problem follows the same larger workflow: identify the distance-rule family, reveal its standard parameters, place its structural landmarks, then sketch or interpret the geometry.',
    application:'The mixed review deliberately alternates pure algebra, graph interpretation, and modeling because real mathematical work often requires deciding which representation is most useful rather than being told which formula to use.',
    teacherTip:'On review problems, write a one-word family label before any algebra. Then write the one family-specific relation most likely to matter, such as c²=a²−b² or c²=a²+b².',
    generators:{easy:['u8:conicByDefinition','u8:circleFeatures','u8:parabolaOrientation','u8:ellipseAxis','u8:hyperbolaOrientation'],standard:['u8:standardFormIdentify','u8:circleEquation','u8:parabolaFocus','u8:ellipseFoci','u8:hyperbolaAsymptote','u8:generalClassify','u8:translatedCenter'],challenge:['u8:standardizeCircle','u8:parabolaFromFocus','u8:ellipseFoci','u8:hyperbolaFoci','u8:generalClassify','u8:circleApplication','u8:dishDepth']},
    guidedPractice:['u8:standardFormIdentify','u8:circleFeatures','u8:parabolaFocus','u8:ellipseAxis','u8:hyperbolaOrientation'],independentPractice:['u8:generalClassify','u8:circleEquation','u8:parabolaDirectrix','u8:ellipseFoci','u8:hyperbolaAsymptote','u8:translatedCenter'],mastery:['u8:standardizeCircle','u8:parabolaFromFocus','u8:ellipseFoci','u8:hyperbolaFoci','u8:circleApplication','u8:dishDepth']
  })
];

export const unit=authoredUnit(8,'Conics','~2 weeks',unitTeks,lessons);
export default unit;
