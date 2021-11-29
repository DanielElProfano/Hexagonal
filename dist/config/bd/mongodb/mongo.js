"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongooseConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongooseConnect = () => {
    // add your own uri below
    const DB_URL = 'mongodb://localhost:27017/recify';
    mongoose_1.default.connect(DB_URL, {}).then(() => {
        autoIndex: true;
        console.log("conectado a DDBB: " + DB_URL);
    })
        .catch(() => {
        console.log("Error conecting to DB");
    });
};
exports.mongooseConnect = mongooseConnect;
//# sourceMappingURL=mongo.js.map