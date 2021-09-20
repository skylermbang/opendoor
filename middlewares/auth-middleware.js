const jwt = require("jsonwebtoken");
const User = require("../schemas/user");

module.exports = (req, res, next) => {
  //console.log("this is test for the middleware");

  const { authorization } = req.headers;
  //console.log(authorization);
  const [tokenType, tokenValue] = authorization.split(" ");

  // console.log(tokenValue, "from middleware token value ");
  // console.log(tokenType, "from middleware token type ");
  if (tokenType !== "Bearer") {
    res.status(401).send({
      errorMessage: "Login pelase ",
    });
    return;
  }

  try {
    /* jwt보낸거로가져와 */
    const { user } = jwt.verify(tokenValue, "walaby");
    //console.log(user, "look at me now bitch");
    User.findOne({ id: user }) // id 에서 user차저
      .exec()
      .then((user) => {
        res.locals.user = user;
        //console.log(user, "aaabamlkdsmfalkf mlook at me now bitch");
        next();
      });
  } catch (error) {
    res.status(401).send({
      errorMessage: "Login pelase ",
    });
    return;
  }
};
