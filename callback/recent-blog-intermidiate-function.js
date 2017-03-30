var http= require('http');
var fs= require('fs');

http.createServer(function(req,res) {

  if(req.url == '/') {

    getTitles(res);

  }


}).listen(20000);

console.log('Server started:');

function getTitles(res) {
  fs.readFile('./title.json', function (err, data) {
    if(err) {
      console.log(err);
      res.end('server error');
    } else {
      var titles= JSON.parse(data.toString());
      getTemplate(titles, res);
    }
  })

}

function getTemplate(titles, res) {
  fs.readFile('./template.html', function(err, data) {
    if(err) {
      console.log(err);
      res.end('Server Error');
    } else {

      var tmpl = data.toString();
      formatHtml(tmpl, titles, res);
    }
  })
}

function formatHtml(tmpl, titles, res) {

  var html = tmpl.replace('%', titles.join('</li><li>'));
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(html);

}
