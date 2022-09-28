import fs from 'fs';

function getRates(req: any, res: any, localPath: string) {
	const day = req.params.day;
	const month = req.params.month;

	if (!fs.existsSync(localPath + `/rates/${month}`)) {
		res.status(404).json({ error: 1, msg: 'Month not found' });
		return;
	}

	if (!fs.existsSync(localPath + `/rates/${month}/${day}.json`)) {
		res.status(404).json({ error: 1, msg: 'Day not found' });
		return;
	}

	const Rates = JSON.parse(fs.readFileSync(localPath + `/rates/${month}/${day}.json`).toString());

	res.status(200).json({ error: 0, data: Rates });
}

export default getRates;