//DATABASE CONNECTION
const mysql = require("mysql");

const db = mysql.createConnection({
  host:"127.0.0.1",
  user:"root",
  password:"",
  database:"worktextile-inscription"
})

module.exports = db;