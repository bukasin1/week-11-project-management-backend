"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const task_controller_1 = require("../controller/task-controller");
const auth_check_1 = require("../middleware/auth-check");
router.get('/', auth_check_1.isLoggedIn, task_controller_1.getAllTasks);
router.get('/:status', task_controller_1.getTaskByStatus);
router.get('/deletetask/:id', auth_check_1.isLoggedIn, task_controller_1.deleteTask);
exports.default = router;
//# sourceMappingURL=task-routes.js.map