import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { useKeyboard } from '../useKeyboard';
import { campusBuildings } from '../campusData';

interface PlayerCharacterProps {
  name: string;
  color: string;
  onPositionChange: (pos: { x: number; z: number }) => void;
}

function checkBuildingCollision(x: number, z: number, padding = 1.5): boolean {
  for (const b of campusBuildings) {
    const [bx, , bz] = b.position;
    const [w, , d] = b.size;
    const halfW = w / 2 + padding;
    const halfD = d / 2 + padding;
    if (x > bx - halfW && x < bx + halfW && z > bz - halfD && z < bz + halfD) {
      return true;
    }
  }
  return false;
}

export function PlayerCharacter({ name, color, onPositionChange }: PlayerCharacterProps) {
  const groupRef = useRef<THREE.Group>(null);
  const keys = useKeyboard();
  const speed = 0.15;
  const boundary = 45;

  useFrame(() => {
    if (!groupRef.current) return;

    let dx = 0, dz = 0;
    const k = keys.current;

    if (k.has('w') || k.has('arrowup')) dz -= 1;
    if (k.has('s') || k.has('arrowdown')) dz += 1;
    if (k.has('a') || k.has('arrowleft')) dx -= 1;
    if (k.has('d') || k.has('arrowright')) dx += 1;

    if (dx === 0 && dz === 0) return;

    const len = Math.sqrt(dx * dx + dz * dz);
    dx = (dx / len) * speed;
    dz = (dz / len) * speed;

    const newX = THREE.MathUtils.clamp(groupRef.current.position.x + dx, -boundary, boundary);
    const newZ = THREE.MathUtils.clamp(groupRef.current.position.z + dz, -boundary, boundary);

    if (!checkBuildingCollision(newX, newZ)) {
      groupRef.current.position.x = newX;
      groupRef.current.position.z = newZ;

      // Face movement direction
      const angle = Math.atan2(dx, dz);
      groupRef.current.rotation.y = angle;
    }

    onPositionChange({ x: groupRef.current.position.x, z: groupRef.current.position.z });
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Body */}
      <mesh position={[0, 1, 0]} castShadow>
        <capsuleGeometry args={[0.4, 0.8, 8, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 2, 0]} castShadow>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color="#FFDAB9" />
      </mesh>

      {/* Hair */}
      <mesh position={[0, 2.25, 0]}>
        <sphereGeometry args={[0.38, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#333333" />
      </mesh>

      {/* Name tag */}
      <Text
        position={[0, 2.8, 0]}
        fontSize={0.35}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.04}
        outlineColor="#000000"
      >
        {name}
      </Text>
    </group>
  );
}
