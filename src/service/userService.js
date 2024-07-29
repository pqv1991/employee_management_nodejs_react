import mysql from 'mysql2/promise';

import bluebird from 'bluebird';
import db from '../models';
import { where } from 'sequelize/lib/sequelize';
import { raw } from 'body-parser';
import bcrypt from 'bcrypt';
const salt = bcrypt.genSaltSync(10);


const hashPassword = (userPassword) => {
    const hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = async (email, password, username) => {
    let hashPass = hashPassword(password);
    try {
        await db.User.create({
            username: username,
            email: email,
            password: hashPass,
        })

    } catch (error) {
        console.log(">> check error:", error);
    }


}
const getUserList = async () => {
    //test relationship
    let newUser = await db.User.findOne({
        where: { id: 1 },
        attributes: ['id', 'username', 'email'],
        include: { model: db.Group, attributes: ['name', 'description'] },
        raw: true,
        nest: true
    });

    let roles = await db.Role.findAll({
        include: { model: db.Group, where: { id: 1 } },
        raw: true,
        nest: true
    });
    console.log(">> Check new User:", newUser);
    console.log(">> Check new Role:", roles);
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird,
    // });
    // try {
    //     const [rows, fields] = await connection.execute(
    //         'SELECT * FROM user'
    //     );
    //     return rows;
    // } catch (error) {
    //     console.log(">>Check err:", error)
    // }
    let users = [];
    users = await db.User.findAll();
    return users;
}
const deleteUser = async (userId) => {
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird,
    // });
    // try {
    //     const [rows, fields] = await connection.execute(
    //         'DELETE FROM user WHERE id =?', [id]
    //     );
    //     return rows;
    // } catch (error) {
    //     console.log(">>Check err:", error)
    // }

    await db.User.destroy({
        where: { id: userId }
    });
}

const getUserById = async (userId) => {
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird,
    // });
    // try {
    //     const [rows, fields] = await connection.execute(
    //         'SELECT * FROM user WHERE id =?', [id]
    //     );
    //     return rows;
    // } catch (error) {
    //     console.log(">>Check err:", error)
    // }
    let user = {};
    user = await db.User.findOne({
        where: { id: userId }
    });
    return user = user.get({ plain: true }) // convert Sequelize to javacript
}

const updateUserInfor = async (email, username, userId) => {
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird,
    // });
    // try {
    //     const [rows, fields] = await connection.execute(
    //         'UPDATE user SET email = ?, username = ? WHERE id = ?', [email, username, id]
    //     );
    //     return rows;

    // } catch (error) {

    //     console.log(">>Check err:", error)
    // }
    await db.User.update(
        { email: email, username: username },
        { where: { id: userId } });

}

module.exports = {
    createNewUser, getUserList, deleteUser, getUserById, updateUserInfor
}