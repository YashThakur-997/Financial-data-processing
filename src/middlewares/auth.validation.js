let joi = require('joi');

const signupvalidation = (req, res, next) => {
    if (req.body.role) {
        req.body.role = req.body.role.toUpperCase();
    } else {
        req.body.role = 'USER'; // Default to USER if not provided
    }
    let signupSchema = joi.object({
        name: joi.string().min(3).max(30).required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).max(30).required(), // Changed from pattern
        role: joi.string().valid('USER', 'ADMIN','ANALYST').required() // Added role validation
    });
    const error = signupSchema.validate(req.body).error;
    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        });
    };
    next();
};

const loginvalidation = (req, res, next) => {
    let loginSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(6).max(30).required(),
    });
    const error = loginSchema.validate(req.body).error;
    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        });
    };
    next();
};

module.exports = {
    signupvalidation,
    loginvalidation
}
