const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', { useNewUrlParser: true, useUnifiedTopology: true });

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  name: String,
  repoId: Number,
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
  Repo.createIndexes({repoId: 1, unique: true})
  let repos = data.map(repo => {
    return {
      name: repo.name,
      repoId: repo.id,
      url: repo.url,
      description: repo.description,
      forks_count: repo.forks_count,
      username: repo.owner.login

    };
  })
  console.log('repos: ', repos);
  return Repo.insertMany(repos,{upsert: true })
  .then(data => {
    console.log('insertMany worked!');
    console.log('added data: ', data);
  })
  .catch(err => {
    console.log('inser err:', err);
  })
}

module.exports.save = save;