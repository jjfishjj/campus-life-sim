import { useState } from 'react';
import { NPCData } from '../types';

interface DialogueBoxProps {
  npc: NPCData;
  onClose: () => void;
}

export function DialogueBox({ npc, onClose }: DialogueBoxProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const line = npc.dialogue[lineIndex];

  const handleNext = () => {
    if (lineIndex < npc.dialogue.length - 1) {
      setLineIndex(lineIndex + 1);
    } else {
      onClose();
    }
  };

  if (!line) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div
        className="max-w-2xl mx-auto bg-card/95 backdrop-blur-sm border-2 border-primary rounded-xl p-5 shadow-xl cursor-pointer"
        onClick={handleNext}
      >
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-2xl shrink-0 border-2 border-border"
            style={{ backgroundColor: npc.color + '33' }}
          >
            🧑‍🏫
          </div>

          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold text-primary mb-1">{line.speaker}</div>
            <div className="text-foreground text-base leading-relaxed">{line.text}</div>
          </div>
        </div>

        <div className="text-right mt-2">
          <span className="text-xs text-muted-foreground">
            {lineIndex < npc.dialogue.length - 1 ? '點擊繼續 ▶' : '點擊關閉 ✕'}
          </span>
        </div>
      </div>
    </div>
  );
}
