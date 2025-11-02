import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
