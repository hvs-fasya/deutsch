(function() {
  'use strict';
  angular.module('toolbar', ['ngMaterial'])
  .controller('ToolbarCtrl',

      function ($scope, $mdSidenav, $log, $state, Auth, $mdToast) {
          $scope.title = 'Duetsch';
          $scope.signedIn = Auth.isAuthenticated;
          $scope.logout = Auth.logout;
          Auth.currentUser().then(function (user){
            $scope.user = user;
          },
            function(){
              $mdToast.show($mdToast
                          .simple()
                          .textContent('Bitte melden Sie sich an oder registrieren !!!')
                          .position('top right')
                          .hideDelay(3000)
                          .parent(document.querySelectorAll('#toast'))
                          .capsule(true)
                          );
            }
          );
          $scope.$on('devise:new-registration', function (e, user){
            $scope.user = user;
          });

          $scope.$on('devise:login', function (e, user){
            $scope.user = user;
            $mdToast.show($mdToast
                          .simple()
                          .textContent('Du bist eingeloggt !!!')
                          .position('top right')
                          .hideDelay(2000)
                          .parent(document.querySelectorAll('#toast'))
                          .capsule(true)
                          );
          });

          $scope.$on('devise:logout', function (e, user){
            $scope.user = {};
            $mdToast.show($mdToast
                          .simple()
                          .textContent('Sie wurden ausgeloggt !!!')
                          .position('top right')
                          .hideDelay(2000)
                          .parent(document.querySelectorAll('#toast'))
                          .capsule(true)
                          );
          });

          $scope.toggleLogin = buildToggler('login',$scope);
          $scope.toggleRegister = buildToggler('register',$scope);
          $scope.isOpenRegister = function(){
              return $mdSidenav('register').isOpen();
            };
          $scope.isOpenLogin = function(){
              return $mdSidenav('login').isOpen();
            };
          function buildToggler(navID,$scope) {
              return function() {
                // Component lookup should always be available since we are not using `ng-if`
                $mdSidenav(navID)
                  .toggle()
                  .then(function () {
                    $log.debug("toggle " + navID + " is done");
                  });
              }
          };
  })
  .controller('RegisterCtrl', 
    function ($scope, $mdSidenav, $log, $state, Auth) {
    $scope.$on('devise:new-registration', function (e, user){
          $scope.user = user;
      });
    $scope.$on('devise:login', function (e, user){
          $scope.user = user;
      });
    $scope.$on('devise:logout', function (e, user){
          $scope.user = {};
      });
    $scope.formHead = 'Register';
    $scope.register = function() {
        Auth.register($scope.user).then(function(){
          $log.debug("registered");
          $scope.close();
        });
      };
    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('register').close()
        .then(function () {
          $log.debug("close REGISTER is done");
        });
    };
  })
  .controller('LoginCtrl', function ($scope, $mdSidenav, $log, $state, Auth, $mdToast) {
    $scope.formHead = 'Log In';
    $scope.$on('devise:new-registration', function (e, user){
          $scope.user = user;
      });
    $scope.$on('devise:login', function (e, user){
          $scope.user = user;
      });
    $scope.$on('devise:logout', function (e, user){
          $scope.user = {};
      });
    $scope.login = function() {
        Auth.login($scope.user).then(function(){
          $log.debug("logged in");
          $scope.close();
        },
        function(){
          $mdToast.show($mdToast
                          .simple()
                          .textContent('Authentifizierung fehlgeschlagen !!!')
                          .position('top right')
                          .hideDelay(3000)
                          .parent(document.querySelectorAll('#toast'))
                          .capsule(true)
                          );
        });
      };
    // $scope.formHead = $mdSidenav('register').attr('md-component-id');
    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('login').close()
        .then(function () {
          $log.debug("close LOGIN is done");
        });
    };
  });

})();
