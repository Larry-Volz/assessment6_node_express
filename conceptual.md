### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
  

  There are two main ways to handle asynchronous code in Javascript.
  The first is to use async and await. 
  The other is to use .then()

- What is a Promise?

A promise is, as it's name suggests, the promise that a value will be returned for a given request.  It's sort of a placeholder and when the request has been fulfilled it will return either a response or an indication that it failed.  

- What are the differences between an async function and a regular function?
  
An async function is one where there can be a delay from the answering system.  If there is code after the asynchronous function and the asnc function doesn't respond fast enough, the next line after the async function will be run

- What is the difference between Node.js and Express.js?

- What is the error-first callback pattern?

- What is middleware?

- What does the `next` function do?

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
