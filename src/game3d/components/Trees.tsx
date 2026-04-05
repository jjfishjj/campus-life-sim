import { useMemo } from 'react';

interface TreeData {
  x: number;
  z: number;
  scale: number;
}

export function Trees() {
  const trees = useMemo<TreeData[]>(() => {
    const result: TreeData[] = [];
    for (let i = 0; i < 40; i++) {
      const x = (Math.random() - 0.5) * 80;
      const z = (Math.random() - 0.5) * 80;
      // Avoid placing on buildings/paths
      const onPath = Math.abs(x) < 2.5 || Math.abs(z) < 2.5;
      const onBuilding =
        (Math.abs(x) < 12 && Math.abs(z + 20) < 8) ||
        (Math.abs(x + 25) < 10 && Math.abs(z) < 8) ||
        (Math.abs(x - 25) < 12 && Math.abs(z) < 10) ||
        (Math.abs(x) < 13 && Math.abs(z - 20) < 8) ||
        (Math.abs(x + 20) < 8 && Math.abs(z - 20) < 6) ||
        (Math.abs(x - 20) < 9 && Math.abs(z - 20) < 8);
      if (!onPath && !onBuilding) {
        result.push({ x, z, scale: 0.7 + Math.random() * 0.6 });
      }
    }
    return result;
  }, []);

  return (
    <group>
      {trees.map((tree, i) => (
        <group key={i} position={[tree.x, 0, tree.z]} scale={tree.scale}>
          {/* Trunk */}
          <mesh position={[0, 1.2, 0]} castShadow>
            <cylinderGeometry args={[0.2, 0.3, 2.4, 8]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          {/* Canopy */}
          <mesh position={[0, 3, 0]} castShadow>
            <sphereGeometry args={[1.5, 8, 8]} />
            <meshStandardMaterial color="#2E8B57" />
          </mesh>
        </group>
      ))}
    </group>
  );
}
