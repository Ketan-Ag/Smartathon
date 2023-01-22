const express = require('express');
const router = express.Router();

router.post('/',require('../controllers/joinTeamPost'))

module.exports=router;