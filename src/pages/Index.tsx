import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import OnboardingProgress from "@/components/OnboardingProgress";
import OurDailyBread from "@/components/OurDailyBread";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Sun, Moon, Flame, BookOpen, Heart, Compass } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const Index = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  // Get today's date for daily reset
  const today = new Date().toDateString();

  // Initialize states from localStorage
  const [dailyScrollCompleted, setDailyScrollCompleted] = useState(() => {
    const storedDate = localStorage.getItem('dailyBreadDate');
    if (storedDate !== today) {
      // New day, reset everything
      localStorage.setItem('dailyBreadDate', today);
      localStorage.removeItem('dailyScrollCompleted');
      localStorage.removeItem('dailyQuizCompleted');
      return false;
    }
    return localStorage.getItem('dailyScrollCompleted') === 'true';
  });

  const [dailyQuizCompleted, setDailyQuizCompleted] = useState(() => {
    const storedDate = localStorage.getItem('dailyBreadDate');
    if (storedDate !== today) return false;
    return localStorage.getItem('dailyQuizCompleted') === 'true';
  });

  // Update localStorage when states change
  useEffect(() => {
    if (dailyScrollCompleted) {
      localStorage.setItem('dailyScrollCompleted', 'true');
    }
  }, [dailyScrollCompleted]);

  useEffect(() => {
    if (dailyQuizCompleted) {
      localStorage.setItem('dailyQuizCompleted', 'true');
    }
  }, [dailyQuizCompleted]);

  // Listen for navigation state updates
  useEffect(() => {
    if (location.state?.dailyScrollCompleted) {
      setDailyScrollCompleted(true);
    }
    if (location.state?.dailyQuizCompleted) {
      setDailyQuizCompleted(true);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-muted pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card border-b-2 border-foreground/30">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
            </Avatar>
            <span className="font-semibold text-foreground">John D.</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9" onClick={toggleTheme}>
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Combined Stats Card - Attached to top */}
      <div className="bg-muted border-b-2 border-foreground/30">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <div className="space-y-8">
            {/* Reading Streak */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-semibold text-lg text-card-foreground">Your Reading Streak</h2>
                  <p className="text-sm text-muted-foreground">12 Days</p>
                </div>
                <div className="bg-secondary/10 p-2 rounded-full">
                  <Flame className="h-6 w-6 text-secondary" />
                </div>
              </div>
              <div className="flex justify-between items-center">
                {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => {
                  const isCompleted = [0, 1, 2, 4, 5].includes(index);
                  return (
                    <div key={index} className="flex flex-col items-center gap-2">
                      <span className="text-xs text-muted-foreground font-medium">{day}</span>
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center ${
                          isCompleted
                            ? "bg-foreground text-background"
                            : "border-2 border-muted-foreground/50"
                        }`}
                      >
                        {isCompleted && (
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M5 13l4 4L19 7"></path>
                          </svg>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Weekly Activity */}
            <div>
              <h2 className="font-semibold text-lg mb-4 text-card-foreground">Weekly Activity</h2>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-card border border-border rounded-lg p-3 space-y-0.5">
                  <p className="text-xs text-muted-foreground">Time</p>
                  <p className="text-lg font-bold text-card-foreground">4.5hrs</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-3 space-y-0.5">
                  <p className="text-xs text-muted-foreground">Chapters</p>
                  <p className="text-lg font-bold text-card-foreground">3</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-3 space-y-0.5">
                  <p className="text-xs text-muted-foreground">Scrolls</p>
                  <p className="text-lg font-bold text-card-foreground">15</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <main className="max-w-2xl mx-auto space-y-0">

        <div className="bg-background px-4 py-6">
          {/* Onboarding Progress */}
          <OnboardingProgress />
        </div>

        <div className="bg-background px-4 py-6 space-y-4">
          {/* Completion Message */}
          {dailyScrollCompleted && dailyQuizCompleted && (
            <div className="relative bg-gradient-to-r from-green-50 via-green-100 to-green-50 dark:from-green-950/30 dark:via-green-900/30 dark:to-green-950/30 border-2 border-green-600/30 rounded-2xl p-6 text-center overflow-hidden">
              <div className="absolute top-0 right-0 opacity-10">
                <svg className="h-32 w-32 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              </div>
              <div className="relative space-y-2">
                <div className="text-4xl mb-2">🎉</div>
                <h3 className="text-2xl font-bold text-green-700 dark:text-green-400">Daily Bread Complete!</h3>
                <p className="text-sm text-green-600 dark:text-green-500">
                  You've completed today's verse, scroll, and quiz. Well done!
                </p>
                <p className="text-xs text-green-600/80 dark:text-green-500/80 pt-2">
                  Come back tomorrow for new content
                </p>
              </div>
            </div>
          )}

          {/* Our Daily Bread */}
          <OurDailyBread scrollCompleted={dailyScrollCompleted} quizCompleted={dailyQuizCompleted} />
        </div>

        {/* Curated Bible Readings */}
        <div className="bg-background px-4 py-6 space-y-3">
          <h2 className="font-semibold text-lg text-foreground">Curated Bible Readings</h2>

          <Card className="bg-card p-4 flex items-center justify-between hover:bg-accent transition-colors cursor-pointer">
            <div>
              <h3 className="font-semibold text-card-foreground">Daily Recommendation</h3>
              <p className="text-sm text-muted-foreground">Curated passage personalized for you</p>
            </div>
            <BookOpen className="h-6 w-6 text-foreground" />
          </Card>

          <Card className="bg-card p-4 flex items-center justify-between hover:bg-accent transition-colors cursor-pointer">
            <div>
              <h3 className="font-semibold text-card-foreground">How are you feeling?</h3>
              <p className="text-sm text-muted-foreground">Find passages based on your mood</p>
            </div>
            <Heart className="h-6 w-6 text-foreground" />
          </Card>

          <Card className="bg-card p-4 flex items-center justify-between hover:bg-accent transition-colors cursor-pointer">
            <div>
              <h3 className="font-semibold text-card-foreground">Explore By Topic</h3>
              <p className="text-sm text-muted-foreground">Browse categories and themes</p>
            </div>
            <Compass className="h-6 w-6 text-foreground" />
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
