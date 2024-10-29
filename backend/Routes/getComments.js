const express = require('express');
const router = express.Router();
const pool = require('../config/database'); // Ensure this is correctly set up to use your database connection pool

// GET /api/comments
const getComments= async (req, res) => {
   try {
       const [rows] = await pool.promise().query('SELECT * FROM comments ORDER BY timestamp DESC');
       res.json(rows);
   } catch (error) {
       console.error('Error fetching comments:', error);
       res.status(500).json({ message: 'Error fetching comments' });
   }
};

module.exports = getComments;
