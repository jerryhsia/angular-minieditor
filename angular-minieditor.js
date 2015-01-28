'use strict';
angular.module('minieditor', []).directive('minieditor', function($compile, minieditorUI) {

  function controller ($scope) {
    if (!angular.isObject($scope.options)) {
      $scope.options = {};
    }
    if (!angular.isDefined($scope.options.theme)) {
      $scope.options.theme = 'bootstrap';
    }
    
  }

  function link($scope, $element, $attrs, $ctrl) {
    $element.html(minieditorUI.getTemplate($scope.options));
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

  function getBootstarpTemplate() {
    var menu = '<div class="minieditor-menu"></div>';
    var content = '<div contenteditable="true" class="minieditor-content" ng-attr-style="height:{{options.height? options.height + \'px\':\'100px\'}};"></div>';
    return menu + content;
  }

  function getSemanticTemplate() {
    return 'semantic';
  }

  function getTemplate(options) {
    switch (options.theme) {
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
