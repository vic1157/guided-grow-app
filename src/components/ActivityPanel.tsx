import { useState } from "react";
import { motion, PanInfo } from "framer-motion";
import { Clock, Info, MessageCircleQuestion, Sparkles, Scroll, BookmarkPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActivityPanelProps {
  isActive?: boolean;
  onStartScroll?: () => void;
}

const ActivityPanel = ({ isActive = false, onStartScroll }: ActivityPanelProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [readingTime, setReadingTime] = useState("5:23");

  // Panel heights
  const CONTRACTED_HEIGHT = 80;
  const EXPANDED_HEIGHT = 240;

  const currentHeight = isExpanded ? EXPANDED_HEIGHT : CONTRACTED_HEIGHT;

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;

    if (info.offset.y < -threshold) {
      // Dragged up - expand
      setIsExpanded(true);
    } else if (info.offset.y > threshold) {
      // Dragged down - contract
      setIsExpanded(false);
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      className="fixed left-0 right-0 bg-card border-t-2 border-border z-40"
      style={{
        height: currentHeight,
        bottom: "72px", // Sits directly on footer
        borderTopLeftRadius: "24px",
        borderTopRightRadius: "24px",
      }}
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.1}
      onDragEnd={handleDragEnd}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
    >
      {/* Drag Handle */}
      <div
        className="absolute top-3 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-muted-foreground/30 rounded-full cursor-grab active:cursor-grabbing"
        onClick={toggleExpanded}
      />

      {/* Panel Content */}
      <div className="pt-6 px-6 pb-4 h-full overflow-hidden">
        {/* Separator Line at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-border" />
        {!isActive ? (
          // INACTIVE MODE
          <>
            {isExpanded ? (
              // Extended - Inactive
              <div className="flex items-center justify-center h-full">
                <div className="flex items-center justify-center gap-8">
                  <button
                    onClick={onStartScroll}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className="w-16 h-16 rounded-full bg-background border-2 border-border flex items-center justify-center group-hover:border-primary transition-colors">
                      <Scroll className="h-6 w-6 text-foreground" />
                    </div>
                    <span className="text-sm font-medium text-foreground">Start Scroll</span>
                  </button>

                  <button className="flex flex-col items-center gap-2 group">
                    <div className="w-16 h-16 rounded-full bg-background border-2 border-border flex items-center justify-center group-hover:border-primary transition-colors">
                      <Info className="h-6 w-6 text-foreground" />
                    </div>
                    <span className="text-sm font-medium text-foreground">Chapter Context</span>
                  </button>

                  <button className="flex flex-col items-center gap-2 group">
                    <div className="w-16 h-16 rounded-full bg-background border-2 border-border flex items-center justify-center group-hover:border-primary transition-colors">
                      <Sparkles className="h-6 w-6 text-foreground" />
                    </div>
                    <span className="text-sm font-medium text-foreground">Ask Leo</span>
                  </button>
                </div>
              </div>
            ) : (
              // Contracted - Inactive (just drag handle)
              <div className="flex items-center justify-center h-full" />
            )}
          </>
        ) : (
          // ACTIVE MODE
          <>
            {isExpanded ? (
              // Extended - Active
              <div className="flex flex-col justify-between h-full py-2">
                <div className="flex items-center justify-center gap-8">
                  <button className="flex flex-col items-center gap-2 group">
                    <div className="w-16 h-16 rounded-full bg-background border-2 border-border flex items-center justify-center group-hover:border-primary transition-colors">
                      <Info className="h-6 w-6 text-foreground" />
                    </div>
                    <span className="text-sm font-medium text-foreground">Chapter Context</span>
                  </button>

                  <button className="flex flex-col items-center gap-2 group">
                    <div className="w-16 h-16 rounded-full bg-background border-2 border-border flex items-center justify-center group-hover:border-primary transition-colors">
                      <MessageCircleQuestion className="h-6 w-6 text-foreground" />
                    </div>
                    <span className="text-sm font-medium text-foreground">Add Question</span>
                  </button>

                  <button className="flex flex-col items-center gap-2 group">
                    <div className="w-16 h-16 rounded-full bg-background border-2 border-border flex items-center justify-center group-hover:border-primary transition-colors">
                      <Sparkles className="h-6 w-6 text-foreground" />
                    </div>
                    <span className="text-sm font-medium text-foreground">Ask AI</span>
                  </button>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-background border border-border rounded-full">
                    <Clock className="h-5 w-5 text-foreground" />
                    <span className="text-sm font-medium text-foreground">
                      Reading Time: {readingTime}
                    </span>
                  </div>

                  <button className="w-12 h-12 rounded-lg bg-background border border-border flex items-center justify-center hover:border-primary transition-colors">
                    <BookmarkPlus className="h-5 w-5 text-foreground" />
                  </button>
                </div>
              </div>
            ) : (
              // Contracted - Active
              <div className="flex items-center justify-center h-full">
                <div className="flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-full">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Reading Time: {readingTime}
                  </span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default ActivityPanel;
