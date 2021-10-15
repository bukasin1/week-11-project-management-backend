"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoAtlasUri = process.env.MONGO_URL;
const run = () => {
    try {
        // Connect to the MongoDB cluster
        mongoose_1.default.connect(mongoAtlasUri, () => console.log(' Mongoose is connected'));
    }
    catch (e) {
        console.log('could not connect');
    }
};
exports.default = run;
//# sourceMappingURL=remote.database.js.map