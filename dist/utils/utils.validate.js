"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserSignUp = void 0;
const joi_1 = __importDefault(require("joi"));
const validateUserSignUp = (user) => {
    const schema = {
        firstname: joi_1.default.string().min(2).max(100).required(),
        lastname: joi_1.default.string().min(1).max(100).required(),
        email: joi_1.default.string().min(1).max(254).email().required(),
        password: joi_1.default.string().min(6).required(),
    };
    return joi_1.default.validate(user, schema);
};
exports.validateUserSignUp = validateUserSignUp;
//# sourceMappingURL=utils.validate.js.map