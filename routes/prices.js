var express = require('express');
var router = express.Router();
var parser = require('xml2json');

var httpget = require('request');

router.get('/test', function(req, res, next) {
  var url = 'http://openapi.okdab.com/price/inves/pricexml_search_wholesale.jsp?key=bd17a71eb528cb968408e3e620ae353e&sdate=20170116&edate=20170116&ccode=330101&lcode=08&mcod=0804&scode=080413&snum=1&enum=50';
  httpget(url, function(err, data){
    var body = parser.toJson(data.body);
    var json = JSON.parse(body);
    var total = parseInt(json.price.totalcount);
    if (total > 0) {
      res.render('prices', { total: total, prices: json.price.result });
    } else {
      res.render('prices', { prices: []});
    }
  });
});

router.post('/', function(req, res, next) {
  var url = 'http://openapi.okdab.com/price/inves/pricexml_search_wholesale.jsp?key=bd17a71eb528cb968408e3e620ae353e'
    + '&sdate='+ req.body.date
    + '&edate=' + req.body.date
    + '&ccode=' + req.body.ccode + '&lcode=08&mcod=0804&scode=080413&snum=1&enum=50'; //설향 080413

  httpget(url, function(err, data){
    try {
      var body = parser.toJson(data.body);
      var json = JSON.parse(body);
      var total = parseInt(json.price.totalcount);
      res.send(json.price);
    } catch(e) {
      res.status(500).send({err: e});
    }

  });
});

module.exports = router;
