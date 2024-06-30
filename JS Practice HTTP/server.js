const express = require('express');

const jwt = require('jsonwebtoken');
const secretKey = 'cool_secret_key';

const app = express();
const port = 8080;

app.use(express.static('public'));
app.use(express.json());

const items = [];
var itemsCount = 1;

const users = [];
var usersCount = 1;

var id = 0;
var nickname = 123;
var login = 123;
var password = 123;
const newToken = {
  id,
  nickname,
  login,
  password,
};
const token = generateToken(newToken);
const newUser = {
  id,
  nickname,
  login,
  password,
  token,
};

users.push(newUser);

// ITEMS
app.post('/api/v1/items', (req, res) => {
  const { itemName, itemPrice, itemDesc } = req.body;
  const id = itemsCount;

  const newItem = {
    id,
    itemName,
    itemPrice,
    itemDesc,
  };

  items.push(newItem);

  res.status(201).json(newItem);
  itemsCount++;
});
app.get('/api/v1/items', (req, res) => {
  res.status(200).json(items);
});
app.delete('/api/v1/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const itemIndex = items.findIndex(item => item.id === id);

  if (itemIndex !== -1) 
  {
    items.splice(itemIndex, 1);
    res.status(204).send();
  } 
  else 
  {
    res.status(404).json({ error: "Not Found!" });
  }
});
app.put('/api/v1/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const itemIndex = items.findIndex(item => item.id === id);

  if (itemIndex !== -1) {
    const { itemName, itemPrice, itemDesc } = req.body;

    items[itemIndex].itemName = itemName;
    items[itemIndex].itemPrice = itemPrice;
    items[itemIndex].itemDesc = itemDesc;

    res.status(200).json(items[itemIndex]);
  } else {
    res.status(404).json({ error: "Not Found!" });
  }
});

// USERS
app.get('/api/v1/users/isNicknameExist/:nickname', (req, res) => {
  const nickname = req.params.nickname;
  const userIndex = users.findIndex(user => user.nickname == nickname);

  if (userIndex !== -1) {
    res.status(200).send("Nickname exists");
  } else {
    res.status(404).send("Nickname does not exist");
  }
});
app.get('/api/v1/users/isLoginExist/:login', (req, res) => {
  const login = req.params.login;
  const userIndex = users.findIndex(user => user.login == login);

  if (userIndex !== -1) {
    res.status(200).send("Login exists");
  } else {
    res.status(404).send("Login does not exist");
  }
});
app.get('/api/v1/users/logging/:login,:password', (req, res) => {
  const login = req.params.login;
  const password = req.params.password;

  const userIndex = users.findIndex(user => user.login == login);

  if(userIndex !== -1 && users[userIndex].password == password)
  {
    const user = users[userIndex];

    const nickname = user.nickname;
    const token = generateToken(newUser);

    const tokenAndNickname = {
      nickname,
      token,
    }
    res.status(200).json(tokenAndNickname);
  } else {
    res.status(404).send("Something goes wrong!");
  }
});
app.get('/api/v1/users/token/:nickname,:token', (req, res) => {
  const nickname = req.params.nickname;
  const token = req.params.token;

  const userIndex = users.findIndex(user => user.nickname == nickname);

  if(userIndex !== -1)
  {
    const user = users[userIndex];
    try {
      const decodedToken1 = jwt.verify(token, secretKey);
      const decodedToken2 = jwt.verify(user.token, secretKey);
    
      if (JSON.stringify(decodedToken1) === JSON.stringify(decodedToken2)) {
        res.status(200).send("Cool!");
      } else {
        res.status(404).send("Token is not cool!");
      }
    } catch (error) {
      console.error("Something goes wrong: ", error);
    }
  }
});
app.post('/api/v1/users', (req, res) => {
  const { nickname, login, password } = req.body;
  const id = usersCount;

  const newToken = {
    id,
    nickname,
    login,
    password,
  };

  const token = generateToken(newToken);

  const newUser = {
    id,
    nickname,
    login,
    password,
    token,
  };

  users.push(newUser);

  const tokenAndNickname = {
    nickname,
    token,
  }
  res.status(200).json(tokenAndNickname);
  usersCount++;
});
app.get('/api/v1/users', (req, res) => {
  console.log(users);
});

function generateToken(user) {
  const payload = {
    id: user.id,
    nickname: user.nickname,
    login: user.login,
    password: user.password,
  };

  const options = {
    expiresIn: '12h',
  };

  return jwt.sign(payload, secretKey, options);
}

app.listen(port, () => {
  console.log(`Server was created on ${port}`);
});