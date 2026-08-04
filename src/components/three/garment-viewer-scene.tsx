"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { bodyPanelOptions, createGarmentGeometry, sleevePanelOptions } from "@/lib/three/garment-geometry";
import { createGarmentMaterial } from "@/lib/three/garment-material";

export type ViewerPreset = "front" | "back" | "sleeve" | "embroidery";

const PRESET_POSITIONS: Record<ViewerPreset, [number, number, number]> = {
  front: [0, 0.1, 3.2],
  back: [0, 0.1, -3.2],
  sleeve: [1.6, -0.1, 1.6],
  embroidery: [0.6, -0.5, 1.1],
};

interface GarmentViewerSceneProps {
  colorHex: string;
  autoRotate: boolean;
  preset: ViewerPreset;
  seed: string;
}

function ViewerGarment({ colorHex, seed }: { colorHex: string; seed: string }) {
  const bodyGeometry = useMemo(() => createGarmentGeometry(bodyPanelOptions(`${seed}-body`)), [seed]);
  const sleeveLGeometry = useMemo(() => createGarmentGeometry(sleevePanelOptions(`${seed}-sleeve-l`, -1)), [seed]);
  const sleeveRGeometry = useMemo(() => createGarmentGeometry(sleevePanelOptions(`${seed}-sleeve-r`, 1)), [seed]);

  // Initial colour is a neutral placeholder — the effect below syncs the
  // real colour immediately on mount and on every change, so the material
  // instances themselves don't need to depend on (and be recreated by) colorHex.
  const bodyMaterial = useMemo(() => createGarmentMaterial({ base: "#0d0d0d", rim: "#ad8a54", sweep: "#c9cbcf" }, 0), []);
  const sleeveLMaterial = useMemo(() => createGarmentMaterial({ base: "#0d0d0d", rim: "#ad8a54", sweep: "#c9cbcf" }, 2.1), []);
  const sleeveRMaterial = useMemo(() => createGarmentMaterial({ base: "#0d0d0d", rim: "#ad8a54", sweep: "#c9cbcf" }, 4.3), []);

  useEffect(() => {
    for (const mat of [bodyMaterial, sleeveLMaterial, sleeveRMaterial]) {
      mat.uniforms.uBaseColor.value = new THREE.Color(colorHex);
      mat.uniforms.uReveal.value = 1;
    }
  }, [colorHex, bodyMaterial, sleeveLMaterial, sleeveRMaterial]);

  useFrame((state, delta) => {
    for (const mat of [bodyMaterial, sleeveLMaterial, sleeveRMaterial]) {
      mat.uniforms.uTime.value += delta;
    }
  });

  return (
    <group position={[0, -0.1, 0]}>
      <mesh geometry={bodyGeometry} material={bodyMaterial} />
      <mesh geometry={sleeveLGeometry} material={sleeveLMaterial} position={[-0.28, -0.05, 0.02]} rotation={[0, 0, -0.18]} />
      <mesh geometry={sleeveRGeometry} material={sleeveRMaterial} position={[0.28, -0.05, 0.02]} rotation={[0, 0, 0.18]} />
    </group>
  );
}

/**
 * Drives the camera to a preset position on demand, then hands control
 * back to OrbitControls — avoids fighting the user's manual drag/zoom.
 */
function CameraRig({ preset, controlsRef }: { preset: ViewerPreset; controlsRef: React.RefObject<OrbitControlsImpl | null> }) {
  const transition = useRef<{ from: THREE.Vector3; to: THREE.Vector3; start: number } | null>(null);
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    transition.current = {
      from: new THREE.Vector3(),
      to: new THREE.Vector3(...PRESET_POSITIONS[preset]),
      start: performance.now(),
    };
  }, [preset]);

  useFrame((state) => {
    const t = transition.current;
    if (!t) return;
    if (t.from.lengthSq() === 0) t.from.copy(state.camera.position);
    const elapsed = (performance.now() - t.start) / 650;
    const eased = 1 - Math.pow(1 - Math.min(1, elapsed), 3);
    state.camera.position.lerpVectors(t.from, t.to, eased);
    controlsRef.current?.update();
    if (elapsed >= 1) transition.current = null;
  });

  return null;
}

export function GarmentViewerScene({ colorHex, autoRotate, preset, seed }: GarmentViewerSceneProps) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: PRESET_POSITIONS.front, fov: 34, near: 0.1, far: 20 }}
      gl={{ antialias: true, powerPreference: "default" }}
      onCreated={({ gl }) => gl.setClearColor("#f4f0e9", 1)}
    >
      <ambientLight intensity={0.6} color="#f4f0e9" />
      <directionalLight position={[1.4, 2.2, 2.4]} intensity={0.75} color="#ffffff" />
      <directionalLight position={[-1.2, 0.6, -2.2]} intensity={0.9} color="#ad8a54" />
      <ViewerGarment colorHex={colorHex} seed={seed} />
      <CameraRig preset={preset} controlsRef={controlsRef} />
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        minDistance={1.8}
        maxDistance={5}
        autoRotate={autoRotate}
        autoRotateSpeed={1.2}
        target={[0, -0.1, 0]}
      />
    </Canvas>
  );
}
