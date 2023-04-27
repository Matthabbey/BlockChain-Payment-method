const express = require('express');
const router = express.Router();
const auth = require("../middlewares/authentication")
const { getUsers, grantAccess} = require('../controller/userController');


// router.get('/', auth, getUsers);
router.get('/users', grantAccess('readAny', 'profile'), getUsers);


module.exports = router;