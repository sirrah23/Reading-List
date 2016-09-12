var app = app || {};

app.LibraryView = Backbone.View.extend({
  el: '#readings',

  initialize: function(initialReadings){
    this.collection = new app.Library(initialReadings);
    this.render();
  },

  render: function(){
    this.collection.each(function(item){
      this.renderReading(item);
    }, this);
  },

  renderReading: function( reading ){
    readingStatus = reading.get('status');
    statusNode = '#'+readingStatus;
    var readingView = new app.ReadingView({
      model: reading
    });
    this.$el.find(statusNode).append(readingView.render().el);
  }
});

