const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const competitionController = require('../controllers/competitionController')

router.get('/', auth, competitionController.get_competition)
router.post('/', auth, competitionController.post_competition)
router.post('/user', auth, competitionController.get_user_competition)

module.exports=router;