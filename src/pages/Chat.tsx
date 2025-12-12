import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ChatMessage from "@/components/ChatMessage";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, Send } from "lucide-react";

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

// Mock chats data (same as in ScriptureExplorer)
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
        content: 'The Beatitudes are Jesus\' teachings about the attitudes and characteristics of those in God\'s kingdom. They appear at the beginning of the Sermon on the Mount (Matthew 5:3-12) and describe nine blessings. Each one starts with "Blessed are..." and describes a spiritual quality followed by a promise. They\'re revolutionary because they turn worldly values upside down - blessing the poor, the mourning, the meek, etc. Would you like me to explain any specific Beatitude in more detail?',
        timestamp: '3hr ago'
      },
      {
        id: 'm3',
        sender: 'user',
        content: 'Yes, what does "poor in spirit" mean?',
        timestamp: '3hr ago'
      },
      {
        id: 'm4',
        sender: 'leo',
        content: 'Great question! "Poor in spirit" means recognizing our spiritual poverty and complete dependence on God. It\'s the opposite of spiritual pride or self-sufficiency. Those who are poor in spirit acknowledge they have nothing to offer God on their own merit - they need His grace, mercy, and salvation. It\'s about humility before God, recognizing that everything we have comes from Him. This is why Jesus says "theirs is the kingdom of heaven" - because they\'ve stopped trying to earn their way in and instead receive it as a gift.',
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
        content: 'There are several faithful theological perspectives on the creation days. Some Christians interpret them as literal 24-hour days (Young Earth Creationism), while others see them as longer periods of time or literary frameworks to communicate theological truths rather than scientific chronology. The key theological points that all perspectives affirm are: 1) God created everything, 2) Creation was purposeful and good, 3) Humanity is uniquely made in God\'s image, and 4) God is sovereign over all creation. Different Christians land in different places on the scientific details while holding these core truths.',
        timestamp: '1d ago'
      }
    ],
    createdAt: '1d ago',
    updatedAt: '1d ago'
  },
];

const Chat = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load existing chat or show welcome message
  useEffect(() => {
    const chatId = searchParams.get('id');
    if (chatId) {
      const existingChat = mockChats.find(c => c.id === chatId);
      if (existingChat) {
        setMessages(existingChat.messages);
      }
    } else {
      // New chat - show welcome message
      setMessages([{
        id: 'welcome',
        sender: 'leo',
        content: "Hi, I'm Leo, your AI Bible companion! I'm here to help you understand Scripture better and grow in your faith. What would you like to explore today?",
        timestamp: 'now'
      }]);
    }
  }, [searchParams]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      content: inputValue,
      timestamp: 'now'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate Leo's response after a short delay
    setTimeout(() => {
      const leoResponse: ChatMessage = {
        id: `msg-${Date.now()}-leo`,
        sender: 'leo',
        content: "This is a demo response. In the full app, Leo would provide helpful, contextual answers about the Bible based on your question. Leo can explain passages, answer theological questions, and help you understand Scripture better!",
        timestamp: 'now'
      };
      setMessages(prev => [...prev, leoResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-background">
      {/* Header */}
      <header className="flex-shrink-0 bg-card border-b-2 border-foreground/30 z-10">
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
          <h1 className="flex-1 text-lg font-semibold text-foreground text-center">AI Assistant</h1>
          <div className="w-16" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto overscroll-contain min-h-0">
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                <span className="text-sm font-semibold">L</span>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-sm text-muted-foreground">Leo is typing...</p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area - Fixed to bottom */}
      <div className="flex-shrink-0 border-t border-border bg-card z-10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-end gap-3" style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}>
          <Textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 min-h-[44px] max-h-32 resize-none text-base"
            rows={1}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            size="icon"
            className="h-11 w-11 rounded-full bg-foreground text-background hover:bg-foreground/90 flex-shrink-0"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
