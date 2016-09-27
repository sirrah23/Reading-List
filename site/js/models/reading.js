var app = app || {};

app.Reading = Backbone.Model.extend({
  defaults: {
    title: 'None',
    author: 'Unknown',
    status: 'waiting',
    keywords: 'None'
  },

  parse: function(response){
    response.id = response._id;
    return response;
  }
});
