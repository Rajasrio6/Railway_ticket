const express = require('express');
const router = express.Router();
const userController = require('./controller');

router.get('/', (req, res) => res.json({ message: "Users endpoint" }));

module.exports = router;