import { useRef, useState } from 'react';
import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { CampusBuilding } from '../types';

interface BuildingProps {
  building: CampusBuilding;
  onEnter?: (id: string) => void;
}

export function Building({ building }: BuildingProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const [w, h, d] = building.size;
  const [px, , pz] = building.position;
  const py = h / 2;

  return (
    <group position={[px, 0, pz]}>
      {/* Main body */}
      <mesh
        ref={meshRef}
        position={[0, py, 0]}
        castShadow
        receiveShadow
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial
          color={hovered ? '#ffffff' : building.color}
          emissive={hovered ? building.color : '#000000'}
          emissiveIntensity={hovered ? 0.3 : 0}
        />
      </mesh>

      {/* Roof */}
      <mesh position={[0, h + 0.3, 0]} castShadow>
        <boxGeometry args={[w + 1, 0.6, d + 1]} />
        <meshStandardMaterial color="#555555" />
      </mesh>

      {/* Door */}
      <mesh position={[building.entranceOffset[0], 1.2, building.entranceOffset[2] > 0 ? d / 2 + 0.05 : building.entranceOffset[2] < 0 ? -d / 2 - 0.05 : 0]}>
        <boxGeometry args={[2, 2.4, 0.1]} />
        <meshStandardMaterial color="#5C4033" />
      </mesh>

      {/* Windows */}
      {Array.from({ length: Math.floor(w / 3) }).map((_, i) => (
        <group key={i}>
          <mesh position={[(-w / 2 + 2) + i * 3, h * 0.6, d / 2 + 0.05]}>
            <boxGeometry args={[1.2, 1.2, 0.05]} />
            <meshStandardMaterial color="#87CEEB" opacity={0.7} transparent />
          </mesh>
          <mesh position={[(-w / 2 + 2) + i * 3, h * 0.6, -d / 2 - 0.05]}>
            <boxGeometry args={[1.2, 1.2, 0.05]} />
            <meshStandardMaterial color="#87CEEB" opacity={0.7} transparent />
          </mesh>
        </group>
      ))}

      {/* Name label */}
      <Text
        position={[0, h + 1.5, 0]}
        fontSize={1}
        color={hovered ? '#FFD700' : '#333333'}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#ffffff"
      >
        {building.name}
      </Text>
    </group>
  );
}
