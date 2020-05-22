const mysql = require('promise-mysql');

const config = {
    host: 'database-1.c0y2bdmqrxav.ap-northeast-2.rds.amazonaws.com',
    port: 3306,
    user: 'admin',
    password: 'qkrguswn12#',
    database: 'Sopt'
}

module.exports = mysql.createPool(config);