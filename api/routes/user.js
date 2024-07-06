const express = require("express");
const router = express.Router();

const utils = require('../lib/utils')
const user_controller = require('../controllers/userController')

router.post('/login', user_controller.login );

router.post('/sign-up', user_controller.register );

router.get('/protected', utils.authenticateToken, (req, res) => {
  res.json({success: true, message: "You are allowed!"})
})

module.exports = router
