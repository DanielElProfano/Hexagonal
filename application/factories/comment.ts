import { CreateCommentController } from "../core/controllers/comment/createComments.controller";
import { createIdAdapter } from "../core/utils-adapters/id.adapter";
import  Storage from "../core/repostitories/mysql.repository";
export const makeCreateCommentController = (): CreateCommentController => {
    console.log("Post controller")
    const id = new createIdAdapter();
    const mysql = new Storage()
    const  createCommentController = new CreateCommentController(id, mysql);
    return createCommentController
}