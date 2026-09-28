export const COURSE = Object.freeze({
    title: 'Precalculus Classroom',
    units: [
        unit(1, 'Functions and Their Graphs', [
            'Functions, Relations & Function Notation','Domain and Range','Analyzing Graphs of Functions','Parent Functions & Function Families','Transformations of Functions','Operations on Functions','Composition of Functions','Inverse Functions','Piecewise-Defined Functions','Function Modeling & Applications','Unit Review / Assessment'
        ]),
        unit(2, 'Polynomial and Rational Functions', [
            'Polynomial Functions & End Behavior','Zeros, Factors & Multiplicity','Graphing Polynomial Functions','Polynomial Division','Fundamental Theorem of Algebra & Complex Zeros','Rational Functions','Domain, Holes & Discontinuities','Vertical, Horizontal & Oblique Asymptotes','Graphing Rational Functions','Polynomial & Rational Equations and Inequalities','Polynomial/Rational Modeling','Unit Review / Assessment'
        ]),
        unit(3, 'Exponential and Logarithmic Functions', [
            'Exponential Functions','Exponential Growth & Decay','The Number e & Natural Exponential Functions','Inverses and Logarithmic Functions','Common & Natural Logarithms','Properties of Logarithms','Exponential Equations','Logarithmic Equations','Exponential & Logarithmic Graphs','Exponential/Logarithmic Modeling','Unit Review / Assessment'
        ]),
        unit(4, 'Series and Sequences', [
            'Introduction to Sequences','Arithmetic Sequences','Geometric Sequences','Recursive & Explicit Formulas','Series & Sigma Notation','Arithmetic Series','Finite Geometric Series','Infinite Geometric Series','Binomial Theorem','Sequence & Series Applications','Unit Review / Assessment'
        ]),
        unit(5, 'Trigonometric Functions', [
            'Angles, Degrees & Radians','Arc Length & Angular/Linear Speed','The Unit Circle','Sine & Cosine','Tangent, Cotangent, Secant & Cosecant','Exact Values at Special Angles','Graphing Sine & Cosine','Amplitude, Period & Phase Shift','Graphing Other Trigonometric Functions','Inverse Trigonometric Functions','Sinusoidal Modeling','Unit Review / Assessment'
        ]),
        unit(6, 'Analytic Trigonometry', [
            'Fundamental Trigonometric Identities','Pythagorean Identities','Simplifying Trigonometric Expressions','Verifying Trigonometric Identities','Solving Basic Trigonometric Equations','Solving Multi-Step Trigonometric Equations','Sum & Difference Formulas','Double-Angle Formulas','Half-Angle Formulas','Applying Identities & Formulas','Unit Review / Assessment'
        ]),
        unit(7, 'Additional Trigonometry Topics', [
            'Oblique Triangles','Law of Sines','Law of Cosines','Applications of Oblique Triangles','Introduction to Vectors','Vector Components','Vector Magnitude & Direction','Vector Operations','Vector Applications','Unit Review / Assessment'
        ]),
        unit(8, 'Conics', [
            'Introduction to Conic Sections','Circles','Parabolas','Ellipses','Hyperbolas','Identifying Conics from General Equations','Translating & Graphing Conics','Conic Applications','Unit Review / Assessment'
        ]),
        unit(9, 'Parametric Equations and Polar Coordinates', [
            'Introduction to Parametric Equations','Graphing Parametric Equations','Eliminating the Parameter','Parametric Modeling & Applications','Introduction to Polar Coordinates','Plotting Points in Polar Coordinates','Rectangular ↔ Polar Coordinate Conversion','Rectangular ↔ Polar Equation Conversion','Graphing Polar Equations','Circles & Limacons','Roses & Lemniscates','Polar Modeling / Applications','Unit Review / Assessment'
        ])
    ]
});

function unit(number, title, lessonTitles) {
    return Object.freeze({
        number,
        title,
        lessons: Object.freeze(lessonTitles.map((title, index) => Object.freeze({
            id: `${number}.${index + 1}`,
            title
        })))
    });
}

export function getAllLessonIds() {
    return COURSE.units.flatMap(unit => unit.lessons.map(lesson => lesson.id));
}
