const express = require("express");
const router = express.Router();

const comment_controller = require("../controllers/commentController");

/// COMMENTS ROUTES ///

// POST request for creating Comment.
router.post("/create", comment_controller.comment_create);

router.get("/:id", comment_controller.comment )

module.exports = router