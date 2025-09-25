// validation related the entered data is done in this file

const { check } = require("express-validator");

exports.validateUserSignUp = [
    check('name').not().isEmpty().withMessage('Name field is empty'),
    check('email').isEmail().withMessage('Please enter valid email'),
    check('password').isLength({min: 6, max: 10}).withMessage(`Password length must be between 6 & 10`)
]