// example request using ajax get.
// $.get('data/condensed_data.json', function(data){
//   for (var i = 0; i < data.data.length; i++) {
//     var element = document.createElement("div");
//     var inner = document.createTextNode(data.data[i].author);
//     element.appendChild(inner);
//     document.getElementById('demo').appendChild(element);
//   }
// });

// Example using the Non JQuery AJAX XMLHttpRequest;
// var req = new XMLHttpRequest();
// req.open('GET', 'data/condensed_data.json', true);
// req.send();
// req.onreadystatechange = function (){
//   if (req.readyState === XMLHttpRequest.DONE) {
//     console.log('typeof req.response',typeof req.response);
//     var data = JSON.parse(req.response)
//     console.log(data);
//     for (var i = 0; i < data.data.length; i++) {
//       var element = document.createElement("div");
//       var inner = document.createTextNode(data.data[i].author);
//       element.appendChild(inner);
//       document.getElementById('demo').appendChild(element);
//     }
//   }
// }
window.onload = function () {
  var req = new XMLHttpRequest();
  req.open('GET', 'data/condensed_data.json', true);
  req.send();
  req.onreadystatechange = function (){
    if (req.readyState === XMLHttpRequest.DONE) {
      var data = JSON.parse(req.response)
      window.reddit_feed = data;

      startProcess();
    }
  }
  var time = document.querySelectorAll('.time')
  for (var i = 0; i < time.length; i++) {
    var unixTime = time[i].innerHTML;
    time[i].innerHTML = moment.unix(unixTime);
  }
}

// All custom code goes in here
function startProcess() {
  var feed = window.reddit_feed.data;
  for (var i = 0; i < feed.length; i++) {
    var article = feed[i];
    console.log(article);

    var column = document.createElement("div");
    column.className = "col-sm-12 col-md-4";

    var post = document.createElement("div");
    post.className = "post";
    column.appendChild(post);

    var link = document.createElement("a");
    link.href = "javascript:void(0)";
    post.appendChild(link);

    var thumbnail = document.createElement("div");
    thumbnail.className = "thumbnail";
    link.appendChild(thumbnail);

    var image = document.createElement("img");
    if (article.thumbnail.indexOf("http") != -1) {
      image.src = article.thumbnail;
    }
    image.alt = "thumbnail";
    thumbnail.appendChild(image);

    var author = document.createElement("div");
    author.className = "author";
    author.innerHTML = article.author;
    link.appendChild(author);

    var title = document.createElement("div");
    title.className = "title";
    title.innerHTML = article.title;
    link.appendChild(title);

    var body = document.createElement("div");
    body.className = "body";
    if (article.body) {
      body.innerHTML = article.body;
    } else {
      body.innerHTML = "No Body";
    }
    link.appendChild(body);

    var time = document.createElement("div");
    time.className = "time";
    time.innerHTML = moment.unix(article.created);
    link.appendChild(time);


    document.getElementById("main").appendChild(column);


    // Create element in memory
    /*var container = document.createElement("div");
    var title = document.createElement("div");

    // Assign values to element
    title.innerHTML = article.title;

    // Nest elements inside each other
    container.appendChild(title);

    document.getElementById("main").appendChild(container);*/
  }
}
