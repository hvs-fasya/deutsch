
	angular
            .module('deutsch', ['ui.router', 'templates', 'Devise','ngMaterial',
            											'navbar',
            											'toolbar',
            											'auth'])
            .config(
              function($mdThemingProvider, $mdIconProvider){
                  $mdIconProvider
                      .defaultIconSet("./assets/svg/avatars.svg", 128)
                      .icon("clear"       , "./assets/svg/clear.svg"        , 24)
                      .icon("menu"       , "./assets/svg/menu.svg"        , 24)
                      .icon("share"      , "./assets/svg/share.svg"       , 24)
                      .icon("google_plus", "./assets/svg/google_plus.svg" , 512)
                      .icon("hangouts"   , "./assets/svg/hangouts.svg"    , 512)
                      .icon("twitter"    , "./assets/svg/twitter.svg"     , 512)
                      .icon("phone"      , "./assets/svg/phone.svg"       , 512);

                  $mdThemingProvider.theme('default')
                      .primaryPalette('teal')
                      .accentPalette('pink')
                      .warnPalette('deep-orange')
                      .backgroundPalette('grey');

              })
            .config([
                  '$stateProvider',
                  '$urlRouterProvider',
                  function($stateProvider, $urlRouterProvider) {

                    $stateProvider
                      .state('home', {
                        url: '/',
                        // templateUrl: '/h',
                        controller: 'MainCtrl'
                      })
                      .state('login', {
                        url: '/',
                        // templateUrl: 'auth/_login.html',
                        controller: 'ToolbarCtrl'
                      })
                      .state('register', {
                        url: '/',
                        // templateUrl: 'auth/_register.html',
                        controller: 'ToolbarCtrl'
                      });

                    $urlRouterProvider.otherwise('home');
              }])
            .controller('MainCtrl', [
          				'$scope',
          				function($scope){

          				}]);