import { UploadApiResponse } from 'cloudinary';

export type ImageResource = UploadApiResponse;

export interface LayerInfo {
	folder: string;
	chance: number;
}

export interface SizingInfo {
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
