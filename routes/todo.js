const {Router} = require('express')
const config = require('config')
const router = Router()
const Todo = require('../models/Todo')
const auth = require('../middleware/auth.middleware')
router.post('/create', auth,
    async (req, res) => {
        try {
            let {text, owner} = req.body
            const date = new Date()
            const todo = new Todo({date,owner, text, isCompleted: false})

            const saved = await todo.save();
            res.status(201).json({todo: saved, message: 'Todo created'})
        } catch (e) {
            console.log(e)
            res.status(500).json({message: e.message})
        }
    })
router.put(
    '/update/:id', auth,
    async (req, res) => {
        try {
            const {isCompleted} = req.body
            try {
                const todo = await Todo.findByIdAndUpdate(
                    req.params.id,
                    {$set: {isCompleted: isCompleted}})
                const todos = await Todo.find({owner: req.user.userId})
                return res.status(201).json({
                    todos,
                    message: "Todo updated"
                })
            }
            catch (e){
                console.log(e)
            }

            if (!todo) {
                return res.status(400).json({message: 'Todo is not found'})
            }
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Something goes wrong'})
        }
    }
)
router.delete(
    '/delete/:id', auth,
    async (req, res) => {
        try {
            const todo = await Todo.findByIdAndRemove(req.params.id)
            if (!todo) {
                return res.status(400).json({message: 'Todo is not found'})
            }
            const todos = await Todo.find({owner: req.user.userId})
            return res.status(200).json({todos, message: "Todo deleted"})
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Something goes wrong'})
        }
    }
)
router.get(
    '/', auth,
    async (req, res) => {
        try {

            const todo = await Todo.find({owner: req.user.userId})

            // if (!todo) {
            //     return res.status(400).json({message: 'You have no tasks yet'})
            // }
            res.json(todo)
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Something goes wrong'})
        }
    }
)

module.exports = router