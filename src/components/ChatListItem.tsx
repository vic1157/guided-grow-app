import { Card } from "@/components/ui/card";
import { MessageCircle, ChevronRight } from "lucide-react";

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

interface ChatListItemProps {
  chat: Chat;
  onClick: () => void;
}

const ChatListItem = ({ chat, onClick }: ChatListItemProps) => {
  // Get the last message for preview
  const lastMessage = chat.messages[chat.messages.length - 1];

  return (
    <Card
      onClick={onClick}
      className="p-4 flex items-center gap-3 hover:bg-accent transition-colors cursor-pointer border-2 border-foreground/10"
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
        <MessageCircle className="h-6 w-6 text-muted-foreground" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-1">
        <h3 className="font-semibold text-foreground">{chat.title}</h3>
        <p className="text-sm text-muted-foreground truncate">
          {lastMessage.content}
        </p>
        <p className="text-xs text-muted-foreground">{chat.updatedAt}</p>
      </div>

      {/* Arrow */}
      <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
    </Card>
  );
};

export default ChatListItem;
