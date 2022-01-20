import { UploadApiResponse } from 'cloudinary';

export type ImageResource = UploadApiResponse;

export interface LayerInfo {
	folder: string;
	chance: number;
}

export interface Size {
	width: number;
	height: number;
}

export interface PartialResource {
	id: string;
	permalink: string;
	format: string;
	width: number;
	height: number;
	createdAt: string;
}

export interface GeneratorResult {
	image: Buffer;
	rarity: number;
}
