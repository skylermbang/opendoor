const express = require("express")
const router = express.Router()
const Todo = require("../schemas/todos")
const authMiddleware = require("../middlewares/auth-middleware")


router.get('/', async (req, res) => {
    console.log(" Show  todo list")

    try {
        const list = await Todo.find({})

        if (list) {
            res.status(200).json(list)
        }
        else {
            res.status(401).send("Wrong access")
        }
        // mapping to new item name   (ex userId , user_id)

    } catch (error) {
        res.status(401).send(error.message)
    }

});

router.post('/', authMiddleware, async (req, res) => {
    console.log(" Writing new todo")

    const { newContent } = req.body
    const user_id = res.locals.user.user_id
    try {

        const newTodo = await Todo.create({ userId: user_id, content: newContent })
        const search = await Todo.findOne({ content: newContent })
        res.status(200).json({ id: newTodo.id })
    } catch (error) {
        res.status(401).send(error.message)
    }

});

router.put("/:todoId", authMiddleware, async (req, res) => {
    console.log(" Updating todo ")
    const { todoId } = req.params
    const { newContent } = req.body
    const user_id = res.locals.user.user_id



    try {
        console.log(todoId)
        const isExist = await Todo.findOne({ id: todoId })
        console.log(isExist)
        if (isExist.userId === user_id) {

            //await Todo.findOneAndUpdate({ id: todoId, content: newContent })
            const filter = { id: todoId };
            const update = { content: newContent };
            let newTodo = await Todo.findOneAndUpdate(filter, update);
            res.status(200).json({ isUpdated: true })
        }

        else {

            res.status(401).send("Wrong access")
        }
    } catch (error) {
        res.status(401).send(error.message)
    }
})



router.delete('/:todoId', authMiddleware, async function (req, res) {
    console.log("deleting todo")
    const { todoId } = req.params
    const user_id = res.locals.user.user_id
    const isExist = await Todo.findOne({ id: todoId })
    if (isExist.userId === user_id) {
        await Todo.deleteOne({ id: todoId })
        res.status(200).json({ isUpdated: true })
    }
    else {
        res.status(401).json({ isUpdated: false })
    }

});


router.put('/:todoId/check', authMiddleware, async function (req, res) {
    const todoId = req.params.todoId;
    const user_id = res.locals.user.user_id;
    let todoItem, check;

    if (!user_id) {
        throw new Error(ERROR.INVALID_AUTH);
    }

    todoItem = await Todo.findOne({ id: todoId })

    if(!todoItem){
        throw new Error(ERROR.NO_EXISTS_DATA);
    }

    try {

        if(todoItem.checked == true) { 
            check = false
        }else{
            check = true
        }

        await Todo.updateOne({ id : todoId }, { $set : { checked : check }});

        todoItem = await Todo.findOne({ id: todoId })
        
        res.json({ msg: 'success', data: todoItem });
    } catch (err) {
        console.log(err);
        res.json({ msg: 'fail' });
    }
});

module.exports = router