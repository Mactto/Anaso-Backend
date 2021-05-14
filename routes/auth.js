const express = require('express');
const router = express.Router();
const AuthTokenController = require('../controller/AuthTokenController');

router.post('/Tokens', AuthTokenController.create);

module.exports = router;
