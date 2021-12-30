angular.module('starter.services', [])
 
  .factory('Inventory', function () {
    var inventory = [{
      id: 1,
      name: 'Скамья',
      type: 'Тяжёлая атлетика',
      season: 'Зима',
      availability: true,
      cost: 1000,
      img: 'img/bench.jpg'
    }, {
      id: 2,
      name: 'Гантели',
      type: 'Тяжёлая атлетика',
      season: 'Лето',
      availability: false,
      cost: 3000,
      img: 'img/dumbbells.jpg'
    }, {
      id: 3,
      name: 'Тренажёры',
      type: 'Лёгкая атлетика',
      season: 'Зима',
      availability: true,
      cost: 2000,
      img: 'img/trainer.png'
    }, {
      id: 4,
      name: 'Штанги',
      type: 'Тяжёлая атлетика',
      season: 'Лето',
      availability: false,
      cost: 6000,
      img: 'img/barbell.jpg'
    }, {
      id: 5,
      name: 'Ремни',
      type: 'Лёгкая атлетика',
      season: 'Лето',
      availability: false,
      cost: 500,
      img: 'img/belts.jpg'
    }];

    return {
      all: function () {
        return inventory;
      },
      remove: function (inv) {
        inventory.splice(inventory.indexOf(inv), 1);
      },
      
      get: function (invId) {
        return inventory.find(el => el.id === parseInt(invId));
      }
    };
  });
