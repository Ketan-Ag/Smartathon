const express = require('express');
const router = express.Router();

router.post('/',require('../controllers/acceptRequestPost'))

module.exports=router;