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
module.exports = {
    handleHelloWorld,
    handleUserPage,
    handleCreateNewUser,
    hanleDeleteUser
}