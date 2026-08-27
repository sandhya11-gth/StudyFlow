// src/utils/characterAssets.ts

// Dynamically match existing character images in src/assets/characters/
const characterAssetModules = import.meta.glob<{ default: string }>(
  '../assets/characters/*.{png,jpg,jpeg,gif,svg,webp}',
  { eager: true }
);

// Map of all resolved asset paths
const availableAssets = Object.entries(characterAssetModules).map(([path, module]) => ({
  path,
  fileName: path.split('/').pop() || '',
  url: module.default,
}));

// Find the absolute first real image asset as a hard fallback (never return "")
const GUARANTEED_FALLBACK_URL =
  availableAssets[0]?.url ||
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect width="64" height="64" fill="%236366f1"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="10">PIXEL</text></svg>';

function findMatchingAssetUrl(characterName: string, state: 'idle' | 'studying'): string {
  const nameLower = characterName.toLowerCase().replace(/[^a-z0-9]/g, '');

  // 1. Try exact match with state (e.g. pixel-idle.gif, pixel_idle.png)
  const exactStateMatch = availableAssets.find((asset) => {
    const fLower = asset.fileName.toLowerCase().replace(/[^a-z0-9.]/g, '');
    return fLower.includes(nameLower) && fLower.includes(state);
  });
  if (exactStateMatch) return exactStateMatch.url;

  // 2. Try base character match (e.g. pixel.png, pixel_cat.gif, cat.png)
  const baseMatch = availableAssets.find((asset) => {
    const fLower = asset.fileName.toLowerCase().replace(/[^a-z0-9.]/g, '');
    return fLower.includes(nameLower) || nameLower.includes(fLower.split('.')[0]);
  });
  if (baseMatch) return baseMatch.url;

  // 3. Fall back to any available asset URL
  return GUARANTEED_FALLBACK_URL;
}

export interface CharacterSpriteSet {
  idle: string;
  studying: string;
}

// Named export used by StudyWorld.tsx
export const CHARACTER_SPRITES: Record<string, CharacterSpriteSet> = {
  PIXEL: {
    idle: findMatchingAssetUrl('pixel', 'idle'),
    studying: findMatchingAssetUrl('pixel', 'studying'),
  },
  PIXEL_CAT: {
    idle: findMatchingAssetUrl('pixel_cat', 'idle'),
    studying: findMatchingAssetUrl('pixel_cat', 'studying'),
  },
  NOVA: {
    idle: findMatchingAssetUrl('nova', 'idle'),
    studying: findMatchingAssetUrl('nova', 'studying'),
  },
  MILO: {
    idle: findMatchingAssetUrl('milo', 'idle'),
    studying: findMatchingAssetUrl('milo', 'studying'),
  },
  LUNA: {
    idle: findMatchingAssetUrl('luna', 'idle'),
    studying: findMatchingAssetUrl('luna', 'studying'),
  },
};

export function getCharacterSprite(
  characterName: string,
  state: 'idle' | 'studying' = 'idle'
): string {
  const key = (characterName || 'PIXEL').toUpperCase().replace(/[^A-Z0-9_]/g, '');
  const characterSet = CHARACTER_SPRITES[key] || CHARACTER_SPRITES.PIXEL || CHARACTER_SPRITES.PIXEL_CAT;
  return state === 'studying' ? characterSet.studying : characterSet.idle;
}

export default CHARACTER_SPRITES;