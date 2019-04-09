var express = require('express');
var app = express();
const ps = require('python-shell');
app.get('/', function (req, res) {
  res.send('Hello Worl!');
});

app.listen(3003, function () {
  console.log('Example app listening on port 3003!');
});
app.get('/res/api',(req, res, next) => {
  let options = {
    mode: 'text',
    pythonPath: '/usr/bin/python',
    scriptPath: './',
    args: [req.query.a,req.query.b]
  };

  ps.PythonShell.run('expert-system.py', options, (err, results) => {
    if (err) throw err;
    // results is an array consisting of messages collected during execution
    console.log(results);
    res.append('Access-Control-Allow-Origin', ['*']);
    res.json(results)

  });

});
