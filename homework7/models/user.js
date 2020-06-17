const pool = require('../modules/pool');
const encryption = require('../modules/encryption');
const crypto = require('crypto');
const table = 'user';

const user = {
    signup: async (id, name, password, salt, email) =>{
        const fields = 'id, name, password, salt, email';
        const questions = `?, ?, ?, ?, ?`;
        const hashedPassword = await encryption.encrypt(password, salt);
        const values = [id, name, hashedPassword, salt, email];
        const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;
        try{
            const result = await pool.queryParamArr(query, values);
            const insertId = result.insertId;
            return insertId;
        } catch{
            if(err.errno == 1062){
                console.log('signup ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('signup ERROR :', err);
            throw err;
        }
    },

    signin : async (id)=>{
        const query = `SELECT * FROM ${table} WHERE id = "${id}"`;
        try{
            const result = await pool.queryParam(query);
            // console.log("입력한 password: " + password);
            // console.log("원래 salt값: " + result[0].salt);
            // console.log("저장된 hash값: " + result[0].password);
            // const hashed = await crypto.pbkdf2Sync(password, result[0].salt, 1, 32, 'sha512').toString('hex');
            // console.log('로그인 비번으로 해쉬한값: ' + hashed);

            // if(result[0].password === hashed) return result;
            // else return false;
            return result;
        } catch(err){
            console.log('signin ERROR : ', err);
            throw err;
        }
    },

    checkUser: async (id) => {
        const query = `SELECT * FROM ${table} WHERE id = "${id}"`;
        try{
            const result = await pool.queryParam(query);
            if(result.length > 0) return true;
            else return false;
        } catch(err){
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