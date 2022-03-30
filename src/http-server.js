const express = require("express");
const expressHbs = require("express-handlebars");
const appRouter = require("./router");

const app = express();
const hbs = expressHbs.create({
    defaultLayout: "main",
    extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(appRouter);

module.exports = app;
