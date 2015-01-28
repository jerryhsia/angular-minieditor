/**
 * Angular minieditor
 * Code licensed under the MIT License:
 * https://github.com/jerryhsia/angular-minieditor/blob/master/LICENSE
 *
 * @version 1.0.0
 * @author  Jerry Hsia (xiajie9916@gmail.com)
 * @description A mini text editor for angularjs.
 */

 'use strict';
angular.module('minieditor', []).directive('minieditor', function($compile, $timeout, minieditorUI) {

  function controller ($scope) {
    if (!angular.isObject($scope.options)) {
      $scope.options = {};
    }

    if (!angular.isDefined($scope.options.theme)) {
      $scope.options.theme = 'bootstrap';
    }

    if (!angular.isDefined($scope.options.menu)) {
      $scope.options.menu = [
        ['bold', 'italic']
      ];
    }
  }

  function link($scope, $element, $attrs, $ctrl) {
    $element.html(minieditorUI.getTemplate($scope.options));
    $compile($element.contents())($scope);

    var editor = $element.find('div.minieditor-content');

    $ctrl.$render = function() {
      editor.html($ctrl.$viewValue);
    };

    editor.on('input keyup paste mouseup', function(event) {
      var content = editor.html();
      if (content == '<br>') {
        content = '';
      }
      $ctrl.$setViewValue(content);
    });

    $scope.format = function(command, arg) {
      document.execCommand(command, false, arg);
    };

    function getCommandState(command) {
      return document.queryCommandState(command);
    }

    function getCommandValue(command) {
      return document.queryCommandValue(command);
    }

    editor.on('click keyup focus mouseup', function() {
      $timeout(function() {
        $scope.isBold = getCommandState('bold');
      }, 50);
    });
  }

  return {
    template: '<div id="{{options.id}}" class="{{options.class}} minieditor minieditor-{{options.theme?options.theme:\'bootstarp\'}}" ng-attr-style="width:{{options.width? options.width + \'px\':\'100%\'}};"></div>',
    restrict: 'E',
    scope: {
      value: '=ngModel',
      options: '=miniOptions'
    },
    replace: true,
    require: 'ngModel',
    link: link,
    controller: controller
  };
}).factory('minieditorUI', function() {

  function getTemplate(options) {
    return getMenu(options) + getContent(options);
  }

  function getContent(options) {
    return '<div contenteditable="true" class="minieditor-content" ng-attr-style="height:{{options.height? options.height + \'px\':\'100px\'}};"></div>';
  }

  function getMenu(options) {
    var menu = options.menu;
    var menuText = '<div class="minieditor-menu">';
    for (var i = 0; i < menu.length; i++) {
      menuText += '<div class="btn-group" role="group">';
      for (var j = 0; j < menu[i].length; j++) {
        menuText += getButton(menu[i][j]);
      }
      menuText += '</div>';
    }
    menuText += '</div>';
    return menuText;
  }

  function getButton(item) {
    switch (item) {
      case 'bold':
        return '<button ng-click="format(\'bold\')" ng-class="{active: isBold}" type="button" class="btn btn-default"><i class="fa fa-bold"></i></button>';
        break;
      default:
        return '';
        break;
    }
  }

  return {
    getTemplate: getTemplate
  };
});
