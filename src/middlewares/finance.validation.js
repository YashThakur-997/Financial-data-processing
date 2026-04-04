const joi = require("joi");
const { use } = require("react");

const recordSchema = joi.object({
    amount: joi.number().positive().required(),
    type: joi.string().valid("INCOME", "EXPENSE").required(),
    category: joi.string().valid("FOOD", "SALARY", "RENT", "OTHER").required(),
    description: joi.string().max(200).optional(),
    userId: joi.number().integer().positive().required() // Added userId validation
});

const updateRecordSchema = joi.object({
    amount: joi.number().positive(),
    type: joi.string().valid("INCOME", "EXPENSE"),
    category: joi.string().valid("FOOD", "SALARY", "RENT", "OTHER"),
    description: joi.string().max(200),
    userId: joi.number().integer().positive().required() // Added userId validation
}).min(2); // At least one field to update + userId

const allowedCategories = ["FOOD", "SALARY", "RENT", "OTHER"];



const recordValidation = (req, res, next) => {
    // Normalize type and category to uppercase if present
    if (req.body.type) req.body.type = req.body.type.toUpperCase();
    if (req.body.category) req.body.category = req.body.category.toUpperCase();
    const { error } = recordSchema.validate(req.body);
    if (error) {
        // Custom error for category/type
        if (error.details[0].context && error.details[0].context.key === "category") {
            return res.status(400).json({ error: `Invalid category. Allowed values: ${allowedCategories.join(", ")}` });
        }
        if (error.details[0].context && error.details[0].context.key === "type") {
            return res.status(400).json({ error: `Invalid type. Allowed values: INCOME, EXPENSE` });
        }
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

const updateRecordValidation = (req, res, next) => {
    if (req.body.type) req.body.type = req.body.type.toUpperCase();
    if (req.body.category) req.body.category = req.body.category.toUpperCase();
    const { error } = updateRecordSchema.validate(req.body);
    if (error) {
        if (error.details[0].context && error.details[0].context.key === "category") {
            return res.status(400).json({ error: `Invalid category. Allowed values: ${allowedCategories.join(", ")}` });
        }
        if (error.details[0].context && error.details[0].context.key === "type") {
            return res.status(400).json({ error: `Invalid type. Allowed values: INCOME, EXPENSE` });
        }
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

module.exports = { recordValidation, updateRecordValidation };