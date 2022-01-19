import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { ImageSizes, ImageType } from '../../lib/constants';
import { generateBumbleNft, generatePlaceholderNft } from '../../lib/generator';
import { toPartialUpload, upload } from '../../lib/uploads';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
	const type = req.query.type?.toString().trim().toLowerCase() || 'normal';

	switch (type) {
		case ImageType.OG:
			const ogImage = await generateBumbleNft(ImageSizes.OG);
			res.setHeader('Content-Type', 'image/png').send(ogImage);
			break;
		case ImageType.PLACEHOLDER:
			const placeholderImage = await generatePlaceholderNft(ImageSizes.NORMAL);
			res.setHeader('Content-Type', 'image/png').send(placeholderImage);
			break;
		case ImageType.NORMAL:
		default:
			const image = await generateBumbleNft(ImageSizes.NORMAL);
			const resource = await upload(image);

			res.json(toPartialUpload(resource));
			break;
	}
});

export default handler;
