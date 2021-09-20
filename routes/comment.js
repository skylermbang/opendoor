const express = require("express");
const Posts = require("../schemas/posts");
const Comments = require("../schemas/comment");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");

router.get("/list/:postId", async (req, res) => {
  const postNo = req.params.postId;
  console.log(postNo, "wtf");
  const comments = await Comments.find({ postNo }).sort("-commentId");

  res.send({ comments: comments });
});

router.get("/list/", async (req, res, next) => {
  try {
    //const { commentId } = req.query;
    const { postId } = req.params;
    console.log(postId, "wtf");
    const comments = await Comments.find({ postId }).sort("-commentId");
    res.json({ comments: comments }); // array format?
  } catch (err) {
    console.error(err);

    next(err);
  }
});

router.post("/list/:id", authMiddleware, async (req, res) => {
  //const postId = req.params;
  const postNo = req.params.id;
  // const {id} = req.params  -->
  const comment = await Comments.find();
  const commentId = comment.length + 1;

  const { contents } = req.body;
  const { user } = res.locals;
  const commentAuthor = user.id;

  //const commentAuthor = "scarlett ";
  //   isExist = await Comments.find({ commentId });

  await Comments.create({ postNo, commentId, contents, commentAuthor });

  res.send({ result: "success" });
});

router.delete("/delete/:commentId", authMiddleware, async (req, res) => {
  const { user } = res.locals;
  const commentAuthor = user.id;
  const { commentId } = req.params;
  console.log(commentId);
  //const commentAuthor = "scarlett ";

  try {
    const isExist = await Comments.find({ commentId, commentAuthor });
    if (isExist) {
      await Comments.deleteOne({ commentId });
      res.send({ result: "success" });
    }
  } catch (error) {
    res.send({
      errorMessage: "You are not allowed to delete this comment",
    });
  }
});

router.patch("/edit/:commentId", authMiddleware, async (req, res) => {
  const { commentId } = req.params;
  const { user } = res.locals;

  const commentAuthor = user.id;

  const isExist = await Comments.find({ commentId, commentAuthor });

  const { contents } = req.body;
  const query = { commentId, commentAuthor };
  console.log(commentAuthor, commentId, contents);
  if (isExist) {
    //await Comments.findOneAndUpdate(query, { contents });
    await Comments.updateOne(
      { commentId, commentAuthor },
      { $set: { contents } }
    );
    res.send({ result: "success" });
    return;
  }
  res.send({ errorMessage: "You cant change this comment " });
});

router.get("/getcommentid");

module.exports = router;
