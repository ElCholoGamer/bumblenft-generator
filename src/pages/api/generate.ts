import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
	res.json({ message: 'Work in progress' });
});

export default handler;
