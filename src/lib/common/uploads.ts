import { ImageResource, PartialResource } from 'lib/types';

export function toPartialUpload(response: ImageResource): PartialResource {
	const { public_id, secure_url, format, width, height, created_at } = response;
	const split = public_id.split('/');

	return {
		id: split[split.length - 1],
		permalink: secure_url,
		format,
		width,
		height,
		createdAt: created_at,
	};
}
