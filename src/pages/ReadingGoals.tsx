import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Bell, Target } from "lucide-react";
import { cn } from "@/lib/utils";

const ReadingGoals = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isOnboarding = searchParams.get("onboarding") === "true";

  const [onboardingStep, setOnboardingStep] = useState(1);
  const [showOnboardingModal, setShowOnboardingModal] = useState(isOnboarding);
  const [selectedGoal, setSelectedGoal] = useState<string>("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [notificationTime, setNotificationTime] = useState("09:00");

  useEffect(() => {
    if (isOnboarding) {
      setShowOnboardingModal(true);
    }
  }, [isOnboarding]);

  const readingGoals = [
    { id: "daily", label: "Daily", description: "Read every day" },
    { id: "5-times", label: "5 times a week", description: "Read 5 days per week" },
    { id: "3-times", label: "3 times a week", description: "Read 3 days per week" },
    { id: "weekly", label: "Weekly", description: "Read once a week" },
  ];

  const handleNextStep = () => {
    if (onboardingStep === 1) {
      setOnboardingStep(2);
    } else if (onboardingStep === 2) {
      // Complete onboarding
      localStorage.setItem("readingGoalsOnboardingComplete", "true");
      localStorage.setItem("readingGoal", selectedGoal);
      localStorage.setItem("notificationsEnabled", notificationsEnabled.toString());
      localStorage.setItem("notificationTime", notificationTime);

      // Dispatch custom event to update OnboardingProgress
      window.dispatchEvent(new Event("onboardingComplete"));

      setShowOnboardingModal(false);
      navigate("/home");
    }
  };

  const handleSkipStep = () => {
    if (onboardingStep === 1) {
      setOnboardingStep(2);
    } else {
      setShowOnboardingModal(false);
      navigate("/home");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Onboarding Modal */}
      {showOnboardingModal && (
        <div className="fixed inset-0 bg-background/95 z-50 flex items-center justify-center p-6">
          <Card className="w-full max-w-lg p-8 space-y-6">
            {/* Progress Indicator */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <div
                className={`h-2 w-16 rounded-full ${
                  onboardingStep >= 1 ? "bg-foreground" : "bg-muted-foreground/30"
                }`}
              />
              <div
                className={`h-2 w-16 rounded-full ${
                  onboardingStep >= 2 ? "bg-foreground" : "bg-muted-foreground/30"
                }`}
              />
            </div>

            {/* Step 1: Set Reading Goal */}
            {onboardingStep === 1 && (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-foreground/10 mb-2">
                    <Target className="h-8 w-8 text-foreground" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Set Your Reading Goal</h2>
                  <p className="text-sm text-muted-foreground">
                    How often would you like to read the Bible?
                  </p>
                </div>

                <div className="space-y-3">
                  {readingGoals.map((goal) => (
                    <button
                      key={goal.id}
                      onClick={() => setSelectedGoal(goal.id)}
                      className={cn(
                        "w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all text-left",
                        selectedGoal === goal.id
                          ? "border-foreground bg-accent"
                          : "border-border hover:border-muted-foreground"
                      )}
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">{goal.label}</p>
                        <p className="text-sm text-muted-foreground">{goal.description}</p>
                      </div>
                      {selectedGoal === goal.id && (
                        <div className="flex-shrink-0 bg-foreground rounded-full p-1">
                          <Check className="h-4 w-4 text-background" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleSkipStep}
                    variant="outline"
                    className="flex-1 h-12 rounded-xl"
                  >
                    Skip for Now
                  </Button>
                  <Button
                    onClick={handleNextStep}
                    disabled={!selectedGoal}
                    className="flex-1 h-12 rounded-xl disabled:opacity-50"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Set Notifications */}
            {onboardingStep === 2 && (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-foreground/10 mb-2">
                    <Bell className="h-8 w-8 text-foreground" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Enable Reminders</h2>
                  <p className="text-sm text-muted-foreground">
                    Stay on track with daily reading reminders
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Enable/Disable Toggle */}
                  <button
                    onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                    className={cn(
                      "w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all",
                      notificationsEnabled
                        ? "border-foreground bg-accent"
                        : "border-border hover:border-muted-foreground"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5 text-foreground" />
                      <div className="text-left">
                        <p className="font-semibold text-foreground">Daily Reminders</p>
                        <p className="text-sm text-muted-foreground">
                          Get notified to read your Bible
                        </p>
                      </div>
                    </div>
                    <div
                      className={cn(
                        "w-12 h-6 rounded-full transition-colors relative",
                        notificationsEnabled ? "bg-foreground" : "bg-muted-foreground/30"
                      )}
                    >
                      <div
                        className={cn(
                          "absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform",
                          notificationsEnabled ? "translate-x-6" : "translate-x-0.5"
                        )}
                      />
                    </div>
                  </button>

                  {/* Time Picker (only show if enabled) */}
                  {notificationsEnabled && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Reminder Time
                      </label>
                      <input
                        type="time"
                        value={notificationTime}
                        onChange={(e) => setNotificationTime(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground focus:border-foreground outline-none"
                      />
                      <p className="text-xs text-muted-foreground">
                        We'll send you a reminder at this time each day
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleSkipStep}
                    variant="outline"
                    className="flex-1 h-12 rounded-xl"
                  >
                    Skip for Now
                  </Button>
                  <Button onClick={handleNextStep} className="flex-1 h-12 rounded-xl">
                    Complete Setup
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      )}

      {/* Regular page content (if not in onboarding mode) */}
      {!showOnboardingModal && (
        <div className="min-h-screen flex items-center justify-center p-6">
          <Card className="p-8 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Reading Goals</h1>
            <p className="text-muted-foreground">Your reading goals page</p>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ReadingGoals;
