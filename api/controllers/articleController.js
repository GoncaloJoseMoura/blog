const Article = require('../models/article');
const Comment = require('../models/comment');
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const { cloudinary, upload} = require('../lib/utils.js')


exports.articles = asyncHandler(async (req, res) => {
    const allArticles = await Article.find({})
    .populate("user", "first_name last_name")
    .sort({ title: 1 })
    .limit(5)
    .exec();

  res.status(200).json({success: true, articles: allArticles});
})

exports.article_create = [

    // Validate and sanitize fields.
    upload.single('image'),
    asyncHandler(async (req, res, next) => {
      if (req.file) {
        try {
          const result = await cloudinary.uploader.upload(req.file.path);
          req.imageURL = result.secure_url;
        } catch (err) {
          console.error(err);
          return res.status(500).json({
            success: false,
            message: 'Error uploading to Cloudinary',
          });
        }
      }
      next();
    }),
    body("title", "Title must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
    body("text", "text must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
  
    asyncHandler(async (req, res, next) => {
      // Extract the validation errors from a request.
      const errors = validationResult(req);
  
      // Create a Book object with escaped and trimmed data.
      const article = new Article({
        title: req.body.title,
        user: req.body.user,
        text: req.body.text,
        image: req.imageURL,
      });
  
      if (!errors.isEmpty()) {
        // There are errors. Render form again with sanitized values/error messages.
        res.status(400).json({ success: false, message: "invalid input" });
        return;
      }
        // Data from form is valid. Save book.
      const saved_article = await article.save();
      res.status(200).json({ success: true, article: saved_article });
    }),
]

exports.article_update = [

    // Validate and sanitize fields.
    upload.single('image'),
    asyncHandler(async (req, res, next) => {
      if (req.file) {
        try {
          const result = await cloudinary.uploader.upload(req.file.path);
          req.imageURL = result.secure_url;
        } catch (err) {
          console.error(err);
          return res.status(500).json({
            success: false,
            message: 'Error uploading to Cloudinary',
          });
        }
      }
      next();
    }),
    body("title", "Title must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
    body("text", "text must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
  
  
    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
      // Extract the validation errors from a request.
      const errors = validationResult(req);
  
      // Create a Book object with escaped/trimmed data and old id.
      const article = new Article({
          title: req.body.title,
          user: req.body.user,
          text: req.body.text,
          image: req.imageURL ? req.imageURL : req.body.image,
          _id: req.params.id,
        });
  
      if (!errors.isEmpty()) {
        // There are errors. Render form again with sanitized values/error messages.
        res.status(400).json({ success: false, message: "invalid input" });
        return;
      }
      // Data from form is valid. Update the record.
      const updatedArticle = await Article.findByIdAndUpdate(req.params.id, article);
      // Redirect to book detail page.
      res.status(200).json({success: true, article: updatedArticle})
    }),
]

exports.article_delete = asyncHandler(async (req, res, next) => {
  // Get details of author and all their books (in parallel)
  const [article, comments] = await Promise.all([
      Article.findById(req.params.id).populate("user").exec(),
      Comment.find({ article: req.params.id }).exec(),
    ]);

  if (article === null) {
    res.status(400).json({ success: false, message: "invalid article_id" });
    return;
  }

  await Promise.all([
      Article.findByIdAndDelete(req.params.id),
      Comment.deleteMany({ article: req.params.id }),
    ]);
  res.status(200).json({success: true})
})

exports.article = asyncHandler(async (req, res, next) => {
  // Get details of books, book instances for specific book
  const [article, comments] = await Promise.all([
    Article.findById(req.params.id).populate("user").exec(),
    Comment.find({ article: req.params.id }).exec(),
  ]);

  if (article === null) {
    res.status(400).json({ success: false, message : "Invalid article id"});
    return;
  }

  res.status(200).json({ success: true, article : article, comments: comments});
})