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
      if(err) return hadError(err, res)
      getTemplate(JSON.parse(data.toString()), res)

  })

}

function getTemplate(titles, res) {
  fs.readFile('./template.html', function(err, data) {
      if(err) return hadError(err, res);
      formatHtml(data.toString(), titles, res);

  })
}

function formatHtml(tmpl, titles, res) {

  var html = tmpl.replace('%', titles.join('</li><li>'));
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(html);

}

function hadError(err, res) {
    console.log(err);
   res.end('server error');

}
