import fs from 'fs';

import AdminCheck from './AdminCheck';

function Delete(req: any, res: any, localPath: string) {
	if (!AdminCheck(res, req)) return;

	const month = parseInt(req.params.month);
	const day = parseInt(req.params.day);

	if (isNaN(month) || month > 12 || month < 1) {
		res.status(400).json({ error: 1, msg: 'Invalid month' });
		return;
	}

	if (isNaN(day) || day > 31 || day < 1) {
		res.status(400).json({ error: 1, msg: 'Invalid day' });
		return;
	}

	if (!fs.existsSync(localPath + `/menus/${month}/${day}.json`)) {
		res.status(404).json({ error: 1, msg: 'Menu not found' });
		return;
	}

	fs.unlinkSync(localPath + `/menus/${month}/${day}.json`);

	res.status(200).json({ error: 0, msg: 'Success' });
}

export default Delete;