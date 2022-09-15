const fs = require('fs');

function Post(req, res, localPath) {
	const data = req.body;

	if (typeof data.menu == 'undefined') {
		res.status(400).json({ error: 1, msg: 'Missing menu' });
		return;
	}

	const day = req.params.day;
	const month = req.params.month;

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

module.exports = { Post };