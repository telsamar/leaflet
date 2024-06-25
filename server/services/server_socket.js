const markers = [
    [55.751244, 37.618423, 'dot1'],
    [55.760186, 37.618698, 'dot2']
];

exports.server_socket = {
    io: null,
    sockets: [],

    create(socketIo) {
        console.log('+ Creating socket server');
        this.io = socketIo;
        this.io.on('connection', (socket) => {
            console.log('client connected: ', socket.id);
            this.sockets.push(socket);

            console.log('Sending initial markers to client: ', markers);
            socket.emit('initMarkers', markers); // Текущие маркеры

            socket.on('disconnect', (reason) => {
                this.sockets = this.sockets.filter(s => s.id !== socket.id);
                console.log(`Client ${socket.id} disconnected, because: ${reason}`);
            });

            socket.on('addMarker', (marker) => {
                markers.push(marker);
                console.log('New marker added: ', marker);
                this.io.emit('newMarker', marker);
            });
        });
        return this.io;
    },

    sendSignalToAllClients() {
        console.log('send message');
        this.sockets.map(s => {
            s.emit('signal', '!')
        })
    },    
    
    sendInfoToOneClient(info, socket_id) {
        console.log('send info');
        console.log(socket_id);
        
        this.sockets.map(s => {
            for (let i of s.client.sockets.keys()) {
                if (i === socket_id) {
                    console.log('send info to client with id = ' + i + ' (' + socket_id + ')');
                    s.emit('message', info)
                }
            }
        })
    },
}