import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronLeft,
  Clock,
  Lightbulb,
  MessageSquare,
  ChevronRight,
  Lock,
  Users,
  Globe,
  ThumbsUp,
  ThumbsDown,
  HelpCircle,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const DailyScroll = () => {
  const navigate = useNavigate();
  const navigationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [expandedSummary, setExpandedSummary] = useState(false);
  const [expandedQuestions, setExpandedQuestions] = useState<{
    understanding: boolean;
    discussion: boolean;
  }>({
    understanding: false,
    discussion: false,
  });
  const [reflection, setReflection] = useState("");
  const [selectedVisibility, setSelectedVisibility] = useState<"private" | "friends" | "public">(
    "private"
  );
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Cleanup timeout on unmount to prevent unexpected navigation
  useEffect(() => {
    return () => {
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, []);

  const handleCompleteScroll = () => {
    setShowSuccessMessage(true);
    navigationTimeoutRef.current = setTimeout(() => {
      navigate("/home", { state: { dailyScrollCompleted: true } });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card border-b-2 border-foreground/30">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/home")}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-5 w-5" />
            <span>Back</span>
          </Button>
          <h1 className="text-lg font-semibold text-foreground">Daily Scroll</h1>
          <div className="w-16" /> {/* Spacer for centering */}
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Success Message */}
        {showSuccessMessage && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-2">
            <Card className="bg-foreground text-background p-4 shadow-lg">
              <p className="font-semibold text-center">
                🎉 Daily Scroll Complete! Returning home...
              </p>
            </Card>
          </div>
        )}

        {/* Scroll Header */}
        <Card className="p-6 space-y-3 border-2 border-foreground/20">
          <h2 className="text-2xl font-bold text-foreground">God's Plans for Your Future</h2>
          <p className="text-muted-foreground">Jeremiah 29:10 - Jeremiah 29:14</p>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="text-sm">3-4 mins • 5 verses</span>
          </div>
        </Card>

        {/* Summary Section */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-foreground">Summary</h3>
          <Card className="overflow-hidden border-2 border-foreground/20">
            <div className="p-4 space-y-3">
              <div
                className={`space-y-3 text-sm text-muted-foreground transition-all ${expandedSummary ? "max-h-96" : "max-h-24 overflow-hidden"
                  }`}
              >
                <p>
                  In this powerful passage, God speaks through the prophet Jeremiah to His people in exile,
                  assuring them that their captivity is temporary and part of His greater plan.
                </p>
                {expandedSummary && (
                  <p>
                    The Lord promises that after seventy years, He will bring His people back home and fulfill
                    His good promises to them. At the heart of this message is verse 11, where God declares His
                    intentions: plans for welfare and not for evil, plans to give hope and a future. He invites
                    His people to call upon Him in prayer, promising that when they seek Him with all their heart,
                    they will find Him and He will restore their fortunes.
                  </p>
                )}
              </div>

              <Button
                onClick={() => setExpandedSummary(!expandedSummary)}
                variant="outline"
                className="w-full text-foreground bg-secondary/80 border-secondary-foreground/20 hover:bg-secondary hover:border-secondary-foreground/40"
              >
                {expandedSummary ? "Show Less" : "Show More"}
              </Button>

              <Separator />

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>AI Generated Response</span>
                <div className="flex items-center gap-2">
                  <span>Accurate Summary?</span>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-accent">
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-accent">
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Questions Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold text-foreground">Questions</h3>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full p-0 hover:bg-muted">
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    <span className="sr-only">Question types info</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4" align="start" collisionPadding={16}>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm">
                        <span className="font-semibold text-foreground">Understanding</span> <span className="text-muted-foreground">questions help establish what the text says and means at a basic level.</span>
                      </p>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-sm">
                        <span className="font-semibold text-foreground">Discussion</span> <span className="text-muted-foreground">questions explore deeper meanings, implications and connections within a particular scripture.</span>
                      </p>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <Button size="sm" className="h-8 rounded-lg">
              + Add
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            Add questions that come to mind prior to and during your reading!
          </p>

          {/* Understanding Questions */}
          <Card className="border-2 border-foreground/20 overflow-hidden">
            <button
              onClick={() =>
                setExpandedQuestions((prev) => ({ ...prev, understanding: !prev.understanding }))
              }
              className="w-full p-4 flex items-center justify-between hover:bg-accent transition-colors"
            >
              <div className="flex items-center gap-3">
                <Lightbulb className="h-5 w-5 text-foreground" />
                <span className="font-medium text-foreground">Understanding (0)</span>
              </div>
              <ChevronRight
                className={`h-5 w-5 text-muted-foreground transition-transform ${expandedQuestions.understanding ? "rotate-90" : ""
                  }`}
              />
            </button>

            {expandedQuestions.understanding && (
              <div className="border-t border-border p-4 bg-background/50 text-center">
                <p className="text-sm text-muted-foreground">No understanding questions yet.</p>
              </div>
            )}
          </Card>

          {/* Discussion Questions */}
          <Card className="border-2 border-foreground/20 overflow-hidden">
            <button
              onClick={() =>
                setExpandedQuestions((prev) => ({ ...prev, discussion: !prev.discussion }))
              }
              className="w-full p-4 flex items-center justify-between hover:bg-accent transition-colors"
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-foreground" />
                <span className="font-medium text-foreground">Discussion (0)</span>
              </div>
              <ChevronRight
                className={`h-5 w-5 text-muted-foreground transition-transform ${expandedQuestions.discussion ? "rotate-90" : ""
                  }`}
              />
            </button>

            {expandedQuestions.discussion && (
              <div className="border-t border-border p-4 bg-background/50 text-center">
                <p className="text-sm text-muted-foreground">No discussion questions yet.</p>
              </div>
            )}
          </Card>
        </div>

        {/* Personal Reflection */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-foreground">Personal Reflection</h3>
          <Card className="p-4 space-y-4 border-2 border-foreground/20">
            <Textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Share your personal reflections..."
              className="min-h-32 resize-none"
            />
          </Card>
        </div>

        {/* Visibility Settings */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-foreground">Visibility</h3>
          <div className="space-y-2">
            <button
              onClick={() => setSelectedVisibility("private")}
              className={`w-full p-4 rounded-lg border-2 flex items-center gap-3 transition-colors ${selectedVisibility === "private"
                ? "border-foreground bg-accent"
                : "border-border hover:border-muted-foreground"
                }`}
            >
              <Lock className="h-5 w-5 text-foreground" />
              <div className="flex-1 text-left">
                <p className="font-medium text-foreground">Private</p>
                <p className="text-xs text-muted-foreground">Only you can see this</p>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedVisibility === "private" ? "border-foreground bg-foreground" : "border-border"
                  }`}
              >
                {selectedVisibility === "private" && (
                  <div className="w-2 h-2 bg-background rounded-full" />
                )}
              </div>
            </button>

            <button
              onClick={() => setSelectedVisibility("friends")}
              className={`w-full p-4 rounded-lg border-2 flex items-center gap-3 transition-colors ${selectedVisibility === "friends"
                ? "border-foreground bg-accent"
                : "border-border hover:border-muted-foreground"
                }`}
            >
              <Users className="h-5 w-5 text-foreground" />
              <div className="flex-1 text-left">
                <p className="font-medium text-foreground">Friends Only</p>
                <p className="text-xs text-muted-foreground">Visible to your friends</p>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedVisibility === "friends" ? "border-foreground bg-foreground" : "border-border"
                  }`}
              >
                {selectedVisibility === "friends" && (
                  <div className="w-2 h-2 bg-background rounded-full" />
                )}
              </div>
            </button>

            <button
              onClick={() => setSelectedVisibility("public")}
              className={`w-full p-4 rounded-lg border-2 flex items-center gap-3 transition-colors ${selectedVisibility === "public"
                ? "border-foreground bg-accent"
                : "border-border hover:border-muted-foreground"
                }`}
            >
              <Globe className="h-5 w-5 text-foreground" />
              <div className="flex-1 text-left">
                <p className="font-medium text-foreground">Public</p>
                <p className="text-xs text-muted-foreground">Anyone can see this</p>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedVisibility === "public" ? "border-foreground bg-foreground" : "border-border"
                  }`}
              >
                {selectedVisibility === "public" && (
                  <div className="w-2 h-2 bg-background rounded-full" />
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Start Scroll Button */}
        <div className="pt-4 pb-8">
          <Button
            onClick={handleCompleteScroll}
            className="w-full h-14 bg-foreground text-background hover:bg-foreground/90 rounded-xl font-semibold text-lg"
          >
            Start Scroll
          </Button>
          <p className="text-center text-xs text-muted-foreground mt-3">
            Begin your deep dive into today's scripture.
          </p>
        </div>
      </main>
    </div>
  );
};

export default DailyScroll;
