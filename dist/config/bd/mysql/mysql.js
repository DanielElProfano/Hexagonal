"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mysqlInit = void 0;
const mysql_1 = __importDefault(require("mysql"));
const express_session_1 = __importDefault(require("express-session"));
const express_mysql_session_1 = __importDefault(require("express-mysql-session"));
//creamos la conexión a la BBDD
class HandleMysqlConnection {
    constructor() {
        this.MysqlStore = (0, express_mysql_session_1.default)(express_session_1.default);
        this.options = {
            user: 'root',
            database: 'recify',
            host: 'localhost'
        };
        this.configSessionOptions = {
            key: 'session_recify',
            secret: 'recify',
            store: new this.MysqlStore({
                expiration: 360000,
                schema: {
                    tableName: 'sessions',
                    columnNames: {
                        session_id: 'session_id',
                        expires: 'expires',
                        data: 'data'
                    }
                }
            })
        };
    }
    init() {
        this.connection = mysql_1.default.createConnection(this.options);
        this.connection.connect((error) => {
            if (error) {
                console.error('db_error: ', error);
            }
            else {
                console.log("DB Mysql conectted");
            }
        });
        this.connection.on('error', (error) => {
            console.error('db_error', error);
            if (error.code === 'PROTOCOL_CONNECTION_LOST') {
            }
            else {
                throw error;
            }
        });
    }
    session() {
        return {
            key: 'session_recify',
            secret: 'recify',
            store: new this.MysqlStore({
                expiration: 360000,
                schema: {
                    tableName: 'sessions',
                    columnNames: {
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
        };
    }
}
exports.mysqlInit = new HandleMysqlConnection();
//# sourceMappingURL=mysql.js.map