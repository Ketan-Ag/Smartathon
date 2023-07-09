const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const requestController = require('../controllers/requestController')


router.post('/postrequest', auth, requestController.post_a_request)
router.post('/acceptrequest', auth, requestController.accept_a_request)
router.post('/deleterequest', auth, requestController.delete_a_request)


module.exports=router;