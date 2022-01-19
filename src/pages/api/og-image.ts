import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { SizingType } from '../../lib/constants';
import { generateBumbleNft } from '../../lib/generator';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
	const image = await generateBumbleNft(SizingType.OG);
	res.setHeader('Content-Type', 'image/png').send(image);
});

export default handler;
