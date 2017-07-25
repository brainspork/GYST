'use strict';

var app = app || {};

(function(module) {
  var navController = {};

  navController.showNav = () => {
    $('.icon-menu').on('click', function () {
      $(this).next().next().toggleClass('nav-display');
    });
  }

  navController.hideNav = () => {
    $('nav a').on('click', function () {
      $(this).parent().parent().parent().removeClass('nav-display');
    });
  }

  navController.showList = () => {
    $('#current-tasks h3').on('click', function () {
      $('.lists').removeClass('active');
      var $clicked = $(`#${$(this).data('list')}`);
      $clicked.toggleClass('active');
    });
  }


  navController.incomplete = () => {
    $('section').hide();
    $('#broken').show();
  }

  module.navController = navController;
}(app));
