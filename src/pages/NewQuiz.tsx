import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, BookOpen, ChevronRight } from "lucide-react";

interface Scroll {
  id: string;
  title: string;
  scriptureReference: string;
  duration: string;
  timestamp: string;
  hasQuiz: boolean;
}

// Mock scrolls data (simplified)
const mockScrolls: Scroll[] = [
  {
    id: 'scroll-1',
    title: 'Jesus Rises, Sends Disciples',
    scriptureReference: 'Matthew 5:1 - Matthew 5:48',
    duration: '8 mins',
    timestamp: '2hr ago',
    hasQuiz: true,
  },
  {
    id: 'scroll-2',
    title: 'The Lord Is My Shepherd',
    scriptureReference: 'Psalm 23:1 - Psalm 23:6',
    duration: '6 mins',
    timestamp: '18hr ago',
    hasQuiz: true,
  },
  {
    id: 'scroll-3',
    title: 'In the Beginning',
    scriptureReference: 'Genesis 1:1 - Genesis 1:31',
    duration: '20 mins',
    timestamp: '2 days ago',
    hasQuiz: false,
  },
];

const NewQuiz = () => {
  const navigate = useNavigate();

  const handleScrollSelect = (scrollId: string) => {
    navigate(`/scroll/${scrollId}?startQuiz=true`);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card border-b-2 border-foreground/30">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/scripture-explorer')}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-5 w-5" />
            <span>Back</span>
          </Button>
          <h1 className="flex-1 text-lg font-semibold text-foreground text-center">Create New Quiz</h1>
          <div className="w-16" /> {/* Spacer for centering */}
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Instructions */}
        <div className="text-center space-y-2">
          <p className="text-foreground font-medium">Select a scroll to generate a quiz</p>
          <p className="text-sm text-muted-foreground">
            Choose from your reading history to test your understanding
          </p>
        </div>

        {/* Scrolls List */}
        <div className="space-y-3">
          {mockScrolls.map((scroll) => (
            <Card
              key={scroll.id}
              onClick={() => handleScrollSelect(scroll.id)}
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
                <p className="text-xs text-muted-foreground">{scroll.duration} • {scroll.timestamp}</p>
              </div>

              {/* Arrow */}
              <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            </Card>
          ))}
        </div>

        {/* Empty State (if no scrolls) */}
        {mockScrolls.length === 0 && (
          <div className="text-center py-12 space-y-2">
            <p className="text-muted-foreground">No scrolls available yet</p>
            <p className="text-sm text-muted-foreground">
              Complete some Bible readings first to generate quizzes
            </p>
            <Button
              variant="outline"
              onClick={() => navigate('/read')}
              className="mt-4"
            >
              Start Reading
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default NewQuiz;
