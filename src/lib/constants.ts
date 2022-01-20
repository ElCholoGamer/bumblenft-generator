import path from 'node:path';
import { Color } from 'sharp';
import type { LayerInfo } from './types';

export const layers: LayerInfo[] = [
	{
		folder: 'back_items',
		chance: 0.1,
	},
	{
		folder: 'vests',
		chance: 1,
	},
	{
		folder: 'held_items',
		chance: 0.5,
	},
	{
		folder: 'hats',
		chance: 0.85,
	},
	{
		folder: 'front_items',
		chance: 0.15,
	},
];

export const LAYERS_FOLDER = path.join(process.cwd(), 'layers');
export const BASE_LAYER = 'base.png';

export const BG_COLOR_RANGE = {
	min: 80,
	max: 180,
};

export const UPLOADS_FOLDER = 'bumble_nfts';

export const TRANSPARENT: Color = { r: 255, g: 255, b: 255, alpha: 0 };

export const MIN_RARITY = 1;
export const MAX_RARITY = 5;
export const RARITY_STEP = 0.5;

export const RESOURCE_FETCH_LIMIT = 30;
