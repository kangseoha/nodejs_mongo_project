const mysql = require('mysql2/promise')

const pool = mysql.createPool({
    host: 'mm4030.cafe24.com',
    port: '3306',
    user: 'mm4030',
    password: 'seoha123!',
    database: 'mm4030',
    connectionLimit: 10,
    multipleStatements: true,
    typeCast: function (field, next) {
        if (field.type == 'VAR_STRING') {
            return field.string();
        }
        return next();
    }
})

const data = pool.query('set names utf8;')
// const data = pool.query('set session character_set_connection=utf8;')


module.exports = pool