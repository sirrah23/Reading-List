var app = app || {};

app.Reading = Backbone.Model.extend({
  defaults: {
    title: 'None',
    author: 'Unknown',
    status: 'Waiting',
    keywords: 'None'
  }
});
