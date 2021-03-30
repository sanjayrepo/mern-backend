const express = require("express")
const router = express.Router()

const {getProcuctById} = require("../controllers/product")
const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth")
const {getUserById} = require("../controllers/user")

//all of params
router.param("userId",getUserById)
router.param("productId",getProcuctById)

//all of actual routes


module.exports = router;