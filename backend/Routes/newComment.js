const express = require('express');
const router = express.Router();
const db = require('../config/database');

// POST /api/comments
const addComment=async (req, res) => {
    const { username, comment } = req.body;
    if (!username || !comment) {
        return res.status(400).json({ message: 'Username and comment are required' });
    }

    try {
        // Insert comment into the database
        const [result] = await db.promise().query(
            'INSERT INTO comments (username, comment) VALUES (?, ?)',
            [username, comment]
        );

        const newComment = {
            id: result.insertId,
            username,
            comment,
            timestamp: new Date() // Timestamp for the real-time update
        };

        // Emit the new comment to all connected clients
        const io = req.app.get('socketio');
        io.emit('newComment', newComment);

        res.status(201).json(newComment);
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ message: 'Error adding comment' });
    }
};

module.exports = addComment;
