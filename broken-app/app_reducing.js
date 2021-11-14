const express = require('express');
const ExpressError = require("./expressError")
let axios = require('axios');
var app = express();

app.use(express.json());  //to use JSON

let developerArr = [];
let developerData;

// async function getDevelopers(userReq) {
//   let errorResp = `**************************************************************************\r\n
//                    *                                                                         *\r\n
//                    *                    ERROR COMMUNICATING WITH GITHUB                      *\r\n
//                    *                                                                         *\r\n
//                    ***************************************************************************`
                   
//   for (developer of userReq){
//     try{
//       developerData = await axios.get(`https://api.github.com/users/${developer}`)
//       .catch(err => {
//         throw new ExpressError(errorResp, 401);
//       });
//       // .then(developerData => console.log("DEVELOPER DATA", developerData))
//       developerData =>developerArr.push(developerData)

//       //Respond to user with contents of that array [ {name, bio}, ... ]
      
//     }catch(err){
//       return next(err);
//     }
//   }
//   console.log('HERE');
//   for (let dev of developerArr){
//     console.log(dev);
//     }
//   return developerArr;
// }

app.get('/', function(req, res){
  return res.send("Arrived at /");
})

//It should have one route: POST /
app.post('/', function(req, res) {

  // try {
  //   //POST an array of developers (?) and make array of user data for each from github
  //   let userReq = req.body.developers;

  //   let results = getDevelopers(userReq);

  //   for (result in results) {
  //     console.log(result);
  //     res.json(results);
  //   }
  //   // return res.send(JSON.stringify(out));
  // } catch(err) {
  //   console.log(`CAUGHT ERROR: ${err} after attempted POST request`)
  //   //TODO: Create a use() error catch-all for next to go to
  //   next(err);
  // }

  console.log("POST WORKING");
  return res.send("reached '/'");
});


// 404 handler
app.use(function (req, res, next) {
  // const notFoundError = new ExpressError("Not Found", 404);
  // return next(notFoundError)
  console.log(`REACHING 404 HANDLER`);
});

/** general error handler */
app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({
    error: err.message,
  });
});

app.listen(3000); 
