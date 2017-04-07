BlockModel = Backbone.Model.extend();

var BlockCollection = Backbone.Collection.extend({
  model: BlockModel,
  url: 'https://api.myjson.com/bins/hosvb',
  parse: function(data){
    return data;
  }
})


var Carousel = Backbone.View.extend({
  events: {
    'click .carousel-prev': 'prev',
    'click .carousel-next': 'next'
  },
  initialize: function(options) {
    _.bindAll(this);
    this.items = _.map(this.$('.carousel-item').hide(), function(i) { return i; });
    this.current = 0;
    this.data = options.data
    console.log('initialize', this.current);
  },
  randomBlockPhoto: function() {
    let block = Object.values(this.data)[this.current]
    let random =  Math.floor(Math.random() * 4)
    let randomPhoto = block.images[random]
    $(this.items[this.current]).find('img').attr("src", randomPhoto)
  },

  render: function() {
    if (this.current === 0){
      $(".carousel-prev").prop("disabled", true)
      $(".carousel-next").prop("disabled", false)
    }
    console.log('render', this.current);
    $(this.items[this.current]).show();
    this.randomBlockPhoto()
    return this;
  },
  prev: function() {
    console.log("index: ", this.current)

    $(this.items[this.current]).fadeOut(function() {
      this.current -= 1;
      if (this.current === -1) { this.current = this.items.length - 1 }
      $(this.items[this.current]).fadeIn();
      if(this.current > 0){
        $(".carousel-prev").prop("disabled", false)
        $(".carousel-next").prop("disabled", false)
      } else {
        $(".carousel-prev").prop("disabled", true)
      }
    }.bind(this));
    this.randomBlockPhoto()
  },
  next: function() {
    console.log("index: ", this.current)

    $(this.items[this.current]).fadeOut(function() {
      this.current += 1;
      if (this.current === this.items.length - 1) {
        $(".carousel-next").prop("disabled", true)
      } else if (this.current < this.items.length) {
        $(".carousel-next").prop("disabled", false)
      }
      this.randomBlockPhoto()
      $(this.items[this.current]).fadeIn();
      if(this.current > 0){
        $(".carousel-prev").prop("disabled", false)
      }
    }.bind(this));
  }
});

$(document).ready(function(){
  var photo = new BlockCollection();
  photo.fetch().done(function(data) {
    var carousel = new Carousel({el: '#my-carousel', data: data}).render(data);
  });
});
