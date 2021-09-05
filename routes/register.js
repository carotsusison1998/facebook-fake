const express = require('express');
// const router = express.Router();
const router = require('express-promise-router')();
const Controller = require('../controllers/login/register');

router.route('/')
    .get(Controller.Getregister)
    .post(Controller.Postregister);
    
module.exports = router