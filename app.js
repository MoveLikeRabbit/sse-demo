var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
app.get('/index', function (req, res) {
  console.log(res.query);
  res.sendFile(__dirname + '/views/index.html');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/sse', function (req, res) {
  console.log(req.body.username);
  res.setHeader('Content-Type', 'text/event-stream');
  res.write("data: " + (new Date()) + "\n\n");
  let interval = setInterval(() => {
    res.write("data: " + (new Date()) + "\n\n");
  }, 1000);
  req.addListener('close', function () {
    console.log('clearInterval')
    clearInterval(interval)
    res.end()
  }, false)
  // res.redirect('https://www.google.com.hk/search?q='+ req.body.username+'&oq=&aqs=chrome.0.35i39i362l8...8.4221347j0j7&sourceid=chrome&ie=UTF-8')
});
app.listen(8080, function (params) {
  console.log('接口已经启动');
});
