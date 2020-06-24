'use strict';

(function () {
  var PlacementType = {
    PALACE: 'palace',
    FLAT: 'flat',
    HOUSE: 'house',
    BUNGALO: 'bungalo'
  };

  var TITLES = ['Уютная студия в черте города', 'Роскошные аппартаменты', 'Семейное гнездышко'];
  var TYPES = [PlacementType.PALACE, PlacementType.FLAT, PlacementType.HOUSE, PlacementType.BUNGALO];
  var TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var DESCRIPTIONS = ['Окна выходят во двор, на запад. Напротив чудесный парк. В квартире светло, но не жарко. Прямые лучи солнца попадают в окна только вечером.', 'Близко к метро. В шаговой доступности торговые центры, бары и клубы.'];

  var PriceFlat = {
    MIN: 1000,
    MAX: 5000,
  };
  var RoomFlat = {
    MIN: 1,
    MAX: 100,
  };
  var QuestFlat = {
    MIN: 1,
    MAX: 100,
  };
  var LocationVertical = {
    MIN: 130,
    MAX: 630,
  };
  var LocationHorizontal = {
    MIN: 300,
    MAX: 650,
  };

  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var getRandomItem = function (items) {
    var randomIndex = getRandomInt(0, items.length);
    return items[randomIndex];
  };

  var getRandomStrings = function (items) {
    var countElements = getRandomInt(0, items.length);
    var randomElements = [];

    for (var i = 0; i < countElements; i++) {
      randomElements.push(items[i]);
    }

    return randomElements;
  };

  var getDisplayPlacementType = function (type) {
    switch (type) {
      case PlacementType.PALACE:
        return 'Дворец';
      case PlacementType.FLAT:
        return 'Квартира';
      case PlacementType.HOUSE:
        return 'Дом';
      case PlacementType.BUNGALO:
        return 'Бунгало';
      default:
        return '';
    }
  };

  var getPin = function (index) {
    var pin = {
      author: {
        avatar: 'img/avatars/user0' + (++index) + '.png'
      },
      offer: {
        title: getRandomItem(TITLES),
        address: '600, 350',
        price: getRandomInt(PriceFlat.MIN, PriceFlat.MAX),
        type: getRandomItem(TYPES),
        rooms: getRandomInt(RoomFlat.MIN, RoomFlat.MAX),
        guests: getRandomInt(QuestFlat.MIN, QuestFlat.MAX),
        checkin: getRandomItem(TIMES),
        checkout: getRandomItem(TIMES),
        features: getRandomStrings(FEATURES),
        description: getRandomItem(DESCRIPTIONS),
        photos: getRandomStrings(PHOTOS),
      },
      location: {
        x: getRandomInt(LocationHorizontal.MIN, LocationHorizontal.MAX),
        y: getRandomInt(LocationVertical.MIN, LocationVertical.MAX)
      }
    };

    return pin;
  };

  var getPins = function (count) {
    var pins = [];

    for (var i = 0; i < count; i++) {
      var pin = getPin(i);
      pins.push(pin);
    }

    return pins;
  };
  window.data = {
    getDisplayPlacementType: getDisplayPlacementType,
    getPins: getPins,
    placementType: PlacementType,
  };
})();
