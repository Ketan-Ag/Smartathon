const express = require('express');
const router = express.Router();

// router.get('/', require('../controllers/competitionGet'))
router.post('/',require('../controllers/userSingup'))

module.exports=router;