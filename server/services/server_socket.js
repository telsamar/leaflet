exports.server_socket = {
    io: null,
    sockets: [],

    create(socketIo) {
        console.log('+ Creating socket server')
        this.io = socketIo;
        this.io.on('connection', (socket) => {
            console.log('client connected: ', socket.id)
            this.sockets.push(socket)

            socket.on('disconnect',(reason)=>{
               this.sockets = [...this.sockets.filter( s => s.id !== socket.id)]
                console.log(`Client ${socket.id} disconected, because: ${reason}`)
            })
        })
        return this.io

    },


    sendSignalToAllClients() {
        console.log('send message')
        this.sockets.map( s => {
            s.emit('signal', '!')    // Set name socket
        })
    },    
    

    sendInfoToOneClient(info, socket_id) {
        console.log('send info')
        console.log(socket_id)
        
        this.sockets.map( s => {
            for ( i of s.client.sockets.keys()) {
                if (i === socket_id) {
                    console.log('send info to client with id = '+i+' ('+socket_id+')')
                    s.emit('message', info)    // Set name socket
                }
            }
        })
    },
}