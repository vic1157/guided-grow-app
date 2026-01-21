import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Sparkles,
  MessageSquare,
  CheckCircle2,
  Clock,
  ChevronRight,
  ChevronLeft,
  Users,
  Trophy,
  TrendingUp,
  Heart,
  Zap,
  Target,
  Calendar,
  BarChart3,
  Shield,
  Gift,
  ArrowRight,
  Smartphone,
  Brain,
  Gamepad2,
  MessageCircle,
  Star,
  Church,
  GraduationCap,
  Flame,
  Award,
  Play,
  Mail,
  Globe,
  Maximize,
  Minimize,
} from "lucide-react";

// Animation variants
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

const contentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const ChurchPitch = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(1);
  const [direction, setDirection] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isBlackScreen, setIsBlackScreen] = useState(false);

  // Interactive demo states
  const [demoQuizAnswer, setDemoQuizAnswer] = useState<number | null>(null);
  const [demoDailyStep, setDemoDailyStep] = useState(1);

  const totalSlides = 14;

  const goToSlide = useCallback((slide: number) => {
    if (slide >= 1 && slide <= totalSlides) {
      setDirection(slide > currentSlide ? 1 : -1);
      setCurrentSlide(slide);
    }
  }, [currentSlide, totalSlides]);

  const handleNext = useCallback(() => {
    if (currentSlide < totalSlides) {
      setDirection(1);
      setCurrentSlide(currentSlide + 1);
    }
  }, [currentSlide, totalSlides]);

  const handlePrevious = useCallback(() => {
    if (currentSlide > 1) {
      setDirection(-1);
      setCurrentSlide(currentSlide - 1);
    }
  }, [currentSlide]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case "ArrowRight":
        case " ":
        case "Enter":
          e.preventDefault();
          handleNext();
          break;
        case "ArrowLeft":
          e.preventDefault();
          handlePrevious();
          break;
        case "Home":
          e.preventDefault();
          goToSlide(1);
          break;
        case "End":
          e.preventDefault();
          goToSlide(totalSlides);
          break;
        case "f":
        case "F":
          e.preventDefault();
          toggleFullscreen();
          break;
        case "b":
        case "B":
          e.preventDefault();
          setIsBlackScreen(!isBlackScreen);
          break;
        case "Escape":
          if (isBlackScreen) {
            setIsBlackScreen(false);
          } else if (document.fullscreenElement) {
            document.exitFullscreen();
            setIsFullscreen(false);
          }
          break;
        default:
          // Number keys 1-9 for quick navigation
          const num = parseInt(e.key);
          if (num >= 1 && num <= 9 && num <= totalSlides) {
            goToSlide(num);
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrevious, goToSlide, toggleFullscreen, isBlackScreen, totalSlides]);

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Black screen overlay
  if (isBlackScreen) {
    return (
      <div
        className="fixed inset-0 bg-black z-[100] cursor-pointer flex items-center justify-center"
        onClick={() => setIsBlackScreen(false)}
      >
        <p className="text-white/20 text-sm">Press B or click to resume</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-accent/20 z-50 overflow-hidden">
      {/* Navigation Arrows */}
      <button
        onClick={handlePrevious}
        disabled={currentSlide === 1}
        className="fixed left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-foreground/10 hover:bg-foreground/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-foreground" />
      </button>
      <button
        onClick={handleNext}
        disabled={currentSlide === totalSlides}
        className="fixed right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-foreground/10 hover:bg-foreground/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-foreground" />
      </button>

      {/* Top Bar: Progress & Controls */}
      <div className="fixed top-0 left-0 right-0 z-50 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/home")}
            className="text-muted-foreground hover:text-foreground"
          >
            Exit
          </Button>
        </div>

        {/* Progress Dots */}
        <div className="flex items-center gap-1.5">
          {[...Array(totalSlides)].map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index + 1)}
              className={`h-2 rounded-full transition-all ${
                currentSlide === index + 1
                  ? "w-6 bg-foreground"
                  : currentSlide > index + 1
                  ? "w-2 bg-foreground/60"
                  : "w-2 bg-foreground/20"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {currentSlide} / {totalSlides}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            className="text-muted-foreground hover:text-foreground"
          >
            {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Keyboard Shortcuts Hint */}
      <div className="fixed bottom-4 left-4 z-50 text-xs text-muted-foreground/50 hidden md:block">
        ← → Navigate • F Fullscreen • B Black screen
      </div>

      {/* Slide Content */}
      <div className="h-full flex items-center justify-center p-6 pt-16 pb-12">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full max-w-4xl"
          >
            {/* Slide 1: Title */}
            {currentSlide === 1 && (
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="text-center space-y-8"
              >
                <motion.div variants={itemVariants} className="space-y-4">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 mb-4">
                    <BookOpen className="h-12 w-12 text-foreground" />
                  </div>
                  <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                    Empower Your<br />
                    <span className="text-primary">Youth Ministry's</span><br />
                    Bible Engagement
                  </h1>
                </motion.div>

                <motion.p variants={itemVariants} className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  RYB (Read Your Bible) is a modern Bible app designed to help the next generation build lasting Scripture habits through personalization, AI insights, and community.
                </motion.p>

                <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 pt-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Smartphone className="h-4 w-4" />
                    <span>Mobile-First</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Brain className="h-4 w-4" />
                    <span>AI-Powered</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>Community-Driven</span>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Button
                    onClick={handleNext}
                    size="lg"
                    className="h-14 px-8 text-lg rounded-xl"
                  >
                    See How It Works
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </motion.div>
            )}

            {/* Slide 2: The Problem */}
            {currentSlide === 2 && (
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8"
              >
                <motion.div variants={itemVariants} className="text-center space-y-3">
                  <h2 className="text-4xl font-bold text-foreground">The Challenge We Face</h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Youth are more connected than ever, but disconnecting from Scripture
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-4">
                  <Card className="p-6 text-center space-y-3 bg-red-500/5 border-red-500/20">
                    <div className="text-4xl font-bold text-red-500">67%</div>
                    <p className="text-sm text-muted-foreground">
                      of young adults stop reading the Bible after high school
                    </p>
                  </Card>
                  <Card className="p-6 text-center space-y-3 bg-orange-500/5 border-orange-500/20">
                    <div className="text-4xl font-bold text-orange-500">8 sec</div>
                    <p className="text-sm text-muted-foreground">
                      average attention span of Gen Z (down from 12 sec)
                    </p>
                  </Card>
                  <Card className="p-6 text-center space-y-3 bg-yellow-500/5 border-yellow-500/20">
                    <div className="text-4xl font-bold text-yellow-500">52%</div>
                    <p className="text-sm text-muted-foreground">
                      feel intimidated or confused by Scripture
                    </p>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card className="p-6 space-y-4">
                    <h3 className="font-semibold text-foreground text-lg">Common Barriers for Youth:</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {[
                        "Don't know where to start",
                        "Struggle to stay consistent",
                        "Find traditional formats boring",
                        "Lack accountability and support",
                        "Questions go unanswered",
                        "No connection to daily life",
                      ].map((barrier, i) => (
                        <div key={i} className="flex items-center gap-2 text-muted-foreground">
                          <div className="w-2 h-2 rounded-full bg-destructive/60" />
                          <span className="text-sm">{barrier}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>

                <motion.p variants={itemVariants} className="text-center text-lg font-medium text-foreground">
                  RYB is built to solve these exact challenges.
                </motion.p>
              </motion.div>
            )}

            {/* Slide 3: Introducing RYB */}
            {currentSlide === 3 && (
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8"
              >
                <motion.div variants={itemVariants} className="text-center space-y-3">
                  <h2 className="text-4xl font-bold text-foreground">
                    Meet <span className="text-primary">RYB</span>
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    A Bible reading app designed for how young people actually engage with content
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
                  <Card className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Target className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Personalized Journey</h3>
                        <p className="text-sm text-muted-foreground">Tailored to each user's persona</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Our spiritual assessment identifies each user's unique reading style and provides personalized recommendations, making Scripture feel relevant and accessible.
                    </p>
                  </Card>

                  <Card className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                        <Sparkles className="h-6 w-6 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">AI Companion: Leo</h3>
                        <p className="text-sm text-muted-foreground">Questions answered instantly</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Leo helps users understand context, answer questions, and explore Scripture deeper—like having a knowledgeable friend always available.
                    </p>
                  </Card>

                  <Card className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                        <Flame className="h-6 w-6 text-green-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Streaks & Progress</h3>
                        <p className="text-sm text-muted-foreground">Habit-building mechanics</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Daily goals, reading streaks, and visible progress keep users motivated and accountable to their Bible reading commitments.
                    </p>
                  </Card>

                  <Card className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                        <Users className="h-6 w-6 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Community Built-In</h3>
                        <p className="text-sm text-muted-foreground">Connect with friends and groups</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Share reflections, encourage friends, and join reading groups—perfect for youth groups wanting to grow together.
                    </p>
                  </Card>
                </motion.div>
              </motion.div>
            )}

            {/* Slide 4: Why Youth Love It */}
            {currentSlide === 4 && (
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8"
              >
                <motion.div variants={itemVariants} className="text-center space-y-3">
                  <h2 className="text-4xl font-bold text-foreground">Why Youth Love RYB</h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Designed with the habits and preferences of Gen Z in mind
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-4">
                  <Card className="p-6 space-y-4 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                      <Smartphone className="h-8 w-8 text-purple-500" />
                    </div>
                    <h3 className="font-semibold text-foreground text-lg">Mobile-Native Design</h3>
                    <p className="text-sm text-muted-foreground">
                      Built for how they already use their phones. Swipe, tap, scroll—familiar interactions make reading intuitive.
                    </p>
                  </Card>

                  <Card className="p-6 space-y-4 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20">
                      <Gamepad2 className="h-8 w-8 text-yellow-500" />
                    </div>
                    <h3 className="font-semibold text-foreground text-lg">Gamified Experience</h3>
                    <p className="text-sm text-muted-foreground">
                      Streaks, quizzes, achievements, and progress tracking make daily reading feel rewarding, not obligatory.
                    </p>
                  </Card>

                  <Card className="p-6 space-y-4 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
                      <MessageCircle className="h-8 w-8 text-cyan-500" />
                    </div>
                    <h3 className="font-semibold text-foreground text-lg">Instant Answers</h3>
                    <p className="text-sm text-muted-foreground">
                      No more waiting for Bible study. Leo AI answers questions in real-time, keeping curiosity alive.
                    </p>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <div className="flex -space-x-3">
                        {["👦", "👧", "🧑", "👨"].map((emoji, i) => (
                          <div key={i} className="w-12 h-12 rounded-full bg-accent flex items-center justify-center border-2 border-background text-xl">
                            {emoji}
                          </div>
                        ))}
                      </div>
                      <div className="text-center md:text-left">
                        <p className="font-semibold text-foreground">
                          "It's like Duolingo for the Bible—I actually want to open it every day."
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">— High school youth group member</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            )}

            {/* Slide 5: Feature - Daily Bread (Interactive) */}
            {currentSlide === 5 && (
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <motion.div variants={itemVariants} className="text-center space-y-2">
                  <div className="inline-flex items-center gap-2 text-sm text-primary font-medium">
                    <Calendar className="h-4 w-4" />
                    FEATURE SPOTLIGHT
                  </div>
                  <h2 className="text-4xl font-bold text-foreground">Our Daily Bread</h2>
                  <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                    A structured daily journey that guides users through verse, scroll, and quiz
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="max-w-md mx-auto">
                  <Card className="p-6 space-y-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Interactive Demo</p>

                    {/* Step 1: Verse */}
                    <div
                      className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                        demoDailyStep >= 1 ? "border-primary bg-primary/5" : "border-border opacity-50"
                      }`}
                      onClick={() => demoDailyStep === 1 && setDemoDailyStep(2)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          demoDailyStep > 1 ? "bg-green-500 text-white" : "bg-primary/10"
                        }`}>
                          {demoDailyStep > 1 ? <CheckCircle2 className="h-5 w-5" /> : <span className="text-sm font-bold">1</span>}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">Verse of the Day</p>
                          <p className="text-xs text-muted-foreground">Jeremiah 29:11</p>
                        </div>
                        {demoDailyStep === 1 && (
                          <span className="text-xs text-primary font-medium">Tap to mark read</span>
                        )}
                      </div>
                    </div>

                    {/* Step 2: Scroll */}
                    <div
                      className={`p-4 rounded-lg border-2 transition-all ${
                        demoDailyStep >= 2 ? "border-primary bg-primary/5 cursor-pointer" : "border-border opacity-50"
                      }`}
                      onClick={() => demoDailyStep === 2 && setDemoDailyStep(3)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          demoDailyStep > 2 ? "bg-green-500 text-white" : demoDailyStep >= 2 ? "bg-primary/10" : "bg-muted"
                        }`}>
                          {demoDailyStep > 2 ? <CheckCircle2 className="h-5 w-5" /> : <span className="text-sm font-bold">2</span>}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">Scroll of the Day</p>
                          <p className="text-xs text-muted-foreground">3-4 min • 5 verses</p>
                        </div>
                        {demoDailyStep === 2 && (
                          <span className="text-xs text-primary font-medium">Tap to complete</span>
                        )}
                      </div>
                    </div>

                    {/* Step 3: Quiz */}
                    <div
                      className={`p-4 rounded-lg border-2 transition-all ${
                        demoDailyStep >= 3 ? "border-primary bg-primary/5 cursor-pointer" : "border-border opacity-50"
                      }`}
                      onClick={() => demoDailyStep === 3 && setDemoDailyStep(4)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          demoDailyStep > 3 ? "bg-green-500 text-white" : demoDailyStep >= 3 ? "bg-primary/10" : "bg-muted"
                        }`}>
                          {demoDailyStep > 3 ? <CheckCircle2 className="h-5 w-5" /> : <span className="text-sm font-bold">3</span>}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">Quiz of the Day</p>
                          <p className="text-xs text-muted-foreground">5 questions • 2-3 min</p>
                        </div>
                        {demoDailyStep === 3 && (
                          <span className="text-xs text-primary font-medium">Tap to complete</span>
                        )}
                      </div>
                    </div>

                    {/* Completion */}
                    {demoDailyStep === 4 && (
                      <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-center">
                        <p className="text-green-600 font-semibold flex items-center justify-center gap-2">
                          <Trophy className="h-5 w-5" />
                          Daily Bread Complete!
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDemoDailyStep(1)}
                          className="mt-2 text-xs"
                        >
                          Reset Demo
                        </Button>
                      </div>
                    )}
                  </Card>
                </motion.div>

                <motion.p variants={itemVariants} className="text-center text-sm text-muted-foreground">
                  Sequential unlocking creates a sense of progression and accomplishment
                </motion.p>
              </motion.div>
            )}

            {/* Slide 6: Feature - Scrolls */}
            {currentSlide === 6 && (
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <motion.div variants={itemVariants} className="text-center space-y-2">
                  <div className="inline-flex items-center gap-2 text-sm text-primary font-medium">
                    <BookOpen className="h-4 w-4" />
                    FEATURE SPOTLIGHT
                  </div>
                  <h2 className="text-4xl font-bold text-foreground">Scrolls</h2>
                  <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                    Tracked reading sessions that capture engagement and insights
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
                  <Card className="p-6 space-y-4">
                    <h3 className="font-semibold text-foreground">What's in a Scroll?</h3>
                    <div className="space-y-3">
                      {[
                        { icon: Clock, label: "Reading time tracked", desc: "Know exactly how long you spent" },
                        { icon: Sparkles, label: "AI summary", desc: "Quick context and themes" },
                        { icon: MessageSquare, label: "Questions captured", desc: "Save thoughts while reading" },
                        { icon: Heart, label: "Personal reflection", desc: "Journal your takeaways" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <item.icon className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground text-sm">{item.label}</p>
                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-6 space-y-4 bg-accent/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-foreground">Matthew 5:1-48</h4>
                        <p className="text-sm text-muted-foreground">Sermon on the Mount</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Today, 8:32 AM</p>
                        <p className="text-sm font-medium text-foreground">12 min read</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        "The Beatitudes challenge my understanding of what it means to be blessed. Jesus flips worldly success on its head..."
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" /> 3 questions
                      </span>
                      <span className="flex items-center gap-1">
                        <Trophy className="h-3 w-3" /> Quiz: 4/5
                      </span>
                    </div>
                  </Card>
                </motion.div>

                <motion.p variants={itemVariants} className="text-center text-sm text-muted-foreground">
                  Every Scroll becomes a personal record of spiritual growth
                </motion.p>
              </motion.div>
            )}

            {/* Slide 7: Feature - Leo AI */}
            {currentSlide === 7 && (
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <motion.div variants={itemVariants} className="text-center space-y-2">
                  <div className="inline-flex items-center gap-2 text-sm text-secondary font-medium">
                    <Sparkles className="h-4 w-4" />
                    FEATURE SPOTLIGHT
                  </div>
                  <h2 className="text-4xl font-bold text-foreground">Meet Leo</h2>
                  <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                    Your AI companion for understanding Scripture
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="max-w-lg mx-auto">
                  <Card className="p-6 space-y-4">
                    <div className="space-y-3">
                      {/* User message */}
                      <div className="flex justify-end">
                        <div className="bg-primary text-primary-foreground rounded-2xl rounded-br-md px-4 py-2 max-w-[80%]">
                          <p className="text-sm">What does "blessed are the meek" mean?</p>
                        </div>
                      </div>

                      {/* Leo response */}
                      <div className="flex justify-start">
                        <div className="bg-accent rounded-2xl rounded-bl-md px-4 py-3 max-w-[85%]">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center">
                              <Sparkles className="h-3 w-3 text-secondary" />
                            </div>
                            <span className="text-xs font-medium text-secondary">Leo</span>
                          </div>
                          <p className="text-sm text-foreground">
                            "Meek" in Matthew 5:5 doesn't mean weak! In Greek, it's "praus" (πραΰς), describing <strong>controlled strength</strong>—like a powerful horse that's been trained.
                          </p>
                          <p className="text-sm text-foreground mt-2">
                            The meek are those who trust God's justice rather than forcing their own way. They'll "inherit the earth" because they're aligned with God's kingdom values.
                          </p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs px-3 py-1 rounded-full bg-secondary/10 text-secondary">Chapter Context</span>
                      <span className="text-xs px-3 py-1 rounded-full bg-secondary/10 text-secondary">Ask Follow-up</span>
                      <span className="text-xs px-3 py-1 rounded-full bg-secondary/10 text-secondary">Cross References</span>
                    </div>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                  {[
                    { icon: Brain, label: "Context-Aware", desc: "Understands what you're reading" },
                    { icon: Shield, label: "Theologically Sound", desc: "Grounded in Scripture" },
                    { icon: Zap, label: "Instant Answers", desc: "No waiting for Bible study" },
                  ].map((item, i) => (
                    <div key={i} className="text-center space-y-2">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-secondary/10">
                        <item.icon className="h-5 w-5 text-secondary" />
                      </div>
                      <p className="font-medium text-foreground text-sm">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            )}

            {/* Slide 8: Feature - Quizzes (Interactive) */}
            {currentSlide === 8 && (
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <motion.div variants={itemVariants} className="text-center space-y-2">
                  <div className="inline-flex items-center gap-2 text-sm text-green-500 font-medium">
                    <GraduationCap className="h-4 w-4" />
                    FEATURE SPOTLIGHT
                  </div>
                  <h2 className="text-4xl font-bold text-foreground">Quizzes</h2>
                  <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                    Reinforce learning through interactive comprehension checks
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="max-w-md mx-auto">
                  <Card className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-muted-foreground">Question 1 of 5</p>
                      <p className="text-xs text-muted-foreground">Jeremiah 29:11</p>
                    </div>

                    <p className="font-semibold text-foreground">
                      According to Jeremiah 29:11, what kind of plans does God have for us?
                    </p>

                    <div className="space-y-2">
                      {[
                        { letter: "A", text: "Plans of prosperity and hope", correct: true },
                        { letter: "B", text: "Plans of punishment and discipline" },
                        { letter: "C", text: "Plans of wealth and fame" },
                        { letter: "D", text: "Plans of suffering and hardship" },
                      ].map((option, i) => (
                        <button
                          key={i}
                          onClick={() => setDemoQuizAnswer(i)}
                          className={`w-full p-3 rounded-lg border-2 flex items-center gap-3 transition-all ${
                            demoQuizAnswer === i
                              ? option.correct
                                ? "border-green-500 bg-green-500/10"
                                : "border-red-500 bg-red-500/10"
                              : "border-border hover:border-muted-foreground"
                          }`}
                        >
                          <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${
                            demoQuizAnswer === i
                              ? option.correct
                                ? "bg-green-500 text-white"
                                : "bg-red-500 text-white"
                              : "bg-muted"
                          }`}>
                            {option.letter}
                          </span>
                          <span className="text-sm text-left">{option.text}</span>
                          {demoQuizAnswer === i && option.correct && (
                            <CheckCircle2 className="h-5 w-5 text-green-500 ml-auto" />
                          )}
                        </button>
                      ))}
                    </div>

                    {demoQuizAnswer === 0 && (
                      <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                        <p className="text-sm text-green-600 font-medium">Correct!</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          God's plans are to prosper us, not to harm us, and to give us hope and a future.
                        </p>
                      </div>
                    )}

                    {demoQuizAnswer !== null && demoQuizAnswer !== 0 && (
                      <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                        <p className="text-sm text-red-600 font-medium">Not quite!</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          The correct answer is A. God declares plans of prosperity and hope for His people.
                        </p>
                      </div>
                    )}

                    {demoQuizAnswer !== null && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDemoQuizAnswer(null)}
                        className="w-full text-xs"
                      >
                        Try Again
                      </Button>
                    )}
                  </Card>
                </motion.div>

                <motion.p variants={itemVariants} className="text-center text-sm text-muted-foreground">
                  Quizzes help retention and make learning fun for youth
                </motion.p>
              </motion.div>
            )}

            {/* Slide 9: Feature - Community */}
            {currentSlide === 9 && (
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <motion.div variants={itemVariants} className="text-center space-y-2">
                  <div className="inline-flex items-center gap-2 text-sm text-blue-500 font-medium">
                    <Users className="h-4 w-4" />
                    FEATURE SPOTLIGHT
                  </div>
                  <h2 className="text-4xl font-bold text-foreground">Community</h2>
                  <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                    Grow together through shared accountability and encouragement
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
                  <Card className="p-6 space-y-4">
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <Users className="h-5 w-5 text-blue-500" />
                      Reading Groups
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Create private groups for your youth ministry. See who's reading, celebrate streaks together, and share reflections in a safe space.
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {["👦", "👧", "🧑", "👨", "👩"].map((emoji, i) => (
                          <div key={i} className="w-8 h-8 rounded-full bg-accent flex items-center justify-center border-2 border-background text-sm">
                            {emoji}
                          </div>
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">+12 members</span>
                    </div>
                  </Card>

                  <Card className="p-6 space-y-4">
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <Heart className="h-5 w-5 text-red-500" />
                      Encouragement
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Send encouragements, comment on reflections, and celebrate milestones. Build a culture of support and spiritual growth.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-lg">🎉</span>
                        <span className="text-muted-foreground">Sarah just hit a <strong className="text-foreground">30-day streak!</strong></span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-lg">💪</span>
                        <span className="text-muted-foreground">3 friends encouraged your reflection</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card className="p-6 bg-blue-500/5 border-blue-500/20">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                        <Shield className="h-6 w-6 text-blue-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Safe & Appropriate for Youth</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Privacy controls let users choose what to share. Group admins (youth leaders) can moderate content. No direct messaging between minors—community interaction happens through shared content.
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            )}

            {/* Slide 10: For Youth Leaders */}
            {currentSlide === 10 && (
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <motion.div variants={itemVariants} className="text-center space-y-2">
                  <h2 className="text-4xl font-bold text-foreground">For Youth Leaders</h2>
                  <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                    Tools to support and track your ministry's spiritual growth
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
                  <Card className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <BarChart3 className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Group Dashboard</h3>
                        <p className="text-sm text-muted-foreground">See engagement at a glance</p>
                      </div>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Active reading streaks by member
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Weekly engagement metrics
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Quiz completion rates
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Most-read passages
                      </li>
                    </ul>
                  </Card>

                  <Card className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Reading Plans</h3>
                        <p className="text-sm text-muted-foreground">Assign group-wide plans</p>
                      </div>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Create custom reading plans
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Sync with sermon series
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Track group progress
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Discussion prompts included
                      </li>
                    </ul>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5">
                    <div className="text-center space-y-3">
                      <Award className="h-10 w-10 text-primary mx-auto" />
                      <h4 className="font-semibold text-foreground">Leader Benefits</h4>
                      <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                        Youth leaders get premium features free when managing church groups. Access Leo AI, create unlimited reading plans, and view detailed analytics.
                      </p>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            )}

            {/* Slide 11: Testimonials */}
            {currentSlide === 11 && (
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <motion.div variants={itemVariants} className="text-center space-y-2">
                  <h2 className="text-4xl font-bold text-foreground">What Churches Are Saying</h2>
                  <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                    Real impact in real ministries
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
                  <Card className="p-6 space-y-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                    <p className="text-foreground italic">
                      "Our youth group's Bible engagement went from sporadic to consistent. The gamification really works—they're competing for the longest streaks!"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-lg">
                        👨‍💼
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Pastor Mike Chen</p>
                        <p className="text-xs text-muted-foreground">Youth Pastor, Grace Community Church</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 space-y-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                    <p className="text-foreground italic">
                      "Leo has been a game-changer. Kids who were shy about asking questions in Bible study now explore freely through the AI. It's like having a personal tutor."
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-lg">
                        👩
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Sarah Williams</p>
                        <p className="text-xs text-muted-foreground">Youth Director, First Baptist</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card className="p-6 text-center space-y-4 bg-gradient-to-r from-green-500/5 to-emerald-500/5 border-green-500/20">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-3xl font-bold text-green-600">89%</p>
                        <p className="text-xs text-muted-foreground">of users build a reading habit within 30 days</p>
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-green-600">3.2x</p>
                        <p className="text-xs text-muted-foreground">more Scripture engagement vs. traditional apps</p>
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-green-600">94%</p>
                        <p className="text-xs text-muted-foreground">of youth leaders recommend RYB</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            )}

            {/* Slide 12: Getting Started */}
            {currentSlide === 12 && (
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <motion.div variants={itemVariants} className="text-center space-y-2">
                  <h2 className="text-4xl font-bold text-foreground">Getting Started</h2>
                  <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                    Implementing RYB in your ministry is simple
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
                  <div className="space-y-4">
                    {[
                      {
                        step: 1,
                        title: "Create Your Church Account",
                        desc: "Sign up as a youth leader and claim your church's organization profile.",
                        icon: Church,
                      },
                      {
                        step: 2,
                        title: "Set Up Your Youth Group",
                        desc: "Create a private group and customize settings for your ministry's needs.",
                        icon: Users,
                      },
                      {
                        step: 3,
                        title: "Invite Your Youth",
                        desc: "Share a simple invite code. Students download the app and join in seconds.",
                        icon: Gift,
                      },
                      {
                        step: 4,
                        title: "Start a Reading Plan",
                        desc: "Choose from our library or create a custom plan that syncs with your teaching.",
                        icon: BookOpen,
                      },
                      {
                        step: 5,
                        title: "Watch Engagement Grow",
                        desc: "Track progress on your dashboard and celebrate wins together.",
                        icon: TrendingUp,
                      },
                    ].map((item) => (
                      <Card key={item.step} className="p-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-lg font-bold text-primary">{item.step}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                        <item.icon className="h-6 w-6 text-muted-foreground/50" />
                      </Card>
                    ))}
                  </div>
                </motion.div>

                <motion.p variants={itemVariants} className="text-center text-sm text-muted-foreground">
                  Most churches are up and running within a single youth group meeting
                </motion.p>
              </motion.div>
            )}

            {/* Slide 13: Pricing */}
            {currentSlide === 13 && (
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <motion.div variants={itemVariants} className="text-center space-y-2">
                  <h2 className="text-4xl font-bold text-foreground">Simple Pricing</h2>
                  <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                    RYB is <strong className="text-foreground">free forever</strong> for core features
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                  <Card className="p-6 space-y-4">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground uppercase tracking-wide">Free Forever</p>
                      <p className="text-4xl font-bold text-foreground mt-1">$0</p>
                    </div>
                    <Separator />
                    <ul className="space-y-3">
                      {[
                        "Full Bible reading access",
                        "Scrolls & reading tracking",
                        "Streaks & daily goals",
                        "Community & groups",
                        "Basic quizzes",
                      ].map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>

                  <Card className="p-6 space-y-4 border-primary/50 bg-primary/5">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs rounded-full font-medium">
                      Most Popular
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground uppercase tracking-wide">Denarii Premium</p>
                      <p className="text-4xl font-bold text-foreground mt-1">$4.99<span className="text-lg text-muted-foreground">/mo</span></p>
                    </div>
                    <Separator />
                    <ul className="space-y-3">
                      {[
                        "Everything in Free",
                        "Leo AI unlimited access",
                        "AI-generated summaries",
                        "Advanced quizzes",
                        "Personalized insights",
                      ].map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <Sparkles className="h-4 w-4 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card className="p-4 bg-secondary/10 border-secondary/30 max-w-2xl mx-auto">
                    <p className="text-sm text-center">
                      <Gift className="h-4 w-4 inline mr-1 text-secondary" />
                      <strong>Church Leaders:</strong> Premium features are <strong>free</strong> for verified youth pastors and ministry leaders
                    </p>
                  </Card>
                </motion.div>
              </motion.div>
            )}

            {/* Slide 14: Call to Action */}
            {currentSlide === 14 && (
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8 text-center"
              >
                <motion.div variants={itemVariants} className="space-y-4">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20">
                    <Play className="h-10 w-10 text-foreground" />
                  </div>
                  <h2 className="text-4xl font-bold text-foreground">
                    Ready to Transform Your<br />Youth Ministry's Bible Engagement?
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                    Join hundreds of churches already using RYB to help the next generation fall in love with Scripture.
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    size="lg"
                    className="h-14 px-8 text-lg rounded-xl"
                    onClick={() => navigate("/signup")}
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 px-8 text-lg rounded-xl"
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    Contact Us
                  </Button>
                </motion.div>

                <motion.div variants={itemVariants} className="pt-4 space-y-4">
                  <Separator className="max-w-md mx-auto" />
                  <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                    <a href="#" className="flex items-center gap-1 hover:text-foreground transition-colors">
                      <Globe className="h-4 w-4" />
                      ryb.app
                    </a>
                    <a href="#" className="flex items-center gap-1 hover:text-foreground transition-colors">
                      <Mail className="h-4 w-4" />
                      churches@ryb.app
                    </a>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="pt-6">
                  <p className="text-xs text-muted-foreground/60">
                    © 2025 RYB (Read Your Bible). Made with ❤️ for the next generation.
                  </p>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ChurchPitch;
