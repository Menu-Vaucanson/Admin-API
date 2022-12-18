function AdminCheck(res: any, req: any): boolean {
	if (req.body?.jwt == process.env.JWT2) {
		return true;
	}

	res.status(403).json({ error: 1, msg: 'Insufficient permissions' });
	return false;
}

export default AdminCheck;