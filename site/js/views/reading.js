var app = app || {};

app.ReadingView = Backbone.View.extend({

  tagName: 'div',

  events: {
    "click .delete" : "deleteReading", // class & id location is relative to tagName...
    "change .statusDropdown": "updateStatus"
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
  },

  updateStatus: function(e){
    // When a user selects a new status for the book, update the
    // status of that book in the database...
    let newStatus =  this.$el.find('.statusDropdown').val();
    newStatus = newStatus.replace(' ','').toLowerCase(); //Database statuses reflected on front end DIV ids
    // Update the model
    this.model.set({status: newStatus});
    this.model.save();
    //Tell the UI to refresh the view for this model
    this.model.trigger('refresh', this.model);
    // Remove this old view so a new one can take its place
    this.remove();
  }
});
