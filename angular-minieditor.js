/**
 * Angular minieditor
 * Code licensed under the MIT License:
 * https://github.com/jerryhsia/angular-minieditor/blob/master/LICENSE
 *
 * @version 1.0.1
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
    },
    fontsize: {
      command: 'fontsize',
      type: 'button',
      title: 'Font size',
      icon: 'text-height',
      arg: true,
      promptTitle: 'Enter the number of 1-7',
      defaultValue: 3,
      filter: function(value) {
        value = value ? parseInt(value) : false;
        if (!(value >= 1 && value <= 7)) {
          value = 2;
        }
        return value;
      }
    },
    createlink: {
      command: 'createlink',
      type: 'button',
      title: 'Create link',
      icon: 'link',
      arg: true,
      promptTitle: 'Enter the link url',
      defaultValue: 'http://',
      filter: function(value) {
        return value;
      }
    },
    insertimage: {
      command: 'insertimage',
      type: 'button',
      title: 'Insert image',
      icon: 'image',
      arg: true,
      promptTitle: 'Enter the image url',
      defaultValue: 'http://',
      filter: function(value) {
        return value;
      }
    }
  };

  var defaultMenus = [
    ['bold', 'italic', 'underline', 'strikethrough'],
    ['fontsize'],
    ['justifyleft', 'justifycenter', 'justifyright'],
    ['insertunorderedlist', 'insertorderedlist'],
    ['indent', 'outdent'],
    ['removeformat', 'createlink', 'insertimage']
  ];

  angular.module('jerryhsia.minieditor', []).directive('minieditor', function($compile, $timeout, minieditorUI) {
    function link($scope, $element, $attrs, $ctrl) {
      if (!angular.isDefined($scope.options) || !angular.isObject($scope.options)) {
        $scope.options = {};
      }
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

      function getCommandState(command) {
        return document.queryCommandState(command);
      }

      function getCommandValue(command) {
        return document.queryCommandValue(command);
      }

      function isTag(tag) {
        var selection = window.getSelection().getRangeAt(0);
        if (selection) {
          if (selection.startContainer.parentNode.tagName === tag.toUpperCase()
            || selection.endContainer.parentNode.tagName === tag.toUpperCase()
          ) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }

      $scope.states = {};
      var refreshing = false;
      function refreshState() {
        if (refreshing) return;
        refreshing = true;
        angular.forEach(miniCommands, function(commandObj, command) {
          if (commandObj.arg) {
            var value = getCommandValue(command);
            if (command == 'createlink') {
              value = isTag('a');
            }

            if (value) {
              $scope.states[command] = value;
            } else {
              delete $scope.states[command];
            }
          } else {
            var state = getCommandState(command);
            if (state) {
              $scope.states[command] = state;
            } else {
              delete $scope.states[command];
            }
          }
        });
        refreshing = false;
      }

      $scope.exec = function(command) {
        var commandObj = miniCommands[command];
        if (commandObj.arg) {
          $timeout(function() {
            var defaultValue = getCommandValue(command);
            if (!defaultValue) {
              defaultValue = commandObj.defaultValue;
            }
            var value = prompt(commandObj.promptTitle, defaultValue);
            if (value && value.length > 0) {
              value = commandObj.filter(value);
              document.execCommand(command, false, value);
              refreshState();
            }
          }, 50);
        } else {
          document.execCommand(command, false, null);
          refreshState();
        }
      };

      editor.on('click keyup focus mouseup blur', function() {
        $timeout(function() {
          refreshState();
        }, 50);
      });
    }

    return {
      template: '<div id="{{options.id}}" class="{{options.class}} minieditor" ng-attr-style="width:{{options.width? options.width + \'px\':\'100%\'}};"></div>',
      restrict: 'E',
      scope: {
        value: '=ngModel',
        options: '=options'
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
          return '<button ng-click="exec(\'' + commandObj.command + '\')" ng-class="{active: states[\''+commandObj.command+'\']}" type="button" class="btn btn-default" title="'+commandObj.title+'" unselectable="on"><i class="fa fa-'+commandObj.icon+'"></i></button>';
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
