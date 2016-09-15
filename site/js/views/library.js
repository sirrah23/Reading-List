var app = app || {};

app.LibraryView = Backbone.View.extend({
  el: '#readings',

  events: {
    "click #add" : "addReading"
  },

  initialize: function(initialReadings){
    this.collection = new app.Library(initialReadings);
    this.listenTo(this.collection, "add", this.renderReading); //display newly added reading
    this.render();
  },

  render: function(){
    this.collection.each(function(item){
      this.renderReading(item);
    }, this);
  },

  renderReading: function( reading ){
    readingStatus = reading.get('status');
    statusNode = '#'+readingStatus.toLowerCase();
    var readingView = new app.ReadingView({
      model: reading
    });
    this.$el.find(statusNode).append(readingView.render().el);
  },

  addReading : function(e){
    e.preventDefault();

    formData = {};

    $("#addReading div").children("input").each(function(i, el){
      formData[$(el).attr("id")] = $(el).val() // Put form data into object
    });

    this.collection.add( new app.Reading(formData)); // Add new reading to collection
  }

});
