import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import characterIdle from '../assets/characters/studyflow_character_idle.png';
import { sfx } from './sfx.js';

export default function Buddy({ running, notify }) {
  const [tex, setTex] = useState(null);
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(characterIdle, t => {
      t.magFilter = THREE.NearestFilter;
      t.minFilter = THREE.NearestFilter;
      t.colorSpace = THREE.SRGBColorSpace;
      t.needsUpdate = true;
      setTex(t);
    });
    return () => setTex(null);
  }, []);
  const base = 1.3;
  const cheer = useRef(0);
  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    cheer.current = Math.max(0, cheer.current - 0.02);
    const speed = running ? 7 : 2.4;
    const amp = running ? 0.09 : 0.05;
    ref.current.position.y = base + Math.sin(t * speed) * amp + Math.abs(Math.sin(t * 22)) * 0.02 * cheer.current;
  });
  const onCheer = () => { cheer.current = 1; sfx.click(); notify('YOUR BUDDY SAYS: KEEP GOING!'); };
  if (!tex) return null;
  return (
    <sprite
      ref={ref}
      position={[-1.35, base, -0.65]}
      scale={[1.18, 2.46, 1]}
      onClick={e => { e.stopPropagation(); onCheer(); }}
      onPointerOver={e => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { document.body.style.cursor = ''; }}
    >
      <spriteMaterial map={tex} transparent depthWrite={false} />
    </sprite>
  );
}