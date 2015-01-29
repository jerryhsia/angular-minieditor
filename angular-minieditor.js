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
(function(){
  var miniCommands = {
    bold: {
      command: 'bold',
      type: 'button',
      title: 'Bold',
      icon: 'bold',
      arg: false
    },
    italic: {
      command: 'italic',
      type: 'button',
      title: 'Italic',
      icon: 'italic',
      arg: false
    },
    underline: {
      command: 'underline',
      type: 'button',
      title: 'Underline',
      icon: 'underline',
      arg: false
    },
    strikethrough: {
      command: 'strikethrough',
      type: 'button',
      title: 'Strikethrough',
      icon: 'strikethrough',
      arg: false
    },
    justifyleft: {
      command: 'justifyleft',
      type: 'button',
      title: 'Left justify',
      icon: 'align-left',
      arg: false
    },
    justifycenter: {
      command: 'justifycenter',
      type: 'button',
      title: 'Center justify',
      icon: 'align-center',
      arg: false
    },
    justifyright: {
      command: 'justifyright',
      type: 'button',
      title: 'Right justify',
      icon: 'align-right',
      arg: false
    },
    insertunorderedlist: {
      command: 'insertunorderedlist',
      type: 'button',
      title: 'Unordered list',
      icon: 'list-ul',
      arg: false
    },
    insertorderedlist: {
      command: 'insertorderedlist',
      type: 'button',
      title: 'Ordered list',
      icon: 'list-ol',
      arg: false
    },
    indent: {
      command: 'indent',
      type: 'button',
      title: 'Indent',
      icon: 'indent',
      arg: false
    },
    outdent: {
      command: 'outdent',
      type: 'button',
      title: 'Outdent',
      icon: 'outdent',
      arg: false
    },
    removeformat: {
      command: 'removeformat',
      type: 'button',
      title: 'Remove format',
      icon: 'eraser',
      arg: false
    }
  };

  var defaultMenus = [
    ['bold', 'italic', 'underline', 'strikethrough'],
    ['justifyleft', 'justifycenter', 'justifyright'],
    ['insertunorderedlist', 'insertorderedlist'],
    ['indent', 'outdent'],
    ['removeformat']
  ];

  angular.module('minieditor', []).directive('minieditor', function($compile, $timeout, minieditorUI) {
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

      $scope.states = {};
      function refreshState() {
        angular.forEach(miniCommands, function(commandObj, command) {
          var state = getCommandState(command);
          if (state) {
            console.log(command+'--->'+state);
            $scope.states[command] = state;
          } else {
            delete $scope.states[command];
          }
        });
      }

      $scope.exec = function(command, arg) {
        document.execCommand(command, false, arg);
        refreshState();
      };

      function getCommandState(command) {
        return document.queryCommandState(command);
      }

      function getCommandValue(command) {
        return document.queryCommandValue(command);
      }

      editor.on('click keyup focus mouseup blur', function() {
        $timeout(function() {
          refreshState();
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
      link: link
    };
  }).factory('minieditorUI', function() {

    function getTemplate(options) {
      return getMenuTemplate(options) + getContentTemplate(options);
    }

    function getContentTemplate(options) {
      return '<div contenteditable="true" class="minieditor-content" ng-attr-style="height:{{options.height? options.height + \'px\':\'100px\'}};"></div>';
    }

    function getMenuTemplate(options) {
      var menus;
      if (angular.isDefined(options.menus) && angular.isArray(options.menus)) {
        menus = options.menus;
      } else {
        menus = defaultMenus;
      }
      var menuText = '<div class="minieditor-menu">';
      for (var i = 0; i < menus.length; i++) {
        menuText += '<div class="btn-group minieditor-menu-group" role="group">';
        for (var j = 0; j < menus[i].length; j++) {
          if (angular.isDefined(miniCommands[menus[i][j]])) {
            menuText += getMenuItem(miniCommands[menus[i][j]]);
          } else {
            console.log('Unknow command: ' + menus[i][j]);
          }
        }
        menuText += '</div>';
      }
      menuText += '</div>';
      return menuText;
    }

    function getMenuItem(commandObj) {
      switch (commandObj.type) {
        case 'button':
          return '<button ng-click="exec(\'' + commandObj.command + '\')" ng-class="{active: states[\''+commandObj.command+'\']}" type="button" class="btn btn-default" title="'+commandObj.title+'"><i class="fa fa-'+commandObj.icon+'"></i></button>';
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
})();
