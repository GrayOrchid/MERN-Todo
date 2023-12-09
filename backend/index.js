import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { registerValidation, postCreateValidation } from './validations.js'
import checkAuth from './utils/checkAuth.js'
import * as UserControllers from './controllers/UserController.js'
import * as TaskController from './controllers/TaskController.js'
import * as SubTaskController from './controllers/SubTaskController.js'
import * as CommentsController from './controllers/CommentsController.js'
import * as RoomController from './controllers/RoomController.js'
import * as DragTaskController from './controllers/DragTaskController.js'
mongoose
    .connect('mongodb+srv://moonb7213:HNPQC68WSdRjqaFE@cluster0.lfphce4.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err))

const app = express()

app.use(express.json())

app.use(cors())


app.get('/', (req, res) => {
    res.send('work')
})

app.post('/auth/login', UserControllers.login);
app.post('/auth/register', registerValidation, UserControllers.register)
app.get('/auth/me', checkAuth, UserControllers.getMe);

app.post('/tasks', postCreateValidation, TaskController.create)
app.get('/tasks', TaskController.getAll)
app.get('/tasks/:id', TaskController.getOne)
app.delete('/tasks/:id', TaskController.remove)
app.patch('/tasks/:id', TaskController.update)

app.post('/comments', CommentsController.create)
app.get('/comments', CommentsController.getAll)
app.delete('/comments/:id', CommentsController.remove)
app.patch('/comments/:id', CommentsController.update)

app.post('/subtask', SubTaskController.create)
app.delete('/subtask/:id', SubTaskController.remove)
app.patch('/subtask/:id', SubTaskController.update)

app.post('/room', RoomController.create)
app.get('/room/:name', RoomController.getRoom);
app.get('/room/:name/tasks/:tag?', RoomController.getRoomTasksByTag)

app.post('/dragtask', DragTaskController.dragTask)

app.listen(4444, (err) => {
    if (err) {
        console.log(err);
    }
    return console.log('O111K');
})