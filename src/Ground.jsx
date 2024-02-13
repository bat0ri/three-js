import React, { useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { MeshReflectorMaterial, Html } from "@react-three/drei";
import { LinearEncoding, RepeatWrapping, TextureLoader } from "three";
import { useAtom } from "jotai";
import { currentPageAtom } from "./components/UI";
import { degToRad } from "three/src/math/MathUtils";


const OverlayItem = ({
    className = "",
    title,
    description,
    bgColor,
    ...props
  }) => {
    const [currentPage] = useAtom(currentPageAtom);
    return (
      <Html
        transform
        distanceFactor={6.2}
        center
        className={`w-48 rounded-md overflow-hidden 
        ${
            currentPage === "title" ? "" : "opacity-0"
          }
          transition-opacity duration-1000 ${className}`}
        {...props}
      >
        <div className="bg-white bg-opacity-50 backdrop-blur-lg text-xs p-2 w-full">
          <h2 className="font-bold">{title}</h2>
          <p>{description}</p>
        </div>
        <button
          className={`${bgColor} hover:bg-opacity-50 transition-colors duration-500 px-4 py-2 font-bold text-white w-full text-xs`}
        >
          Чмок:)
        </button>
      </Html>
    );
  };

export function Ground({html, title, description, ...props}) {
  const [roughness, normal] = useLoader(TextureLoader, [
    process.env.PUBLIC_URL + "textures/ground-rought.jpg",
    process.env.PUBLIC_URL + "textures/ground-normal.jpg",
  ]);

  useEffect(() => {
    [normal, roughness].forEach((t) => {
      t.wrapS = RepeatWrapping;
      t.wrapT = RepeatWrapping;
      t.repeat.set(5, 5);
      t.offset.set(0, 0);
    });

    normal.encoding = LinearEncoding;
  }, [normal, roughness]);

  return (
    <>
    <group {...props} dispose={null}>

      {/* Пол */}
      <mesh rotation-x={-Math.PI * 0.5} castShadow receiveShadow>
        <planeGeometry args={[30, 30]} />
        <MeshReflectorMaterial
          envMapIntensity={0}
          normalMap={normal}
          normalScale={[0.15, 0.15]}
          roughnessMap={roughness}
          dithering={true}
          color={[0.5, 0.5, 0.5]}
          roughness={0.5}
          blur={[1000, 400]}
          mixBlur={30}
          mixStrength={80}
          mixContrast={1}
          resolution={1024}
          mirror={0}
          depthScale={0.01}
          minDepthThreshold={0.9}
          maxDepthThreshold={1}
          depthToBlurRatioBias={0.25}
          debug={0}
          reflectorOffset={0.2}
        />
      </mesh>

      <group>
        <mesh position={[0, 15, -15]} receiveShadow>
            <boxGeometry args={[30, 30, 0.1]} />
            <MeshReflectorMaterial
            envMapIntensity={0}
            color={[0.5, 0.5, 0.5]}
            metalness={0.1}
            roughness={0.5}
            />
        </mesh>
        {html && (
            <OverlayItem
              position-x={-2}
              position-y={4}
              position-z={-14.5}
              rotation-x={degToRad(-10)}
              title={title}
              description={description}
              bgColor={"bg-blue-500"}
              className="transition delay-700"
            />
          )}
        
      </group>


      <mesh position={[15, 15, 0]} rotation-y={Math.PI / 2} receiveShadow>
        <boxGeometry args={[30, 30, 0.1]} />
        <MeshReflectorMaterial
          envMapIntensity={0}
          color={[0.5, 0.5, 0.5]}
          metalness={0.1}
          roughness={0.5}
          roughnessMap={roughness}
          normalMap={normal}
        />
      </mesh>

      <mesh position={[-15, 15, 0]} receiveShadow>
        <boxGeometry args={[0.1, 30, 30]} />
        <MeshReflectorMaterial
          envMapIntensity={0}
          color={[0.5, 0.5, 0.5]}
          metalness={0.1}
          roughness={0.5}
          roughnessMap={roughness}
          normalMap={normal}
        />
      </mesh>
    
        <mesh position={[0, 15, 15]} receiveShadow>
            <boxGeometry args={[30, 30, 0.1]} />
            <MeshReflectorMaterial
                envMapIntensity={0}
                color={[0.5, 0.5, 0.5]}
                metalness={0.5}
                roughness={0.5}
                roughnessMap={roughness}
                normalMap={normal}
            />
        </mesh>
        </group>
    </>
  );
}
