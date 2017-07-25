'use strict';

var app = app || {};

(function(module) {
  var gystView = {};

  gystView.loadAll = () => {
    if(app.gyst.all.length > 0) {
      var render = Handlebars.compile($('#list-template').text());
      app.gyst.all.map((curr, ind) => {
        var $currentItem = $(`#${curr.category}`);
        var currentTask = [curr];
        $currentItem.append(currentTask.map(render));
      });
    }
  }

  gystView.render = () => {
    var render = Handlebars.compile($('#list-template').text());
    var context = app.gyst.temp;
    var $currentItem = $(`#${context.category}`);
    $currentItem.append(render(context));
    app.gyst.temp = null;
  }

  module.gystView = gystView;
}(app));
