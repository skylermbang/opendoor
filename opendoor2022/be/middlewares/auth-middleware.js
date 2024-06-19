const jwt = require("jsonwebtoken");
const User = require("../schemas/users");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const [tokenType, tokenValue] = authorization.split(" ");
  if (tokenType !== "Bearer") {
    res.status(401).send({
      errorMessage: "Login please ",
    });
    return;
  }
  console.log("checking line 13")

  try {
    /* jwt보낸거로가져와 */
    const { userId } = jwt.verify(tokenValue, process.env.SECRET_KEY);
    console.log(userId)
    User.findOne({ userId }) // id 에서 user차저
      .exec()
      .then((user) => {
        res.locals.user = user;
        //console.log(user, "aaabamlkdsmfalkf mlook at me now bitch");
        next();
      });
  } catch (error) {
    res.status(401).send({
      errorMessage: "Login please ",
    });
    return;
  }
};
