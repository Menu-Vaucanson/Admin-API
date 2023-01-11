import fs from 'fs';

function getRatesLogsMonth(req: any, res: any, localPath: string) {
	const month = req.params.month;

	if (!fs.existsSync(localPath + `/logs/${month}.json`)) {
		res.status(404).json({ error: 1, msg: 'Month not found' });
		return;
	}

	const Logs: Array<{ date: Date, view: number, rate: number }> = [];

	JSON.parse(fs.readFileSync(localPath + `/logs/${month}.json`).toString()).forEach((log: { date: any }) => {
		const index = Logs.findIndex((v: { date: any }) => {
			return new Date(v.date).getDate() == new Date(log.date).getDate();
		});
		if (index != -1) {
			Logs[index] = {
				date: new Date(log.date),
				view: Logs[index].view + 1,
				rate: 0
			};
		} else {
			Logs.push({
				date: new Date(log.date),
				view: 1,
				rate: 0
			});
		}
	});

	const Rates: Array<{ date: Date, rate: number }> = [];
	if (fs.existsSync(localPath + `/rates/${month}/`)) {
		fs.readdirSync(localPath + `/rates/${month}/`).forEach(rate => {
			const D = JSON.parse(fs.readFileSync(localPath + `/rates/${month}/` + rate).toString());
			const day = rate.replace('.json', '');
			const date = new Date();
			const data = {
				date: new Date(date.getFullYear(), month - 1, parseInt(day)),
				rate: D.length
			};

			Rates.push(data);
		});
	}

	const result = Logs;

	Rates.forEach((rate: { date: any, rate: number }) => {
		const index = result.findIndex((v: { date: any }) => {
			return new Date(v.date).getDate() == new Date(rate.date).getDate();
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
				view: 0,
				rate: rate.rate
			});
		}
	});

	result.sort((a, b) => (new Date(a.date).getTime() < new Date(b.date).getTime()) ? -1 : 1);

	res.status(200).json({ error: 0, data: result });
}

export default getRatesLogsMonth;