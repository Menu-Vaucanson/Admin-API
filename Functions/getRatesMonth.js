const fs = require('fs');

function getRatesMonth(req, res, localPath) {
	const month = req.params.month;

	if (!fs.existsSync(localPath + `/rates/${month}`)) {
		res.status(404).json({ error: 1, msg: 'Month not found' });
		return;
	}

	const Rates = fs.readdirSync(localPath + `/rates/${month}/`).map(rate => {
		let d = JSON.parse(fs.readFileSync(localPath + `/rates/${month}/` + rate));
		d = [rate.replace('.json', ''), d];
		return d;
	});

	res.status(200).json({ error: 0, data: Rates });
}

module.exports = { getRatesMonth };