const express = require('express');
const getReposByUsername = require('../helpers/github').getReposByUsername;
const save = require('../database/index').save;
const bp = require('body-parser')
const MongoClient= require('mongodb').MongoClient;

let app = express();
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  console.log('start post');
  const {username} = req.body;
  console.log('req.body post: ', username);

  return getReposByUsername(username)
    .then(res => {
      return save(res.data);
    })
    .then(() => {
      res.status(200).json('New repos Added!');
    })
    .catch(err => {
      console.log('add err: ', err);
    });

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  MongoClient.connect('mongodb://localhost/fetcher', { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
    if (err) throw err;
    const database = db.db('fetcher');
    const repos = database.collection('repos');
    const cursor = repos.find({}).sort( {forks_count: -1}).limit(25);
    var reposArr = [];
    return cursor.forEach(repo => {
      reposArr.push(repo);
    })
    .then(() => {
      console.log(reposArr.length);
      res.status(200).send(JSON.stringify(reposArr));
    })


  });

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

