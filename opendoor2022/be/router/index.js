const express = require("express")
const router = express.Router()

// params body 
router.get('/', function (req, res) {
    res.send("this is backend server")


});


module.exports = router