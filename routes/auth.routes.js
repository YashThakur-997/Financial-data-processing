const router = require('express').Router();
const { signup, login, logout } = require('../controllers/auth.controller');
const { signupvalidation, loginvalidation } = require('../middlewares/auth.validation');

router.post('/signup', signupvalidation, signup);
router.post('/login', loginvalidation, login);
router.post('/logout', logout);

module.exports = router;