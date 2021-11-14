const axios = require("axios");

async function testing(){

    for (i = 0; i<3; i++){

        let rhc = await axios.get("https://www.richmondhypnosiscenter.com")
        .then(()=>{console.log("2nd thing wowsers")});
        console.log("3rd thing");
        
        let rhc2 = await axios.get("https://www.richmondhypnosiscenter.com")
        .catch(()=>{console.log("if an error")});
        
        console.log("4th thing");
    }
    
}

testing();