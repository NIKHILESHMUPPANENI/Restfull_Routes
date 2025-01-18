const express = require('express');
const app = express();
// for parsing application
app.use(express.urlencoded({extended : true}))
app.use(express.json())

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