import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface SurveyMessage {
  id: string;
  sender: 'user' | 'leo';
  content: string;
  timestamp: string;
}

// Survey questions (same as Survey.tsx for compatibility)
const SURVEY_QUESTIONS = [
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

// Varied acknowledgment messages to avoid fatigue
const LEO_ACKNOWLEDGMENTS = [
  "Thanks for sharing that!",
  "Got it, that's helpful.",
  "I appreciate you telling me.",
  "That gives me good insight.",
  "Thanks! That helps me understand.",
  "Interesting, thanks for sharing.",
  "Good to know!",
  "That's really helpful.",
  "Thanks for being open about that.",
  "I see, that makes sense.",
];

const InteractiveSurvey = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<SurveyMessage[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
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
  const [isTyping, setIsTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, showOptions]);

  // Start the survey with intro message, then first question
  useEffect(() => {
    setIsTyping(true);

    // Show intro message first
    setTimeout(() => {
      setMessages([{
        id: 'intro',
        sender: 'leo',
        content: "In order to personalize the RYB experience, please share a bit about your reading habits and spiritual journey!",
        timestamp: 'now'
      }]);
      setIsTyping(false);

      // Then ask first question after a brief pause
      setTimeout(() => {
        askQuestion(0);
      }, 600);
    }, 800);
  }, []);

  const askQuestion = (questionIndex: number) => {
    setShowOptions(false);
    setIsTyping(true);

    setTimeout(() => {
      const question = SURVEY_QUESTIONS[questionIndex];
      setMessages(prev => [...prev, {
        id: `question-${questionIndex}`,
        sender: 'leo',
        content: question.label,
        timestamp: 'now'
      }]);
      setIsTyping(false);
      setShowOptions(true);
    }, 800);
  };

  const handleSelectAnswer = (optionText: string) => {
    setShowOptions(false);

    // Add user's answer as a message
    const userMessage: SurveyMessage = {
      id: `answer-${currentQuestionIndex}`,
      sender: 'user',
      content: optionText,
      timestamp: 'now'
    };
    setMessages(prev => [...prev, userMessage]);

    // Update answers state (for compatibility with survey-results)
    const questionId = SURVEY_QUESTIONS[currentQuestionIndex].id as keyof typeof answers;
    const updatedAnswers = { ...answers, [questionId]: optionText };
    setAnswers(updatedAnswers);

    // Show Leo's acknowledgment + next question (or completion)
    setIsTyping(true);

    setTimeout(() => {
      if (currentQuestionIndex < SURVEY_QUESTIONS.length - 1) {
        // Add acknowledgment
        const ackMessage: SurveyMessage = {
          id: `ack-${currentQuestionIndex}`,
          sender: 'leo',
          content: LEO_ACKNOWLEDGMENTS[currentQuestionIndex % LEO_ACKNOWLEDGMENTS.length],
          timestamp: 'now'
        };
        setMessages(prev => [...prev, ackMessage]);
        setIsTyping(false);

        // Proceed to next question
        const nextIndex = currentQuestionIndex + 1;
        setCurrentQuestionIndex(nextIndex);

        setTimeout(() => {
          askQuestion(nextIndex);
        }, 500);
      } else {
        // Survey complete
        const completionMessage: SurveyMessage = {
          id: 'completion',
          sender: 'leo',
          content: "Thank you for sharing all of that with me! I now have a much better understanding of your spiritual journey. Let me prepare your personalized results...",
          timestamp: 'now'
        };
        setMessages(prev => [...prev, completionMessage]);
        setIsTyping(false);
        setIsComplete(true);

        // Navigate after a brief moment
        setTimeout(() => {
          console.log("Survey answers:", updatedAnswers);
          navigate("/survey-results");
        }, 2000);
      }
    }, 800);
  };

  const currentQuestion = SURVEY_QUESTIONS[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex + 1) / SURVEY_QUESTIONS.length) * 100;

  return (
    <div className="fixed inset-0 flex flex-col bg-background">
      {/* Header with Progress */}
      <header className="flex-shrink-0 bg-card border-b-2 border-foreground/30 z-10">
        <div className="max-w-2xl mx-auto px-4 py-3 space-y-2">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-5 w-5" />
              <span>Back</span>
            </Button>
            <h1 className="flex-1 text-lg font-semibold text-foreground text-center">
              Getting to Know You
            </h1>
            <div className="w-16 text-right">
              <span className="text-sm text-muted-foreground">
                {currentQuestionIndex + 1}/{SURVEY_QUESTIONS.length}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-muted rounded-full h-1.5">
            <div
              className="bg-foreground h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </header>

      {/* Messages Area */}
      <main className="flex-1 overflow-y-auto overscroll-contain min-h-0">
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
          {messages.map((message) => (
            message.sender === 'leo' ? (
              // Assistant message - left aligned, no avatar
              <div key={message.id} className="flex items-start">
                <div className="bg-muted rounded-lg p-3 max-w-[85%]">
                  <p className="text-sm text-foreground leading-relaxed">{message.content}</p>
                </div>
              </div>
            ) : (
              // User message - right aligned
              <div key={message.id} className="flex items-start justify-end">
                <div className="bg-foreground text-background rounded-lg p-3 max-w-[85%]">
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            )
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-start">
              <div className="bg-muted rounded-lg p-3">
                <p className="text-sm text-muted-foreground">typing...</p>
              </div>
            </div>
          )}

          {/* Inline Options */}
          {showOptions && !isComplete && (
            <div className="flex flex-col gap-2">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectAnswer(option)}
                  className="w-full p-3 rounded-xl border-2 border-border text-left text-sm
                             hover:border-foreground/50 hover:bg-accent active:scale-[0.98] transition-all"
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>
    </div>
  );
};

export default InteractiveSurvey;
