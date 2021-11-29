"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
class Storage {
    constructor() {
        this.connection = mysql_1.default.createConnection({
            user: 'root',
            database: 'recify',
            host: 'localhost'
        });
    }
    getList(table) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.connection.query(`SELECT * FROM ${table}`, (err, data) => {
                    if (err)
                        return reject(err);
                    resolve(data);
                });
            });
        });
    }
    getBy(table, field, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.connection.query(`SELECT * FROM ${table} WHERE ${field} = "${data}"`, (err, data) => {
                    if (err) {
                        console.log(err);
                        return reject(err);
                    }
                    resolve(data);
                });
            });
        });
    }
    insert(table, data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("insert: " + table + " data: " + data);
            return new Promise((resolve, reject) => {
                this.connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
                    if (err) {
                        if (err.code === 'ER_DUP_ENTRY') {
                            return resolve(true);
                        }
                    }
                    console.log("result: ", result.affectedRows);
                    resolve(result.affectedRows);
                });
            });
        });
    }
    update(table, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (err, result) => {
                    if (err)
                        return reject(err);
                    resolve(result);
                });
            });
        });
    }
    upsert(table, data, post) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("action: " + JSON.stringify(post));
            if (data && data.id && post) {
                console.log("entered in update optyion");
                return this.update(table, data);
            }
            else {
                console.log("entered in insert optyion");
                return this.insert(table, data);
            }
        });
    }
    like(table, value, like) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return new Promise((resolve, reject) => {
                    if (like === true) {
                        this.connection.query(`UPDATE ${table} SET likes = likes + 1 WHERE commentId = "${value}"`, (err, result) => {
                            if (err) {
                                return reject(err);
                            }
                            resolve(result);
                        });
                    }
                    else {
                        this.connection.query(`UPDATE ${table} SET likes = likes - 1 WHERE commentId = "${value}"`, (err, result) => {
                            if (err) {
                                if (err.code === 'ER_DATA_OUT_OF_RANGE') // controla que le valor no sea negativo.
                                    return resolve(true);
                            }
                            resolve(result);
                        });
                    }
                });
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    // DELETE FROM likes WHERE userId ="8960de39-032e-4353-b2c4-0071895f" AND commentId = "0e7597e2-a09a-4f71-a192-4c62d7e9"
    delete(table, user, post) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(user, post);
            return new Promise((resolve, reject) => {
                this.connection.query(`DELETE FROM ${table} WHERE 
                        ${user.fieldName} = "${user.value}"
                        AND
                        ${post.fieldName} = "${post.value}"`
                // 'DELETE FROM likes WHERE userId ="8960de39-032e-4353-b2c4-0071895f" AND commentId = "0e7597e2-a09a-4f71-a192-4c62d7e9"'
                , (err, result) => {
                    if (err) {
                        console.log("ha habido un error");
                        if (err.code === 'ERR_UNHANDLED_REJECTION') {
                            console.log("madremi aqwue adso");
                            return resolve(true);
                        }
                        return reject(err);
                    }
                    resolve(true);
                });
            });
        });
    }
}
exports.default = Storage;
//# sourceMappingURL=mysql.repository.js.map