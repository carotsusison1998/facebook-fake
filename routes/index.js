const express = require('express');
// const router = express.Router();
const router = require('express-promise-router')();
const Controller = require('../controllers/home/index');

router.route('/')
    .get(Controller.Getindex)
    .post(Controller.Postindex)

module.exports = router