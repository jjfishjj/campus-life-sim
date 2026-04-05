import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { NPCData } from '../types';

interface NPCCharacterProps {
  npc: NPCData;
  playerPosition: { x: number; z: number };
  onInteract: (npc: NPCData) => void;
}

export function NPCCharacter({ npc, playerPosition, onInteract }: NPCCharacterProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const wanderTarget = useRef({ x: npc.position.x, z: npc.position.z });
  const wanderTimer = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Check distance to player
    const dx = groupRef.current.position.x - playerPosition.x;
    const dz = groupRef.current.position.z - playerPosition.z;
    const dist = Math.sqrt(dx * dx + dz * dz);
    setShowPrompt(dist < 3);

    // Wandering logic
    if (npc.type === 'wandering') {
      wanderTimer.current += delta;
      if (wanderTimer.current > 3 + Math.random() * 4) {
        wanderTimer.current = 0;
        wanderTarget.current = {
          x: npc.position.x + (Math.random() - 0.5) * 12,
          z: npc.position.z + (Math.random() - 0.5) * 12,
        };
      }

      const tx = wanderTarget.current.x - groupRef.current.position.x;
      const tz = wanderTarget.current.z - groupRef.current.position.z;
      const tDist = Math.sqrt(tx * tx + tz * tz);
      if (tDist > 0.5) {
        groupRef.current.position.x += (tx / tDist) * 0.02;
        groupRef.current.position.z += (tz / tDist) * 0.02;
        groupRef.current.rotation.y = Math.atan2(tx, tz);
      }
    }
  });

  const handleClick = () => {
    if (showPrompt) onInteract(npc);
  };

  return (
    <group
      ref={groupRef}
      position={[npc.position.x, 0, npc.position.z]}
      rotation={[0, npc.position.rotation, 0]}
      onClick={handleClick}
    >
      {/* Body */}
      <mesh position={[0, 1, 0]} castShadow>
        <capsuleGeometry args={[0.4, 0.8, 8, 16]} />
        <meshStandardMaterial color={npc.color} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 2, 0]} castShadow>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color="#FFDAB9" />
      </mesh>

      {/* Name */}
      <Text
        position={[0, 2.8, 0]}
        fontSize={0.28}
        color="#FFD700"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.03}
        outlineColor="#000000"
      >
        {npc.name}
      </Text>

      {/* Interaction prompt */}
      {showPrompt && (
        <Text
          position={[0, 3.3, 0]}
          fontSize={0.3}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.04}
          outlineColor="#000000"
        >
          按 E 或點擊對話
        </Text>
      )}
    </group>
  );
}
