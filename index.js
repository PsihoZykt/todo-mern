const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const authRouter = require('./routes/auth')
const todoRouter = require('./routes/todo')
const bodyParser = require('body-parser')
const PORT = config.get('port')
const MONGO_URL = config.get('mongo_url')
const app = express()
const path = require('path')
app.use(express.json()) // Без этих  строк сервер не видит req.body

app.use('/api/auth', authRouter)
app.use('/api/todo', todoRouter)
if(process.env.NODE_ENV === "production")  {
    app.use('/', express.static(path.join(__dirname, 'client', 'build' )))
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}
async function start() {
    try {
        await mongoose.connect(MONGO_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
            }, () => console.log('DB has been connected')
        )
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}`))
            .on("error", (err) => console.log(err))
    } catch (e) {
     console.log(e)
    }
}

start()
