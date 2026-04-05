interface GameHUDProps {
  playerName: string;
  university: string;
  department: string;
}

export function GameHUD({ playerName, university, department }: GameHUDProps) {
  return (
    <div className="fixed top-4 left-4 z-40 space-y-2">
      <div className="bg-card/90 backdrop-blur-sm rounded-lg border border-border px-4 py-3 shadow-lg">
        <div className="text-lg font-bold text-foreground">{playerName}</div>
        <div className="text-xs text-muted-foreground">{university} · {department}</div>
      </div>

      <div className="bg-card/80 backdrop-blur-sm rounded-lg border border-border px-3 py-2 shadow text-xs text-muted-foreground">
        <div>WASD / 方向鍵：移動</div>
        <div>靠近 NPC 後點擊：對話</div>
      </div>
    </div>
  );
}
