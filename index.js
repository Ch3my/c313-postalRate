// const PORT debe existir para que levante en Heroku
const PORT = process.env.PORT || 5000
const path = require('path')
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => res.render('pages/index'))
app.get('/math', (req, res) => res.render('pages/math', { req, res }))
app.post('/math', function (req, res) {
  var result = doMath(req.body.numberA, req.body.numberB, req.body.sign)
  res.render('pages/math', { req, res, result })
})
app.post('/math_service', function (req, res) {
  var result = {}
  result.result = doMath(req.body.numberA, req.body.numberB, req.body.sign)
  res.json(result)
})

app.listen(PORT, () => {
  console.log("Listening on ${ PORT }");
});

function doMath(numberA, numberB, sign){
  var result = 0
  switch (sign) {
    case '+':
      result = parseInt(numberA) + parseInt(numberB)
      break
    case '-':
      result = parseInt(numberA) - parseInt(numberB)
      break
    case '*':
      result = parseInt(numberA) * parseInt(numberB)
      break
    case '/':
      result = parseInt(numberA) / parseInt(numberB)
      break
  }
  return result
} 