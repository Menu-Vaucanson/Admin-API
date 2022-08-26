const fs = require('fs');
const _ = require('lodash');

function Post(req, res, localPath) {
	const data = req.body;
	if (_.isEqual(data, {})) {
		res.status(400).json({ error: 1, msg: 'Invalid body' });
		return;
	}
	if (data.jwt != process.env.JWT) {
		res.status(400).json({ error: 1, msg: 'Invalid token' });
		return;
	}

	if (typeof data.menu == 'undefined') {
		res.status(400).json({ error: 1, msg: 'Missing menu' });
		return;
	}

	const day = req.params.day;
	const month = req.params.month;

	if (fs.existsSync(localPath + `/${month}/${day}.json`)) {
		res.status(400).json({ error: 1, msg: 'This day already exist' });
		return;
	}

	if (!fs.existsSync(localPath + `/${month}/`)) {
		fs.mkdirSync(localPath + `/${month}/`);
	}

	fs.writeFileSync(localPath + `/${month}/${day}.json`, JSON.stringify(data.menu));

	res.status(200).json({ error: 0, msg: 'Success' });
}

module.exports = { Post };