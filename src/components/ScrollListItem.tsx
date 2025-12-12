import { Card } from "@/components/ui/card";
import { BookOpen, ChevronRight, Clock } from "lucide-react";

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

interface ScrollListItemProps {
  scroll: Scroll;
  onClick: () => void;
}

const ScrollListItem = ({ scroll, onClick }: ScrollListItemProps) => {
  return (
    <Card
      onClick={onClick}
      className="p-4 flex items-center gap-3 hover:bg-accent transition-colors cursor-pointer border-2 border-foreground/10"
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
        <BookOpen className="h-6 w-6 text-muted-foreground" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-1">
        <h3 className="font-semibold text-foreground">{scroll.title}</h3>
        <p className="text-sm text-muted-foreground truncate">
          {scroll.scriptureReference}
        </p>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{scroll.duration}</span>
          </div>
          <span>•</span>
          <span>{scroll.timestamp}</span>
        </div>
        {scroll.hasQuiz && scroll.quizScore && (
          <p className="text-sm text-foreground font-medium">
            {scroll.quizScore.correct}/{scroll.quizScore.total} Questions Correct
          </p>
        )}
        {scroll.hasQuiz && !scroll.quizScore && (
          <p className="text-sm text-accent font-medium">
            Take Quiz &gt;
          </p>
        )}
      </div>

      {/* Arrow */}
      <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
    </Card>
  );
};

export default ScrollListItem;
