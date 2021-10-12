"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const task_controller_1 = require("../controller/task-controller");
const auth_check_1 = require("../middleware/auth-check");
const projectAuth_1 = require("../middleware/projectAuth");
router.get('/', auth_check_1.isLoggedIn, task_controller_1.getAllTasks);
router.get('/:projectID/:status', auth_check_1.isLoggedIn, task_controller_1.getTaskByStatus);
router.delete('/deletetask/:taskID', auth_check_1.isLoggedIn, projectAuth_1.projectAuth, task_controller_1.deleteTask);
exports.default = router;
//# sourceMappingURL=task-routes.js.map