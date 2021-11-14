const express = require('express');
const ExpressError = require("./expressError")
let axios = require('axios');
var app = express();

app.use(express.json());  //to use JSON

/* -----------------------------------------------------------------------------------------------------*/

let developerArr = [];
let devrData;


async function getDevelopers(userReq) {

    for (devr of userReq){
console.log("############################## #1 stopping @ each iterator inside getDevelopers loop ################################################");
debugger;
        try{
          devrData = await axios.get(`https://api.github.com/users/${devr}`)
            .catch(err => {
                console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!ERROR CAUGHT AT LINE 22 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                throw new ExpressError(`FROM AXIOS TRYING TO GET ${devr}`, err);
                });
          console.log(`------------------------------------ #2 Got user name:${devrData.data.name} from axios.get at line 22 ------------------------`);
          developerArr.push(`{NAME:${devrData.data.name}, BIO:${devrData.data.bio}}`)
debugger;
        //   developerArr.push({name:devrData.data.name, bio:devrData.data.bio})


    //       //Respond to user with contents of that array [ {name, bio}, ... ]
          
        }catch(err){
          return next(err);
            }
    }
//   console.log('PRINTS NAME/BIO HERE PERFECTLY');
//   for (let eaDvpr of developerArr){
//     console.log(ea);
//     }

  return developerArr;
}

/** ------------------------------------------ ROUTES ------------------------------------------------------- */
app.post('/', function(req, res) {

    try {
        //POST an array of developers (?) and make array of user data for each from github
        let userReq = req.body.developers;  //brings in userReq = ["name1","name2"...]

        developerArr = getDevelopers(userReq)
        .then(()=>{
            
            console.log('SHOULD PRINT NAME/BIO HERE');
            for (let eaDvpr of developerArr){
              console.log(eaDvpr);
              }

        })
        .catch(err => {throw new ExpressError("FROM line 55", err)})
        
        // return res.send(JSON.stringify(out));
  } catch(err) {
        console.log(`CAUGHT ERROR: ${err} after attempted POST request`)
        //TODO: Create a use() error catch-all for next to go to
        next(err);
  }

    console.log("POST WORKING");
  return res.send("reached '/'");
});


/** ----------------------------------------------- ERROR HANDLERS --------------------------------------------- */

// 404 handler
app.use(function (req, res, next) {
    const notFoundError = new ExpressError("Not Found", 404);
    return next(notFoundError);
  });

  /** general error handler */
app.use((err, req, res, next) => {
    res.status(err.status || 500);
  
    return res.json({
      error: err.message,
    });
  });
  

  app.listen(3000); 