const pool = require('../modules/pool');
const table = 'user';

const user = {
    signup: async (id, name, password, salt, email) => {
        const fields = 'id, name, password, salt, email';
        const questions = `?, ?, ?, ?, ?`;
        const values = [id, name, password, salt, email];
        const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;
        try {
            const result = await pool.queryParamArr(query, values);
            const insertId = result.insertId;
            return insertId;
        } catch (err) {
            console.log('signup ERROR : ', err);
            throw err;
        }
    },
    checkUser: async (id) => {
        const query = `SELECT * FROM ${table} WHERE id="${id}"`;
        try {
            const result = await pool.queryParam(query);
            if (result.length === 0) {
                return false;
            } else return true;
        } catch (err) {
            console.log('checkUser ERROR : ', err);
            throw err;
        }
    },
    getUserById: async (id) => {
        const query = `SELECT * FROM ${table} WHERE id="${id}"`;
        try {
            return await pool.queryParam(query);
        } catch (err) {
            console.log('getUserById ERROR : ', err);
            throw err;
        }
    },
    getUserByIdx: async (idx) => {
        const query = `SELECT * FROM ${table} WHERE userIdx="${idx}"`;
        try {
            return await pool.queryParam(query);
        } catch (err) {
            console.log('getUserByIdx ERROR : ', err);
            throw err;
        }
    },
    updateProfile: async (userIdx, profile) => {//profile은 path임 string
        let query = `UPDATE ${table} SET image="${profile}" WHERE userIdx="${userIdx}"`;
        try {
            await pool.queryParam(query);
            query = `SELECT id, name, email, image FROM ${table} WHERE userIdx="${userIdx}"`;
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            console.log('update profile ERROR : ', err);
            throw err;
        }
    },

    updateSelfies: async (location, userIdx) => {
        const query = `INSERT INTO selfies (url, userIdx) VALUES("${location}", ${userIdx})`;
        try {
            const result = await pool.queryParamArr(query);
            const insertId = result.insertId;
            return insertId;
        } catch (err) {
            console.log('updateSelfies ERROR : ', err);
            throw err;
        }
    }
}

module.exports = user;