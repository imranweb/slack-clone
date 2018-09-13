const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Chatkit = require('pusher-chatkit-server');
const config = require('./src/config');


const app = express();

// const chatkit = new Chatkit.default({
//   instanceLocator: 'v1:us1:701636f0-be86-4c26-ae6b-525ac671c4eb',
//   key: '20326e50-8ffd-4f71-b7f8-4d4986146e74:fl9bQJJdmjruNK3hJSl3Y8D1IFvxiKxc7iI1T3CEEJw=',
// })

const chatkit = new Chatkit.default(config.app);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())


app.post('/create/user', (req, res) => {
  chatkit.createUser(req.body)
    .then(() => res.sendStatus(201))
    .catch(error => {
      if (error.error_type === 'services/chatkit/user_already_exists') {
        res.sendStatus(200)
      } else {
        res.status(error.status).json(error)
      }
  });
  // chatkit
  //   .createUser({
  //     id: req.body.id,
  //     name: req.body.name
  //   })
  //   .then(() => {
  //     res.send("User created successfully");
  //   })
  //   .catch(err => {
  //     res.status(500).send(err);
  //   });
});

app.post('/users', (req, res) => {
  const { username, name } = req.body;
  chatkit.createUser({
    id: username,
    name,
  })
    .then(() => res.sendStatus(201))
    .catch(error => {
      if (error.error_type === 'services/chatkit/user_already_exists') {
        res.sendStatus(200);
      } else {
        res.status(error.status).json(error);
      }
  })
})

app.post('/authenticate', (req, res) => {
  const authData = chatkit.authenticate({ userId: req.query.user_id });
  res.status(authData.status).send(authData.body);
});


const PORT = 3001;
app.listen(PORT, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Running on port ${PORT}`);
  }
});