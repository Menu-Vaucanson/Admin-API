import fs from 'fs';

function getRatesMonthEvening(req: any, res: any, localPath: string) {
	const month = req.params.month;

	if (!fs.existsSync(localPath + `/ratesEvening/${month}`)) {
		res.status(404).json({ error: 1, msg: 'Month not found' });
		return;
	}

	const Rates = fs.readdirSync(localPath + `/ratesEvening/${month}/`).map((rate: string) => {
		let d = JSON.parse(fs.readFileSync(localPath + `/ratesEvening/${month}/` + rate).toString());
		d = [rate.replace('.json', ''), d];
		return d;
	});

	res.status(200).json({ error: 0, data: Rates });
}

export default getRatesMonthEvening;