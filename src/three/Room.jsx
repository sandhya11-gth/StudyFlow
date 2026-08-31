import * as THREE from 'three';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { sfx } from './sfx.js';

const cursor = handlers => ({
  onClick: e => { e.stopPropagation(); handlers(); },
  onPointerOver: e => { e.stopPropagation(); document.body.style.cursor = 'pointer'; },
  onPointerOut: () => { document.body.style.cursor = ''; },
});

const pixelCanvas = t => {
  t.magFilter = THREE.NearestFilter;
  t.minFilter = THREE.NearestFilter;
  t.colorSpace = THREE.SRGBColorSpace;
  t.needsUpdate = true;
  return t;
};

const floorTexture = (palette) => {
  const c = document.createElement('canvas'); c.width = c.height = 64;
  const x = c.getContext('2d');
  x.fillStyle = palette.paper; x.fillRect(0, 0, 64, 64);
  x.fillStyle = palette.line; x.globalAlpha = 0.16;
  for (let i = 0; i < 64; i += 16) { x.fillRect(i, 0, 1, 64); x.fillRect(0, i, 64, 1); }
  x.globalAlpha = 1;
  return new THREE.CanvasTexture(c);
};

const posterTexture = (palette) => {
  const c = document.createElement('canvas'); c.width = 128; c.height = 96;
  const x = c.getContext('2d');
  x.fillStyle = palette.purple; x.fillRect(0, 0, 128, 96);
  x.strokeStyle = palette.line; x.lineWidth = 3; x.strokeRect(6, 6, 116, 84);
  x.fillStyle = palette.yellow;
  const s = (px, py, w, h) => { x.fillRect(px, py, w, h); };
  s(60, 20, 8, 8); s(52, 28, 24, 8); s(40, 36, 48, 8); s(44, 44, 32, 8); s(50, 52, 20, 8); s(54, 60, 12, 8);
  x.fillStyle = palette.pink;
  s(20, 52, 8, 8); s(28, 60, 8, 8); s(18, 44, 10, 8); s(26, 36, 10, 8);
  return new THREE.CanvasTexture(c);
};

const skyTexture = (night, palette) => {
  const c = document.createElement('canvas'); c.width = 128; c.height = 80;
  const x = c.getContext('2d');
  const g = x.createLinearGradient(0, 0, 0, 80);
  if (night) { g.addColorStop(0, '#131746'); g.addColorStop(1, '#2a1a4a'); } else { g.addColorStop(0, '#6fd2ee'); g.addColorStop(1, '#ffd3ae'); }
  x.fillStyle = g; x.fillRect(0, 0, 128, 80);
  if (night) {
    x.fillStyle = '#f7efff';
    const stars = [[12, 14], [38, 6], [72, 20], [96, 8], [118, 26], [22, 40], [58, 48], [96, 46], [110, 62]];
    stars.forEach(s => x.fillRect(s[0], s[1], 2, 2));
    x.fillStyle = palette.yellow; x.fillRect(92, 14, 10, 10); x.fillRect(94, 12, 6, 14);
  } else {
    x.fillStyle = palette.yellow; x.fillRect(96, 12, 14, 14); x.fillRect(102, 8, 2, 22); x.fillRect(94, 8, 18, 2);
  }
  return new THREE.CanvasTexture(c);
};

function Window({ palette, night, notify }) {
  const sky = useMemo(() => pixelCanvas(skyTexture(night, palette)), [night, palette]);
  useEffect(() => () => sky.dispose(), [sky]);
  return (
    <group position={[2.4, 2.05, -3.28]} {...cursor(() => notify('THE WORLD OUTSIDE CAN WAIT.'))}>
      <mesh position={[0, 0.05, -0.02]}><boxGeometry args={[2.6, 1.7, 0.18]} /><meshLambertMaterial color={palette.line} /></mesh>
      <mesh position={[0, 0.05, 0.1]}><planeGeometry args={[2.2, 1.3]} /><meshBasicMaterial map={sky} /></mesh>
      <mesh position={[0, 0, 0.14]}><boxGeometry args={[0.12, 1.3, 0.06]} /><meshLambertMaterial color={palette.paper} /></mesh>
      <mesh position={[0, 0, 0.14]}><boxGeometry args={[2.2, 0.12, 0.06]} /><meshLambertMaterial color={palette.paper} /></mesh>
      <mesh position={[0, -0.88, 0.14]}><boxGeometry args={[2.9, 0.18, 0.5]} /><meshLambertMaterial color={palette.line} /></mesh>
    </group>
  );
}

function Poster({ palette }) {
  const tex = useMemo(() => pixelCanvas(posterTexture(palette)), [palette]);
  useEffect(() => () => tex.dispose(), [tex]);
  return (
    <group position={[-2.3, 2.15, -3.26]}>
      <mesh><boxGeometry args={[1.7, 1.35, 0.1]} /><meshLambertMaterial color={palette.line} /></mesh>
      <mesh position={[0, 0, 0.06]}><planeGeometry args={[1.5, 1.15]} /><meshBasicMaterial map={tex} /></mesh>
    </group>
  );
}

function BookShelf({ palette, notify }) {
  const colors = [palette.pink, palette.mint, palette.yellow, palette.purple, palette.mint, palette.pink, palette.yellow, palette.purple, palette.mint, palette.pink, palette.yellow, palette.pink];
  const rows = [0.9, 1.5, 2.1];
  return (
    <group position={[-4.05, 0, -1.1]} {...cursor(() => notify('A GOOD BOOK MAKES A GREAT BREAK.'))}>
      {rows.map((y, r) => (
        <group position={[0, y, 0]} key={r}>
          {[0, 1].map(side => <mesh key={side} position={[side === 0 ? -0.95 : 0.95, 0.28, 0]}><boxGeometry args={[0.14, 0.56, 2.3]} /><meshLambertMaterial color={palette.line} /></mesh>)}
          <mesh position={[0, 0, 0]}><boxGeometry args={[2.0, 0.1, 2.3]} /><meshLambertMaterial color={palette.line} /></mesh>
          {Array.from({ length: 6 }, (_, i) => <mesh key={i} position={[-0.68 + i * 0.26, 0.3, (i % 2) * 0.55 - 0.28]}><boxGeometry args={[0.2, 0.52, 0.4 + (i % 3) * 0.22]} /><meshLambertMaterial color={colors[(r * 6 + i) % colors.length]} /></mesh>)}
        </group>
      ))}
    </group>
  );
}

function Desk({ palette, colors, running, notify }) {
  return (
    <group position={[1.7, 1.15, -1.55]}>
      <mesh><boxGeometry args={[3.3, 0.14, 1.7]} /><meshLambertMaterial color={palette.line} /></mesh>
      <mesh position={[0, -0.02, 0]}><boxGeometry args={[3.3, 0.08, 1.7]} /><meshLambertMaterial color={palette.purple} /></mesh>
      {[[-1.45, -0.72], [1.45, -0.72], [-1.45, 0.72], [1.45, 0.72]].map(([lx, lz], i) =>
        <mesh key={i} position={[lx, -0.55, lz]}><boxGeometry args={[0.14, 1.1, 0.14]} /><meshLambertMaterial color={palette.line} /></mesh>
      )}
      <mesh position={[-0.7, 0.42, 0.72]}><boxGeometry args={[1.1, 0.7, 0.12]} /><meshLambertMaterial color={palette.mint} /></mesh>
      {colors.map((c, i) => <mesh key={i} position={[-0.02, 0.42, 0.5]}><boxGeometry args={[0.6 + (i % 2) * 0.2, 0.03, 0.3]} /><meshLambertMaterial color={c} /></mesh>)}
      <group position={[0, 0.66, -0.25]} {...cursor(() => notify('FOCUS STATION ONLINE.'))}>
        <mesh><boxGeometry args={[1.5, 0.1, 1.05]} /><meshLambertMaterial color={palette.line} /></mesh>
        <mesh position={[0.05, 0.5, 0]} rotation={[-0.26, 0, 0]}><boxGeometry args={[1.5, 1.0, 0.06]} /><meshLambertMaterial color={palette.line} /></mesh>
        <mesh position={[0.05, 0.52, 0.03]} rotation={[-0.26, 0, 0]}><planeGeometry args={[1.3, 0.82]} /><meshBasicMaterial color={running ? palette.mint : palette.ink} /></mesh>
      </group>
    </group>
  );
}

function Mug({ palette, notify }) {
  return (
    <group position={[-0.95, 1.15, -0.95]} {...cursor(() => notify('CAFFEINE PROTOCOL ACTIVATED.'))}>
      <mesh position={[0, 0.16, 0]}><cylinderGeometry args={[0.2, 0.18, 0.3, 10]} /><meshLambertMaterial color={palette.pink} /></mesh>
      <mesh position={[0.26, 0.16, 0]} rotation={[0, 0, 0.2]}><boxGeometry args={[0.12, 0.16, 0.08]} /><meshLambertMaterial color={palette.pink} /></mesh>
      <mesh position={[0, 0.34, 0]}><cylinderGeometry args={[0.13, 0.13, 0.05, 8]} /><meshLambertMaterial color={palette.paper} /></mesh>
    </group>
  );
}

function DeskLamp({ palette, on, toggle }) {
  return (
    <group position={[3.05, 1.15, -0.5]} {...cursor(toggle)}>
      <mesh><cylinderGeometry args={[0.32, 0.38, 0.1, 12]} /><meshLambertMaterial color={palette.line} /></mesh>
      <mesh position={[0, 0.42, 0]}><cylinderGeometry args={[0.04, 0.04, 0.8, 8]} /><meshLambertMaterial color={palette.line} /></mesh>
      <mesh position={[0.16, 0.95, 0]} rotation={[0, 0, -0.5]}><boxGeometry args={[0.5, 0.06, 0.05]} /><meshLambertMaterial color={palette.line} /></mesh>
      <mesh position={[0.3, 1.2, 0]} rotation={[0, 0, 0.55]}><coneGeometry args={[0.34, 0.26, 4]} /><meshLambertMaterial color={palette.yellow} /></mesh>
      {on && <pointLight position={[0.3, 1.05, 0]} intensity={5} distance={6} decay={2} color="#ffd06e" />}
    </group>
  );
}

function Plant({ palette, notify }) {
  return (
    <group position={[-2.9, 0, 1.5]} {...cursor(() => notify('YOUR PLANT APPRECIATES THE COMPANY.'))}>
      <mesh position={[0, 0.25, 0]}><cylinderGeometry args={[0.42, 0.5, 0.5, 8]} /><meshLambertMaterial color={palette.pink} /></mesh>
      <mesh position={[0, 0.6, 0]}><boxGeometry args={[0.9, 0.1, 0.9]} /><meshLambertMaterial color={palette.line} /></mesh>
      {[[-0.25, 0.9, 0.1], [0.28, 1.15, -0.12], [0.05, 1.5, 0.18], [-0.1, 1.85, -0.05]].map(([x, y, z], i) =>
        <mesh key={i} position={[x, y, z]}><sphereGeometry args={[0.26, 8, 6]} /><meshLambertMaterial color={palette.mint} /></mesh>)}
      <mesh position={[0.2, 1.15, 0.06]} rotation={[0, 0, 0.4]}><sphereGeometry args={[0.2, 7, 5]} /><meshLambertMaterial color={palette.mint} /></mesh>
    </group>
  );
}

function Cat({ palette, notify }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!ref.current) return;
    ref.current.position.x = Math.sin(t * 0.45) * 1.5;
    ref.current.rotation.y = Math.cos(t * 0.45) > 0 ? 0.3 : -0.3;
    ref.current.position.y = 0.24 + (ref.current.rotation.y > 0 ? 0.02 : 0);
  });
  return (
    <group ref={ref} position={[-0.4, 0.24, 0.7]} {...cursor(() => notify('YOUR STUDY BUDDY BELIEVES IN YOU.'))}>
      <mesh><boxGeometry args={[0.85, 0.4, 0.45]} /><meshLambertMaterial color={palette.ink} /></mesh>
      <mesh position={[0.35, 0.33, 0]}><boxGeometry args={[0.4, 0.35, 0.4]} /><meshLambertMaterial color={palette.ink} /></mesh>
      <mesh position={[0.36, 0.52, -0.12]} rotation={[0, 0, 0.35]}><coneGeometry args={[0.16, 0.22, 4]} /><meshLambertMaterial color={palette.ink} /></mesh>
      <mesh position={[0.36, 0.52, 0.12]} rotation={[0, 0, -0.35]}><coneGeometry args={[0.16, 0.22, 4]} /><meshLambertMaterial color={palette.ink} /></mesh>
      <mesh position={[0.42, 0.36, -0.13]}><boxGeometry args={[0.07, 0.07, 0.04]} /><meshLambertMaterial color={palette.paper} /></mesh>
      <mesh position={[0.42, 0.36, 0.13]}><boxGeometry args={[0.07, 0.07, 0.04]} /><meshLambertMaterial color={palette.paper} /></mesh>
      <mesh position={[0.5, 0.18, 0]} rotation={[0, 0, 0.8]}><boxGeometry args={[0.7, 0.07, 0.07]} /><meshLambertMaterial color={palette.ink} /></mesh>
      <mesh position={[-0.42, 0.28, 0.1]}><boxGeometry args={[0.2, 0.06, 0.06]} /><meshLambertMaterial color={palette.ink} /></mesh>
      <mesh position={[-0.42, 0.28, -0.1]}><boxGeometry args={[0.2, 0.06, 0.06]} /><meshLambertMaterial color={palette.ink} /></mesh>
    </group>
  );
}

function Chair({ palette }) {
  return (
    <group position={[1.9, 0, 0.6]}>
      {[[-0.4, 0.45, 0.4], [0.4, 0.45, 0.4], [-0.4, 0.45, -0.4], [0.4, 0.45, -0.4]].map(([x, h, z], i) =>
        <mesh key={i} position={[x, h, z]}><cylinderGeometry args={[0.05, 0.05, h, 6]} /><meshLambertMaterial color={palette.line} /></mesh>)}
      <mesh position={[0, 0.9, 0]}><boxGeometry args={[1.05, 0.14, 1.05]} /><meshLambertMaterial color={palette.purple} /></mesh>
      <mesh position={[0, 1.25, 0.45]} rotation={[0.12, 0, 0]}><boxGeometry args={[1.05, 0.7, 0.14]} /><meshLambertMaterial color={palette.purple} /></mesh>
    </group>
  );
}

export default function Room({ palette, running, night, notify }) {
  const [lampOn, setLampOn] = useState(true);
  const toggleLamp = () => {
    setLampOn(v => { sfx.lamp(!v); notify(v ? 'LAMP DIMMED.' : 'WARM LIGHTS ON.'); return !v; });
  };
  const floorTex = useMemo(() => pixelCanvas(floorTexture(palette)), [palette]);
  return (
    <group>
      <mesh receiveShadow position={[0, 0.15, 0]}><boxGeometry args={[9.2, 0.3, 7.4]} /><meshLambertMaterial map={floorTex} /></mesh>
      <mesh position={[0, 1.95, -3.66]}><boxGeometry args={[9.2, 3.9, 0.3]} /><meshLambertMaterial color={palette.card} /></mesh>
      <mesh position={[-4.55, 1.95, 0]}><boxGeometry args={[0.3, 3.9, 7.4]} /><meshLambertMaterial color={palette.card} /></mesh>
      <mesh position={[4.55, 0.9, 0]}><boxGeometry args={[0.3, 1.8, 7.4]} /><meshLambertMaterial color={palette.card} /></mesh>
      <mesh position={[-4.4, 0.5, 0]}><boxGeometry args={[0.14, 1.0, 7.4]} /><meshLambertMaterial color={palette.pink} /></mesh>
      <mesh position={[0, 0.5, -3.55]}><boxGeometry args={[9.2, 0.14, 0.14]} /><meshLambertMaterial color={palette.pink} /></mesh>
      <Window palette={palette} night={night} notify={notify} />
      <Poster palette={palette} />
      <BookShelf palette={palette} notify={notify} />
      <Desk palette={palette} colors={[palette.pink, palette.yellow, palette.mint, palette.purple]} running={running} notify={notify} />
      <Mug palette={palette} notify={notify} />
      <DeskLamp palette={palette} on={lampOn} toggle={toggleLamp} />
      <Chair palette={palette} />
      <Plant palette={palette} notify={notify} />
      <Cat palette={palette} notify={notify} />
      <Html position={[-1.6, 2.1, -3.05]} transform distanceFactor={9} className="world-note">ONE STEP<br />AT A TIME</Html>
    </group>
  );
}