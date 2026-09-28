import '../js/generators-unit3.js';
import { authoredLesson, authoredUnit } from './lesson-schema.js';

const lessons = [
    authoredLesson({
        id:'3.1', title:'Exponential Functions', summary:'Recognize exponential structure, evaluate exponential rules, and read the intercept, asymptote, domain, range, growth direction, and long-run behavior from an equation or graph.', estimatedMinutes:55,
        teks:['P.2F','P.2G','P.2I','P.2J','P.2N'],
        objectives:['Distinguish exponential functions from linear and power functions.','Evaluate f(x)=ab^x and interpret the initial value and base.','Analyze the key graph features of transformed exponential functions.'],
        prerequisites:['Exponent rules, including zero and negative exponents.','Function notation and transformations from Unit 1.'],
        keyIdeas:['The variable is in the exponent.','For ab^x with a>0, b>1 means growth and 0<b<1 means decay.','The parent exponential has domain all real numbers, positive range, y-intercept 1, and horizontal asymptote y=0.'],
        formulas:['f(x)=ab^x','f(0)=a','y=ab^(x−h)+k has horizontal asymptote y=k'],
        sections:[
            {title:'What makes a function exponential',paragraphs:['An exponential function changes by a constant factor over equal input intervals. That is different from a linear function, which changes by a constant difference. In f(x)=ab^x, a sets the output when x=0 and b tells how each one-unit increase in x scales the previous output.'],bullets:['The variable must appear in the exponent.','The base is positive and not equal to 1 in the standard real exponential family.','Ratios of consecutive outputs reveal the multiplicative pattern.']},
            {title:'Read the graph before calculating',paragraphs:['The parent graph y=b^x never reaches zero, so y=0 is a horizontal asymptote. A vertical shift moves that asymptote. A negative outside multiplier reflects the graph across the x-axis, while a horizontal shift changes where familiar points occur without changing the basic multiplicative behavior.'],bullets:['Domain remains all real x after ordinary shifts and stretches.','Range is controlled by the asymptote and reflection.','The y-intercept comes from substituting x=0, not from reading the leading coefficient blindly after transformations.']},
            {title:'Growth is about the base, not the size of the coefficient',paragraphs:['A very large coefficient does not make a function “growth.” The base determines whether the outputs multiply upward or shrink toward the asymptote as x increases. The coefficient controls scale and possibly reflection.'],bullets:['b>1: increasing parent exponential.','0<b<1: decreasing parent exponential.','Compare the base to 1 before making a growth/decay statement.']}
        ],
        workedExamples:[
            {title:'Evaluate and interpret',problem:'For f(x)=6(2)^x, find f(3) and identify the initial value.',steps:['Substitute x=3: f(3)=6(2)^3.','Compute 2^3=8.','Multiply: f(3)=48.','At x=0, f(0)=6, so the initial value is 6.'],answer:'f(3)=48; initial value 6'},
            {title:'Read a shifted graph from its equation',problem:'Analyze g(x)=3(1/2)^x−4.',steps:['The base 1/2 lies between 0 and 1, so the graph decays as x increases.','The outside −4 shifts the parent down 4.','Therefore the horizontal asymptote is y=−4.','At x=0, g(0)=3−4=−1.'],answer:'Decay; asymptote y=−4; y-intercept −1'}
        ],
        commonMistakes:[{mistake:'Calling any rapidly increasing rule exponential.',fix:'Check whether the input variable is actually in the exponent and whether equal input steps create a constant output ratio.'},{mistake:'Assuming the horizontal asymptote is always y=0.',fix:'A vertical shift y=ab^(x−h)+k moves the asymptote to y=k.'}],
        alternateExplanation:'Imagine copying a value forward through time with the same multiplier each step. “Multiply by 1.2 again” is exponential thinking. “Add 20 again” is linear thinking. The graph shape is the visual trace of that repeated multiplication.',
        application:'Populations, medication concentration, inflation, depreciation, and repeated percentage changes often use exponential models because each new amount is based on a fixed proportion of the previous amount.',
        teacherTip:'When a student labels a model incorrectly, ask for the ratio of two consecutive outputs. A constant ratio usually exposes the exponential structure faster than memorizing graph shapes.',
        generators:{easy:['u3:expEvaluate','u3:expGrowthOrDecay'],standard:['u3:expEvaluate','u3:expGrowthOrDecay','u3:expInterceptAsymptote'],challenge:['u3:expInterceptAsymptote','u3:expGrowthOrDecay']}
    }),
    authoredLesson({
        id:'3.2', title:'Exponential Growth & Decay', summary:'Translate repeated percent change into exponential multipliers, build growth and decay models, and distinguish multiplicative change from linear change.', estimatedMinutes:55,
        teks:['P.2F','P.2G','P.2N'],
        objectives:['Convert a percent increase or decrease into an exponential factor.','Build and evaluate A=A₀(1±r)^t.','Choose between linear and exponential models from context or data.'],
        prerequisites:['Percent-decimal conversion.','Evaluating powers and function notation.'],
        keyIdeas:['Growth factor = 1+r; decay factor = 1−r.','A repeated percent change acts on the current amount, not repeatedly on the original amount.','Constant percent change means constant ratio.'],
        formulas:['A(t)=A₀(1+r)^t for growth','A(t)=A₀(1−r)^t for decay'],
        sections:[
            {title:'Turn a percentage into a multiplier',paragraphs:['A 12% increase means the next amount is 112% of the current amount, so multiply by 1.12. A 12% decrease means 88% remains, so multiply by 0.88. The rate and the factor are related but they are not the same number.'],bullets:['Convert percent to decimal first.','Growth adds the decimal rate to 1.','Decay subtracts the decimal rate from 1.']},
            {title:'Repeated change compounds',paragraphs:['After one period, multiply once. After two periods, multiply by the same factor again. This repeated multiplication is why the time variable appears as an exponent. The starting amount remains outside the power because it is the scale at time zero.'],bullets:['After t periods: factor^t.','Use consistent time units.','If the rate is annual but time is in months, convert before substituting.']},
            {title:'Decide whether a model should be linear or exponential',paragraphs:['If a situation adds the same amount each period, use a linear model. If it changes by the same percent or factor each period, use an exponential model. Tables can be diagnosed with first differences for linear behavior and ratios for exponential behavior.'],bullets:['Constant difference → linear.','Constant nonzero ratio → exponential.','Context words help, but checking the actual change pattern is more reliable.']}
        ],
        workedExamples:[
            {title:'Build a growth model',problem:'A town has 18,000 people and grows 3% per year.',steps:['Initial value A₀=18,000.','Growth rate r=0.03, so factor=1.03.','Use A(t)=18,000(1.03)^t.','After 5 years, evaluate 18,000(1.03)^5≈20,867.'],answer:'A(t)=18,000(1.03)^t; about 20,867 after 5 years'},
            {title:'Build a decay model',problem:'A device worth $2,400 loses 18% of its value each year.',steps:['Decay rate r=0.18.','The retained factor is 1−0.18=0.82.','Model V(t)=2400(0.82)^t.','The factor 0.82 means 82% of the previous value remains each year.'],answer:'V(t)=2400(0.82)^t'}
        ],
        commonMistakes:[{mistake:'Using 0.15 as the multiplier for 15% growth.',fix:'0.15 is the rate. The growth multiplier is 1.15.'},{mistake:'Subtracting the same dollar amount for percentage decay.',fix:'Percentage decay removes a fraction of the current amount, so the absolute decrease changes each period.'}],
        alternateExplanation:'Think of each period as a machine. A 20% growth machine takes whatever enters and outputs 1.20 times as much. Sending the result through that same machine t times produces the power (1.20)^t.',
        application:'Exponential growth and decay model depreciation, bacteria, subscriptions, inflation, drug elimination, radioactive decay, and repeated financial returns.',
        teacherTip:'Have the learner state in words what the multiplier means. “0.87 means 87% remains each period” is a stronger check than merely writing the formula.',
        generators:{easy:['u3:percentFactor','u3:growthDecayValue'],standard:['u3:percentFactor','u3:growthDecayValue','u3:compareLinearExponential'],challenge:['u3:growthDecayValue','u3:compareLinearExponential']}
    }),
    authoredLesson({
        id:'3.3', title:'The Number e & Natural Exponential Functions', summary:'Use the number e as the natural base for continuous growth and decay, interpret the parameter r in A=A₀e^(rt), and compare continuous models with periodic compounding.', estimatedMinutes:55,
        teks:['P.2F','P.2G','P.2N'],
        objectives:['Explain why e appears in continuous-change models.','Evaluate A=A₀e^(rt) for growth and decay.','Interpret the sign and magnitude of the continuous rate r.'],
        prerequisites:['Exponential growth and decay.','Calculator evaluation of powers.'],
        keyIdeas:['e≈2.71828 is a special irrational base.','In A=A₀e^(rt), r>0 grows and r<0 decays.','The parameter r is a continuous rate written as a decimal.'],
        formulas:['e≈2.718281828','A=A₀e^(rt)'],
        sections:[
            {title:'Why e is the natural exponential base',paragraphs:['The base e arises when compounding becomes more and more frequent and in mathematical descriptions where the rate of change is proportional to the current amount. Precalculus uses it because many continuous models become especially clean in e-based form.'],bullets:['e is a number, not a variable.','Natural exponential means base e.','Natural logarithm ln is the inverse of e^x.']},
            {title:'Read A=A₀e^(rt)',paragraphs:['A₀ is the starting amount. The product rt controls how far the model moves from its starting point. Positive r produces growth; negative r produces decay. Because the change is continuous, the formula does not need a separate number of compounding periods per year.'],bullets:['Keep r as a decimal.','Match the time units to the units of r.','Evaluate the exponent rt before pressing the e^x key.']},
            {title:'Continuous does not mean instantaneous infinity',paragraphs:['Continuous growth means the model changes smoothly rather than at discrete payment dates. It does not mean the amount jumps infinitely fast. The rate still controls how quickly the quantity grows or decays.'],bullets:['Large positive r grows faster.','More negative r decays faster.','At t=0, every model A₀e^(rt) equals A₀.']}
        ],
        workedExamples:[
            {title:'Continuous growth',problem:'A culture starts with 500 cells and grows continuously at 8% per hour. Find the model and the amount after 6 hours.',steps:['A₀=500 and r=0.08.','Model A=500e^(0.08t).','At t=6, exponent=0.48.','500e^0.48≈808.04.'],answer:'A=500e^(0.08t); about 808 cells'},
            {title:'Continuous decay',problem:'A quantity follows A=900e^(−0.12t). Interpret −0.12.',steps:['The negative sign means decay.','0.12 as a decimal corresponds to a 12% continuous rate.','The model approaches zero as t increases but does not become negative.'],answer:'12% continuous decay rate'}
        ],
        commonMistakes:[{mistake:'Treating e as if it were the rate.',fix:'e is the base. The coefficient r multiplying t in the exponent is the continuous growth/decay rate.'},{mistake:'Entering e^r·t instead of e^(rt).',fix:'The entire product rt belongs in the exponent.'}],
        alternateExplanation:'Periodic compounding is like updating a balance at scheduled checkpoints. An e-based model is the smooth limiting version where the growth mechanism acts continuously.',
        application:'Continuous models appear in population dynamics, cooling approximations, continuously compounded finance, and idealized decay processes.',
        teacherTip:'If calculator syntax causes errors, make the student compute rt on paper first and then evaluate e^(that result). This separates algebra from button-entry mistakes.',
        generators:{easy:['u3:continuousRateMeaning','u3:naturalExpValue'],standard:['u3:naturalExpValue','u3:continuousRateMeaning'],challenge:['u3:naturalExpValue']}
    }),
    authoredLesson({
        id:'3.4', title:'Inverses and Logarithmic Functions', summary:'Understand logarithms as inverse exponential functions, translate exactly between exponential and logarithmic forms, and connect inverse algebra to reflected graphs.', estimatedMinutes:55,
        teks:['P.2F','P.2I','P.2J'],
        objectives:['Rewrite exponential equations in logarithmic form and vice versa.','Explain log_b(x) as an exponent question.','Connect exponential/log domains, ranges, and graph reflection across y=x.'],
        prerequisites:['Inverse functions from Unit 1.','Exponent rules and exponential graphs.'],
        keyIdeas:['log_b(x)=y exactly when b^y=x.','Logarithms undo exponentials of the same base.','Inverse functions swap domain and range.'],
        formulas:['b^y=x ⇔ log_b(x)=y','b^(log_b x)=x for x>0','log_b(b^x)=x'],
        sections:[
            {title:'A logarithm answers one question',paragraphs:['The expression log_b(x) asks: “What exponent on base b produces x?” This definition turns unfamiliar logarithm notation into an exponent problem. The base stays the same when translating between forms.'],bullets:['Base b must be positive and b≠1.','The logarithm argument x must be positive in real-number work.','The output of a logarithm may be any real number.']},
            {title:'Inverse operations and inverse graphs',paragraphs:['Exponential and logarithmic functions of the same base undo one another. Their graphs reflect across y=x, so the exponential domain becomes the logarithm range and the exponential range becomes the logarithm domain.'],bullets:['Exponential domain: all real numbers.','Exponential positive range becomes logarithmic positive domain.','Exponential horizontal asymptote y=0 reflects to logarithmic vertical asymptote x=0.']},
            {title:'Translate without rearranging randomly',paragraphs:['Use the template b^y=x ⇔ log_b(x)=y. Do not swap the base with the exponent or argument. Naming the three roles—base, exponent, result—prevents most notation errors.'],bullets:['Base stays base.','Exponent becomes log output.','Exponential result becomes log argument.']}
        ],
        workedExamples:[
            {title:'Exponential to logarithmic',problem:'Rewrite 5³=125 in logarithmic form.',steps:['Base is 5.','Exponent is 3.','Result is 125.','Place them into log_b(result)=exponent.'],answer:'log₅(125)=3'},
            {title:'Logarithmic to exponential',problem:'Rewrite log₂(1/8)=−3 in exponential form.',steps:['Base is 2.','Log output is −3, so that becomes the exponent.','Argument is 1/8, so that becomes the result.'],answer:'2^(−3)=1/8'}
        ],
        commonMistakes:[{mistake:'Moving the exponent into the log base.',fix:'The base never changes when translating. The exponent becomes the logarithm value.'},{mistake:'Thinking log_b(x) means b divided by x.',fix:'A logarithm is an inverse exponent operation, not a quotient.'}],
        alternateExplanation:'If exponentials are a locked box labeled “raise base b to this power,” then logarithms are the reverse lookup: given the output, they tell you which power was used.',
        application:'Logarithms let us solve for unknown exponents, which is why they become essential when time is unknown in growth, decay, and finance models.',
        teacherTip:'Make translation mechanical first: circle the base, underline the exponent, box the result. Then move the same three values into the logarithm template.',
        generators:{easy:['u3:expLogConvert','u3:logExpConvert'],standard:['u3:expLogConvert','u3:logExpConvert','u3:inverseRelationship'],challenge:['u3:inverseRelationship','u3:expLogConvert']}
    }),
    authoredLesson({
        id:'3.5', title:'Common & Natural Logarithms', summary:'Evaluate common and natural logarithms, use exact inverse relationships, and interpret logarithmic values as exponents instead of mysterious calculator outputs.', estimatedMinutes:50,
        teks:['P.2F','P.2I','P.2J'],
        objectives:['Evaluate exact logarithms by recognizing powers.','Use log for base 10 and ln for base e.','Use inverse identities involving 10^x, e^x, log, and ln.'],
        prerequisites:['Exponential-logarithmic conversion.','Integer exponent rules.'],
        keyIdeas:['log(x) means log base 10 unless another base is specified.','ln(x) means log base e.','Exact logarithms should be recognized before using decimal approximation.'],
        formulas:['log(10^x)=x','ln(e^x)=x','10^(log x)=x, x>0','e^(ln x)=x, x>0'],
        sections:[
            {title:'Common logarithms use base 10',paragraphs:['The common logarithm is written simply log(x). It asks for the exponent on 10. For powers of 10, exact evaluation is immediate: log(1000)=3 because 10³=1000. Negative logarithm outputs correspond to positive fractions such as 10^(−2)=0.01.'],bullets:['No written base usually means base 10 in this course.','The argument still must be positive.','A negative log value is allowed; a negative log argument is not.']},
            {title:'Natural logarithms use base e',paragraphs:['The notation ln(x) is shorthand for log_e(x). Because ln and e^x are inverses, expressions like ln(e^4) simplify exactly to 4. This inverse relationship is more important than memorizing a decimal value for e.'],bullets:['ln(e)=1.','ln(1)=0.','e^(ln x)=x for positive x.']},
            {title:'Exact first, approximate second',paragraphs:['If the argument is an obvious power of the base, evaluate exactly. If it is not, a calculator may produce a decimal approximation. Keeping exact structure when possible makes later algebra cleaner and reveals why an answer is correct.'],bullets:['Recognize powers before reaching for a calculator.','Approximate only when the problem asks or the value is not a simple power.','State reasonable decimal precision.']}
        ],
        workedExamples:[
            {title:'Common logarithm',problem:'Evaluate log(0.001).',steps:['Rewrite 0.001 as 10^(−3).','log(10^(−3))=−3 by the inverse property.'],answer:'−3'},
            {title:'Natural logarithm',problem:'Simplify ln(e^(5/2)).',steps:['ln and e^x are inverse operations.','The exponent survives unchanged.'],answer:'5/2'}
        ],
        commonMistakes:[{mistake:'Believing a logarithm cannot have a negative answer.',fix:'The argument must be positive, but the output can be negative. For example log(0.1)=−1.'},{mistake:'Confusing ln(x) with 1/x.',fix:'ln is a logarithm base e, not a reciprocal notation.'}],
        alternateExplanation:'A logarithm is an exponent-labeling device. Common log labels powers of 10; natural log labels powers of e.',
        application:'Scientific scales and many growth models use logarithms because multiplicative changes can be represented as additive changes in logarithmic form.',
        teacherTip:'Ask “10 to what power?” or “e to what power?” aloud. This verbal habit makes exact log evaluation much more intuitive.',
        generators:{easy:['u3:exactLog','u3:commonLogPower','u3:naturalLogExact'],standard:['u3:exactLog','u3:naturalLogExact','u3:commonLogPower'],challenge:['u3:exactLog','u3:naturalLogExact']}
    }),
    authoredLesson({
        id:'3.6', title:'Properties of Logarithms', summary:'Expand and condense logarithmic expressions using product, quotient, and power properties, and use change of base when a calculator lacks the desired base.', estimatedMinutes:60,
        teks:['P.5G'],
        objectives:['Apply product, quotient, and power properties correctly.','Expand one logarithm into several terms and condense several terms into one logarithm.','Use the change-of-base formula for arbitrary bases.'],
        prerequisites:['Exponent properties.','Common and natural logarithms.'],
        keyIdeas:['Logarithms turn products into sums and quotients into differences.','An exponent inside a logarithm becomes a multiplier outside.','There is no property that turns log(x+y) into a simple sum of logs.'],
        formulas:['log_b(MN)=log_b M+log_b N','log_b(M/N)=log_b M−log_b N','log_b(M^p)=p log_b M','log_b M = ln M / ln b'],
        sections:[
            {title:'Why the properties mirror exponent rules',paragraphs:['Because logarithms report exponents, multiplication of exponential quantities corresponds to addition of their exponents. Division corresponds to subtraction, and a power multiplies an exponent. The log rules are the inverse-side version of familiar exponent laws.'],bullets:['Product → sum.','Quotient → difference.','Power → coefficient.']},
            {title:'Expand versus condense',paragraphs:['To expand, break products and quotients apart and bring exponents down. To condense, reverse that process: move coefficients up as exponents, combine sums into products, and combine differences into quotients.'],bullets:['Work one structural layer at a time.','Keep the same logarithm base throughout.','Parentheses matter when condensing multiple terms.']},
            {title:'What the rules do not say',paragraphs:['Log properties apply to multiplication, division, and powers inside the logarithm. They do not split addition or subtraction inside an argument. log(x+y) is not log x + log y.'],bullets:['Never invent a “sum rule.”','Factor an expression first if factoring reveals a product.','Check that all original log arguments satisfy their domain conditions.']}
        ],
        workedExamples:[
            {title:'Expand a logarithm',problem:'Expand ln(x³√y/z).',steps:['Treat the quotient first: ln(x³√y)−ln z.','Split the product: ln(x³)+ln(√y)−ln z.','Use powers: 3ln x +(1/2)ln y−ln z.'],answer:'3ln x +(1/2)ln y−ln z'},
            {title:'Condense logarithms',problem:'Condense 2log_b x + log_b y − 3log_b z.',steps:['Move coefficients up: log_b(x²)+log_b(y)−log_b(z³).','Combine the sum as a product: log_b(x²y)−log_b(z³).','Combine the difference as a quotient.'],answer:'log_b(x²y/z³)'}
        ],
        commonMistakes:[{mistake:'Writing log(x+y)=log x+log y.',fix:'There is no logarithm sum property. Product/quotient/power rules come from exponent structure.'},{mistake:'Forgetting that a coefficient becomes an exponent when condensing.',fix:'Reverse the power property first, then combine logs.'}],
        alternateExplanation:'Think of logarithms as translating multiplication-language into addition-language. Products become sums because exponents add when equal bases multiply.',
        application:'Log properties allow exponential equations to be solved, models to be linearized, and awkward bases to be evaluated with standard calculator functions.',
        teacherTip:'Have the learner label each move P, Q, or Power. If they cannot name the property, they are more likely to apply a nonexistent rule.',
        guidedPractice:['u3:logProductExpand','u3:logQuotientExpand','u3:logCondense','u3:changeOfBase'],
        generators:{easy:['u3:logProductExpand','u3:logQuotientExpand'],standard:['u3:logProductExpand','u3:logQuotientExpand','u3:logCondense'],challenge:['u3:logCondense','u3:changeOfBase']}
    }),
    authoredLesson({
        id:'3.7', title:'Exponential Equations', summary:'Solve exponential equations by matching bases when possible and by using logarithms when the variable cannot be isolated through equivalent powers.', estimatedMinutes:60,
        teks:['P.5I'],
        objectives:['Solve exponential equations with common bases.','Use logarithms to solve equations with unmatched bases.','Check solutions numerically or by substitution and report appropriate precision.'],
        prerequisites:['Exponent rules.','Logarithm properties and change of base.'],
        keyIdeas:['Equal positive bases imply equal exponents.','If bases cannot be matched conveniently, take logs of both sides.','The power rule moves an exponent in front of a logarithm.'],
        formulas:['b^u=b^v ⇒ u=v','b^x=c ⇒ x=ln(c)/ln(b)'],
        sections:[
            {title:'Use matching bases first',paragraphs:['Before reaching for logarithms, check whether both sides can be rewritten with the same base. This usually gives an exact answer with less work. Powers of 2, 3, 5, and 10 often reveal this route.'],bullets:['Rewrite both sides if practical.','Then equate exponents.','Solve the resulting algebraic equation.']},
            {title:'Use logarithms when the exponent is trapped',paragraphs:['If the equation is 2^x=17, no convenient integer exponent works. Take ln (or log) of both sides, use the power property ln(2^x)=x ln2, and divide.'],bullets:['Logs can be taken on both sides because equality is preserved.','Any consistent logarithm base works.','Keep extra calculator digits until the final rounding step.']},
            {title:'Check the scale of the answer',paragraphs:['A quick estimate helps catch calculator-entry mistakes. For example, since 2^4=16, the solution to 2^x=17 should be just above 4. A result such as 40 indicates an input error.'],bullets:['Bracket with nearby powers.','Substitute the final value when practical.','Round only at the end.']}
        ],
        workedExamples:[
            {title:'Solve by matching bases',problem:'Solve 9^(x−1)=27.',steps:['Rewrite 9=3² and 27=3³.','Then 3^(2x−2)=3³.','Set exponents equal: 2x−2=3.','Solve x=5/2.'],answer:'x=5/2'},
            {title:'Solve with logarithms',problem:'Solve 5^x=18.',steps:['Take ln of both sides: ln(5^x)=ln18.','Use power rule: x ln5=ln18.','Divide: x=ln18/ln5.','Approximate x≈1.796.'],answer:'x≈1.796'}
        ],
        commonMistakes:[{mistake:'Taking log of only one side.',fix:'Apply the same operation to both sides of an equation.'},{mistake:'Writing ln(5^x)=ln5^x without moving x correctly.',fix:'Use the power rule: ln(5^x)=x ln5.'}],
        alternateExplanation:'The goal is to bring x down from the exponent into ordinary algebra. Matching bases does that by comparing exponents; logarithms do it through the power property.',
        application:'Unknown-time problems in population growth, finance, decay, and doubling/halving all produce exponential equations.',
        teacherTip:'Ask “Can these bases be made the same?” before allowing a calculator. This builds exact reasoning and prevents unnecessary logarithm work.',
        generators:{easy:['u3:expEquationSameBase'],standard:['u3:expEquationSameBase','u3:expEquationLog'],challenge:['u3:expEquationLog','u3:expEquationSameBase']}
    }),
    authoredLesson({
        id:'3.8', title:'Logarithmic Equations', summary:'Solve logarithmic equations by converting to exponential form or combining logarithms, while enforcing the positive-argument domain that can create extraneous algebraic solutions.', estimatedMinutes:60,
        teks:['P.5H'],
        objectives:['Solve single-logarithm equations by exponential conversion.','Combine logarithms before solving multi-log equations.','Reject candidates that violate original logarithm domains.'],
        prerequisites:['Logarithm properties.','Solving linear and quadratic equations.'],
        keyIdeas:['Every real logarithm argument must be positive.','Combining logs can simplify an equation, but original domain restrictions still matter.','A solved algebraic candidate is not automatically a valid logarithmic solution.'],
        formulas:['log_b(M)=c ⇒ M=b^c','log_b M + log_b N = log_b(MN)'],
        sections:[
            {title:'Single logarithms: convert forms',paragraphs:['When one logarithm is isolated, rewrite it in exponential form. This removes the logarithm and leaves an algebraic equation. The translation rule from Lesson 3.4 is now a solving tool.'],bullets:['Isolate the logarithm first.','Convert base, output, and argument carefully.','Solve the resulting equation.']},
            {title:'Multiple logarithms: combine first',paragraphs:['If logs of the same base are added or subtracted, use the product or quotient property to combine them. The resulting single logarithm can then be converted to exponential form.'],bullets:['Only combine logs with compatible bases.','Keep track of parentheses.','Record domain restrictions before algebra becomes complicated.']},
            {title:'Domain checks are part of the solution',paragraphs:['Algebra may produce a candidate that makes a logarithm argument zero or negative. Such a value was never in the domain of the original equation and must be rejected. This is not optional checking; it is part of solving the equation correctly.'],bullets:['Each original log argument must be >0.','Check candidates in the original equation.','A problem may have no valid real solution after domain filtering.']}
        ],
        workedExamples:[
            {title:'Single logarithm',problem:'Solve log₃(x−2)=4.',steps:['Convert to exponential form: x−2=3⁴.','Compute 3⁴=81.','Solve x=83.','Check x−2=81>0.'],answer:'x=83'},
            {title:'Combine and check',problem:'Solve log₂(x)+log₂(x−2)=3.',steps:['Domain requires x>2.','Combine: log₂[x(x−2)]=3.','Convert: x(x−2)=8.','Solve x²−2x−8=0 → x=4 or x=−2.','Reject −2 because it violates x>2.'],answer:'x=4'}
        ],
        commonMistakes:[{mistake:'Keeping every root of the resulting polynomial.',fix:'Check each root against every original logarithm argument.'},{mistake:'Combining log M + log N as log(M+N).',fix:'The product property gives log(MN), not log(M+N).'}],
        alternateExplanation:'Solving logarithmic equations is a two-door process: algebra finds candidates, and the logarithm domain decides who is allowed through.',
        application:'Logarithmic equations occur when measurement scales or transformed exponential models are used, and domain checks prevent mathematically meaningless quantities.',
        teacherTip:'Write domain restrictions before combining logs. Students are less likely to forget them once the original expression disappears.',
        generators:{easy:['u3:logEquationSingle','u3:logDomainCheck'],standard:['u3:logEquationSingle','u3:logEquationProduct','u3:logDomainCheck'],challenge:['u3:logEquationProduct','u3:logDomainCheck']}
    }),
    authoredLesson({
        id:'3.9', title:'Exponential & Logarithmic Graphs', summary:'Analyze transformations, asymptotes, domains, ranges, intercepts, and inverse symmetry for exponential and logarithmic graphs.', estimatedMinutes:55,
        teks:['P.2F','P.2G','P.2I','P.2J'],
        objectives:['Graph transformed exponential and logarithmic functions from parent features.','Identify asymptotes and domain/range after transformations.','Explain the reflection relationship between inverse exponential and logarithmic graphs.'],
        prerequisites:['Function transformations.','Inverse exponential/logarithm relationship.'],
        keyIdeas:['Exponential parents have horizontal asymptotes; logarithmic parents have vertical asymptotes.','Inverse graphs reflect across y=x.','Horizontal and vertical shifts move key points and asymptotes predictably.'],
        formulas:['y=ab^(x−h)+k → horizontal asymptote y=k','y=a log_b(x−h)+k → vertical asymptote x=h'],
        sections:[
            {title:'Track the asymptote first',paragraphs:['An asymptote is the structural anchor of these graphs. For an exponential parent, start with y=0 and shift it vertically. For a logarithm parent, start with x=0 and shift it horizontally. Once the asymptote is placed, transformed key points become much easier to locate.'],bullets:['Exponential vertical shift controls y=k.','Logarithm horizontal shift controls x=h.','A reflection changes which side of the asymptote the graph occupies but not the asymptote line itself.']},
            {title:'Domain and range swap under inversion',paragraphs:['Because inverse functions exchange coordinates, the all-real exponential domain becomes the all-real logarithm range. The positive exponential range becomes the positive logarithm domain. The same swap explains the asymptote orientation.'],bullets:['Parent exponential: domain all real, range (0,∞).','Parent logarithm: domain (0,∞), range all real.','Reflection occurs across y=x.']},
            {title:'Use key points, not sketching by instinct',paragraphs:['Transform known points such as (0,1) on y=b^x and (1,0) on y=log_b x. Combined with the asymptote and growth direction, a few reliable points produce a much more accurate graph than freehand guessing.'],bullets:['Transform coordinates systematically.','Label asymptotes with dashed guide lines when sketching.','Check that the graph stays in its domain.']}
        ],
        workedExamples:[
            {title:'Exponential transformation',problem:'Describe y=2^(x−3)+1.',steps:['Shift y=2^x right 3 and up 1.','The parent asymptote y=0 moves to y=1.','The point (0,1) moves to (3,2).','Domain remains all real; range becomes y>1.'],answer:'Right 3, up 1; asymptote y=1; range (1,∞)'},
            {title:'Logarithmic transformation',problem:'Describe y=log₂(x+4)−2.',steps:['x+4 shifts the parent left 4.','−2 shifts it down 2.','The vertical asymptote moves from x=0 to x=−4.','Domain is x>−4; range remains all real.'],answer:'Left 4, down 2; asymptote x=−4; domain (−4,∞)'}
        ],
        commonMistakes:[{mistake:'Giving an exponential function a vertical asymptote.',fix:'Exponential parents approach a horizontal line; logarithmic parents approach a vertical line.'},{mistake:'Moving a logarithm asymptote in the visible sign direction inside parentheses.',fix:'Inside horizontal shifts work opposite the visible sign: x+4 means left 4, so the boundary is x=−4.'}],
        alternateExplanation:'The exponential and logarithm are mirror partners. If you can place one graph and literally imagine flipping the page across y=x, the other graph’s domain, range, intercept role, and asymptote orientation follow.',
        application:'Graph features reveal allowable inputs and long-run behavior in growth/decay models before any numerical calculation is made.',
        teacherTip:'Make the student state “asymptote first, then key point.” This prevents many transformation sketches from drifting.',
        generators:{easy:['u3:expGraphFeature','u3:logGraphFeature'],standard:['u3:expGraphFeature','u3:logGraphFeature','u3:inverseGraphAsymptotes'],challenge:['u3:inverseGraphAsymptotes','u3:logGraphFeature']}
    }),
    authoredLesson({
        id:'3.10', title:'Exponential/Logarithmic Modeling', summary:'Build and solve exponential models for compound interest, continuous change, half-life, and other real situations, using logarithms when the unknown appears in an exponent.', estimatedMinutes:65,
        teks:['P.2N','P.5H','P.5I'],
        objectives:['Choose an exponential model from context and identify its parameters.','Evaluate discrete and continuous growth/decay models.','Use logarithms to solve models for an unknown time.'],
        prerequisites:['Growth/decay models.','Solving exponential equations with logarithms.'],
        keyIdeas:['Model choice comes before calculator work.','Discrete compounding uses a periodic factor; continuous change naturally uses e^(rt).','Unknown time usually requires logarithms.'],
        formulas:['A=P(1+r/n)^(nt)','A=A₀e^(rt)','Half-life model: A=A₀(1/2)^(t/h)'],
        sections:[
            {title:'Translate the story into parameters',paragraphs:['Identify the starting amount, how the change is described, and the time unit. A percent per year compounded monthly is not the same parameter setup as a continuous annual rate. Units decide what belongs in the exponent.'],bullets:['Name every variable with units.','Convert percentages to decimals.','Match compounding frequency and time units.']},
            {title:'When time is unknown, isolate the exponential part',paragraphs:['First divide away coefficients so the power expression is isolated. Then take logarithms. The log power rule moves the unknown time out of the exponent, turning the problem into ordinary algebra.'],bullets:['Do algebra before logarithms when possible.','Take logs only after isolating the exponential factor.','Round at the end and interpret the result in context.']},
            {title:'Judge whether the answer makes sense',paragraphs:['Modeling answers need context checks. A decaying quantity should not increase. A doubling-time answer should align with the rate: faster growth means shorter doubling time. Money answers need currency units and sensible precision.'],bullets:['Check sign and magnitude.','Use nearby benchmark powers.','State the answer with units.']}
        ],
        workedExamples:[
            {title:'Compound interest',problem:'Find the balance on $1,200 at 6% compounded monthly for 4 years.',steps:['P=1200, r=0.06, n=12, t=4.','Use A=1200(1+0.06/12)^(48).','Evaluate the power with full calculator precision.','A≈$1,525.87.'],answer:'About $1,525.87'},
            {title:'Solve for time',problem:'A population follows P=800e^(0.09t). When does it reach 2,000?',steps:['Set 2000=800e^(0.09t).','Divide by 800: 2.5=e^(0.09t).','Take ln: ln2.5=0.09t.','t=ln2.5/0.09≈10.18.'],answer:'About 10.18 time units'}
        ],
        commonMistakes:[{mistake:'Using r=6 for a 6% rate.',fix:'Percent rates must be written as decimals in these formulas: 6%=0.06.'},{mistake:'Rounding the growth factor or logarithm too early.',fix:'Keep full calculator precision until the final reported answer.'}],
        alternateExplanation:'A model is a translation: the starting value sets the scale, the growth/decay mechanism determines the multiplier, and time counts how long that mechanism acts. Logarithms are the tool for asking “how long?”',
        application:'This lesson directly covers finance, population, half-life, depreciation, and continuous growth situations that motivate exponential and logarithmic mathematics.',
        teacherTip:'Require a one-sentence interpretation after every modeled result. Correct arithmetic without units or meaning is incomplete modeling.',
        generators:{easy:['u3:compoundInterest','u3:halfLifeModel'],standard:['u3:compoundInterest','u3:halfLifeModel','u3:continuousTime'],challenge:['u3:continuousTime','u3:compoundInterest']}
    }),
    authoredLesson({
        id:'3.11', title:'Unit Review / Assessment', summary:'Synthesize exponential functions, logarithms, equations, graph behavior, properties, and modeling in a mixed review that checks both procedures and conceptual understanding.', estimatedMinutes:75,
        teks:['P.2F','P.2G','P.2I','P.2J','P.2N','P.5G','P.5H','P.5I'],
        objectives:['Select the correct exponential/logarithmic strategy without being told the lesson type.','Explain key domain, asymptote, and inverse relationships.','Solve mixed equations and modeling problems accurately.'],
        prerequisites:['Lessons 3.1–3.10.'],
        keyIdeas:['Exponential thinking is multiplicative.','Logarithms are inverse exponent operations.','Domains and model assumptions matter as much as symbolic manipulation.'],
        formulas:['b^y=x ⇔ log_b x=y','log_b(MN)=log_bM+log_bN','A=A₀e^(rt)','A=P(1+r/n)^(nt)'],
        sections:[
            {title:'Sort the problem before solving it',paragraphs:['Mixed review removes the lesson label, so begin by identifying structure. Is the variable in an exponent? Is there a logarithm? Is this a graph-feature question or a contextual model? Strategy selection is a core precalculus skill.'],bullets:['Name the function family.','State the relevant domain or asymptote if needed.','Choose exact algebra before approximation.']},
            {title:'Connect representations',paragraphs:['Equations, graphs, tables, and contexts should tell the same story. Use one representation to check another: a growth model should have a base above 1, a shifted exponential graph should approach its horizontal asymptote, and a log solution must satisfy positive arguments.'],bullets:['Cross-check graph and algebra.','Interpret parameters in context.','Use inverse relationships as a consistency check.']},
            {title:'Use mistakes diagnostically',paragraphs:['A wrong answer should reveal what to review. Confusing the rate with the factor points back to growth/decay setup. A forbidden log argument points to domain. A wrong phase-like horizontal shift here points back to transformation conventions.'],bullets:['Classify the error.','Redo one similar problem correctly.','Then attempt mixed practice again.']}
        ],
        workedExamples:[
            {title:'Mixed equation choice',problem:'Solve 3^(2x)=20.',steps:['The bases cannot be matched conveniently.','Take ln: ln(3^(2x))=ln20.','Use power rule: 2x ln3=ln20.','x=ln20/(2ln3).'],answer:'x≈1.363'},
            {title:'Mixed domain check',problem:'Why can x=1 fail as a candidate in log(x−3)+log(x+2)=1?',steps:['Check each original argument.','At x=1, x−3=−2.','A real logarithm cannot have a negative argument.','Therefore x=1 must be rejected without further evaluation.'],answer:'It violates the logarithm domain.'}
        ],
        commonMistakes:[{mistake:'Choosing a formula from keywords without checking the structure.',fix:'Identify the actual change pattern and unknown before selecting a model.'},{mistake:'Treating calculator output as proof.',fix:'Use algebraic structure, domains, and rough estimates to verify calculator results.'}],
        alternateExplanation:'Unit 3 has one central loop: exponentials create multiplicative change, logarithms reverse exponential change, and graphs/models show what those operations mean in the world.',
        application:'A strong Unit 3 review prepares students to recognize exponential structure in later trigonometric, scientific, and calculus contexts.',
        teacherTip:'Use mixed mode for the final check. If a learner only succeeds when told which formula to use, the unit is not yet mastered.',
        generators:{easy:['u3:expEvaluate','u3:percentFactor','u3:exactLog','u3:expLogConvert'],standard:['u3:growthDecayValue','u3:logCondense','u3:expEquationLog','u3:logEquationSingle','u3:expGraphFeature','u3:compoundInterest'],challenge:['u3:changeOfBase','u3:logEquationProduct','u3:continuousTime','u3:inverseGraphAsymptotes']}
    })
];

export default authoredUnit(3,'Exponential and Logarithmic Functions','~5 weeks',['P.2F','P.2G','P.2I','P.2J','P.2N','P.5G','P.5H','P.5I'],lessons);
