import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import QuizQuestion from "@/components/QuizQuestion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ChevronLeft,
  Clock,
  ChevronRight,
  Award,
  CheckCircle2,
  XCircle,
  Lightbulb,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  HelpCircle,
  Lock,
  Users,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Interfaces
interface Question {
  id: string;
  type: 'understanding' | 'discussion';
  text: string;
  verseReference?: string;
}

interface Scroll {
  id: string;
  title: string;
  scriptureReference: string;
  duration: string;
  timestamp: string;
  hasQuiz: boolean;
  quizScore?: { correct: number; total: number };
  summary: string;
  questions: Question[];
  reflection: string;
  readingTime: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  verseReference?: string;
}

interface Quiz {
  id: string;
  scrollId: string;
  title: string;
  questions: QuizQuestion[];
}

// Mock data
const mockScrolls: Scroll[] = [
  {
    id: 'scroll-1',
    title: 'Jesus Rises, Sends Disciples',
    scriptureReference: 'Matthew 5:1 - Matthew 5:48',
    duration: '8 mins',
    timestamp: '2hr ago',
    hasQuiz: true,
    quizScore: { correct: 10, total: 15 },
    summary: 'Contains the beginning of Jesus\' Sermon on the Mount, starting with the Beatitudes that describe the blessed nature of the humble, merciful, and peacemakers. Jesus then declares his followers to be "salt of the earth" and "light of the world" before addressing his relationship to the Law.',
    questions: [
      {
        id: 'q1',
        type: 'understanding',
        text: 'What did Jesus mean when he said he came to "fulfill the law" rather than abolish it?',
        verseReference: 'Matthew 5:17'
      }
    ],
    reflection: 'After reading Matthew 5, I find myself struck by the radical nature of Jesus\' call to love enemies and pray for those who persecute us. In my own life, I\'ve been holding onto resentment toward a colleague, but this passage challenges me to see that my anger is keeping me captive to bitterness.',
    readingTime: '7:23'
  },
  {
    id: 'scroll-2',
    title: 'The Lord Is My Shepherd',
    scriptureReference: 'Psalm 23:1 - Psalm 23:6',
    duration: '6 mins',
    timestamp: '18hr ago',
    hasQuiz: true,
    quizScore: { correct: 5, total: 7 },
    summary: 'David\'s beloved psalm about God as shepherd, expressing complete trust in God\'s provision and protection through all circumstances.',
    questions: [],
    reflection: 'This psalm brings me such comfort. The imagery of God as a shepherd is so reassuring.',
    readingTime: '4:12'
  },
  {
    id: 'scroll-3',
    title: 'In the Beginning',
    scriptureReference: 'Genesis 1:1 - Genesis 1:31',
    duration: '20 mins',
    timestamp: '2 days ago',
    hasQuiz: false,
    summary: 'The account of God creating the heavens and earth in six days, culminating with humanity made in His image.',
    questions: [],
    reflection: '',
    readingTime: '18:45'
  },
];

const mockQuizzes: Quiz[] = [
  {
    id: 'quiz-1',
    scrollId: 'scroll-1',
    title: 'Matthew 5 Understanding Quiz',
    questions: [
      {
        id: 'qq1',
        question: 'In the Beatitudes, who did Jesus say would inherit the earth?',
        options: [
          'The poor in spirit',
          'The humble',
          'Those who mourn',
          'The peacemakers'
        ],
        correctAnswer: 1,
        explanation: 'Jesus said "God blesses those who are humble, for they will inherit the whole earth" (Matthew 5:5, NLT)',
        verseReference: 'Matthew 5:5'
      },
      {
        id: 'qq2',
        question: 'What metaphor did Jesus use to describe his followers?',
        options: [
          'Stars of the night',
          'Rivers of living water',
          'Salt of the earth and light of the world',
          'Trees planted by streams'
        ],
        correctAnswer: 2,
        explanation: 'Jesus called believers "the salt of the earth" and "the light of the world" to emphasize their influence and purpose.',
        verseReference: 'Matthew 5:13-14'
      },
      {
        id: 'qq3',
        question: 'According to Jesus, what should we do when someone strikes us on the right cheek?',
        options: [
          'Strike them back',
          'Turn the other cheek',
          'Call the authorities',
          'Run away'
        ],
        correctAnswer: 1,
        explanation: 'Jesus teaches radical non-retaliation: "turn to them the other cheek also" (Matthew 5:39)',
        verseReference: 'Matthew 5:39'
      }
    ]
  },
  {
    id: 'quiz-2',
    scrollId: 'scroll-2',
    title: 'Psalm 23 Comprehension Quiz',
    questions: [
      {
        id: 'qq4',
        question: 'What does the psalmist say about walking through the valley of the shadow of death?',
        options: [
          'I will be afraid',
          'I will fear no evil',
          'I will run away',
          'I will call for help'
        ],
        correctAnswer: 1,
        explanation: 'David expresses complete confidence: "I will fear no evil, for you are with me"',
        verseReference: 'Psalm 23:4'
      },
      {
        id: 'qq5',
        question: 'What does God prepare in the presence of enemies?',
        options: [
          'A battle plan',
          'A feast',
          'An escape route',
          'A shield'
        ],
        correctAnswer: 1,
        explanation: 'God prepares "a feast" (or table) even in the presence of enemies, showing His provision and protection.',
        verseReference: 'Psalm 23:5'
      }
    ]
  }
];

const ScrollDetail = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [scroll, setScroll] = useState<Scroll | null>(null);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [expandedSummary, setExpandedSummary] = useState(false);
  const [expandedQuestions, setExpandedQuestions] = useState<{
    understanding: boolean;
    discussion: boolean;
  }>({
    understanding: false,
    discussion: false,
  });

  // Load scroll and quiz data
  useEffect(() => {
    if (!id) return;

    const foundScroll = mockScrolls.find(s => s.id === id);
    setScroll(foundScroll || null);

    const foundQuiz = mockQuizzes.find(q => q.scrollId === id);
    setQuiz(foundQuiz || null);

    // Initialize user answers array
    if (foundQuiz) {
      setUserAnswers(new Array(foundQuiz.questions.length).fill(null));
    }

    // Check if should auto-start quiz
    if (searchParams.get('startQuiz') === 'true' && foundQuiz) {
      setShowQuiz(true);
    }
  }, [id, searchParams]);

  const handleStartQuiz = () => {
    setShowQuiz(true);
    setCurrentQuestionIndex(0);
    setShowResults(false);
    if (quiz) {
      setUserAnswers(new Array(quiz.questions.length).fill(null));
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (quiz && currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    if (!quiz) return { correct: 0, total: 0 };

    const correct = userAnswers.reduce((acc, answer, index) => {
      return answer === quiz.questions[index].correctAnswer ? acc + 1 : acc;
    }, 0);

    return { correct, total: quiz.questions.length };
  };

  const handleBackToScroll = () => {
    setShowQuiz(false);
    setShowResults(false);
    setCurrentQuestionIndex(0);
  };

  if (!scroll) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Scroll not found</p>
      </div>
    );
  }

  // Results View
  if (showResults && quiz) {
    const score = calculateScore();
    const percentage = Math.round((score.correct / score.total) * 100);

    return (
      <div className="min-h-screen bg-background pb-20">
        <header className="sticky top-0 z-10 bg-card border-b-2 border-foreground/30">
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToScroll}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-5 w-5" />
              <span>Back</span>
            </Button>
            <h1 className="text-lg font-semibold text-foreground">Quiz Results</h1>
            <div className="w-16" />
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
          {/* Score Card */}
          <Card className="p-6 text-center space-y-4 border-2 border-foreground/20">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-foreground">{percentage}%</h2>
              <p className="text-muted-foreground">
                You got {score.correct} out of {score.total} questions correct
              </p>
            </div>
            <div className="pt-4">
              <Button
                onClick={handleBackToScroll}
                className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 rounded-full font-semibold"
              >
                Back to Scroll
              </Button>
            </div>
          </Card>

          {/* Question Review */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Review Your Answers</h3>
            {quiz.questions.map((question, index) => {
              const userAnswer = userAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;

              return (
                <Card key={question.id} className="p-5 space-y-4 border-2 border-foreground/20">
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
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
                        {question.verseReference && (
                          <p className="text-xs text-muted-foreground">{question.verseReference}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Retake Button */}
          <div className="pt-2">
            <Button
              onClick={handleStartQuiz}
              variant="outline"
              className="w-full h-12 rounded-full font-semibold"
            >
              Retake Quiz
            </Button>
          </div>
        </main>
      </div>
    );
  }

  // Quiz View
  if (showQuiz && quiz) {
    const currentQuestion = quiz.questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
    const canProceed = userAnswers[currentQuestionIndex] !== null;
    const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

    return (
      <div className="min-h-screen bg-background pb-20">
        <header className="sticky top-0 z-10 bg-card border-b-2 border-foreground/30">
          <div className="max-w-2xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-lg">
                  {currentQuestionIndex + 1}
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-foreground">{quiz.title}</h1>
                  <p className="text-sm text-muted-foreground">
                    Question {currentQuestionIndex + 1} of {quiz.questions.length}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToScroll}
              >
                Cancel
              </Button>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-foreground rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
          <QuizQuestion
            question={currentQuestion}
            selectedAnswer={userAnswers[currentQuestionIndex]}
            onAnswerSelect={handleAnswerSelect}
            showCorrect={false}
          />

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="flex-1 h-12 rounded-xl gap-2 transition-all duration-200"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            {isLastQuestion ? (
              <Button
                onClick={handleSubmit}
                disabled={!canProceed}
                className="flex-1 h-12 rounded-xl bg-foreground text-background hover:bg-foreground/90 transition-all duration-200"
              >
                Submit Quiz
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!canProceed}
                className="flex-1 h-12 rounded-xl gap-2 bg-foreground text-background hover:bg-foreground/90 transition-all duration-200"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </main>
      </div>
    );
  }

  // Scroll View
  // Filter questions by type
  const understandingQuestions = scroll.questions.filter(q => q.type === 'understanding');
  const discussionQuestions = scroll.questions.filter(q => q.type === 'discussion');

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card border-b-2 border-foreground/30">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/scripture-explorer')}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-5 w-5" />
            <span>Back</span>
          </Button>
          <h1 className="text-lg font-semibold text-foreground">Scroll Overview</h1>
          <div className="w-16" /> {/* Spacer for centering */}
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Scroll Header */}
        <Card className="p-6 space-y-3 border-2 border-foreground/20">
          <h2 className="text-2xl font-bold text-foreground leading-tight">{scroll.title}</h2>
          <p className="text-muted-foreground">{scroll.scriptureReference}</p>
          <div className="flex items-center gap-3 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{scroll.readingTime} reading time</span>
            </div>
            <span>•</span>
            <span className="text-sm">{scroll.timestamp}</span>
          </div>
        </Card>

        {/* Summary Section */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-foreground">Summary</h3>
          <Card className="overflow-hidden border-2 border-foreground/20">
            <div className="p-4 space-y-4">
              <div
                className={`text-sm text-muted-foreground leading-relaxed transition-all duration-300 ease-in-out ${
                  expandedSummary ? "" : "line-clamp-3"
                }`}
              >
                <p>{scroll.summary}</p>
              </div>

              {scroll.summary.length > 150 && (
                <Button
                  onClick={() => setExpandedSummary(!expandedSummary)}
                  variant="outline"
                  className="w-full text-foreground bg-secondary/80 border-secondary-foreground/20 hover:bg-secondary hover:border-secondary-foreground/40"
                >
                  {expandedSummary ? "Show Less" : "Show More"}
                </Button>
              )}

              <Separator />

              <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                <span className="italic">AI Generated Response</span>
                <div className="flex items-center gap-1">
                  <span>Accurate?</span>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0 hover:bg-accent rounded-full">
                    <ThumbsUp className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0 hover:bg-accent rounded-full">
                    <ThumbsDown className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Questions Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold text-foreground">Questions</h3>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full p-0 hover:bg-muted">
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    <span className="sr-only">Question types info</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4" align="start" collisionPadding={16}>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm">
                        <span className="font-semibold text-foreground">Understanding</span>{" "}
                        <span className="text-muted-foreground">questions help establish what the text says and means at a basic level.</span>
                      </p>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-sm">
                        <span className="font-semibold text-foreground">Discussion</span>{" "}
                        <span className="text-muted-foreground">questions explore deeper meanings, implications and connections within a particular scripture.</span>
                      </p>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Understanding Questions */}
          <Card className="border-2 border-foreground/20 overflow-hidden">
            <button
              onClick={() =>
                setExpandedQuestions((prev) => ({ ...prev, understanding: !prev.understanding }))
              }
              className="w-full p-4 flex items-center justify-between hover:bg-accent/50 transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-foreground/10 flex items-center justify-center">
                  <Lightbulb className="h-4 w-4 text-foreground" />
                </div>
                <span className="font-medium text-foreground">Understanding ({understandingQuestions.length})</span>
              </div>
              <ChevronRight
                className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
                  expandedQuestions.understanding ? "rotate-90" : ""
                }`}
              />
            </button>

            {expandedQuestions.understanding && (
              <div className="border-t border-border animate-in slide-in-from-top-2 duration-200">
                <div className="p-4 bg-accent/30 space-y-3">
                  {understandingQuestions.length > 0 ? (
                    understandingQuestions.map((question) => (
                      <Card key={question.id} className="p-4 border border-border space-y-2 bg-background">
                        <p className="text-sm text-foreground">{question.text}</p>
                        {question.verseReference && (
                          <p className="text-xs text-muted-foreground">{question.verseReference}</p>
                        )}
                      </Card>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-2">No understanding questions yet.</p>
                  )}
                </div>
              </div>
            )}
          </Card>

          {/* Discussion Questions */}
          <Card className="border-2 border-foreground/20 overflow-hidden">
            <button
              onClick={() =>
                setExpandedQuestions((prev) => ({ ...prev, discussion: !prev.discussion }))
              }
              className="w-full p-4 flex items-center justify-between hover:bg-accent/50 transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-foreground/10 flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 text-foreground" />
                </div>
                <span className="font-medium text-foreground">Discussion ({discussionQuestions.length})</span>
              </div>
              <ChevronRight
                className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
                  expandedQuestions.discussion ? "rotate-90" : ""
                }`}
              />
            </button>

            {expandedQuestions.discussion && (
              <div className="border-t border-border p-4 bg-accent/30 animate-in slide-in-from-top-2 duration-200">
                {discussionQuestions.length > 0 ? (
                  <div className="space-y-3">
                    {discussionQuestions.map((question) => (
                      <Card key={question.id} className="p-4 border border-border space-y-2 bg-background">
                        <p className="text-sm text-foreground">{question.text}</p>
                        {question.verseReference && (
                          <p className="text-xs text-muted-foreground">{question.verseReference}</p>
                        )}
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center">No discussion questions yet.</p>
                )}
              </div>
            )}
          </Card>
        </div>

        {/* Personal Reflection */}
        {scroll.reflection && (
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-foreground">Personal Reflection</h3>
            <Card className="p-4 space-y-3 border-2 border-foreground/20">
              <div className="border-l-4 border-foreground/20 pl-4">
                <p className="text-sm text-foreground leading-relaxed italic">{scroll.reflection}</p>
              </div>
              <p className="text-xs text-muted-foreground text-right">
                {scroll.reflection.length} characters
              </p>
            </Card>
          </div>
        )}

        {/* Visibility Indicator */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-foreground">Visibility</h3>
          <Card className="p-4 border-2 border-foreground/20">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-foreground" />
              <div>
                <p className="font-medium text-foreground">Public</p>
                <p className="text-xs text-muted-foreground">Anyone can see this scroll</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Quiz Section */}
        {scroll.hasQuiz && quiz && (
          <div className="space-y-4 pt-4">
            <h3 className="text-xl font-semibold text-foreground">Quiz</h3>
            <div className="space-y-3">
              {scroll.quizScore && (
                <Card className="p-4 bg-accent border-2 border-foreground/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">Previous Score</p>
                      <p className="text-sm text-muted-foreground">
                        {scroll.quizScore.correct}/{scroll.quizScore.total} correct
                      </p>
                    </div>
                    <Award className="h-6 w-6 text-foreground" />
                  </div>
                </Card>
              )}
              <Button
                onClick={handleStartQuiz}
                className="w-full h-14 bg-foreground text-background hover:bg-foreground/90 rounded-xl text-lg font-semibold"
              >
                {scroll.quizScore ? 'Retake Quiz' : 'Take Quiz'}
              </Button>
            </div>
          </div>
        )}

        {!scroll.hasQuiz && (
          <div className="space-y-4 pt-4">
            <h3 className="text-xl font-semibold text-foreground">Quiz</h3>
            <Card className="p-6 text-center border-2 border-foreground/20">
              <p className="text-muted-foreground">No quiz available for this scroll yet</p>
              <p className="text-sm text-muted-foreground mt-2">
                Quizzes will be generated automatically in the future
              </p>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default ScrollDetail;
