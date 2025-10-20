import { useNavigate } from "react-router-dom";
import { BookOpen, CheckCircle2, Edit3, Brain, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const EmailConfirmed = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/home");
  };

  const features = [
    {
      icon: Edit3,
      title: "Captures your personal reflections, questions and insights generated from reading",
    },
    {
      icon: Brain,
      title: "Reinforce what you've learned through personalized quizzes based on your recent readings",
    },
    {
      icon: MessageCircle,
      title: "Get immediate answers to your Bible questions without leaving the app",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-between px-8 py-12">
      <div className="w-full max-w-md flex-1 flex flex-col items-center justify-center">
        <div className="bg-accent rounded-3xl p-6 mb-4">
          <BookOpen className="h-12 w-12 text-foreground" strokeWidth={1.5} />
        </div>
        
        <h1 className="text-2xl font-bold text-foreground mb-1">RYB</h1>
        <p className="text-sm text-muted-foreground mb-12">Read Your Bible</p>

        <div className="bg-accent rounded-full p-8 mb-6">
          <CheckCircle2 className="h-16 w-16 text-foreground" strokeWidth={2} />
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-3">
          Email Verified!
        </h2>
        <p className="text-sm text-muted-foreground text-center mb-8 px-4">
          Your email has been successfully verified.<br />
          You're all set to start your Bible reading journey!
        </p>

        <Button
          onClick={handleContinue}
          className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 rounded-xl font-medium mb-8"
        >
          Continue to App Overview
        </Button>

        <div className="w-full space-y-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="p-4 bg-accent border-border flex items-start gap-3"
              >
                <div className="mt-0.5">
                  <Icon className="h-5 w-5 text-foreground" strokeWidth={1.5} />
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  {feature.title}
                </p>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="h-1 w-32 bg-foreground rounded-full" />
    </div>
  );
};

export default EmailConfirmed;
