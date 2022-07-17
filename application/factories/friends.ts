import { AddFriendController } from "../core/controllers/friends/addFriend.controller";
import  Storage from "../core/repostitories/mysql.repository";
import { GetAllPostController } from "../core/controllers/post/GetAllPost.controller";
import { PetitionOfFrienshipController } from "../core/controllers/friends/petitionOfFrienship.controller";

export const makeAddFriendController = (): AddFriendController => {
    const mysql = new Storage()
    const addFriendController = new AddFriendController(mysql);
    return addFriendController
}

export const makeGetAllFriendsController = () : GetAllPostController => {
    const mysql = new Storage();
    const getAllPostController = new GetAllPostController(mysql);
    return getAllPostController;
}
export const petitionOfFrienshipController = () : PetitionOfFrienshipController => {
    const mysql = new Storage()
    const petitionOfFrienshipController = new PetitionOfFrienshipController(mysql)
    return petitionOfFrienshipController
}
