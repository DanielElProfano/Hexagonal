"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLikeController = void 0;
const id_adapter_1 = require("../core/utils-adapters/id.adapter");
const mysql_repository_1 = __importDefault(require("../core/repostitories/mysql.repository"));
const CreateLikeController_1 = require("../core/controllers/like/CreateLikeController");
const makeLikeController = (from) => {
    const id = new id_adapter_1.createIdAdapter();
    const mysql = new mysql_repository_1.default();
    const createLikeController = new CreateLikeController_1.CreateLikeController(id, mysql, from);
    return createLikeController;
};
exports.makeLikeController = makeLikeController;
//# sourceMappingURL=like.js.map