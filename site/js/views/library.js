var app = app || {};

app.LibraryView = Backbone.View.extend({
  el: '#readings',

  events: {
    "click #add" : "addReading"
  },

  initialize: function(initialReadings){
    this.collection = new app.Library();
    this.collection.fetch({reset:true}); //Grab readings from database
    this.render();

    this.listenTo(this.collection, "add", this.renderReading); //display newly added reading
    this.listenTo(this.collection, "reset", this.render); //Reset library view
    this.listenTo(this.collection, "refresh", this.refreshReading); //Reset reading view
  },

  render: function(){
    this.collection.each(function(item){
      this.renderReading(item);
    }, this);
  },

  renderReading: function( reading ){
    readingStatus = reading.get('status') || 'waiting';
    console.log(readingStatus);
    statusNode = '#'+readingStatus.toLowerCase();
    var readingView = new app.ReadingView({
      model: reading
    });
    this.$el.find(statusNode).append(readingView.render().el);
  },

  refreshReading: function (reading) {
    this.renderReading(reading);
  },

  addReading : function(e){
    e.preventDefault();

    formData = {};

    $("#addReading div").children("input").each(function(i, el){
      formData[$(el).attr("id")] = $(el).val(); // Put form data into object
    });

    this.collection.create( formData ); // Add new reading to collection
  }

});
