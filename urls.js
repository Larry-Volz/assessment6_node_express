let axios = require('axios');
const process = require('process');
const fs = require('fs');
const { type } = require('os');
const argv = process.argv;
//It is called on the command line like node urls.js FILENAME
const fileName = argv[2];

async function processEach(arr){
    for (line of arr){
        
        /* For each URL in file output filename should be the hostname of the URL. 
        For example http://yahoo.com/blah/blah becomes yahoo.com*/
        shortName = line.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];
        
        //get that page (a GET request to the URL)
        try{
            siteContents = await axios.get(line)
            //NOTE: siteContents was returning [object, object] had to add .data!
            siteContents = siteContents.data;
        
            // save the HTML in a new file.
            fs.writeFile(`./${shortName}`, siteContents, "utf8", function(err){
                if(err){
                    console.error(`${shortName} FILE NOT WRITTEN?  Error: ${err}\n\r`);
                }
            })
            console.log(`SUCCESS: ${shortName} CREATED!\r\n`)
        }catch(err){
            //QUESTION FOR KYLE: why is this line 
            console.error(`Error caught in try block: ${err}\n\r`);
        }
    }
    
}


//-------------------------------------------------------------------------------------------------------------

// it reads the contents of FILENAME (each line of that file will be a URL).
fs.readFile(fileName, 'utf8', function(err, data) {
  if (err) {
    // handle possible error
    console.error(err);
    // kill the process and tell the shell it errored
    process.exit(1);
  }
// otherwise success
//For each URL
let lines = [];
data.split(/\r?\n/).forEach(line =>  {
lines.push(line);
});


results = processEach(lines);


});

