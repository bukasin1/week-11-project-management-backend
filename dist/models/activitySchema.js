"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const activitySchema = new mongoose_1.default.Schema({
    projectID: String,
    activityName: {
        type: String,
        required: true,
    },
    commentDetails: String,
    performer: {
        avatar: String,
        userId: String,
        userName: String
    }
}, {
    timestamps: true,
});
const Activity = mongoose_1.default.model('activity', activitySchema);
exports.default = Activity;
//# sourceMappingURL=activitySchema.js.map