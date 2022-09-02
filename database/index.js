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
  //Repo.createIndexes({repoId: 1}, {unique: true});
  var promises = [];
  data.forEach(repo => {
    const repoObj =  {
      name: repo.name,
      repoId: repo.id,
      url: repo.html_url,
      description: repo.description,
      forks_count: repo.forks_count,
      username: repo.owner.login
    };
    promises.push(
      Repo.find({repoId: repo.id})
        .then(res => {
          console.log('res: ',res);
          if (res.length && res.length !== 0) {
            return Repo.update({repoId: repo.id}, repoObj);
          } else {
            return Repo.create(repoObj)
          }
        })
    );
  })
  Promise.all(promises)
    .then(() => {
      console.log('add to db');
    });

}

module.exports.save = save;