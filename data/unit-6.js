import '../js/generators-unit6.js';
import { authoredLesson, authoredUnit } from './lesson-schema.js';

const unitTeks = ['P.5M','P.5N'];

const lessons = [
  authoredLesson({
    id:'6.1', title:'Fundamental Trigonometric Identities', estimatedMinutes:55, teks:['P.5M'],
    summary:'Build a small, connected identity toolkit from reciprocal and quotient relationships, then use it to rewrite expressions in forms that expose cancellation and structure instead of memorizing unrelated formulas.',
    objectives:['Recall reciprocal and quotient identities accurately.','Rewrite secant, cosecant, tangent, and cotangent using sine and cosine.','Choose rewrites that make an expression easier to simplify or evaluate.'],
    prerequisites:['Unit-circle definitions of sine and cosine.','Fraction multiplication and simplification.','The six trigonometric functions from Unit 5.'],
    keyIdeas:['Reciprocal identities pair sin↔csc, cos↔sec, and tan↔cot.','Quotient identities are tanθ=sinθ/cosθ and cotθ=cosθ/sinθ.','Rewriting everything in sine and cosine is often a reliable simplification strategy, but not always the shortest one.'],
    formulas:['cscθ=1/sinθ, secθ=1/cosθ, cotθ=1/tanθ','tanθ=sinθ/cosθ, cotθ=cosθ/sinθ'],
    sections:[
      {title:'Treat identities as definitions you can move between',paragraphs:['An identity is an equation that is true for every input where both sides are defined. Reciprocal and quotient identities are especially useful because they connect all six trig functions back to sine and cosine. That means a complicated-looking expression can often be translated into ordinary fractions and simplified with familiar algebra.'],bullets:['Secant is not “another cosine”; it is cosine’s reciprocal.','Cotangent is both 1/tanθ and cosθ/sinθ.','Domain restrictions still matter when a denominator is zero.']},
      {title:'Rewrite with a purpose',paragraphs:['Do not mechanically convert every expression. Ask what you want to reveal. If you see secθ·cosθ, the reciprocal relationship already gives 1. If you see tanθ next to a cosine factor, rewriting tangent as sinθ/cosθ creates a cancellation. Good identity work is pattern recognition plus algebra, not formula dumping.'],bullets:['Look for reciprocal pairs before expanding.','Use sine/cosine when several different trig functions appear.','Keep factors grouped so valid cancellation is visible.']},
      {title:'Equivalent does not mean unrestricted',paragraphs:['Identity statements assume common domain values. For example, tanθ=sinθ/cosθ is only meaningful when cosθ≠0. In this course, the goal is to manipulate expressions correctly while remembering that rewriting never creates permission to divide by zero.'],bullets:['Ask what denominators could be zero.','Equivalent forms can have the same value wherever both are defined.','Avoid “canceling” terms separated by addition.']}
    ],
    workedExamples:[
      {title:'Rewrite a product',problem:'Rewrite secθ·tanθ using only sine and cosine.',steps:['Use secθ=1/cosθ.','Use tanθ=sinθ/cosθ.','Multiply: (1/cosθ)(sinθ/cosθ)=sinθ/cos²θ.'],answer:'sinθ/cos²θ'},
      {title:'Use a reciprocal value',problem:'If cosθ=4/7, find secθ.',steps:['Secant is the reciprocal of cosine.','secθ=1/(4/7).','Invert the fraction to get 7/4.'],answer:'7/4'}
    ],
    commonMistakes:[{mistake:'Pairing secant with sine or cosecant with cosine.',fix:'Say the three reciprocal pairs explicitly: sin-csc, cos-sec, tan-cot.'},{mistake:'Canceling pieces across addition.',fix:'Only common factors cancel. A term inside a sum is not automatically a factor of the whole expression.'}],
    alternateExplanation:'Think of sine and cosine as the two base currencies of trigonometry. Secant, cosecant, tangent, and cotangent can all be exchanged into those currencies. Once everything is written in a common language, ordinary fraction algebra usually reveals the simplification.',
    application:'Identity rewriting becomes essential when deriving formulas for waves, rotations, signal processing, and later calculus. The point is not memorization for its own sake; it is being able to recognize when two formulas describe the same quantity in different forms.',
    teacherTip:'Before writing anything, circle reciprocal pairs and underline quotient functions. That visual scan often reveals the shortest first move and prevents unnecessary expansion.',
    generators:{easy:['u6:reciprocalIdentity','u6:quotientIdentity','u6:reciprocalEvaluate'],standard:['u6:rewriteSecTan','u6:reciprocalEvaluate','u6:quotientIdentity'],challenge:['u6:rewriteSecTan','u6:reciprocalEvaluate']}
  }),
  authoredLesson({
    id:'6.2', title:'Pythagorean Identities', estimatedMinutes:60, teks:['P.5M'],
    summary:'Connect the unit-circle equation to the three Pythagorean trig identities, derive the tangent/secant and cotangent/cosecant versions, and use them to find missing values and rewrite squared expressions.',
    objectives:['Explain why sin²θ+cos²θ=1.','Derive 1+tan²θ=sec²θ and 1+cot²θ=csc²θ.','Use Pythagorean identities to find missing trig values with correct signs.'],
    prerequisites:['Unit-circle coordinates.','Reciprocal and quotient identities.','Pythagorean Theorem and algebraic rearrangement.'],
    keyIdeas:['The core identity is the unit-circle equation in trig notation.','The other two Pythagorean identities come from dividing the core identity by cos²θ or sin²θ.','When solving for a missing trig value, the quadrant determines the sign.'],
    formulas:['sin²θ+cos²θ=1','1+tan²θ=sec²θ','1+cot²θ=csc²θ'],
    sections:[
      {title:'The unit circle is the source',paragraphs:['A point on the unit circle has coordinates (cosθ,sinθ), and every point satisfies x²+y²=1. Substituting x=cosθ and y=sinθ gives sin²θ+cos²θ=1 immediately. This is not an arbitrary fact to memorize; it is the Pythagorean Theorem built into a radius-1 circle.'],bullets:['cosθ is the horizontal coordinate.','sinθ is the vertical coordinate.','Squaring removes sign but not the need to restore sign later.']},
      {title:'Derive instead of memorizing three separate rules',paragraphs:['Divide the core identity by cos²θ and each term becomes tan²θ+1=sec²θ. Divide instead by sin²θ and you obtain 1+cot²θ=csc²θ. Remembering the derivation gives you a way to recover the formulas if memory fails.'],bullets:['Divide every term, not just one.','Use quotient and reciprocal identities during simplification.','The identity version you choose should match the functions already present.']},
      {title:'Magnitude first, sign second',paragraphs:['If one trig value and a quadrant are known, a Pythagorean identity determines the missing magnitude. Then use the quadrant to choose the correct sign. Squaring equations can hide sign information, so never let the square root symbol make the quadrant decision for you.'],bullets:['ASTC/sign charts still matter.','A reference triangle can check your result.','Reciprocal values can be found after the primary sine/cosine/tangent value is known.']}
    ],
    workedExamples:[
      {title:'Derive a missing cosine',problem:'Given sinθ=3/5 and θ is in Quadrant II, find cosθ.',steps:['Use sin²θ+cos²θ=1.','cos²θ=1−9/25=16/25.','cosθ=±4/5.','Quadrant II has negative cosine, so cosθ=−4/5.'],answer:'−4/5'},
      {title:'Derive the tangent identity',problem:'Show how 1+tan²θ=sec²θ follows from sin²θ+cos²θ=1.',steps:['Divide every term by cos²θ.','sin²θ/cos²θ + cos²θ/cos²θ = 1/cos²θ.','Simplify to tan²θ+1=sec²θ.'],answer:'1+tan²θ=sec²θ'}
    ],
    commonMistakes:[{mistake:'Taking a square root and automatically choosing the positive value.',fix:'Use the quadrant to decide the sign of the unsquared trig function.'},{mistake:'Mixing the derived identities.',fix:'The tangent identity pairs with secant; the cotangent identity pairs with cosecant.'}],
    alternateExplanation:'Imagine the three identities as one family tree. The parent is sin²+cos²=1. Divide the whole family by cos² and tangent/secant appear; divide by sin² and cotangent/cosecant appear. You only need to remember the parent and how division transforms it.',
    application:'Pythagorean identities let you switch between measurements in periodic models without knowing the angle directly. They also become essential simplification tools in physics, engineering, and calculus where expressions are often given in one trig form and needed in another.',
    teacherTip:'When a student forgets a derived identity, do not reteach it as a separate formula. Have them derive it from sin²+cos²=1 so the structure becomes durable.',
    generators:{easy:['u6:pythagoreanCore','u6:pythagoreanTan','u6:pythagoreanCot'],standard:['u6:findMissingTrig','u6:pythagoreanTan','u6:pythagoreanCot'],challenge:['u6:findMissingTrig','u6:pythagoreanCore']}
  }),
  authoredLesson({
    id:'6.3', title:'Simplifying Trigonometric Expressions', estimatedMinutes:65, teks:['P.5M'],
    summary:'Simplify trig expressions by combining algebra with reciprocal, quotient, and Pythagorean identities, choosing transformations that reduce complexity while preserving the expression’s value.',
    objectives:['Recognize high-value identity patterns inside larger expressions.','Rewrite complex trig fractions into simpler equivalent forms.','Explain why cancellation is valid only for factors, not terms.'],
    prerequisites:['Lessons 6.1–6.2 identities.','Factoring and rational-expression simplification.','Comfort manipulating fractions.'],
    keyIdeas:['Identity simplification is algebra with a specialized vocabulary.','Converting to sine and cosine is a reliable fallback strategy.','A good simplification reduces the number of operations or trig-function types.'],
    formulas:['1−sin²θ=cos²θ','1−cos²θ=sin²θ','tanθ=sinθ/cosθ, secθ=1/cosθ'],
    sections:[
      {title:'Scan before you manipulate',paragraphs:['Before expanding anything, look for complete identity patterns such as 1−sin²θ, 1−cos²θ, tanθcosθ, or reciprocal products. Replacing a whole recognizable pattern is usually cleaner than turning every symbol into fractions immediately.'],bullets:['Circle Pythagorean patterns.','Look for reciprocal pairs.','Ask which rewrite removes a denominator or creates a common factor.']},
      {title:'Use sine and cosine as a fallback',paragraphs:['When an expression mixes secant, tangent, cosecant, and cotangent, converting to sine and cosine often reveals an ordinary rational expression. Combine fractions, factor where possible, and then use a Pythagorean identity if a 1−sin² or 1−cos² pattern appears.'],bullets:['Rewrite one layer at a time.','Keep denominators visible.','Factor before canceling.']},
      {title:'Define what “simpler” means',paragraphs:['Trig expressions can have many equivalent forms. In this course, simpler usually means fewer function types, fewer fractions, or a standard identity form. If the instructions require a specific function or form, that target determines the best path.'],bullets:['Equivalent answers can look different.','A target form can guide the first identity choice.','Never sacrifice domain awareness just to make an expression shorter.']}
    ],
    workedExamples:[
      {title:'Use a quotient identity',problem:'Simplify tanθ·cosθ.',steps:['Rewrite tanθ as sinθ/cosθ.','Multiply by cosθ.','Cancel the common cosine factor where defined.'],answer:'sinθ'},
      {title:'Combine identities and algebra',problem:'Simplify (secθ−cosθ)/tanθ.',steps:['Rewrite secθ as 1/cosθ.','Combine the numerator to (1−cos²θ)/cosθ.','Replace 1−cos²θ with sin²θ.','Divide by tanθ=sinθ/cosθ and cancel.'],answer:'sinθ'}
    ],
    commonMistakes:[{mistake:'Canceling a term from a sum, such as canceling cosθ in 1−cosθ.',fix:'Cancellation requires a common factor multiplying the entire expression.'},{mistake:'Expanding everything even when a direct identity is visible.',fix:'Replace complete identity patterns first; expand only when it creates a useful structure.'}],
    alternateExplanation:'Think of simplification as compressing a sentence without changing its meaning. Trig identities are synonyms. Replacing a long phrase with the right synonym can expose familiar algebra, but replacing every word at once can make the sentence harder to read.',
    application:'Simplifying before calculation reduces numerical error and makes formulas easier to interpret. Engineers and scientists routinely rewrite trigonometric expressions to expose amplitude, phase, energy, or symmetry before evaluating them.',
    teacherTip:'Have the learner name the identity before using it. Saying “Pythagorean identity” or “quotient identity” slows impulsive algebra and makes the reasoning auditable.',
    generators:{easy:['u6:simplifyOneMinusSin2','u6:simplifyTanCos','u6:simplifyCscSin'],standard:['u6:simplifySecMinusCos','u6:simplifyTanCos','u6:simplifyOneMinusSin2'],challenge:['u6:simplifySecMinusCos','u6:simplifyCscSin']}
  }),
  authoredLesson({
    id:'6.4', title:'Verifying Trigonometric Identities', estimatedMinutes:70, teks:['P.5M'],
    summary:'Verify that two trig expressions are identical by transforming one side through valid algebra and known identities, while avoiding numerical “proofs,” invalid cancellation, and operations that obscure the target.',
    objectives:['Distinguish verifying an identity from solving an equation.','Choose productive first moves based on the target form.','Write a clear chain of equivalent expressions that ends at the other side.'],
    prerequisites:['Fundamental and Pythagorean identities.','Rational-expression algebra.','Factoring and common denominators.'],
    keyIdeas:['An identity must hold for every input in the common domain.','Usually transform the more complicated side and leave the simpler side unchanged.','Every line in a verification should follow from a valid identity or algebraic equivalence.'],
    formulas:['Use identities from 6.1–6.3 as rewrite tools','A numerical check is evidence, not proof'],
    sections:[
      {title:'Verification is not solving',paragraphs:['When solving an equation, you search for values of the variable that make the equation true. When verifying an identity, the variable is not something to isolate. Your job is to demonstrate that one expression can be rewritten into the other for all allowed inputs.'],bullets:['Do not “solve for θ.”','Do not assume the identity and manipulate both sides simultaneously.','Keep a one-direction chain of equivalent expressions.']},
      {title:'Let the target guide you',paragraphs:['If one side contains only sine and cosine, rewriting the other side into sine and cosine is promising. If the target has a single fraction, creating a common denominator may help. If a numerator contains 1−cos²θ, a Pythagorean identity is likely the intended bridge.'],bullets:['Start with the more complicated side.','Match the function types appearing in the target.','Factor before expanding if the target looks factored.']},
      {title:'Know what does not count as proof',paragraphs:['Checking θ=30° and θ=45° can reveal that a proposed identity is false, but passing those checks does not prove it true for all values. Likewise, canceling across addition or dividing by an expression that may be zero can invalidate a derivation.'],bullets:['Use numerical substitution only as a quick diagnostic.','Cancellation applies to factors.','Mention domain restrictions when a rewrite introduces denominators.']}
    ],
    workedExamples:[
      {title:'Verify with a Pythagorean identity',problem:'Verify (1−cos²θ)/sinθ = sinθ.',steps:['Begin with the left side.','Use 1−cos²θ=sin²θ.','Then sin²θ/sinθ=sinθ wherever both sides are defined.','The result matches the right side.'],answer:'Verified'},
      {title:'Verify by rewriting tangent',problem:'Verify tanθ/secθ = sinθ.',steps:['Start with tanθ/secθ.','Rewrite tanθ=sinθ/cosθ and secθ=1/cosθ.','Divide by 1/cosθ, equivalent to multiplying by cosθ.','The cosine factors cancel, leaving sinθ.'],answer:'Verified'}
    ],
    commonMistakes:[{mistake:'Manipulating both sides until they meet somewhere in the middle.',fix:'Keep one side fixed as the target and transform the other side in a traceable chain.'},{mistake:'Proving by plugging in one convenient angle.',fix:'A single example cannot establish an identity for every value in the domain.'}],
    alternateExplanation:'Verification is like showing two routes on a map reach the same destination. You are not allowed to teleport between roads. Each rewrite must be a legal road segment, and the destination is the untouched expression on the other side.',
    application:'Identity verification is mathematical quality control. The same habits—maintaining equivalence, documenting transformations, and respecting domains—are used when deriving physical formulas and checking symbolic computer-algebra results.',
    teacherTip:'Ask “What does the other side look like?” before asking “Which identity do you know?” That shift encourages goal-directed reasoning instead of random formula substitution.',
    generators:{easy:['u6:verifyStrategy','u6:verifyFirstStep'],standard:['u6:verifyFirstStep','u6:verifyInvalidMove','u6:simplifyTanCos'],challenge:['u6:verifyInvalidMove','u6:simplifySecMinusCos']}
  }),
  authoredLesson({
    id:'6.5', title:'Solving Basic Trigonometric Equations', estimatedMinutes:65, teks:['P.5N'],
    summary:'Solve equations such as sinx=a, cosx=a, and tanx=a over specified intervals by combining unit-circle values, reference angles, quadrant signs, and periodicity.',
    objectives:['Solve basic sine, cosine, and tangent equations on 0≤x<2π.','Use signs and reference angles to find every solution in an interval.','Explain why trig equations often have more than one answer.'],
    prerequisites:['Unit circle and special angles.','Reference angles and quadrant signs.','Periods of sine, cosine, and tangent.'],
    keyIdeas:['A trig equation asks where a periodic function reaches a specified output.','Sine and cosine usually produce two solutions in a full cycle for non-extreme standard values.','Tangent has period π, so its pattern repeats twice in [0,2π).'],
    formulas:['sinx=a, cosx=a, tanx=a','sin/cos period 2π; tan period π'],
    sections:[
      {title:'Start with the reference angle',paragraphs:['For a standard value such as 1/2 or √2/2, first identify the acute angle with that magnitude. Then use the sign of the required trig value to choose the correct quadrants. This separates the easy magnitude question from the sign/location question.'],bullets:['Reference angle gives magnitude.','Quadrant gives sign.','Interval determines which repeated angles are allowed.']},
      {title:'List every solution, not just the first one',paragraphs:['Inverse trig buttons return one principal angle, not the full solution set. On an interval such as 0≤x<2π, you must use symmetry and periodicity to find every matching angle. A calculator answer is a starting point, not a complete solution.'],bullets:['Check the full interval.','Use unit-circle symmetry.','Do not include 2π when the interval is x<2π.']},
      {title:'Use the graph as a mental check',paragraphs:['Imagine a horizontal line y=a crossing the sine or cosine graph. Each intersection corresponds to a solution. For tangent, remember the graph repeats every π between vertical asymptotes. This graph viewpoint helps explain why multiple answers are normal.'],bullets:['Solutions are x-coordinates of intersections.','Extreme values ±1 can create one sine/cosine solution per cycle endpoint pattern.','Tangent’s shorter period changes the repetition rule.']}
    ],
    workedExamples:[
      {title:'Solve a sine equation',problem:'Solve sinx=1/2 on 0≤x<2π.',steps:['Reference angle is π/6.','Sine is positive in Quadrants I and II.','Angles are π/6 and 5π/6.'],answer:'π/6, 5π/6'},
      {title:'Solve a tangent equation',problem:'Solve tanx=−1 on 0≤x<2π.',steps:['Reference angle is π/4.','Tangent is negative in Quadrants II and IV.','Angles are 3π/4 and 7π/4.'],answer:'3π/4, 7π/4'}
    ],
    commonMistakes:[{mistake:'Giving only the principal inverse-trig angle.',fix:'Use the principal angle to get the reference angle, then find every valid quadrant/period solution.'},{mistake:'Including an excluded endpoint such as 2π in 0≤x<2π.',fix:'Read interval symbols carefully before finalizing the solution list.'}],
    alternateExplanation:'Treat the equation as a question about the unit circle: “At which points does the x-coordinate, y-coordinate, or slope ratio equal this number?” Walk around one allowed cycle and record every point that works.',
    application:'Basic trig equations model recurring events such as when a Ferris wheel reaches a certain height, when a tide reaches a threshold, or when an AC signal reaches a specified voltage during a cycle.',
    teacherTip:'Require a quick quadrant sketch beside every equation until the learner reliably lists all solutions. It is faster than correcting missing-angle mistakes later.',
    generators:{easy:['u6:solveSinBasic','u6:solveCosBasic'],standard:['u6:solveSinBasic','u6:solveCosBasic','u6:solveTanBasic'],challenge:['u6:solveTanBasic','u6:solveSinBasic','u6:solveCosBasic']}
  }),
  authoredLesson({
    id:'6.6', title:'Solving Multi-Step Trigonometric Equations', estimatedMinutes:75, teks:['P.5N'],
    summary:'Solve trig equations that require algebra, factoring, square roots, or identities before the unit-circle step, while tracking all branches and interval restrictions so no valid solutions disappear.',
    objectives:['Isolate a trig expression with ordinary algebra before solving.','Solve squared and factored trig equations without losing ± cases or zero-product branches.','Use identities to transform equations into basic solvable forms.'],
    prerequisites:['Lesson 6.5 basic equations.','Factoring and zero-product property.','Pythagorean identities.'],
    keyIdeas:['Do the algebra first, then the trigonometry.','Squaring or square roots can create multiple sign branches.','Factored equations require solving every zero-product branch.'],
    formulas:['Zero-product property','If u²=a, then u=±√a when a>0','Pythagorean identities can reduce mixed expressions'],
    sections:[
      {title:'Treat the trig function like a variable',paragraphs:['In 2sinx−1=0, temporarily imagine u=sinx. Solve 2u−1=0 exactly as an algebra equation, then replace u with sinx and use the unit circle. This two-stage structure keeps the work organized.'],bullets:['Algebra stage first.','Trig-solution stage second.','Apply the interval only to the final angle solutions.']},
      {title:'Respect branches created by algebra',paragraphs:['If sin²x=1/2, taking a square root produces sinx=±√2/2. Forgetting the negative branch removes half the solutions. If an expression factors, solve every factor equal to zero and combine the results.'],bullets:['Square root → ± branch.','Product equals zero → one branch per factor.','Combine and deduplicate the final solution set.']},
      {title:'Use identities when two trig forms are mixed',paragraphs:['Equations such as 1−cos²x=3/4 become basic equations once you recognize 1−cos²x=sin²x. The best identity is usually the one that reduces the number of different trig functions.'],bullets:['Look for Pythagorean patterns.','Aim for one trig function.','Then use the unit circle or inverse trig as appropriate.']}
    ],
    workedExamples:[
      {title:'Solve a squared equation',problem:'Solve 2sin²x−1=0 on 0≤x<2π.',steps:['Isolate sin²x=1/2.','Take square roots: sinx=±√2/2.','Positive sine gives π/4,3π/4.','Negative sine gives 5π/4,7π/4.'],answer:'π/4, 3π/4, 5π/4, 7π/4'},
      {title:'Solve by factoring',problem:'Solve sinx(2cosx−1)=0 on 0≤x<2π.',steps:['Set sinx=0 or 2cosx−1=0.','sinx=0 gives 0,π.','cosx=1/2 gives π/3,5π/3.','Combine the branches.'],answer:'0, π/3, π, 5π/3'}
    ],
    commonMistakes:[{mistake:'Forgetting ± after taking a square root.',fix:'Whenever u²=a>0, explicitly write u=±√a before solving the trig equations.'},{mistake:'Solving only one factor of a product equal to zero.',fix:'Each factor creates its own equation and its own solution branch.'}],
    alternateExplanation:'Multi-step trig equations are algebra equations wearing periodic-function clothing. Strip away the algebra layers until one trig function is isolated, then switch mental gears to unit-circle or graph reasoning.',
    application:'Real models often include scaled, shifted, or squared trig terms rather than bare sinx or cosx. Solving multi-step equations lets you determine all times, positions, or phases at which a periodic system satisfies a constraint.',
    teacherTip:'Draw a vertical divider on the page: algebra reduction on the left, trig solution set on the right. This prevents learners from mixing operations and losing branches.',
    generators:{easy:['u6:solveLinearTrig','u6:solveSquaredTrig'],standard:['u6:solveLinearTrig','u6:solveSquaredTrig','u6:solveFactoredTrig'],challenge:['u6:solveFactoredTrig','u6:solveIdentityEquation','u6:solveSquaredTrig']}
  }),
  authoredLesson({
    id:'6.7', title:'Sum & Difference Formulas', estimatedMinutes:70, teks:['P.5M','P.5N'],
    summary:'Use sine and cosine sum/difference formulas to evaluate nonstandard angles exactly, rewrite expressions, and connect familiar special-angle values to angles such as 15° and 75°.',
    objectives:['Recall and distinguish sine and cosine sum/difference formulas.','Evaluate exact trig values at angles formed from special angles.','Use formula structure to avoid sign mistakes.'],
    prerequisites:['Exact Unit 5 special-angle values.','Algebra with radicals.','Fundamental trig identities.'],
    keyIdeas:['Sine mixes sin-cos and cos-sin and keeps the operation sign.','Cosine uses cos-cos and sin-sin but reverses the operation sign.','Many unfamiliar angles become manageable when decomposed into familiar special angles.'],
    formulas:['sin(A±B)=sinAcosB±cosAsinB','cos(A±B)=cosAcosB∓sinAsinB'],
    sections:[
      {title:'Learn the structure, not a random string',paragraphs:['The sine formula alternates function types: sin-cos plus or minus cos-sin. The cosine formula pairs like functions: cos-cos and sin-sin, but the sign reverses. Seeing those patterns is more reliable than memorizing a row of symbols without meaning.'],bullets:['Sine: mixed products, same sign.','Cosine: like products, opposite sign.','Write the formula before substituting numbers.']},
      {title:'Decompose the target angle strategically',paragraphs:['Angles such as 75° and 15° are not standard unit-circle angles, but 75°=45°+30° and 15°=45°−30°. Choose a decomposition whose pieces have exact values you already know.'],bullets:['Prefer 30°,45°,60° pieces.','Both orderings may work, but consistent substitution reduces errors.','Keep radicals exact until the final simplification.']},
      {title:'Use formulas in reverse too',paragraphs:['A pattern such as sinAcosB+cosAsinB can be compressed to sin(A+B). Recognizing formulas in reverse becomes useful in identity verification and equation solving, not just exact-value exercises.'],bullets:['Expanded ↔ compact forms are equivalent.','Pattern recognition can shorten a verification dramatically.','Check the sign before naming the formula.']}
    ],
    workedExamples:[
      {title:'Find sin75° exactly',problem:'Evaluate sin75°.',steps:['Write 75°=45°+30°.','Use sin(A+B)=sinAcosB+cosAsinB.','Substitute √2/2·√3/2 + √2/2·1/2.','Combine to (√6+√2)/4.'],answer:'(√6+√2)/4'},
      {title:'Find cos15° exactly',problem:'Evaluate cos15°.',steps:['Write 15°=45°−30°.','Use cos(A−B)=cosAcosB+sinAsinB.','Substitute the exact 45° and 30° values.','Simplify to (√6+√2)/4.'],answer:'(√6+√2)/4'}
    ],
    commonMistakes:[{mistake:'Using the sine sign rule for cosine.',fix:'Cosine reverses the operation sign: cos(A+B) uses subtraction; cos(A−B) uses addition.'},{mistake:'Converting exact radical answers to decimals too early.',fix:'Keep exact values throughout unless the problem specifically requests an approximation.'}],
    alternateExplanation:'Think of these formulas as angle-combination machines. Feed in two angles whose trig values you know, and the machine outputs the trig value of their sum or difference without needing a calculator approximation.',
    application:'Sum and difference relationships appear when combining rotations, phase shifts, and oscillations. They also explain why shifted sine waves can be rewritten in different but equivalent forms in physics and engineering.',
    teacherTip:'Have the learner write a two-word cue above each formula: “sine same” and “cosine opposite.” It is crude but remarkably effective for preventing sign swaps.',
    generators:{easy:['u6:sumFormulaRecognize','u6:differenceFormulaRecognize'],standard:['u6:exactSumSin','u6:exactSumCos','u6:sumFormulaRecognize'],challenge:['u6:exactSumSin','u6:exactSumCos']}
  }),
  authoredLesson({
    id:'6.8', title:'Double-Angle Formulas', estimatedMinutes:65, teks:['P.5M'],
    summary:'Derive and apply double-angle formulas for sine and cosine, choose among equivalent cosine forms, and use known trig values to evaluate functions at twice an angle.',
    objectives:['Derive sin(2θ) and cos(2θ) from sum formulas.','Choose a cosine double-angle form that matches the available information.','Evaluate double-angle expressions exactly from known trig values.'],
    prerequisites:['Lesson 6.7 sum formulas.','Pythagorean identities.','Exact fraction arithmetic.'],
    keyIdeas:['A double-angle formula is a sum formula with A=B=θ.','sin(2θ)=2sinθcosθ.','cos(2θ) has three equivalent forms, useful with different given information.'],
    formulas:['sin(2θ)=2sinθcosθ','cos(2θ)=cos²θ−sin²θ','cos(2θ)=2cos²θ−1=1−2sin²θ'],
    sections:[
      {title:'Derive rather than memorize',paragraphs:['Set A=B=θ in the sum formulas. The sine sum formula immediately becomes 2sinθcosθ. The cosine sum formula becomes cos²θ−sin²θ. Using sin²θ+cos²θ=1 then creates the two alternate cosine forms.'],bullets:['Derivation explains the coefficient 2.','All three cosine forms are equivalent.','The available givens should determine which form you choose.']},
      {title:'Choose the efficient cosine form',paragraphs:['If you know only cosine, use 2cos²θ−1. If you know only sine, use 1−2sin²θ. If both sine and cosine are known, cos²θ−sin²θ is direct. Choosing well avoids unnecessary square roots and sign decisions.'],bullets:['Match formula to known data.','Avoid manufacturing a missing value unless needed.','Square values exactly before subtracting.']},
      {title:'Remember that 2θ changes location',paragraphs:['Even if θ lies in one quadrant, 2θ may lie somewhere else. The formula handles the value correctly, but when checking signs mentally, reason about the doubled angle rather than assuming the sign matches the original angle.'],bullets:['Doubling changes the angle, not just the output.','Use exact formulas first, quadrant intuition second.','Equivalent formulas should produce the same result.']}
    ],
    workedExamples:[
      {title:'Evaluate sin2θ',problem:'If sinθ=3/5 and cosθ=4/5, find sin(2θ).',steps:['Use sin2θ=2sinθcosθ.','Substitute 2(3/5)(4/5).','Multiply to get 24/25.'],answer:'24/25'},
      {title:'Choose a cosine form',problem:'If sinθ=5/13, find cos(2θ) without finding cosθ.',steps:['Use cos2θ=1−2sin²θ.','Substitute 1−2(25/169).','Compute (169−50)/169.'],answer:'119/169'}
    ],
    commonMistakes:[{mistake:'Writing sin(2θ)=2sinθ.',fix:'Sine is not linear in the angle. The correct formula is 2sinθcosθ.'},{mistake:'Using cos²θ+sin²θ for cos2θ.',fix:'The plus combination equals 1; the double-angle formula uses a difference or one of its equivalent rearrangements.'}],
    alternateExplanation:'Double-angle formulas are not a new topic glued onto trigonometry. They are simply the sum formulas asked the special question, “What happens when both input angles are the same?”',
    application:'Double-angle relationships appear in wave interference, rotating systems, power formulas, and later integration techniques. They let a model switch between a doubled frequency and powers of sine/cosine.',
    teacherTip:'When multiple cosine forms are available, ask “Which one uses only what I already know?” before doing any arithmetic.',
    generators:{easy:['u6:doubleAngleRecognize','u6:doubleCosRecognize'],standard:['u6:doubleAngleExact','u6:doubleAngleRecognize','u6:doubleCosRecognize'],challenge:['u6:doubleAngleExact','u6:mixedExactValue']}
  }),
  authoredLesson({
    id:'6.9', title:'Half-Angle Formulas', estimatedMinutes:70, teks:['P.5M'],
    summary:'Use half-angle formulas to evaluate trig functions at halved angles, determine the correct ± sign from the half-angle’s quadrant, and simplify exact nested radical values.',
    objectives:['Use sine and cosine half-angle formulas correctly.','Determine the sign from the location of θ/2 rather than θ.','Evaluate common exact half-angle values such as π/8.'],
    prerequisites:['Double-angle formulas.','Quadrant signs.','Simplifying square roots.'],
    keyIdeas:['Half-angle formulas come from rearranged cosine double-angle identities.','The radical introduces ±, and the quadrant of θ/2 determines the sign.','The known angle is θ while the requested angle is θ/2, so track which angle each fact refers to.'],
    formulas:['sin(θ/2)=±√((1−cosθ)/2)','cos(θ/2)=±√((1+cosθ)/2)'],
    sections:[
      {title:'Reverse the double-angle relationship',paragraphs:['Starting with cosθ=1−2sin²(θ/2) or cosθ=2cos²(θ/2)−1, solve algebraically for the squared half-angle function. Taking a square root produces the half-angle formulas. This derivation explains both the 1±cosθ structure and the radical.'],bullets:['Sine half-angle uses 1−cosθ.','Cosine half-angle uses 1+cosθ.','The outer ± is a sign decision, not decoration.']},
      {title:'Find the quadrant of the half-angle',paragraphs:['If π<θ<2π, then dividing the entire inequality by 2 gives π/2<θ/2<π. That places θ/2 in Quadrant II. Do not use the quadrant of θ itself to choose the sign.'],bullets:['Halve the interval endpoints.','Locate θ/2.','Then choose the sign of sine or cosine in that quadrant.']},
      {title:'Nested radicals are normal exact answers',paragraphs:['Values such as cos(π/8) naturally involve √(2+√2)/2. These are exact values, not algebra gone wrong. Keep them exact unless a decimal approximation is explicitly requested.'],bullets:['Do not decimalize prematurely.','Equivalent radical forms may exist.','Check sign and approximate size as a reasonableness test.']}
    ],
    workedExamples:[
      {title:'Find cosπ/8',problem:'Evaluate cos(π/8) exactly.',steps:['Let θ=π/4, so θ/2=π/8.','Use cos(θ/2)=+√((1+cosθ)/2).','Substitute cosπ/4=√2/2.','Simplify to √(2+√2)/2.'],answer:'√(2+√2)/2'},
      {title:'Determine a sign from an interval',problem:'If π<θ<2π, what sign does cos(θ/2) have?',steps:['Divide the interval by 2: π/2<θ/2<π.','That is Quadrant II.','Cosine is negative in Quadrant II.'],answer:'Negative'}
    ],
    commonMistakes:[{mistake:'Choosing the sign from θ instead of θ/2.',fix:'First halve the interval containing θ, then identify the quadrant of θ/2.'},{mistake:'Forgetting the square root creates ±.',fix:'The formula includes ± because solving a squared trig value does not determine sign by itself.'}],
    alternateExplanation:'Half-angle formulas answer a geometric zoom question: if you know a trig value at θ, what can you infer at an angle half as large? The double-angle identity supplies the magnitude, and the unit-circle quadrant supplies the sign.',
    application:'Half-angle identities appear when converting between frequency descriptions, simplifying rational trig expressions, and deriving exact values that do not appear directly on the standard-angle unit circle.',
    teacherTip:'Make the learner write a tiny interval line for θ/2 before touching the radical. That one step prevents most half-angle sign errors.',
    generators:{easy:['u6:halfAngleRecognize','u6:halfAngleSign'],standard:['u6:halfAngleExact','u6:halfAngleSign','u6:halfAngleRecognize'],challenge:['u6:halfAngleExact','u6:mixedExactValue']}
  }),
  authoredLesson({
    id:'6.10', title:'Applying Identities & Formulas', estimatedMinutes:75, teks:['P.5M','P.5N'],
    summary:'Choose among reciprocal, quotient, Pythagorean, sum/difference, double-angle, and half-angle tools in mixed problems where the main challenge is deciding what strategy fits rather than being told which formula to use.',
    objectives:['Select an identity based on expression structure and known information.','Combine more than one identity in a coherent solution.','Explain why a chosen formula is efficient compared with plausible alternatives.'],
    prerequisites:['Lessons 6.1–6.9.','Algebraic simplification and equation solving.','Strong unit-circle fluency.'],
    keyIdeas:['Mixed problems test recognition more than recall.','Choose identities that reduce function types, match known data, or expose a target form.','A short plan before algebra often saves several lines of work.'],
    formulas:['All Unit 6 identities are available','Power-reduction rearrangements: sin²θ=(1−cos2θ)/2, cos²θ=(1+cos2θ)/2'],
    sections:[
      {title:'Classify before calculating',paragraphs:['Ask what structure you see: reciprocal pair, quotient, Pythagorean pattern, angle sum/difference, doubled angle, or halved angle. Naming the structure narrows the formula choices immediately.'],bullets:['Identify the visible pattern.','Identify the desired target.','Choose a transformation that moves from one toward the other.']},
      {title:'Match formulas to available information',paragraphs:['If a problem gives only sinθ and asks for cos2θ, use 1−2sin²θ rather than finding cosine first. If a nonstandard angle is 15° or 75°, a sum/difference formula is natural. Efficient work minimizes new unknowns.'],bullets:['Use what you already know.','Avoid unnecessary square roots.','Prefer exact forms when exact data are given.']},
      {title:'Plan multi-stage equation work',paragraphs:['An equation with sin(2x) combines angle transformation and periodic solving. Treat the inside expression as the angle, adjust the interval accordingly, solve the trig equation, and then undo the substitution.'],bullets:['Track the transformed interval.','Solve all periodic branches.','Convert back to the original variable only at the end.']}
    ],
    workedExamples:[
      {title:'Choose the efficient double-angle form',problem:'If sinθ=3/5 and θ is in Quadrant II, find cos2θ.',steps:['Use cos2θ=1−2sin²θ because sine is already known.','Substitute 1−2(9/25).','Compute 1−18/25=7/25.'],answer:'7/25'},
      {title:'Use a transformed input',problem:'Outline how to solve sin(2x)=√3/2 on 0≤x<2π.',steps:['Let u=2x, so 0≤u<4π.','Solve sinu=√3/2 over two sine periods.','Divide every u-solution by 2 to recover x.'],answer:'Solve in u first, then divide by 2'}
    ],
    commonMistakes:[{mistake:'Choosing the first remembered identity rather than the one that matches the data.',fix:'List what is known and what is requested, then choose the identity requiring the fewest new quantities.'},{mistake:'Forgetting the interval changes when substituting u=2x.',fix:'Transform the interval at the same time you transform the variable.'}],
    alternateExplanation:'This lesson is less about learning new formulas and more about becoming a traffic controller. Every identity is a road. Your job is to look at the starting point and destination, then choose the route with the fewest risky turns.',
    application:'Real analytic work rarely labels which formula to use. Mixed identity selection is closer to how trigonometry appears in modeling, physics, calculus, and technical problem solving.',
    teacherTip:'Before allowing algebra, ask the learner to write a one-sentence plan: “I will use ___ because ___.” Strategy quality improves quickly when decisions must be verbalized.',
    generators:{easy:['u6:mixedIdentityChoice','u6:sumFormulaRecognize','u6:doubleAngleRecognize'],standard:['u6:mixedExactValue','u6:mixedEquationStrategy','u6:mixedIdentityChoice'],challenge:['u6:mixedExactValue','u6:mixedEquationStrategy','u6:simplifySecMinusCos','u6:solveIdentityEquation']}
  }),
  authoredLesson({
    id:'6.11', title:'Unit Review / Assessment', estimatedMinutes:85, teks:['P.5M','P.5N'],
    summary:'Synthesize Unit 6 by moving among identity recognition, simplification, verification, trig-equation solving, exact sum/difference values, and double/half-angle reasoning without being told which technique is required.',
    objectives:['Select and apply identities independently in mixed contexts.','Solve basic and multi-step trig equations accurately over specified intervals.','Diagnose which Unit 6 skill needs review based on mistakes.'],
    prerequisites:['Completion of Lessons 6.1–6.10.','Unit-circle fluency.','Algebraic fraction and factoring skills.'],
    keyIdeas:['Unit 6 is a connected system, not ten isolated formula lists.','Most errors come from sign, branch, interval, or algebra decisions rather than arithmetic.','A review should identify patterns in mistakes, not merely produce a score.'],
    formulas:['Reciprocal, quotient, and Pythagorean identities','Sum/difference, double-angle, and half-angle formulas','Periodic solution rules from Lessons 6.5–6.6'],
    sections:[
      {title:'Review by decision type',paragraphs:['Group problems by the decision they require: rewrite, simplify, verify, solve, or evaluate an exact value. This is more useful than memorizing lesson numbers because real assessments mix the topics.'],bullets:['Rewrite/simplify: choose identities that reduce complexity.','Verify: preserve equivalence and target one side.','Solve: reduce to basic trig equations and list all interval solutions.','Evaluate: use special-angle combination formulas exactly.']},
      {title:'Use errors as a study map',paragraphs:['If errors cluster around missing solutions, review signs, periods, and intervals. If they cluster around identity verification, review factoring and denominator algebra. If exact-value work is wrong, inspect formula signs before radical arithmetic.'],bullets:['Label the type of each mistake.','Redo one similar problem immediately.','Return to the relevant lesson before repeating a full review.']},
      {title:'Assessment habits',paragraphs:['Write the identity you intend to use before substituting, keep exact values until the end, and check whether your final form matches the question. For equations, scan the interval one final time to ensure no endpoint or periodic solution was omitted.'],bullets:['Show the transformation, not just the answer.','Check signs and branches.','Estimate exact values mentally when possible to catch impossible results.']}
    ],
    workedExamples:[
      {title:'Mixed simplification',problem:'Simplify (1−cos²θ)/sinθ.',steps:['Recognize 1−cos²θ=sin²θ.','Rewrite as sin²θ/sinθ.','Cancel the common factor where defined.'],answer:'sinθ'},
      {title:'Mixed exact value',problem:'Find cos75° exactly.',steps:['Write 75°=45°+30°.','Use cos(A+B)=cosAcosB−sinAsinB.','Substitute exact values.','Simplify to (√6−√2)/4.'],answer:'(√6−√2)/4'}
    ],
    commonMistakes:[{mistake:'Treating the review as a memory contest.',fix:'First classify the problem structure, then select a formula. Recognition is the skill being assessed.'},{mistake:'Looking only at the final score.',fix:'Sort missed questions by cause—identity choice, algebra, sign, interval, or exact-value simplification—and target that cause.'}],
    alternateExplanation:'A strong Unit 6 review is a diagnostic loop: identify the problem type, choose a tool, execute carefully, then use any mistake to decide what to practice next. The goal is reliable decision-making, not surviving one worksheet.',
    application:'Analytic trigonometry is the bridge between geometric trig and later calculus. Being able to transform identities and solve periodic equations makes derivative, integral, wave, and vector formulas far easier to interpret later.',
    teacherTip:'After the assessment, have the learner explain one corrected mistake aloud. Explaining why the original method failed is often more valuable than doing five more nearly identical questions.',
    generators:{easy:['u6:reciprocalIdentity','u6:pythagoreanCore','u6:solveSinBasic','u6:sumFormulaRecognize','u6:doubleAngleRecognize'],standard:['u6:simplifySecMinusCos','u6:verifyFirstStep','u6:solveLinearTrig','u6:exactSumSin','u6:doubleAngleExact','u6:halfAngleSign'],challenge:['u6:solveFactoredTrig','u6:solveIdentityEquation','u6:exactSumCos','u6:halfAngleExact','u6:mixedExactValue','u6:mixedEquationStrategy']},
    guidedPractice:['u6:reciprocalIdentity','u6:pythagoreanCore','u6:solveSinBasic','u6:sumFormulaRecognize','u6:doubleAngleRecognize'],
    independentPractice:['u6:simplifyTanCos','u6:findMissingTrig','u6:verifyFirstStep','u6:solveLinearTrig','u6:exactSumSin','u6:doubleAngleExact','u6:halfAngleSign','u6:mixedIdentityChoice'],
    mastery:['u6:simplifySecMinusCos','u6:verifyInvalidMove','u6:solveFactoredTrig','u6:solveIdentityEquation','u6:exactSumCos','u6:doubleAngleExact','u6:halfAngleExact','u6:mixedExactValue','u6:mixedEquationStrategy']
  })
];

export const unit = authoredUnit(6, 'Analytic Trigonometry', '~4 weeks', unitTeks, lessons);
export { lessons };
export default unit;
