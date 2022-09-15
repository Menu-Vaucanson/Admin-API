const fs = require('fs');

function getLog(req, res, localPath) {
	const day = req.params.day;
	const month = req.params.month;

	if (!fs.existsSync(localPath + `/Logs/${month}/${day}.json`)) {
		res.status(400).json({ error: 1, msg: 'Log not found' });
		return;
	}

	const count = JSON.parse(fs.readFileSync(localPath + `/Logs/${month}/${day}.json`));

	res.status(200).json({ error: 0, data: count });
}

module.exports = { getLog };