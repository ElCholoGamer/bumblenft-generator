import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { ImageSizes, ImageType } from 'lib/common/constants';
import { generateBumbleNft, generatePlaceholderNft } from 'lib/generator';
import { toPartialUpload, upload } from 'lib/uploads';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
	const type = req.query.type?.toString().trim().toLowerCase() || 'normal';

	switch (type) {
		case ImageType.OG:
			const ogResult = await generateBumbleNft(ImageSizes.OG);
			res.setHeader('Content-Type', 'image/png').send(ogResult.image);
			break;
		case ImageType.PLACEHOLDER:
			const placeholderImage = await generatePlaceholderNft(ImageSizes.NORMAL);
			res.setHeader('Content-Type', 'image/png').send(placeholderImage);
			break;
		case ImageType.NORMAL:
		default:
			const result = await generateBumbleNft(ImageSizes.NORMAL);
			const resource = await upload(result.image);

			res.json({
				rarity: result.rarity,
				upload: toPartialUpload(resource),
			});
			break;
	}
});

export default handler;
