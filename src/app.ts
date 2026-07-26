import express from "express";
import { dirname } from "path";
import 'dotenv/config';
import webRouter from "./routes/web";
import initDatabase from "config/seed";



const app = express();
const PORT = process.env.PORT || 8080;
// config view engine
app.set("view engine", "ejs");
app.set("views", __dirname + '/views');

// config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// config static files: images, css, javascript,...
app.use(express.static('public'));

// config routes
webRouter(app);

//seeding data
initDatabase();

app.listen(PORT, () => {
    console.log(`My app is running on http://localhost:${PORT}`);

});