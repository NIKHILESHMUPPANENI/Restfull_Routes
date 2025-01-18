const express = require('express');
const app = express();
const path = require('path');
const methodoverride = require('method-override')
//const {read} = require('fs');
// for parsing application
app.use(express.urlencoded({extended : true}))
app.use(express.json())
// app.use(methodOverride('_method'))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

let comments =[
    {
        id: 1,
        username: 'Nik',
        comment: 'lol that is so funny!'
    },

    {
        id: 2,
        username: 'Svensson',
        comment: 'i like to go out'
    },

    {
        id: 3,
        username: "Krista",
        comment: "THE most hilarious thing ever",
    },

    {
        id: 4,
        username: 'Eric Thakur',
        comment: 'delete your account, Nik'
    }

]

// render all my fake comments

app.get('/comments',(req, res) => {
    res.render('comments/index',{comments})
})

app.get('/comments/new',(req, res) => {
    res.render('comments/new');
})

app.post('/comments', (req,res)=> {
    const {username, comment} = req.body;
    comments.push({username, comment })
   // res.send("IT Worked")
    res.redirect('/comments');
})

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    
    const comment = comments.find(c => c.id === parseInt(id));
    res.render('comments/show', { comment: comment });
})

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find((c) => c.id === parseInt(id));
    res.render('comments/edit', { comment });
})

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params; 
    const newCommentText = req.body.comment;   
    const comment = comments.find(c => c.id === parseInt(id));
    foundComment.comment = newCommentText;
    res.redirect('/comments');

    
})


app.get('/rest', (req,res)=> {
    res.send("GET /rest response")
})

app.post('/rest', (req,res)=> {
    const {meat, qty}= req.body;
  //  res.send("POST /rest response")
    res.send(`ok,here are your ${qty} ${meat} bagel`)
})

app.listen(3000,()=> {
    console.log("on port 3000!")
})

// planning Rest-Routing in nodejs
// REST Pattern   (using cooments as resource)
// index route      GET /comments/ - list all comments
// create route     POST /comments/ - create a new comment
// show route       GET /comments/:id - get one comment using the id.
// update route     PATCH /comments/:id - update the content of the id comment.
// destroy route    DELETE /comments/:id - destroy the comment of id.