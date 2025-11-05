import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface OnboardingTask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const OnboardingProgress = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(true);

  // Check localStorage for completed tasks
  const isProfileComplete = localStorage.getItem("profileOnboardingComplete") === "true";
  const isReadingGoalsComplete = localStorage.getItem("readingGoalsOnboardingComplete") === "true";
  const isScrollWalkthroughComplete = localStorage.getItem("scrollWalkthroughComplete") === "true";

  const [tasks, setTasks] = useState<OnboardingTask[]>([
    {
      id: "1",
      title: "Complete Your Profile",
      description: "Add a profile photo and testimony",
      completed: isProfileComplete,
    },
    {
      id: "2",
      title: "Set Your Reading Goals",
      description: "Choose how often you want to read and enable reminders",
      completed: isReadingGoalsComplete,
    },
    {
      id: "3",
      title: "RYB Scroll Walkthrough",
      description: "Understand how to track and interact with your Bible reading activity",
      completed: isScrollWalkthroughComplete,
    },
    {
      id: "4",
      title: "Complete Your First Reading",
      description: "Generate your first scroll",
      completed: false,
    },
    {
      id: "5",
      title: "Ask Leo Your First Question",
      description: "Ask Leo a Bible-related question and get an instant-response",
      completed: false,
    },
    {
      id: "6",
      title: "Take Your First Quiz",
      description: "Test your knowledge on what you read",
      completed: false,
    },
  ]);

  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const progressPercentage = (completedTasks / totalTasks) * 100;

  // Update tasks when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const isProfileComplete = localStorage.getItem("profileOnboardingComplete") === "true";
      const isReadingGoalsComplete = localStorage.getItem("readingGoalsOnboardingComplete") === "true";
      const isScrollWalkthroughComplete = localStorage.getItem("scrollWalkthroughComplete") === "true";

      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (task.id === "1") {
            return { ...task, completed: isProfileComplete };
          } else if (task.id === "2") {
            return { ...task, completed: isReadingGoalsComplete };
          } else if (task.id === "3") {
            return { ...task, completed: isScrollWalkthroughComplete };
          }
          return task;
        })
      );
    };

    // Listen for storage events and custom events
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("onboardingComplete", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("onboardingComplete", handleStorageChange);
    };
  }, []);

  const handleTaskClick = (taskId: string) => {
    // Navigate to specific pages for certain tasks
    if (taskId === "1") {
      // Complete Your Profile
      navigate("/profile?onboarding=true");
      return;
    } else if (taskId === "2") {
      // Set Your Reading Goals
      navigate("/reading-goals?onboarding=true");
      return;
    } else if (taskId === "3") {
      // RYB Scroll Walkthrough
      navigate("/scroll-walkthrough");
      return;
    }

    // For other tasks, just toggle completion
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <Card className="overflow-hidden border-border bg-card">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-card-foreground">Getting Started</h3>
              <span className="text-sm font-medium text-secondary">
                {completedTasks}/{totalTasks}
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-8 w-8 p-0"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="space-y-2 mb-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Your Progress</span>
            <span className="font-medium text-card-foreground">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {isExpanded && (
          <div className="space-y-2 pt-2 border-t border-border">
            {tasks.map((task) => (
              <button
                key={task.id}
                onClick={() => handleTaskClick(task.id)}
                className={cn(
                  "w-full flex items-start gap-3 p-3 rounded-lg transition-all",
                  "hover:bg-accent text-left",
                  task.completed && "opacity-70"
                )}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {task.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={cn(
                      "font-medium text-sm",
                      task.completed
                        ? "line-through text-muted-foreground"
                        : "text-card-foreground"
                    )}
                  >
                    {task.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {task.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default OnboardingProgress;
