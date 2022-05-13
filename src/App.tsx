import * as THREE from "three";
import React, { Suspense, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Preload, useCursor } from "@react-three/drei";
import { Test } from "./Model";

interface Position {
  x: number;
  y: number;
  z: number;
  w: number;
}

interface SceneProps {
  position?: Position;
}

function Scene(props: SceneProps) {
  const { position = { x: 0, y: 0, z: 0, w: 0 } } = props;
  const vec = new THREE.Vector3();
  useEffect(() => {
    console.log(position);
  }, [position]);

  useCursor(false);

  const getCameraPosition = useCallback(() => {
    return position;
  }, [position]);

  useFrame((state) => {
    const { x, y, z, w } = position;
    console.log("campos", x, y, z, w / 10);
    state.camera.position.lerp(vec.set(x, y, z), w / 10);
    state.camera.lookAt(0, 0, 0);
  });
  return (
    <group>
      <Test />
    </group>
  );
}

export default function App() {
  const [position, setPosition] = useState<Position>({
    x: 0,
    y: 0,
    z: 0,
    w: 0
  });
  const setPositionTarget = (target: "x" | "y" | "z" | "w") => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Number(event.target.value) || 0;
    setPosition((position) => ({ ...position, [target]: value }));
  };

  useEffect(() => {
    console.log(position);
  }, [position]);

  return (
    <>
      <input value={position.x} onChange={setPositionTarget("x")} />
      <input value={position.y} onChange={setPositionTarget("y")} />
      <input value={position.z} onChange={setPositionTarget("z")} />
      <input value={position.w} onChange={setPositionTarget("w")} />
      <Canvas dpr={[1, 2]} orthographic camera={{ zoom: 50 }}>
        <ambientLight />
        <Suspense fallback={null}>
          <Scene position={position} />
          <Preload all />
        </Suspense>
      </Canvas>
    </>
  );
}
