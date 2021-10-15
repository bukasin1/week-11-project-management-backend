"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const taskSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    createdBy: {
        type: String,
    },
}, {
    timestamps: true,
});
const Task = mongoose_1.default.model('task', taskSchema);
exports.default = Task;
//# sourceMappingURL=taskschema.js.map