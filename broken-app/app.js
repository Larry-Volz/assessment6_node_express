const express = require('express');
const ExpressError = require("./expressError")
let axios = require('axios');
var app = express();

app.use(express.json());  //to use JSON

async function getDevelopers(userReq) {
  let developerArr = [];
  for (developer of userReq){
    try{
      let developerData = await axios.get(`https://api.github.com/users/${developer}`);
      console.log("DEVELOPER DATA", developerData);
    }catch(err){
      next(err);
    }
    developerArr.push(developerData);
    return developerArr;
  }
}
//Given a list of GitHub users names, this should return information about those developers.
//User POSTS requests a JSON body like {developers: [username, ...]}
//in loop
  //extract each username
  //request from GitHub with https://api.github.com/users/${userName}
  //store returned objects in array
//Respond to user with contents of that array [ {name, bio}, ... ]
//for example:   POST { "developers": ["joelburton", "elie"] }


//It should have one route: POST /
app.post('/', function(req, res, next) {

  try {
    //POST an array of developers (?) and make array of user data for each from github
    let userReq = req.body.developers;

    let results = getDevelopers(userReq);

    for (result in results) {
      console.log(result);
      res.json(results);
    }


    // let results = req.body.developers.map(async d => {  
    //   return await axios.get(`https://api.github.com/users/${d}`);
    // }).then(data => console.log(data);)


    // return res.send(JSON.stringify(out));
  } catch(err) {
    console.log(`CAUGHT ERROR: ${err} after attempted POST request`)
    //TODO: Create a use() error catch-all for next to go to
    next(err);
  }
});


// 404 handler
app.use(function (req, res, next) {
  const notFoundError = new ExpressError("Not Found", 404);
  return next(notFoundError)
});

/** general error handler */
app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({
    error: err.message,
  });
});

app.listen(3000); 
