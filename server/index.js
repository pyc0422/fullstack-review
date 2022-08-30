const express = require('express');
const getReposByUsername = require('../helpers/github').getReposByUsername;
const save = require('../database/index').save;
const bp = require('body-parser')
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
      console.log('New repos added!');
      res.status(200).json('Order Added!');
    })
    .catch(err => {
      console.log('add err: ', err);
    });

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

