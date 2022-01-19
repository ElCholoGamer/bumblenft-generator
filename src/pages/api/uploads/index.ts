import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { getAllUploads, toPartialUpload } from 'lib/uploads';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
	const resources = await getAllUploads();
	res.json(resources.map(toPartialUpload));
});

export default handler;
