import { v2 as cloudinary, UploadApiOptions, AdminAndResourceOptions } from 'cloudinary';
import path from 'node:path';
import { Readable } from 'node:stream';
import { promisify } from 'node:util';
import { UPLOADS_FOLDER } from './constants';
import type { ImageResource, PartialResource } from './types';

const getResource = promisify<string, AdminAndResourceOptions, ImageResource>(
	cloudinary.api.resource
);
const getResources = promisify(cloudinary.api.resources);

export function upload(image: Buffer, options?: UploadApiOptions) {
	return new Promise<ImageResource>((resolve, reject) => {
		const stream = cloudinary.uploader.upload_stream(
			{ ...options, folder: UPLOADS_FOLDER },
			(err, result) => {
				if (result) {
					resolve(result);
				} else {
					reject(err);
				}
			}
		);

		Readable.from(image).pipe(stream);
	});
}

export async function getAllUploads(): Promise<ImageResource[]> {
	const result = await getResources({ type: 'upload', prefix: `${UPLOADS_FOLDER}/` });
	return result.resources;
}

export async function getUpload(id: string): Promise<ImageResource | null> {
	try {
		return await getResource(`${UPLOADS_FOLDER}/${id}`, {});
	} catch (err: any) {
		if (err?.http_code === 404) return null;
		throw err;
	}
}

export function toPartialUpload(response: ImageResource): PartialResource {
	const { public_id, secure_url, format, width, height, created_at } = response;

	return {
		id: path.basename(public_id),
		permalink: secure_url,
		format,
		width,
		height,
		createdAt: created_at,
	};
}
