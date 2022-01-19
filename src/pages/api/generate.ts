import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { SizingType } from '../../lib/constants';
import { generateBumbleNft } from '../../lib/generator';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
	const sizing = SizingType[req.query.type?.toString().toUpperCase()];
	const randomNft = await generateBumbleNft(sizing || SizingType.NORMAL);

	res.setHeader('Content-Type', 'image/png').send(randomNft);
});

export default handler;
