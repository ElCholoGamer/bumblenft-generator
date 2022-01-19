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

export const LAYERS_FOLDER = 'layers';
export const BASE_LAYER = 'base.png';

export const BG_RANGE = {
	min: 140,
	max: 200,
};
