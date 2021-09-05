const express = require('express');
// const router = express.Router();
const router = require('express-promise-router')();
const Controller = require('../controllers/login/login');

router.route('/')
    .get(Controller.GetsignIn)
    .post(Controller.PostsignIn);

module.exports = router