import { characters, Character } from "@/game/gameData";

export function CharacterSelect({ onSelect }: { onSelect: (c: Character) => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{ background: "var(--gradient-campus)" }}>
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-black text-foreground mb-2">
          🎓 大學生存戰
        </h1>
        <p className="text-lg text-muted-foreground">選擇你的角色，開始大學冒險！</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl w-full">
        {characters.map((char) => (
          <button
            key={char.id}
            onClick={() => onSelect(char)}
            className="bg-card border-2 border-border rounded-xl p-5 text-left hover:border-primary hover:shadow-lg transition-all duration-200 group"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-4xl group-hover:scale-110 transition-transform">{char.emoji}</span>
              <div>
                <h3 className="font-bold text-foreground text-lg">{char.name}</h3>
                <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  {char.title}
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{char.description}</p>
            <div className="grid grid-cols-5 gap-1">
              {(["academic", "social", "health", "money", "stress"] as const).map((key) => (
                <div key={key} className="text-center">
                  <div className="text-[10px] text-muted-foreground">
                    {key === "academic" ? "📚" : key === "social" ? "💬" : key === "health" ? "❤️" : key === "money" ? "💰" : "😰"}
                  </div>
                  <div className="text-xs font-bold text-foreground">{char.stats[key]}</div>
                </div>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
