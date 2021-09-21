const express = require("express");
const app = express();
const port = 8080;
const axios = require("axios").default;
const authMiddleware = require("./middlewares/auth-middleware");
require('dotenv').config();


// this is middleware for processing the data
app.use(express.urlencoded({ extended: false })); // request.body ?  to get
app.use(express.json());
// middelware :  static file
app.use(express.static("public"));


//ejs
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");





app.get("/", (req, res) => {

  res.render("index")
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
