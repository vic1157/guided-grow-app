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
      navigate("/survey-results");
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
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

  // Question configurations
  const questions = [
    {
      id: "question1",
      label: "What best describes your relationship with the Bible?",
      options: [
        "I read regularly and feel spiritually nourished.",
        "I try to read but struggle to stay on track.",
        "I connect more through worship or prayer than reading Scripture.",
        "I find Scripture hard to understand or apply.",
        "I'm ready for deeper, more challenging study.",
      ],
    },
    {
      id: "question2",
      label: "Which type of spiritual content draws you in the most?",
      options: [
        "Emotionally healing messages that touch the heart.",
        "In-depth biblical teaching and analysis.",
        "Clear, practical lessons I can apply today.",
        "Purpose-driven content about mission and calling.",
        "Insightful reflections that stretch how I think.",
      ],
    },
    {
      id: "question3",
      label: "What's your biggest challenge with Bible study?",
      options: [
        "Staying consistent or building a regular habit.",
        "Understanding what I read and how it applies.",
        "Feeling emotionally engaged or connected with it.",
        "Finding content that challenges me beyond basics.",
        "Needing shorter, more digestible sessions.",
      ],
    },
    {
      id: "question4",
      label: "Which statement feels most true right now?",
      options: [
        "I need to rebuild or strengthen my relationship with God.",
        "I want to hear God's voice more clearly in my life.",
        "I feel spiritually dry and seek fresh connection.",
        "I'm doing okay but desire deeper growth.",
        "I want more clarity about my purpose and calling.",
      ],
    },
    {
      id: "question5",
      label: "How do you best grow in your walk with God?",
      options: [
        "Through worship, music, or relational connection.",
        "Through deep study, learning, and discovery.",
        "Through action, service, and living out faith.",
        "Through structure, discipline, and spiritual habits.",
        "Through quiet reflection, journaling, and prayer.",
      ],
    },
    {
      id: "question6",
      label: "What do you crave most right now in your spiritual life?",
      options: [
        "Consistency and a stable rhythm with God.",
        "Clear understanding of who I am and what I'm called to do.",
        "Emotional healing, freedom, and renewal.",
        "A richer understanding of Scripture and its meaning.",
        "A stronger sense of God's presence and proximity.",
      ],
    },
    {
      id: "question7",
      label: "What frustrates you most about Christian content?",
      options: [
        "It's too shallow or generic—less meaningful impact.",
        "It lacks authenticity—emotion, real struggle, transparency.",
        "It doesn't feel relevant to my real everyday life.",
        "It's overwhelming, heavy, or hard to stick with.",
        "It doesn't push me to grow spiritually or think differently.",
      ],
    },
    {
      id: "question8",
      label: "When do you usually connect with God the most?",
      options: [
        "In early mornings, during quiet time or prayer.",
        "During worship, music, or emotional encounters.",
        "While reading, studying, or learning the Word.",
        "While serving or doing something for others.",
        "In quiet reflection, journaling, or processing life with God.",
      ],
    },
    {
      id: "question9",
      label: "What motivates you to grow spiritually?",
      options: [
        "A hunger to know God's heart and character more deeply.",
        "A desire for emotional wholeness and healing.",
        "A call to live out faith boldly and impactfully.",
        "A need for discipline and spiritual maturity.",
        "Curiosity about truth and spiritual insight.",
      ],
    },
    {
      id: "question10",
      label: "What do you wish spiritual content did better?",
      options: [
        "Helped me establish and keep strong spiritual habits.",
        "Made me feel seen, supported, and emotionally connected.",
        "Gave deeper insight into prophetic or biblical truth.",
        "Showed practical ways to live out my purpose.",
        "Helped me grasp Scripture more clearly and confidently.",
      ],
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

        <div className="w-12" />
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
            Help us personalize your Bible reading experience by sharing a bit about your current reading habits. Please select the option that best describes your current reading habits.
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