import { Router }  from "express";
import { makeLoginController } from "../../factories/login";
import { makeRegisterController } from "../../factories/register";
import { generalController } from "../controllers/general.controller";


const router = Router();

router
    .post('/login', generalController(makeLoginController()))
    .post('/register', generalController(makeRegisterController()))
  
export default router;
