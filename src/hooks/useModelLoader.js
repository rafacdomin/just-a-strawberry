import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import * as THREE from 'three';

export const useModelLoader = () => {
  console.log('Starting model loading...');

  try {
    // 1. Carregar texturas primeiro
    const bodyTexture = useLoader(TextureLoader, '/models/strawberry/texgen_1.png');
    const leafTexture = useLoader(TextureLoader, '/models/strawberry/texgen_2.png');
    const aoTexture = useLoader(TextureLoader, '/models/strawberry/texgen_0.png');

    // console.log('Textures loaded:', {
    //   bodyTexture: bodyTexture ? 'OK' : 'Failed',
    //   leafTexture: leafTexture ? 'OK' : 'Failed',
    //   aoTexture: aoTexture ? 'OK' : 'Failed'
    // });

    // Configurar texturas
    [bodyTexture, leafTexture, aoTexture].forEach(texture => {
      if (texture) {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.flipY = true;
      }
    });

    // 2. Carregar o modelo
    const obj = useLoader(OBJLoader, '/models/strawberry/model.obj');

    // console.log('Model loaded successfully:', obj);

    // 3. Criar materiais
    const bodyMaterial = new THREE.MeshStandardMaterial({
      map: bodyTexture,
      aoMap: aoTexture,
      aoMapIntensity: 1,
      roughness: 0.5,
      metalness: 0.1,
    });

    const leafMaterial = new THREE.MeshStandardMaterial({
      map: leafTexture,
      aoMap: aoTexture,
      aoMapIntensity: 1,
      roughness: 0.6,
      metalness: 0.1,
    });

    // 4. Aplicar materiais baseado no nome da mesh
    obj.traverse((child) => {
      if (child.isMesh) {
        // console.log('Processing mesh:', child.name);
        
        // Aplicar UV2 para ambient occlusion
        if (child.geometry.attributes.uv) {
          child.geometry.attributes.uv2 = child.geometry.attributes.uv;
        }

        // Aplicar material baseado no nome da mesh
        if (child.name === '_1') {
          child.material = leafMaterial;
        } else {
          child.material = bodyMaterial;
        }

        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    return obj;
  } catch (error) {
    // console.error('Error in useModelLoader:', error);
    throw error;
  }
};