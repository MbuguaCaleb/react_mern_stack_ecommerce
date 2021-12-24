**React Ecommerce Project**

```
What React Bootstrap gives is well customized bootstrap components

PropTypes in React Js do what we call typeChecking.
Proptypes validate your data and minimize the possibility of errors.


```

**Match**

```
A match object contains information about how a <Route path> matched the URL. match objects contain the following properties:
```

**CORS**

```
Cross-Origin Resource Sharing (CORS) is an HTTP-header based mechanism that allows a server to indicate any origins other than its own from which a browser should permit loading resources

(A good example in when i have my react js in port 5000, making a request to my api in port 3000)

(This by default is not allowed)


N/B
For security reasons, browsers restrict cross-origin HTTP requests initiated from scripts.


Solution,

It is introducing a proxy in my react package.json.


a proxy server is a server application that acts as an intermediary between a client requesting a resource and the server providing that resource

```

**Enabling ES6 in Node Js**

```
All i should do is to add type modules in my Node Js Application.

The difference between ES6 imports in the backend and in the front end is
that in backend when i am importing files they must end with a .JS.

N/B
The Backend interprets everything that does not have a .JS file as a module

```

**MONGO DB NOSQL Database**

```
In a NOSQL  Database we have  a collection of documents or Objects.


Mongo DB Atlas---this is the Cloud Version for Mongo DB

Collections are like tables.

```

**Models in NOSQL**

```
This is how i create the structure of my Collections(Tables)
in NOSQL Databases.

```

**Mongo DB Notes**

```
(a)Everytime i am working with a Mongoose Model it always returns a Promise


My function in express Must always have asyc await.


```

**MiddleWare**

```
It is basically a function that has access to the request response cycle.

//simple middleware
app.use((req, res, next) => {
  console.log(req.originalUrl)
  next()
})

```

**Redux**

```
We have got two types of State.

(a)Component Level State.

  Has to do with components....propery drilling


(b)Application Level State

 What services in angular also try to do it to take state from component
 level to application.

Reducers--->functions that accept actions and are responsible for changing/maniuplating
            the  state.


Actions--->Are Objects that reprsent the intention to change a piece of State.


ActionCreators->Functions that will dispatch and fireoff those actions.


There is a big difference between action creators and actions....


i call action creators from my components.


Packages needed in redux installation.


npm i redux react-redux redux-thunk redux-devtools-extension


import { useDispatch, useSelector } from 'react-redux'

The useDispatch hook and the useSelector are the ones we use to dispatch actions and to select
part of the state.





```

**NEW THINGS LEARNT**

```
History is used for rediretion.
Match helps us extract the URL Parameters

Redirecting to the cart with a Query String Qty.

history.push(`/cart/${match.params.id}?qty=${qty}`)

By putting a question mark at the end of my route parameter i make it
Optional.

<Route path='/product/:id?' component={CartScreen} />

Means that the :id can either be part of the route or not.

```

**Javascript things to Learn**

```
1.Local Storage.

2.Array Reduce Method.



```

**Important Websites**

```
(a)Bootswatch

```
