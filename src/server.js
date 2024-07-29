import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
require("dotenv").config();
import bodyParser from 'body-parser';
import initApiRoutes from "./routes/api";
import configCors from "./config/cors";
//import connection from "./config/connectDB";


const PORT = process.env.PORT || 8080;
const app = express();
//Config Cors
configCors(app);
// config view engine
configViewEngine(app);
//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//test connecttion
//connection();
// // init web routes
initWebRoutes(app);
initApiRoutes(app);

app.listen(PORT, () => {
    console.log(">>> JWT Backend is running on the port = " + PORT);
})