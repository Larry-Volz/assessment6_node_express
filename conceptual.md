### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
  

```
There are two main ways to handle asynchronous code in Javascript.
The first is to use async and await. 
The other is to use .then()
```

- What is a Promise?

```
A promise is, as it's name suggests, an object that promises a value will be returned for a given request/function.  It's sort of a placeholder and when the request has been fulfilled it will return either a response or an indication that it failed.  It has 3 states: pending, resolved and rejected.
```

- What are the differences between an async function and a regular function?
```  
An async function is one where there can be a delay from the answering system.  If there is code after the asynchronous function and the asnc function doesn't respond fast enough, the next line after the async function will be run.  To compensate for that we use async keyword plus .then() or async and await.
```

- What is the difference between Node.js and Express.js?

```
Node.js is a server back-end written in Javascript.  Express is a library that uses node as a server and supplies a backbone for routing requests and responses to the server analagous to Python/Flask.
```

- What is the error-first callback pattern?

```
This is a pattern where you use try and catch and check for errors before you return whatever it is that was wanted.  In the try block you use throw and (optionally) a custom error to generate an error if you have a semantic failure which is caught by the catch block.
```

- What is middleware?

```
Middleware is code that uses the syntax use(foo) and runs all the time with every request to every route without having to repeat that code.  An example is listen() which listens to every request and distributes them to the next function.
```

- What does the `next` function do?

```
next() calls the next route/function or middeware in order on the page.  It is used when there is a divergence in the program flow due to logic like a return from a subroutine.
```

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
```
As written this code waits for one, then it waits for the next and then it waits for the third call.  So you can have a bottleneck slowing down your system doing it in a linear way like that.  Unless they are dependent on each other another idea is to use Promise.all to handle them in parallel. Also, there is some unneccessary dry code in that they all use the same base URL. Finally, if there is a rejected promise it could affect those that come after.

A better refactoring would be:

async function getUsers(){
  const baseUrl = 'https://api.github.com/users';
  let users = await Promise.all([
    $.getJSON(`${baseUrl}/elie),
    $.getJSON(`${baseUrl}/joelburton),
    $.getJSON(`${baseUrl}/mmmaaatttttt),
  ]);
}
And we can access the answers with users[index]
```