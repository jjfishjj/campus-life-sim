import { Stats } from "@/game/gameData";

const statConfig = [
  { key: "academic" as const, label: "學業", emoji: "📚", color: "bg-stat-academic" },
  { key: "social" as const, label: "社交", emoji: "💬", color: "bg-stat-social" },
  { key: "health" as const, label: "健康", emoji: "❤️", color: "bg-stat-health" },
  { key: "money" as const, label: "金錢", emoji: "💰", color: "bg-stat-money" },
  { key: "stress" as const, label: "壓力", emoji: "😰", color: "bg-stat-stress" },
];

export function StatsPanel({ stats, day }: { stats: Stats; day: number }) {
  return (
    <div className="bg-card rounded-xl border border-border p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-foreground">📊 狀態面板</h3>
        <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
          📅 第 {day} 天
        </span>
      </div>
      <div className="space-y-2.5">
        {statConfig.map((s) => (
          <div key={s.key} className="flex items-center gap-2">
            <span className="text-sm w-16 flex items-center gap-1">
              <span>{s.emoji}</span>
              <span className="text-xs font-medium text-foreground">{s.label}</span>
            </span>
            <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full ${s.color} rounded-full transition-all duration-500 ease-out`}
                style={{ width: `${stats[s.key]}%` }}
              />
            </div>
            <span className="text-xs font-mono text-muted-foreground w-8 text-right">
              {stats[s.key]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
