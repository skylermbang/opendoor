const express = require("express");
const Posts = require("../schemas/posts");
const router = express.Router();
const Date = require("../date");

router.get("/list", async (req, res, next) => {
  try {
    const { date } = req.query;
    const posts = await Posts.find({ date }).sort("-date");
    res.json({ posts: posts }); // array format?
    //res.send(coins);
  } catch (err) {
    console.error(err);

    next(err);
  }
});

router.get("/:postId", async (req, res) => {
  const { postId } = req.params;
  posts = await Posts.findOne({ postId: postId });
  res.json({ detail: posts });
});

router.post("/list", async (req, res) => {
  console.log("trying now ");

  const posts = await Posts.find();
  console.log(posts);
  const postId = posts.length + 1;
  const { title, author, contents, pw } = req.body;

  const date = Date();
  isExist = await Posts.find({ postId });
  if (isExist.length == 0) {
    await Posts.create({ postId, title, author, contents, date, pw });
  }
  res.send({ result: "success" });
});

router.delete("/:postId", async (req, res) => {
  const { postId } = req.params;
  const isExist = await Posts.find({ postId });
  console.log(isExist);

  if (isExist.length > 0) {
    await Posts.deleteOne({ postId });
  }
  res.send({ result: "success" });
});

router.patch("/:postId", async (req, res) => {
  const { postId } = req.params;
  const { title, author, contents, pw } = req.body;

  const date = Date();

  isPost = await Posts.find({ postId });

  if (isPost.length) {
    await Posts.updateOne({ postId }, { $set: { title } });
    await Posts.updateOne({ postId }, { $set: { author } });
    await Posts.updateOne({ postId }, { $set: { contents } });
    await Posts.updateOne({ postId }, { $set: { pw } });
    await Posts.updateOne({ postId }, { $set: { date } });
  }

  res.send({ result: "success" });
});

module.exports = router;
