
const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const uuid = require('uuid')

const { users } = require('./state')

/* BEGIN - create routes here */
// get all users
app.get('/users', (req,res, next) => {   
res.json(users)
res.send('success')
next()
})

// Body parsing middleware
app.use(express.json());

// get user by id
app.get('/users/:id', (req,res) => {   
  res.json(users.filter(user => user._id === parseInt(req.params.id)))
  })

// * Give your server the ability to respond to a POST request with a path "/users" and add a hard coded user object to the users array from state.js. Use `res.json()` to send the last user in the array (should be the new one) back to the client.

app.post('/users', (req,res) => {
  const newUser = {
    // add one to the previous id for the new users id
      _id: users[users.length-1]._id + 1,
      name: req.body.name,
      occupation: req.body.occupation,
      status: 'active'
  }

  if(!newUser.name || !newUser.occupation) {
    return res.status(400).json({msg: 'please include a name and occupation'})
  }
  users.push(newUser)
  // return the whole members array to show that the new member as been added
  res.json(users)
})

// put requests

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))