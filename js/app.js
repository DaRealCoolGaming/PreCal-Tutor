import { createRouter } from './router.js';
import { createStore } from './storage.js';
import { createProgressTracker, statusLabel } from './progress.js';
import { getCourse, getLessonMeta, getUnitMeta, isUnitRestored, loadLesson, loadUnit } from './curriculum.js';
import { renderAuthoredLesson, mountLessonUI } from './lesson-ui.js';

const store = createStore();
const progress = createProgressTracker(store);
const router = createRouter();
const course = getCourse();

function authoredCourseUnits() {
    return course.units.filter(unit => isUnitRestored(unit.number));
}

const appView = document.querySelector('#app-view');
const mainContent = document.querySelector('#main-content');
const routeTitle = document.querySelector('#route-title');
const routeEyebrow = document.querySelector('#route-eyebrow');
const headerProgress = document.querySelector('#header-progress');
const outline = document.querySelector('#desktop-outline');
const navigationLinks = [...document.querySelectorAll('[data-route-name]')];
let activeViewCleanup = null;
let lessonToMount = null;

function escapeHtml(value) {
    return String(value ?? '')
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

function updateNavigationState(route) {
    const activeName = route.name === 'lesson' || route.name === 'unit' ? 'course' : route.name;
    navigationLinks.forEach(link => {
        if (link.dataset.routeName === activeName) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
    });
}

function updateHeader(route) {
    if (route.name === 'lesson') {
        const lesson = getLessonMeta(route.params.id);
        routeEyebrow.textContent = lesson ? `Lesson ${lesson.id}` : 'Lesson';
        routeTitle.textContent = lesson?.title || 'Lesson not found';
    } else if (route.name === 'unit') {
        const unit = getUnitMeta(route.params.number);
        routeEyebrow.textContent = unit ? `Unit ${unit.number}` : 'Unit';
        routeTitle.textContent = unit?.title || 'Unit not found';
    } else {
        const copy = {
            home: ['Course', 'Home'],
            course: ['Course', 'Lessons'],
            practice: ['Study', 'Practice'],
            progress: ['Study', 'Progress'],
            'not-found': ['Course', 'Page not found']
        }[route.name] || ['Course', 'Precalculus'];
        [routeEyebrow.textContent, routeTitle.textContent] = copy;
    }
    document.title = `${routeTitle.textContent} · Precalculus Classroom`;
}

function renderOutline(route) {
    outline.innerHTML = `<nav class="outline-nav" aria-label="Units">${course.units.map(unit => {
        const activeUnit = route.name === 'unit' ? route.params.number : route.name === 'lesson' ? Number(route.params.id.split('.')[0]) : null;
        const active = activeUnit === unit.number;
        const stats = progress.getUnitStats(unit);
        return `<a class="outline-nav__link" href="#/unit/${unit.number}" data-route ${active ? 'aria-current="page"' : ''}>
            <span>${escapeHtml(unit.title)}</span>
            <span class="outline-nav__unit">${stats.mastered}/${unit.lessons.length}</span>
        </a>`;
    }).join('')}</nav>`;
}

function renderHeaderProgress() {
    const stats = progress.getCourseStats(authoredCourseUnits());
    headerProgress.textContent = `${stats.masteryPercent}%`;
    headerProgress.setAttribute('aria-label', `${stats.masteryPercent}% of course lessons mastered`);
}

function homeView() {
    const state = store.getState();
    const stats = progress.getCourseStats(authoredCourseUnits());
    const lastLesson = getLessonMeta(state.navigation.lastLessonId) || course.units[0].lessons[0];
    const mistakes = progress.getMistakes({ limit: 3 });
    return `<section class="view-header" aria-labelledby="home-heading">
        <span class="eyebrow">Your course</span>
        <h1 id="home-heading">Heya, hope the school year goes well for y'all</h1>
        <p class="view-header__lede">A full year of Precalculus is organized into 100 focused lessons. Learn the idea, see worked examples, practice it, and use feedback to decide what to review next.</p>
        <div class="view-actions">
            <a class="button" href="#/lesson/${lastLesson.id}" data-route>Continue ${lastLesson.id}</a>
            <a class="button button--secondary" href="#/course" data-route>Browse lessons</a>
        </div>
    </section>
    <div class="stack">
        <section class="panel"><div class="panel__header"><div><span class="eyebrow">Progress</span><h2>Course snapshot</h2></div><strong>${stats.masteryPercent}% mastered</strong></div>
            <div class="progress-meter" aria-hidden="true"><div class="progress-meter__fill" style="width:${stats.masteryPercent}%"></div></div>
            <div class="stat-line"><span class="stat-line__label">Lessons started</span><span class="stat-line__value">${stats.started}/${stats.totalLessons}</span></div>
            <div class="stat-line"><span class="stat-line__label">Practice accuracy</span><span class="stat-line__value">${stats.accuracyPercent ?? '—'}${stats.accuracyPercent == null ? '' : '%'}</span></div>
        </section>
        <section class="panel panel--soft"><span class="eyebrow">Built for studying</span><h2>Explanations when you need them, practice when you are ready</h2><p class="muted">Each lesson includes prerequisites, teaching notes, worked examples, common mistakes, an alternate explanation, targeted practice, and interactive visuals where they help the concept.</p></section>
        ${mistakes.length ? `<section class="panel"><span class="eyebrow">Review</span><h2>Recent weak spots</h2>${mistakes.map(item => `<p><a href="#/lesson/${escapeHtml(item.lessonId)}" data-route>Lesson ${escapeHtml(item.lessonId)}</a> · ${item.misses} miss${item.misses === 1 ? '' : 'es'}</p>`).join('')}</section>` : ''}
    </div>`;
}

function courseView() {
    return `<section class="view-header"><span class="eyebrow">Course outline</span><h1>Precalculus, one lesson at a time.</h1><p class="view-header__lede">The course is organized into 100 lessons across nine units. Open a unit to see the lesson sequence and your mastery progress.</p></section>
    <div class="stack">${course.units.map(unit => {
        const stats = progress.getUnitStats(unit);
        return `<section class="panel"><div class="panel__header"><div><span class="eyebrow">Unit ${unit.number}</span><h2>${escapeHtml(unit.title)}</h2></div><strong>${stats.masteryPercent}%</strong></div><p class="muted">${unit.lessons.length} lessons</p><a class="button button--secondary" href="#/unit/${unit.number}" data-route>Open unit</a></section>`;
    }).join('')}</div>`;
}

async function unitView(unitNumber) {
    const unit = await loadUnit(unitNumber);
    const stats = progress.getUnitStats(unit);
    return `<section class="view-header"><span class="eyebrow">Unit ${unit.number}</span><h1>${escapeHtml(unit.title)}</h1><p class="view-header__lede">Work through the lessons in order, or jump directly to the skill you want to review.</p></section>
    <section class="panel"><div class="panel__header"><h2>Lessons</h2><strong>${stats.mastered}/${unit.lessons.length} mastered</strong></div>
        <div class="stack">${unit.lessons.map(lesson => {
            const lessonProgress = progress.getLessonProgress(lesson.id);
            return `<a class="outline-nav__link" href="#/lesson/${lesson.id}" data-route><span><strong>${lesson.id}</strong> · ${escapeHtml(lesson.title)}</span><span class="mastery-label">${escapeHtml(statusLabel(lessonProgress.status))}</span></a>`;
        }).join('')}</div>
    </section>`;
}

function adjacentLessons(lessonId) {
    const lessons = course.units.flatMap(unit => unit.lessons);
    const index = lessons.findIndex(lesson => lesson.id === lessonId);
    if (index < 0) return { previous: null, next: null };
    return {
        previous: index > 0 ? lessons[index - 1] : null,
        next: index < lessons.length - 1 ? lessons[index + 1] : null
    };
}

async function lessonView(lessonId) {
    const lesson = await loadLesson(lessonId);
    if (!lesson) return notFoundView();
    progress.visitLesson(lessonId);
    const lessonProgress = progress.getLessonProgress(lessonId);
    if (!lesson.restored) {
        return `<article class="lesson-shell" aria-labelledby="lesson-heading"><header class="lesson-heading"><div class="lesson-heading__meta"><span class="lesson-number">Lesson ${lesson.id}</span></div><h1 id="lesson-heading">${escapeHtml(lesson.title)}</h1><p class="lesson-heading__summary">This lesson could not be loaded right now.</p></header>
            <section class="lesson-section panel"><h2>Try opening the lesson again</h2><p>Your saved progress is still on this device. Return to the unit and reopen this lesson.</p></section>
            <nav class="lesson-nav"><a class="button button--secondary" href="#/unit/${lesson.id.split('.')[0]}" data-route>Back to unit</a></nav></article>`;
    }
    lessonToMount = lesson;
    return renderAuthoredLesson(lesson, lessonProgress, adjacentLessons(lesson.id));
}

function practiceView() {
    const mistakes = progress.getMistakes({ limit: 12 });
    const due = progress.getReviewCandidates(course.units, { limit: 6 });
    return `<section class="view-header"><span class="eyebrow">Practice</span><h1>Practice stays tied to what you are learning.</h1><p class="view-header__lede">Use the mistake notebook to revisit weak spots, refresh older material when it is due, or open any unit for fresh guided, independent, or mastery practice.</p></section>
    <div class="stack">
        ${due.length ? `<section class="panel panel--soft"><span class="eyebrow">Spaced review</span><h2>Worth refreshing today</h2><div class="practice-unit-list">${due.map(item => { const lesson = getLessonMeta(item.lessonId); return `<a class="outline-nav__link" href="#/lesson/${escapeHtml(item.lessonId)}" data-route><span><strong>${escapeHtml(item.lessonId)}</strong> · ${escapeHtml(lesson?.title || 'Lesson')}</span><span class="outline-nav__unit">${escapeHtml(item.reason)}</span></a>`; }).join('')}</div></section>` : ''}
        <section class="panel"><span class="eyebrow">Mistake notebook</span><h2>${mistakes.length ? 'Concepts worth revisiting' : 'Nothing logged yet'}</h2>${mistakes.length ? mistakes.map(item => `<p><a href="#/lesson/${escapeHtml(item.lessonId)}" data-route>Lesson ${escapeHtml(item.lessonId)}</a> · ${item.misses} miss${item.misses === 1 ? '' : 'es'}</p>`).join('') : '<p class="muted">When you miss a concept in lesson practice, it will appear here so you know what is worth revisiting.</p>'}</section>
        <section class="panel"><span class="eyebrow">Choose a topic</span><h2>Practice by unit</h2><div class="practice-unit-list">${course.units.map(unit => `<a class="outline-nav__link" href="#/unit/${unit.number}" data-route><span><strong>Unit ${unit.number}</strong> · ${escapeHtml(unit.title)}</span><span class="outline-nav__unit">${unit.lessons.length} lessons</span></a>`).join('')}</div></section>
    </div>`;
}

function progressView() {
    const stats = progress.getCourseStats(authoredCourseUnits());
    return `<section class="view-header"><span class="eyebrow">Progress</span><h1>Your work should tell you what to do next.</h1><p class="view-header__lede">Mastery is based on practice performance, not simply opening a lesson. Use the unit breakdown to spot areas that need another pass.</p></section>
    <div class="stack">
        <section class="panel"><div class="stat-line"><span class="stat-line__label">Lessons started</span><span class="stat-line__value">${stats.started}/${stats.totalLessons}</span></div><div class="stat-line"><span class="stat-line__label">Lessons mastered</span><span class="stat-line__value">${stats.mastered}</span></div><div class="stat-line"><span class="stat-line__label">Total attempts</span><span class="stat-line__value">${stats.attempts}</span></div><div class="stat-line"><span class="stat-line__label">Accuracy</span><span class="stat-line__value">${stats.accuracyPercent ?? '—'}${stats.accuracyPercent == null ? '' : '%'}</span></div></section>
        <section class="panel"><span class="eyebrow">By unit</span><h2>Mastery breakdown</h2><div class="progress-unit-list">${course.units.map(unit => { const unitStats = progress.getUnitStats(unit); return `<a class="progress-unit" href="#/unit/${unit.number}" data-route><span><strong>Unit ${unit.number}</strong><small>${escapeHtml(unit.title)}</small></span><span><strong>${unitStats.masteryPercent}%</strong><small>${unitStats.mastered}/${unit.lessons.length} mastered</small></span></a>`; }).join('')}</div></section>
    </div>`;
}

function notFoundView() {
    return `<section class="view-header"><span class="eyebrow">Not found</span><h1>That page is not part of this course.</h1><p><a class="button" href="#/course" data-route>Return to lessons</a></p></section>`;
}

async function render(route) {
    activeViewCleanup?.();
    activeViewCleanup = null;
    lessonToMount = null;
    updateNavigationState(route);
    updateHeader(route);
    renderOutline(route);
    renderHeaderProgress();
    progress.recordRoute(`#${route.path}`);
    appView.setAttribute('aria-busy', 'true');
    try {
        if (route.name === 'home') appView.innerHTML = homeView();
        else if (route.name === 'course') appView.innerHTML = courseView();
        else if (route.name === 'unit') appView.innerHTML = getUnitMeta(route.params.number) ? await unitView(route.params.number) : notFoundView();
        else if (route.name === 'lesson') appView.innerHTML = await lessonView(route.params.id);
        else if (route.name === 'practice') appView.innerHTML = practiceView();
        else if (route.name === 'progress') appView.innerHTML = progressView();
        else appView.innerHTML = notFoundView();
    } catch (error) {
        console.error(error);
        appView.innerHTML = `<section class="panel"><h1>Something did not load correctly.</h1><p class="muted">Your saved progress is safe. Try returning to the course outline and opening the lesson again.</p><p><a class="button button--secondary" href="#/course" data-route>Return to lessons</a></p></section>`;
    } finally {
        appView.removeAttribute('aria-busy');
        if (lessonToMount?.restored) activeViewCleanup = mountLessonUI(appView, lessonToMount, progress);
        mainContent?.focus({ preventScroll: true });
    }
}

store.subscribe(() => renderHeaderProgress());
router.subscribe(route => { void render(route); });
router.start();
