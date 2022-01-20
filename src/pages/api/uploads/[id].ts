import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { getUpload } from 'lib/uploads';
import { toPartialUpload } from 'lib/common/uploads';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
	const id = req.query.id.toString();
	const resource = await getUpload(id);

	if (!resource) {
		return res.status(404).json({
			statusCode: 404,
			message: 'Image not found.',
		});
	}

	res.json(toPartialUpload(resource));
});

export default handler;
