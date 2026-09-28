import '../js/generators-unit1.js';
import { authoredLesson, authoredUnit } from './lesson-schema.js';

const lessons = [
    authoredLesson({
        id:'1.1', title:'Functions, Relations & Function Notation', summary:'Build a precise idea of a function, read function notation as an instruction, and move confidently among ordered pairs, tables, equations, and graphs.', estimatedMinutes:50,
        teks:['P.2A','P.2B','P.2C'],
        objectives:['Decide whether a relation is a function from several representations.','Evaluate functions using notation such as f(3) and interpret the result in context.','Distinguish input, output, independent variable, and dependent variable.'],
        prerequisites:['Substituting numbers into algebraic expressions.','Reading ordered pairs and coordinate axes.'],
        keyIdeas:['A function assigns exactly one output to each allowed input.','Repeated outputs are allowed; one input producing two different outputs is not.','f(x) names the output produced when the input is x.'],
        formulas:['f(a) means replace every x in the rule with a.'],
        sections:[
            {title:'What a function really guarantees', paragraphs:['A function is a rule or relationship with one non-negotiable promise: once an input is chosen, the output is determined. The same output may come from several inputs, but a single input cannot point to two different outputs. This definition works for equations, tables, mapping diagrams, ordered pairs, and graphs.'], bullets:['Ordered pairs: look for repeated x-values with different y-values.','Graphs: the vertical line test checks whether one x-coordinate hits the graph more than once.','Tables: repeated inputs are fine only when they repeat the same output, because the relation still assigns one result.']},
            {title:'Reading function notation', paragraphs:['The notation f(4) does not mean f multiplied by 4. It means “the output of function f when the input is 4.” Treat the parentheses as an input slot. Substitute first, keep grouping symbols, and simplify only after the substitution is complete.'], bullets:['f(x) is an output label, not a product.','When the input is negative, substitute it with parentheses.','In context, attach units to the output whenever the model has units.']},
            {title:'Representations tell the same story', paragraphs:['A table, graph, equation, and verbal rule can represent the same function. Precalculus repeatedly asks you to translate between these forms because different representations reveal different information. A graph makes overall behavior visible; an equation supports exact calculation; a table makes selected input-output pairs easy to inspect.'], bullets:['Ask what the input represents before calculating.','Ask what the output means after calculating.','Use the representation that makes the current question easiest.']}
        ],
        workedExamples:[
            {title:'Evaluate a function carefully', problem:'If f(x)=3x²−2x+1, find f(−2).', steps:['Substitute −2 everywhere x appears: 3(−2)²−2(−2)+1.','Square before multiplying: 3·4+4+1.','Combine to get 17.','Interpretation: the function assigns the output 17 to the input −2.'], answer:'f(−2)=17'},
            {title:'Decide whether a relation is a function', problem:'Is {(1,4),(2,4),(3,7),(1,9)} a function?', steps:['Inspect input values: 1,2,3,1.','Input 1 appears twice.','It is paired with outputs 4 and 9.','One input has two outputs, so the relation is not a function.'], answer:'No'}
        ],
        commonMistakes:[
            {mistake:'Thinking repeated y-values break the function rule.', fix:'Repeated outputs are allowed. The definition restricts repeated inputs with different outputs.'},
            {mistake:'Treating f(x) as f·x.', fix:'Read f(x) as the output produced by function f at input x.'}
        ],
        alternateExplanation:'Picture a vending machine. Pressing button A6 must lead to one determined result. Several buttons could dispense the same snack, but A6 cannot randomly dispense two different snacks on the same setup. Function notation is simply the label on the button you press.',
        application:'If T(h) gives the temperature h hours after midnight, T(15)=82 means that 15 hours after midnight, the model reports 82 degrees. The number 15 is the input; 82 is the output.',
        teacherTip:'When an answer is wrong, first ask whether the student misunderstood the function definition or merely made a substitution/arithmetic error. Those require different fixes.',
        generators:{easy:['u1:relationFunction','u1:functionValue'],standard:['u1:functionValue','u1:relationFunction'],challenge:['u1:functionValue','u1:relationFunction']}
    }),
    authoredLesson({
        id:'1.2', title:'Domain and Range', summary:'Determine which inputs and outputs are possible from formulas, graphs, and contexts, and express those sets clearly.', estimatedMinutes:55,
        teks:['P.2D','P.2E','P.2F'],
        objectives:['Find domain restrictions caused by denominators and even roots.','Read domain and range from graphs and key features.','Use interval or inequality notation appropriately and honor contextual restrictions.'],
        prerequisites:['Solving linear equations and inequalities.','Understanding x- and y-coordinates.'],
        keyIdeas:['Domain is the set of allowed inputs; range is the set of attainable outputs.','Algebraic restrictions usually come from division by zero and even roots of negative values.','A context can restrict a domain more than the algebra alone does.'],
        formulas:['Denominator ≠ 0','For real √g(x): g(x) ≥ 0'],
        sections:[
            {title:'Domain from an equation', paragraphs:['Start with all real numbers, then remove inputs that make the formula undefined. For rational expressions, denominator zeros are excluded. For real-valued square roots, the radicand must be nonnegative. Polynomial formulas by themselves have no domain restriction.'], bullets:['Do not cancel a factor before recording its original restriction.','Even roots require nonnegative radicands; odd roots do not.','Combine restrictions when a formula contains more than one risky operation.']},
            {title:'Range from shape and transformations', paragraphs:['Range is often easier to read from the graph than derive algebraically. Look for minimum or maximum y-values, asymptotes, endpoints, and whether the graph continues without bound. A transformed parent function inherits a recognizable output pattern.'], bullets:['For y=(x−h)²+k, the range starts at k and goes upward.','For y=−(x−h)²+k, the range ends at k and goes downward.','Open circles indicate excluded values only if no other graph point supplies the same output.']},
            {title:'Context can override pure algebra', paragraphs:['A formula may accept every real input algebraically while the situation does not. Time since an event is usually nonnegative. A number of tickets or people is usually a whole number. A physical length cannot be negative. Domain statements should describe the actual model, not just the symbolic expression.'], bullets:['Name the variable and units.','Ask whether fractional or negative values make sense.','State endpoints when the situation has a fixed start or end.']}
        ],
        workedExamples:[
            {title:'Rational domain', problem:'Find the domain of R(x)=(x+5)/(x−3).', steps:['The only risky operation is division.','Set the denominator equal to zero: x−3=0.','This gives x=3.','Exclude 3 from the real numbers.'], answer:'All real x except 3'},
            {title:'Square-root domain and range', problem:'Find domain and range of y=√(x−4)+2.', steps:['Require x−4≥0, so x≥4.','The square-root parent has outputs ≥0.','Adding 2 shifts every output up 2.','Therefore y≥2.'], answer:'Domain x≥4; range y≥2'}
        ],
        commonMistakes:[
            {mistake:'Setting a denominator equal to zero and then including that value.', fix:'Solving denominator=0 identifies what must be excluded.'},
            {mistake:'Using the same restriction rule for square roots and cube roots.', fix:'Even roots require nonnegative radicands; odd roots accept every real radicand.'}
        ],
        alternateExplanation:'Domain is the set of inputs the machine is willing to accept. Range is the collection of outputs it can actually produce. Algebra tells you which inputs break the machine; the graph shows which outputs ever appear.',
        application:'A model C(n)=120/n may be algebraically defined for every nonzero real n, but if n counts people sharing a cost, the meaningful domain is positive whole numbers.',
        teacherTip:'Have the student say the restriction in words before writing notation. “The denominator cannot be zero” is harder to misuse than memorizing an interval pattern.',
        generators:{easy:['u1:domainRational','u1:domainRadical'],standard:['u1:domainRational','u1:domainRadical','u1:quadraticRange'],challenge:['u1:quadraticRange','u1:domainRadical','u1:domainRational']}
    }),
    authoredLesson({
        id:'1.3', title:'Analyzing Graphs of Functions', summary:'Read a graph as a complete description of behavior: intercepts, intervals, extrema, symmetry, and average rate of change.', estimatedMinutes:55,
        teks:['P.2F','P.2G','P.2I'],
        objectives:['Identify intercepts, extrema, intervals of increase/decrease, and bounded behavior.','Compute average rate of change from function values.','Recognize even and odd symmetry from equations or graphs.'],
        prerequisites:['Slope between two points.','Domain and range vocabulary.'],
        keyIdeas:['A graph encodes many facts simultaneously.','Average rate of change is secant-line slope, not instantaneous slope.','Even functions have y-axis symmetry; odd functions have origin symmetry.'],
        formulas:['Average rate of change = [f(b)−f(a)]/(b−a)','Even: f(−x)=f(x)','Odd: f(−x)=−f(x)'],
        sections:[
            {title:'Reading behavior by intervals', paragraphs:['Instead of describing a graph as one picture, break its domain into intervals. On each interval decide whether outputs rise, fall, or remain constant as x increases. Turning points often mark where one behavior changes into another.'], bullets:['State intervals using x-values, not y-values.','A local maximum is high relative to nearby points; an absolute maximum is highest over the entire domain.','Intercepts are points; increasing/decreasing descriptions are intervals.']},
            {title:'Average rate of change', paragraphs:['For any two x-values a and b, the average rate of change is the slope of the secant line through (a,f(a)) and (b,f(b)). It summarizes the net output change per unit of input over an interval. Nonlinear functions can have different average rates on different intervals.'], bullets:['Compute function values first.','Keep the same order in numerator and denominator.','Attach units such as dollars per hour when appropriate.']},
            {title:'Symmetry as a shortcut', paragraphs:['Symmetry can cut analysis work in half. Even functions mirror across the y-axis, while odd functions rotate 180° about the origin. Algebraically, replace x with −x and simplify to see whether the original output stays the same or changes sign.'], bullets:['Even does not mean “even powers only” in every possible expression, though that pattern often appears.','Odd does not mean every output is odd.','A function can be neither even nor odd.']}
        ],
        workedExamples:[
            {title:'Average rate of change', problem:'For f(x)=x²−3x, find average rate of change from x=1 to x=4.', steps:['f(1)=1−3=−2.','f(4)=16−12=4.','Compute (4−(−2))/(4−1)=6/3.','The average rate is 2 output units per input unit.'], answer:'2'},
            {title:'Test symmetry algebraically', problem:'Determine whether f(x)=x³−4x is even, odd, or neither.', steps:['Compute f(−x)=(−x)³−4(−x)=−x³+4x.','Factor −1: −(x³−4x).','Thus f(−x)=−f(x).'], answer:'Odd'}
        ],
        commonMistakes:[
            {mistake:'Reporting y-values as intervals where a function increases.', fix:'Increase/decrease intervals describe where on the x-axis the behavior occurs.'},
            {mistake:'Using f(b)−f(a) over a−b.', fix:'Keep subtraction order consistent: if the top is b minus a, the bottom must also be b minus a.'}
        ],
        alternateExplanation:'Imagine driving on a hilly road. The graph tells where you climb, descend, and reach peaks or valleys. Average rate of change ignores every bump and compares only your net elevation change with the horizontal distance traveled.',
        application:'A population graph may still be increasing while its growth rate slows. Reading intervals and rates separately prevents confusing “going up” with “going up faster.”',
        teacherTip:'Ask for a verbal sentence before notation: “from x=2 to x=5 the function decreases.” This catches the common x/y interval mix-up.',
        generators:{easy:['u1:averageRate','u1:symmetry'],standard:['u1:averageRate','u1:symmetry'],challenge:['u1:averageRate','u1:symmetry']}
    }),
    authoredLesson({
        id:'1.4', title:'Parent Functions & Function Families', summary:'Recognize the core function families that later transformations build from, including their signature shapes, domains, and ranges.', estimatedMinutes:45,
        teks:['P.2F','P.2G'],
        objectives:['Match common parent equations to graph families.','Recall characteristic domains, ranges, and shapes.','Use parent-function knowledge to predict transformed behavior.'],
        prerequisites:['Basic graph reading.','Domain and range.'],
        keyIdeas:['Parent functions are reference models, not a separate topic to memorize in isolation.','Each family has characteristic symmetry, growth, and restrictions.','Transformations preserve family identity while changing position or scale.'],
        formulas:['Linear y=x','Quadratic y=x²','Cubic y=x³','Absolute value y=|x|','Square root y=√x','Reciprocal y=1/x'],
        sections:[
            {title:'Why parent functions matter', paragraphs:['A parent function is the simplest representative of a family. Once you know its shape and basic attributes, transformed versions become easier to analyze because you can describe what changed rather than starting from scratch.'], bullets:['Quadratic: U-shaped, minimum at the origin.','Absolute value: V-shaped.','Square root: begins at an endpoint and moves right.','Reciprocal: two branches separated by asymptotes.']},
            {title:'Attributes belong to families', paragraphs:['Families differ in more than appearance. The square-root family has a one-sided domain. Reciprocal functions have excluded inputs and asymptotic behavior. Cubics extend in opposite vertical directions. These attributes become anchors when transformations are introduced.'], bullets:['Record domain and range alongside the graph shape.','Notice symmetry: quadratic/absolute value are even; cubic/reciprocal are odd in parent form.','Identify intercepts and end behavior.']},
            {title:'Choosing a family from data or context', paragraphs:['A model should match both the mathematical shape and the situation. Constant rate suggests linear behavior; one turning point can suggest quadratic behavior; a quantity inversely proportional to another suggests reciprocal behavior. Parent families provide candidate models.'], bullets:['Do not choose solely by one point.','Look for rates, turning points, restrictions, and end behavior.','A model may be useful only over the domain relevant to the situation.']}
        ],
        workedExamples:[
            {title:'Identify from an equation', problem:'Which parent family contains y=√x?', steps:['The variable appears inside a square root.','The graph begins at (0,0) and extends right.','That is the square-root family.'], answer:'Square root'},
            {title:'Choose from behavior', problem:'A graph has two branches, is undefined at x=0, and approaches both axes without touching them. Which parent fits?', steps:['Undefined at x=0 suggests a denominator restriction.','Axes acting as asymptotes is characteristic of y=1/x.'], answer:'Reciprocal'}
        ],
        commonMistakes:[
            {mistake:'Calling every curved graph a quadratic.', fix:'Check domain, symmetry, branches, and end behavior, not just curvature.'},
            {mistake:'Memorizing pictures without attributes.', fix:'Pair each family with its equation, domain/range, and one signature feature.'}
        ],
        alternateExplanation:'Parent functions are the basic “shapes” in a graphing vocabulary. Transformations later act like moving, stretching, or flipping those shapes without changing which vocabulary word they belong to.',
        application:'Recognizing a reciprocal pattern can explain why average cost falls quickly at first and then levels off as production grows.',
        teacherTip:'A fast recall drill is useful here, but always require one justification such as “square root because the graph has an endpoint and continues right.”',
        generators:{easy:['u1:parentFamily'],standard:['u1:parentFamily','u1:functionValue'],challenge:['u1:parentFamily','u1:functionValue']}
    }),
    authoredLesson({
        id:'1.5', title:'Transformations of Functions', summary:'Predict how parameters move, reflect, stretch, or compress a graph and connect those changes to coordinates and function notation.', estimatedMinutes:60,
        teks:['P.2F','P.2G','P.2I'],
        objectives:['Describe horizontal and vertical translations.','Identify reflections and vertical scale changes.','Map important points from a parent graph to a transformed graph.'],
        prerequisites:['Parent functions.','Function notation and coordinates.'],
        keyIdeas:['Outside changes affect outputs vertically.','Inside changes affect inputs horizontally and appear with the opposite direction.','A negative outside multiplier reflects across the x-axis.'],
        formulas:['g(x)=a f(x−h)+k: horizontal h, vertical k, vertical factor |a|; if a<0 reflect across x-axis'],
        sections:[
            {title:'Translations', paragraphs:['In g(x)=f(x−h)+k, h controls horizontal movement and k controls vertical movement. The horizontal sign feels reversed because the input must change enough to make x−h equal the parent input.'], bullets:['x−4 means right 4.','x+4 means left 4.','+3 outside means up 3; −3 outside means down 3.']},
            {title:'Reflections and scale', paragraphs:['Multiplying the whole function by a changes every output. If |a|>1, vertical distances from the reference line grow; if 0<|a|<1, they shrink. A negative a changes every output’s sign and reflects the graph across the x-axis.'], bullets:['Outside multiplier → vertical effect.','Negative outside → x-axis reflection.','Do not call a negative multiplier a horizontal shift.']},
            {title:'Transform key points, not every point', paragraphs:['When a parent graph has recognizable anchor points, move those points according to the transformation. For g(x)=a f(x−h)+k, a parent point (u,v) becomes (u+h, av+k). This gives a systematic way to build transformed graphs.'], bullets:['Start with a few reliable parent points.','Apply horizontal movement to x-coordinates.','Apply scale/reflection and vertical shift to y-coordinates.']}
        ],
        workedExamples:[
            {title:'Read a transformed quadratic', problem:'Describe y=−2(x−3)²+5 from y=x².', steps:['x−3 moves the graph right 3.','The factor −2 reflects across the x-axis and stretches vertically by 2.','+5 moves the graph up 5.','The vertex moves to (3,5).'], answer:'Right 3, reflect over x-axis, vertical stretch 2, up 5'},
            {title:'Transform a point', problem:'If (2,4) lies on y=f(x), where is the corresponding point on y=3f(x+1)−2?', steps:['x+1 means the transformed x-coordinate is 2−1=1.','Scale output: 3·4=12.','Shift down 2: 12−2=10.'], answer:'(1,10)'}
        ],
        commonMistakes:[
            {mistake:'Reading x−h as left h.', fix:'Horizontal shifts use the opposite visible sign inside the input.'},
            {mistake:'Applying an outside multiplier to x-coordinates.', fix:'An outside multiplier changes outputs, so it acts on y-values.'}
        ],
        alternateExplanation:'Imagine the parent graph printed on transparent film. Horizontal/vertical shifts slide the film; a negative outside multiplier flips it top-to-bottom; a scale factor stretches its distance from the x-axis.',
        application:'Transformations let you fit a familiar model to data without rebuilding the equation from nothing, such as shifting a seasonal wave or moving a quadratic peak to a new time and height.',
        teacherTip:'Have the student point to where each parameter lives: inside input, outside multiplier, or outside addition. Location predicts the kind of effect.',
        generators:{easy:['u1:transformShift'],standard:['u1:transformShift','u1:transformScaleReflection'],challenge:['u1:transformShift','u1:transformScaleReflection']}
    }),
    authoredLesson({
        id:'1.6', title:'Operations on Functions', summary:'Add, subtract, multiply, and divide functions while tracking what happens to both outputs and domains.', estimatedMinutes:50,
        teks:['P.2A','P.2J'],
        objectives:['Evaluate sums, differences, products, and quotients of functions.','Construct new formulas from two functions.','State domain restrictions for quotients and combined functions.'],
        prerequisites:['Function notation.','Algebraic operations and factoring.'],
        keyIdeas:['Operations on functions operate on outputs at the same input.','The domain of a combination must satisfy every original restriction.','For a quotient, additionally require the denominator function to be nonzero.'],
        formulas:['(f+g)(x)=f(x)+g(x)','(fg)(x)=f(x)g(x)','(f/g)(x)=f(x)/g(x), g(x)≠0'],
        sections:[
            {title:'Combine outputs at the same input', paragraphs:['When you see (f+g)(x), both functions receive x first, then their outputs are added. The notation does not mean f(g(x)); that is composition and comes next lesson.'], bullets:['Write the operation definition before simplifying.','Use parentheses around an entire function when subtracting.','Products may need factoring or expansion depending on the goal.']},
            {title:'Domains survive operations', paragraphs:['A new function cannot use an input forbidden by either original function. For a quotient, there is one extra rule: even if both f(x) and g(x) are individually defined, g(x) cannot equal zero because it becomes the denominator.'], bullets:['Intersection of original domains.','Then remove quotient denominator zeros.','Record restrictions before canceling factors.']},
            {title:'Operations build useful models', paragraphs:['Combining functions can represent total cost, profit, net change, or area. The operation should match the meaning of the quantities: revenue minus cost gives profit, while length times width gives area.'], bullets:['Define each component function.','Choose the operation that matches the context.','Interpret the resulting units.']}
        ],
        workedExamples:[
            {title:'Construct a difference', problem:'f(x)=x²+3x and g(x)=2x−5. Find (f−g)(x).', steps:['Write f(x)−g(x)=(x²+3x)−(2x−5).','Distribute the subtraction: x²+3x−2x+5.','Combine like terms.'], answer:'x²+x+5'},
            {title:'Track a quotient restriction', problem:'f(x)=x+2 and g(x)=x−4. State the domain of (f/g)(x).', steps:['Both original linear functions are defined for all real x.','The quotient denominator g(x)=x−4 cannot equal zero.','Exclude x=4.'], answer:'All real x except 4'}
        ],
        commonMistakes:[
            {mistake:'Forgetting to distribute a minus sign across g(x).', fix:'Place the entire subtracted function in parentheses before simplifying.'},
            {mistake:'Canceling a factor and forgetting its original restriction.', fix:'Record domain restrictions before simplification.'}
        ],
        alternateExplanation:'Think of f and g as two machines receiving the same x. Function operations combine what comes out of the machines. Composition, by contrast, feeds the output of one machine into the other.',
        application:'If R(x) is revenue and C(x) is cost, P(x)=R(x)−C(x) creates the profit function. The subtraction has a direct contextual meaning.',
        teacherTip:'When students confuse operations and composition, draw two side-by-side machines for operations and nested machines for composition.',
        generators:{easy:['u1:operationValue'],standard:['u1:operationValue','u1:quotientRestriction'],challenge:['u1:operationValue','u1:quotientRestriction']}
    }),
    authoredLesson({
        id:'1.7', title:'Composition of Functions', summary:'Feed one function’s output into another, interpret order correctly, and connect composition to multi-stage processes.', estimatedMinutes:55,
        teks:['P.2A','P.2B','P.2J'],
        objectives:['Evaluate compositions numerically and symbolically.','Explain why composition order matters.','Use composition to represent two-stage processes.'],
        prerequisites:['Function evaluation.','Operations on functions.'],
        keyIdeas:['(f∘g)(x)=f(g(x)): g acts first.','Composition is usually not commutative.','The output of the inner function must lie in the domain of the outer function.'],
        formulas:['(f∘g)(x)=f(g(x))','(g∘f)(x)=g(f(x))'],
        sections:[
            {title:'Work from the inside outward', paragraphs:['Composition connects functions in sequence. In f(g(x)), g receives the original input and produces an intermediate output. That intermediate value becomes the input to f.'], bullets:['Rewrite composition notation before calculating.','Do the inner function first.','Keep the whole inner expression in parentheses during symbolic substitution.']},
            {title:'Order changes the process', paragraphs:['In general, f(g(x)) and g(f(x)) are different because the operations happen in a different order. A discount followed by tax, for example, may behave differently from a fixed coupon followed by tax.'], bullets:['Do not assume commutativity.','Compute both orders if asked to compare.','Interpret what each stage does in context.']},
            {title:'Domain through the chain', paragraphs:['A composition requires more than x being valid for the inner function. The inner output must also be accepted by the outer function. This matters especially with square roots, logarithms, and rational functions.'], bullets:['Check the inner domain first.','Then require g(x) to land in the domain of f.','Restrictions can become inequalities in x.']}
        ],
        workedExamples:[
            {title:'Numeric composition', problem:'f(x)=2x+1, g(x)=x². Find (f∘g)(3).', steps:['Compute the inner function: g(3)=9.','Feed 9 into f: f(9)=2(9)+1.','Simplify to 19.'], answer:'19'},
            {title:'Symbolic composition', problem:'f(x)=√x and g(x)=x−5. Find f(g(x)) and its domain.', steps:['Substitute g(x) into f: f(g(x))=√(x−5).','For a real square root, require x−5≥0.','Thus x≥5.'], answer:'√(x−5), domain x≥5'}
        ],
        commonMistakes:[
            {mistake:'Doing f first in f∘g.', fix:'Rewrite as f(g(x)); the innermost function acts first.'},
            {mistake:'Losing parentheses during symbolic substitution.', fix:'Replace each x in the outer rule with the entire inner expression in parentheses.'}
        ],
        alternateExplanation:'Composition is an assembly line. The item passes through station g first, then whatever g produces moves directly into station f. Reversing the stations can produce a different product.',
        application:'A temperature conversion followed by a sensor calibration is naturally modeled by composition because the first output becomes the second input.',
        teacherTip:'Require the intermediate value to be written on its own line. This prevents many order and substitution mistakes.',
        generators:{easy:['u1:compositionValue','u1:compositionOrder'],standard:['u1:compositionValue','u1:compositionOrder'],challenge:['u1:compositionValue','u1:compositionOrder']}
    }),
    authoredLesson({
        id:'1.8', title:'Inverse Functions', summary:'Reverse one-to-one functions, verify inverses through composition, and understand the domain/range exchange behind the process.', estimatedMinutes:60,
        teks:['P.2B','P.2C','P.2N'],
        objectives:['Determine whether a function is one-to-one.','Find inverse formulas algebraically.','Verify inverses and connect inverse graphs by reflection across y=x.'],
        prerequisites:['Solving equations for a variable.','Composition of functions.'],
        keyIdeas:['An inverse reverses input-output pairs.','A function must be one-to-one for its inverse relation to be a function.','Domain and range swap between a function and its inverse.'],
        formulas:['f(f⁻¹(x))=x and f⁻¹(f(x))=x','Graph of f⁻¹ is reflection of f across y=x'],
        sections:[
            {title:'Inverse means reverse', paragraphs:['If f sends 2 to 7, then f⁻¹ sends 7 back to 2. Algebraically this reversal is represented by swapping x and y and solving for y. The superscript −1 names an inverse function; it is not an exponent meaning reciprocal.'], bullets:['Swap input and output roles.','Solve the swapped equation for y.','Rename y as f⁻¹(x).']},
            {title:'Why one-to-one matters', paragraphs:['If two different inputs share the same output, reversing the relation would make one input point to two outputs. The horizontal line test detects this problem on a graph. Sometimes a domain restriction makes a non-one-to-one function invertible.'], bullets:['Vertical line test checks whether the original relation is a function.','Horizontal line test checks whether its inverse will be a function.','Quadratics need a restricted domain to produce an inverse function.']},
            {title:'Verify instead of trusting algebra', paragraphs:['Two functions are inverses if composing them in either order returns x on the appropriate domains. This verification is especially useful when formulas are complicated or when a proposed inverse may contain an algebraic mistake.'], bullets:['Compute f(g(x)).','Compute g(f(x)).','Both should simplify to x, with domains respected.']}
        ],
        workedExamples:[
            {title:'Find a linear inverse', problem:'Find the inverse of f(x)=3x−8.', steps:['Write y=3x−8.','Swap x and y: x=3y−8.','Add 8: x+8=3y.','Divide by 3: y=(x+8)/3.'], answer:'f⁻¹(x)=(x+8)/3'},
            {title:'Restrict a quadratic', problem:'Why can f(x)=x², x≥0 have inverse f⁻¹(x)=√x?', steps:['On x≥0, the parabola passes the horizontal line test.','Swap x and y: x=y² with y≥0.','Solve y=√x, choosing the nonnegative branch because of the original domain.'], answer:'The restriction makes f one-to-one'}
        ],
        commonMistakes:[
            {mistake:'Writing f⁻¹(x)=1/f(x).', fix:'The −1 denotes inverse function, not reciprocal.'},
            {mistake:'Forgetting to check one-to-one behavior.', fix:'Use the horizontal line test or analyze the domain before claiming an inverse function exists.'}
        ],
        alternateExplanation:'A function is a reversible instruction only when each output remembers exactly which input created it. If several inputs collapse to the same output, the reverse process no longer knows which one to choose.',
        application:'Encoding and decoding formulas, measurement conversions, and calibration equations often form inverse pairs because one process deliberately reverses another.',
        teacherTip:'Have the student verify one inverse by composition. Seeing x return at the end makes the abstract idea concrete.',
        generators:{easy:['u1:inverseOneToOne'],standard:['u1:inverseLinear','u1:inverseOneToOne'],challenge:['u1:inverseLinear','u1:inverseOneToOne']}
    }),
    authoredLesson({
        id:'1.9', title:'Piecewise-Defined Functions', summary:'Read formulas that change by interval, evaluate the correct branch, and graph endpoints with precision.', estimatedMinutes:55,
        teks:['P.2F','P.2G','P.2I'],
        objectives:['Evaluate piecewise functions by selecting the correct condition.','Graph branches with correct open/closed endpoints.','Interpret piecewise rules as changing real-world conditions.'],
        prerequisites:['Linear function evaluation.','Inequalities and graph endpoints.'],
        keyIdeas:['A piecewise function is still one function; its rule changes depending on the input.','Choose the branch before evaluating.','< or > gives an open endpoint; ≤ or ≥ includes the endpoint.'],
        formulas:['Choose the branch whose condition contains the input.'],
        sections:[
            {title:'Condition first, formula second', paragraphs:['The most reliable workflow is to compare the input with the branch conditions before doing any algebra. Once the correct condition is identified, ignore the other formulas and evaluate only that branch.'], bullets:['At a breakpoint, look for the equality symbol.','Only one branch should own a normal breakpoint.','Do not plug the input into every formula and choose an answer afterward.']},
            {title:'Graphing endpoints', paragraphs:['Each branch is graphed only over its stated interval. At a boundary, a closed dot means the endpoint belongs to that branch; an open dot means it does not. Two branches can approach different y-values at the same x, creating a jump.'], bullets:['Closed dot for ≤ or ≥.','Open dot for < or >.','Continue each branch only across its own interval.']},
            {title:'Why piecewise models appear', paragraphs:['Real rules often change after a threshold: tax brackets, shipping rates, parking fees, and tiered utilities. Piecewise functions allow one mathematical model to describe those changing conditions without pretending one formula works everywhere.'], bullets:['Identify the threshold values.','Write one formula for each policy range.','Check behavior exactly at the threshold.']}
        ],
        workedExamples:[
            {title:'Evaluate at a breakpoint', problem:'p(x)=2x+1 for x<3 and x²−4 for x≥3. Find p(3).', steps:['3 does not satisfy x<3.','3 does satisfy x≥3.','Use x²−4: 9−4=5.'], answer:'5'},
            {title:'Describe graph endpoints', problem:'For q(x)=x+2 if x≤1 and 4−x if x>1, what happens at x=1?', steps:['First branch includes equality, so plot a closed point at (1,3).','Second branch excludes 1, so its point at (1,3) would be open.','Both formulas approach the same y-value, so the graph joins continuously.'], answer:'Closed at (1,3); continuous join'}
        ],
        commonMistakes:[
            {mistake:'Evaluating every branch and choosing one answer.', fix:'Use the inequality condition to choose the branch first.'},
            {mistake:'Using a closed dot for a strict inequality.', fix:'Strict < or > excludes the endpoint, so use an open dot.'}
        ],
        alternateExplanation:'A piecewise function is like a rulebook with different pages for different cases. You first decide which page applies, then follow only that page.',
        application:'A parking garage may charge one rate for the first two hours and another rate afterward. The cost is one function even though the pricing rule changes.',
        teacherTip:'Circle the condition that contains the input before touching the formula. This tiny habit prevents most evaluation errors.',
        generators:{easy:['u1:piecewiseValue','u1:piecewiseEndpoint'],standard:['u1:piecewiseValue','u1:piecewiseEndpoint'],challenge:['u1:piecewiseValue','u1:piecewiseEndpoint']}
    }),
    authoredLesson({
        id:'1.10', title:'Function Modeling & Applications', summary:'Choose, build, and interpret function models from real situations instead of treating equations as context-free symbols.', estimatedMinutes:60,
        teks:['P.2A','P.2G','P.2N'],
        objectives:['Choose a reasonable function family from contextual behavior.','Interpret parameters, inputs, outputs, and units.','Evaluate a model and judge whether a prediction is meaningful.'],
        prerequisites:['Parent functions and transformations.','Function evaluation.'],
        keyIdeas:['A model is useful because its structure matches important behavior in the situation.','Parameters must be interpreted with units.','Extrapolation outside the observed domain can be unreliable.'],
        formulas:['Linear: initial + rate·input','Quadratic vertex form: a(x−h)²+k'],
        sections:[
            {title:'Start with behavior, not a favorite formula', paragraphs:['Choose a family by asking how the quantity changes. Constant change per unit suggests linear behavior. A single maximum or minimum can suggest quadratic behavior. Inverse variation can suggest a reciprocal model. The goal is not to force data into a familiar equation but to match structure.'], bullets:['Identify the input and output variables.','Look for constant rates, turning points, restrictions, or asymptotes.','State the relevant domain.']},
            {title:'Parameters carry meaning', paragraphs:['In a model, coefficients and shifts are not decorative. A linear intercept may represent an initial fee; a slope may represent dollars per hour; a quadratic vertex may represent a peak value and when it occurs. Interpreting parameters makes the model useful.'], bullets:['Attach units to rates.','Explain what an intercept means in the context.','Interpret a vertex or asymptote when present.']},
            {title:'Models are approximations', paragraphs:['Even a mathematically correct formula can fail outside the situation it was designed for. A revenue model may work only over a realistic range of prices. A height model may stop being relevant after an object lands. Good modeling includes knowing when not to trust the formula.'], bullets:['Distinguish interpolation from extrapolation.','Reject outputs that violate physical constraints.','State assumptions when they matter.']}
        ],
        workedExamples:[
            {title:'Build a linear model', problem:'A membership costs $40 to join and $12 per month. Write and interpret C(m).', steps:['Initial value is 40.','Rate is 12 dollars per month.','C(m)=40+12m.','C(6)=112 means six months costs $112 total.'], answer:'C(m)=40+12m'},
            {title:'Interpret a quadratic vertex', problem:'A model h(t)=−16(t−2)²+80 gives height in feet. Interpret the vertex.', steps:['Vertex is (2,80).','The negative coefficient means the parabola opens downward.','At t=2 seconds the model reaches its maximum height, 80 feet.'], answer:'Maximum 80 ft at 2 s'}
        ],
        commonMistakes:[
            {mistake:'Choosing a model from one data point.', fix:'One point cannot reveal the family; use the pattern of change and context.'},
            {mistake:'Reporting a numerical answer without units or meaning.', fix:'Translate the output back into a sentence about the situation.'}
        ],
        alternateExplanation:'A function model is a compressed story. The variable names tell who is changing, the formula tells how they interact, and the parameters tell the scale, starting point, or turning point.',
        application:'Subscription cost, projectile height, shared cost, and revenue can all use different function families because their change patterns differ.',
        teacherTip:'After every model calculation, ask “What does that number mean?” If the student cannot answer, the modeling step is incomplete.',
        generators:{easy:['u1:linearModel','u1:modelChoice'],standard:['u1:linearModel','u1:modelChoice'],challenge:['u1:linearModel','u1:modelChoice']}
    }),
    authoredLesson({
        id:'1.11', title:'Unit Review / Assessment', summary:'Connect function definition, domain/range, graph analysis, transformations, operations, composition, inverses, piecewise rules, and modeling into one coherent toolkit.', estimatedMinutes:75,
        teks:['P.2A','P.2B','P.2C','P.2D','P.2E','P.2F','P.2G','P.2I','P.2J','P.2N'],
        objectives:['Select an appropriate method without being told the lesson name.','Explain reasoning for domain, transformations, composition, and inverse decisions.','Identify weak concepts for targeted review before Unit 2.'],
        prerequisites:['Lessons 1.1–1.10.'],
        keyIdeas:['Function skills are connected: domain affects operations and composition; transformations rely on parent functions; inverses depend on one-to-one behavior.','A review should diagnose reasoning, not reward memorized keywords.'],
        formulas:['AROC=[f(b)−f(a)]/(b−a)','(f∘g)(x)=f(g(x))','g(x)=a f(x−h)+k'],
        sections:[
            {title:'How to approach mixed problems', paragraphs:['Mixed review removes the label telling you which procedure to use. Begin by identifying what the question is asking: allowed inputs, an output value, graph behavior, a transformed equation, a two-stage process, or a reverse process. That classification usually points to the right tool.'], bullets:['Underline the requested quantity.','List restrictions before simplifying.','Use function notation literally.','Check whether an answer makes sense graphically and contextually.']},
            {title:'Connections worth remembering', paragraphs:['Domain restrictions carry into operations and composition. Parent functions make transformations predictable. Composition provides the cleanest algebraic test for inverse functions. Piecewise models remind you that a single function can use different formulas over different parts of its domain.'], bullets:['Do not study each lesson as an isolated trick.','Explain why a method applies before calculating.','Use the mistake notebook to choose what to revisit.']}
        ],
        workedExamples:[
            {title:'A connected problem', problem:'f(x)=√(x−1), g(x)=2x+3. Find (f∘g)(x) and its domain.', steps:['Compose: f(g(x))=√((2x+3)−1)=√(2x+2).','Require 2x+2≥0.','Solve x≥−1.'], answer:'√(2x+2), domain x≥−1'},
            {title:'Transformation plus range', problem:'Describe y=−(x−4)²+7 and state its range.', steps:['Right 4, reflect across x-axis, up 7.','Vertex is (4,7).','Because it opens downward, 7 is the maximum output.'], answer:'Range y≤7'}
        ],
        commonMistakes:[
            {mistake:'Choosing a procedure based only on a familiar-looking symbol.', fix:'First state what quantity or property the problem actually asks for.'},
            {mistake:'Ignoring restrictions in a mixed problem.', fix:'Domain is part of the function; carry it through operations, composition, and inverses.'}
        ],
        alternateExplanation:'Think of Unit 1 as learning the grammar of functions. The review checks whether you can read and write that language without needing each sentence labeled with a rule name.',
        application:'Real modeling rarely announces “this is a composition problem.” The purpose of a mixed assessment is to practice recognizing the structure yourself.',
        teacherTip:'Use misses diagnostically. A domain mistake should send the student back to 1.2; a composition-order mistake to 1.7; a reciprocal/inverse confusion to 1.8.',
        generators:{easy:['u1:functionValue','u1:domainRational','u1:parentFamily','u1:piecewiseValue'],standard:['u1:averageRate','u1:transformShift','u1:operationValue','u1:compositionValue','u1:inverseLinear','u1:linearModel'],challenge:['u1:domainRadical','u1:transformScaleReflection','u1:quotientRestriction','u1:compositionValue','u1:inverseOneToOne','u1:modelChoice']}
    })
];

export default authoredUnit(1, 'Functions and Their Graphs', '~4 weeks', ['P.2A','P.2B','P.2C','P.2D','P.2E','P.2F','P.2G','P.2I','P.2J','P.2N'], lessons);
