"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mysqlSession = void 0;
const express_session_1 = __importDefault(require("express-session"));
const mysql_1 = __importDefault(require("mysql"));
const dotenv_1 = __importDefault(require("dotenv"));
const MySqlStore = require('express-mysql-session')(express_session_1.default);
dotenv_1.default.config();
exports.mysqlSession = {
    name: 'session_recify',
    secret: 'recify',
    resave: false,
    saveUninitialized: false,
    store: new MySqlStore({ expiration: 360000,
        schema: {
            tableName: 'sessiones',
            columnNames: {
                session_id: 'session_id',
                expires: 'expires',
                data: 'data'
            }
        }
    }, mysql_1.default.createConnection({
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        password: 'password'
    })),
    cookie: {
        secure: false,
        maxAge: 60000
    }
};
//# sourceMappingURL=session.js.map