import { Router } from 'express';
import routerPost from './routesPost';
import routerComment from './routerComment';
import routerUser from './routerUser';

const router = Router();

router.use('/user', routerUser)
router.use('/post', routerPost )
router.use('/comment', routerComment)
export default router;

