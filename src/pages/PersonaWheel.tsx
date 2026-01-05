import { useState, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, ChevronRight } from "lucide-react";
import PersonaBottomSheet from "@/components/PersonaBottomSheet";
import { calculatePersonaScores } from "@/lib/personaScoring";
import {
  PersonaType,
  PersonaWheelData,
  SurveyAnswers,
  PERSONA_DETAILS,
  PERSONA_COLORS,
} from "@/types/persona";

// Animation variants for staggered entrance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const PersonaWheel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedPersona, setSelectedPersona] = useState<PersonaType | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  // Get answers from navigation state or localStorage fallback
  const answers: SurveyAnswers | null = useMemo(() => {
    if (location.state?.answers) {
      return location.state.answers;
    }

    const stored = localStorage.getItem("surveyAnswers");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return null;
      }
    }

    return null;
  }, [location.state]);

  // Redirect if no answers found
  useEffect(() => {
    if (!answers) {
      navigate("/interactive-survey");
    }
  }, [answers, navigate]);

  // Calculate persona scores
  const personaData: PersonaWheelData | null = useMemo(() => {
    if (!answers) return null;
    return calculatePersonaScores(answers);
  }, [answers]);

  // Prepare chart data
  const chartData = useMemo(() => {
    if (!personaData) return [];
    return personaData.scores.map((s) => ({
      name: PERSONA_DETAILS[s.persona].name,
      value: s.score,
      percentage: s.percentage,
      persona: s.persona,
      fill: PERSONA_COLORS[s.persona],
    }));
  }, [personaData]);

  // Handle slice click
  const handleSliceClick = (persona: PersonaType) => {
    setSelectedPersona(persona);
    setIsBottomSheetOpen(true);
  };

  // Handle legend item click
  const handleLegendClick = (persona: PersonaType) => {
    setSelectedPersona(persona);
    setIsBottomSheetOpen(true);
  };

  // Get selected persona's score info
  const selectedPersonaScore = personaData?.scores.find(
    (s) => s.persona === selectedPersona
  );

  if (!personaData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <motion.div
        className="max-w-lg mx-auto px-4 py-6 space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Persona Wheel</h1>
          <p className="text-muted-foreground">
            Your spiritual profile visualization
          </p>
        </motion.div>

        {/* Pie Chart */}
        <motion.div variants={itemVariants} className="relative">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={100}
                  animationBegin={0}
                  animationDuration={1200}
                  animationEasing="ease-out"
                  stroke="transparent"
                  strokeWidth={2}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.fill}
                      onClick={() => handleSliceClick(entry.persona)}
                      style={{ cursor: "pointer", outline: "none" }}
                      className="hover:opacity-80 transition-opacity"
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-2">
            Click a slice to explore
          </p>
        </motion.div>

        {/* Top Personas Panel */}
        <motion.div variants={itemVariants}>
          <Card className="p-5 bg-gradient-to-br from-accent/50 to-background border-2">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="font-semibold text-foreground">
                Assessment Complete!
              </h2>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              Based on your responses, you align most with:
            </p>

            <div
              className={`grid ${
                personaData.topPersonas.length > 1 ? "grid-cols-2" : "grid-cols-1"
              } gap-3`}
            >
              {personaData.topPersonas.map((persona, index) => {
                const details = PERSONA_DETAILS[persona];
                const score = personaData.scores.find((s) => s.persona === persona);
                const isTopPersona = personaData.topPersonas.includes(persona);

                return (
                  <div
                    key={persona}
                    className={`flex items-center gap-3 p-3 bg-card rounded-lg border-2 cursor-pointer hover:border-foreground/30 transition-colors ${
                      isTopPersona ? "ring-2 ring-offset-2" : ""
                    }`}
                    style={{
                      borderColor: PERSONA_COLORS[persona],
                      ...(isTopPersona && { ringColor: PERSONA_COLORS[persona] }),
                    }}
                    onClick={() => handleLegendClick(persona)}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow"
                      style={{ backgroundColor: PERSONA_COLORS[persona] }}
                    >
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">
                        {details.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {details.tagline}
                      </p>
                      <p
                        className="text-xs font-medium mt-0.5"
                        style={{ color: PERSONA_COLORS[persona] }}
                      >
                        Score: {score?.score} points
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-xs text-muted-foreground mt-4 text-center">
              Click any persona slice or legend item to explore details
            </p>
          </Card>
        </motion.div>

        {/* Legend / Persona Spectrum */}
        <motion.div variants={itemVariants} className="space-y-3">
          <h3 className="font-semibold text-foreground text-center">
            Persona Spectrum
          </h3>
          <div className="space-y-2">
            {personaData.scores.map((score) => {
              const details = PERSONA_DETAILS[score.persona];
              const isTopPersona = personaData.topPersonas.includes(score.persona);

              return (
                <button
                  key={score.persona}
                  onClick={() => handleLegendClick(score.persona)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all hover:bg-accent/50 ${
                    isTopPersona
                      ? "bg-accent/30 border-foreground/20"
                      : "bg-card border-transparent"
                  }`}
                >
                  <div
                    className="w-4 h-4 rounded-full flex-shrink-0"
                    style={{ backgroundColor: PERSONA_COLORS[score.persona] }}
                  />
                  <span className="font-medium text-foreground flex-1 text-left">
                    {details.name}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    ({score.score} pts)
                  </span>
                </button>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Your responses: 10/10
          </p>
        </motion.div>

        {/* Continue Button */}
        <motion.div variants={itemVariants} className="pt-2 pb-8">
          <Button
            onClick={() => navigate("/survey-results")}
            className="w-full h-12 text-base font-medium"
          >
            Continue to Your Results
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </motion.div>

      {/* Bottom Sheet for Persona Details */}
      <PersonaBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        persona={selectedPersona}
        score={selectedPersonaScore?.score}
        percentage={selectedPersonaScore?.percentage}
      />
    </div>
  );
};

export default PersonaWheel;
