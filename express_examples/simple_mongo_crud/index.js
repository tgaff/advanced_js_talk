var express = require("express"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  bcrypt = require('bcrypt'),
  app = express();
  

app.use(bodyParser.urlencoded({extended: true }));

mongoose.connect("mongodb://localhost/article_app");


var userSchema = new mongoose.Schema({
  email: String,
  passwordDigest: String
});

userSchema.statics.createSecure = function (params, cb) {
  var that = this;
  bcrypt.genSalt(function (err, salt) {
    bcrypt.hash(params.password, salt, function (err, hash) {
      console.log(hash);
      that.create({
        email: params.email,
        passwordDigest: hash
       }, cb)
    });
  })
};

var articleSchema = new mongoose.Schema({
  title: String,
  description: String,
  user_id: mongoose.Schema.Types.ObjectId
});

var User = mongoose.model("User", userSchema);
var Article = mongoose.model("Article", articleSchema);



app.post("/users", function (req, res) {
  var userParams = req.body.user;
  User.createSecure(userParams, function (err, user) {
    res.send(user);
  });
});

app.get("/users/:id", function (req, res) {
  var user = User.find({ _id: req.params.id }, function (err, user) {
    res.send(user);
  });
});

app.post("/users/:id/articles", function (req, res) {
  var articleParams = req.body.article;
  articleParams.user_id = req.params.id;
  var article = new Article(articleParams);
  article.save();
  res.send(article);
});

app.get("/users/:id/articles", function (req, res) {
  var articles = Article.find({
  }).where({user_id: req.params.id}).
  exec(function (err, articles) {
    res.send(articles);
  })
});

app.get("/articles", function (req, res) {
  Article.find({}, function (err, articles) {
    res.send(articles);
  });
});

app.listen(3000);



