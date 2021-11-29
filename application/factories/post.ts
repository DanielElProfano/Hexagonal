import { CreatePostController } from "../core/controllers/post/createPost.controller";
import { createIdAdapter } from "../core/utils-adapters/id.adapter";
import  Storage from "../core/repostitories/mysql.repository";
import { GetAllPostController } from "../core/controllers/post/GetAllPost.controller";
export const makeCreatePostController = (): CreatePostController => {
    console.log("Post controller")
    const id = new createIdAdapter();
    const mysql = new Storage()
    const createPostController = new CreatePostController(id, mysql);
    return createPostController
}

export const makeGetAllPostController = () : GetAllPostController => {
    console.log("get all post");
    const mysql = new Storage();
    const getAllPostController = new GetAllPostController(mysql);
    return getAllPostController;
}