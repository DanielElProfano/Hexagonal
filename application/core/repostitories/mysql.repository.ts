import mysql from 'mysql';

export default class Storage {
    private query: string;
    private connection: mysql.Connection;
    private table: string;
    private result: [];
    constructor(){
        this.connection = mysql.createConnection(
        {
            user : 'root',
            database : 'recify',
            host : 'localhost'
        })
    }
 
    async getList (table){
        return new Promise((resolve, reject) => {
            this.connection.query(`SELECT * FROM ${table}`,(err, data) => {
                if (err) return reject(err);
                resolve(data)
            })
        })
    }

    async getBy(table, field, data){
        return new Promise((resolve, reject) => {
            this.connection.query(`SELECT * FROM ${table} WHERE ${field} = "${data}"`, (err, data) => {
                if(err) {
                    console.log(err);
                    return reject(err);
                }
                resolve(data);
            });
        });
    }
    async insert (table, data){
        console.log("insert: " + table +" data: " + data);
        return new Promise((resolve, reject) => {
            this.connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
                if(err){
                    if (err.code === 'ER_DUP_ENTRY'){
                        return resolve(false);
                    }
                }
                console.log("result: ", result.affectedRows)
                resolve(result.affectedRows);
            })
        })
    }
    async update(table, data) {
        return new Promise((resolve, reject) => {
            this.connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (err, result) => {
                if (err) return reject(err);
                resolve(result)
            })
        })
    }
    async upsert(table, data, post) {
        console.log("action: " +JSON.stringify(post))
        if (data && data.id && post) {
            console.log("entered in update optyion");
    
            return this.update(table, data);
        } else {
            console.log("entered in insert optyion");
            return this.insert(table, data);
        }
    }
    async like(table, value, like) {
        try
        {
            return new Promise((resolve, reject) => {
                if(like === true){
                    this.connection.query(`UPDATE ${table} SET likes = likes + 1 WHERE commentId = "${value}"`, (err, result) => {
                        if(err) {
                            return reject(err);
                        }
                        resolve(result)
                    })
                }else{
                    this.connection.query(`UPDATE ${table} SET likes = likes - 1 WHERE commentId = "${value}"`, (err, result) => {
                        if(err) {
                            if(err.code === 'ER_DATA_OUT_OF_RANGE') // controla que le valor no sea negativo.
                            return resolve(true);
                        }
                        resolve(result)

                    })
                }
            })
        }catch(err){
            console.log(err)
        }
    }

    // DELETE FROM likes WHERE userId ="8960de39-032e-4353-b2c4-0071895f" AND commentId = "0e7597e2-a09a-4f71-a192-4c62d7e9"
    async delete(table, user, post) {
        console.log(user, post)
            return new Promise((resolve, reject) => {
                this.connection.query(
                    `DELETE FROM ${table} WHERE 
                        ${user.fieldName} = "${user.value}"
                        AND
                        ${post.fieldName} = "${post.value}"`
                    // 'DELETE FROM likes WHERE userId ="8960de39-032e-4353-b2c4-0071895f" AND commentId = "0e7597e2-a09a-4f71-a192-4c62d7e9"'
                        , (err, result) => {
                    if(err){
                        console.log("ha habido un error")
                        if(err.code === 'ERR_UNHANDLED_REJECTION'){
                            console.log("madremi aqwue adso")
                            return resolve(true)
                        }
                        return reject(err)
                    }
                    resolve(true)
                })
            })
    }
}