'use strict';
angular.module('minieditor', []).directive('minieditor', function($compile, minieditorUI) {

  function controller ($scope) {
  }

  function link($scope, $element, $attrs, $ctrl) {
    $element.html(minieditorUI.getTemplate($scope.theme));
    $compile($element.contents())($scope);

    var editor = $element.find('div.minieditor-content');

    // Model -> View
    $ctrl.$render = function() {
      editor.html($ctrl.$viewValue);
    };

    // View -> Model
    editor.on('input keyup paste mouseup', function(event) {
      var content = editor.html();
      if (content == '<br>') {
        content = '';
      }
      $ctrl.$setViewValue(content);
    });

  }

  return {
    template: '<div id="{{id}}" class="{{class}} minieditor minieditor-{{theme}}"></div>',
    restrict: 'E',
    scope: {
      value: '=ngModel',
      theme: '@miniTheme',
      id: '@miniId',
      'class': '@miniClass',
      width: '@miniWidth',
      height: '@miniHeight'
    },
    replace: true,
    require: 'ngModel',
    link: link,
    controller: controller
  };
}).factory('minieditorUI', function() {

  function getBootstarpTemplate() {
    var menu = '<div class="minieditor-menu"></div>';
    var content = '<div contenteditable="true" class="minieditor-content" ng-attr-style="height:{{height || \'100px\'}};"></div>';
    return menu + content;
  }

  function getSemanticTemplate() {
    return 'semantic';
  }

  function getTemplate(theme) {
    if (!angular.isDefined(theme)) {
      theme = 'bootstarp';
    }
    switch (theme) {
      case 'bootstrap':
        return getBootstarpTemplate();
        break;
      case 'semantic':
        return getSemanticTemplate();
        break;
      default :
        return getBootstarpTemplate();
    }
  }

  return {
    getTemplate: getTemplate
  };
});
