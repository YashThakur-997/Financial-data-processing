const router = require('express').Router();
const { signup, login, logout } = require('../controllers/auth.controller');
const { signupvalidation, loginvalidation } = require('../middlewares/auth.validation');
const { loginLimiter } = require('../utils/rate.limiting');

router.post('/signup', signupvalidation, signup);
router.post('/login', loginLimiter, loginvalidation, login);
router.post('/logout', logout);

module.exports = router;