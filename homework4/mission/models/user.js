const pool = require('../modules/pool');
const encryption = require('../modules/encrypt');
const table = 'user';

const user = {
    signup : async (id, name, password, salt, email)=>{
        const fields = 'id, name, password, salt, email';
        const questions = '?, ?, ?, ?, ?';
        var hashed = await encryption.encrypt(password, salt);
        values = [id, name, hashed, salt, email];
        const query = `INSERT INTO ${table}(${fields}) VALUES (${questions})`;
        try{
            const result = await pool.queryParamArr(query,values);
            const insertId = result.insertId;
            return insertId;
        }catch(err){
            if(err.errno == 1062){
                console.log('signup ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('signup ERROR : ', err);
            throw err;
        }
    },

    signin : async (id, password)=>{
        const query = `SELECT * FROM ${table} WHERE id="${id}"`;
        try{
            const result = await pool.queryParam(query);
            var hashed = await encrypt(result[0].salt, password);
            if(result[0].password === hashed)
            {
                return true;
            }
            else
            {
                return false;
            }
        }catch(err){
            throw err;
        }
    },
    checkUser : async (id) =>{
        const query = `SELECT * FROM ${table} WHERE id="${id}"`;
        try{
        const result = await pool.queryParam(query);
        if(result.length != 0)
        {
            return true;
        }
        else
        {
            return false;
        }
        }catch(err){
            console.log('checkUser ERROR : ', err);
            throw err;
        }
    },
    getUserById : async (id) =>{
        const query = `SELECT * FROM ${table} WHERE id="${id}"`;
        try{
            const result = await pool.queryParam(query);
            return result;
        }
        catch(err){
            console.log('getUserById ERROR : ', err);
            throw err;
        }
    }
}
module.exports = user;