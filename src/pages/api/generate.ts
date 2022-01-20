import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { ImageSizes, ImageType } from 'lib/common/constants';
import { generateBumbleNft } from 'lib/generator';
import { toPartialUpload, upload } from 'lib/uploads';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
	const type = req.query.type?.toString().trim().toLowerCase() || 'normal';

	if (type === ImageType.OG) {
		const { image } = await generateBumbleNft(ImageSizes.OG);
		return res.setHeader('Content-Type', 'image/png').send(image);
	}
	const result = await generateBumbleNft(ImageSizes.NORMAL);
	const resource = await upload(result.image);

	res.json({
		rarity: result.rarity,
		upload: toPartialUpload(resource),
	});
});

export default handler;
