import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, useTexture, Points, PointMaterial } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';
import * as Tone from 'tone';

function generateSphericalPositions(count: number, radius: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    const r = radius + (Math.random() - 0.5) * 2;
    
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  return positions;
}

function QuantumField() {
  const pointsRef = useRef<THREE.Points>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  
  const synth = useMemo(() => new Tone.Synth().toDestination(), []);
  
  const particleCount = 2000;
  const positions = useMemo(() => generateSphericalPositions(particleCount, 3), []);
  
  useFrame(({ clock }) => {
    if (pointsRef.current && sphereRef.current) {
      const time = clock.getElapsedTime();
      
      // Rotate the quantum field
      pointsRef.current.rotation.y = time * 0.1;
      sphereRef.current.rotation.y = time * -0.05;
      
      // Animate particles
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3 + 1] += Math.sin(time + i * 0.1) * 0.01;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      
      // Trigger sound occasionally
      if (Math.random() < 0.001) {
        const note = ['C4', 'E4', 'G4', 'B4'][Math.floor(Math.random() * 4)];
        synth.triggerAttackRelease(note, '8n');
      }
    }
  });

  return (
    <group>
      <Points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <PointMaterial
          size={0.05}
          color="#4299e1"
          transparent
          opacity={0.6}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </Points>
      
      <Sphere ref={sphereRef} args={[2.5, 64, 64]}>
        <meshPhongMaterial
          color="#1a365d"
          transparent
          opacity={0.2}
          wireframe
          side={THREE.DoubleSide}
        />
      </Sphere>
    </group>
  );
}

function QuantumRings() {
  const ringsRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (ringsRef.current) {
      const time = clock.getElapsedTime();
      ringsRef.current.rotation.x = Math.sin(time * 0.5) * 0.3;
      ringsRef.current.rotation.y = time * 0.2;
    }
  });

  return (
    <group ref={ringsRef}>
      {[2.8, 3.2, 3.6].map((radius, index) => (
        <mesh key={index} rotation-x={Math.PI * 0.5}>
          <torusGeometry args={[radius, 0.02, 16, 100]} />
          <meshPhongMaterial
            color="#4299e1"
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

export const QuantumVisualizer: React.FC = () => {
  useEffect(() => {
    // Start audio context when user interacts
    const handleInteraction = () => {
      if (Tone.context.state !== 'running') {
        Tone.start();
      }
    };
    
    window.addEventListener('click', handleInteraction);
    return () => window.removeEventListener('click', handleInteraction);
  }, []);

  return (
    <div className="relative h-[600px] w-full rounded-lg overflow-hidden bg-gray-900">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <color attach="background" args={['#000']} />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <QuantumField />
        <QuantumRings />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI * 0.3}
          maxPolarAngle={Math.PI * 0.7}
        />
        
        <EffectComposer>
          <Bloom
            intensity={1}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            height={300}
          />
          <ChromaticAberration offset={[0.002, 0.002]} />
        </EffectComposer>
      </Canvas>
      
      <div className="absolute bottom-4 left-4 text-white text-sm opacity-60">
        Click anywhere to enable audio visualization
      </div>
    </div>
  );
};