import mysql from 'mysql';
import session from 'express-session';
import expressMysqlSession from 'express-mysql-session';
import { configMysqlInterface } from './Interface.Mysql';

//creamos la conexión a la BBDD
class HandleMysqlConnection {

    connection: mysql.Connection;
    connected: boolean;
    options: configMysqlInterface
    MysqlStore = expressMysqlSession(session);
    configSessionOptions : any
    constructor()
    {
        this.options = {
            user : 'root',
            database : 'recify',
            host : 'localhost'
        }
        this.configSessionOptions = {
            key:'session_recify',
            secret: 'recify',
            store: new this.MysqlStore({
            expiration: 360000,
                schema: 
                {
                    tableName: 'sessions',
                    columnNames: 
                    {
                        session_id: 'session_id',
                        expires: 'expires',
                        data: 'data'
                    }
                }   
            })  
        }
    }
    init() {
        this.connection = mysql.createConnection(this.options)
        this.connection.connect((error: mysql.MysqlError)=>{
            if(error){
                console.error('db_error: ', error);
            }else{
                console.log("DB Mysql conectted")
            }
        });

        this.connection.on('error', (error: mysql.MysqlError) => {
            console.error('db_error', error);
        if(error.code === 'PROTOCOL_CONNECTION_LOST') {
        }else{
            throw error;
        }
     })

    }
    session(){
        return {
            key:'session_recify',
            secret: 'recify',
            store: new this.MysqlStore({
            expiration: 360000,
                schema: 
                {
                    tableName: 'sessions',
                    columnNames: 
                    {
                        session_id: 'session_id',
                        expires: 'expires',
                        data: 'data'
                    }
                }   
            }),
            resave: true,
            saveUninitialized: false,
            cookie: {
                maxAge: 360000,
                sameSite: true,
                secure: false,
                httpOnly: false
            }
        }
    }
}
export const mysqlInit = new HandleMysqlConnection()