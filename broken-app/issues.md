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