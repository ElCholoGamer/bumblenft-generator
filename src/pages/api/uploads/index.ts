import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { getAllUploads } from 'lib/uploads';
import { toPartialUpload } from 'lib/common/uploads';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
	const cursor = req.query.cursor?.toString();

	const { resources, nextCursor } = await getAllUploads(cursor);
	res.json({
		resources: resources.map(toPartialUpload),
		nextCursor,
	});
});

export default handler;
