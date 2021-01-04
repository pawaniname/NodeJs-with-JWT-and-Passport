const express = require('express');
const router = express.Router();
const controller = require("../controllers/user.controller")


router.get('/', controller.getAllUser)
router.post('/add', controller.postUserData)
router.put('/:id', controller.authToken, controller.putUserData)
router.delete('/:id', controller.authToken, controller.deleteUserData)

router.post("/login", controller.login)

router.get("/logout", controller.authToken ,controller.logout)


module.exports = router;