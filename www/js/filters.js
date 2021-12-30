angular.module('starter.filters', [])
    .filter('sortFilter', function () {

        return function (inventoryList, option) {
            let list = inventoryList.map(el => el);
            switch (option) {
                case 'Умолчанию':
                    return inventoryList;

                case 'Дешевле':
                    return list.sort((a, b) => a.cost - b.cost)

                case 'Дороже':
                    return list.sort((a, b) => b.cost - a.cost);

                case 'Типу':
                    return list
                        .filter(el => el.type == "Лёгкая атлетика")
                        .concat(list.filter(el => el.type == "Тяжёлая атлетика"));

                case 'Сезонности':
                    return list
                        .filter(el => el.season == "Лето")
                        .concat(list.filter(el => el.season == "Зима"));

                case 'Наличию':
                    return list.filter(el => el.availability);
            }
        }
    })