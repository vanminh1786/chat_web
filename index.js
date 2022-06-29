const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const router = require('./src/routes/index');

//HTTP logger
app.use(morgan('combined'));

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'frontend/build')));
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
	});
}

app.use(cors());
app.use(express.json());

router(app);

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST'],
	},
});

io.on('connection', (socket) => {
	// console.log(`User Connected: ${socket.id}`);

	socket.on('join_room', (data) => {
		// console.log(data.room);
		console.log('User joined room: ' + data.room);
		socket.join(data.room);
	});

	socket.on('send_message', (data) => {
		socket.to(data.room).emit('receive_message', {
			uid: data.uid,
			mess: data.mess,
		});
	});
});

server.listen(port, () => {
	console.log('SERVER IS RUNNING');
});
