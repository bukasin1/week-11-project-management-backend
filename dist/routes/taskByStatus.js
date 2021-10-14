"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const taskByStatus_1 = require("../controller/taskByStatus");
router.get('/getTaskByStatus/:status', taskByStatus_1.getTaskByStatus);
exports.default = router;
//# sourceMappingURL=taskByStatus.js.map