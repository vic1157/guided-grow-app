import { useState } from "react";
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

const DemoScroll = () => {
  const navigate = useNavigate();
  const [expandedSummary, setExpandedSummary] = useState(true);
  const [expandedQuestions, setExpandedQuestions] = useState<{
    understanding: boolean;
    discussion: boolean;
  }>({
    understanding: false,
    discussion: false,
  });
  const [reflection, setReflection] = useState(
    "After reading Matthew 5, I find myself struck by the radical nature of Jesus' call to love enemies and pray for those who persecute us. In my own life, I've been holding onto resentment toward a colleague who undermined my work, but this passage challenges me to see that my anger, however justified it feels, is keeping me captive to bitterness rather than free me to live out God's perfect love."
  );
  const [selectedVisibility, setSelectedVisibility] = useState<"private" | "friends" | "public">(
    "public"
  );
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleUploadScroll = () => {
    setShowSuccessMessage(true);
    setTimeout(() => {
      navigate("/home");
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
          <h1 className="text-lg font-semibold text-foreground">Scroll Overview</h1>
          <div className="w-16" /> {/* Spacer for centering */}
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Success Message */}
        {showSuccessMessage && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-2">
            <Card className="bg-foreground text-background p-4 shadow-lg">
              <p className="font-semibold text-center">
                🎉 Demo Scroll Complete! Returning home...
              </p>
            </Card>
          </div>
        )}

        {/* Scroll Header */}
        <Card className="p-6 space-y-3 border-2 border-foreground/20">
          <h2 className="text-2xl font-bold text-foreground">Jesus Rises, Sends Disciples</h2>
          <p className="text-muted-foreground">Matthew 5:1 - Matthew 5:48</p>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="text-sm">7-8 mins • 48 verses</span>
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
                  Contains the beginning of Jesus' Sermon on the Mount, starting with the Beatitudes
                  that describe the blessed nature of the humble, merciful, and peacemakers.
                </p>
                {expandedSummary && (
                  <p>
                    Jesus then declares his followers to be "salt of the earth" and "light of the
                    world" before addressing his relationship to the Law, stating he came to fulfill,
                    not abolish it. The remainder of the passage intensifies traditional commandments
                    through teachings on anger, adultery, divorce, oaths, retaliation, and love of
                    enemies, culminating in the challenging call to "be perfect as your heavenly Father
                    is perfect."
                  </p>
                )}
              </div>

              <Button
                onClick={() => setExpandedSummary(!expandedSummary)}
                variant="ghost"
                className="w-full text-foreground hover:bg-accent"
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
                <span className="font-medium text-foreground">Understanding (1)</span>
              </div>
              <ChevronRight
                className={`h-5 w-5 text-muted-foreground transition-transform ${expandedQuestions.understanding ? "rotate-90" : ""
                  }`}
              />
            </button>

            {expandedQuestions.understanding && (
              <div className="border-t border-border">
                <div className="p-4 bg-background/50 space-y-3">
                  <Card className="p-4 border border-border space-y-2">
                    <p className="text-sm text-foreground">
                      What did Jesus mean when he said he came to "fulfill the law" rather than
                      abolish it, and how does this relate to his subsequent teachings where he seems
                      to modify traditional commandments?
                    </p>
                    <p className="text-xs text-muted-foreground">Matthew 5:17</p>
                  </Card>
                  <div className="flex items-center justify-between px-2">
                    <Button variant="ghost" size="sm" disabled className="text-muted-foreground">
                      &lt; Prev
                    </Button>
                    <Button variant="ghost" size="sm" disabled className="text-muted-foreground">
                      Next &gt;
                    </Button>
                  </div>
                </div>
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

        {/* Upload Button */}
        <div className="pt-4 pb-8">
          <Button
            onClick={handleUploadScroll}
            className="w-full h-14 bg-foreground text-background hover:bg-foreground/90 rounded-xl font-semibold text-lg"
          >
            Upload Scroll
          </Button>
          <p className="text-center text-xs text-muted-foreground mt-3">
            This is a demo scroll. No data will be saved.
          </p>
        </div>
      </main>
    </div>
  );
};

export default DemoScroll;
