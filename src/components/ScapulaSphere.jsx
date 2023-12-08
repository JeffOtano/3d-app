import { Suspense } from "react";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { Canvas, Html, useProgress, useLoader } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Sphere } from "@react-three/drei";

const Model = ({ screenScale }) => {
  const geometry = useLoader(STLLoader, "/models/Scapula.stl");
  return (
    <mesh
      geometry={geometry}
      scale={0.05 * screenScale}
      position={[-1 * screenScale, 1 * screenScale, 0]}
      rotation={[1.4, 2.7, 3.6]}
      roughness={0.1}
      metalness={0.1}
    >
      <meshStandardMaterial color="#F8F0E3" />
    </mesh>
  );
};

const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <p className="text-white">{progress} % loaded</p>
    </Html>
  );
};

export const ScapulaSphere = ({ x, y, z, screenScale, orbitControl }) => {
  return (
    <Canvas className="w-full">
      <PerspectiveCamera position={[0, 0, 5]} fov={75} />
      <Suspense fallback={Loader}>
        <ambientLight position={[0, 0, 0]} intensity={0.8} />
        <pointLight position={[0, 10, 0]} intensity={100} />
        {orbitControl && <OrbitControls />}
        <Model screenScale={screenScale} />
        <Sphere
          args={[1 * screenScale, 16, 16]}
          position={[x, y, z]}
          roughness={0.1}
          metalness={0.1}
        >
          <meshStandardMaterial color="#F8F0E3" />
          <pointLight position={[0, 0, 0]} intensity={1} />
        </Sphere>
      </Suspense>
    </Canvas>
  );
};
