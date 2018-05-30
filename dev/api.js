const express = require('express')
const app = express()
const bodyparser = require('body-parser')

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extend:false}));

app.get('/blockchain', function (req, res) {

});

app.post('/transaction', function (req, res) {
    console.log(req.body);
    res.send(`The amount of this transaction is ${req.body.amount}`);
});

app.get('/mine', function (req, res) {

});
 
app.listen(3000, function(){
    console.log('Listening on port 3000...');
});