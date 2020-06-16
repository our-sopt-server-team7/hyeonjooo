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
        const query = `SELECT * FROM ${table} WHERE postIdx = "${postIdx}"`;
        try{
            const result = await pool.queryParam(query);
            return result;
        }catch(err){
            console.log('getOnePost err' + err);
        }throw err;
    },

    createPost : async(author, title, content, createdAt) =>{
        const fields = `author, title, content, createdAt`;
        const question = `?,?,?,?`;
        const values = [author, title, content, createdAt];
        const query=`insert into ${table} (${fields}) values (${question});`;

        try{
            const result = await pool.queryParamArr(query, values);
            const insertId = result.insertId;
            return insertId;
        }catch(err){
            console.log('createPost err' + err);
        }throw err;
    },

    updatePost : async(postIdx, title, content) =>{
        const query = `UPDATE ${table} SET title = "${title}", content = "${content}" WHERE postIdx = "${postIdx}"`;
        try{
            const result = await pool.queryParam(query);
            return result;
        }catch(err){
            console.log('updatePost err' + err);
        }throw err;
    },

    deletePost : async(postIdx) =>{
        const query = `DELETE FROM ${table} WHERE postIdx = "${postIdx}"`;
        try{
            const result = await pool.queryParam(query);
            return result;
        }catch(err){
            console.log('deletePost ERROR'+ err);
            throw err;
        }
    }
}

module.exports = posts;