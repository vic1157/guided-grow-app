import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const Survey = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // State for all 10 questions
  const [answers, setAnswers] = useState({
    question1: "",
    question2: "",
    question3: "",
    question4: "",
    question5: "",
    question6: "",
    question7: "",
    question8: "",
    question9: "",
    question10: "",
  });

  const handleAnswerChange = (question: string, value: string) => {
    setAnswers({
      ...answers,
      [question]: value,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Last question - submit and navigate
      console.log("Survey answers:", answers);
      navigate("/home");
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSkip = () => {
    // TODO: Implement skip logic
    navigate("/home");
  };

  const handleBack = () => {
    navigate(-1);
  };

  // Calculate progress based on answered questions
  const answeredCount = Object.values(answers).filter((answer) => answer !== "").length;
  const progressPercentage = (answeredCount / Object.keys(answers).length) * 100;

  // Generate persona traits based on answers (placeholder logic)
  const getPersonaTraits = () => {
    const traits: string[] = [];
    if (answers.question1) traits.push("Evening Reader");
    if (answers.question2) traits.push("Weekly Habit");
    // Add more logic based on actual questions
    return traits;
  };

  const personaTraits = getPersonaTraits();

  // Question configurations - to be replaced with actual questions
  const questions = [
    {
      id: "question1",
      label: "Question 1",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    },
    {
      id: "question2",
      label: "Question 2",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    },
    {
      id: "question3",
      label: "Question 3",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    },
    {
      id: "question4",
      label: "Question 4",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    },
    {
      id: "question5",
      label: "Question 5",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    },
    {
      id: "question6",
      label: "Question 6",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    },
    {
      id: "question7",
      label: "Question 7",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    },
    {
      id: "question8",
      label: "Question 8",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    },
    {
      id: "question9",
      label: "Question 9",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    },
    {
      id: "question10",
      label: "Question 10",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <button
          onClick={handleBack}
          className="p-2 hover:bg-accent rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>

        <p className="text-sm font-medium text-muted-foreground">
          Step {currentQuestionIndex + 1} of {questions.length}
        </p>

        <button
          onClick={handleSkip}
          className="text-sm font-medium text-foreground hover:text-foreground/80 transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-accent h-1">
        <div
          className="bg-foreground h-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Tell us about yourself
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            Help us personalize your Bible reading experience by sharing a bit about your current reading habits.
          </p>

          {/* Current Question */}
          <div className="space-y-3">
            <Label className="text-base font-medium text-foreground">
              {questions[currentQuestionIndex].label}
            </Label>
            <RadioGroup
              value={answers[questions[currentQuestionIndex].id as keyof typeof answers]}
              onValueChange={(value) => handleAnswerChange(questions[currentQuestionIndex].id, value)}
              className="space-y-2"
            >
              {questions[currentQuestionIndex].options.map((option, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 border rounded-lg px-4 py-3 cursor-pointer transition-all ${
                    answers[questions[currentQuestionIndex].id as keyof typeof answers] === option
                      ? "border-foreground bg-accent"
                      : "border-border hover:border-muted-foreground"
                  }`}
                  onClick={() => handleAnswerChange(questions[currentQuestionIndex].id, option)}
                >
                  <RadioGroupItem value={option} id={`${questions[currentQuestionIndex].id}-${index}`} />
                  <Label
                    htmlFor={`${questions[currentQuestionIndex].id}-${index}`}
                    className="flex-1 cursor-pointer text-sm font-normal"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border bg-background">
        <div className="max-w-md mx-auto px-6 py-4 space-y-4">
          {/* Reading Persona Section */}
          {personaTraits.length > 0 && (
            <div className="flex items-start gap-3 p-4 bg-accent rounded-lg">
              <div className="bg-background rounded-full p-2 mt-0.5">
                <User className="h-4 w-4 text-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  Your Reading Persona
                </h3>
                <p className="text-xs text-muted-foreground mb-2">
                  Building your profile...
                </p>
                <div className="flex flex-wrap gap-2">
                  {personaTraits.map((trait, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-background text-foreground text-xs px-3 py-1 rounded-full"
                    >
                      {trait}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
              variant="outline"
              className="flex-1 h-12 border-border rounded-xl font-medium disabled:opacity-50"
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
              className="flex-1 h-12 bg-foreground text-background hover:bg-foreground/90 rounded-xl font-medium"
            >
              {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Survey;