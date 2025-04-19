import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { StrawberryModel } from '../StrawberryModel';
import { SceneContainer } from './styles';
import * as THREE from 'three';

export function Scene() {
  return (
    <SceneContainer>
      <Canvas
        camera={{
          position: [0, 0, 10],
          fov: 50,
          near: 0.1,
          far: 1000,
        }}
        shadows
        gl={{
          preserveDrawingBuffer: true,
          alpha: false,
          antialias: true,
          physicallyCorrectLights: true,
        }}
        onCreated={({ gl, scene }) => {
          gl.setPixelRatio(window.devicePixelRatio);
          gl.outputColorSpace = THREE.SRGBColorSpace;
          scene.background = new THREE.Color('#1a1a1a');
          console.log('Canvas created with color space:', gl.outputColorSpace);
        }}
      >
        {/* Environment */}
        <color attach="background" args={['#1a1a1a']} />
        
        {/* Lights */}
        <ambientLight intensity={1} />
        <hemisphereLight intensity={0.5} />
        
        {/* Main directional light */}
        <directionalLight
          position={[5, 5, 5]}
          intensity={2}
          castShadow
          shadow-mapSize={[2048, 2048]}
        >
          <orthographicCamera attach="shadow-camera" args={[-10, 10, 10, -10]} />
        </directionalLight>

        {/* Debug helpers */}
        {/* <gridHelper args={[10, 10]} />
        <axesHelper args={[5]} /> */}

        {/* Ground */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -2, 0]}
          receiveShadow
        >
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#333333" />
        </mesh>

        {/* Model */}
        <StrawberryModel />
        
        {/* Controls */}
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          minDistance={5}
          maxDistance={15}
          minPolarAngle={0}
          maxPolarAngle={Math.PI}
        />
      </Canvas>
    </SceneContainer>
  );
}