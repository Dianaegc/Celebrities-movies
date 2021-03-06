// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model")
// all your routes here




router.get("/create",(req,res, next)=>{
    res.render("celebrities/new-celebrity")
})
router.post("/create",(req,res,next)=>{
    const {name,occupation,catchPhrase}=req.body
    Celebrity.create({name,occupation,catchPhrase})
    .then(() => {
        res.redirect('/celebrities')
    })
    .catch((err)=>{res.render("celebrities/new-celebrity")})
})

router.get("/",(req,res,next)=>{
    Celebrity.find({}).then((dbCelebrity)=>{
        res.render('celebrities/celebrities',{celebrityList:dbCelebrity})
    })
    .catch((err)=>{res.send(err)})
})
module.exports = router;