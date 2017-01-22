var express = require('express');
var router = express.Router();
var parser = require('xml2json');
var moment = require('moment');

var httpget = require('request');
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


router.get('/', function(req, res, next) {
  var date = req.query.date;
  var ccode = req.query.ccode;
  if (date && ccode) {
    var url = 'http://openapi.okdab.com/price/realtime/pricexml_search_action.jsp';
    url += '?key=bd17a71eb528cb968408e3e620ae353e';
    url += '&date='+ date;
    url += '&ccode=' + ccode + '&lcode=08&mcode=0804&scode=080413'; //설향 080413
    httpget(url, function(err, data){
      try {
        var body = parser.toJson(data.body);
        var json = JSON.parse(body);
        var total = parseInt(json.price.totalcount);
        res.render('prices', { date: date, ccode: ccode, total: total, prices: json.price.result });
      } catch(e) {
        next(e);
      }
    });
  } else {
    res.render('prices', { date: moment().format('YYYY/MM/DD')});
  }
});

module.exports = router;
