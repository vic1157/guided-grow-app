// Persona scoring utility for RYB spiritual assessment
// Scoring algorithm based on RYB Persona Algorithm documentation

import { PersonaType, PersonaScore, PersonaWheelData, SurveyAnswers } from '@/types/persona';

// Complete scoring matrix mapping each answer to persona point allocations
// Keys are question IDs, values map answer text to persona points
const SCORING_MATRIX: Record<string, Record<string, Partial<Record<PersonaType, number>>>> = {
  question1: {
    // "What best describes your relationship with the Bible?"
    "I read regularly and feel spiritually nourished.": { rooted: 3, shepherd: 2 },
    "I try to read but struggle to stay on track.": { shepherd: 3, vessel: 2 },
    "I connect more through worship or prayer than reading Scripture.": { vessel: 4 },
    "I find Scripture hard to understand or apply.": { seeker: 3, shepherd: 1 },
    "I'm ready for deeper, more challenging study.": { rooted: 3, seeker: 2 },
  },
  question2: {
    // "Which type of spiritual content draws you in the most?"
    "Emotionally healing messages that touch the heart.": { vessel: 4 },
    "In-depth biblical teaching and analysis.": { rooted: 3, seeker: 2 },
    "Clear, practical lessons I can apply today.": { shepherd: 3, builder: 2 },
    "Purpose-driven content about mission and calling.": { builder: 4 },
    "Insightful reflections that stretch how I think.": { seeker: 3, rooted: 2 },
  },
  question3: {
    // "What's your biggest challenge with Bible study?"
    "Staying consistent or building a regular habit.": { shepherd: 4 },
    "Understanding what I read and how it applies.": { seeker: 3, builder: 1 },
    "Feeling emotionally engaged or connected with it.": { vessel: 4 },
    "Finding content that challenges me beyond basics.": { rooted: 4 },
    "Needing shorter, more digestible sessions.": { shepherd: 2, vessel: 1 },
  },
  question4: {
    // "Which statement feels most true right now?"
    "I need to rebuild or strengthen my relationship with God.": { shepherd: 2, vessel: 2 },
    "I want to hear God's voice more clearly in my life.": { vessel: 3, seeker: 1 },
    "I feel spiritually dry and seek fresh connection.": { vessel: 3, seeker: 1 },
    "I'm doing okay but desire deeper growth.": { rooted: 3, seeker: 1 },
    "I want more clarity about my purpose and calling.": { builder: 4 },
  },
  question5: {
    // "How do you best grow in your walk with God?"
    "Through worship, music, or relational connection.": { vessel: 4 },
    "Through deep study, learning, and discovery.": { seeker: 3, rooted: 2 },
    "Through action, service, and living out faith.": { builder: 4 },
    "Through structure, discipline, and spiritual habits.": { shepherd: 4 },
    "Through quiet reflection, journaling, and prayer.": { vessel: 2, rooted: 2 },
  },
  question6: {
    // "What do you crave most right now in your spiritual life?"
    "Consistency and a stable rhythm with God.": { shepherd: 4 },
    "Clear understanding of who I am and what I'm called to do.": { builder: 3, seeker: 1 },
    "Emotional healing, freedom, and renewal.": { vessel: 4 },
    "A richer understanding of Scripture and its meaning.": { seeker: 3, rooted: 2 },
    "A stronger sense of God's presence and proximity.": { vessel: 3, rooted: 1 },
  },
  question7: {
    // "What frustrates you most about Christian content?"
    "It's too shallow or generic—less meaningful impact.": { rooted: 3, seeker: 2 },
    "It lacks authenticity—emotion, real struggle, transparency.": { vessel: 4 },
    "It doesn't feel relevant to my real everyday life.": { builder: 3, shepherd: 1 },
    "It's overwhelming, heavy, or hard to stick with.": { shepherd: 3, vessel: 1 },
    "It doesn't push me to grow spiritually or think differently.": { rooted: 3, seeker: 1 },
  },
  question8: {
    // "When do you usually connect with God the most?"
    "In early mornings, during quiet time or prayer.": { shepherd: 3, rooted: 1 },
    "During worship, music, or emotional encounters.": { vessel: 4 },
    "While reading, studying, or learning the Word.": { seeker: 3, rooted: 1 },
    "While serving or doing something for others.": { builder: 4 },
    "In quiet reflection, journaling, or processing life with God.": { vessel: 2, rooted: 2 },
  },
  question9: {
    // "What motivates you to grow spiritually?"
    "A hunger to know God's heart and character more deeply.": { seeker: 3, rooted: 2 },
    "A desire for emotional wholeness and healing.": { vessel: 4 },
    "A call to live out faith boldly and impactfully.": { builder: 4 },
    "A need for discipline and spiritual maturity.": { shepherd: 3, rooted: 2 },
    "Curiosity about truth and spiritual insight.": { seeker: 4 },
  },
  question10: {
    // "What do you wish spiritual content did better?"
    "Helped me establish and keep strong spiritual habits.": { shepherd: 4 },
    "Made me feel seen, supported, and emotionally connected.": { vessel: 4 },
    "Gave deeper insight into prophetic or biblical truth.": { rooted: 4 },
    "Showed practical ways to live out my purpose.": { builder: 4 },
    "Helped me grasp Scripture more clearly and confidently.": { seeker: 4 },
  },
};

/**
 * Calculate persona scores from survey answers
 * @param answers - The user's survey responses
 * @returns PersonaWheelData with scores, top personas, and primary persona
 */
export function calculatePersonaScores(answers: SurveyAnswers): PersonaWheelData {
  // Initialize scores for all personas
  const scores: Record<PersonaType, number> = {
    shepherd: 0,
    seeker: 0,
    vessel: 0,
    builder: 0,
    rooted: 0,
  };

  // Sum points from each answer
  Object.entries(answers).forEach(([questionId, answerText]) => {
    const questionScoring = SCORING_MATRIX[questionId];
    if (questionScoring && questionScoring[answerText]) {
      const pointAllocations = questionScoring[answerText];
      Object.entries(pointAllocations).forEach(([persona, points]) => {
        scores[persona as PersonaType] += points as number;
      });
    }
  });

  // Calculate total points for percentage calculation
  const totalPoints = Object.values(scores).reduce((a, b) => a + b, 0);

  // Convert to PersonaScore array with percentages
  const scoreArray: PersonaScore[] = Object.entries(scores).map(([persona, score]) => ({
    persona: persona as PersonaType,
    score,
    percentage: totalPoints > 0 ? Math.round((score / totalPoints) * 100) : 0,
  }));

  // Sort by score descending
  scoreArray.sort((a, b) => b.score - a.score);

  // Determine top personas (handle ties)
  const topPersonas = determineTopPersonas(scoreArray);

  return {
    scores: scoreArray,
    topPersonas,
    primaryPersona: scoreArray[0].persona,
  };
}

/**
 * Determine top personas accounting for ties
 * @param scores - Sorted array of persona scores
 * @returns Array of top 1-2 persona types (or more if ties exist)
 */
function determineTopPersonas(scores: PersonaScore[]): PersonaType[] {
  if (scores.length === 0) return [];

  const topScore = scores[0].score;

  // If top score is 0, return the first persona as default
  if (topScore === 0) return [scores[0].persona];

  // Find all personas within threshold of top score (within 2 points or 95%)
  const threshold = Math.max(topScore - 2, topScore * 0.95);
  const topTiers = scores.filter(s => s.score >= threshold);

  // Return top 2 personas (or all if there are ties in top 2)
  if (topTiers.length <= 2) {
    return topTiers.map(s => s.persona);
  }

  // If more than 2 personas are tied, still return all tied personas
  const secondScore = scores[1].score;
  const allTies = scores.filter(s => s.score === topScore || s.score === secondScore);

  return allTies.map(s => s.persona);
}

/**
 * Get a display-friendly list of top personas for messaging
 * @param topPersonas - Array of top persona types
 * @param personaDetails - Record of persona details for names
 * @returns Formatted string like "The Builder" or "The Builder and The Seeker"
 */
export function formatTopPersonas(
  topPersonas: PersonaType[],
  personaDetails: Record<PersonaType, { name: string }>
): string {
  if (topPersonas.length === 0) return '';
  if (topPersonas.length === 1) return personaDetails[topPersonas[0]].name;
  if (topPersonas.length === 2) {
    return `${personaDetails[topPersonas[0]].name} and ${personaDetails[topPersonas[1]].name}`;
  }
  // More than 2 personas tied
  const names = topPersonas.map(p => personaDetails[p].name);
  const last = names.pop();
  return `${names.join(', ')}, and ${last}`;
}
