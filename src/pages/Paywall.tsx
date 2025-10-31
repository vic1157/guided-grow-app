import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Sparkles, TrendingUp, Lock, X } from "lucide-react";
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
        description: "Never lose momentum again with visual progress tracking",
      },
      {
        icon: Sparkles,
        title: "Advanced Study Tools",
        description: "Deep-dive context, commentary, and historical background",
      },
      {
        icon: Lock,
        title: "Personalized Plans",
        description: "Built for your consistency goals and spiritual rhythm",
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
    { name: "Daily Bible readings", free: true, premium: true },
    { name: "Basic reflection scrolls", free: true, premium: true },
    { name: "AI chat with Eli (limited)", free: "5/day", premium: "Unlimited" },
    { name: "Chapter context & background", free: false, premium: true },
    { name: "Advanced study tools", free: false, premium: true },
    { name: "Streak tracking & analytics", free: false, premium: true },
    { name: "Personalized reading plans", free: false, premium: true },
    { name: "Audio narration", free: false, premium: true },
    { name: "Offline access", free: false, premium: true },
    { name: "Priority support", free: false, premium: true },
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
            Your personalized journey starts here. Get everything you need to build consistency and
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

        {/* Pricing Section */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">Choose Your Plan</h2>
            <p className="text-sm text-muted-foreground">
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
                  <p className="text-xs text-muted-foreground">{plan.denarii}</p>
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
