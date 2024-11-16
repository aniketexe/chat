const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files
app.use(express.static(__dirname));

// Handle Socket.io connections
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Broadcast messages to all users
    socket.on('chat message', (message) => {
        io.emit('chat message', { username: socket.id, message });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

// Start server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
