const express =require('express');
const jwt =require('jsonwebtoken');

const app=express();

app.get('/api',(req,res)=>{
    res.json({
        message:"welcome to API service"
    })
    
});

app.post('/api/posts',verifyToken,(req,res)=>{
    jwt.verify(req.token,"secretkey",(err,authData)=>{
        if(err){
            res.sendStatus(403);   //unauthorized error
        }
        else{
             res.json({
                message:"posts created...",
                authData 
                // this is the authData we get as reponse in postman
                // "authData": {
                //     "user": {
                //         "id": 1,
                //         "username": "john",
                //         "email": "john@gmail.com"
                //     },
                //     "iat": 1633414850
                // }

            }) //when token is given in the header of this api/posts, we get all messages and data

        }
    })
   
})

// acts like  a middleware
function verifyToken(req,res,next){
    const bearerHeader=req.headers['authorization'] //write authorization under header of postman
    if(typeof bearerHeader!=='undefined'){
        const bearerToken=bearerHeader.split(' ')[1] 
         //under value-give 'Bearer eyJhbGciOiJIUzI1NiIsInR5
        // cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6ImpvaG4iLCJlbWFpbCI6ImpvaG5AZ21haWw
        // uY29tIn0sImlhdCI6MTYzMzQxNDg1MH0.hfJb0VYecp0I-V-CHfhHsQsj5DXg5A4EcYDjtSRhCw4'

        req.token=bearerToken
        next()
    }
    else{
        res.sendStatus(401)
    }
}
app.post('/api/login',(req,res)=>{
    const user={
        id:1,
        username:"john",
        email:"john@gmail.com",
    }
    jwt.sign({user:user},'secretkey',(err,token)=>{
      res.json({
          token,
      })
    })
});

// the response from postman should be token after sign with this user


app.listen(3000,(req,res)=>{
    console.log("server started on port 3000")
});

// this project is all about creating auth without connecting to DB
