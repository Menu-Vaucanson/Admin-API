const fs = require('fs');

function Put(req, res, localPath) {
	const data = req.body;

	if (typeof data.menu == 'undefined') {
		res.status(400).json({ error: 1, msg: 'Missing menu' });
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

	if (!fs.existsSync(localPath + `/menus/${month}/${day}.json`)) {
		res.status(400).json({ error: 1, msg: 'Menu not found' });
		return;
	}

	const oldMenu = JSON.parse(fs.readFileSync(localPath + `/menus/${month}/${day}.json`));
	const newMenu = Object.assign(oldMenu, data.menu);
	fs.writeFileSync(localPath + `/menus/${month}/${day}.json`, JSON.stringify(newMenu));
	res.status(200).json({ error: 0, msg: 'Success' });
}

module.exports = { Put };