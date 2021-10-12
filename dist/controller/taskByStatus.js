"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTaskByStatus = void 0;
const tasksSchema_1 = __importDefault(require("../models/tasksSchema"));
async function getTaskByStatus(req, res) {
    let taskStatus = await tasksSchema_1.default.findOne({
        status: req.params.status,
    });
    if (!taskStatus) {
        res
            .status(404)
            .send(` Task with Status "${req.params.status}" is not found `);
    }
    else {
        res.status(200).send(taskStatus);
    }
}
exports.getTaskByStatus = getTaskByStatus;
//# sourceMappingURL=taskByStatus.js.map