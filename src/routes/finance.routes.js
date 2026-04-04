const router = require('express').Router();
const { get_info_from_token } = require('../middlewares/auth.token');
const { addRecord, getRecords, getAllRecords,deleteRecord, editRecord } = require('../controllers/controller.finance');
const { adminOnly,adminOrAnalystOnly } = require('../middlewares/rolecheck');
const { getSummary , getOverallSummary , getCategoryWiseSummary , getOverallCategoryWiseSummary } = require('../controllers/summary.controller');
const { recordValidation , updateRecordValidation } = require('../middlewares/finance.validation');
const { getUserDashboard } = require('../controllers/dashboard.controller');
const { generalLimiter } = require('../utils/rate.limiting');

router.use(generalLimiter); // Apply general rate limiter to all finance routes

router.post('/add', get_info_from_token,adminOnly ,recordValidation, addRecord);
router.get('/records', get_info_from_token, getRecords);
router.get('/all-records', get_info_from_token, adminOrAnalystOnly, getAllRecords);
router.delete('/delete/:id', get_info_from_token, adminOnly,updateRecordValidation, deleteRecord);
router.put('/edit/:id', get_info_from_token, adminOnly, updateRecordValidation, editRecord);

// summary and dashboard routes
router.get('/summary', get_info_from_token, getSummary);
router.get('/overall-summary', get_info_from_token, adminOrAnalystOnly, getOverallSummary);
router.get('/category-summary', get_info_from_token, getCategoryWiseSummary);
router.get('/overall-category-summary', get_info_from_token, adminOrAnalystOnly, getOverallCategoryWiseSummary);

router.get('/dashboard', get_info_from_token, getUserDashboard);


module.exports = router;