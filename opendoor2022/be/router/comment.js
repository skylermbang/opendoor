const express = require('express');
const router = express.Router();
const sanitize = require('sanitize-html');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const ERROR = require('../data/error')
const authMiddleware = require("../middlewares/auth-middleware")
require('moment-timezone');
require('dotenv').config();

const User = require('../schemas/users')
const Todo = require("../schemas/todos")
const Comment = require("../schemas/comment")

// 댓글 리스트
router.get('/:postId', async (req, res) => {
    const postId = req.params.postId;
    let data = {}, userId, commentsItems;
    let postItem;

    try {
        postItem = await Todo.findOne({ _id: postId })

        if (!postItem) {
            throw new Error(ERROR.NO_EXISTS_DATA)
        }

        commentsItems = await Comment.find({ comment_target_id: postId })
            .sort('createdAt')
            .lean()

        if (!commentsItems) {
            throw new Error(ERROR.NO_EXISTS_DATA);
        }

        data = {
            items: commentsItems,
            total: commentsItems.length
        }

        res.json({ msg: 'success', data })

    } catch (err) {
        console.log('err', err)
        res.json({ msg: 'fail' })
    }
});

// 댓글 입력
router.post('/:postId', authMiddleware, async (req, res) => {
    const postId = req.params.postId;
    const user_id = res.locals.user.user_id;

    if (!user_id) {
        throw new Error(ERROR.INVALID_AUTH);
    }

    console.log('postId', postId);

    try {

        let data = {
            comment_target_id: postId,
            comment_content: req.body.commentContents,
            user_id: user_id,
        };

        console.log('test===')

        let result = await Comment.create(data);
        console.log('result===', result);

        res.json({ msg: 'success', result: result });
    } catch (err) {
        console.log(err);
        res.json({ msg: 'fail' });
    }
});

// 댓글 삭제
router.delete('/:commentId', authMiddleware, async (req, res) => {
    const uid = req.params.commentId;
    const user_id = res.locals.user.user_id;



    if (!user_id) {
        throw new Error(ERROR.INVALID_AUTH);
    }

    console.log('1==')

    try {
        let commentItem = await Comment.findOne({ _id: uid, userId: user_id });

        if (!commentItem) {
            throw new Error(ERROR.NO_EXISTS_DATA)
        }

        const { deletedCount } = await Comment.deleteOne({ _id: commentItem._id, userId: user_id });
        if (!deletedCount) {
            throw new Error(ERROR.FAILURE_DATA)
        }

        res.json({ msg: 'success' });
    } catch (err) {
        console.log('err', err);
        res.json({ msg: 'fail' })
    }

});

module.exports = router;