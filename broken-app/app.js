const express = require('express');
let axios = require('axios');
var app = express();

app.post('/', function(req, res, next) {
  try {
    //POST an array of developers (?) and make array of user data for each from github
    let results = req.body.developers.map(async d => {
      return await axios.get(`https://api.github.com/users/${d}`);
    });
    let out = results.map(r => ({ name: r.data.name, bio: r.data.bio }));


    return res.send(JSON.stringify(out));
  } catch {
    next(err);
  }
});

app.listen(3000);
