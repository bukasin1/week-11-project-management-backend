'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
//import { changePassword } from "../controllers/password_reset_controller"
const password_reset_controller_1 = require('../controller/password_reset_controller');
const auth_check_1 = require('../middleware/auth-check');
const router = (0, express_1.default)();
router.post('/changepassword', auth_check_1.isLoggedIn, password_reset_controller_1.changePassword);
router.post('/forgetpassword', password_reset_controller_1.forgetPassword);
router.get('/verifyresetpassword/:token', password_reset_controller_1.verifyResetPassword);
router.post('/resetpassword/:token', password_reset_controller_1.resetPassword);
exports.default = router;
//# sourceMappingURL=passwordRoutes.js.map
