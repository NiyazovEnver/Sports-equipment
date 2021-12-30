angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.filters'])
  .run(function ($ionicPlatform, $state, $rootScope) {
    $rootScope.redirectTo = function (state, fields) {
      $state.go(state, fields);
    }
    $ionicPlatform.ready(function () {
      if (window.cordova && window.Keyboard) {
        window.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
    $stateProvider

      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })

      .state('tab.contacts', {
        url: '/contacts',
        views: {
          'tab-contacts': {
            templateUrl: 'templates/tab-contacts.html',
            controller: 'ContactsCtrl'
          }
        }
      })

      .state('tab.inventory', {
        url: '/inventory',
        views: {
          'tab-inventory': {
            templateUrl: 'templates/tab-inventory.html',
            controller: 'InventoryCtrl'
          }
        }
      })
      .state('tab.inventory-detail', {
        url: '/inventory/:invId',
        views: {
          'tab-inventory': {
            templateUrl: 'templates/inventory-detail.html',
            controller: 'InventoryDetailCtrl'
          }
        }
      })

      .state('tab.reservedList', {
        url: '/reservedList',
        views: {
          'tab-reservedList': {
            templateUrl: 'templates/tab-reservedList.html',
            controller: 'reservedListCtrl'
          }
        }
      });


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/inventory');

  });
