import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CameraFollowProps {
  playerPosition: { x: number; z: number };
}

export function CameraFollow({ playerPosition }: CameraFollowProps) {
  const { camera } = useThree();
  const smoothPos = useRef(new THREE.Vector3(0, 18, 15));

  useFrame(() => {
    // Isometric-style follow camera
    const targetX = playerPosition.x;
    const targetZ = playerPosition.z + 15;
    const targetY = 18;

    smoothPos.current.x += (targetX - smoothPos.current.x) * 0.05;
    smoothPos.current.y += (targetY - smoothPos.current.y) * 0.05;
    smoothPos.current.z += (targetZ - smoothPos.current.z) * 0.05;

    camera.position.copy(smoothPos.current);
    camera.lookAt(playerPosition.x, 0, playerPosition.z);
  });

  return null;
}
