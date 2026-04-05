import { useState, useCallback, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Ground } from './components/Ground';
import { Building } from './components/Building';
import { PlayerCharacter } from './components/PlayerCharacter';
import { NPCCharacter } from './components/NPCCharacter';
import { FakePlayerCharacter } from './components/FakePlayerCharacter';
import { CameraFollow } from './components/CameraFollow';
import { Trees } from './components/Trees';
import { DialogueBox } from './components/DialogueBox';
import { GameHUD } from './components/GameHUD';
import { campusBuildings, npcs, createFakePlayers } from './campusData';
import { NPCData } from './types';

interface GameSceneProps {
  playerName: string;
  university: string;
  department: string;
  playerColor: string;
  onBack: () => void;
}

export function GameScene({ playerName, university, department, playerColor, onBack }: GameSceneProps) {
  const [playerPos, setPlayerPos] = useState({ x: 0, z: 0 });
  const [activeNPC, setActiveNPC] = useState<NPCData | null>(null);
  const fakePlayers = useMemo(() => createFakePlayers(), []);

  const handlePositionChange = useCallback((pos: { x: number; z: number }) => {
    setPlayerPos(pos);
  }, []);

  const handleNPCInteract = useCallback((npc: NPCData) => {
    setActiveNPC(npc);
  }, []);

  // E key for NPC interaction
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'e' && !activeNPC) {
        // Find nearest NPC within range
        let closest: NPCData | null = null;
        let closestDist = 3;
        for (const npc of npcs) {
          const dx = npc.position.x - playerPos.x;
          const dz = npc.position.z - playerPos.z;
          const d = Math.sqrt(dx * dx + dz * dz);
          if (d < closestDist) {
            closestDist = d;
            closest = npc;
          }
        }
        if (closest) setActiveNPC(closest);
      }
      if (e.key === 'Escape') {
        setActiveNPC(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeNPC, playerPos]);

  return (
    <div className="w-full h-screen relative">
      <Canvas
        shadows
        camera={{ position: [0, 18, 15], fov: 50 }}
        style={{ background: 'linear-gradient(180deg, #87CEEB 0%, #B0E0E6 50%, #E0F0FF 100%)' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[20, 30, 10]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={100}
          shadow-camera-left={-50}
          shadow-camera-right={50}
          shadow-camera-top={50}
          shadow-camera-bottom={-50}
        />
        <hemisphereLight args={['#87CEEB', '#4a7c59', 0.3]} />

        <Ground />
        <Trees />

        {campusBuildings.map((b) => (
          <Building key={b.id} building={b} />
        ))}

        <PlayerCharacter
          name={playerName}
          color={playerColor}
          onPositionChange={handlePositionChange}
        />

        {npcs.map((npc) => (
          <NPCCharacter
            key={npc.id}
            npc={npc}
            playerPosition={playerPos}
            onInteract={handleNPCInteract}
          />
        ))}

        {fakePlayers.map((fp) => (
          <FakePlayerCharacter key={fp.id} player={fp} />
        ))}

        <CameraFollow playerPosition={playerPos} />
      </Canvas>

      <GameHUD playerName={playerName} university={university} department={department} />

      {/* Back button */}
      <button
        onClick={onBack}
        className="fixed top-4 right-4 z-40 bg-card/90 backdrop-blur-sm border border-border rounded-lg px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors shadow-lg"
      >
        ← 返回選單
      </button>

      {activeNPC && (
        <DialogueBox npc={activeNPC} onClose={() => setActiveNPC(null)} />
      )}
    </div>
  );
}
