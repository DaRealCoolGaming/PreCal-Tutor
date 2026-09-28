import { createPracticeEngine } from './practice.js';
import { mountMathExplorer } from './graphs.js';

function e(value) {
    return String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');
}

function list(items) {
    return `<ul>${items.map(item => `<li>${e(item)}</li>`).join('')}</ul>`;
}

export function renderAuthoredLesson(lesson, lessonProgress, navigation = {}) {
    return `<article class="lesson-shell" aria-labelledby="lesson-heading">
        <header class="lesson-heading">
            <div class="lesson-heading__meta"><span class="lesson-number">Lesson ${e(lesson.id)}</span><span class="mastery-label">${e(lessonProgress.status.replaceAll('-',' '))}</span><span class="mastery-label">~${lesson.estimatedMinutes} min</span></div>
            <h1 id="lesson-heading">${e(lesson.title)}</h1>
            <p class="lesson-heading__summary">${e(lesson.summary)}</p>
            <div class="lesson-meta-row"><span>TEKS: ${lesson.teks.map(e).join(', ')}</span></div>
        </header>
        <section class="lesson-section"><span class="eyebrow lesson-section__label">Goals</span><h2>By the end, you should be able to…</h2>${list(lesson.objectives)}</section>
        <section class="lesson-section panel panel--soft"><span class="eyebrow lesson-section__label">Before you start</span><h2>Prerequisite check</h2>${list(lesson.prerequisites)}</section>
        ${lesson.sections.map((section,index)=>`<section class="lesson-section"><span class="eyebrow lesson-section__label">Learn ${index+1}</span><h2>${e(section.title)}</h2>${section.paragraphs.map(p=>`<p>${e(p)}</p>`).join('')}${section.bullets.length?list(section.bullets):''}</section>`).join('')}
        ${lesson.keyIdeas.length?`<section class="lesson-section callout"><span class="eyebrow lesson-section__label">Keep these</span><h2>Key ideas</h2>${list(lesson.keyIdeas)}${lesson.formulas.length?`<details class="formula-reference"><summary>Formula / reference</summary><div class="formula-stack">${lesson.formulas.map(f=>`<div class="math-display">${e(f)}</div>`).join('')}</div></details>`:''}</section>`:''}
        ${interactiveMarkup(lesson.id)}
        <section class="lesson-section"><span class="eyebrow lesson-section__label">Worked examples</span><h2>See the reasoning, not just the answer</h2><div class="stack">${lesson.workedExamples.map((example,index)=>`<article class="example"><div class="example__header"><strong>Example ${index+1}: ${e(example.title)}</strong></div><div class="example__body"><p><strong>${e(example.problem)}</strong></p><ol>${example.steps.map(step=>`<li>${e(step)}</li>`).join('')}</ol><p class="callout"><strong>Answer:</strong> ${e(example.answer)}</p></div></article>`).join('')}</div></section>
        <section class="lesson-section"><span class="eyebrow lesson-section__label">Common mistakes</span><h2>What usually goes wrong</h2><div class="stack">${lesson.commonMistakes.map(item=>`<div class="callout callout--warning"><p><strong>${e(item.mistake)}</strong></p><p>${e(item.fix)}</p></div>`).join('')}</div></section>
        <section class="lesson-section panel"><span class="eyebrow lesson-section__label">Another way to think about it</span><h2>If the first explanation did not click</h2><p>${e(lesson.alternateExplanation)}</p></section>
        <section class="lesson-section panel panel--soft"><span class="eyebrow lesson-section__label">Why it matters</span><h2>Application</h2><p>${e(lesson.application)}</p></section>
        <section class="lesson-section" id="practice-${e(lesson.id)}"><span class="eyebrow lesson-section__label">Practice</span><h2>Make the idea yours</h2><p>${e(lesson.teacherTip)}</p><div data-practice-root></div></section>
        <nav class="lesson-footer-nav" aria-label="Lesson navigation">
            ${navigation.previous ? `<a class="button button--secondary" href="#/lesson/${e(navigation.previous.id)}" data-route>← ${e(navigation.previous.id)} Previous</a>` : '<span></span>'}
            <a class="button button--secondary" href="#/unit/${e(lesson.id.split('.')[0])}" data-route>Back to unit</a>
            ${navigation.next ? `<a class="button" href="#/lesson/${e(navigation.next.id)}" data-route>Next ${e(navigation.next.id)} →</a>` : '<a class="button" href="#/progress" data-route>View progress</a>'}
        </nav>
    </article>`;
}

function interactiveMarkup(lessonId) {
    const type = ({'1.4':'function','1.5':'function','3.9':'expLog','4.8':'geometricSeries','5.3':'unitCircle','5.6':'unitCircle','5.7':'trig','5.8':'trig','5.9':'trig','5.11':'trig','7.1':'triangle','7.2':'triangle','7.3':'triangle','7.4':'triangle','7.5':'vector','7.6':'vector','7.7':'vector','7.8':'vector','7.9':'vector','8.1':'conic','8.2':'conic','8.3':'conic','8.4':'conic','8.5':'conic','8.6':'conic','8.7':'conic','8.8':'conic','9.1':'parametric','9.2':'parametric','9.3':'parametric','9.4':'parametric','9.5':'polar','9.6':'polar','9.7':'polar','9.8':'polar','9.9':'polar','9.10':'polar','9.11':'polar','9.12':'polar'})[lessonId];
    if (!type) return '';
    return `<section class="lesson-section"><span class="eyebrow lesson-section__label">Explore</span><h2>Change it and watch what happens</h2><div data-math-explorer="${type}"></div></section>`;
}

export function mountLessonUI(container, lesson, progressTracker) {
    const cleanup = [];
    const explorer = container.querySelector('[data-math-explorer]');
    if (explorer) cleanup.push(mountMathExplorer(explorer, explorer.dataset.mathExplorer));
    const root = container.querySelector('[data-practice-root]');
    if (root) cleanup.push(mountPractice(root, lesson, progressTracker));
    return () => cleanup.forEach(fn => typeof fn === 'function' && fn());
}

function mountPractice(root, lesson, progressTracker) {
    const engine = createPracticeEngine({ progressTracker });
    let mode = 'guided', difficulty = progressTracker?.getPracticeDifficulty?.() || 'standard', view = null, feedback = null, hint = null, submittedResponse = '';

    function start(nextMode = mode) {
        mode = nextMode; feedback = null; hint = null; submittedResponse = '';
        view = engine.start({ lesson, mode, difficulty });
        draw();
    }

    function draw() {
        if (!view) {
            root.innerHTML = `<div class="practice-launch panel"><div class="practice-toolbar"><label class="graph-control"><span>Difficulty</span><select data-difficulty><option value="easy" ${difficulty==='easy'?'selected':''}>Easy</option><option value="standard" ${difficulty==='standard'?'selected':''}>Standard</option><option value="challenge" ${difficulty==='challenge'?'selected':''}>Challenge</option><option value="mixed" ${difficulty==='mixed'?'selected':''}>Mixed</option></select></label><button class="button" data-start="guided">Guided practice</button><button class="button button--secondary" data-start="independent">Independent practice</button><button class="button button--secondary" data-start="mastery">Mastery check</button></div></div>`;
            wireLaunch(); return;
        }
        if (view.complete) { drawSummary(); return; }
        const q=view.question;
        const questionId=`practice-question-${lesson.id.replace('.','-')}-${view.index+1}`;
        root.innerHTML=`<div class="practice-toolbar"><span class="mastery-label">${e(mode)} · ${e(difficulty)}</span><strong>Question ${view.index+1} of ${view.total}</strong></div><div class="question-card" aria-labelledby="${questionId}"><h3 id="${questionId}" class="question-card__prompt" tabindex="-1">${e(q.prompt)}</h3>${answerControl(q, submittedResponse, Boolean(feedback))}<div class="practice-actions"><button class="button" data-check ${feedback?'disabled':''}>Check answer</button>${feedback?'':'<button class="button button--secondary" data-hint>Hint</button>'}${feedback?'<button class="button button--secondary" data-next>Next</button>':''}</div>${hint?`<div class="feedback-box" role="status"><strong>Hint ${hint.level}/${hint.total}</strong><p>${e(hint.text)}</p></div>`:''}${feedback?feedbackMarkup(feedback):''}</div>`;
        root.querySelector('[data-check]')?.addEventListener('click', check);
        root.querySelector('[data-hint]')?.addEventListener('click', ()=>{submittedResponse=readResponse();hint=engine.hint();draw();});
        root.querySelector('[data-next]')?.addEventListener('click', ()=>{const result=engine.next();feedback=null;hint=null;submittedResponse='';if(result?.lessonId&&'percent' in result){view={...view,complete:true};drawSummary(result);}else{view=result;draw();focusCurrentQuestion();}});
        root.querySelector('[data-answer-input]')?.addEventListener('keydown', event=>{
            if(event.key!=='Enter'||event.isComposing) return;
            event.preventDefault();
            if(feedback) root.querySelector('[data-next]')?.click();
            else check();
        });
    }

    function answerControl(q, selectedResponse='', answered=false) {
        if(q.type==='choice') {
            const correctId=String(q.answer?.value ?? '');
            return `<fieldset class="answer-options"><legend class="sr-only">Choose one answer</legend>${q.choices.map((c,i)=>{
                const selected=String(selectedResponse)===String(c.id);
                const correct=answered&&String(c.id)===correctId;
                const wrongSelected=answered&&selected&&!correct;
                const stateClass=correct?' answer-option--correct':wrongSelected?' answer-option--incorrect':'';
                const stateText=correct?'Correct answer':wrongSelected?'Your selected answer, incorrect':'';
                return `<label class="answer-option${stateClass}"><input type="radio" name="answer" value="${e(c.id)}" ${selected?'checked':''} ${answered?'disabled':''}><span class="answer-option__key">${String.fromCharCode(65+i)}</span><span>${e(c.text)}</span>${stateText?`<span class="sr-only">${stateText}</span>`:''}</label>`;
            }).join('')}</fieldset>`;
        }
        return `<label class="graph-control"><span>Your answer</span><input type="text" data-answer-input inputmode="text" autocomplete="off" value="${e(selectedResponse)}" ${answered?'disabled':''} placeholder="Enter an exact value when possible"><span class="muted answer-help">Press Enter to check your answer.</span></label>`;
    }

    function readResponse() {
        const q=view.question;
        if(q.type==='choice') return root.querySelector('input[name="answer"]:checked')?.value ?? '';
        return root.querySelector('[data-answer-input]')?.value ?? '';
    }

    function check() {
        const response=readResponse();
        if(!String(response).trim()) return;
        submittedResponse=response;
        feedback=engine.answer(response); draw();
        root.querySelector('[data-feedback]')?.focus({preventScroll:false});
    }

    function feedbackMarkup(result) {
        return `<div class="feedback ${result.correct?'feedback--correct':'feedback--incorrect'}" data-feedback role="status" aria-live="polite" tabindex="-1"><h3>${e(result.headline)}</h3><p>${e(result.explanation)}</p>${result.solutionSteps.length?`<ol>${result.solutionSteps.map(s=>`<li>${e(s)}</li>`).join('')}</ol>`:''}${result.review?`<p><strong>Review:</strong> ${e(result.review)}</p>`:''}</div>`;
    }

    function drawSummary(summary = engine.summary()) {
        root.innerHTML=`<div class="panel"><span class="eyebrow">Set complete</span><h3>${summary.percent}% correct</h3><p>${e(summary.recommendation)}</p><div class="practice-toolbar"><button class="button" data-more>More practice in ${e(lesson.id)}</button><button class="button button--secondary" data-mastery>Mastery check</button><button class="button button--secondary" data-reset>Choose mode</button></div></div>`;
        root.querySelector('[data-more]').addEventListener('click',()=>{feedback=null;hint=null;submittedResponse='';view=engine.morePractice({lesson,difficulty});draw();focusCurrentQuestion();});
        root.querySelector('[data-mastery]').addEventListener('click',()=>start('mastery'));
        root.querySelector('[data-reset]').addEventListener('click',()=>{feedback=null;hint=null;submittedResponse='';view=null;draw();});
    }

    function wireLaunch(){
        root.querySelector('[data-difficulty]').addEventListener('change',ev=>{difficulty=ev.target.value;progressTracker?.setPracticeDifficulty?.(difficulty);});
        root.querySelectorAll('[data-start]').forEach(btn=>btn.addEventListener('click',()=>start(btn.dataset.start)));
    }
    function focusCurrentQuestion(){
        root.querySelector('.question-card__prompt')?.focus?.({preventScroll:true});
    }
    draw();
    return ()=>{};
}
