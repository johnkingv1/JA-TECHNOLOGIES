
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber';
import { PerspectiveCamera, Points, PointMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Use ThreeElements from @react-three/fiber to properly type intrinsic Three.js JSX elements.
// We augment the global JSX namespace to ensure compatibility across different React/TS configurations.
declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

const FondoEstelarProfundo = () => {
  const pointsRef = useRef<THREE.Points>(null!);
  const [positions] = useMemo(() => {
    const pos = new Float32Array(2500 * 3);
    for (let i = 0; i < 2500; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 200;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 200;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 200;
    }
    return [pos];
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.005;
    const material = pointsRef.current.material as THREE.PointsMaterial;
    if (material) material.opacity = 0.5 + Math.sin(t * 0.8) * 0.2;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.25}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const GalaxiaJA = () => {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 16000;
  
  const parametros = {
    radio: 12,
    ramas: 3,
    giro: 1.6,
    aleatoriedad: 0.5,
    potenciaAleatoriedad: 3,
    colorInterior: '#facc15',
    colorExterior: '#06b6d4',
  };

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorInterior = new THREE.Color(parametros.colorInterior);
    const colorExterior = new THREE.Color(parametros.colorExterior);

    for (let i = 0; i < count; i++) {
      const radio = Math.random() * parametros.radio;
      const anguloGiro = radio * parametros.giro;
      const anguloRama = ((i % parametros.ramas) / parametros.ramas) * Math.PI * 2;

      const randomX = Math.pow(Math.random(), parametros.potenciaAleatoriedad) * (Math.random() < 0.5 ? 1 : -1) * parametros.aleatoriedad * radio;
      const randomY = Math.pow(Math.random(), parametros.potenciaAleatoriedad) * (Math.random() < 0.5 ? 1 : -1) * parametros.aleatoriedad * radio;
      const randomZ = Math.pow(Math.random(), parametros.potenciaAleatoriedad) * (Math.random() < 0.5 ? 1 : -1) * parametros.aleatoriedad * radio;

      pos[i * 3] = Math.cos(anguloRama + anguloGiro) * radio + randomX;
      pos[i * 3 + 1] = randomY / 2.5; 
      pos[i * 3 + 2] = Math.sin(anguloRama + anguloGiro) * radio + randomZ;

      const colorMezcla = colorInterior.clone();
      colorMezcla.lerp(colorExterior, radio / parametros.radio);
      
      col[i * 3] = colorMezcla.r;
      col[i * 3 + 1] = colorMezcla.g;
      col[i * 3 + 2] = colorMezcla.b;
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const mouse = state.mouse;

    // Rotación constante automática
    pointsRef.current.rotation.y = t * 0.15;

    // Hipersensibilidad al mouse
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, -mouse.y * 1.2, 0.1);
    pointsRef.current.rotation.z = THREE.MathUtils.lerp(pointsRef.current.rotation.z, mouse.x * 0.8, 0.1);
    
    const material = pointsRef.current.material as THREE.PointsMaterial;
    if (material) {
      material.size = 0.1 + Math.sin(t * 4) * 0.02;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <Points ref={pointsRef} positions={positions} colors={colors} stride={3}>
        <PointMaterial
          transparent
          vertexColors
          size={0.15}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.9}
        />
      </Points>
      
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial 
          color="#facc15" 
          emissive="#facc15" 
          emissiveIntensity={15} 
          toneMapped={false}
        />
      </mesh>
    </group>
  );
};

export const Hero3D = () => {
  return (
    <div className="h-[95vh] w-full relative overflow-hidden bg-black flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Canvas gl={{ antialias: true, alpha: true }}>
          {/* Cámara más cerca para que la galaxia sea visible y dominante */}
          <PerspectiveCamera makeDefault position={[0, 5, 12]} fov={60} />
          <ambientLight intensity={0.1} />
          <pointLight position={[0, 0, 0]} intensity={8} color="#facc15" />
          
          <FondoEstelarProfundo />
          <GalaxiaJA />
          
          <fog attach="fog" args={['#000000', 5, 30]} />
        </Canvas>
      </div>

      <div className="relative z-10 w-full max-w-7xl px-6 flex flex-col items-center pointer-events-none text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className="mb-6">
             <span className="text-yellow-500 font-mono text-[10px] tracking-[1.2em] uppercase animate-pulse font-bold">
               Sincronizando Sistemas_Elite
             </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 uppercase neon-yellow-text italic leading-none">
            JA Technologies
          </h1>
          
          <div className="relative mb-14 flex flex-col items-center">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "280px" }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="h-[1px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent mb-6"
            />
            <p className="text-zinc-400 font-mono tracking-[0.3em] text-[10px] md:text-xs uppercase font-light">
              Ingeniería en Informática <span className="text-yellow-500 mx-2">/</span> Arquitectura de Sistemas Críticos
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 pointer-events-auto">
            <motion.a 
              whileHover={{ scale: 1.1, boxShadow: "0 0 35px rgba(250, 204, 21, 0.5)" }}
              whileTap={{ scale: 0.9 }}
              href="#proyectos" 
              className="px-12 py-4 bg-[#facc15] text-black text-[10px] font-black tracking-[0.3em] uppercase rounded-sm transition-all shadow-lg"
            >
              Navegar Ecosistema
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.1, borderColor: "#facc15", color: "#facc15" }}
              whileTap={{ scale: 0.9 }}
              href="#contacto" 
              className="px-12 py-4 border border-zinc-800 text-zinc-500 text-[10px] font-black tracking-[0.3em] uppercase rounded-sm transition-all"
            >
              Enlace Directo
            </motion.a>
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#facc15 1px, transparent 1px), linear-gradient(90deg, #facc15 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
      
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black via-black/90 to-transparent z-20" />
    </div>
  );
};
