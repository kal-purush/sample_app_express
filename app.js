var express = require("express");
var app = express();

// Set template engine
app.set('view engine', 'ejs')

// Bind the app to a specified port
var port = process.env.PORT || 3000;
app.listen(port);
console.log("Listening on port " + port);

// Super simple algorithm to find largest prime <= n
var calculatePrime = function(n){
  var prime = 1;
  for (var i = n; i > 1; i--) {
    var is_prime = true;
    for (var j = 2; j < i; j++) {
      if (i % j == 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      prime = i;
      break;
    }
  }
  return prime;
}

// Set up the GET route
app.get('/', function (req, res) {
  if(req.query.n) {
    // Calculate prime and render view
    var prime = calculatePrime(req.query.n);
    res.render('index', { n: req.query.n, prime: prime});
  }
  else {
    // Render view without prime
    res.render('index', {});
  }
});
