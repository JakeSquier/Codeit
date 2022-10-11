const express = require('express')
const connectDB = require('./config/db')
const dotenv = require('dotenv').config()
let cors = require("cors");
const { errorHandler } = require('./middleware/errorMiddleware')

const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
}))

//the two lines below give us access to request bodies in postman
app.use(express.json())
app.use(express.urlencoded({extended: true }))

//adding routes below
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/projects', require('./routes/projectRoutes'))
app.use('/api/comments', require('./routes/commentRoutes'))
app.use('/api/likes', require('./routes/likeRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log('server started on port: ' + port))