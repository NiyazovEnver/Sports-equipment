angular.module('starter.controllers', ['ionic'])

  .controller('ContactsCtrl', function ($scope) {
    $scope.status = true;
  })

  .controller('InventoryCtrl', function ($scope, Inventory) {
    $scope.inventory = Inventory.all();
    $scope.currentOption = 'Умолчанию';

    $scope.changeSelect = function (select) {
      $scope.currentOption = select;
    }
  })

  .controller('InventoryDetailCtrl', function ($scope, $stateParams, Inventory, $rootScope, $ionicPopup) {
    $scope.$on('$ionicView.beforeEnter', () => {
      $scope.inv = Inventory.get($stateParams.invId);
      $scope.visible = true;
      $scope.data = {
        id: $scope.inv.id,
        name: $scope.inv.name,
        img: $scope.inv.img,
        fullName: '',
        phone: '',
        startDate: '',
        endDate: ''
      };
    });

    $scope.clearForm = function () {
      $scope.data = {
        id: $scope.inv.id,
        name: $scope.inv.name,
        img: $scope.inv.img,
        fullName: '',
        phone: '',
        startDate: '',
        endDate: ''
      };
    }

    $scope.toggleReserve = function () {
      $scope.visible = !$scope.visible;
    }

    $scope.showAlert = function () {
      $ionicPopup.alert({
        title: 'Вы забронировали: ' + $scope.data.name,
        template: 'Нажмите OK для продолжения'
      });
    };

    $scope.onSubmit = function () {
      let jsonItemsList = localStorage.getItem("allReserveItem");
      $rootScope.reserveItem = jsonItemsList ? JSON.parse(jsonItemsList) : [];
 
      $rootScope.reserveItem.push($scope.data);
      localStorage.setItem("allReserveItem", JSON.stringify($rootScope.reserveItem));
      $scope.showAlert();
      $scope.toggleReserve();
      $scope.clearForm();
      $scope.reservedDates = getReserveDates($scope.data.id);
    }

    const getReserveDates = function (id) {
      let jsonReservedItems = localStorage.getItem("allReserveItem");
      let reservedItems = JSON.parse(jsonReservedItems);

      if (!Array.isArray(reservedItems)) {
        return [];
      }
      let reservedDates = reservedItems
        .filter(el => el.id == id)
        .map(el => {
          return {
            start: new Date(el.startDate).toLocaleDateString(),
            end: new Date(el.endDate).toLocaleDateString()
          }
        })
      return reservedDates;
    }

    $scope.$on('$ionicView.beforeEnter', () => {
      $scope.reservedDates = getReserveDates($scope.data.id);
    });

    $scope.checkField = function () {
      return !($scope.data.fullName && $scope.data.phone && $scope.data.startDate && $scope.data.endDate);
    }

    $scope.accessReserve = function () {
      let jsonItemsList = localStorage.getItem("allReserveItem");
      $rootScope.reserveItem = jsonItemsList ? JSON.parse(jsonItemsList) : [];

      let start, end, currentStartDate, currentEndDate;
      $rootScope.reserveItem.forEach(function (el) {
        if (el.id == $scope.data.id) {
          currentStartDate = Date.parse($scope.data.startDate);
          currentEndDate = Date.parse($scope.data.endDate);
          start = Date.parse(el.startDate);
          end = Date.parse(el.endDate)
        }
      })
      return (start <= currentStartDate && currentStartDate <= end) || (start <= currentEndDate && currentEndDate <= end) || (currentStartDate <= start && currentEndDate >= end);
    }

    $scope.checkingDateSequence = function () {
      let currentStartDate = Date.parse($scope.data.startDate);
      let currentEndDate = Date.parse($scope.data.endDate);

      return currentStartDate > currentEndDate;
    }

    $scope.checkingCurrentDate = function () {
      let currentStartDate = Date.parse(new Date($scope.data.startDate).toDateString());
      let currentDate = Date.parse(new Date().toDateString());
 
      return currentStartDate < currentDate;
    }

    $scope.isButtonDisabled = function () {
      return $scope.accessReserve() || $scope.checkField() || $scope.checkingCurrentDate() || $scope.checkingDateSequence();
    }
  })

  .controller('reservedListCtrl', function ($scope) {
    $scope.$on('$ionicView.beforeEnter', () => {
      let jsonItemsList = localStorage.getItem("allReserveItem");
      let itemsArr = jsonItemsList ? JSON.parse(jsonItemsList) : [];

      itemsArr.forEach(el => {
        el.startDate = new Date(el.startDate).toLocaleDateString();
        el.endDate = new Date(el.endDate).toLocaleDateString();
      })
      $scope.array = itemsArr;
    });

    $scope.remove = function (index) {
      $scope.array.splice(index, 1)
      localStorage.setItem("allReserveItem", JSON.stringify($scope.array));
    }
  });