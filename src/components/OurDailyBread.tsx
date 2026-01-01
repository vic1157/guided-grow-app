import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BookOpen, Scroll, HelpCircle, Lock, Clock, Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface DailyVerse {
  text: string;
  reference: string;
}

interface DailyScrollData {
  title: string;
  passage: string;
  description: string;
  estimatedTime: string;
  verseCount: number;
}

const DAILY_VERSE: DailyVerse = {
  text: '"For I know the plans I have for you," declares the LORD, "plans to prosper you and not to harm you, plans to give you hope and a future."',
  reference: "Jeremiah 29:11"
};

const DAILY_SCROLL: DailyScrollData = {
  title: "God's Plans for Your Future",
  passage: "Jeremiah 29:10-14",
  description: "Discover God's promises of hope and a future for His people",
  estimatedTime: "3-4 min",
  verseCount: 5
};

interface OurDailyBreadProps {
  scrollCompleted?: boolean;
  quizCompleted?: boolean;
}

const OurDailyBread = ({ scrollCompleted = false, quizCompleted = false }: OurDailyBreadProps) => {
  const navigate = useNavigate();
  const [verseRead, setVerseRead] = useState(false);
  const [showWalkthroughDialog, setShowWalkthroughDialog] = useState(false);

  // Update internal state when scroll is completed
  useEffect(() => {
    if (scrollCompleted) {
      // If scroll is completed, verse must have been read too
      setVerseRead(true);
    }
  }, [scrollCompleted]);

  const handleMarkAsRead = () => {
    setVerseRead(true);
  };

  const handleStartScroll = () => {
    // Check if user has completed the scroll walkthrough
    const walkthroughComplete = localStorage.getItem("scrollWalkthroughComplete") === "true";

    if (!walkthroughComplete) {
      // Show dialog prompting user to complete walkthrough
      setShowWalkthroughDialog(true);
    } else {
      // Proceed to daily scroll
      navigate("/daily-scroll");
    }
  };

  const handleGoToWalkthrough = () => {
    setShowWalkthroughDialog(false);
    navigate("/scroll-walkthrough");
  };

  const handleStartQuiz = () => {
    navigate("/daily-quiz");
  };

  // Determine unlock states
  const isScrollUnlocked = verseRead;
  const isQuizUnlocked = scrollCompleted;

  return (
    <div className="space-y-6">
      {/* Clean Header */}
      <div className="space-y-1">
        <h2 className="font-bold text-3xl text-foreground tracking-tight">Our Daily Bread</h2>
        <p className="text-sm text-muted-foreground">Your daily spiritual journey</p>
      </div>

      <div className="relative pl-14 space-y-10">
        {/* Vertical path line */}
        <div className="absolute left-5 top-6 bottom-6 w-[2px] bg-gradient-to-b from-foreground via-foreground/50 to-foreground/20" />

        {/* Activity 1: Verse of the Day */}
        <div className="relative">
          {/* Journey marker */}
          <div
            className={cn(
              "absolute -left-14 top-6 w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all shadow-sm",
              verseRead
                ? "bg-foreground border-foreground"
                : "bg-background border-foreground"
            )}
          >
            {verseRead ? (
              <Check className="h-5 w-5 text-background" />
            ) : (
              <BookOpen className="h-5 w-5 text-foreground" />
            )}
          </div>

          {/* Single card containing everything */}
          <div className="bg-card/50 backdrop-blur border border-border/50 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="font-semibold text-lg text-foreground">Verse of the Day</h3>

            <div className="border-l-4 border-foreground pl-4 py-2">
              <p className="text-sm text-foreground leading-relaxed mb-2">
                {DAILY_VERSE.text}
              </p>
              <p className="text-sm text-muted-foreground">{DAILY_VERSE.reference}</p>
            </div>

            <Button
              onClick={handleMarkAsRead}
              disabled={verseRead}
              className={cn(
                "w-full h-10 rounded-full font-medium transition-all shadow-sm",
                verseRead
                  ? "bg-foreground/10 text-foreground hover:bg-foreground/10 cursor-default"
                  : "bg-foreground text-background hover:bg-foreground/90 hover:shadow-md"
              )}
            >
              {verseRead ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Read
                </>
              ) : (
                "Mark as Read"
              )}
            </Button>
          </div>
        </div>

        {/* Activity 2: Scroll of the Day */}
        <div
          className={cn(
            "relative transition-all duration-500",
            !isScrollUnlocked && "opacity-40"
          )}
        >
          {/* Journey marker */}
          <div
            className={cn(
              "absolute -left-14 top-6 w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all shadow-sm",
              scrollCompleted
                ? "bg-foreground border-foreground"
                : isScrollUnlocked
                ? "bg-background border-foreground animate-pulse"
                : "bg-background border-muted-foreground/30"
            )}
          >
            {scrollCompleted ? (
              <Check className="h-5 w-5 text-background" />
            ) : isScrollUnlocked ? (
              <Scroll className="h-5 w-5 text-foreground" />
            ) : (
              <Lock className="h-5 w-5 text-muted-foreground/50" />
            )}
          </div>

          {/* Single card containing everything */}
          <div className={cn("bg-card/50 backdrop-blur border border-border/50 rounded-2xl p-5 shadow-sm space-y-4", !isScrollUnlocked && "pointer-events-none")}>
            <h3 className="font-semibold text-lg text-foreground">Scroll of the Day</h3>

            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-foreground mb-1">{DAILY_SCROLL.title}</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  {DAILY_SCROLL.passage}
                </p>
                <p className="text-sm text-foreground/80">{DAILY_SCROLL.description}</p>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="text-sm">
                  {DAILY_SCROLL.estimatedTime} • {DAILY_SCROLL.verseCount} verses
                </span>
              </div>
            </div>

            <Button
              onClick={handleStartScroll}
              disabled={!isScrollUnlocked || scrollCompleted}
              className={cn(
                "w-full h-10 rounded-full font-medium transition-all shadow-sm",
                scrollCompleted
                  ? "bg-foreground/10 text-foreground hover:bg-foreground/10 cursor-default"
                  : "bg-foreground text-background hover:bg-foreground/90 hover:shadow-md"
              )}
            >
              {scrollCompleted ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Completed
                </>
              ) : (
                "Start Scroll →"
              )}
            </Button>
          </div>
        </div>

        {/* Activity 3: Quiz of the Day */}
        <div
          className={cn(
            "relative transition-all duration-500",
            !isQuizUnlocked && "opacity-40"
          )}
        >
          {/* Journey marker */}
          <div
            className={cn(
              "absolute -left-14 top-6 w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all shadow-sm",
              quizCompleted
                ? "bg-foreground border-foreground"
                : isQuizUnlocked
                ? "bg-background border-foreground animate-pulse"
                : "bg-background border-muted-foreground/30"
            )}
          >
            {quizCompleted ? (
              <Check className="h-5 w-5 text-background" />
            ) : isQuizUnlocked ? (
              <HelpCircle className="h-5 w-5 text-foreground" />
            ) : (
              <Lock className="h-5 w-5 text-muted-foreground/50" />
            )}
          </div>

          {/* Single card containing everything */}
          <div className={cn("bg-card/50 backdrop-blur border border-border/50 rounded-2xl p-5 shadow-sm space-y-4", !isQuizUnlocked && "pointer-events-none")}>
            <h3 className="font-semibold text-lg text-foreground">Quiz of the Day</h3>

            <div className="space-y-3">
              <p className="text-sm text-foreground">
                Test your knowledge of Jeremiah 29:10-14 with 5 questions about God's promises and plans.
              </p>
              <div className="flex items-center gap-2 text-muted-foreground">
                <HelpCircle className="h-4 w-4" />
                <span className="text-sm">5 questions • 2-3 min</span>
              </div>
            </div>

            <Button
              onClick={handleStartQuiz}
              disabled={!isQuizUnlocked || quizCompleted}
              className={cn(
                "w-full h-10 rounded-full font-medium transition-all shadow-sm",
                quizCompleted
                  ? "bg-foreground/10 text-foreground hover:bg-foreground/10 cursor-default"
                  : "bg-foreground text-background hover:bg-foreground/90 hover:shadow-md"
              )}
            >
              {quizCompleted ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Completed
                </>
              ) : (
                "Start Quiz →"
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Walkthrough Prompt Dialog */}
      <Dialog open={showWalkthroughDialog} onOpenChange={setShowWalkthroughDialog}>
        <DialogContent className="rounded-3xl w-[calc(100%-2rem)] max-w-md p-8 gap-6">
          <DialogHeader className="space-y-6">
            <DialogTitle className="flex items-center gap-3 text-xl">
              <Scroll className="h-6 w-6" />
              Learn About Scrolls First
            </DialogTitle>
            <DialogDescription className="space-y-8 pt-4 text-base leading-relaxed">
              <p>
                Before starting your first Scroll, we recommend taking a quick walkthrough to understand how Scrolls work.
              </p>
              <div className="space-y-4 text-left">
                <p className="text-sm font-medium">
                  The RYB Scroll Walkthrough will show you how to:
                </p>
                <ul className="text-sm list-disc list-outside space-y-2 pl-5 ml-1">
                  <li>Track your Bible reading sessions</li>
                  <li>Use AI-generated summaries</li>
                  <li>Capture questions while reading</li>
                  <li>Write personal reflections</li>
                </ul>
              </div>
              <p className="text-sm font-medium text-foreground">
                It only takes 2-3 minutes and will help you get the most out of your Scrolls!
              </p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-row gap-3 pt-2">
            <Button
              variant="outline"
              onClick={() => {
                setShowWalkthroughDialog(false);
                navigate("/daily-scroll");
              }}
              className="w-full sm:w-auto rounded-full h-11"
            >
              Maybe Later
            </Button>
            <Button
              onClick={handleGoToWalkthrough}
              className="w-full sm:w-auto rounded-full h-11 bg-foreground text-background hover:bg-foreground/90"
            >
              Start Walkthrough
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OurDailyBread;
