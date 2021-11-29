import { CreateCommentController } from "../core/controllers/comment/createComments.controller";
import { createIdAdapter } from "../core/utils-adapters/id.adapter";
import  Storage from "../core/repostitories/mysql.repository";
import { CreateLikeController } from "../core/controllers/like/CreateLikeController";

export const makeLikeController = (from): CreateLikeController => {
    const id = new createIdAdapter();
    const mysql = new Storage()
    const  createLikeController = new CreateLikeController(id, mysql, from);
    return createLikeController
}