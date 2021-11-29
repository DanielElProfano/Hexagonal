"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGetAllPostController = exports.makeCreatePostController = void 0;
const createPost_controller_1 = require("../core/controllers/post/createPost.controller");
const id_adapter_1 = require("../core/utils-adapters/id.adapter");
const mysql_repository_1 = __importDefault(require("../core/repostitories/mysql.repository"));
const GetAllPost_controller_1 = require("../core/controllers/post/GetAllPost.controller");
const makeCreatePostController = () => {
    console.log("Post controller");
    const id = new id_adapter_1.createIdAdapter();
    const mysql = new mysql_repository_1.default();
    const createPostController = new createPost_controller_1.CreatePostController(id, mysql);
    return createPostController;
};
exports.makeCreatePostController = makeCreatePostController;
const makeGetAllPostController = () => {
    console.log("get all post");
    const mysql = new mysql_repository_1.default();
    const getAllPostController = new GetAllPost_controller_1.GetAllPostController(mysql);
    return getAllPostController;
};
exports.makeGetAllPostController = makeGetAllPostController;
//# sourceMappingURL=post.js.map