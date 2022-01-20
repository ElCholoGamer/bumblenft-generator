import path from 'node:path';
import { Color } from 'sharp';
import type { LayerInfo } from './types';

export const layers: LayerInfo[] = [
	{
		folder: 'back_items',
		chance: 0.2,
	},
	{
		folder: 'vests',
		chance: 1,
	},
	{
		folder: 'held_items',
		chance: 0.4,
	},
	{
		folder: 'hats',
		chance: 0.9,
	},
	{
		folder: 'front_items',
		chance: 0.3,
	},
];

export const LAYERS_FOLDER = path.join(process.cwd(), 'layers');
export const BASE_LAYER = 'base.png';

export const BG_COLOR_RANGE = {
	min: 140,
	max: 200,
};

export enum ImageType {
	NORMAL = 'normal',
	OG = 'og',
	PLACEHOLDER = 'placeholder',
}

export const ImageSizes = {
	NORMAL: {
		width: 450,
		height: 380,
	},
	OG: {
		width: 1200,
		height: 630,
	},
};

export const UPLOADS_FOLDER = 'bumble_nfts';

export const TRANSPARENT: Color = { r: 255, g: 255, b: 255, alpha: 0 };

export const MIN_RARITY = 1;
export const MAX_RARITY = 5;
export const RARITY_STEP = 0.5;
