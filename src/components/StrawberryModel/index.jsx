import { useRef, Suspense, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useModelLoader } from '../../hooks/useModelLoader';
import gsap from 'gsap'

const LoadingBox = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="#ff4069" wireframe />
  </mesh>
);

const Model = () => {
  const groupRef = useRef();
  const model = useModelLoader();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  const handleJump = () => {
    if (groupRef.current) {

      gsap.to(groupRef.current.position, {
        y: 3,
        duration: 0.3,
        ease: 'power2.out',
        yoyo: true,
        repeat: 1,
      })
    }
  }

  useEffect(() => {
    window.addEventListener('strawberry-jump', handleJump)
    return () => { window.removeEventListener('strawberry-jump', handleJump) }
  }, [handleJump])

  return (
    <group
      ref={groupRef}
      scale={[6, 6, 6]}
      position={[0, 0, 0]}
    >
      <primitive object={model} />
    </group>
  );
};

export const StrawberryModel = () => {
  return (
    <Suspense fallback={<LoadingBox />}>
      <Model />
    </Suspense>
  );
};
