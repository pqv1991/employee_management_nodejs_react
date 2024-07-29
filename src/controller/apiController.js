import loginRegisterService from '../service/loginRegisterService'

const testApi = (req, res) => {
    return res.status(200).json({
        message: "ok",
        data: "Test api"
    })
}

const handleRegister = async (req, res) => {
    try {
        //req.body : email, phone, username, password
        if (!req.body.email || !req.body.phone || !req.body.password) {
            return res.status(200).json({
                EM: 'Missing required parameters', // error message
                EC: '1', //error code
                DT: '',// data
            })
        }
        if (req.body.password && req.body.password.length < 8) {
            return res.status(200).json({
                EM: 'Your password must have more than 8 letter', // error message
                EC: '1', //error code
                DT: '',// data
            })
        }
        //service : create user
        let data = await loginRegisterService.registerNewUser(req.body);

        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, //error code
            DT: '',// data
        })

    } catch (e) {
        return res.status(500).json({
            EM: 'error', // error message
            EC: '-1', //error code
            DT: '',// data
        })
    }
    console.log("Call me", req.body)
}

const handleLogin = async (req, res) => {
    try {

        let data = await loginRegisterService.loginUser(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error', // error message
            EC: '-1', //error code
            DT: '',// data
        })
    }


}
module.exports = {
    testApi, handleRegister, handleLogin
}