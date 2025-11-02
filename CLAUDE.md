# RYB (Read Your Bible) - Project Overview

## Project Description

RYB is a Bible reading application designed to help users develop consistent Bible reading habits through personalized guidance, interactive features, and community engagement. The app uses spiritual assessments to understand users' reading preferences and provides tailored recommendations through a persona-based system.

## Tech Stack

- **Framework**: React with TypeScript
- **Routing**: React Router
- **UI Components**: Shadcn UI (built on Radix UI)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion (for gestures and transitions)
- **State Management**: React hooks (useState, useEffect)
- **Data Persistence**: localStorage
- **Build Tool**: Vite

## Current Features

### 1. Onboarding & User Assessment

#### Survey System (`/survey`)
- 10-question spiritual assessment to determine user's Biblical persona
- Required answers before progressing to next question
- Questions cover:
  - Current relationship with the Bible
  - Preferred reading times
  - Spiritual content preferences
  - Reading challenges
  - Community engagement preferences
  - Motivations and spiritual goals

#### Survey Results (`/survey-results`)
- Displays user's assigned Biblical persona (currently mocked as "The Shepherd")
- Shows personalized strengths and recommendations
- Includes Biblical anchor verse
- 5 persona types defined:
  - The Shepherd (Disciplined Guide)
  - The Seeker (Curious Explorer)
  - The Vessel (Devoted Servant)
  - The Builder (Community Connector)
  - The Rooted (Grounded Believer)
- Note: Persona calculation logic not yet implemented

#### Profile Onboarding (`/profile?onboarding=true`)
- 2-step onboarding modal:
  1. Upload profile photo
  2. Add personal testimony
- Marks completion in localStorage
- Triggers onboarding progress update

#### Reading Goals Onboarding (`/reading-goals?onboarding=true`)
- 2-step onboarding modal:
  1. Set reading frequency (Daily, 5x/week, 3x/week, Weekly)
  2. Enable notifications with time picker
- Saves preferences to localStorage
- Navigates to home after completion

### 2. Bible Reading Engine (`/read`)

Interactive Bible reader with:
- **Translation Switcher**: NLT, NIV, ESV, KJV, MSG (dropdown selector)
- **Font Size Control**: Small, Medium, Large (dropdown selector with Type icon)
- **Chapter Navigation**: Dropdown selector
- **Sample Content**: 5 complete chapters with scrollable content:
  - Matthew 5: The Sermon on the Mount (24 verses)
  - John 3: Jesus and Nicodemus (21 verses)
  - Psalm 23: The LORD is My Shepherd (6 verses)
  - Genesis 1: The Creation (31 verses)
  - Romans 8: Life in the Spirit (24 verses)
- Clean layout with verse numbers and section titles

#### Activity Panel
Interactive bottom sheet panel for accessing AI features while reading:

**Two Modes:**
- **Inactive Mode** (Reference Reading):
  - Contracted: Minimal view with drag handle
  - Extended: Shows action buttons (Start Scroll, Chapter Context, Ask Leo)

- **Active Mode** (Tracked Reading):
  - Contracted: Displays reading timer
  - Extended: Shows AI action buttons (Chapter Context, Add Question, Ask AI) + reading timer + bookmark button

**Features:**
- Draggable panel with smooth spring animations (Framer Motion)
- Tap drag handle to toggle expanded/contracted states
- Swipe down to collapse
- Positioned above footer navigation
- Visual separators for clarity
- "Start Scroll" button initiates active reading tracking session

### 3. Monetization (`/paywall`)

- Premium subscription model using "Denarii" as branded currency
- Pricing tiers:
  - Monthly: $5.99 (80,000 Denarii/month)
  - Annual: $49.99 (1,000,000 Denarii/year - Best Value, Save 30%)
- **Key Messaging**: "RYB is free to use forever" - Denarii enhances experience with AI features
- Clear feature distinction:
  - **AI-Powered Features** (require Denarii): Scroll summaries, Interactive quizzes, Leo chatbot, Chapter context, Personalized insights
  - **Always Free**: Bible reading, Scrolls (activity tracking), Social interactions, Reading streaks
- Comprehensive "What are Denarii?" explanation section
- Feature comparison table showing Free vs Premium tiers
- 7-day free trial with cancel anytime option
- "Continue with Free Plan" option prominently displayed

### 4. Community Features (`/community`)

Preview implementation with "Coming Soon" overlay:
- Friends section with "Active Now" status
- Reading Groups preview
- Recent Activity feed showing:
  - Reading streaks
  - Reflections
  - Recent readings
  - Encouragements and comments
- Overlay reappears on every visit to maintain excitement

### 5. Home Page (`/home`)

Features OnboardingProgress component that tracks:
1. Complete Your Profile ✓ (navigates to `/profile?onboarding=true`)
2. Set Your Reading Goals ✓ (navigates to `/reading-goals?onboarding=true`)
3. Complete Your First Reading
4. Ask Leo Your First Question
5. Take Your First Quiz

Progress bar and completion tracking with localStorage persistence.

## Project Structure

```
src/
├── pages/
│   ├── Loading.tsx          # Initial loading screen
│   ├── Login.tsx            # Login page
│   ├── SignUp.tsx           # Registration page
│   ├── VerifyEmail.tsx      # Email verification
│   ├── EmailConfirmed.tsx   # Confirmation success
│   ├── Survey.tsx           # 10-question assessment
│   ├── SurveyResults.tsx    # Persona reveal
│   ├── Paywall.tsx          # Subscription/pricing
│   ├── ReadingGoals.tsx     # Reading goals + notifications
│   ├── Community.tsx        # Community preview (coming soon)
│   ├── Read.tsx             # Bible reading engine + ActivityPanel
│   ├── Index.tsx            # Home page
│   ├── Profile.tsx          # User profile + onboarding
│   └── NotFound.tsx         # 404 page
├── components/
│   ├── Footer.tsx           # App footer
│   ├── OnboardingProgress.tsx  # Task tracker widget
│   ├── ActivityPanel.tsx    # Draggable AI features panel (Read page)
│   └── ui/                  # Shadcn UI components
├── lib/
│   └── utils.ts             # Utility functions (cn helper)
└── App.tsx                  # Main routing configuration
```

## Key Implementation Details

### Data Persistence
- Uses localStorage for onboarding state:
  - `profileOnboardingComplete`: Profile setup completion
  - `readingGoalsOnboardingComplete`: Reading goals setup completion
  - User preferences (reading goals, notification settings)

### Cross-Component Communication
- Custom events for state synchronization:
  - `onboardingComplete` event dispatched when tasks complete
  - OnboardingProgress listens for localStorage changes and custom events
  - Real-time updates without prop drilling

### URL Parameters
- `?onboarding=true` triggers onboarding modals:
  - `/profile?onboarding=true` - Profile onboarding flow
  - `/reading-goals?onboarding=true` - Goals onboarding flow

### Bible Content Structure
```typescript
interface Verse {
  number: number;
  text: string;
}

interface Section {
  title?: string;
  verses: Verse[];
}

interface Chapter {
  id: string;
  book: string;
  chapter: number;
  title: string;
  sections: Section[];
}
```

## Completed Work

✅ Survey system with 10 complete questions
✅ Persona reveal page (mock data - The Shepherd)
✅ Paywall with Denarii explanation and "free forever" messaging
✅ Profile onboarding (photo + testimony)
✅ Reading goals onboarding (4 frequency options + notifications)
✅ OnboardingProgress tracking component
✅ Community preview with coming soon overlay
✅ Interactive Bible reading engine
✅ 5 sample chapters with scrollable content
✅ Translation switcher (dropdown), font size selector (dropdown with icon), chapter navigation
✅ ActivityPanel component with drag gestures (Framer Motion)
✅ Active and Inactive reading modes with panel states
✅ AI feature access buttons (Start Scroll, Chapter Context, Ask Leo/AI, Add Question)
✅ Reading timer for active sessions

## Known Limitations / Future Work

### Not Yet Implemented
- [ ] Persona calculation logic (survey → persona assignment)
- [ ] Actual Bible API integration (currently using static content)
- [ ] Leo AI chatbot functionality
- [ ] Quiz generation and completion
- [ ] Scroll generation and summaries
- [ ] Profile photo upload to backend
- [ ] Testimony saving to database
- [ ] Notification system implementation
- [ ] Community features (friends, groups, activity feed)
- [ ] Authentication flow completion
- [ ] Backend API integration

### Potential Enhancements
- [ ] Verse highlighting and bookmarking
- [ ] Search functionality
- [ ] Full Bible content (all books/chapters)
- [ ] Reading plans
- [ ] Progress tracking and statistics
- [ ] Social sharing
- [ ] Notes and reflections
- [ ] Audio Bible option

## Core Concepts

### Scrolls
A "Scroll" is an object that tracks active Bible reading sessions. Think of it as a reading activity record that contains:
- Start and end points (intended reading range)
- Reading activity tracking (questions asked during reading)
- Session duration (reading time)
- Reflections (user notes after completion)

Users initiate a Scroll through the ActivityPanel's "Start Scroll" button, transitioning from Inactive to Active reading mode. This concept will be expanded during onboarding implementation.

### AI Agent: Leo

Leo is the branded AI assistant for RYB (previously named "Eli", changed to "Leo"). Leo will provide:
- Bible-related Q&A
- Reading guidance
- Quiz generation
- Scroll summaries
- Chapter context and analysis
- Personalized reading recommendations

Note: Leo functionality requires Denarii (premium currency).

## Design Patterns

### Onboarding Flow Pattern
1. User clicks task in OnboardingProgress
2. Navigate to route with `?onboarding=true`
3. Show modal with multi-step flow
4. Save completion to localStorage
5. Dispatch `onboardingComplete` event
6. Navigate to home
7. OnboardingProgress updates automatically

### Modal Pattern
Multi-step modals with:
- Progress indicators (visual bars)
- Skip/Next/Complete buttons
- Form validation
- Clean exit flows

### Component Styling
- Consistent use of semantic color tokens (foreground, background, muted, accent)
- Responsive layouts with max-width containers
- Card-based UI for content sections
- Icon integration with lucide-react

### Drag & Gesture Pattern (ActivityPanel)
Bottom sheet panel with interactive gestures:
- **Framer Motion**: Used for drag gestures and smooth spring animations
- **Drag Threshold**: 50px vertical movement to trigger state change
- **Tap to Toggle**: Click drag handle to expand/contract panel
- **Swipe to Dismiss**: Drag down to collapse panel
- **State Management**: Tracks active/inactive reading modes and expanded/contracted states
- **Visual Feedback**: Borders, separators, and position changes for user clarity
- **Z-Index Hierarchy**: Panel (z-40) sits below footer (z-50) to maintain navigation accessibility

## Git Status

- Current branch: `post-lovable-v1`
- Main branch: `main`
- Working directory: Clean

## Recent Commits
- Add Survey page and update App routing
- Refine UI styling with enhanced visual hierarchy
- Refactor home page layout
- Fix footer spacing and centering
- Reorder home page cards

## Notes for Future Development

1. **Persona Logic**: Survey responses need mapping to persona types. Consider implementing a scoring system based on answer patterns.

2. **Bible API**: Consider using Bible API services like:
   - ESV API
   - Bible Gateway API
   - YouVersion API
   - API.Bible

3. **Backend Requirements**: Will need endpoints for:
   - User authentication
   - Profile data (photo, testimony)
   - Reading progress
   - Social features (friends, comments, encouragements)
   - Denarii transactions
   - Leo AI integration

4. **State Management**: As app grows, consider implementing Redux/Zustand for more complex state management beyond localStorage.

5. **Testing**: No tests currently implemented. Consider adding:
   - Unit tests for components
   - Integration tests for flows
   - E2E tests for critical paths

6. **Accessibility**: Ensure keyboard navigation, screen reader support, and ARIA labels are properly implemented throughout.

---

Last Updated: 2025-11-02
