import cors from 'cors';
import express from 'express';
import fs from 'fs';
import https from 'https';
import _ from 'lodash';
const app = express();
require('dotenv').config();


import Delete from './Functions/Delete';
import Post from './Functions/Post';

import getLogs from './Functions/getLogs';
import getRates from './Functions/getRates';
import getRatesEvening from './Functions/getRatesEvening';
import getRatesLogsMonth from './Functions/getRatesLogsMonth';
import getRatesMonth from './Functions/getRatesMonth';
import getRatesMonthEvening from './Functions/getRatesMonthEvening';

const localPath = '/home/pi/datas/';

const key = fs.readFileSync('../certs/selfsigned.key');
const cert = fs.readFileSync('../certs/selfsigned.crt');
const options = {
	key: key,
	cert: cert
};

const server = https.createServer(options, app);

server.listen(8081, () => {
	console.log('Server started !');
});

app.use(express.json());
app.use(cors());
app.use((err: { status: number }, req: any, res: any, next: Function) => {
	if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
		return res.sendStatus(400).json({ error: 1, msg: 'Invalid body' });
	}
	next();
});

app.get('/', (req: any, res: any) => {
	res.status(200).json({ error: 0, msg: 'Online !' });
});

app.post('/login', (req: any, res: any) => {
	if (!verify(req, res)) return;
	res.status(200).json({ error: 0, msg: 'Token valid' });
});

app.post('/logs/:month', (req: any, res: any) => {
	if (!verify(req, res)) return;
	getLogs(req, res, localPath);
});

app.post('/rates/:month', (req: any, res: any) => {
	if (!verify(req, res)) return;
	getRatesMonth(req, res, localPath);
});

app.post('/ratesEvening/:month', (req: any, res: any) => {
	if (!verify(req, res)) return;
	getRatesMonthEvening(req, res, localPath);
});

app.post('/ratesLogs/:month', (req: any, res: any) => {
	if (!verify(req, res)) return;
	getRatesLogsMonth(req, res, localPath);
});

app.post('/rates/:month/:day', (req: any, res: any) => {
	if (!verify(req, res)) return;
	getRates(req, res, localPath);
});

app.post('/ratesEvening/:month/:day', (req: any, res: any) => {
	if (!verify(req, res)) return;
	getRatesEvening(req, res, localPath);
});

app.post('/menus/:month/:day', (req: any, res: any) => {
	if (!verify(req, res)) return;
	Post(req, res, localPath);
});

app.post('/deleteMenus/:month/:day', (req: any, res: any) => {
	if (!verify(req, res)) return;
	Delete(req, res, localPath);
});


function verify(req: any, res: any): boolean {
	const data = req.body;
	if (_.isEqual(data, {})) {
		res.status(400).json({ error: 1, msg: 'Invalid body' });
		return false;
	}

	if (data.jwt != process.env.JWT && data.jwt != process.env.JWT2) {
		res.status(401).json({ error: 1, msg: 'Invalid token' });
		return false;
	}

	return true;
}