var app = app || {};

app.ReadingView = Backbone.View.extend({

  tagName: 'div',

  className: 'readingContainer',

  template: _.template($('#readingTemplate').html()),

  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }

});
