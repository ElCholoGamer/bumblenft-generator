import type { ImageResource, ResourceFetchResult } from './types';
import { v2 as cloudinary, UploadApiOptions, AdminAndResourceOptions } from 'cloudinary';
import { Readable } from 'node:stream';
import { promisify } from 'node:util';
import { RESOURCE_FETCH_LIMIT, UPLOADS_FOLDER } from './constants';

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

export async function getAllUploads(cursor?: string): Promise<ResourceFetchResult> {
	const result = await getResources({
		type: 'upload',
		prefix: `${UPLOADS_FOLDER}/`,
		next_cursor: cursor,
		max_results: RESOURCE_FETCH_LIMIT,
	});

	return {
		resources: result.resources,
		nextCursor: result.next_cursor,
	};
}

export async function getUpload(id: string): Promise<ImageResource | null> {
	try {
		return await getResource(`${UPLOADS_FOLDER}/${id}`, {});
	} catch (err: any) {
		if (err?.http_code === 404) return null;
		throw err;
	}
}
