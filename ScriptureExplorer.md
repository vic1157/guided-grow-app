# Scripture Explorer - Implementation Reference

## Overview
Scripture Explorer is a centralized hub for accessing Bible reading scrolls, AI chat conversations, and quiz functionality. Accessible via the middle "Create" button in the Footer navigation.

## Architecture

### Pages Structure
- `/scripture-explorer` - Main hub with navigation buttons and list view
- `/chat` - AI Assistant (Leo) chat interface
- `/new-quiz` - Quiz selection page
- `/scroll/:id` - Individual scroll detail with quiz taking ability

### Data Storage
- **Mock static data** - Hardcoded arrays defined at component level
- No localStorage persistence
- Ready for future backend integration

---

## TypeScript Interfaces

```typescript
interface Scroll {
  id: string;
  title: string;
  scriptureReference: string;
  duration: string;
  timestamp: string;
  hasQuiz: boolean;
  quizScore?: { correct: number; total: number };
  summary: string;
  questions: Question[];
  reflection: string;
  readingTime: string;
}

interface Question {
  id: string;
  type: 'understanding' | 'discussion';
  text: string;
  verseReference?: string;
}

interface Quiz {
  id: string;
  scrollId: string;
  title: string;
  questions: QuizQuestion[];
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  verseReference?: string;
}

interface Chat {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'leo';
  content: string;
  timestamp: string;
}
```

---

## Component Architecture

### Pages (src/pages/)

#### ScriptureExplorer.tsx
**Purpose:** Main navigation hub

**Features:**
- 4 action buttons: New Chat, New Quiz, All Scrolls, All Chats
- Toggleable list view (scrolls vs chats)
- Uses ScrollListItem and ChatListItem components

**State:**
- `activeView`: 'scrolls' | 'chats'

**Navigation:**
- New Chat → `/chat`
- New Quiz → `/new-quiz`
- Click scroll → `/scroll/:id`
- Click chat → `/chat?id={chatId}`

#### Chat.tsx
**Purpose:** AI Assistant conversation interface

**URL Parameters:**
- `/chat` - New chat (shows welcome message)
- `/chat?id={chatId}` - Load existing chat

**Features:**
- Message history display
- Text input with send button
- Auto-scroll to latest message
- Mock Leo responses

**State:**
- `messages`: ChatMessage[]
- `inputValue`: string
- `isLoading`: boolean

#### NewQuiz.tsx
**Purpose:** Select scroll for quiz generation

**Features:**
- List of available scrolls
- Click scroll → navigate to `/scroll/:id?startQuiz=true`

**State:**
- `selectedScroll`: string | null

#### ScrollDetail.tsx
**Purpose:** Display scroll details and handle quiz taking

**URL Parameters:**
- `/scroll/:id` - View scroll
- `/scroll/:id?startQuiz=true` - Auto-start quiz

**Modes:**
1. **Scroll View** - Display scroll information
2. **Quiz View** - Take quiz questions
3. **Results View** - Show quiz score and review

**State:**
- `scroll`: Scroll | null
- `showQuiz`: boolean
- `currentQuestionIndex`: number
- `userAnswers`: number[]
- `showResults`: boolean

---

### Components (src/components/)

#### ScrollListItem.tsx
**Props:** `{ scroll: Scroll, onClick: () => void }`

**Layout:**
- Icon circle (BookOpen)
- Title + scripture reference
- Duration + timestamp
- Quiz score or "Take Quiz >" CTA

#### ChatListItem.tsx
**Props:** `{ chat: Chat, onClick: () => void }`

**Layout:**
- Icon circle (MessageCircle)
- Chat title
- Last message preview
- Timestamp

#### ChatMessage.tsx
**Props:** `{ message: ChatMessage }`

**Layout:**
- Leo messages: Left-aligned with avatar
- User messages: Right-aligned, dark background

**Features:**
- Auto-scroll on new messages
- Timestamp display

#### QuizQuestion.tsx
**Props:** `{ question: QuizQuestion, selectedAnswer: number | null, onAnswerSelect: (index: number) => void, showCorrect?: boolean }`

**Layout:**
- Question text
- Verse reference (if applicable)
- RadioGroup with 4 options
- Visual feedback for correct/incorrect (in review mode)

---

## Mock Data Examples

### Scrolls
```typescript
const mockScrolls: Scroll[] = [
  {
    id: 'scroll-1',
    title: 'Jesus Rises, Sends Disciples',
    scriptureReference: 'Matthew 5:1 - Matthew 5:48',
    duration: '8 mins',
    timestamp: '2hr ago',
    hasQuiz: true,
    quizScore: { correct: 10, total: 15 },
    summary: 'Contains the beginning of Jesus\' Sermon on the Mount, starting with the Beatitudes that describe the blessed nature of the humble, merciful, and peacemakers.',
    questions: [
      {
        id: 'q1',
        type: 'understanding',
        text: 'What did Jesus mean when he said he came to "fulfill the law" rather than abolish it?',
        verseReference: 'Matthew 5:17'
      }
    ],
    reflection: 'After reading Matthew 5, I find myself struck by the radical nature of Jesus\' call to love enemies...',
    readingTime: '7:23'
  },
  {
    id: 'scroll-2',
    title: 'The Lord Is My Shepherd',
    scriptureReference: 'Psalm 23:1 - Psalm 23:6',
    duration: '6 mins',
    timestamp: '18hr ago',
    hasQuiz: true,
    quizScore: { correct: 5, total: 7 },
    summary: 'David\'s beloved psalm about God as shepherd, expressing complete trust in God\'s provision and protection.',
    questions: [],
    reflection: 'This psalm brings me such comfort in difficult times...',
    readingTime: '4:12'
  },
  {
    id: 'scroll-3',
    title: 'In the Beginning',
    scriptureReference: 'Genesis 1:1 - Genesis 1:31',
    duration: '20 mins',
    timestamp: '2 days ago',
    hasQuiz: false,
    summary: 'The account of God creating the heavens and earth in six days, culminating with humanity made in His image.',
    questions: [],
    reflection: '',
    readingTime: '18:45'
  }
];
```

### Quizzes
```typescript
const mockQuizzes: Quiz[] = [
  {
    id: 'quiz-1',
    scrollId: 'scroll-1',
    title: 'Matthew 5 Understanding Quiz',
    questions: [
      {
        id: 'qq1',
        question: 'In the Beatitudes, who did Jesus say would inherit the earth?',
        options: [
          'The poor in spirit',
          'The humble',
          'Those who mourn',
          'The peacemakers'
        ],
        correctAnswer: 1,
        explanation: 'Jesus said "God blesses those who are humble, for they will inherit the whole earth" (Matthew 5:5, NLT)',
        verseReference: 'Matthew 5:5'
      },
      {
        id: 'qq2',
        question: 'What metaphor did Jesus use to describe his followers?',
        options: [
          'Stars of the night',
          'Rivers of living water',
          'Salt of the earth and light of the world',
          'Trees planted by streams'
        ],
        correctAnswer: 2,
        explanation: 'Jesus called believers "the salt of the earth" and "the light of the world" to emphasize their influence and purpose.',
        verseReference: 'Matthew 5:13-14'
      },
      {
        id: 'qq3',
        question: 'According to Jesus, what should we do when someone strikes us on the right cheek?',
        options: [
          'Strike them back',
          'Turn the other cheek',
          'Call the authorities',
          'Run away'
        ],
        correctAnswer: 1,
        explanation: 'Jesus teaches radical non-retaliation: "turn to them the other cheek also" (Matthew 5:39)',
        verseReference: 'Matthew 5:39'
      }
    ]
  },
  {
    id: 'quiz-2',
    scrollId: 'scroll-2',
    title: 'Psalm 23 Comprehension Quiz',
    questions: [
      {
        id: 'qq4',
        question: 'What does the psalmist say about walking through the valley of the shadow of death?',
        options: [
          'I will be afraid',
          'I will fear no evil',
          'I will run away',
          'I will call for help'
        ],
        correctAnswer: 1,
        explanation: 'David expresses complete confidence: "I will fear no evil, for you are with me"',
        verseReference: 'Psalm 23:4'
      },
      {
        id: 'qq5',
        question: 'What does God prepare in the presence of enemies?',
        options: [
          'A battle plan',
          'A feast',
          'An escape route',
          'A shield'
        ],
        correctAnswer: 1,
        explanation: 'God prepares "a feast" (or table) even in the presence of enemies, showing His provision and protection.',
        verseReference: 'Psalm 23:5'
      }
    ]
  }
];
```

### Chats
```typescript
const mockChats: Chat[] = [
  {
    id: 'chat-1',
    title: 'Understanding the Beatitudes',
    messages: [
      {
        id: 'm1',
        sender: 'user',
        content: 'Can you explain what the Beatitudes mean and why they\'re important?',
        timestamp: '3hr ago'
      },
      {
        id: 'm2',
        sender: 'leo',
        content: 'The Beatitudes are Jesus\' teachings about the attitudes and characteristics of those in God\'s kingdom. They appear at the beginning of the Sermon on the Mount (Matthew 5:3-12) and describe nine blessings. Each one starts with "Blessed are..." and describes a spiritual quality followed by a promise. They\'re revolutionary because they turn worldly values upside down - blessing the poor, the mourning, the meek, etc. Would you like me to explain any specific Beatitude in more detail?',
        timestamp: '3hr ago'
      },
      {
        id: 'm3',
        sender: 'user',
        content: 'Yes, what does "poor in spirit" mean?',
        timestamp: '3hr ago'
      },
      {
        id: 'm4',
        sender: 'leo',
        content: 'Great question! "Poor in spirit" means recognizing our spiritual poverty and complete dependence on God. It\'s the opposite of spiritual pride or self-sufficiency. Those who are poor in spirit acknowledge they have nothing to offer God on their own merit - they need His grace, mercy, and salvation. It\'s about humility before God, recognizing that everything we have comes from Him. This is why Jesus says "theirs is the kingdom of heaven" - because they\'ve stopped trying to earn their way in and instead receive it as a gift.',
        timestamp: '3hr ago'
      }
    ],
    createdAt: '3hr ago',
    updatedAt: '3hr ago'
  },
  {
    id: 'chat-2',
    title: 'Questions about Genesis Creation',
    messages: [
      {
        id: 'm5',
        sender: 'user',
        content: 'How should I interpret the creation days in Genesis 1?',
        timestamp: '1d ago'
      },
      {
        id: 'm6',
        sender: 'leo',
        content: 'There are several faithful theological perspectives on the creation days. Some Christians interpret them as literal 24-hour days (Young Earth Creationism), while others see them as longer periods of time or literary frameworks to communicate theological truths rather than scientific chronology. The key theological points that all perspectives affirm are: 1) God created everything, 2) Creation was purposeful and good, 3) Humanity is uniquely made in God\'s image, and 4) God is sovereign over all creation. Different Christians land in different places on the scientific details while holding these core truths.',
        timestamp: '1d ago'
      }
    ],
    createdAt: '1d ago',
    updatedAt: '1d ago'
  }
];
```

---

## Navigation Flow

```
Footer "Create" Button
    ↓
/scripture-explorer (Main Hub)
    │
    ├──[New Chat]──────────→ /chat (new conversation with Leo)
    │
    ├──[New Quiz]──────────→ /new-quiz
    │                            ↓
    │                        Select Scroll
    │                            ↓
    │                        /scroll/:id?startQuiz=true
    │
    ├──[All Scrolls]───────→ Filter to scrolls list
    │       ↓
    │   Click Scroll Item
    │       ↓
    │   /scroll/:id (view scroll details)
    │       ↓
    │   [Take Quiz] button
    │       ↓
    │   Quiz interface (same page)
    │       ↓
    │   Quiz results
    │
    └──[All Chats]─────────→ Filter to chats list
            ↓
        Click Chat Item
            ↓
        /chat?id={chatId} (load existing conversation)
```

---

## UI Pattern Reference

### Layout Structure
```tsx
<div className="min-h-screen bg-background pb-20">
  <header className="sticky top-0 z-10 bg-card border-b-2 border-foreground/30">
    <div className="max-w-2xl mx-auto px-4 py-3">
      {/* Header content */}
    </div>
  </header>
  <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
    {/* Main content */}
  </main>
  <Footer />
</div>
```

### Button Patterns
```tsx
// Action Button (outlined)
<Button variant="outline" className="h-12 border-2 border-foreground/20">
  <Icon className="h-5 w-5 mr-2" />
  Button Text
</Button>

// Primary CTA
<Button className="w-full h-14 bg-foreground text-background hover:bg-foreground/90">
  Take Quiz
</Button>

// Back Button
<Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
  <ChevronLeft className="h-5 w-5" />
  Back
</Button>
```

### Card Pattern (List Items)
```tsx
<Card
  onClick={handleClick}
  className="p-4 flex items-center gap-3 hover:bg-accent transition-colors cursor-pointer"
>
  {/* Icon */}
  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
    <Icon className="h-6 w-6 text-muted-foreground" />
  </div>

  {/* Content */}
  <div className="flex-1 min-w-0">
    <h3 className="font-semibold text-foreground truncate">Title</h3>
    <p className="text-sm text-muted-foreground truncate">Subtitle</p>
    <p className="text-xs text-muted-foreground">Metadata</p>
  </div>

  {/* Arrow */}
  <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
</Card>
```

---

## Icons Reference (lucide-react)

**ScriptureExplorer:**
- `MessageCirclePlus` - New Chat button
- `ClipboardList` - New Quiz button
- `ScrollText` or `BookOpen` - Scroll icon
- `MessageCircle` - Chat icon
- `ChevronRight` - List item arrow

**Chat:**
- `ChevronLeft` - Back button
- `Send` - Send message button

**ScrollDetail:**
- `ChevronLeft` - Back button
- `Clock` - Duration/time
- `CheckCircle2` - Correct answer
- `XCircle` - Incorrect answer
- `Award` - Quiz results/score

---

## Color Tokens

**Semantic Colors:**
- `foreground` - Primary text and icons
- `background` - Page background
- `card` - Card backgrounds
- `muted` - Subtle backgrounds (icon circles, disabled states)
- `muted-foreground` - Secondary text
- `accent` - Hover states, subtle highlights
- `border` - Border colors

**Usage Examples:**
- Primary action: `bg-foreground text-background`
- Secondary action: `bg-accent text-foreground`
- Card: `bg-card border-border`
- Icon circle: `bg-muted`
- Secondary text: `text-muted-foreground`

---

## Future Enhancements

**Scroll Features:**
- Real-time quiz generation from scroll content
- Share scrolls with friends
- Export as PDF
- Audio playback

**Chat Features:**
- Save chat history to backend
- Voice input/output
- Context-aware responses based on recent scrolls
- Chat templates (study guides, devotionals)

**Quiz Features:**
- Difficulty levels (easy, medium, hard)
- Timed quizzes
- Leaderboards
- Daily challenges
- Quiz streaks

**General:**
- Search functionality
- Sort/filter options
- Offline support
- Push notifications
- Backend integration
- User authentication sync

---

## Files Changed

**New Files (8):**
1. `src/pages/ScriptureExplorer.tsx`
2. `src/pages/Chat.tsx`
3. `src/pages/NewQuiz.tsx`
4. `src/pages/ScrollDetail.tsx`
5. `src/components/ScrollListItem.tsx`
6. `src/components/ChatListItem.tsx`
7. `src/components/ChatMessage.tsx`
8. `src/components/QuizQuestion.tsx`

**Modified Files (2):**
1. `src/App.tsx` - Added 4 new routes
2. `src/components/Footer.tsx` - Updated Create button path

---

## Testing Checklist

- [ ] Create button in Footer navigates to Scripture Explorer
- [ ] All 4 action buttons work correctly
- [ ] Filter toggles between scrolls and chats view
- [ ] Scroll list items display correct information
- [ ] Chat list items display correct information
- [ ] Clicking scroll navigates to scroll detail
- [ ] Clicking chat navigates to chat with correct ID
- [ ] New Chat button creates new conversation
- [ ] New Quiz button navigates to quiz selection
- [ ] Chat interface displays messages correctly
- [ ] Chat input sends new messages
- [ ] Quiz selection shows available scrolls
- [ ] Clicking scroll in quiz selection starts quiz
- [ ] Scroll detail displays all scroll information
- [ ] Quiz questions display correctly
- [ ] Quiz navigation (prev/next) works
- [ ] Quiz submission calculates correct score
- [ ] Quiz results show correct/incorrect answers
- [ ] Back navigation works from all pages
- [ ] Mobile responsive layout works
- [ ] All icons display correctly
- [ ] Color scheme matches RYB design
