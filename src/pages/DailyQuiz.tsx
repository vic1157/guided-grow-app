import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  verseReference: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "According to Jeremiah 29:11, what kind of plans does the LORD have for His people?",
    options: [
      "Plans to harm them and bring disaster",
      "Plans to prosper them and give them hope and a future",
      "Plans to leave them in exile forever",
      "Plans that are unknown and mysterious"
    ],
    correctAnswer: 1,
    explanation: "God clearly states His intentions are for welfare, not evil, and to give hope and a future.",
    verseReference: "Jeremiah 29:11"
  },
  {
    id: 2,
    question: "How long does God say the exile in Babylon will last?",
    options: [
      "40 years",
      "100 years",
      "70 years",
      "Forever"
    ],
    correctAnswer: 2,
    explanation: "God promises that after 70 years are completed for Babylon, He will visit His people and bring them back.",
    verseReference: "Jeremiah 29:10"
  },
  {
    id: 3,
    question: "What does God promise will happen when His people seek Him?",
    options: [
      "They will remain in exile",
      "They will be ignored",
      "They will find Him when they seek Him with all their heart",
      "They must wait another 70 years"
    ],
    correctAnswer: 2,
    explanation: "God promises that when we seek Him with all our heart, we will find Him.",
    verseReference: "Jeremiah 29:13"
  },
  {
    id: 4,
    question: "What will God do for His people after they call upon Him and pray to Him?",
    options: [
      "He will listen to them",
      "He will test them further",
      "He will remain silent",
      "He will send more prophets"
    ],
    correctAnswer: 0,
    explanation: "God promises to listen when His people call upon Him and come to pray to Him.",
    verseReference: "Jeremiah 29:12"
  },
  {
    id: 5,
    question: "What does God promise to do once He brings His people back?",
    options: [
      "Send them to another land",
      "Restore their fortunes",
      "Make them servants",
      "Test them again"
    ],
    correctAnswer: 1,
    explanation: "God promises to restore the fortunes of His people and gather them from all the nations.",
    verseReference: "Jeremiah 29:14"
  }
];

const DailyQuiz = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === QUIZ_QUESTIONS.length - 1;
  const hasSelectedAnswer = selectedAnswers[currentQuestionIndex] !== undefined;

  const handleSelectAnswer = (optionIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setShowResults(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const handleFinish = () => {
    navigate("/home", { state: { dailyQuizCompleted: true } });
  };

  const calculateScore = () => {
    let correct = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === QUIZ_QUESTIONS[index].correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / QUIZ_QUESTIONS.length) * 100);

    return (
      <div className="min-h-screen bg-background pb-20">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-card border-b-2 border-foreground/30">
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-center">
            <h1 className="text-lg font-semibold text-foreground">Quiz Results</h1>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
          {/* Score Card */}
          <Card className="p-6 text-center space-y-4 border-2 border-foreground/20">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-foreground">{percentage}%</h2>
              <p className="text-muted-foreground">
                You got {score} out of {QUIZ_QUESTIONS.length} questions correct
              </p>
            </div>
            <div className="pt-4">
              <Button
                onClick={handleFinish}
                className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 rounded-full font-semibold"
              >
                Complete Quiz
              </Button>
            </div>
          </Card>

          {/* Question Review */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Review Your Answers</h3>
            {QUIZ_QUESTIONS.map((question, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;

              return (
                <Card key={question.id} className="p-5 space-y-4 border-2 border-foreground/20">
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                    )}
                    <div className="flex-1 space-y-3">
                      <p className="font-semibold text-foreground">{question.question}</p>

                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => {
                          const isUserAnswer = userAnswer === optionIndex;
                          const isCorrectAnswer = optionIndex === question.correctAnswer;

                          return (
                            <div
                              key={optionIndex}
                              className={cn(
                                "p-3 rounded-lg border-2 text-sm",
                                isCorrectAnswer && "bg-green-50 border-green-600 dark:bg-green-950/20",
                                isUserAnswer && !isCorrectAnswer && "bg-red-50 border-red-600 dark:bg-red-950/20",
                                !isUserAnswer && !isCorrectAnswer && "border-border"
                              )}
                            >
                              <div className="flex items-center justify-between">
                                <span className={cn(
                                  isCorrectAnswer && "font-semibold text-green-700 dark:text-green-400",
                                  isUserAnswer && !isCorrectAnswer && "font-semibold text-red-700 dark:text-red-400"
                                )}>
                                  {option}
                                </span>
                                {isCorrectAnswer && (
                                  <span className="text-xs text-green-700 dark:text-green-400">Correct</span>
                                )}
                                {isUserAnswer && !isCorrectAnswer && (
                                  <span className="text-xs text-red-700 dark:text-red-400">Your answer</span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="bg-accent/50 p-3 rounded-lg space-y-1">
                        <p className="text-sm text-foreground">{question.explanation}</p>
                        <p className="text-xs text-muted-foreground">{question.verseReference}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </main>
      </div>
    );
  }

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
          <h1 className="text-lg font-semibold text-foreground">Daily Quiz</h1>
          <div className="w-16" />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}
            </span>
            <span className="text-muted-foreground">
              {Math.round(((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-foreground h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <Card className="p-6 space-y-6 border-2 border-foreground/20">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{currentQuestion.verseReference}</p>
            <h2 className="text-xl font-semibold text-foreground">{currentQuestion.question}</h2>
          </div>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswers[currentQuestionIndex] === index;
              const letter = String.fromCharCode(65 + index); // A, B, C, D

              return (
                <button
                  key={index}
                  onClick={() => handleSelectAnswer(index)}
                  className={cn(
                    "w-full p-4 rounded-xl border-2 text-left transition-all",
                    "hover:scale-[1.02] active:scale-[0.98]",
                    isSelected
                      ? "border-foreground bg-accent"
                      : "border-border hover:border-muted-foreground"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 font-semibold text-sm",
                        isSelected
                          ? "border-foreground bg-foreground text-background"
                          : "border-muted-foreground text-muted-foreground"
                      )}
                    >
                      {letter}
                    </div>
                    <span className={cn("text-sm", isSelected && "font-medium text-foreground")}>
                      {option}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="flex-1 h-12 rounded-full"
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={!hasSelectedAnswer}
            className="flex-1 h-12 bg-foreground text-background hover:bg-foreground/90 rounded-full font-semibold"
          >
            {isLastQuestion ? "See Results" : "Next"}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default DailyQuiz;
