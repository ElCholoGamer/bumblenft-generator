import path from 'node:path';
import fs from 'node:fs/promises';
import sharp from 'sharp';
import { layers, BASE_LAYER, LAYERS_FOLDER, BG_RANGE, OG_IMAGE_SIZE } from './constants';
import { randomRange } from './utils';
import type { LayerInfo } from './types';

async function getRandomLayer(layer: LayerInfo): Promise<string> {
	const baseDir = path.join(LAYERS_FOLDER, layer.folder);
	const layers = await fs.readdir(baseDir);
	const randomLayer = layers[Math.floor(Math.random() * layers.length)];

	return path.join(baseDir, randomLayer);
}

function getRandomBackground() {
	const nums = [...Array(3)].map(() => Math.floor(randomRange(BG_RANGE.min, BG_RANGE.max)));

	return `#${nums.map(n => n.toString(16).padStart(2, '0')).join('')}`;
}

export async function generateBumbleNft(og = false): Promise<Buffer> {
	const baseLayer = path.join(LAYERS_FOLDER, BASE_LAYER);

	const inputLayers: string[] = [];

	for (const layerInfo of layers) {
		if (layerInfo.chance >= 1 || Math.random() < layerInfo.chance) {
			const randomLayer = await getRandomLayer(layerInfo);
			inputLayers.push(randomLayer);
		}
	}
	const background = getRandomBackground();

	const image = await sharp(baseLayer)
		.composite(inputLayers.map(input => ({ input })))
		.flatten({ background })
		.toBuffer();

	if (og) {
		return sharp(image)
			.resize({ ...OG_IMAGE_SIZE, fit: 'contain', background })
			.flatten({ background })
			.toBuffer();
	}

	return image;
}
