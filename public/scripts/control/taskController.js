'use strict';

var app = app || {};


(function(module) {
    var taskController = {};

    taskController.initIndex = () => {
      app.gyst.fetchAll();
      app.gyst.addTask(app.gystView.render);
      app.gyst.removeTask();
    }

    taskController.goHome = () => {
      $('#current-tasks').show();
      $('#new-task').show();
      $('#broken').hide();
      taskController.initIndex();
    }

    module.taskController = taskController;
}(app));

app.navController.showNav();
app.navController.hideNav();
app.navController.showList();
