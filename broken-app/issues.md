# Broken App Issues
- needed axios installed/required
- line 12: return res.send(JSON.stringify(out));  incorrect? -> change to res.json to output
- line 20: in catch block there was no err. Changed catch{} to catch(err){}
- the app was not parsing JSON and so was not getting in the POST data at all.  So I added the line: 
```app.use(express.json());```
- When I tried to use the .map strategy and test the input coming back with a console.log I got "req.body.developers.map(...).then is not a function after attempted POST request
TypeError: req.body.developers.map(...).then is not a function"  So I re-factored it more simply so each part could be tested.
- used res.json() instead of stringify
- added a 404 handler
- added a custom ExpressError handler in case of failure to communicate with GitHub
- switched to .then()'s and .catch() to handle errors and run async requests in order
- despite try/catch blocks and .catch()'s that threw custom errors (printing to console) I kept getting an unhandled exception error that I could not overcome despite significant time in debugger and doing lots of console logging to try and figure out what I am doing wrong.  It seems like the .catch()'s aren't satisfying the system and I need help in this from my mentor.  Turning it in as is