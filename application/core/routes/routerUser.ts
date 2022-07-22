import { Router }  from "express";
import { makeLoginController } from "../../factories/login";
import { makeRegisterController } from "../../factories/register";
import { generalController } from "../controllers/general.controller";
import { logoutController } from "../controllers/user/logout.controller";

const router = Router();

router
    .post('/login', generalController(makeLoginController()))
    .post('/register', generalController(makeRegisterController()))
    .post('/logout', logoutController)
    
  
export default router;
