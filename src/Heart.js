import React, { useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";


export function Heart() {
  const gltf = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "models/heart/scene.gltf"
  );
  
  useEffect(() => {
    gltf.scene.scale.set(1.1, 1.6, 1.4);
    gltf.scene.position.set(0, 2.3, -1);
    gltf.scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 20;
      }
    });
  }, [gltf]);

  useFrame((state, delta) => {
    // Добавим вращение по оси Y каждый кадр
    gltf.scene.rotation.y += 0.01;
  });

  return <primitive object={gltf.scene} />;
}