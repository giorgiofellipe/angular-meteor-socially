import angular from 'angular';
import angularMeteor from 'angular-meteor';

angular.module('socially', [
  angularMeteor
])

//AS CONTROLLER
.controller('PartiesListCtrl', ['$scope', '$reactive', function($scope, $reactive) {
  'ngInject';

  $reactive(this).attach($scope);

  this.helpers({
    parties() {
      return Parties.find({});
    }
  });
}]);
