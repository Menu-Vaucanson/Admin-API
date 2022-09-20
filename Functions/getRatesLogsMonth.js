const fs = require('fs');

function getRatesLogsMonth(req, res, localPath) {
	const month = req.params.month;

	if (!fs.existsSync(localPath + `/logs/${month}.json`)) {
		res.status(404).json({ error: 1, msg: 'Month not found' });
		return;
	}

	const Logs = [];

	JSON.parse(fs.readFileSync(localPath + `/logs/${month}.json`)).forEach(log => {
		const index = Logs.findIndex(v => {
			return new Date(v.date).toLocaleDateString() == new Date(log.date).toLocaleDateString();
		});
		if (index != -1) {
			Logs[index] = {
				date: new Date(log.date),
				view: Logs[index].view + 1
			};
		} else {
			Logs.push({
				date: new Date(log.date),
				view: 1
			});
		}
	});

	const Rates = [];
	if (fs.existsSync(localPath + `/rates/${month}/`)) {
		fs.readdirSync(localPath + `/rates/${month}/`).forEach(rate => {
			const D = JSON.parse(fs.readFileSync(localPath + `/rates/${month}/` + rate));
			const day = rate.replace('.json', '');
			const date = new Date();
			const data = {
				date: new Date(date.getFullYear(), month - 1, day),
				rate: D.length
			};

			Rates.push(data);
		});
	}

	const result = Logs;

	Rates.forEach(rate => {
		const index = result.findIndex(v => {
			return new Date(v.date).toLocaleDateString() == new Date(rate.date).toLocaleDateString();
		});
		if (index != -1) {
			result[index] = {
				date: result[index].date,
				view: result[index].view,
				rate: rate.rate
			};
		} else {
			result.push({
				date: new Date(rate.date),
				rate: rate.rate
			});
		}
	});

	result.sort((a, b) => (new Date(a.date).getTime() < new Date(b.date).getTime()) ? -1 : 1);

	res.status(200).json({ error: 0, data: result });
}

module.exports = { getRatesLogsMonth };