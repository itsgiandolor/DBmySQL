import mysql from "mysql2/promise";

const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "astraeiaaaa",
    database: "clinic_db",
});