const express = require("express");
const router = express.Router();
const cors = require('cors');

const article_controller = require('../controllers/articleController')
// const user_controller = require('../controllers/userController')

router.get("/", article_controller.articles);

// POST request for creating Post.
router.post("/create", article_controller.article_create);

// POST request to delete Post.
router.delete("/:id/delete", article_controller.article_delete)

// GET request to update Article.
router.post("/:id/update", article_controller.article_update);

// GET request for one Post.
router.get("/:id", article_controller.article);

module.exports = router