const axios = require('axios');
//const config = require('../config.js');
const dotenv = require('dotenv');
dotenv.config();
let getReposByUsername = (username) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: 'https://api.github.com/users/',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${process.env.TOKEN}`
    }
  };
  return axios.get(`${options.url}${username}/repos`, options.headers)
    .then((res) => {
      return res;
    })
    .catch(err => {console.log(err);});

}

module.exports.getReposByUsername = getReposByUsername;