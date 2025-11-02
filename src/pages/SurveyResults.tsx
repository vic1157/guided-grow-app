import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Heart, Target, BookOpen } from "lucide-react";

const SurveyResults = () => {
  const navigate = useNavigate();

  // Mock data for The Shepherd persona
  const personaData = {
    name: "The Shepherd",
    tagline: "The Disciplined Guide",
    emoji: "🐑",
    openingMessage:
      "You told me you're trying to read, but struggle to stay on track. I believe what you crave the most is consistency and a stable rhythm with God. I hear you — and I want you to know that your desire for structure isn't a weakness. It's actually a beautiful strength that God can build on. You're someone who values discipline and wants to lead by example, even if that consistency hasn't fully clicked yet.",
    strengths: [
      {
        title: "You're Naturally Structured",
        description:
          "You connect with God best in early mornings during quiet time, and you know that spiritual habits are the foundation of growth. This disciplined approach is your superpower.",
        icon: Target,
      },
      {
        title: "You're Dependable",
        description:
          "When you commit, you show up. You're the type of person others will look to as an example once your rhythm is established—because you lead through consistency, not hype.",
        icon: Heart,
      },
      {
        title: "You Value Practical Application",
        description:
          "You're drawn to clear, practical lessons you can apply today. You don't just want theory—you want tools that actually work in real life.",
        icon: BookOpen,
      },
    ],
    trackDescription:
      'RYB was made for people like you. I know staying consistent has been tough, so we\'ve built features specifically to help you build and maintain that rhythm you\'re craving.',
    features: [
      "Daily Streak Tracking - See your consistency build day by day",
      "Structured Reading Plans - No guesswork, just clear paths forward",
      "Practical Scrolls - Capture insights you can actually apply",
    ],
    nextStep:
      "Let's start simple. I'm going to recommend a 7-day reading streak challenge. We'll take it one day at a time, and I'll be here to encourage you every step of the way.",
    biblicalAnchor: {
      verse: "Commit to the Lord whatever you do, and he will establish your plans.",
      reference: "Proverbs 16:3",
    },
    closingMessage: "You're not building this alone. Let's create something sustainable together.",
  };

  const handleContinue = () => {
    navigate("/paywall");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-accent via-background to-background">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="relative max-w-2xl mx-auto px-6 py-16 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-foreground/10 mb-6">
            <span className="text-5xl">{personaData.emoji}</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-3">
            You are {personaData.name}
          </h1>
          <p className="text-xl text-muted-foreground mb-8">{personaData.tagline}</p>
          <div className="flex items-center justify-center gap-2 text-sm text-foreground">
            <Sparkles className="h-4 w-4" />
            <span>Personalized by Leo, RYB's Personal AI Agent</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-6 py-8 space-y-8">
        {/* Opening Message */}
        <Card className="p-6 bg-card border-border">
          <p className="text-base text-foreground leading-relaxed">{personaData.openingMessage}</p>
        </Card>

        {/* Strengths Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Here's What Makes You Unique</h2>
          <div className="space-y-4">
            {personaData.strengths.map((strength, index) => {
              const Icon = strength.icon;
              return (
                <Card
                  key={index}
                  className="p-5 bg-card border-border hover:border-muted-foreground transition-colors"
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-foreground" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {strength.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {strength.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* How RYB Will Meet You Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">How RYB Will Meet You Where You Are</h2>
          <Card className="p-6 bg-card border-border space-y-4">
            <p className="text-base text-foreground leading-relaxed">
              {personaData.trackDescription}
            </p>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-foreground">Your journey with RYB includes:</p>
              <ul className="space-y-2">
                {personaData.features.map((feature, index) => {
                  const [title, description] = feature.split(" - ");
                  return (
                    <li key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-foreground mt-2" />
                      <span className="text-sm">
                        <span className="text-foreground font-medium">{title}</span>
                        {description && <span className="text-muted-foreground"> - {description}</span>}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Card>
        </div>

        {/* What's Next Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">What's Next</h2>
          <Card className="p-6 bg-accent border-border space-y-4">
            <p className="text-base text-foreground leading-relaxed">{personaData.nextStep}</p>
            <div className="pt-4 border-t border-border">
              <p className="text-sm italic text-muted-foreground mb-1">
                "{personaData.biblicalAnchor.verse}"
              </p>
              <p className="text-xs text-muted-foreground">— {personaData.biblicalAnchor.reference}</p>
            </div>
          </Card>
        </div>

        {/* Closing Message */}
        <Card className="p-6 bg-card border-border text-center space-y-4">
          <p className="text-base text-foreground leading-relaxed">{personaData.closingMessage}</p>
          <p className="text-sm text-muted-foreground">— Leo 📖 ✨</p>
        </Card>

        {/* CTA Button */}
        <div className="pt-4 pb-8">
          <Button
            onClick={handleContinue}
            className="w-full h-14 bg-foreground text-background hover:bg-foreground/90 rounded-xl font-semibold text-lg"
          >
            Begin Your Journey
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SurveyResults;
