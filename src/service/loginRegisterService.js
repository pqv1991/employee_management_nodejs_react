import db from '../models/index';
import bcrypt from 'bcrypt';
import { Op } from 'sequelize';
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    const hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const checkEmailExist = async (email) => {
    let user = await db.User.findOne({
        where: { email: email }
    })
    if (user) {
        return true;
    }
    return false;

}
const checkPhoneExist = async (phone) => {
    let user = await db.User.findOne({
        where: { phone: phone }
    })
    if (user) {
        return true;
    }
    return false;
}



const registerNewUser = async (rawUserData) => {
    try {
        //check email/ phonenumber are exist
        let isEmailExist = await checkEmailExist(rawUserData.email);
        if (isEmailExist === true) {
            return {
                EM: "The email is alresdy exist",
                EC: 1
            }
        }
        let isPhoneExist = await checkPhoneExist(rawUserData.phone);
        if (isPhoneExist === true) {
            return {
                EM: "The phone number is alresdy exist",
                EC: 1
            }
        }

        //hash user password
        let hashPassword = hashUserPassword(rawUserData.password)
        // create new user
        await db.User.create({
            email: rawUserData.email,
            username: rawUserData.username,
            password: hashPassword,
            phone: rawUserData.phone
        })

        return {
            EM: "A user is created successfully",
            EC: 0
        }
    } catch (e) {
        console.log(e);
        return {
            EM: "Somthing from is service ....",
            EC: -2
        }
    }

}
const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword); // true or false
}

const loginUser = async (rawUserData) => {
    try {
        //check email/ phonenumber are exist
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: rawUserData.valueLogin },
                    { phone: rawUserData.valueLogin }
                ]
            }
        });
        if (user) {
            let isCorrectPassword = checkPassword(rawUserData.password, user.password);
            if (isCorrectPassword === true) {
                return {
                    EM: "Ok!",
                    EC: 0,
                    DT: ''
                }
            }
        }
        console.log(">>Input user with email/phone number", rawUserData.valueLogin, " password", rawUserData.password)
        return {
            EM: "Your email/phone number password is correct",
            EC: 1,
            DT: ''
        }


    } catch (error) {
        console.log(error);
        return {
            EM: "Somthing from is service ....",
            EC: -2
        }
    }

}
module.exports = {
    registerNewUser, loginUser
}