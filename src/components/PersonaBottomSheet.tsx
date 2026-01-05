import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { PersonaType, PERSONA_DETAILS, PERSONA_COLORS } from "@/types/persona";

interface PersonaBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  persona: PersonaType | null;
  score?: number;
  percentage?: number;
}

const PersonaBottomSheet = ({
  isOpen,
  onClose,
  persona,
  score,
  percentage,
}: PersonaBottomSheetProps) => {
  if (!persona) return null;

  const details = PERSONA_DETAILS[persona];

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="text-left">
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
              style={{ backgroundColor: PERSONA_COLORS[persona] }}
            >
              <span className="text-3xl">{details.emoji}</span>
            </div>
            <div className="flex-1">
              <DrawerTitle className="text-xl">{details.name}</DrawerTitle>
              <DrawerDescription className="text-base">
                {details.tagline}
              </DrawerDescription>
              {score !== undefined && percentage !== undefined && (
                <p className="text-sm font-medium mt-1" style={{ color: PERSONA_COLORS[persona] }}>
                  {score} points ({percentage}%)
                </p>
              )}
            </div>
          </div>
        </DrawerHeader>

        <div className="px-4 pb-8 space-y-5 overflow-y-auto">
          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">
            {details.description}
          </p>

          {/* Strengths */}
          <div>
            <h4 className="font-semibold mb-3 text-foreground">Your Strengths</h4>
            <ul className="space-y-2">
              {details.strengths.map((strength, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                    style={{ backgroundColor: PERSONA_COLORS[persona] }}
                  />
                  {strength}
                </li>
              ))}
            </ul>
          </div>

          {/* Biblical Anchor */}
          <blockquote
            className="border-l-4 pl-4 py-2 bg-muted/30 rounded-r-lg"
            style={{ borderColor: PERSONA_COLORS[persona] }}
          >
            <p className="italic text-foreground leading-relaxed">
              "{details.biblicalAnchor.verse}"
            </p>
            <cite className="block text-sm text-muted-foreground mt-2 not-italic font-medium">
              - {details.biblicalAnchor.reference}
            </cite>
          </blockquote>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default PersonaBottomSheet;
