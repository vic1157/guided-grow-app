import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Sparkles, TrendingUp, Lock, X, Zap, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Paywall = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "annual">("annual");

  // Mock persona data - would come from user context/state
  const personaName = "The Shepherd";

  const valuePropsByPersona = {
    Shepherd: [
      {
        icon: TrendingUp,
        title: "Daily Streak Tracking",
        description: "Never lose momentum again with visual progress tracking and accountability from friends and family (coming soon)",
      },
      {
        icon: Sparkles,
        title: "Advanced Study Tools",
        description: "Deep-dive into the context of specific chapters, commentary, and historical backgrounds",
      },
      {
        icon: Lock,
        title: "Personalized Reading Suggestions",
        description: "Built for your consistency goals and spiritual rhythm, based on your mood, personal preferences and reading history",
      },
    ],
  };

  const valueProps = valuePropsByPersona.Shepherd;

  const pricingPlans = [
    {
      id: "monthly",
      name: "Monthly",
      price: "$5.99",
      period: "/month",
      denarii: "80,000 denarii/mo",
      badge: null,
      savings: null,
    },
    {
      id: "annual",
      name: "Annual",
      price: "$49.99",
      period: "/year",
      denarii: "1,000,000 denarii/yr",
      badge: "Best Value",
      savings: "Save 30%",
    },
  ];

  const features = [
    { name: "Archive your daily bible activity (as scrolls)", free: true, premium: true },
    { name: "Offline reading access", free: true, premium: true },
    { name: "Social interactions (coming soon)", free: true, premium: true },
    { name: "Streak & Bible activity analytics", free: true, premium: true },
    { name: "AI chat with Leo (limited)", free: "5/day", premium: true },
    { name: "AI powered reading suggestions", free: "5/week", premium: true },
    { name: "AI powered chapter context & background", free: "3/week", premium: true },
    { name: "AI quizzes based on your recent readings", free: "3/week", premium: true },
    
  ];

  const handleStartTrial = () => {
    // TODO: Implement payment flow
    console.log("Starting trial with plan:", selectedPlan);
    navigate("/home");
  };

  const handleContinueFree = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-accent via-background to-background">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="relative max-w-4xl mx-auto px-6 py-12 text-center">
          <Badge variant="secondary" className="mb-4 px-4 py-1">
            <Sparkles className="h-3 w-3 mr-1 inline" />
            Personalized for {personaName}
          </Badge>
          <h1 className="text-4xl font-bold text-foreground mb-3">
            Ready to unlock your full potential?
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Your personalized journey starts here. Get everything you need to maintain your consistency and
            deepen your walk with God.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-12">
        {/* Value Props */}
        <div className="grid md:grid-cols-3 gap-6">
          {valueProps.map((prop, index) => {
            const Icon = prop.icon;
            return (
              <Card key={index} className="p-6 bg-card border-border text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-foreground/10 mb-4">
                  <Icon className="h-6 w-6 text-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{prop.title}</h3>
                <p className="text-sm text-muted-foreground">{prop.description}</p>
              </Card>
            );
          })}
        </div>

        {/* Denarii Explanation */}
        <Card className="p-6 bg-accent/50 border-border">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-foreground/10 mb-3">
                <Sparkles className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                What are Denarii?
              </h3>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-foreground leading-relaxed text-center mb-8">
                Denarii are credits that power AI-enhanced features in RYB. Think of them as fuel for your personalized spiritual journey with Leo, your AI guide.
              </p>

                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="h-4 w-4 text-foreground" />
                      <h4 className="text-sm font-semibold text-foreground">AI-Powered Features</h4>
                    </div>
                    <ul className="space-y-1.5 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-foreground mt-1">•</span>
                        <span>Scroll Summaries</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-foreground mt-1">•</span>
                        <span>Interactive Quizzes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-foreground mt-1">•</span>
                        <span>Leo Chatbot Conversations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-foreground mt-1">•</span>
                        <span>Chapter Context & Analysis</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-foreground mt-1">•</span>
                        <span>Personalized Reading Recommendations</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="h-4 w-4 text-foreground" />
                      <h4 className="text-sm font-semibold text-foreground">Always Free Features</h4>
                    </div>
                    <ul className="space-y-1.5 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-foreground mt-1">•</span>
                        <span>Bible Reading</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-foreground mt-1">•</span>
                        <span>Scrolls (Activity Tracking)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-foreground mt-1">•</span>
                        <span>Social Interactions & Comments</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-foreground mt-1">•</span>
                        <span>Reading Streaks</span>
                      </li>
                    </ul>
                  </div>
                </div>

              <div className="mt-4 p-3 bg-background/50 rounded-lg border border-border">
                <p className="text-xs text-muted-foreground italic">
                  <span className="font-semibold text-foreground">Remember:</span> AI-powered features are enhancements to your Bible reading experience, not necessities. You can still strengthen your spirutual walk with our free features alone and we're here to support you regardless.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Pricing Section */}
        <div className="space-y-6">
          <div className="text-center space-y-3">
            <h2 className="text-2xl font-bold text-foreground">Choose Your Plan</h2>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              RYB is free to use forever. Each plan includes Denarii to unleash your experience with AI-powered features like Leo chat, chapter context, and personalized insights.
            </p>
            <p className="text-xs text-muted-foreground">
              Start with a 7-day free trial. Cancel anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {pricingPlans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative p-6 cursor-pointer transition-all ${
                  selectedPlan === plan.id
                    ? "border-foreground bg-accent"
                    : "border-border bg-card hover:border-muted-foreground"
                }`}
                onClick={() => setSelectedPlan(plan.id as "monthly" | "annual")}
              >
                {plan.badge && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-foreground text-background">
                    {plan.badge}
                  </Badge>
                )}
                <div className="text-center space-y-3">
                  <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
                  <div>
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-sm text-muted-foreground">{plan.period}</span>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xs text-muted-foreground">{plan.denarii}</p>
                    <p className="text-[10px] text-muted-foreground/70">to enhance with AI</p>
                  </div>
                  {plan.savings && (
                    <Badge variant="secondary" className="text-xs">
                      {plan.savings}
                    </Badge>
                  )}
                  <div className="pt-2">
                    <div
                      className={`w-5 h-5 rounded-full border-2 mx-auto transition-all ${
                        selectedPlan === plan.id
                          ? "border-foreground bg-foreground"
                          : "border-border"
                      }`}
                    >
                      {selectedPlan === plan.id && (
                        <Check className="h-3 w-3 text-background m-auto mt-0.5" />
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Feature Comparison */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground text-center mb-6">
            What's Included
          </h2>
          <Card className="overflow-hidden border-border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-accent">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                      Feature
                    </th>
                    <th className="text-center px-6 py-4 text-sm font-semibold text-foreground">
                      Free
                    </th>
                    <th className="text-center px-6 py-4 text-sm font-semibold text-foreground bg-foreground/5">
                      Premium
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-background" : "bg-accent/30"}
                    >
                      <td className="px-6 py-4 text-sm text-foreground">{feature.name}</td>
                      <td className="px-6 py-4 text-center">
                        {typeof feature.free === "boolean" ? (
                          feature.free ? (
                            <Check className="h-5 w-5 text-foreground mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-muted-foreground mx-auto" />
                          )
                        ) : (
                          <span className="text-sm text-muted-foreground">{feature.free}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center bg-foreground/5">
                        {typeof feature.premium === "boolean" ? (
                          feature.premium ? (
                            <Check className="h-5 w-5 text-foreground mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-muted-foreground mx-auto" />
                          )
                        ) : (
                          <span className="text-sm text-foreground font-medium">
                            {feature.premium}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Social Proof */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Join <span className="font-semibold text-foreground">10,000+ believers</span> growing
            with RYB Premium
          </p>
        </div>

        {/* CTAs */}
        <div className="space-y-4 max-w-md mx-auto pb-8">
          <Button
            onClick={handleStartTrial}
            className="w-full h-14 bg-foreground text-background hover:bg-foreground/90 rounded-xl font-semibold text-lg"
          >
            Start 7-Day Free Trial
          </Button>
          <Button
            onClick={handleContinueFree}
            variant="ghost"
            className="w-full h-12 text-foreground hover:bg-accent rounded-xl font-medium"
          >
            Continue with Free Plan
          </Button>
          <p className="text-center text-xs text-muted-foreground pt-2">
            Not ready yet? No problem. Start free and upgrade anytime.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Paywall;
