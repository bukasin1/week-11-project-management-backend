"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const taskSchema = new mongoose_1.default.Schema({
    projectID: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    assignedUser: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    files: [
        {
            fileUrl: String,
            fileName: String,
            uploadedBy: {
                userId: String,
                userName: String,
                userAvatar: String
            },
            fileSize: String,
            uploadedOn: Date
        },
    ],
    comments: [
        {
            createdBy: {
                userId: String,
                userName: String,
                userRole: String
            },
            content: {
                type: String,
                required: true
            },
            createdOn: {
                type: Date,
                default: Date.now()
            },
            updatedOn: {
                type: Date
            }
        },
    ],
    dueDate: {
        type: String,
    },
    status: {
        type: String,
        enum: ['backlog', 'todo', 'done'],
        default: 'backlog',
    },
}, {
    timestamps: true,
});
const Task = mongoose_1.default.model('task', taskSchema);
exports.default = Task;
//# sourceMappingURL=tasksSchema.js.map