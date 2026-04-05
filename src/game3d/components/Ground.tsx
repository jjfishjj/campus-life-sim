import { useRef } from 'react';
import * as THREE from 'three';

export function Ground() {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <group>
      {/* Main ground */}
      <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#4a7c59" />
      </mesh>

      {/* Paths */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[3, 80]} />
        <meshStandardMaterial color="#b8a088" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[80, 3]} />
        <meshStandardMaterial color="#b8a088" />
      </mesh>

      {/* Diagonal path */}
      <mesh rotation={[-Math.PI / 2, Math.PI / 4, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[2.5, 50]} />
        <meshStandardMaterial color="#c4a882" />
      </mesh>

      {/* Sports field markings */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[25, 0.02, 14]}>
        <ringGeometry args={[4, 4.2, 32]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}
