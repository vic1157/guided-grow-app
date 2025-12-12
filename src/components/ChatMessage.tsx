import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ChatMessageProps {
  message: {
    id: string;
    sender: 'user' | 'leo';
    content: string;
    timestamp: string;
  };
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  if (message.sender === 'leo') {
    return (
      <div className="flex items-start gap-3">
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarFallback className="bg-accent text-foreground text-sm font-semibold">
            L
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1">
          <div className="bg-muted rounded-lg p-3 max-w-[85%]">
            <p className="text-sm text-foreground leading-relaxed">{message.content}</p>
          </div>
          <p className="text-xs text-muted-foreground pl-2">{message.timestamp}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start justify-end gap-3">
      <div className="flex-1 space-y-1 flex flex-col items-end">
        <div className="bg-foreground text-background rounded-lg p-3 max-w-[85%]">
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>
        <p className="text-xs text-muted-foreground pr-2">{message.timestamp}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
