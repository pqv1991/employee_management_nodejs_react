import express, { application } from "express";
import homeController from '../controller/homeController'
import apiController from '../controller/apiController'
const router = express.Router();
/**
 * 
 * @param {*} app : express app 
 */
const initWebRoutes = (app) => {
    // path, handle
    router.get("/", homeController.handleHelloWorld);
    router.get("/user", homeController.handleUserPage);
    router.post("/users/create-user", homeController.handleCreateNewUser);
    router.post("/delete-user/:id", homeController.hanleDeleteUser);
    router.get("/update-user/:id", homeController.getUpdateUserPage);
    router.post("/user/update-user/", homeController.handleUpdateUser);

    //rest api GET,POST,PUT, DELELE

    router.get("/api/test-api", apiController.testApi);
    return app.use("/", router);
}

export default initWebRoutes;