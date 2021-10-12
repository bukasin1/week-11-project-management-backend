"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    userName: {
        type: String,
    },
    googleId: {
        type: String,
    },
}, {
    timestamps: true,
});
const User = mongoose_1.default.model('usertest', userSchema);
exports.default = User;
//# sourceMappingURL=usermodeltest.js.map