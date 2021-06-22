import { useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Loader } from "@react-three/drei";

const Sphere = (props) => {
  const mesh = useRef();
  return (
    <mesh {...props} ref={mesh} scale={1.8}>
      <sphereBufferGeometry args={[1, 64, 64]} />
      <meshPhysicalMaterial
        envMapIntensity={0.4}
        clearcoat={1}
        clearcoatRoughness={0}
        roughness={1}
        color="#0e2536"
        metalness={0.9}
      />
    </mesh>
  );
};

const Logo = () => {
  return (
    <>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} className="Author-pic">
        <spotLight
          intensity={0.5}
          angle={0.2}
          penumbra={1}
          position={[5, 15, 10]}
        />
        <pointLight position={[-20, -5, -10]} color="red" intensity={0.8} />
        <Suspense fallback={null}>
          <Sphere />
          <Environment preset="dawn" />
        </Suspense>
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
      <Loader />
    </>
  );
};

export default Logo;
