import fs from 'fs';

function Post(req: any, res: any, localPath: string) {
	const data = req.body;

	if (typeof data.menu == 'undefined') {
		res.status(400).json({ error: 1, msg: 'Missing menu' });
		return;
	}

	const day = parseInt(req.params.day);
	const month = parseInt(req.params.month);

	if (fs.existsSync(localPath + `/menus/${month}/${day}.json`)) {
		res.status(400).json({ error: 1, msg: 'This day already exist' });
		return;
	}

	if (!fs.existsSync(localPath + `/menus/${month}/`)) {
		fs.mkdirSync(localPath + `/menus/${month}/`);
	}

	fs.writeFileSync(localPath + `/menus/${month}/${day}.json`, JSON.stringify(data.menu));

	res.status(200).json({ error: 0, msg: 'Success' });
}

export default Post;