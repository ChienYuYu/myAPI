var express = require('express');
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
//---------------------------------

module.exports = router;
