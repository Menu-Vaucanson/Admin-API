import fs from 'fs';

function getRatesMonth(req: any, res: any, localPath: string) {
	const month = req.params.month;

	if (!fs.existsSync(localPath + `/rates/${month}`)) {
		res.status(404).json({ error: 1, msg: 'Month not found' });
		return;
	}

	const Rates = fs.readdirSync(localPath + `/rates/${month}/`).map((rate: string) => {
		let d = JSON.parse(fs.readFileSync(localPath + `/rates/${month}/` + rate).toString());
		d = [rate.replace('.json', ''), d];
		return d;
	});

	res.status(200).json({ error: 0, data: Rates });
}

export default getRatesMonth;