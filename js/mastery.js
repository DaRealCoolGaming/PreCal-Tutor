export const SESSION_LENGTHS = Object.freeze({
    guided: 4,
    independent: 8,
    mastery: 6,
    review: 10
});

export function recommendedQuestionCount(mode = 'independent', requested) {
    if (Number.isInteger(requested) && requested > 0) return Math.min(requested, 30);
    return SESSION_LENGTHS[mode] || SESSION_LENGTHS.independent;
}

export function summarizeResults(results = []) {
    const answered = results.filter(result => result && typeof result.correct === 'boolean');
    const correct = answered.filter(result => result.correct).length;
    const percent = answered.length ? Math.round(correct / answered.length * 100) : 0;
    let level = 'keep-practicing';
    if (answered.length >= 4 && percent >= 85) level = 'mastery-ready';
    else if (answered.length >= 4 && percent >= 70) level = 'almost-there';
    return { answered: answered.length, correct, percent, level };
}

export function masteryRecommendation(summary) {
    if (summary.level === 'mastery-ready') return 'You are ready for the mastery check or the next lesson.';
    if (summary.level === 'almost-there') return 'One more focused practice set should make this feel steadier.';
    return 'Review the missed concepts, use the hints, then try a fresh set from this lesson.';
}
