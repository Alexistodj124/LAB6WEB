import mysql from 'mysql2/promise'

const pool = mysql.createPool({
    host: 'mysql',
    port: 3306,
    user: 'root',
    database: 'scanner_code_blog',
    password: 'Alexis2012',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

export default pool