import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { generateBumbleNft } from '../../lib/generator';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
	const randomNft = await generateBumbleNft(req.query.type === 'og');
	res.setHeader('Content-Type', 'image/png').send(randomNft);
});

export default handler;
