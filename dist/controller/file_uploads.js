"use strict";
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const cloudinary = require('cloudinary').v2;
const cloudKey = process.env.Cloud_Name;
const apiKey = process.env.API_Key;
const apiSecret = process.env.API_Secret;
cloudinary.config({
    cloud_name: cloudKey,
    api_key: apiKey,
    api_secret: apiSecret
});
exports.upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({}),
    fileFilter: (req, file, callback) => {
        let ext = path_1.default.extname(file.originalname);
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !== '.pdf' && ext !== '.zip') {
            callback(new Error('File type is not supported.'), false);
            return;
        }
        callback(null, true);
    }
}).single('avatar');
//# sourceMappingURL=file_uploads.js.map