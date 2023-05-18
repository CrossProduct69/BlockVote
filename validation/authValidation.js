const validator = require("express-validator")

let validateRegister = [

    validator.check("first_name","Name is required").not().isEmpty(),

    validator.check("email_address", "Invalid email").isEmail().trim(),

    validator.check("password", "Invalid password, password must be at least 6 characters long")
    .isLength({ min: 6}),

    validator.check("confirm_password", "Password does not match")
    .custom((value, { req }) => {
        return value === req.body.password
    })
];

let validateLogin = [
    validator.check("email_address", "Invalid email").isEmail().trim(),

    validator.check("password", "Invalid password")
    .not().isEmpty()
];

module.exports = {
    validateRegister: validateRegister,
    validateLogin: validateLogin
};