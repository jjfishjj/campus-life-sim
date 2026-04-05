import { useState } from 'react';
import { universities, departments } from './types';

interface CharacterSetupProps {
  onStart: (config: {
    playerName: string;
    university: string;
    department: string;
    playerColor: string;
  }) => void;
}

const colorOptions = [
  { label: '藍色校服', value: '#4A90D9' },
  { label: '紅色外套', value: '#D94A4A' },
  { label: '綠色運動服', value: '#4AD97A' },
  { label: '紫色帽T', value: '#9B59B6' },
  { label: '橘色背心', value: '#E67E22' },
  { label: '粉色洋裝', value: '#E91E8C' },
];

export function CharacterSetup({ onStart }: CharacterSetupProps) {
  const [name, setName] = useState('月光族');
  const [uni, setUni] = useState(universities[0].id);
  const [dept, setDept] = useState(departments[0].id);
  const [color, setColor] = useState(colorOptions[0].value);

  const selectedUni = universities.find((u) => u.id === uni)?.name || '';
  const selectedDept = departments.find((d) => d.id === dept)?.name || '';

  const handleStart = () => {
    onStart({
      playerName: name || '月光族',
      university: selectedUni,
      department: selectedDept,
      playerColor: color,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'var(--gradient-campus)' }}>
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-2">
            🏫 PeiTalk 大學風雲錄
          </h1>
          <p className="text-muted-foreground">創建你的角色，探索 3D 大學校園！</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-lg space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">角色名稱</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={10}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="輸入角色名稱"
            />
          </div>

          {/* University */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">選擇大學</label>
            <select
              value={uni}
              onChange={(e) => setUni(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {universities.map((u) => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">選擇科系</label>
            <select
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {departments.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>

          {/* Color / Outfit */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">選擇服裝</label>
            <div className="grid grid-cols-3 gap-2">
              {colorOptions.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setColor(c.value)}
                  className={`rounded-lg border-2 px-3 py-2 text-xs font-medium transition-all ${
                    color === c.value
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border text-muted-foreground hover:border-primary/50'
                  }`}
                >
                  <div
                    className="w-6 h-6 rounded-full mx-auto mb-1 border border-border"
                    style={{ backgroundColor: c.value }}
                  />
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleStart}
            className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg hover:opacity-90 transition-opacity text-lg"
          >
            🎮 進入校園
          </button>
        </div>
      </div>
    </div>
  );
}
