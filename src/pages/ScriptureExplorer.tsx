import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import ScrollListItem from "@/components/ScrollListItem";
import ChatListItem from "@/components/ChatListItem";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCirclePlus, ClipboardList, Compass } from "lucide-react";

// Data interfaces
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

interface ChatMessage {
  id: string;
  sender: 'user' | 'leo';
  content: string;
  timestamp: string;
}

interface Chat {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
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
    summary: 'Contains the beginning of Jesus\' Sermon on the Mount, starting with the Beatitudes that describe the blessed nature of the humble, merciful, and peacemakers.',
    questions: [
      {
        id: 'q1',
        type: 'understanding',
        text: 'What did Jesus mean when he said he came to "fulfill the law" rather than abolish it?',
        verseReference: 'Matthew 5:17'
      }
    ],
    reflection: 'After reading Matthew 5, I find myself struck by the radical nature of Jesus\' call to love enemies and pray for those who persecute us.',
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
    summary: 'David\'s beloved psalm about God as shepherd, expressing complete trust in God\'s provision and protection.',
    questions: [],
    reflection: 'This psalm brings me such comfort in difficult times. The imagery of God as a shepherd who provides, protects, and guides is so reassuring.',
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

const mockChats: Chat[] = [
  {
    id: 'chat-1',
    title: 'Understanding the Beatitudes',
    messages: [
      {
        id: 'm1',
        sender: 'user',
        content: 'Can you explain what the Beatitudes mean and why they\'re important?',
        timestamp: '3hr ago'
      },
      {
        id: 'm2',
        sender: 'leo',
        content: 'The Beatitudes are Jesus\' teachings about the attitudes and characteristics of those in God\'s kingdom...',
        timestamp: '3hr ago'
      }
    ],
    createdAt: '3hr ago',
    updatedAt: '3hr ago'
  },
  {
    id: 'chat-2',
    title: 'Questions about Genesis Creation',
    messages: [
      {
        id: 'm5',
        sender: 'user',
        content: 'How should I interpret the creation days in Genesis 1?',
        timestamp: '1d ago'
      },
      {
        id: 'm6',
        sender: 'leo',
        content: 'There are several faithful theological perspectives on the creation days...',
        timestamp: '1d ago'
      }
    ],
    createdAt: '1d ago',
    updatedAt: '1d ago'
  },
];

const ScriptureExplorer = () => {
  const navigate = useNavigate();

  const handleScrollClick = (scrollId: string) => {
    navigate(`/scroll/${scrollId}`);
  };

  const handleChatClick = (chatId: string) => {
    navigate(`/chat?id=${chatId}`);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card border-b-2 border-foreground/30">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-foreground/10 flex items-center justify-center">
              <Compass className="h-5 w-5 text-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Scripture Explorer</h1>
              <p className="text-xs text-muted-foreground">Your scrolls, chats & quizzes</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Quick Actions */}
        <div className="space-y-3">
          <Card
            onClick={() => navigate('/chat')}
            className="p-4 flex items-center justify-between hover:bg-accent transition-colors cursor-pointer"
          >
            <div>
              <h3 className="font-semibold text-foreground">New Chat</h3>
              <p className="text-sm text-muted-foreground">Start a conversation with Leo</p>
            </div>
            <MessageCirclePlus className="h-6 w-6 text-foreground" />
          </Card>

          <Card
            onClick={() => navigate('/new-quiz')}
            className="p-4 flex items-center justify-between hover:bg-accent transition-colors cursor-pointer"
          >
            <div>
              <h3 className="font-semibold text-foreground">New Quiz</h3>
              <p className="text-sm text-muted-foreground">Test your knowledge on a scroll</p>
            </div>
            <ClipboardList className="h-6 w-6 text-foreground" />
          </Card>
        </div>

        {/* Tabbed Content */}
        <Tabs defaultValue="scrolls" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="scrolls">Scrolls</TabsTrigger>
            <TabsTrigger value="chats">Chats</TabsTrigger>
          </TabsList>

          <TabsContent value="scrolls" className="mt-4 space-y-3">
            {mockScrolls.length > 0 ? (
              mockScrolls.map((scroll) => (
                <ScrollListItem
                  key={scroll.id}
                  scroll={scroll}
                  onClick={() => handleScrollClick(scroll.id)}
                />
              ))
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>No scrolls yet</p>
                <p className="text-sm mt-2">Start reading to create your first scroll</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="chats" className="mt-4 space-y-3">
            {mockChats.length > 0 ? (
              mockChats.map((chat) => (
                <ChatListItem
                  key={chat.id}
                  chat={chat}
                  onClick={() => handleChatClick(chat.id)}
                />
              ))
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>No chats yet</p>
                <p className="text-sm mt-2">Start a conversation with Leo to ask questions</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default ScriptureExplorer;
