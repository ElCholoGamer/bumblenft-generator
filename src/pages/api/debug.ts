import { readdirSync } from 'fs';
import { NextApiHandler } from 'next';

function readdirThing(dir: string) {
	try {
		const files = readdirSync(dir);
		return files;
	} catch (err) {
		return 'Error: ' + err;
	}
}

const handler: NextApiHandler = (req, res) => {
	res.json({
		'.': readdirThing('.'),
		cwd: readdirThing(process.cwd()),
		public: readdirThing('public'),
	});
};

export default handler;
