const joi = require("joi");
const { use } = require("react");

const recordSchema = joi.object({
    amount: joi.number().positive().required(),
    type: joi.string().valid("INCOME", "EXPENSE").required(),
    category: joi.string().max(50).required(),
    description: joi.string().max(200).optional(),
    userId: joi.number().integer().positive().required() // Added userId validation
});

const updateRecordSchema = joi.object({
    amount: joi.number().positive(),
    type: joi.string().valid("INCOME", "EXPENSE"),
    category: joi.string().max(50),
    description: joi.string().max(200),
    userId: joi.number().integer().positive().required() // Added userId validation
}).min(2); // At least one field to update + userId

const recordValidation = (req, res, next) => {
    const { error } = recordSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

const updateRecordValidation = (req, res, next) => {
    const { error } = updateRecordSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

module.exports = { recordValidation, updateRecordValidation };