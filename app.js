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


app.use((req, res, next) => {
  //console.log(req);
  next();
});




app.get("/", (req, res, next) => {

  res.render("index", { token: process.env.TOKEN })
});

app.get("/list/:continentcode", async (req, res) => {

  const { continentcode } = req.params

  var options = {
    method: 'GET',
    url: 'https://geo-services-by-mvpc-com.p.rapidapi.com/continents',
    params: { language: 'en', continentcode: continentcode },
    headers: {
      'x-rapidapi-host': process.env.RAPIDAPI_HOST,
      'x-rapidapi-key': process.env.RAPIDAPI_KEY
    }
  };
  axios.request(options).then(function (response) {
    console.log(response.data)
    res.send(response.data)
  }).catch(function (error) {
    console.error(error);
  });


});




app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
