import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
require("dotenv").config();
import bodyParser from 'body-parser';


const PORT = process.env.PORT || 8080;
const app = express();
// config view engine
configViewEngine(app);
//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// // init web routes
initWebRoutes(app);


app.listen(PORT, () => {
    console.log(">>> JWT Backend is running on the port = " + PORT);
})