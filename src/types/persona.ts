// Persona type definitions and constants for RYB spiritual assessment

export type PersonaType = 'shepherd' | 'seeker' | 'vessel' | 'builder' | 'rooted';

export interface PersonaScore {
  persona: PersonaType;
  score: number;
  percentage: number;
}

export interface PersonaDetails {
  id: PersonaType;
  name: string;
  tagline: string;
  emoji: string;
  color: string;
  description: string;
  strengths: string[];
  biblicalAnchor: {
    verse: string;
    reference: string;
  };
}

export interface SurveyAnswers {
  question1: string;
  question2: string;
  question3: string;
  question4: string;
  question5: string;
  question6: string;
  question7: string;
  question8: string;
  question9: string;
  question10: string;
}

export interface PersonaWheelData {
  scores: PersonaScore[];
  topPersonas: PersonaType[];
  primaryPersona: PersonaType;
}

// Persona colors matching the design
export const PERSONA_COLORS: Record<PersonaType, string> = {
  shepherd: '#EF4444',  // Red
  seeker: '#3B82F6',    // Blue
  vessel: '#EAB308',    // Yellow
  builder: '#8B5CF6',   // Purple
  rooted: '#92400E',    // Brown
};

// Complete persona details for display
export const PERSONA_DETAILS: Record<PersonaType, PersonaDetails> = {
  shepherd: {
    id: 'shepherd',
    name: 'The Shepherd',
    tagline: 'The Disciplined Guide',
    emoji: '🐑',
    color: '#EF4444',
    description: 'You value structure, consistency, and leading by example. You thrive when you have clear routines and spiritual disciplines to follow. Your faith grows through intentional habits and steady commitment.',
    strengths: [
      'Naturally structured and organized in spiritual disciplines',
      'Dependable and consistent in your faith journey',
      'Skilled at practical application of Scripture',
    ],
    biblicalAnchor: {
      verse: 'Commit to the Lord whatever you do, and he will establish your plans.',
      reference: 'Proverbs 16:3',
    },
  },
  seeker: {
    id: 'seeker',
    name: 'The Seeker',
    tagline: 'The Curious Explorer',
    emoji: '🔍',
    color: '#3B82F6',
    description: 'You have a deep hunger for understanding and truth. You love diving into Scripture to uncover its depths and meaning. Questions excite you, and discovery fuels your spiritual growth.',
    strengths: [
      'Intellectually curious with a hunger for truth',
      'Committed to seeking deeper understanding',
      'A thoughtful, reflective approach to faith',
    ],
    biblicalAnchor: {
      verse: 'Ask and it will be given to you; seek and you will find; knock and the door will be opened to you.',
      reference: 'Matthew 7:7',
    },
  },
  vessel: {
    id: 'vessel',
    name: 'The Vessel',
    tagline: 'The Devoted Servant',
    emoji: '🏺',
    color: '#EAB308',
    description: 'You connect with God through emotional encounters and worship. Your faith is deeply personal and experiential. You feel things deeply and express your spirituality through heartfelt devotion.',
    strengths: [
      'Emotionally connected and authentic in worship',
      'A worshipful spirit that draws others in',
      'Open-hearted and vulnerable before God',
    ],
    biblicalAnchor: {
      verse: 'Create in me a pure heart, O God, and renew a steadfast spirit within me.',
      reference: 'Psalm 51:10',
    },
  },
  builder: {
    id: 'builder',
    name: 'The Builder',
    tagline: 'The Strategic Steward',
    emoji: '🏗️',
    color: '#8B5CF6',
    description: 'You are purpose-driven and passionate about living out your calling. You want your faith to make an impact. Action, service, and kingdom-building energize your spiritual walk.',
    strengths: [
      'Action-oriented with a bias toward doing',
      'Community-focused and relationally driven',
      'Purpose-driven with a clear sense of calling',
    ],
    biblicalAnchor: {
      verse: 'For we are God\'s handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do.',
      reference: 'Ephesians 2:10',
    },
  },
  rooted: {
    id: 'rooted',
    name: 'The Rooted',
    tagline: 'The Grounded Believer',
    emoji: '🌳',
    color: '#92400E',
    description: 'You have a mature, established faith and crave deeper growth. Surface-level content doesn\'t satisfy you. You want theological depth, prophetic insight, and challenging material.',
    strengths: [
      'Spiritually grounded with a firm foundation',
      'Mature faith that has weathered seasons',
      'Steady and consistent in all circumstances',
    ],
    biblicalAnchor: {
      verse: 'Blessed is the one who trusts in the Lord... They will be like a tree planted by the water that sends out its roots by the stream.',
      reference: 'Jeremiah 17:7-8',
    },
  },
};
