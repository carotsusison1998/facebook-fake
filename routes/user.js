const express = require('express');
// const router = express.Router();
const router = require('express-promise-router')();
const Controller = require('../controllers/users/user');

router.route('/')
    .post(Controller.Postedit);

module.exports = router