var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

// '/api'

const testData = [
  {
    id: 001,
    content: '這是API測試頁'
  }
]

// middleware
let midTest = function(req, res, next) {
  console.log('這是middleware');
  next();
}
// GET---------------------------------
router.get('/test', function(req, res, next) {
  res.send({
    success: true,
    testData
  });
  res.end();
});
// POST---------------------------------
router.post('/test', function(req, res) {
  const addData = req.body;
  testData.push({
    ...addData,
    id: new Date().getTime()
  })

  res.send({
    success: true,
    testData
  });
  res.end();
})
// DELETE---------------------------------
router.delete('/test/:id', function(req, res, next) {
  const id = req.params.id;
  testData.forEach((item, key) => {
    if(item.id == id) {
      testData.splice(key, 1)
    }
  });

  res.send({
    success: true,
    testData
  });
  res.end();
});

// middleware test---------------------------
router.get('/mdTest',midTest, function(req, res, next) {
  res.send('hello');
  res.end();
});

// json web token test---------------------------------

router.get('/tokTest', function(req, res) {
  res.json({
    text: 'my api!'
  });
});

// login後取得token sign()
router.post('/login', function(req, res) {
  // 假user資料
  const user = {id:3};
  const token = jwt.sign({user}, 'my_secret_key');
  res.json({
    token: token
  });
});

// 要夾帶token才能get到資料  verify()
router.get('/protected',ensureToken, function(req, res) {
  jwt.verify(req.token, 'my_secret_key', function(err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        text: 'this is protected',
        data:data
      })
    }
  })
  res.json({
    text: 'this is protected'
  })
})

// 守門員
function ensureToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

// ---------------------------------
module.exports = router;
