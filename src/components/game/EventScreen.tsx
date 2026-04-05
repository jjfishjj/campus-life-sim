import { GameEvent, Choice, Stats } from "@/game/gameData";
import { StatsPanel } from "./StatsPanel";

interface Props {
  event: GameEvent;
  stats: Stats;
  day: number;
  onChoice: (choice: Choice) => void;
}

function EffectTag({ label, value }: { label: string; value: number }) {
  if (value === 0) return null;
  const isPositive = value > 0;
  return (
    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${isPositive ? "bg-stat-health/20 text-stat-health" : "bg-accent/20 text-accent"}`}>
      {label} {isPositive ? "+" : ""}{value}
    </span>
  );
}

export function EventScreen({ event, stats, day, onChoice }: Props) {
  const effectLabels: Record<string, string> = {
    academic: "📚", social: "💬", health: "❤️", money: "💰", stress: "😰",
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "var(--gradient-campus)" }}>
      <div className="max-w-2xl w-full">
        <div className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden">
          <div className="p-6 border-b border-border" style={{ background: "var(--gradient-hero)" }}>
            <h2 className="text-2xl font-black text-primary-foreground">{event.title}</h2>
          </div>
          <div className="p-6">
            <p className="text-foreground text-base mb-6 leading-relaxed">{event.description}</p>
            <div className="space-y-3">
              {event.choices.map((choice, i) => (
                <button
                  key={i}
                  onClick={() => onChoice(choice)}
                  className="w-full text-left bg-muted/50 hover:bg-primary/10 border border-border hover:border-primary rounded-xl p-4 transition-all duration-200 group"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-sm font-bold text-primary bg-primary/10 rounded-full w-6 h-6 flex items-center justify-center shrink-0">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <div>
                      <p className="font-medium text-foreground text-sm mb-1.5">{choice.text}</p>
                      <div className="flex flex-wrap gap-1">
                        {Object.entries(choice.effects).map(([key, val]) =>
                          val ? <EffectTag key={key} label={effectLabels[key] || key} value={val} /> : null
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <StatsPanel stats={stats} day={day} />
        </div>
      </div>
    </div>
  );
}
