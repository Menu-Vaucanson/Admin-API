import fs from 'fs';

function getLogs(req: any, res: any, localPath: string) {
	const month = req.params.month;

	if (!fs.existsSync(localPath + `/logs/${month}.json`)) {
		res.status(404).json({ error: 1, msg: 'Month not found' });
		return;
	}

	const Logs = JSON.parse(fs.readFileSync(localPath + `/logs/${month}.json`).toString());

	res.status(200).json({ error: 0, data: Logs });
}

export default getLogs;