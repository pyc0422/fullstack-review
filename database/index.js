const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  name: String,
  repoId: {type: Number, unique: true},
  url: String,
  description: String,
  forks_count: Number,
  username: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  var obj = {
    name: data.name,
    repoId: data.id,
    url:data.url,
    description: data.description,
    forks_count: data.forks_count,
    username: data.owner.login
  }

  const newRepo = new Repo(obj);
  await newRepo.save();


}

module.exports.save = save;