const router = require('express').Router();
const { get_info_from_token } = require('../middlewares/auth.token');
const { addRecord, getRecords, deleteRecord, editRecord } = require('../controllers/controller.finance');
const { adminOnly } = require('../middlewares/rolecheck');
const { recordValidation , updateRecordValidation } = require('../middlewares/finance.validation');
const { generalLimiter } = require('../utils/rate.limiting');

router.use(generalLimiter); // Apply general rate limiter to all finance routes

router.post('/add', get_info_from_token,adminOnly ,recordValidation, addRecord);
router.get('/records', get_info_from_token, getRecords);
router.delete('/delete/:id', get_info_from_token, adminOnly,updateRecordValidation, deleteRecord);
router.put('/edit/:id', get_info_from_token, adminOnly, updateRecordValidation, editRecord);

module.exports = router;