import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
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
  return (
    <Card className="p-6 space-y-4 border-2 border-foreground/20">
      {/* Question */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-foreground leading-relaxed">
          {question.question}
        </h3>
        {question.verseReference && (
          <p className="text-sm text-muted-foreground italic">{question.verseReference}</p>
        )}
      </div>

      {/* Options */}
      <RadioGroup
        value={selectedAnswer?.toString()}
        onValueChange={(value) => onAnswerSelect(parseInt(value))}
        disabled={showCorrect}
      >
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correctAnswer;
            const showStatus = showCorrect && isSelected;

            return (
              <div
                key={index}
                className={`flex items-start space-x-3 rounded-lg border-2 p-4 transition-colors ${
                  showCorrect
                    ? isCorrect
                      ? 'border-green-500 bg-green-50 dark:bg-green-950'
                      : isSelected
                      ? 'border-red-500 bg-red-50 dark:bg-red-950'
                      : 'border-border'
                    : isSelected
                    ? 'border-foreground bg-accent'
                    : 'border-border hover:border-muted-foreground'
                }`}
              >
                <RadioGroupItem
                  value={index.toString()}
                  id={`option-${index}`}
                  className="mt-0.5"
                />
                <Label
                  htmlFor={`option-${index}`}
                  className="flex-1 text-sm font-medium leading-relaxed cursor-pointer"
                >
                  {option}
                </Label>
                {showStatus && (
                  <>
                    {isCorrect ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </RadioGroup>

      {/* Explanation (shown in review mode) */}
      {showCorrect && question.explanation && (
        <div className="pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Explanation: </span>
            {question.explanation}
          </p>
        </div>
      )}
    </Card>
  );
};

export default QuizQuestion;
