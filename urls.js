//It is called on the command line like node urls.js FILENAME
// it reads the contents of FILENAME (each line of that file will be a URL).
let axios = require('axios');
const process = require('process');
const fs = require('fs');
const { type } = require('os');
const argv = process.argv;
const fileName = argv[2];

async function processEach(arr){
    for (line of arr){

    // For each URL, the output filename should be the hostname of the URL. For example, for the input URL http://yahoo.com/blah/blah, your script should write the contents to a plain text file called yahoo.com
    shortName = line.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];
    
    //get that page (a GET request to the URL)
    siteContents = await axios.get(line)
    siteContents = siteContents.data;
    //NOTE: siteContents was returning [object, object] have to add .data!
    // console.log(`SITE CONTENTS of ${line}\n\r ${siteContents}`);


    // save the HTML in a new file.
    fs.writeFile(`./outputFiles/${shortName}`, siteContents, "utf8", function(err){
        console.error(`${shortName} FILE NOT WRITTEN?  Error:\n\r ${err}`);
        // process.exit(1);
    })
    console.log(`SUCCESS: ${shortName} CREATED!`)
    }

}

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

