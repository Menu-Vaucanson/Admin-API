const express = require('express');
const app = express();
const _ = require('lodash');
require('dotenv').config();

const localPath = '/home/pi/menus/';

const { Post } = require('./Functions/Post');
const { Put } = require('./Functions/Put');
const { Delete } = require('./Functions/Delete');

app.use(express.json());
app.use((err, req, res, next) => {
	if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
		return res.sendStatus(400);
	}
	next();
});

app.listen(8081, () => {
	console.log('Server started');
});

app.get('/', (req, res) => {
	res.status(200).json({ error: 0, msg: 'Online !' });
});

app.post('/menus/:month/:day', (req, res) => {
	if (!verify(req, res)) return;
	Post(req, res, localPath);
});

app.put('/menus/:month/:day', (req, res) => {
	if (!verify(req, res)) return;
	Put(req, res, localPath);
});

app.delete('/menus/:month/:day', (req, res) => {
	if (!verify(req, res)) return;
	Delete(req, res, localPath);
});


function verify(req, res) {
	const data = req.body;
	if (_.isEqual(data, {})) {
		res.status(400).json({ error: 1, msg: 'Invalid body' });
		return null;
	}

	if (data.jwt != process.env.JWT) {
		res.status(400).json({ error: 1, msg: 'Invalid token' });
		return null;
	}

	return true;
}