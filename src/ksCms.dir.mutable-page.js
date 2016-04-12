(function () {
  'use strict';
  angular.module('ks.cms')

  .directive('ksCmsMutablePage', ['$compile', function ($compile) {
    return {
      restrict: 'A',
      link: function ($scope, ele, attr, ctrl) {
        var toInput = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
        var toTextArea = ['p', 'code', 'pre'];

        if (!attr.editable) {
          return;
        }

        function replace(tag, replaceWith) {
          var elements;
          var inputs;
          tag = Array.isArray(tag) ? tag.join(', ') : tag;
          inputs = document.querySelectorAll(tag);
          [].forEach.call(inputs, function (input) {
            var element = angular.element(input);
            var bound = element.attr('ng-bind');
            var replacement = angular.element(replaceWith)
              .attr('ng-model', bound);
            element.replaceWith($compile(replacement)($scope));
          });
        }

        replace(toInput, '<input type="input" />')
        replace(toTextArea, '<textarea></textarea>')
      }
    };
  }]);
})();
