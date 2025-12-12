import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send, Sparkles } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const Chat = () => {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);

  // Initialize with demo messages if new chat
  useEffect(() => {
    if (!chatId) {
      // New chat - start with welcome message
      setMessages([
        {
          id: 1,
          role: "assistant",
          content:
            "Hello! I'm Leo, your AI Bible companion. I'm here to help you explore Scripture, answer questions about the Bible, and deepen your understanding of God's Word. What would you like to discuss today?",
          timestamp: new Date(),
        },
      ]);
    } else {
      // Load existing chat (mock data for demo)
      setMessages([
        {
          id: 1,
          role: "user",
          content: "What does it mean to be saved by grace?",
          timestamp: new Date(Date.now() - 3600000),
        },
        {
          id: 2,
          role: "assistant",
          content:
            "Great question! Being saved by grace means that salvation is a free gift from God that we cannot earn through our own efforts or good works. Ephesians 2:8-9 explains this beautifully: 'For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God—not by works, so that no one can boast.'\n\nGrace is God's unmerited favor. It means God loves us and offers us salvation despite our sins and shortcomings. We don't deserve it, but God freely gives it to those who place their faith in Jesus Christ.",
          timestamp: new Date(Date.now() - 3500000),
        },
        {
          id: 3,
          role: "user",
          content: "So does that mean our actions don't matter at all?",
          timestamp: new Date(Date.now() - 3400000),
        },
        {
          id: 4,
          role: "assistant",
          content:
            "Excellent follow-up question! Our actions absolutely matter, but they serve a different purpose than earning salvation.\n\nJames 2:17 says, 'Faith by itself, if it is not accompanied by action, is dead.' Our good works are the natural result and evidence of genuine faith, not the cause of our salvation.\n\nThink of it this way:\n• We are saved BY grace THROUGH faith (not by works)\n• But genuine faith PRODUCES good works\n• Our actions demonstrate and confirm our faith\n\nSo while works don't save us, they are an essential part of authentic Christian life. They show that our faith is real and they bring glory to God.",
          timestamp: new Date(Date.now() - 3300000),
        },
      ]);
    }
  }, [chatId]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, isFocused]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Handle viewport adjustment for mobile keyboard
  useEffect(() => {
    const handleResize = () => {
      if (isFocused && textareaRef.current) {
        // Scroll the input into view when keyboard appears
        setTimeout(() => {
          textareaRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }, 100);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isFocused]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: messages.length + 2,
        role: "assistant",
        content:
          "Thank you for your question! I'm a demo version, so I can't provide a real response right now. In the full app, I would analyze your question and provide thoughtful, Scripture-based insights to help you understand God's Word better. Feel free to continue exploring the interface!",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Fixed Header */}
      <header className="flex-shrink-0 bg-card border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/scripture-explorer")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2 flex-1">
            <div className="bg-primary/10 p-2 rounded-full">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="font-semibold text-foreground">Chat with Leo</h1>
              <p className="text-xs text-muted-foreground">AI Bible Companion</p>
            </div>
          </div>
        </div>
      </header>

      {/* Scrollable Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 py-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-lg px-4 py-3",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                )}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p
                  className={cn(
                    "text-xs mt-1",
                    message.role === "user"
                      ? "text-primary-foreground/70"
                      : "text-muted-foreground"
                  )}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" />
                  <div
                    className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <div
                    className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Fixed Input Area - Adjusts with keyboard */}
      <div
        ref={inputContainerRef}
        className="flex-shrink-0 bg-card border-t border-border"
      >
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex gap-2 items-end">
            <Textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Ask a question about Scripture..."
              className="min-h-[44px] max-h-[120px] resize-none"
              rows={1}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              size="icon"
              className="h-[44px] w-[44px] flex-shrink-0"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Demo mode • Responses are simulated
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
