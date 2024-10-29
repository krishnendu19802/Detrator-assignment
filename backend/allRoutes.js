const express = require('express');
const login = require('./Routes/login');
const addComment = require('./Routes/newComment');
const getComments = require('./Routes/getComments');

const router = express.Router();

router.post('/login',login)
router.post('/addComment',addComment)
router.get('/getComments',getComments)

module.exports=router