import { Stats } from "@/game/gameData";

interface Props {
  stats: Stats;
  day: number;
  characterName: string;
  log: string[];
  onRestart: () => void;
}

function getEnding(stats: Stats, day: number): { title: string; emoji: string; description: string } {
  if (stats.health <= 0) return { title: "身體撐不住了...", emoji: "🏥", description: "你因為過度操勞而倒下了。健康是一切的基礎啊！" };
  if (stats.stress >= 100) return { title: "壓力爆表！", emoji: "🤯", description: "你承受不住壓力，決定休學一學期。適當放鬆很重要！" };

  const total = stats.academic + stats.social + stats.health + stats.money;
  const avg = total / 4;

  if (avg >= 70) return { title: "完美大學生活！", emoji: "🏆", description: "你在各方面都取得了優異的成績！學業、社交、健康、財務全面發展，堪稱人生贏家！" };
  if (stats.academic >= 80) return { title: "學術之星", emoji: "⭐", description: "你的學業表現出色，成功申請到了研究所！雖然其他方面可能有些犧牲，但學術道路上你是閃耀的。" };
  if (stats.social >= 80) return { title: "社交蝴蝶", emoji: "🦋", description: "你認識了超多朋友，人脈廣闘！畢業後靠著強大的人際網路找到了好工作。" };
  if (stats.money >= 80) return { title: "理財高手", emoji: "💎", description: "你存了不少錢，畢業後直接創業！雖然大學生活沒那麼精彩，但口袋滿滿的。" };
  if (avg >= 50) return { title: "平凡但充實", emoji: "😊", description: "你度過了一段平衡的大學生活。不是最頂尖的，但每一天都有收穫。" };
  return { title: "跌跌撞撞的青春", emoji: "🌱", description: "大學生活充滿挑戰，你還在摸索中。但沒關係，人生就是不斷學習的過程！" };
}

export function GameOverScreen({ stats, day, characterName, log, onRestart }: Props) {
  const ending = getEnding(stats, day);

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "var(--gradient-campus)" }}>
      <div className="max-w-lg w-full bg-card rounded-2xl border border-border shadow-lg overflow-hidden">
        <div className="p-8 text-center" style={{ background: "var(--gradient-hero)" }}>
          <span className="text-6xl block mb-3">{ending.emoji}</span>
          <h2 className="text-2xl font-black text-primary-foreground">{ending.title}</h2>
        </div>
        <div className="p-6">
          <p className="text-foreground text-center mb-6 leading-relaxed">{ending.description}</p>

          <div className="bg-muted/50 rounded-xl p-4 mb-6">
            <h3 className="font-bold text-foreground text-sm mb-3">🎓 {characterName}的最終成績</h3>
            <div className="grid grid-cols-5 gap-2 text-center">
              {[
                { label: "📚 學業", val: stats.academic },
                { label: "💬 社交", val: stats.social },
                { label: "❤️ 健康", val: stats.health },
                { label: "💰 金錢", val: stats.money },
                { label: "😰 壓力", val: stats.stress },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                  <div className="text-lg font-black text-foreground">{s.val}</div>
                </div>
              ))}
            </div>
          </div>

          <details className="mb-6">
            <summary className="text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground">
              📜 查看完整日誌（{log.length}筆）
            </summary>
            <div className="mt-2 max-h-40 overflow-y-auto text-xs text-muted-foreground space-y-1 bg-muted/30 rounded-lg p-3">
              {log.map((entry, i) => (
                <p key={i}>{entry}</p>
              ))}
            </div>
          </details>

          <button
            onClick={onRestart}
            className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-xl hover:opacity-90 transition-opacity"
          >
            🔄 再玩一次
          </button>
        </div>
      </div>
    </div>
  );
}
