const fs = require('fs');

function getLogs(req, res, localPath) {
	const month = req.params.month;

	if (!fs.existsSync(localPath + `/Logs/${month}`)) {
		res.status(400).json({ error: 1, msg: 'Month not found' });
		return;
	}

	const Logs = fs.readdirSync(localPath + `/Logs/${month}`).map(m => {
		return m.replace('.json', '');
	});

	res.status(200).json({ error: 0, data: Logs });
}

module.exports = { getLogs };