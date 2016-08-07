(function() {
  'use strict';
  angular.module('navbar', ['ngMaterial'])
      .controller('NavbarCtrl', NavbarCtrl);
  function NavbarCtrl($scope) {
    $scope.currentNavItem = 'page1';
    $scope.test = 'TEST!!!';
  }
})();