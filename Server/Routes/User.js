const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const userController = require('../controllers/userController')

const jsonParser = bodyParser.json();

router.post('/signup', jsonParser, userController.sign_up)
router.post('/signin', jsonParser, userController.sign_in)

module.exports=router;