import path from 'node:path';
import fs from 'node:fs/promises';
import sharp from 'sharp';
import {
	layers,
	BASE_LAYER,
	LAYERS_FOLDER,
	BG_COLOR_RANGE,
	TRANSPARENT,
	MAX_RARITY,
	MIN_RARITY,
	RARITY_STEP,
} from './constants';
import { randomColor, randomRange } from './utils';
import type { GeneratorResult, LayerInfo, Size } from './types';

async function getRandomLayer(layer: LayerInfo): Promise<string> {
	const baseDir = path.join(LAYERS_FOLDER, layer.folder);
	const layers = await fs.readdir(baseDir);
	const randomLayer = layers[Math.floor(Math.random() * layers.length)];

	return path.join(baseDir, randomLayer);
}

export async function generateBumbleNft(
	size: Size,
	withBackground = true
): Promise<GeneratorResult> {
	const baseLayer = path.join(LAYERS_FOLDER, BASE_LAYER);
	const layerInputs: string[] = [];

	for (const layerInfo of layers) {
		if (layerInfo.chance >= 1 || Math.random() < layerInfo.chance) {
			const randomLayer = await getRandomLayer(layerInfo);
			layerInputs.push(randomLayer);
		}
	}

	let image = await sharp(baseLayer)
		.composite(layerInputs.map(input => ({ input })))
		.toBuffer()
		.then(composite =>
			sharp(composite)
				.resize({
					...size,
					fit: 'contain',
					background: TRANSPARENT,
				})
				.toBuffer()
		);

	if (withBackground) {
		const background = randomColor(BG_COLOR_RANGE.min, BG_COLOR_RANGE.max);
		image = await sharp(image).flatten({ background }).toBuffer();
	}

	const rarity = randomRange(MIN_RARITY / RARITY_STEP, MAX_RARITY / RARITY_STEP + 1);

	return {
		image,
		rarity: Math.floor(rarity) * RARITY_STEP,
	};
}

export async function generatePlaceholderNft(size: Size): Promise<Buffer> {
	const { image } = await generateBumbleNft(size, false);
	return sharp(image).ensureAlpha().extractChannel('alpha').negate().toBuffer();
}
