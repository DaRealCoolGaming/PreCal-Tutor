export function authoredLesson(config) {
    const generators = config.generators || {};
    const allGenerators = [...new Set(Object.values(generators).flat())];
    return Object.freeze({
        ...config,
        restored: true,
        objectives: Object.freeze([...config.objectives]),
        prerequisites: Object.freeze([...config.prerequisites]),
        sections: Object.freeze(config.sections.map(item => Object.freeze({ ...item, paragraphs: Object.freeze([...(item.paragraphs || [])]), bullets: Object.freeze([...(item.bullets || [])]) }))),
        workedExamples: Object.freeze(config.workedExamples.map(item => Object.freeze({ ...item, steps: Object.freeze([...(item.steps || [])]) }))),
        commonMistakes: Object.freeze(config.commonMistakes.map(item => Object.freeze({ ...item }))),
        guidedPractice: Object.freeze(config.guidedPractice || allGenerators.slice(0, Math.min(3, allGenerators.length))),
        independentPractice: Object.freeze(config.independentPractice || allGenerators),
        mastery: Object.freeze(config.mastery || allGenerators),
        keyIdeas: Object.freeze([...(config.keyIdeas || [])]),
        formulas: Object.freeze([...(config.formulas || [])]),
        generators: Object.freeze(Object.fromEntries(Object.entries(generators).map(([key, value]) => [key, Object.freeze([...value])]))),
        alternateExplanation: String(config.alternateExplanation || ''),
        application: String(config.application || ''),
        teacherTip: String(config.teacherTip || ''),
        estimatedMinutes: Number(config.estimatedMinutes || 45),
        teks: Object.freeze([...(config.teks || [])])
    });
}

export function authoredUnit(number, title, pacing, teks, lessons) {
    return Object.freeze({ number, title, pacing, teks: Object.freeze([...teks]), restored: true, lessons: Object.freeze(lessons) });
}
