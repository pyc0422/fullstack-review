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
        if (res) {
          Repo.update(repoObj);
        } else {
          Repo.create(repoObj)
        }
      })
    )
  })
  Promise.all(promises)
    .then(() => {
      console.log('add to db');
    })
    .catch(err => {console.log(err);});

  //Repo.createIndexes({repoId: 1, unique: true})
  // var repos = data.map(repo => {
  //   return Repo.find({repoId:repo.id})
  //     .then(res => {
  //       console.log('res: ', res);
  //       if(!res) {
  //         return {
  //           name: repo.name,
  //           repoId: repo.id,
  //           url: repo.html_url,
  //           description: repo.description,
  //           forks_count: repo.forks_count,
  //           username: repo.owner.login
  //         };
  //       }
  //     })

  // })
  // console.log('repos: ', repos);
  // return Repo.insertMany(repos,{upsert: true })
  // .then(data => {
  //   console.log('insertMany worked!');
  // })
  // .catch(err => {
  //   console.log('inser err:', err.writeErros);

  // })
}

module.exports.save = save;