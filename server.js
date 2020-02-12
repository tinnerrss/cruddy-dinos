const express = require('express');
const layouts = require('express-ejs-layouts');

const app = express();
app.set("view engine", "ejs");
app.use(layouts);

//routes
app.get("/", (req, res) => {
    res.render("home");
});

//import controllers
app.use("/dinos", require("./routes/dinos"));

app.listen(3000, () => console.log("You're live!"));

