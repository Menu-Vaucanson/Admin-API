const fs = require('fs');
const _ = require('lodash');

function Delete(req, res, localPath) {
	const data = req.body;
	if (_.isEqual(data, {})) {
		res.status(400).json({ error: 1, msg: 'Invalid body' });
		return;
	}
	if (data.jwt != process.env.JWT) {
		res.status(400).json({ error: 1, msg: 'Invalid token' });
		return;
	}

	const month = parseInt(req.params.month);
	const day = parseInt(req.params.day);

	if (isNaN(month)) {
		res.status(400).json({ error: 1, msg: 'Missing month' });
		return;
	}
	if (isNaN(day)) {
		res.status(400).json({ error: 1, msg: 'Missing day' });
		return;
	}

	if (!fs.existsSync(localPath + `/${month}/${day}.json`)) {
		res.status(400).json({ error: 1, msg: 'Menu not found' });
		return;
	}

	fs.unlinkSync(localPath + `/${month}/${day}.json`);

	res.status(200).json({ error: 0, msg: 'Success' });
}

module.exports = { Delete };