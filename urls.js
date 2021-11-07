//It is called on the command line like node urls.js FILENAME
// it reads the contents of FILENAME (each line of that file will be a URL).
let axios = require('axios');
const process = require('process');
const fs = require('fs');
const argv = process.argv;
const fileName = argv[2];

async function processEach(arr){
    for (line of arr){
    //get that page (a GET request to the URL)
    url = await axios.get(line);
    console.log(url)
    
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

    // save the HTML in a new file.
    // For each URL, the output filename should be the hostname of the URL. For example, for the input URL http://yahoo.com/blah/blah, your script should write the contents to a plain text file called yahoo.com




});

