import OnboardingProgress from "@/components/OnboardingProgress";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, HelpCircle, Flame, BookOpen, Heart, Compass } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
            </Avatar>
            <span className="font-semibold text-foreground">John D.</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <HelpCircle className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Onboarding Progress */}
        <OnboardingProgress />

        {/* Combined Stats Card */}
        <Card className="p-6 space-y-6">
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
                  <div key={day} className="flex flex-col items-center gap-2">
                    <span className="text-xs text-muted-foreground font-medium">{day}</span>
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        isCompleted
                          ? "bg-foreground text-background"
                          : "bg-muted text-muted-foreground"
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
              <div className="border border-border rounded-lg p-3 space-y-1">
                <p className="text-xs text-muted-foreground">Time</p>
                <p className="text-2xl font-bold text-card-foreground">4.5hrs</p>
              </div>
              <div className="border border-border rounded-lg p-3 space-y-1">
                <p className="text-xs text-muted-foreground">Chapters</p>
                <p className="text-2xl font-bold text-card-foreground">3</p>
              </div>
              <div className="border border-border rounded-lg p-3 space-y-1">
                <p className="text-xs text-muted-foreground">Scrolls</p>
                <p className="text-2xl font-bold text-card-foreground">15</p>
              </div>
            </div>
          </div>

          {/* Verse of the Day */}
          <div>
            <h2 className="font-semibold text-lg mb-3 text-card-foreground">Verse of the Day</h2>
            <div className="border border-border rounded-lg p-4">
              <div className="border-l-4 border-foreground pl-4 py-2">
                <p className="text-foreground leading-relaxed mb-2">
                  "For I know the plans I have for you," declares the LORD, "plans to prosper you and
                  not to harm you, plans to give you hope and a future."
                </p>
                <p className="text-sm text-muted-foreground">Jeremiah 29:11</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Curated Bible Readings */}
        <div className="space-y-3">
          <h2 className="font-semibold text-lg text-foreground">Curated Bible Readings</h2>
          
          <Card className="p-4 flex items-center justify-between hover:bg-accent transition-colors cursor-pointer">
            <div>
              <h3 className="font-semibold text-card-foreground">Daily Recommendation</h3>
              <p className="text-sm text-muted-foreground">Curated passage personalized for you</p>
            </div>
            <BookOpen className="h-6 w-6 text-primary" />
          </Card>

          <Card className="p-4 flex items-center justify-between hover:bg-accent transition-colors cursor-pointer">
            <div>
              <h3 className="font-semibold text-card-foreground">How are you feeling?</h3>
              <p className="text-sm text-muted-foreground">Find passages based on your mood</p>
            </div>
            <Heart className="h-6 w-6 text-primary" />
          </Card>

          <Card className="p-4 flex items-center justify-between hover:bg-accent transition-colors cursor-pointer">
            <div>
              <h3 className="font-semibold text-card-foreground">Explore By Topic</h3>
              <p className="text-sm text-muted-foreground">Browse categories and themes</p>
            </div>
            <Compass className="h-6 w-6 text-primary" />
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
