import { useState } from 'react';
import { CharacterSetup } from '@/game3d/CharacterSetup';
import { GameScene } from '@/game3d/GameScene';

interface GameConfig {
  playerName: string;
  university: string;
  department: string;
  playerColor: string;
}

const Index = () => {
  const [config, setConfig] = useState<GameConfig | null>(null);

  if (!config) {
    return <CharacterSetup onStart={setConfig} />;
  }

  return (
    <GameScene
      playerName={config.playerName}
      university={config.university}
      department={config.department}
      playerColor={config.playerColor}
      onBack={() => setConfig(null)}
    />
  );
};

export default Index;
