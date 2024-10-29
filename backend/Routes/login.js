const express = require('express');
// const router = express.Router();
const { v4: uuidv4 } = require('uuid'); // For generating session IDs

// POST /api/login
const login=(req,res)=>{
    const { username } = req.body;
    
    if (!username) {
        return res.status(400).json({ message: 'Username is required' });
    }

    // Generate a session ID
    const sessionId = uuidv4();

    // Send back the session ID (in a real app, you might store this session in a database)
    res.json({ sessionId, username });
}


module.exports = login;
