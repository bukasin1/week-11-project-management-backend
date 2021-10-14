"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const teamSchema = new mongoose_1.default.Schema({
    projectID: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    teamName: {
        type: String,
        required: true,
    },
    members: [
        {
            userId: String,
        },
    ],
}, {
    timestamps: true,
});
const Team = mongoose_1.default.model('team', teamSchema);
exports.default = Team;
//# sourceMappingURL=teamsSchema.js.map