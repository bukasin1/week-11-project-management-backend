"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const projectSchema = new mongoose_1.default.Schema({
    owner: {
        type: String
    },
    projectName: {
        type: String,
        unique: true,
        required: true
    },
    collaborators: [
        {
            userId: String
        }
    ]
}, {
    timestamps: true,
});
const Project = mongoose_1.default.model('project', projectSchema);
exports.default = Project;
//# sourceMappingURL=projectSchema.js.map