const User = require('../models/user');
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const utils = require('../lib/utils');

exports.login = asyncHandler(async (req, res) => {

    const user = await User.findOne({ email: req.body.email }).exec()

    if (!user) {
        return res.status(401).json({ success: false, msg: "could not find user" });
    }

    const isValid = await bcrypt.compare(req.body.password, user.password);

    if (isValid) {

        const payload  = {
        sub: user._id,
        email: user.email,
        iat: Date.now()
        }

        const accessToken = utils.generateAccessToken(payload)

        res.status(200).json({success: true, message: `You are logged in: ${user.first_name}`, accessToken: accessToken, user: {id: user._id, first_name: user.first_name, last_name: user.last_name}});
        return;
    }

    res.status(400).json({success: false, message: "Invalid password"});
})

exports.register = [

    body('first_name')
      .trim()
      .isLength({ min: 1 })
      .escape()
      .withMessage('First name must be specified.')
      .isAlphanumeric()
      .withMessage('First name has non-alphanumeric characters.'),
    body('last_name')
      .trim()
      .isLength({ min: 1 })
      .escape()
      .withMessage('Last name must be specified.')
      .isAlphanumeric()
      .withMessage('Last name has non-alphanumeric characters.'),
    body('email')
      .trim()
      .isLength({ min: 1 })
      .escape()
      .isEmail()
      .withMessage('An email must be specified.')
      .custom( async (value) => {
        const user = await User.findOne({email: value}).exec()

        if (user) {
          throw new Error('E-mail already in use');
        }
        return
      })
      .withMessage('Email already registered.'),
    body('password', 'Password must have more than 1 characters')
      .isLength({min: 8})
      .escape(),
    body('c_password').custom((value, { req }) => {
        return value === req.body.password;
      })
      .withMessage('Confirm Password and Password do not match'),
  
    asyncHandler(async (req, res, next) => {

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const messages = errors.errors.map(value => value.msg)
        res.status(400).json({ success: false, msg: messages });
        return;
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 10)

      const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hashedPassword,
      });

      const saved_user = await user.save();
      res.status(200).json({ success: true, user: saved_user })
        
    }),
]