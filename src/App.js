import React, { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import "./index.css";
import {
    CameraControls,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Ground } from './Ground';
import { Heart } from './Heart';
import { MeshReflectorMaterial } from "@react-three/drei";
import { useAtom } from 'jotai';
import { UI, currentPageAtom } from './components/UI';



function BoxShow() {
    
    const controls = useRef();
    const meshFitCameraHome = useRef();
    const meshFitCameraTitle = useRef();
    const meshFitCameraSecond = useRef();
    const [currentPage, setCurrentPage] = useAtom(currentPageAtom);

    const intro = async () => {
        controls.current.dolly(-5);
        controls.current.smoothTime = 0.5;
        setTimeout(() => {
            setCurrentPage("home");
          }, 1200);
        fitCamera();
    }

    const fitCamera = () => {
        if (currentPage === "title") {
            controls.current.fitToBox(meshFitCameraTitle.current, true);
        }
    }

    useEffect(() => {
        intro();
    }, [])

    useEffect(() => {
        if (currentPage === 'intro') {

        } else {
            fitCamera();
            window.addEventListener("resize", fitCamera);
            return () => window.removeEventListener("resize", fitCamera);
        }
      }, [currentPage]);


    return (
        <>

            <CameraControls ref={controls}
                fov={55}
                enableRotate={false}
                maxPolarAngle={1.5}
                minPolarAngle={0.9} 
                maxAzimuthAngle={Math.PI / 6} 
                minAzimuthAngle={-Math.PI / 6}
                minDistance={1}
                maxDistance={15}
                minZoom={10}
                maxZoom={10}
            />


            <color args={[0, 0, 0]} attach="background" />

            <spotLight
                color={[1, 0.25, 0.7]}
                intensity={200}
                angle={currentPage === "title" ? 1.6 : 0.6}
                penumbra={0.5}
                position={[5, 10, -5]}
                castShadow={false}
                shadow-bias={-0.0001}
            />

            <spotLight
                color={[0.14, 0.5, 1]}
                intensity={200}
                angle={currentPage === "title" ? 1.6 : 0.6}
                penumbra={1.5}
                position={[-6, 10, 2]}
                castShadow={false}
                shadow-bias={-0.0001}
            />

            <mesh ref={meshFitCameraTitle} position={[-2, 4, -13]} rotation-y={- Math.PI / 2} receiveShadow>
                <boxGeometry args={[0.01, 5, 1]} />
                <MeshReflectorMaterial
                color='orange'
                transparent
                opacity={0.001}
                />
            </mesh>



            <mesh ref={meshFitCameraSecond} position={[10, 4, -13]} rotation-y={- Math.PI / 2} receiveShadow>
                <boxGeometry args={[0.01, 5, 1]} />
                <MeshReflectorMaterial
                color='orange'
                transparent
                opacity={0.001}
                />
            </mesh>

            <Ground
                html
                title={"Happy Valentine's Day"}
                description={
                    "В этот прекрасный день любви хочу поделиться с тобой всем своим восхищением и благодарностью за то, что ты есть в моей жизни. Ты делаешь ее особенной и невероятной. Пусть наша любовь будет столь же крепкой, как дуб, и столь же нежной, как лепестки розы. С любовью в День Святого Валентина!"
                }
                />

            <Heart/>

        </>
    );
}


const App = () => {

  return (
    <>
        <Canvas shadows enableRotate={false}  camera={{position: [5, 5, 5],
                near: 0.01, 
                far: 1000 
                }}>
            <Suspense fallback={null}>
                <BoxShow />
            </Suspense>
        </Canvas>
        <UI/>
    </>
  )
}


  
  export default App;
