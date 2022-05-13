import { useGLTF } from "@react-three/drei";

export default function Model() {
  const { scene } = useGLTF("/test.glb");
  return <primitive object={scene} />;
}

useGLTF.preload("/test.glb");
