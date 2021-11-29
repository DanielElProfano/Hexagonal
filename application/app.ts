import express, {Router} from 'express';
import cors from 'cors';
import session from 'express-session';
import expressMysqlSession from 'express-mysql-session';
import router from './core/routes';
import { mongooseConnect } from './config/bd/mongodb/mongo'
import { mysqlSession } from './config/session/session';


class Server {
    app = express();
    port = 4000 ;
    router = Router();
    MysqlStore = expressMysqlSession(session)

    applymiddlerwares() {
      this.app.use((req, res, next) => {
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Credentials',);
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
      });
      
      this.app.use(cors({
        origin: ['http://localhost:3000'],
        credentials: true,
      }));
      this.app.use(express.urlencoded({extended: false})); //activa req.body
      this.app.use(express.json());
      this.app.use(session(mysqlSession));
      this.app.use('/', router);
    }
    start(){
      this.applymiddlerwares();
      mongooseConnect();
      this.app.listen(this.port, () => console.log("listening on port", this.port))
    }
}

export const server = new Server();