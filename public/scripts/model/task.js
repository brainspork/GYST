'use strict';

var app = app || {};

(function(module) {

  var gyst = {};

  function Task(obj) {
    this.id = obj.task_id;
    this.category = obj.category;
    this.title = obj.title;
    this.start = obj.start_task;
    this.end = obj.end_task;
    this.description = obj.description;
    this.timing = function () {
      if(this.start !== '' && this.end !== null){
        return `${this.start} - ${this.end}`;
      }else{
        return '';
      }
    }
  }

  gyst.temp;
  gyst.all = [];

  Task.prototype.deleteRecord = function() {
    $.ajax({
      url: `/task/${this.title}`,
      method: 'DELETE',
    });
  }

  gyst.fetchAll = function() {
    $.get('/tasks')
    .then(tasks => {
      gyst.all = tasks.map(curr => new Task(curr));
    }).then(app.gystView.loadAll);
  }

  gyst.insertRecord = function(obj) {
    $.post('/task', obj)
    .then(console.log('success'))
    .then(gyst.temp = new Task(obj))
    .then(gyst.all.push(new Task(obj)));
  };

  gyst.addTask = (callback) => {
    $('#add').on('click', function(e) {
      e.preventDefault();

      if($('select').val === '' || $('#title').val() === '') {
        return alert('Category and Task Name required');
      }

      gyst.insertRecord({
        category: $('select').val(),
        title: $('#title').val(),
        start_task: $('#start').val(),
        end_task: $('#end').val(),
        description: $('textarea').val()
      });
      $('input').val('');
      $('textarea').val('');
      callback();
    });
  }

  gyst.removeTask = () => {
    $('.lists').on('click', '.task', function() {
      var $title = $(this).children('h4').text();
      var curr = gyst.all.filter(curr => curr.title === $title);
      $(this).toggleClass('pending');

      $('.remove').on('click', (e) => {
        e.preventDefault();
        $(this).remove();
        curr[0].deleteRecord();
      });
    });
  }

  module.gyst = gyst;

}(app));
