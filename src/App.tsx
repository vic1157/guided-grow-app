import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import Loading from "./pages/Loading";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import VerifyEmail from "./pages/VerifyEmail";
import EmailConfirmed from "./pages/EmailConfirmed";
import Survey from "./pages/Survey";
import SurveyResults from "./pages/SurveyResults";
import Paywall from "./pages/Paywall";
import ReadingGoals from "./pages/ReadingGoals";
import Community from "./pages/Community";
import Read from "./pages/Read";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import ScrollWalkthrough from "./pages/ScrollWalkthrough";
import DemoScroll from "./pages/DemoScroll";
import ScriptureExplorer from "./pages/ScriptureExplorer";
import Chat from "./pages/Chat";
import NewQuiz from "./pages/NewQuiz";
import ScrollDetail from "./pages/ScrollDetail";
import DailyScroll from "./pages/DailyScroll";
import DailyQuiz from "./pages/DailyQuiz";
import InteractiveSurvey from "./pages/InteractiveSurvey";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Loading />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/email-confirmed" element={<EmailConfirmed />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/survey-results" element={<SurveyResults />} />
          <Route path="/paywall" element={<Paywall />} />
          <Route path="/reading-goals" element={<ReadingGoals />} />
          <Route path="/community" element={<Community />} />
          <Route path="/read" element={<Read />} />
          <Route path="/home" element={<Index />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/scroll-walkthrough" element={<ScrollWalkthrough />} />
          <Route path="/demo-scroll" element={<DemoScroll />} />
          <Route path="/scripture-explorer" element={<ScriptureExplorer />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/new-quiz" element={<NewQuiz />} />
          <Route path="/scroll/:id" element={<ScrollDetail />} />
          <Route path="/daily-scroll" element={<DailyScroll />} />
          <Route path="/daily-quiz" element={<DailyQuiz />} />
          <Route path="/interactive-survey" element={<InteractiveSurvey />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
