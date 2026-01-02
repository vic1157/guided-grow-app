# RYB (Read Your Bible)

## Project Overview

RYB is a Bible reading application designed to help users develop consistent Bible reading habits through personalized guidance, interactive features, and community engagement. The app uses spiritual assessments to understand users' reading preferences and provides tailored recommendations through a persona-based system.

### Key Features

- **Personalized Spiritual Assessment**: 10-question survey that determines user's Biblical persona
- **Persona-Based Recommendations**: 5 unique Biblical personas with tailored strengths and recommendations
- **Interactive Bible Reader**: Clean reading interface with translation switching, font size control, and chapter navigation
- **AI Assistant (Leo)**: Bible-related Q&A, reading guidance, chapter context and analysis
- **Activity Tracking**: Reading sessions tracked as "Scrolls" with duration, questions, and reflections
- **Community Features**: Connect with friends, join reading groups, and share reflections (coming soon)
- **Onboarding Process**: Guided setup for profile, reading goals, and notifications
- **Monetization**: Free core experience with premium "Denarii" currency for AI-powered features

### Tech Stack

- **Framework**: React with TypeScript
- **Routing**: React Router
- **UI Components**: Shadcn UI (built on Radix UI)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion (for gestures and transitions)
- **State Management**: React hooks (useState, useEffect)
- **Data Persistence**: localStorage
- **Build Tool**: Vite

## Lovable Project Info

**URL**: https://lovable.dev/projects/98a16560-05ce-42d8-9c6d-96c947f7f1d5

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/98a16560-05ce-42d8-9c6d-96c947f7f1d5) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone https://github.com/vic1157/guided-grow-app.git

# Step 2: Navigate to the project directory.
cd guided-grow-app

# Step 3: Install the necessary dependencies.
npm install

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

The development server will typically run at http://localhost:5173/

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

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

## Current Status

### Completed Work

✅ Survey system with 10 complete questions  
✅ Persona reveal page (mock data - The Shepherd)  
✅ Paywall with Denarii explanation and "free forever" messaging  
✅ Profile onboarding (photo + testimony)  
✅ Reading goals onboarding (4 frequency options + notifications)  
✅ OnboardingProgress tracking component 
✅ Community preview with coming soon overlay  
✅ Interactive Bible reading engine  
✅ 5 sample chapters with scrollable content  
✅ Translation switcher, font size selector, chapter navigation  
✅ ActivityPanel component with drag gestures  
✅ Active and Inactive reading modes with panel states  
✅ AI feature access buttons  
✅ Reading timer for active sessions  

### Future Work

- Persona calculation logic (survey → persona assignment)
- Bible API integration
- Leo AI chatbot functionality
- Quiz generation and completion
- Scroll generation and summaries
- Profile photo upload to backend
- Community features (friends, groups, activity feed)
- Authentication flow completion
- Backend API integration


## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Framer Motion

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/98a16560-05ce-42d8-9c6d-96c947f7f1d5) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
