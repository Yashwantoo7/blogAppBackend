require('dotenv').config()

const express=require('express')
const cors=require('cors')

const db=require('./db')

const addBlog=require('./Controllers/addBlog');
const signUp=require('./Controllers/signUp');
const login = require('./Controllers/login');
const getBlog=require('./Controllers/getBlog');
const getinfo=require('./Controllers/getinfo');
const rating=require('./Controllers/rating');

const http=require('http')

const app=express()

const server=http.createServer(app);

const io=require('socket.io')(server,{
    cors: {
        origin: '*',
      }
})

app.use(express.json())
app.use(cors())

app.post('/signup',(req,res)=>{signUp.handleSignUp(req,res,db)});
app.post('/login',(req,res)=>{login.handleLogin(req,res,db)});
app.post('/:id/addblog',(req,res)=>{addBlog.handleAddBlog(req,res,db)});
app.post('/:id/getblogs',(req,res)=>{getBlog.handleGetBlog(req,res,db)});
app.post('/:id/getinfo',(req,res)=>{getinfo.handleInfo(req,res,db)});
app.post('/:id/rating',(req,res)=>{rating.handleRating(req,res,db)});

const port=process.env.PORT||8001


server.listen(port,()=>{
    console.log(`listening at http://localhost:${port}`)
})
 
// server.use(cors())
// const io =socketIo(server);

io.on('connection',(socket)=>{
    console.log('new client connected');
    socket.on('blog_added',data=>{
        console.log("new blog",data)
        socket.broadcast.emit('update_blogs',{data:data})
    })
    socket.on('blog_rated',data=>{
        console.log("rated BLOG",data)
        socket.broadcast.emit('update_blogs',{data:data})
    })
})
