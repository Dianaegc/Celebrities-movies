// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model")
const Movie = require("../models/Movie.model")

// all your routes here

router.get("/create",(req,res, next)=>{
        Celebrity.find({}).then((dbCelebrity)=>{
        console.log(dbCelebrity)
        res.render("movies/new-movie",{celebrityList:dbCelebrity})
        
    })
    .catch((err)=>{
        console.log('error',err)
    })
  
    
})

router.post("/create",(req,res,next)=>{
   console.log(req.body)
    const {title,genre,plot,cast}=req.body
    Movie.create({title,genre,plot,cast})
    .then((newMovie) => {
        res.redirect("/movies")
    })
    .catch(res.render("movies/new-movie"))
})

router.get("/",(req,res,next)=>{
Movie.find({}).then((dbMovies)=>{
        console.log(dbMovies)
        res.render("movies/movies",{moviesList:dbMovies})
        
    })
    .catch((err)=>{
        console.log('error',err)
    })
})
router.get("/:id",(req,res,next)=>{
    const movieId =req.params.id
    console.log(movieId)
    Movie.findById(movieId)
    .populate("cast")
    .then((movie)=>{
console.log(movie)
        res.render("movies/movie-details",{movie})
    })
    .catch((err)=>{
        console.log(error)
    })
})
//Delete movies
router.post("/:id/delete",(req,res,next)=>{
    const movieId=req.params.id
    Movie.findByIdAndRemove(movieId)
    .then((movieremoved)=>{
        res.redirect("/movies")
    })
    .catch((err)=>{
        console.log('err',err)
    })
})
//Edite movies



module.exports = router;
