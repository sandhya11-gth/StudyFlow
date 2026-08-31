import { Sparkles, Html } from '@react-three/drei';

function Burst({ text, palette }) {
  return (
    <group position={[-1.35, 2.2, -0.65]}>
      <Sparkles count={34} scale={[2.2, 2.6, 2.2]} size={3.4} speed={1.5} color={palette.yellow} opacity={0.95} />
      <Sparkles count={18} scale={[1.6, 2, 1.6]} size={2.4} speed={1.2} color={palette.pink} />
      <Html center position={[0, 1.1, 0]} zIndexRange={[10, 0]}><i className="xp-float">{text}</i></Html>
    </group>
  );
}

export default function Effects({ palette, night, burst }) {
  return (
    <>
      <Sparkles count={30} scale={[8.5, 3.2, 6.5]} position={[0, 1.9, -0.5]} size={1.3} speed={0.22} opacity={0.45} color={palette.line} noise={1} />
      <Sparkles count={9} scale={[0.5, 0.8, 0.5]} position={[-0.95, 2.0, -0.95]} size={1.9} speed={0.6} color="#f2e9ff" />
      {night && <Sparkles count={14} scale={[2.2, 1.1, 1.8]} position={[-2.9, 0.7, 1.5]} size={2.2} speed={0.5} color={palette.yellow} />}
      {night && <Sparkles count={10} scale={[2.6, 1.2, 1.4]} position={[2.4, 1, -3.1]} size={1.8} speed={0.15} color="#f7efff" />}
      {burst && burst.id > 0 && <Burst key={burst.id} text={burst.text} palette={palette} />}
    </>
  );
}