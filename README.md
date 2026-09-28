# Precalculus Classroom

A complete, mobile-first Precalculus course built with plain HTML, CSS, and JavaScript for GitHub Pages.

## Course

The site contains all 9 approved units and 100 individually authored lessons:

1. Functions and Their Graphs
2. Polynomial and Rational Functions
3. Exponential and Logarithmic Functions
4. Series and Sequences
5. Trigonometric Functions
6. Analytic Trigonometry
7. Additional Trigonometry Topics
8. Conics
9. Parametric Equations and Polar Coordinates

The course structure follows the San Antonio / Northside ISD-oriented sequence used throughout development and stores TEKS references with individual lessons.

## What each lesson includes

- learning objectives and prerequisite review
- multi-part concept teaching
- worked examples with reasoning
- common mistakes and corrections
- alternate explanations
- formulas/reference material
- real-world or mathematical applications
- guided, independent, mastery, and extra practice
- detailed wrong-answer explanations and hints
- interactive visualizations where they materially help

## Study features

- lesson-specific random question generation
- Easy, Standard, Challenge, and Mixed practice
- More Practice stays inside the current lesson
- mastery states based on practice performance
- persistent local progress
- mistake notebook
- spaced-review reminders
- unit and whole-course progress
- direct bookmarkable lesson URLs using hash routing
- responsive phone, tablet, and desktop layouts

Progress is stored locally in the browser. There is no account, backend, analytics service, or external dependency.

## Run locally

Because the project uses ES modules and lazy-loaded unit files, serve the directory instead of opening `index.html` directly:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/`.

## Deploy to GitHub Pages

1. Create a GitHub repository.
2. Upload the contents of this folder to the repository root.
3. In **Settings → Pages**, choose **Deploy from a branch**.
4. Select your main branch and `/ (root)`.
5. Save and open the Pages URL once deployment completes.

No build command is required.

## Development tests

The full source checkpoint includes the automated suite:

```bash
npm test
```

It covers routing, persistence, progress/mastery, lesson schemas, generated-question stress tests, practice integration, math explorer calculations, content/static audits, responsive invariants, and final release rendering checks.
