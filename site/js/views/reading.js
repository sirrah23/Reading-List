var app = app || {};

app.ReadingView = Backbone.View.extend({

  tagName: 'div',

  events: {
      "click .delete" : "deleteReading" // class & id location is relative to tagName...
  },

  className: 'readingContainer',

  template: _.template($('#readingTemplate').html()),

  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },

  deleteReading: function(){
      // Delete the model
      this.model.destroy();  // As passed in to create the model, smh frameworks

      // Delete the View
      this.remove();
  }
});
