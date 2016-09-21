var app = app || {};

app.Library = Backbone.Collection.extend({
  model:app.Reading,
  url: '/api/readings'
});
