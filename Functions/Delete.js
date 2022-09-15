const fs = require('fs');

function Delete(req, res, localPath) {
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

	if (!fs.existsSync(localPath + `/menus/${month}/${day}.json`)) {
		res.status(400).json({ error: 1, msg: 'Menu not found' });
		return;
	}

	fs.unlinkSync(localPath + `/menus/${month}/${day}.json`);

	res.status(200).json({ error: 0, msg: 'Success' });
}

module.exports = { Delete };