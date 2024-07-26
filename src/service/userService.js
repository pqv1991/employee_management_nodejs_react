import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import bluebird from 'bluebird';
const salt = bcrypt.genSaltSync(10);

// create the connection, specify bluebird as Promise



const hashPassword = (userPassword) => {
    const hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = async (email, password, username) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
    });
    let hashPass = hashPassword(password);
    const [rows, fields] = await connection.execute(
        'insert into users(email,password,username) values(?,?,?)', [email, hashPass, username]
    );

}
const getUserList = async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
    });
    try {
        const [rows, fields] = await connection.execute(
            'SELECT * FROM users'
        );
        return rows;
    } catch (error) {
        console.log(">>Check err:", error)
    }
}
const deleteUser = async (id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
    });
    try {
        const [rows, fields] = await connection.execute(
            'DELETE FROM users WHERE id =?', [id]
        );
        return rows;
    } catch (error) {
        console.log(">>Check err:", error)
    }

}

module.exports = {
    createNewUser, getUserList, deleteUser
}