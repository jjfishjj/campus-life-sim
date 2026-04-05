import { locations } from "@/game/gameData";
import { Stats } from "@/game/gameData";
import { StatsPanel } from "./StatsPanel";

const locationStyles: Record<string, string> = {
  "campus-blue": "border-stat-academic hover:bg-stat-academic/10",
  "campus-yellow": "border-stat-money hover:bg-stat-money/10",
  "campus-green": "border-stat-health hover:bg-stat-health/10",
  "campus-pink": "border-stat-social hover:bg-stat-social/10",
  "campus-purple": "border-stat-stress hover:bg-stat-stress/10",
};

interface Props {
  stats: Stats;
  day: number;
  characterName: string;
  characterEmoji: string;
  onVisit: (locationId: string) => void;
}

export function CampusMap({ stats, day, characterName, characterEmoji, onVisit }: Props) {
  return (
    <div className="min-h-screen p-4 md:p-6" style={{ background: "var(--gradient-campus)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-3xl">{characterEmoji}</span>
            <div>
              <h2 className="text-xl font-bold text-foreground">{characterName}的大學生活</h2>
              <p className="text-sm text-muted-foreground">選擇要去的地方</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {locations.map((loc) => (
              <button
                key={loc.id}
                onClick={() => onVisit(loc.id)}
                className={`bg-card border-2 ${locationStyles[loc.color] || "border-border"} rounded-xl p-4 text-left transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0`}
              >
                <span className="text-3xl block mb-2">{loc.emoji}</span>
                <h3 className="font-bold text-foreground text-sm">{loc.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{loc.description}</p>
              </button>
            ))}
          </div>
          <div>
            <StatsPanel stats={stats} day={day} />
          </div>
        </div>
      </div>
    </div>
  );
}
