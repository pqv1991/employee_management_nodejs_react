import userServive from '../service/userService';




const handleHelloWorld = (req, res) => {
    return res.render("home.ejs");
}

const handleUserPage = async (req, res) => {
    let userList = await userServive.getUserList();
    return res.render("user.ejs", { userList });
}

const handleCreateNewUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;
    userServive.createNewUser(email, password, username);

    return res.redirect("/user")
}

const hanleDeleteUser = async (req, res) => {

    await userServive.deleteUser(req.params.id);
    return res.redirect("/user")
}

const getUpdateUserPage = async (req, res) => {
    let id = req.params.id;
    let user = await userServive.getUserById(id);
    let userData = {};
    userData = user;
    // if (user && user.length > 0) {
    //     userData = user[0];
    // }
    console.log(">> User :", user);
    return res.render("user-update.ejs", { userData });
}

const handleUpdateUser = async (req, res) => {
    let email = req.body.email;
    let username = req.body.username;
    let id = req.body.id;
    await userServive.updateUserInfor(email, username, id);
    return res.redirect("/user")
}
module.exports = {
    handleHelloWorld,
    handleUserPage,
    handleCreateNewUser,
    hanleDeleteUser, getUpdateUserPage,
    handleUpdateUser
}