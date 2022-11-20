const express = require('express');
const { profilePicture } = require( "../controllers/media");

const router = express.Router()

router.post("/", profilePicture)



module.exports = router;