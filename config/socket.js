function socketConfig(){
    this.io.use( async (socket, next) => {
        try {
            await queryHandler.addSocketId({
                userId: socket.request._query['userId'],
                socketId: socket.id
            });
            next();
        } catch (error) {
            // Error
            console.error(error);
        }
      });
 
    this.socketEvents();
}
