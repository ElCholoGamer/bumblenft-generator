import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { SizingType } from 'lib/constants';
import { generateBumbleNft } from 'lib/generator';
import { toPartialUpload, upload } from 'lib/uploads';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
	const sizing = SizingType[req.query.size?.toString().toUpperCase()] || SizingType.NORMAL;
	const image = await generateBumbleNft(sizing);

	const resource = await upload(image);

	res.json(toPartialUpload(resource));
});

export default handler;
