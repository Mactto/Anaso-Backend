const express = require('express');
const router = express.Router();
const { Contest } = require('../models/Contest');

router.get("/lists", async (req, res) => {
    const contests = await Contest.find();
    res.send(contests);
});

module.exports = router;