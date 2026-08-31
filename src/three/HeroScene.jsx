import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import { Suspense, useEffect, useRef } from 'react';
import { readPalette } from './palette.js';
import Room from './Room.jsx';
import Buddy from './Buddy.jsx';
import Effects from './Effects.jsx';

const BASE_THETA = 0.71;
const DRIFT_AMP = 0.72;
const MIN_PHI = 0.33;
const MAX_PHI = Math.PI / 2.05;

function CameraRig({ drift }) {
  const { camera, controls, gl } = useThree();
  const state = useRef({ t: 0, user: false });
  useEffect(() => {
    const down = () => { state.current.user = true; };
    const up = () => { state.current.user = false; };
    gl.domElement.addEventListener('pointerdown', down);
    gl.domElement.addEventListener('touchstart', down);
    window.addEventListener('pointerup', up);
    window.addEventListener('touchend', up);
    return () => {
      gl.domElement.removeEventListener('pointerdown', down);
      gl.domElement.removeEventListener('touchstart', down);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('touchend', up);
    };
  }, [gl]);
  useFrame((_, dt) => {
    const c = controls.current;
    if (!c || !drift) return;
    const s = state.current;
    if (s.user) return;
    s.t += dt * 0.32;
    const desired = BASE_THETA + Math.sin(s.t) * DRIFT_AMP;
    const target = c.target;
    const offset = camera.position.clone().sub(target);
    const sph = new THREE.Spherical().setFromVector3(offset);
    const r = THREE.MathUtils.clamp(sph.radius, 4.5, 16);
    const k = 1 - Math.pow(0.002, dt);
    sph.theta += (desired - sph.theta) * k;
    sph.phi = THREE.MathUtils.clamp(sph.phi, MIN_PHI, MAX_PHI);
    sph.radius = r;
    offset.setFromSpherical(sph);
    camera.position.copy(target).add(offset);
    camera.lookAt(target);
    c.update();
  });
  return null;
}

function Lighting({ night }) {
  return (
    <>
      <ambientLight intensity={night ? 0.34 : 0.72} color={night ? '#8d97e8' : '#ffffff'} />
      <directionalLight position={night ? [-5, 8, 6] : [6, 9, 5]} intensity={night ? 0.42 : 1.05} color={night ? '#aabdff' : '#ffffff'} />
      <pointLight position={[0, 3, -3.2]} intensity={night ? 0.55 : 0.1} distance={8} color="#9ec6ff" />
    </>
  );
}

export default function HeroScene({ running, theme, notify, burst, drift = true, calm = false }) {
  const palette = readPalette(theme);
  const night = theme === 'dark';
  return (
    <Canvas
      dpr={[0.3, 0.55]}
      flat
      gl={{ antialias: false, powerPreference: 'high-performance', alpha: false }}
      camera={{ position: [6.4, 3.5, 7.4], fov: 42 }}
    >
      <color attach="background" args={[palette.paper]} />
      <fog attach="fog" args={[palette.paper, 13, 30]} />
      <Suspense fallback={null}>
        <Lighting night={night} />
        <CameraRig drift={drift && !calm} />
        <Room palette={palette} running={running} night={night} notify={notify} />
        <Buddy running={running} notify={notify} />
        <Effects palette={palette} night={night} burst={burst} />
        <ContactShadows position={[0, 0.33, 0]} opacity={0.38} scale={11} blur={2.2} far={3.6} resolution={128} color={palette.line} frames={1} />
      </Suspense>
      <OrbitControls
        makeDefault
        target={[0, 1.35, 0]}
        enableDamping
        dampingFactor={0.08}
        enablePan={false}
        minDistance={4.5}
        maxDistance={16}
        minPolarAngle={MIN_PHI}
        maxPolarAngle={MAX_PHI}
      />
    </Canvas>
  );
}