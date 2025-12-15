import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  Sparkles,
  MessageSquare,
  Lightbulb,
  Lock,
  CheckCircle2,
  Clock,
  ChevronRight,
  Users,
  Globe,
  HelpCircle,
  MessageCircleQuestion,
  Info,
  PlayCircle,
  BarChart3,
  Home,
  Scroll,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const ScrollWalkthrough = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [expandedSummary, setExpandedSummary] = useState(false);
  const [expandedQuestions, setExpandedQuestions] = useState<{ understanding: boolean; discussion: boolean }>({
    understanding: false,
    discussion: false,
  });
  const [selectedVisibility, setSelectedVisibility] = useState<"private" | "friends" | "public">("public");
  const [mockPanelExpanded, setMockPanelExpanded] = useState(false);
  const [expandedReflection, setExpandedReflection] = useState(false);

  const totalSteps = 8;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    handleComplete();
    navigate("/home");
  };

  const handleComplete = () => {
    // Mark walkthrough as complete
    localStorage.setItem("scrollWalkthroughComplete", "true");
    window.dispatchEvent(new Event("onboardingComplete"));
  };

  const handleStartReading = () => {
    handleComplete();
    navigate("/demo-scroll");
  };

  const handleBackToHome = () => {
    handleComplete();
    navigate("/home");
  };

  return (
    <div className="fixed inset-0 bg-background/95 z-50 overflow-y-auto">
      <div className="min-h-full flex items-center justify-center p-6">
        <Card className="w-full max-w-2xl p-8 space-y-6 my-8">
          {/* Progress Indicators */}
          <div className="flex items-center justify-center gap-2 mb-4">
            {[...Array(totalSteps)].map((_, index) => (
              <div
                key={index}
                className={`h-2 w-12 rounded-full transition-colors ${currentStep > index ? "bg-foreground" : "bg-muted-foreground/30"
                  }`}
              />
            ))}
          </div>

          {/* Step 1: Welcome & Introduction */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-foreground/10 mb-2">
                  <BookOpen className="h-8 w-8 text-foreground" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">Welcome to RYB Scrolls</h2>
                <p className="text-base text-muted-foreground max-w-md mx-auto">
                  Scrolls are how RYB helps you track and enrich your Bible reading experience. Let's explore what makes them special.
                </p>
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-3 p-4 bg-accent/50 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Track Your Reading Activity</h3>
                    <p className="text-sm text-muted-foreground">
                      Every Scroll captures what you read, how long you spent, and the insights you gained.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-accent/50 rounded-lg">
                  <Sparkles className="h-5 w-5 text-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">AI-Powered Insights</h3>
                    <p className="text-sm text-muted-foreground">
                      Get chapter summaries, context, and personalized guidance from Leo, your AI companion.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-accent/50 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Engage Deeply</h3>
                    <p className="text-sm text-muted-foreground">
                      Add questions during reading and reflect on your personal journey with God's Word.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleSkip} variant="outline" className="flex-1 h-12 rounded-xl">
                  Skip Walkthrough
                </Button>
                <Button onClick={handleNext} className="flex-1 h-12 rounded-xl">
                  Get Started
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Scroll Overview */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-foreground">Your Reading Activity Snapshot</h2>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                  Each Scroll starts with an overview showing what you're reading and how much time it might take.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="border-2 border-foreground/20 rounded-lg p-6 bg-card">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Jesus Rises, Sends Disciples
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Matthew 5:1 - Matthew 5:48
                  </p>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">7-8 mins • 48 verses</span>
                  </div>
                </div>

                <div className="p-4 bg-accent/50 rounded-lg border border-border">
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">Pro tip:</span> The time estimate helps you plan your reading sessions. You can always pause and resume later!
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handlePrevious} variant="outline" className="flex-1 h-12 rounded-xl">
                  Previous
                </Button>
                <Button onClick={handleNext} className="flex-1 h-12 rounded-xl">
                  Next
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: AI-Generated Summary */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-foreground/10 mb-2">
                  <Sparkles className="h-6 w-6 text-foreground" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Get Context at a Glance</h2>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                  Before or after reading, get an AI-generated summary that helps you understand the passage's key themes.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="border-2 border-foreground/20 rounded-lg overflow-hidden bg-card">
                  <div className="p-4 space-y-3">
                    <h3 className="font-semibold text-foreground text-lg">Summary</h3>

                    <div
                      className={`space-y-3 text-sm text-muted-foreground transition-all ${expandedSummary ? "max-h-96" : "max-h-24 overflow-hidden"
                        }`}
                    >
                      <p>
                        Contains the beginning of Jesus' Sermon on the Mount, starting with the Beatitudes that describe the blessed nature of the humble, merciful, and peacemakers.
                      </p>
                      {expandedSummary && (
                        <p>
                          Jesus then declares his followers to be "salt of the earth" and "light of the world" before addressing his relationship to the Law, stating he came to fulfill, not abolish it. The remainder of the passage intensifies traditional commandments through teachings on anger, adultery, divorce, oaths, retaliation, and love of enemies, culminating in the challenging call to "be perfect as your heavenly Father is perfect."
                        </p>
                      )}
                    </div>

                    <Button
                      onClick={() => setExpandedSummary(!expandedSummary)}
                      variant="outline"
                      className="w-full text-foreground bg-background/50 border-foreground/20 hover:bg-accent hover:border-foreground/40"
                    >
                      {expandedSummary ? "Show Less" : "Show More"}
                    </Button>

                    <Separator />

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>AI Generated Response</span>
                      <div className="flex items-center gap-1">
                        <span>Accurate Summary?</span>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          👍
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          👎
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-accent/50 rounded-lg border border-border">
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">Requires Denarii:</span> AI summaries use your Denarii balance. Free users get limited AI features each week.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handlePrevious} variant="outline" className="flex-1 h-12 rounded-xl">
                  Previous
                </Button>
                <Button onClick={handleNext} className="flex-1 h-12 rounded-xl">
                  Next
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Questions Feature */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-foreground/10 mb-2">
                  <MessageSquare className="h-6 w-6 text-foreground" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Engage Deeper with Questions</h2>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                  Add questions before or during your reading. Organize them by type and link them to specific verses.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">Questions</h3>
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

                {/* Understanding Questions */}
                <div className="border-2 border-foreground/20 rounded-lg overflow-hidden bg-card">
                  <button
                    onClick={() =>
                      setExpandedQuestions((prev) => ({ ...prev, understanding: !prev.understanding }))
                    }
                    className="w-full p-4 flex items-center justify-between hover:bg-accent transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Lightbulb className="h-5 w-5 text-foreground" />
                      <span className="font-medium text-foreground">Understanding (1)</span>
                    </div>
                    <ChevronRight
                      className={`h-5 w-5 text-muted-foreground transition-transform ${expandedQuestions.understanding ? "rotate-90" : ""
                        }`}
                    />
                  </button>

                  {expandedQuestions.understanding && (
                    <div className="border-t border-border p-4 bg-background/50">
                      <p className="text-sm text-foreground mb-2">
                        What did Jesus mean when he said he came to "fulfill the law" rather than abolish it, and how does this relate to his subsequent teachings where he seems to modify traditional commandments?
                      </p>
                      <p className="text-xs text-muted-foreground">Matthew 5:17</p>
                    </div>
                  )}
                </div>

                {/* Discussion Questions */}
                <div className="border-2 border-foreground/20 rounded-lg overflow-hidden bg-card">
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
                </div>

                <div className="p-4 bg-accent/50 rounded-lg border border-border">
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">Stay curious:</span> Questions help you engage deeply with Scripture. Ask Leo for help answering them during your reading!
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handlePrevious} variant="outline" className="flex-1 h-12 rounded-xl">
                  Previous
                </Button>
                <Button onClick={handleNext} className="flex-1 h-12 rounded-xl">
                  Next
                </Button>
              </div>
            </div>
          )}

          {/* Step 5: Interactive Questions (New) */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-foreground/10 mb-2">
                  <MessageCircleQuestion className="h-6 w-6 text-foreground" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Capture Questions as You Read</h2>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                  Don't lose a thought. Open the activity panel while reading to add questions instantly.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                {/* Mock Activity Panel */}
                <div className="relative border-2 border-foreground/20 rounded-xl overflow-hidden bg-background h-64 flex flex-col justify-end">
                  <div className="absolute inset-0 bg-accent/10 flex items-center justify-center">
                    <p className="text-muted-foreground/40 font-serif text-lg p-8 text-center">
                      "God blesses those who are poor and realize their need for him..."
                    </p>
                  </div>

                  {/* Panel Content */}
                  <div
                    className={`bg-card border-t border-border rounded-t-2xl shadow-lg z-10 transition-all duration-300 cursor-pointer ${mockPanelExpanded ? "h-48" : "h-20"
                      }`}
                    onClick={() => setMockPanelExpanded(!mockPanelExpanded)}
                  >
                    <div className="w-full h-full p-4 relative">
                      <div className="w-12 h-1 bg-muted-foreground/30 rounded-full mx-auto mb-4" />

                      {!mockPanelExpanded ? (
                        // Collapsed State
                        <div className="flex items-center justify-center h-8 relative">
                          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded animate-bounce whitespace-nowrap">
                            Tap to open
                            <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-foreground" />
                          </div>
                          <div className="flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-full">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              Reading Time: 5:23
                            </span>
                          </div>
                        </div>
                      ) : (
                        // Expanded State
                        <div className="flex items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                          <div className="flex flex-col items-center gap-2 opacity-50">
                            <div className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center">
                              <Info className="h-5 w-5 text-foreground" />
                            </div>
                            <span className="text-[10px] font-medium">Context</span>
                          </div>

                          <div className="flex flex-col items-center gap-2 relative">
                            <div className="w-14 h-14 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-sm">
                              <MessageCircleQuestion className="h-6 w-6 text-primary" />
                            </div>
                            <span className="text-xs font-bold text-primary">Add Question</span>
                          </div>

                          <div className="flex flex-col items-center gap-2 opacity-50">
                            <div className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center">
                              <Sparkles className="h-5 w-5 text-foreground" />
                            </div>
                            <span className="text-[10px] font-medium">Ask Leo</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-accent/50 rounded-lg border border-border">
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">Pro tip:</span> You can also ask Leo to help answer your questions right in the moment!
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handlePrevious} variant="outline" className="flex-1 h-12 rounded-xl">
                  Previous
                </Button>
                <Button onClick={handleNext} className="flex-1 h-12 rounded-xl">
                  Next
                </Button>
              </div>
            </div>
          )}

          {/* Step 6: Personal Reflection */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-foreground/10 mb-2">
                  <Lock className="h-6 w-6 text-foreground" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Capture Your Insights</h2>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                  After reading, journal your personal reflections and choose who can see your entire scroll.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="border-2 border-foreground/20 rounded-lg p-4 bg-card space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Personal Reflection</h3>
                    <div
                      className={`bg-background border border-border rounded-lg p-3 transition-all cursor-pointer hover:bg-accent/50 group relative ${expandedReflection ? "min-h-32" : "h-24 overflow-hidden"
                        }`}
                      onClick={() => setExpandedReflection(!expandedReflection)}
                    >
                      <p className={`text-sm text-muted-foreground italic ${expandedReflection ? "" : "line-clamp-3"}`}>
                        After reading Matthew 5, I find myself struck by the radical nature of Jesus' call to love enemies and pray for those who persecute us. In my own life, I've been holding onto resentment toward a colleague who undermined my work, but this passage challenges me to see that my anger, however justified it feels, is keeping me captive to bitterness rather than free me to live out God's perfect love.
                      </p>

                      {!expandedReflection && (
                        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent flex items-end justify-center pb-2">
                          <span className="text-xs font-medium text-foreground bg-background/80 px-2 py-1 rounded-full shadow-sm border border-border group-hover:bg-background">
                            Tap to read full reflection
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Scroll Visibility</h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => setSelectedVisibility("private")}
                        className={`w-full p-3 rounded-lg border-2 flex items-center gap-3 transition-colors ${selectedVisibility === "private"
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
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedVisibility === "private"
                            ? "border-foreground bg-foreground"
                            : "border-border"
                            }`}
                        >
                          {selectedVisibility === "private" && (
                            <div className="w-2 h-2 bg-background rounded-full" />
                          )}
                        </div>
                      </button>

                      <button
                        onClick={() => setSelectedVisibility("friends")}
                        className={`w-full p-3 rounded-lg border-2 flex items-center gap-3 transition-colors ${selectedVisibility === "friends"
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
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedVisibility === "friends"
                            ? "border-foreground bg-foreground"
                            : "border-border"
                            }`}
                        >
                          {selectedVisibility === "friends" && (
                            <div className="w-2 h-2 bg-background rounded-full" />
                          )}
                        </div>
                      </button>

                      <button
                        onClick={() => setSelectedVisibility("public")}
                        className={`w-full p-3 rounded-lg border-2 flex items-center gap-3 transition-colors ${selectedVisibility === "public"
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
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedVisibility === "public"
                            ? "border-foreground bg-foreground"
                            : "border-border"
                            }`}
                        >
                          {selectedVisibility === "public" && (
                            <div className="w-2 h-2 bg-background rounded-full" />
                          )}
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-accent/50 rounded-lg border border-border">
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">Share or keep private:</span> This setting applies to your entire scroll, including reading activity, questions, and reflections.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handlePrevious} variant="outline" className="flex-1 h-12 rounded-xl">
                  Previous
                </Button>
                <Button onClick={handleNext} className="flex-1 h-12 rounded-xl">
                  Next
                </Button>
              </div>
            </div>
          )}

          {/* Step 7: Scroll Initiation (New) */}
          {currentStep === 7 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-foreground/10 mb-2">
                  <PlayCircle className="h-6 w-6 text-foreground" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Starting a Scroll</h2>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                  You can read the Bible anytime, but starting a Scroll unlocks powerful tracking features.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3 p-4 bg-accent/50 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Track Your Progress</h3>
                    <p className="text-sm text-muted-foreground">
                      Initiating a scroll is required for your reading to count towards your daily goals, milestones, and overall stats. Casual reading without a scroll won't be tracked.
                    </p>
                  </div>
                </div>

                <div className="border-2 border-foreground/20 rounded-lg p-4 bg-card">
                  <h3 className="font-semibold text-foreground mb-3">Two Ways to Start</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background">
                      <Home className="h-5 w-5 text-foreground" />
                      <div>
                        <p className="font-medium text-foreground text-sm">From Home Page</p>
                        <p className="text-xs text-muted-foreground">Quick start from your dashboard</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background">
                      <Scroll className="h-5 w-5 text-foreground" />
                      <div>
                        <p className="font-medium text-foreground text-sm">From Action Panel</p>
                        <p className="text-xs text-muted-foreground">Start while reading any chapter</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handlePrevious} variant="outline" className="flex-1 h-12 rounded-xl">
                  Previous
                </Button>
                <Button onClick={handleNext} className="flex-1 h-12 rounded-xl">
                  Next
                </Button>
              </div>
            </div>
          )}

          {/* Step 8: Complete & Ready */}
          {currentStep === 8 && (
            <div className="space-y-6">
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-foreground/10 mb-2">
                  <CheckCircle2 className="h-8 w-8 text-foreground" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">You're Ready to Start!</h2>
                <p className="text-base text-muted-foreground max-w-md mx-auto">
                  Now you understand how Scrolls work. Time to start tracking your Bible reading journey!
                </p>
              </div>

              <div className="space-y-3 pt-4">
                <div className="p-4 bg-accent/50 rounded-lg border-2 border-foreground/20">
                  <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Quick Recap
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-foreground mt-0.5">1.</span>
                      <span>Each Scroll tracks a reading session with time estimates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-foreground mt-0.5">2.</span>
                      <span>AI summaries help you understand context (requires Denarii)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-foreground mt-0.5">3.</span>
                      <span>Add questions to engage deeper with Scripture</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-foreground mt-0.5">4.</span>
                      <span>Journal reflections and control who sees them</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-foreground mt-0.5">5.</span>
                      <span>Upload your Scroll to track progress and build streaks</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-foreground text-background rounded-lg">
                  <p className="text-sm font-medium text-center">
                    💡 Tip: Start your first Scroll by tapping "Start Scroll" in the reading panel
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <Button
                  onClick={handleStartReading}
                  className="w-full h-14 bg-foreground text-background hover:bg-foreground/90 rounded-xl font-semibold text-lg"
                >
                  Try Demo Scroll
                </Button>
                <Button
                  onClick={handleBackToHome}
                  variant="outline"
                  className="w-full h-12 rounded-xl font-medium"
                >
                  Back to Home
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ScrollWalkthrough;
