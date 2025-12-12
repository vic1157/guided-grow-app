import { useState } from "react";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ScrollText, MessageSquare, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

type Tab = "scrolls" | "chats" | "quizzes";

const ScriptureExplorer = () => {
  const [activeTab, setActiveTab] = useState<Tab>("scrolls");
  const navigate = useNavigate();

  // Mock data for scrolls
  const scrolls = [
    {
      id: 1,
      title: "Jesus Rises, Sends Disciples",
      passage: "Matthew 5:1 - Matthew 5:48",
      duration: "8 mins",
      timestamp: "2hr ago",
      quizStatus: "Take Quiz >",
    },
    {
      id: 2,
      title: "The Lord Is My Shepherd",
      passage: "Psalm 23:1 - Psalm 23:6",
      duration: "6 mins",
      timestamp: "16hr ago",
      quizStatus: "10/15 Questions Correct",
    },
    {
      id: 3,
      title: "Jesus Rises, Sends Disciples",
      passage: "Matthew 5:1 - Matthew 5:48",
      duration: "20 mins",
      timestamp: "2 days ago",
      quizStatus: "Take Quiz >",
    },
    {
      id: 4,
      title: "The Lord Is My Shepherd",
      passage: "Psalm 23:1 - Psalm 23:6",
      duration: "6 mins",
      timestamp: "3 days ago",
      quizStatus: "5/7 Questions Correct",
    },
    {
      id: 5,
      title: "Jesus Rises, Sends Disciples",
      passage: "Matthew 5:1 - Matthew 5:48",
      duration: "20 mins",
      timestamp: "4 days ago",
      quizStatus: "Take Quiz >",
    },
    {
      id: 6,
      title: "The Lord Is My Shepherd",
      passage: "Psalm 23:1 - Psalm 23:6",
      duration: "6 mins",
      timestamp: "5 days ago",
      quizStatus: "8/12 Questions Correct",
    },
  ];

  // Mock data for chats
  const chats = [
    {
      id: 1,
      title: "Understanding Grace",
      passage: "Ephesians 2:8-9",
      timestamp: "1hr ago",
      preview: "What does it mean to be saved by grace?",
    },
    {
      id: 2,
      title: "Faith and Works",
      passage: "James 2:14-26",
      timestamp: "1 day ago",
      preview: "How do faith and works relate to salvation?",
    },
    {
      id: 3,
      title: "The Armor of God",
      passage: "Ephesians 6:10-18",
      timestamp: "3 days ago",
      preview: "Explain the pieces of spiritual armor",
    },
  ];

  // Mock data for quizzes
  const quizzes = [
    {
      id: 1,
      title: "Sermon on the Mount Quiz",
      passage: "Matthew 5-7",
      score: "12/15",
      timestamp: "2hr ago",
    },
    {
      id: 2,
      title: "Psalm 23 Understanding",
      passage: "Psalm 23",
      score: "10/10",
      timestamp: "1 day ago",
    },
    {
      id: 3,
      title: "Gospel of John Chapter 3",
      passage: "John 3",
      score: "8/12",
      timestamp: "4 days ago",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-foreground">Scripture Explorer</h1>
        </div>
      </header>

      {/* Action Buttons */}
      <div className="max-w-2xl mx-auto px-4 py-4 flex gap-3">
        <Button
          variant="default"
          className="flex-1"
          onClick={() => navigate("/chat")}
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          New Chat
        </Button>
        <Button
          variant="default"
          className="flex-1"
          onClick={() => navigate("/quiz-generator")}
        >
          <GraduationCap className="h-4 w-4 mr-2" />
          New Quiz
        </Button>
        <Button
          variant="outline"
          className="px-4"
          onClick={() => setActiveTab("scrolls")}
        >
          All Scrolls
        </Button>
        <Button
          variant="outline"
          className="px-4"
          onClick={() => setActiveTab("chats")}
        >
          All Chats
        </Button>
      </div>

      {/* Tab Content */}
      <div className="max-w-2xl mx-auto px-4 pb-4">
        {/* Scrolls Tab */}
        {activeTab === "scrolls" && (
          <div className="space-y-3">
            {scrolls.map((scroll) => (
              <div
                key={scroll.id}
                className="bg-card border border-border rounded-lg p-4 hover:bg-accent transition-colors cursor-pointer"
              >
                <div className="flex gap-3">
                  <div className="bg-muted rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                    <ScrollText className="h-6 w-6 text-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-1">{scroll.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {scroll.passage} • {scroll.duration}
                    </p>
                    <p className="text-sm font-medium text-foreground">{scroll.quizStatus}</p>
                  </div>
                  <div className="text-right text-sm text-muted-foreground flex-shrink-0">
                    {scroll.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Chats Tab */}
        {activeTab === "chats" && (
          <div className="space-y-3">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className="bg-card border border-border rounded-lg p-4 hover:bg-accent transition-colors cursor-pointer"
                onClick={() => navigate(`/chat/${chat.id}`)}
              >
                <div className="flex gap-3">
                  <div className="bg-muted rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="h-6 w-6 text-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-1">{chat.title}</h3>
                    <p className="text-sm text-muted-foreground mb-1">{chat.passage}</p>
                    <p className="text-sm text-muted-foreground truncate">{chat.preview}</p>
                  </div>
                  <div className="text-right text-sm text-muted-foreground flex-shrink-0">
                    {chat.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quizzes Tab */}
        {activeTab === "quizzes" && (
          <div className="space-y-3">
            {quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-card border border-border rounded-lg p-4 hover:bg-accent transition-colors cursor-pointer"
              >
                <div className="flex gap-3">
                  <div className="bg-muted rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="h-6 w-6 text-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-1">{quiz.title}</h3>
                    <p className="text-sm text-muted-foreground mb-1">{quiz.passage}</p>
                    <p className="text-sm font-medium text-foreground">Score: {quiz.score}</p>
                  </div>
                  <div className="text-right text-sm text-muted-foreground flex-shrink-0">
                    {quiz.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ScriptureExplorer;
