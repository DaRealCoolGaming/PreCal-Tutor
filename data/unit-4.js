import '../js/generators-unit4.js';
import { authoredLesson, authoredUnit } from './lesson-schema.js';

const lessons = [
    authoredLesson({
        id:'4.1', title:'Introduction to Sequences', summary:'Read sequence notation, recognize patterns, generate terms, and distinguish between a sequence and the sum of its terms.', estimatedMinutes:50,
        teks:['P.5A','P.5B'],
        objectives:['Interpret a_n and sequence indexing.','Generate terms from a pattern or rule.','Distinguish a sequence from a related series.'],
        prerequisites:['Function notation.','Basic arithmetic patterns and exponent rules.'],
        keyIdeas:['A sequence is an ordered list of terms.','The subscript is a position index, not an exponent.','A series is a sum of sequence terms.'],
        formulas:['a₁, a₂, a₃, …','a_n = nth term'],
        sections:[
            {title:'A sequence is a function with ordered positions',paragraphs:['A sequence can be viewed as a function whose inputs are positive integers. The notation a_n means the term located at position n. Order matters: rearranging the same numbers creates a different sequence.'],bullets:['a₁ is the first term.','a_n is one term, not automatically a sum.','Indices usually begin at 1 in this course unless stated otherwise.']},
            {title:'Look for how one term becomes the next',paragraphs:['To identify a pattern, compare neighboring terms. Constant differences signal arithmetic structure; constant nonzero ratios signal geometric structure. Other sequences may follow rules involving squares, powers, alternating signs, or formulas that are neither arithmetic nor geometric.'],bullets:['Subtract neighbors to test arithmetic behavior.','Divide neighbors to test geometric behavior.','Do not force every sequence into one of those two families.']},
            {title:'Sequence versus series',paragraphs:['A sequence lists values, while a series adds them. The distinction becomes important later when formulas for a_n and S_n answer different questions. Always ask whether the problem wants one term or a total.'],bullets:['a_n → one term.','S_n → sum of first n terms.','Sigma notation is a compact way to write a series.']}
        ],
        workedExamples:[
            {title:'Read an indexed term',problem:'If a_n=3n−2, find a_7.',steps:['The subscript 7 means substitute n=7.','a_7=3(7)−2.','21−2=19.'],answer:'19'},
            {title:'Recognize a pattern',problem:'Describe 5, 10, 20, 40, …',steps:['Differences are not constant.','Ratios are 10/5=2, 20/10=2, 40/20=2.','The sequence is geometric with common ratio 2.'],answer:'Geometric, r=2'}
        ],
        commonMistakes:[{mistake:'Reading a_5 as a raised to the fifth power.',fix:'The subscript labels position. Exponents are written above the base.'},{mistake:'Calling any visible pattern arithmetic.',fix:'Arithmetic specifically requires a constant difference between consecutive terms.'}],
        alternateExplanation:'Think of a sequence as a playlist: track number n points to exactly one item in an ordered list. The subscript tells you which position to play.',
        application:'Sequences model repeated stages such as deposits, population snapshots, tile patterns, recursive processes, and discrete time measurements.',
        teacherTip:'Ask learners to compute both differences and ratios before naming a pattern. This builds a habit of evidence rather than visual guessing.',
        generators:{easy:['u4:sequenceNotation','u4:sequenceNextTerm'],standard:['u4:sequenceNextTerm','u4:sequenceNotation'],challenge:['u4:sequenceNextTerm']}
    }),
    authoredLesson({
        id:'4.2', title:'Arithmetic Sequences', summary:'Model constant additive change with arithmetic sequences, find common differences, and move between term lists and explicit formulas.', estimatedMinutes:55,
        teks:['P.5B','P.5C'],
        objectives:['Identify arithmetic sequences and determine d.','Use a_n=a₁+(n−1)d to find any term.','Write an explicit arithmetic formula from given information.'],
        prerequisites:['Sequence notation.','Linear expressions.'],
        keyIdeas:['Arithmetic sequences have constant first differences.','There are n−1 jumps from term 1 to term n.','Arithmetic sequences are discrete linear functions.'],
        formulas:['a_n=a₁+(n−1)d'],
        sections:[
            {title:'Constant difference means arithmetic',paragraphs:['An arithmetic sequence changes by adding the same number each step. That number d may be positive, negative, or fractional. Because the change is additive and constant, an arithmetic sequence behaves like a linear function sampled at integer inputs.'],bullets:['d=a_n−a_(n−1).','Positive d rises; negative d falls.','A constant difference is stronger evidence than a graph that merely “looks straight.”']},
            {title:'Why the formula uses n−1',paragraphs:['The first term already exists before any common difference is added. To reach term n from term 1, you make exactly n−1 jumps. That is why the explicit formula uses (n−1)d rather than nd.'],bullets:['At n=1, the formula should return a₁.','Testing n=1 is a quick formula check.','The formula can be simplified algebraically but should preserve the same sequence.']},
            {title:'Write a model from context',paragraphs:['If a real quantity increases or decreases by the same amount at each discrete step, its values form an arithmetic sequence. Identify the first recorded amount and the constant change, then attach units to the result.'],bullets:['State what n counts.','State what a_n measures.','Do not use an arithmetic model when the change is percent-based.']}
        ],
        workedExamples:[
            {title:'Find a distant term',problem:'An arithmetic sequence has a₁=7 and d=−3. Find a_12.',steps:['Use a_n=a₁+(n−1)d.','a_12=7+11(−3).','7−33=−26.'],answer:'−26'},
            {title:'Write the explicit rule',problem:'Write a formula for 14, 19, 24, 29, …',steps:['First term a₁=14.','Common difference d=5.','Use a_n=14+(n−1)5.','Optional simplified form: a_n=5n+9.'],answer:'a_n=14+5(n−1)'}
        ],
        commonMistakes:[{mistake:'Using nd instead of (n−1)d.',fix:'The first term requires zero jumps, so term n is reached after n−1 common differences.'},{mistake:'Confusing a negative term with a negative common difference.',fix:'The sign of d comes from subtracting consecutive terms, not from the sign of one term.'}],
        alternateExplanation:'An arithmetic sequence is a staircase with identical vertical steps. The first landing is a₁; every move adds the same rise d.',
        application:'Regular weekly savings increases, fixed depreciation amounts, and evenly spaced seating patterns can all produce arithmetic sequences.',
        teacherTip:'Have students verify an explicit rule by generating the first two terms. A formula that fails at n=1 is immediately exposed.',
        generators:{easy:['u4:arithmeticDifference','u4:arithmeticNth'],standard:['u4:arithmeticNth','u4:arithmeticDifference','u4:arithmeticFormula'],challenge:['u4:arithmeticFormula','u4:arithmeticNth']}
    }),
    authoredLesson({
        id:'4.3', title:'Geometric Sequences', summary:'Model repeated multiplication with geometric sequences, determine common ratios, and use explicit formulas to find distant terms.', estimatedMinutes:55,
        teks:['P.5B'],
        objectives:['Identify geometric sequences and calculate r.','Use a_n=a₁r^(n−1).','Interpret negative and fractional common ratios.'],
        prerequisites:['Sequence notation.','Exponent rules.'],
        keyIdeas:['Geometric sequences have a constant nonzero ratio.','The exponent n−1 counts how many multiplications occur after the first term.','A negative ratio alternates signs; a ratio with |r|<1 shrinks magnitudes.'],
        formulas:['a_n=a₁r^(n−1)','r=a_n/a_(n−1)'],
        sections:[
            {title:'Constant ratio means geometric',paragraphs:['Instead of adding the same amount, geometric sequences multiply by the same factor. Dividing any term by the previous nonzero term should produce the same ratio r.'],bullets:['r>1 grows in magnitude if a₁ is positive.','0<r<1 shrinks toward zero.','r<0 alternates sign.']},
            {title:'The exponent counts multiplications',paragraphs:['At the first term, no multiplication by r has happened, so the exponent must be 0. At term 2, multiply once; at term n, multiply n−1 times. This is why the formula is a₁r^(n−1).'],bullets:['Test n=1.','Use parentheses for negative r.','Keep powers exact before decimal approximation.']},
            {title:'Geometric sequences are discrete exponentials',paragraphs:['A geometric sequence has the same multiplicative structure as an exponential function, but only at discrete index values. This connection makes Unit 3 and Unit 4 reinforce each other.'],bullets:['Constant ratio mirrors an exponential base.','The first term acts like an initial value.','Index n replaces continuous x or t with discrete positions.']}
        ],
        workedExamples:[
            {title:'Find a geometric term',problem:'a₁=3, r=−2. Find a_6.',steps:['Use a_n=a₁r^(n−1).','a_6=3(−2)^5.','(−2)^5=−32.','3(−32)=−96.'],answer:'−96'},
            {title:'Find the common ratio',problem:'Find r for 80, 40, 20, 10, …',steps:['Divide second term by first: 40/80=1/2.','Check 20/40=1/2.','The constant ratio is 1/2.'],answer:'r=1/2'}
        ],
        commonMistakes:[{mistake:'Subtracting terms to find the geometric pattern.',fix:'Geometric patterns use division between consecutive nonzero terms.'},{mistake:'Using exponent n instead of n−1.',fix:'The first term must use r^0 so the formula returns a₁.'}],
        alternateExplanation:'A geometric sequence is a repeated zoom. Every step scales the current value by exactly the same factor.',
        application:'Compound growth, bouncing heights, repeated discounts, and population snapshots often form geometric sequences.',
        teacherTip:'For negative ratios, ask students to predict the sign pattern before calculating. It catches missing-parentheses exponent errors.',
        generators:{easy:['u4:geometricRatio','u4:geometricNth'],standard:['u4:geometricNth','u4:geometricRatio','u4:geometricFormula'],challenge:['u4:geometricFormula','u4:geometricNth']}
    }),
    authoredLesson({
        id:'4.4', title:'Recursive & Explicit Formulas', summary:'Compare explicit formulas that jump directly to a term with recursive rules that build each term from earlier terms.', estimatedMinutes:55,
        teks:['P.5B'],
        objectives:['Distinguish recursive from explicit sequence definitions.','Write recursive rules for arithmetic and geometric sequences.','Use initial conditions correctly in recursive definitions.'],
        prerequisites:['Arithmetic and geometric sequences.','Function notation and subscripts.'],
        keyIdeas:['Explicit rules depend directly on n.','Recursive rules depend on previous term values.','A recursive rule needs enough starting information to begin.'],
        formulas:['Arithmetic recursive: a₁ given; a_n=a_(n−1)+d','Geometric recursive: a₁ given; a_n=r·a_(n−1)'],
        sections:[
            {title:'Two ways to describe the same sequence',paragraphs:['An explicit rule is like jumping directly to an address: provide n and calculate a_n. A recursive rule is like walking from one address to the next: start with an initial term and repeatedly apply a step rule. Both can describe the same sequence.'],bullets:['Explicit is efficient for far-away terms.','Recursive is natural for processes that evolve step by step.','A recurrence without an initial value may not determine a unique sequence.']},
            {title:'Arithmetic recurrences add',paragraphs:['For arithmetic sequences, the recursive rule adds d to the previous term. The initial value tells the process where to begin.'],bullets:['State a₁ separately.','Use a_(n−1), not a_n, on the right side.','Negative d appears as subtraction.']},
            {title:'Geometric recurrences multiply',paragraphs:['For geometric sequences, the next term is r times the previous term. This recurrence captures repeated multiplication directly and is especially intuitive in growth/decay processes.'],bullets:['State a₁.','Multiply the previous term by r.','Negative r alternates signs automatically.']}
        ],
        workedExamples:[
            {title:'Arithmetic recursion',problem:'Write a recursive rule for 12, 7, 2, −3, …',steps:['a₁=12.','Each term decreases by 5, so d=−5.','Write a_n=a_(n−1)−5 for n≥2.'],answer:'a₁=12; a_n=a_(n−1)−5'},
            {title:'Explicit from geometric pattern',problem:'Write an explicit rule for 4, 12, 36, 108, …',steps:['a₁=4.','Common ratio r=3.','Use a_n=a₁r^(n−1).'],answer:'a_n=4·3^(n−1)'}
        ],
        commonMistakes:[{mistake:'Writing a recursive rule without a starting term.',fix:'A recurrence needs initial information so the sequence has a defined starting point.'},{mistake:'Calling a formula recursive merely because it contains n.',fix:'Recursive formulas reference earlier terms such as a_(n−1), not only the index n.'}],
        alternateExplanation:'Explicit rules teleport to term n. Recursive rules walk there one term at a time.',
        application:'Computer algorithms, installment plans, and population simulations often update a current value from the previous value, making recursive descriptions natural.',
        teacherTip:'Ask “Could I compute a_50 without knowing a_49?” If yes, the rule is probably explicit; if no, it is recursive.',
        generators:{easy:['u4:recursiveArithmetic','u4:recursiveGeometric'],standard:['u4:recursiveArithmetic','u4:recursiveGeometric','u4:explicitVsRecursive'],challenge:['u4:explicitVsRecursive','u4:recursiveGeometric']}
    }),
    authoredLesson({
        id:'4.5', title:'Series & Sigma Notation', summary:'Interpret and evaluate sigma notation, translate between expanded sums and compact summation form, and keep sequence terms distinct from their sums.', estimatedMinutes:60,
        teks:['P.5A','P.5D'],
        objectives:['Read lower bound, upper bound, index, and summand in sigma notation.','Evaluate finite sums written with Σ.','Write arithmetic sums using sigma notation.'],
        prerequisites:['Sequence notation.','Substitution into algebraic expressions.'],
        keyIdeas:['Σ means add the summand over a specified index range.','Both lower and upper bounds are included unless stated otherwise.','The number of terms from k=m through k=n is n−m+1.'],
        formulas:['Σ from k=m to n of f(k) = f(m)+f(m+1)+…+f(n)'],
        sections:[
            {title:'Read every part of sigma notation',paragraphs:['The Greek capital sigma Σ is a compact addition instruction. The lower bound says where the index starts, the upper bound says where it stops, and the expression beside Σ tells what to evaluate and add.'],bullets:['Index letters are placeholders.','Bounds control which integer inputs are used.','The summand may be a sequence term or an algebraic expression.']},
            {title:'Evaluate by expanding carefully',paragraphs:['For short finite sums, write out the terms before adding. This prevents off-by-one mistakes and makes negative signs easier to track. For larger structured sums, later formulas will be more efficient.'],bullets:['Substitute each index value.','Do not skip an endpoint.','Use parentheses when substituting negative index values or coefficients.']},
            {title:'Write a series compactly',paragraphs:['To convert a patterned sum into sigma form, identify a formula for the kth term and choose bounds that generate exactly the terms shown. There can be more than one valid sigma representation.'],bullets:['Test the lower bound against the first term.','Test the upper bound against the last term.','Make sure the count of generated terms is correct.']}
        ],
        workedExamples:[
            {title:'Evaluate a sigma sum',problem:'Evaluate Σ from k=1 to 4 of (2k+1).',steps:['k=1 gives 3.','k=2 gives 5.','k=3 gives 7.','k=4 gives 9.','Add: 3+5+7+9=24.'],answer:'24'},
            {title:'Write sigma notation',problem:'Write 5+8+11+14+17 using Σ.',steps:['This is arithmetic with a₁=5 and d=3.','The kth term is 5+3(k−1).','There are 5 terms, so use k=1 through 5.'],answer:'Σ(k=1 to 5)[5+3(k−1)]'}
        ],
        commonMistakes:[{mistake:'Using upper bound minus lower bound as the number of terms.',fix:'Include both endpoints: count = upper−lower+1.'},{mistake:'Treating Σ like multiplication by the upper bound.',fix:'Sigma means evaluate and add each indexed term, not simply multiply one expression.'}],
        alternateExplanation:'Sigma notation is mathematical shorthand for a loop: start the counter, evaluate the expression, add it to the running total, increase the counter, and stop at the upper bound.',
        application:'Summation notation appears throughout statistics, finance, discrete mathematics, and calculus because it compresses long patterned sums into one readable expression.',
        teacherTip:'Have students expand at least the first and last term before evaluating. This catches most bound/index errors immediately.',
        generators:{easy:['u4:sigmaMeaning','u4:sigmaEvaluateLinear'],standard:['u4:sigmaEvaluateLinear','u4:sigmaMeaning','u4:sigmaRepresentArithmetic'],challenge:['u4:sigmaRepresentArithmetic','u4:sigmaEvaluateLinear']}
    }),
    authoredLesson({
        id:'4.6', title:'Arithmetic Series', summary:'Find partial sums of arithmetic sequences efficiently by using the first/last-term average and connecting sum formulas to the structure of evenly spaced terms.', estimatedMinutes:55,
        teks:['P.5C'],
        objectives:['Find arithmetic partial sums from a₁, d, and n.','Use first and last terms to compute S_n.','Explain why the arithmetic sum formula works through pairing or averaging.'],
        prerequisites:['Arithmetic sequences.','Sigma notation.'],
        keyIdeas:['An arithmetic series is the sum of terms from an arithmetic sequence.','The average of the first and last term equals the average of all terms.','Sum = number of terms × average term.'],
        formulas:['S_n=n(a₁+a_n)/2','S_n=n[2a₁+(n−1)d]/2'],
        sections:[
            {title:'Why the endpoint formula works',paragraphs:['Pair the first and last terms, then the second and second-to-last. Every pair has the same total because the sequence is evenly spaced. This symmetry means the average term is (a₁+a_n)/2. Multiply that average by n to get the sum.'],bullets:['Find a_n if it is not given.','Keep n as the number of terms, not the last term value.','Either arithmetic-sum formula is equivalent.']},
            {title:'Do not confuse a_n with S_n',paragraphs:['a_n asks for one position; S_n asks for the accumulated total of the first n positions. A common error is to calculate the nth term and stop even though the question asks for a sum.'],bullets:['a_n → one term.','S_n → total of n terms.','Read words such as total, altogether, and sum carefully.']},
            {title:'Choose the most convenient data',paragraphs:['If a₁, a_n, and n are known, use the endpoint formula directly. If a₁, d, and n are known, find a_n first or use the expanded formula. Efficient setup reduces arithmetic mistakes.'],bullets:['Use the data you actually have.','Show enough work to distinguish nth-term and sum calculations.','Attach units in applications.']}
        ],
        workedExamples:[
            {title:'Sum from first term and difference',problem:'Find S_20 if a₁=7 and d=4.',steps:['Find a_20=7+19(4)=83.','Use S_20=20(7+83)/2.','20·90/2=900.'],answer:'900'},
            {title:'Sum from endpoints',problem:'An arithmetic list has 30 terms, first term 12 and last term 99. Find the sum.',steps:['Average endpoints: (12+99)/2=55.5.','Multiply by 30 terms.','30(55.5)=1665.'],answer:'1665'}
        ],
        commonMistakes:[{mistake:'Using n as the last term value.',fix:'n counts terms; a_n is the value of the last term.'},{mistake:'Using the arithmetic nth-term formula when the problem asks for a total.',fix:'Find a_n if needed, then use an S_n formula.'}],
        alternateExplanation:'Arithmetic terms are evenly spaced, so their average sits halfway between the first and last. The total is simply “how many terms” times “average term.”',
        application:'Arithmetic series model total savings under steadily increasing deposits, cumulative seating rows, and other situations where repeated amounts rise or fall by a fixed increment.',
        teacherTip:'Make the learner write a_n and S_n on separate lines. The notation itself helps prevent mixing up “last term” and “sum.”',
        generators:{easy:['u4:arithmeticSumFromEndpoints'],standard:['u4:arithmeticSum','u4:arithmeticSumFromEndpoints'],challenge:['u4:arithmeticSum','u4:arithmeticSumFromEndpoints']}
    }),
    authoredLesson({
        id:'4.7', title:'Finite Geometric Series', summary:'Sum a finite number of geometric terms efficiently, derive meaning from the ratio, and distinguish finite sums from convergence questions.', estimatedMinutes:60,
        teks:['P.5E'],
        objectives:['Use the finite geometric sum formula.','Identify a₁, r, and n from a series.','Explain why finite sums do not require |r|<1.'],
        prerequisites:['Geometric sequences.','Exponent rules.'],
        keyIdeas:['A finite geometric series contains a fixed number of terms.','The finite formula works for r≠1 even when magnitudes grow.','Convergence restrictions belong to infinite series, not finite ones.'],
        formulas:['S_n=a₁(1−r^n)/(1−r), r≠1'],
        sections:[
            {title:'Identify the three ingredients',paragraphs:['Before substituting, locate the first term a₁, common ratio r, and number of terms n. Most errors come from miscounting n or confusing the last term with the number of terms.'],bullets:['Write several terms when necessary.','Use parentheses around negative r.','Check that the ratio is truly constant.']},
            {title:'Why the formula works',paragraphs:['Multiplying the series by r shifts every term one position. Subtracting the shifted series from the original cancels the middle terms, leaving only the first term and one final power. Solving that relation produces the finite sum formula.'],bullets:['The cancellation depends on constant ratio.','r=1 is a special case where the sum is simply n·a₁.','Negative ratios are handled naturally by the same formula.']},
            {title:'Finite is not the same as convergent',paragraphs:['Even if |r|>1 and the terms grow dramatically, a finite list still has an ordinary finite sum. The condition |r|<1 matters only when infinitely many terms are being added.'],bullets:['Finite: calculate a fixed total.','Infinite: ask whether partial sums approach a limit.','Do not reject r=2 in a finite-series problem.']}
        ],
        workedExamples:[
            {title:'Positive ratio',problem:'Find the sum of the first 6 terms of 3+6+12+…',steps:['a₁=3, r=2, n=6.','Use S_6=3(1−2^6)/(1−2).','3(1−64)/(−1)=189.'],answer:'189'},
            {title:'Negative ratio',problem:'Find S_5 for a₁=8 and r=−1/2.',steps:['Use S_5=8[1−(−1/2)^5]/[1−(−1/2)].','(−1/2)^5=−1/32.','Simplify the numerator and denominator carefully.'],answer:'11'}
        ],
        commonMistakes:[{mistake:'Requiring |r|<1 for every geometric sum.',fix:'That condition applies only to infinite geometric series. Finite sums do not need convergence.'},{mistake:'Forgetting parentheses around a negative ratio in r^n.',fix:'The entire ratio, including its sign, is raised to the power.'}],
        alternateExplanation:'A finite geometric series is just a shortcut for adding a patterned list. Since the list ends, there is no question about whether the total “settles down” forever.',
        application:'Finite geometric sums appear in staged payments, repeated bounces over a fixed number of impacts, and cumulative multiplicative processes that stop after a known number of steps.',
        teacherTip:'Ask “How many terms are actually being added?” before allowing the formula. This exposes off-by-one mistakes early.',
        generators:{easy:['u4:finiteVsInfinite'],standard:['u4:finiteGeometricSum','u4:finiteVsInfinite'],challenge:['u4:finiteGeometricSum']}
    }),
    authoredLesson({
        id:'4.8', title:'Infinite Geometric Series', summary:'Determine whether an infinite geometric series converges, calculate its finite sum when |r|<1, and understand convergence through partial sums rather than a magical infinity operation.', estimatedMinutes:60,
        teks:['P.5E'],
        objectives:['Determine convergence from the magnitude of r.','Use S=a₁/(1−r) for convergent infinite geometric series.','Explain how partial sums approach a finite limit.'],
        prerequisites:['Finite geometric series.','Absolute value and limits as an intuitive idea.'],
        keyIdeas:['An infinite geometric series converges exactly when |r|<1.','The terms must shrink toward zero, but term→0 alone is not a universal series test outside this family.','The infinite sum is the limit approached by partial sums.'],
        formulas:['If |r|<1, S=a₁/(1−r)'],
        sections:[
            {title:'Convergence is about the partial sums',paragraphs:['An infinite series is not completed by literally performing infinitely many additions one after another. Instead, consider S_1, S_2, S_3, and so on. If these partial sums approach one finite number, the series converges to that limit.'],bullets:['Partial sums are finite and computable.','A convergent series has a stable limiting total.','Divergent partial sums do not settle at one finite value.']},
            {title:'Why |r|<1 matters',paragraphs:['When the magnitude of r is less than 1, each new geometric term is smaller in magnitude than the previous term, so the remaining “tail” can shrink toward zero. If |r|≥1, the terms fail to shrink appropriately and the partial sums do not settle.'],bullets:['Negative r can still converge.','r=−1 alternates forever and does not converge.','r=1 repeats the same nonzero term indefinitely.']},
            {title:'Use the infinite formula only after checking convergence',paragraphs:['The formula a₁/(1−r) is valid only after confirming |r|<1. Substituting a divergent ratio into the formula may produce a number algebraically, but that number is not the sum of the infinite series.'],bullets:['Step 1: test |r|<1.','Step 2: if true, use the formula.','Step 3: interpret the limit as the value approached by partial sums.']}
        ],
        workedExamples:[
            {title:'Convergent series',problem:'Find 12+6+3+1.5+…',steps:['a₁=12 and r=1/2.','|r|=1/2<1, so the series converges.','S=12/(1−1/2)=24.'],answer:'24'},
            {title:'Divergent series',problem:'Does 5−10+20−40+… have an infinite sum?',steps:['Common ratio r=−2.','|r|=2≥1.','The terms grow in magnitude instead of shrinking.','Therefore the infinite series diverges.'],answer:'No finite infinite sum'}
        ],
        commonMistakes:[{mistake:'Using S=a₁/(1−r) before checking r.',fix:'The infinite-sum formula is conditional on |r|<1.'},{mistake:'Thinking every negative ratio diverges.',fix:'Negative ratios such as −1/2 converge because their magnitudes are less than 1.'}],
        alternateExplanation:'Imagine repeatedly filling the remaining gap by a fixed fraction. If the fraction is less than 1 in magnitude, the leftover gap can shrink toward zero; that is the geometry behind convergence.',
        application:'Infinite geometric series model idealized repeated bounces, repeating decimals, and cumulative processes whose remaining contribution shrinks by a constant factor.',
        teacherTip:'Use the interactive partial-sum explorer and move r across ±1. Seeing the readout change from a stable limiting value to divergence makes the condition memorable.',
        generators:{easy:['u4:infiniteGeoConvergence'],standard:['u4:infiniteGeoConvergence','u4:infiniteGeoSum'],challenge:['u4:infiniteGeoSum','u4:infiniteGeoConvergence']}
    }),
    authoredLesson({
        id:'4.9', title:'Binomial Theorem', summary:'Use binomial coefficients to expand powers of binomials and locate specific terms without multiplying the entire expression repeatedly.', estimatedMinutes:60,
        teks:['P.5F'],
        objectives:['Compute binomial coefficients.','Use the Binomial Theorem to identify coefficients and powers.','Find a specific term without fully expanding the binomial.'],
        prerequisites:['Exponent rules.','Factorials and combinations as basic counting notation.'],
        keyIdeas:['Coefficients in (a+b)^n are C(n,r).','Powers of the first term decrease while powers of the second increase.','In every term, the two exponents add to n.'],
        formulas:['(a+b)^n = Σ C(n,r)a^(n−r)b^r','C(n,r)=n!/[r!(n−r)!]'],
        sections:[
            {title:'The coefficient pattern',paragraphs:['Repeated binomial multiplication creates a predictable coefficient pattern captured by combinations. Pascal’s Triangle displays the same coefficients row by row, while C(n,r) gives a direct formula for any position.'],bullets:['Row n corresponds to power n when row 0 begins with 1.','C(n,r)=C(n,n−r).','Coefficients are positive for (a+b)^n before signs from the terms themselves are considered.']},
            {title:'Track both powers',paragraphs:['In the rth indexed term C(n,r)a^(n−r)b^r, the exponent on a decreases as r increases and the exponent on b increases. Their sum remains n. This makes it possible to target one requested power without expanding everything.'],bullets:['First term uses r=0.','Last term uses r=n.','Match n−r or r to the desired exponent.']},
            {title:'Signs come from the binomial',paragraphs:['For (a−b)^n, treat the second term as −b. Then powers of −b determine whether each term is positive or negative. The combination coefficient itself is still positive.'],bullets:['Keep negative terms in parentheses.','Odd powers preserve the negative sign.','Even powers make the sign positive.']}
        ],
        workedExamples:[
            {title:'Expand a cube',problem:'Expand (x+2)^3.',steps:['Coefficients are 1,3,3,1.','Use powers x³, x², x, 1 while powers of 2 rise 0,1,2,3.','Terms: x³ + 3x²(2) + 3x(4) + 8.','Combine.'],answer:'x³+6x²+12x+8'},
            {title:'Find one term only',problem:'Find the x³ term in (x+3)^5.',steps:['Need n−r=3, so 5−r=3 and r=2.','Coefficient is C(5,2)·3².','10·9=90.'],answer:'90x³'}
        ],
        commonMistakes:[{mistake:'Using only a^n+b^n for (a+b)^n.',fix:'Binomial powers include middle terms with combination coefficients.'},{mistake:'Matching the wrong r to a requested x-power.',fix:'For (x+b)^n, the x exponent is n−r. Solve n−r=desired power first.'}],
        alternateExplanation:'The Binomial Theorem is a map of all ways to choose which factor contributes the second term during repeated multiplication. C(n,r) counts how many ways each pattern occurs.',
        application:'Binomial coefficients appear in probability, combinatorics, algebraic approximation, and later calculus expansions.',
        teacherTip:'Before calculating any coefficient, make the student write the exponent pair (n−r, r). This prevents most term-position errors.',
        generators:{easy:['u4:binomialCoefficient','u4:binomialExpansionSmall'],standard:['u4:binomialCoefficient','u4:binomialSpecificTerm','u4:binomialExpansionSmall'],challenge:['u4:binomialSpecificTerm','u4:binomialCoefficient']}
    }),
    authoredLesson({
        id:'4.10', title:'Sequence & Series Applications', summary:'Translate real situations into arithmetic or geometric sequences and series, decide whether a problem asks for one term or a cumulative sum, and interpret the result with units.', estimatedMinutes:65,
        teks:['P.5A','P.5B','P.5C','P.5D','P.5E'],
        objectives:['Choose arithmetic versus geometric structure from a context.','Choose nth-term versus sum formulas based on the question.','Interpret parameters and results with appropriate units.'],
        prerequisites:['Arithmetic and geometric sequence/series formulas.','Percent change and modeling.'],
        keyIdeas:['Constant amount change → arithmetic.','Constant factor/percent change → geometric.','A question about one future stage needs a_n; a cumulative total needs S_n.'],
        formulas:['Arithmetic: a_n=a₁+(n−1)d, S_n=n(a₁+a_n)/2','Geometric: a_n=a₁r^(n−1), S_n=a₁(1−r^n)/(1−r)'],
        sections:[
            {title:'Classify the change mechanism',paragraphs:['Do not select a formula from surface words alone. Identify how one stage produces the next. A fixed dollar increase is arithmetic; a fixed percent increase is geometric.'],bullets:['Amount added/subtracted → arithmetic.','Factor multiplied → geometric.','Write two or three terms from the story to verify.']},
            {title:'Decide whether to find a term or a total',paragraphs:['“How much in month 12?” asks for one term. “How much deposited during the first 12 months?” asks for a sum. Both problems may use the same underlying sequence but different formulas.'],bullets:['One position → a_n.','Cumulative total → S_n.','Circle words such as total, altogether, cumulative, or combined.']},
            {title:'Interpret and sanity-check',paragraphs:['A model answer should make sense relative to the sequence behavior. A positive arithmetic increase should not yield a smaller late term; a growth factor above 1 should not shrink values. State units and context in the final sentence.'],bullets:['Check direction of change.','Estimate rough size.','Label money, time, people, distance, or other units.']}
        ],
        workedExamples:[
            {title:'Arithmetic savings plan',problem:'A student saves $40 in month 1 and $10 more each month. How much is saved in total through month 8?',steps:['Monthly deposits form an arithmetic sequence: a₁=40,d=10,n=8.','a_8=40+7(10)=110.','S_8=8(40+110)/2=600.'],answer:'$600 total'},
            {title:'Geometric growth stage',problem:'A population is 300 at stage 1 and multiplies by 1.15 each stage. Find stage 6.',steps:['This is geometric with a₁=300,r=1.15,n=6.','a_6=300(1.15)^5.','Evaluate and round appropriately.'],answer:'About 603.41'}
        ],
        commonMistakes:[{mistake:'Using a geometric model for a fixed amount increase.',fix:'Geometric models require repeated multiplication, usually a fixed factor or percent.'},{mistake:'Finding the last payment when the question asks for all payments combined.',fix:'Use a series formula when the wording asks for a cumulative total.'}],
        alternateExplanation:'First ask “How does the next step come from the current one?” Then ask “Do I want one step or all the steps together?” Those two questions usually determine the model and formula.',
        application:'Savings plans, escalating payments, population stages, repeated depreciation, and patterned construction costs all use sequence and series reasoning.',
        teacherTip:'Require students to write “arithmetic/geometric because…” and “term/sum because…” before doing arithmetic. Strategy selection is the real modeling skill.',
        generators:{easy:['u4:modelSequenceType','u4:arithmeticApplication'],standard:['u4:arithmeticApplication','u4:geometricApplication','u4:modelSequenceType'],challenge:['u4:geometricApplication','u4:arithmeticApplication']}
    }),
    authoredLesson({
        id:'4.11', title:'Unit Review / Assessment', summary:'Combine sequence notation, arithmetic and geometric formulas, sigma notation, finite and infinite sums, applications, and the Binomial Theorem in one mixed mastery check.', estimatedMinutes:75,
        teks:['P.5A','P.5B','P.5C','P.5D','P.5E','P.5F'],
        objectives:['Select sequence/series methods without a lesson label.','Distinguish nth-term, finite-sum, and infinite-sum questions.','Use Binomial Theorem coefficients and terms accurately.'],
        prerequisites:['Lessons 4.1–4.10.'],
        keyIdeas:['Structure determines the formula.','Arithmetic uses constant differences; geometric uses constant ratios.','Infinite geometric sums require |r|<1 before any sum formula is valid.'],
        formulas:['a_n=a₁+(n−1)d','a_n=a₁r^(n−1)','S_n=n(a₁+a_n)/2','S_n=a₁(1−r^n)/(1−r)','S∞=a₁/(1−r), |r|<1'],
        sections:[
            {title:'Identify the object first',paragraphs:['Mixed review often hides whether you are looking at a sequence, finite series, or infinite series. Label the object before selecting a formula. This single habit prevents many formula-substitution errors.'],bullets:['Sequence → individual terms.','Finite series → a fixed sum.','Infinite series → convergence plus limiting sum.']},
            {title:'Use change pattern as the classifier',paragraphs:['Arithmetic and geometric methods are not interchangeable. Compute a difference and a ratio when the pattern is not obvious. Contexts should be translated into the same mathematical evidence.'],bullets:['Constant difference supports arithmetic.','Constant ratio supports geometric.','Neither constant means another rule may be needed.']},
            {title:'Treat errors as signals',paragraphs:['If you use n rather than n−1 repeatedly, revisit term indexing. If you apply an infinite-sum formula to r=2, revisit convergence. If a binomial term has the wrong x power, revisit the r index in C(n,r)a^(n−r)b^r.'],bullets:['Name the misconception.','Redo a nearby example.','Return to mixed practice only after the underlying rule is clear.']}
        ],
        workedExamples:[
            {title:'Mixed geometric decision',problem:'For 5,15,45,… find the sum of the first 6 terms.',steps:['Ratios are 3, so the sequence is geometric with a₁=5,r=3.','The problem asks for a finite total, so use S_6.','S_6=5(1−3^6)/(1−3)=1820.'],answer:'1820'},
            {title:'Infinite-series decision',problem:'Does 9−3+1−1/3+… converge?',steps:['Common ratio r=(−3)/9=−1/3.','|r|=1/3<1, so it converges.','S=9/[1−(−1/3)]=27/4.'],answer:'Yes; sum=27/4'}
        ],
        commonMistakes:[{mistake:'Choosing a formula before deciding what type of object the problem describes.',fix:'Classify sequence/series, arithmetic/geometric, and finite/infinite first.'},{mistake:'Using one successful practice pattern as a shortcut for every mixed problem.',fix:'Mixed mastery requires strategy selection, not just repeating a recently memorized procedure.'}],
        alternateExplanation:'Unit 4 is about patterned repetition. Differences describe repeated addition, ratios describe repeated multiplication, sums accumulate those patterns, and the Binomial Theorem organizes repeated binomial multiplication.',
        application:'Mastery here supports financial mathematics, discrete modeling, probability, and later calculus topics involving summation and series.',
        teacherTip:'Use mixed difficulty for the final assessment. A learner who can identify the structure without prompts is ready to move on.',
        generators:{easy:['u4:sequenceNextTerm','u4:arithmeticDifference','u4:geometricRatio','u4:sigmaMeaning'],standard:['u4:arithmeticNth','u4:geometricNth','u4:sigmaEvaluateLinear','u4:arithmeticSum','u4:finiteGeometricSum','u4:infiniteGeoConvergence','u4:binomialCoefficient'],challenge:['u4:infiniteGeoSum','u4:binomialSpecificTerm','u4:arithmeticApplication','u4:geometricApplication']}
    })
];

export default authoredUnit(4,'Series and Sequences','~4 weeks',['P.5A','P.5B','P.5C','P.5D','P.5E','P.5F'],lessons);
