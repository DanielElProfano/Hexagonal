"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCreateCommentController = void 0;
const createComments_controller_1 = require("../core/controllers/comment/createComments.controller");
const id_adapter_1 = require("../core/utils-adapters/id.adapter");
const mysql_repository_1 = __importDefault(require("../core/repostitories/mysql.repository"));
const makeCreateCommentController = () => {
    console.log("Post controller");
    const id = new id_adapter_1.createIdAdapter();
    const mysql = new mysql_repository_1.default();
    const createCommentController = new createComments_controller_1.CreateCommentController(id, mysql);
    return createCommentController;
};
exports.makeCreateCommentController = makeCreateCommentController;
//# sourceMappingURL=comment.js.map