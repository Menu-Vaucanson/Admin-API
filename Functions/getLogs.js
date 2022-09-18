const fs = require('fs');

function getLogs(req, res, localPath) {
	const month = req.params.month;

	if (!fs.existsSync(localPath + `/logs/${month}.json`)) {
		res.status(400).json({ error: 1, msg: 'Month not found' });
		return;
	}

	const Logs = JSON.parse(fs.readFileSync(localPath + `/logs/${month}.json`));

	res.status(200).json({ error: 0, data: Logs });
}

module.exports = { getLogs };