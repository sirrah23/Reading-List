var app = app || {};

$(function(){
  var books = [
    { title: 'JavaScript: The Good Parts', author: 'Douglas Crockford',
      releaseDate: '2008', keywords: 'JavaScript Programming',
      status:"waiting"},
    { title: 'The Little Book on CoffeeScript', author: 'Alex MacCaw',
      releaseDate: '2012', keywords: 'CoffeeScript Programming',
      status:"waiting" },
    { title: 'Scala for the Impatient', author: 'Cay S. Horstmann',
      releaseDate: '2012', keywords: 'Scala Programming',
      status:"done" },
    { title: 'American Psycho', author: 'Bret Easton Ellis',
      releaseDate: '1991', keywords: 'Novel Splatter',
      status:"inprogress" },
    { title: 'Eloquent JavaScript', author: 'Marijn Haverbeke',
      releaseDate: '2011', keywords: 'JavaScript Programming',
      status:"done"}
  ];
  new app.LibraryView( books );
});
