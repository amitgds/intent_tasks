const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { registerSchema, loginSchema } = require('../validations/authValidation');
const validate = require('../middleware/validationMiddleware');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', validate(loginSchema),authController.login);
router.post('/register', validate(registerSchema),authController.register);
router.post('/refresh-token',protect,authController.refresh);
router.post('/get-profile',protect,authController.getProfile);

module.exports = router;
