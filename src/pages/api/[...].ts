import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.all((req, res) => {
	res.status(404).json({
		statusCode: 404,
		message: 'Not found.',
	});
});

export default handler;
