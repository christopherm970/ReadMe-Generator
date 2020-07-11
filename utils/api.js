const axios = require("axios");
require('dotenv').config()

const token = {
  headers: {'Authorization': 'process.env.DB_API'}
}

const api = {
  async getUser(username) {
    const queryUrl = `https://api.github.com/users/${username}`;

    await axios
      .get(queryUrl)
      .then(function(res){
        return gitHubImage = res.data.avatar_url; 
      });

    await axios
      .get(queryUrl, token)
      .then(function(res){
        return gitHubEmail = res.data.email; 
      });
  }
};

module.exports = api;