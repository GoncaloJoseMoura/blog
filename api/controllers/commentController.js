const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Comment = require('../models/comment')


exports.comment_create = [
    // Validate and sanitize fields.
    body("comment", "Comment must be specified")
      .trim()
      .isLength({ min: 1 })
      .escape(),
  
    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
      // Extract the validation errors from a request.
      const errors = validationResult(req);
  
      // Create a Comment object with escaped and trimmed data.
      const comment = new Comment({
        comment: req.body.comment,
        user: req.body.user,
        article: req.body.article,
      });
  
      if (!errors.isEmpty()) {
        // There are errors.
        res.sendStatus(400).json({ success: false, msg: "invalid input" });
        return;
      }
      const newComment = await comment.save();
      res.status(200).json({success: true, comment: newComment})
    }),
]

exports.comment = asyncHandler(async (req, res) => {
    const comments = await Comment.find({article: req.params.id}).populate('user', 'first_name last_name').exec()

    if (comments.length === 0) {
      res.status(400).json({success:false, message: "No comments found"})
      return;
    }

    res.status(200).json({success: true, comments: comments})
})