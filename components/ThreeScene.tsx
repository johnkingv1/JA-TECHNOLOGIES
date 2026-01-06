
import React, { useRef } from 'react';
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber';
import { PerspectiveCamera, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Use ThreeElements from @react-three/fiber to properly type intrinsic Three.js JSX elements.
// We augment the global JSX namespace to ensure compatibility across different React/TS configurations.
declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

const FluorescentStar = () => {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Complex rotation for a more "active" feel
    meshRef.current.rotation.x = t * 0.5;
    meshRef.current.rotation.y = t * 0.8;
    meshRef.current.rotation.z = t * 0.3;
  });

  return (
    /* Use group, mesh and other three.js components which are now typed via ThreeElements augmentation */
    <group position={[0, 0, -2]}>
      <mesh ref={meshRef} scale={[1.8, 1.8, 1.8]}>
        {/* Using a TorusKnot with specific p and q to look like a complex tech-star */}
        <torusKnotGeometry args={[2, 0.04, 128, 16, 2, 3]} />
        <meshStandardMaterial 
          color="#ccff00" 
          emissive="#ccff00" 
          emissiveIntensity={8} 
          toneMapped={false}
        />
      </mesh>
      
      {/* Secondary glowing rings for the star effect */}
      <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[3.8, 0.01, 16, 100]} />
        <meshStandardMaterial color="#ccff00" emissive="#ccff00" emissiveIntensity={3} />
      </mesh>
      <mesh rotation={[-Math.PI / 4, Math.PI / 3, 0]}>
        <torusGeometry args={[4.2, 0.005, 16, 100]} />
        <meshStandardMaterial color="#ccff00" emissive="#ccff00" emissiveIntensity={2} />
      </mesh>
    </group>
  );
};

export const Hero3D = () => {
  return (
    <div className="h-[70vh] w-full relative">
      <Canvas gl={{ antialias: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#3b82f6" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#ccff00" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        {/* Only the Background Fluorescent Star remains */}
        <FluorescentStar />
        
      </Canvas>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <h1 className="text-7xl md:text-9xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-2 font-mono drop-shadow-[0_0_35px_rgba(204,255,0,0.5)]">
          NEXUS
        </h1>
        <p className="text-blue-400 font-mono tracking-[0.5em] text-sm md:text-lg uppercase">
          Neural-Linked Tech Ecosystem
        </p>
      </div>
    </div>
  );
};
