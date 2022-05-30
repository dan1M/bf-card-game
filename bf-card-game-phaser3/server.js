const server = require('express')();
const http = require('http').createServer(server);
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    }
});


const shuffle = require('shuffle-array');
let players = {};


io.on('connection', function (socket) {
    console.log('A user connected: ' + socket.id);

    players[socket.id] = {
        deck: [],
        hand: [],
        isPlayerA: false
    };

    if ( Object.keys(players).length < 2 ){
        players[socket.id].isPlayerA = true;
    }

    socket.on('dealDeck', (socketId, cardsAvailable) => {
        players[socketId].deck = shuffle(cardsAvailable).slice(0, 20);        
        
        console.log(players);
        if (Object.keys(players).length < 2) return;
    });

    socket.on('dealCards', function (socketId) {       

        console.log(players);

        io.emit('dealCards', Object.keys(players)[0], players[Object.keys(players)[0]].deck);
        io.emit('dealCards', Object.keys(players)[1], players[Object.keys(players)[1]].deck);
    });

    socket.on('cardPlayed', function (gameObject, socketId) {
        io.emit('cardPlayed', gameObject, socketId);
    });

    socket.on('turnAdd', () => {
        io.emit('turnAdd');
    })
    socket.on('turnSub', () => {
        io.emit('turnSub');
    })

    socket.on('disconnect', function () {
        console.log('A user disconnected: ' + socket.id);
        delete players[socket.id];
    });
});

http.listen(3000, function () {
    console.log('Server started!');
});