const express = require("express");
const User = require("../schemas/user");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const authMiddleware = require("../middlewares/auth-middleware");

const userPostSchema = Joi.object({
  id: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  password: Joi.string().min(4),
  confirmPassword: Joi.ref("password"),
});

router.post("/register", async (req, res) => {
  try {
    const { id, password, confirmPassword } =
      await userPostSchema.validateAsync(req.body);
    console.log("after validation", id, password);
    const existId = await User.findOne({ id: id }).exec();
    if (existId) {
      res.status(400).send({
        errorMeasage: " Your ID is not available",
      });
      return;
    }

    const user = new User({ id, password });
    await user.save();
    res.status(201).send({});
  } catch (err) {
    const msg = err.details[0].message;
    console.log(msg);
    res.status(400).send({
      errorMessage: msg,
    });
  }
});

router.post("/auth", async (req, res) => {
  const { id, password } = req.body;

  const user = await User.findOne({ id, password });
  if (!user) {
    res.status(401).send({
      errorMeasage: "Wong Id or Password",
    });
    return;
  }

  const token = jwt.sign({ user: user.id }, "walaby");
  //console.log(token, "test from auth api");
  res.send({
    token,
  });
});

router.get("/me", authMiddleware, async (req, res) => {
  const { user } = res.locals;
  res.send({
    user: {
      id: user.id,
    },
  });
});

module.exports = router;
