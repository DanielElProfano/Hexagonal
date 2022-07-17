import sql from 'mssql';

const dbSettings = {
    user: "daniel",
    password: "daniel01",
    server: "localhost",
    database: "recify",
    
    options: {
        encrypt: true,
        trustServerCertificate: true,
    }

}

export async function getConnection() {
    const pool = await sql.connect(dbSettings);
    const result = await pool.request().query('select * from user');
    console.log(result)
}
