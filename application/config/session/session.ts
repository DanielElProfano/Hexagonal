import session from "express-session"
import mysql from 'mysql';
import dotenv from 'dotenv'
const MySqlStore = require ('express-mysql-session')(session)
dotenv.config()

export const mysqlSession = {
    name:'session_recify',
    secret: 'recify',
    resave: false,
    saveUninitialized: false,
    store : new MySqlStore({ expiration: 360000,
        schema: {
            tableName: 'sessiones',
            columnNames: {
                session_id: 'session_id',
                expires: 'expires',
                data: 'data'
            }
        }
    }, 
    mysql.createConnection({
        user : process.env.DB_USER,
        database : process.env.DB_NAME,
        host : process.env.DB_HOST,
        password: 'password'
    })
    ),
    cookie:  {
        secure: false,
        maxAge: 60000
    }
}