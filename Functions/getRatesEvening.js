const fs = require('fs');

function getRatesEvening(req, res, localPath) {
	const day = req.params.day;
	const month = req.params.month;

	if (!fs.existsSync(localPath + `/ratesEvening/${month}`)) {
		res.status(400).json({ error: 1, msg: 'Month not found' });
		return;
	}

	if (!fs.existsSync(localPath + `/ratesEvening/${month}/${day}.json`)) {
		res.status(400).json({ error: 1, msg: 'Day not found' });
		return;
	}

	const Rates = JSON.parse(fs.readFileSync(localPath + `/ratesEvening/${month}/${day}.json`));

	res.status(200).json({ error: 0, data: Rates });
}

module.exports = { getRatesEvening };