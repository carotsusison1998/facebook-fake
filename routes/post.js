const express = require('express');
// const router = express.Router();
const router = require('express-promise-router')();
const Controller = require('../controllers/posts/post');

router.route('/')
    .post(Controller.Postinsert);

module.exports = router