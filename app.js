const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/api", {
    useNewUrlParser: true
});
const articleSchema = {
    title: String,
    desc: String
};
const Article = mongoose.model("items", articleSchema);

app.get("/articles", function(req,res){
    Article.find()
        .then((found)=>{
            res.send(found);
        })
        .catch((err)=>{
            console.log(err);
        });
});

app.post("/articles", function(req,res){
    const element1 = new Article({
        title : req.body.title,
        desc : req.body.desc
    });
    element1.save();
});

app.delete("/articles", function(req, res){
    Article.deleteMany()
        .then(()=>{
            res.send("Deleted!");
        })
        .catch(()=>{
            res.send(err);
        });
});

app.get("/articles/:articlesTitle", function(req,res){
    Article.findOne({title: req.params.articlesTitle})
        .then((articlefound)=>{
            res.send(articlefound);
        })
        .catch((err)=>{
            console.log(err);
        });
});

app.put("/articles/:articlesTitle", function(req, res){
    Article.updateOne({title: req.params.articlesTitle},{title: req.body.title, desc: req.body.desc}, {overwrite: true})
        .then(()=>{
            res.send("Updated");
        })
        .catch((err)=>{
            console.log(err);
        });
});

app.patch("/articles/:articlesTitle", function(req,res){
    Article.updateOne({title: req.params.articlesTitle}, {$set: {desc: req.body.desc}})
        .then(()=>{
            res.send("Success");
        })
        .catch((err)=>{
            console.log(err);
        });
});

app.delete("/articles/:articlesTitle", function(req, res){
    Article.deleteOne({title: req.params.articlesTitle})
        .then(()=>{
            res.send("Deleted this record.")
        })
        .catch((err)=>{
            console.log(err);
        });
});

app.listen(4000, function(){
    console.log("Server Started");
});



