const pool = require('../modules/pool');
const encryption = require('../modules/encrypt');
const table = 'post';

const posts = {
    getAllPost : async() => {
        const query = `SELECT * FROM ${table}`;
        try{
            const result = await pool.queryParam(query);
            return result;
        }catch(err){
            console.log('getAllPost err' + err);
        }throw err;
    },

    getOnePost : async(postIdx) =>{
        const query = `SELECT * FROM ${table} WHERE postIdx = ${postIdx}`;
        try{
            const result = await pool.queryParam(query);
            return result;
        }catch(err){
            console.log('getOnePost err' + err);
        }throw err;
    }
}

module.exports = posts;