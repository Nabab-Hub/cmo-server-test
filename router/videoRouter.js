const express = require("express");

const {
    suggestVideo
} = require("../controller/videoController");

const router = express.Router();

// POST /suggest_video
router.post("/suggest_video", suggestVideo);

module.exports = router;