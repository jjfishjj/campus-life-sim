interface Props {
  result: string;
  onContinue: () => void;
}

export function ResultScreen({ result, onContinue }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "var(--gradient-campus)" }}>
      <div className="max-w-lg w-full bg-card rounded-2xl border border-border shadow-lg p-8 text-center">
        <span className="text-5xl block mb-4">📋</span>
        <h2 className="text-xl font-bold text-foreground mb-4">結果</h2>
        <p className="text-foreground leading-relaxed mb-8">{result}</p>
        <button
          onClick={onContinue}
          className="bg-primary text-primary-foreground font-bold px-8 py-3 rounded-xl hover:opacity-90 transition-opacity"
        >
          繼續探索校園 →
        </button>
      </div>
    </div>
  );
}
