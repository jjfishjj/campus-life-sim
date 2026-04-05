import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { FakePlayer } from '../types';

interface FakePlayerCharacterProps {
  player: FakePlayer;
}

export function FakePlayerCharacter({ player }: FakePlayerCharacterProps) {
  const groupRef = useRef<THREE.Group>(null);
  const target = useRef({ ...player.targetPosition });
  const timer = useRef(Math.random() * 5);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    timer.current += delta;
    if (timer.current > 5 + Math.random() * 5) {
      timer.current = 0;
      const angle = Math.random() * Math.PI * 2;
      const radius = 5 + Math.random() * 15;
      target.current = {
        x: Math.cos(angle) * radius,
        y: 0,
        z: Math.sin(angle) * radius,
        rotation: 0,
      };
    }

    const dx = target.current.x - groupRef.current.position.x;
    const dz = target.current.z - groupRef.current.position.z;
    const dist = Math.sqrt(dx * dx + dz * dz);

    if (dist > 0.5) {
      const s = player.speed * delta;
      groupRef.current.position.x += (dx / dist) * s;
      groupRef.current.position.z += (dz / dist) * s;
      groupRef.current.rotation.y = Math.atan2(dx, dz);
    }
  });

  return (
    <group ref={groupRef} position={[player.position.x, 0, player.position.z]}>
      {/* Body */}
      <mesh position={[0, 1, 0]} castShadow>
        <capsuleGeometry args={[0.35, 0.7, 8, 16]} />
        <meshStandardMaterial color={player.color} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 1.9, 0]} castShadow>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#FFDAB9" />
      </mesh>

      {/* Name */}
      <Text
        position={[0, 2.6, 0]}
        fontSize={0.25}
        color="#CCCCCC"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.03}
        outlineColor="#000000"
      >
        {player.name}
      </Text>
    </group>
  );
}
