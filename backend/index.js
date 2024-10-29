const express = require('express');
const cors = require('cors');
const pool = require('./config/database');
const allRoutes = require('./allRoutes');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config(); // Load environment variables

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Set up CORS
app.use(cors({
   origin: '*', 
   methods: ['GET', 'POST'],
   allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Use routes
app.use('/api', allRoutes);

// Create HTTP server for Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
   cors: {
       origin: '*',
       methods: ['GET', 'POST']
   }
});

// Socket.IO Connection
io.on('connection', (socket) => {
   console.log('A user connected:', socket.id);

   socket.on('disconnect', () => {
       console.log('A user disconnected:', socket.id);
   });
});

// Make `io` accessible in routes
app.set('socketio', io);

// Start the server
server.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});

module.exports = { app, server };
