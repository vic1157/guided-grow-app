import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";

interface QuizQuestionData {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  verseReference?: string;
}

interface QuizQuestionProps {
  question: QuizQuestionData;
  selectedAnswer: number | null;
  onAnswerSelect: (answerIndex: number) => void;
  showCorrect?: boolean;
}

const QuizQuestion = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  showCorrect = false,
}: QuizQuestionProps) => {
  // Generate letter from index (A, B, C, D)
  const getLetter = (index: number) => String.fromCharCode(65 + index);

  return (
    <Card className="p-6 space-y-6 border-2 border-foreground/20">
      {/* Question */}
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-foreground leading-relaxed">
          {question.question}
        </h3>
        {question.verseReference && (
          <p className="text-sm text-muted-foreground italic">{question.verseReference}</p>
        )}
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = index === question.correctAnswer;
          const showAsCorrect = showCorrect && isCorrect;
          const showAsIncorrect = showCorrect && isSelected && !isCorrect;

          return (
            <button
              key={index}
              onClick={() => !showCorrect && onAnswerSelect(index)}
              disabled={showCorrect}
              className={`w-full flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all duration-200 ${
                showAsCorrect
                  ? 'border-green-500 bg-green-50 dark:bg-green-950'
                  : showAsIncorrect
                  ? 'border-red-500 bg-red-50 dark:bg-red-950'
                  : isSelected
                  ? 'border-foreground bg-accent'
                  : 'border-border hover:border-muted-foreground hover:bg-accent/30'
              } ${!showCorrect ? 'cursor-pointer hover:scale-[1.01]' : 'cursor-default'}`}
            >
              {/* Letter Badge */}
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 transition-all duration-200 ${
                  showAsCorrect
                    ? 'bg-green-500 text-white'
                    : showAsIncorrect
                    ? 'bg-red-500 text-white'
                    : isSelected
                    ? 'bg-foreground text-background'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {getLetter(index)}
              </div>

              {/* Option Text */}
              <span className="flex-1 text-sm font-medium leading-relaxed text-foreground">
                {option}
              </span>

              {/* Status Icon (in review mode) */}
              {showCorrect && (isSelected || isCorrect) && (
                <div className="flex-shrink-0">
                  {isCorrect ? (
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  ) : isSelected ? (
                    <XCircle className="h-6 w-6 text-red-600" />
                  ) : null}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation (shown in review mode) */}
      {showCorrect && question.explanation && (
        <div className="pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-semibold text-foreground">Explanation: </span>
            {question.explanation}
          </p>
        </div>
      )}
    </Card>
  );
};

export default QuizQuestion;
