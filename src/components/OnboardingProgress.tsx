import { useState } from "react";
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
  const [isExpanded, setIsExpanded] = useState(true);
  const [tasks, setTasks] = useState<OnboardingTask[]>([
    {
      id: "1",
      title: "Complete Your Profile",
      description: "Add your name and photo",
      completed: true,
    },
    {
      id: "2",
      title: "Set Your Reading Goals",
      description: "Choose how often you want to read",
      completed: true,
    },
    {
      id: "3",
      title: "Select Your Bible Version",
      description: "Pick your preferred translation",
      completed: false,
    },
    {
      id: "4",
      title: "Complete Your First Reading",
      description: "Read your first passage",
      completed: false,
    },
    {
      id: "5",
      title: "Enable Notifications",
      description: "Stay on track with daily reminders",
      completed: false,
    },
  ]);

  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const progressPercentage = (completedTasks / totalTasks) * 100;

  const toggleTask = (taskId: string) => {
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
                onClick={() => toggleTask(task.id)}
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
