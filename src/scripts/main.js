var _ = require('underscore');
var $ = require('jquery');
// var Bacon = require('baconjs');
// $.fn.asEventStream = Bacon.$.asEventStream;
var d3 = require('d3');

var Choose = (function() {
  var groups = [
    'Morgan and Curtis',
    'Mek and Jessy',
    'Drew and Sylvia'
  ],
  rooms = ['A', 'B', 'C'],
  canvas = d3.select("svg"),
  floorplan;

  function shuffle(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }
  console.log(groups);

  var groupDash = d3.select('#dashboard').selectAll('div')
  .data(groups);

  groupDash.enter().append('li')
  .classed('group', true)
  .html(function(d){
    console.log(d);
    var heading = $('<h2>');
    heading.append('<span>' +d +'</span>');
    heading.append('<button id="' + d + '" class="reveal" name=reveal>reveal</button>');
    return heading.html();
  });

  $('#shuffle').click(function() {
    shuffle(groups);
  });
  
  shuffle(groups);
  
  $('.reveal').click(function(event) {
    var room = rooms[groups.indexOf(this.id)];

    $(this).append('<h1>').text(room);
    $(this).unbind('click');

    d3.select('#room'+room)
    .transition()
    .duration(300)
    .style('opacity', 1);
  });

})();
