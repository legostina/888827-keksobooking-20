'use strict';

var TITLES = ['Уютная студия в черте города', 'Роскошные аппартаменты', 'Семейное гнездышко'];
var TYPES = ['place', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', "13:00", "14:00"];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PRICES_FLATS = {
  MIN: 1000,
  MAX: 5000,
}
var ROOMS_FLATS = {
  MIN: 1;
  MAX: 4;
}

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var getRandomPrices = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var getRandomQuests = function (min, max) {
  var min = (1);
  var max = (4);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var getRandomLocation = function (min, max) {
  var min = (130);
  var max = (630);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var getRandomItem = function (items) {
  var randomIndex = getRandomInt();
  return items[randomIndex];
}

// Возвращает новый объект

var getPin = function (index) {
  var pin = {
    author: {
      avatar: 'img/avatars/user0' + index + '.png'
    } ,
    offer: {
      title: getRandomItem(TITLES),
      address: '600, 350',
      price: getRandomPrices(PRICES_FLATS),
      type: getRandomItem(TYPES),
      rooms: getRandomInt(ROOMS_FLATS),
      guests: getRandomQuests(),
      checkin: getRandomItem(TIMES),
      checkout: getRandomItem(TIMES),
      features: getRandomItem(FEATURES),
      description: 'description',
      photos: getRandomItem(PHOTOS),
    },
    location: {
      x: getRandomInt(),
      y: getRandomLocation()
    }
  };

  return pin;
}

// Возвращает массив

var getPins = function (count) {
  var pins = [];

  for(var i=0; i <count; i++) {
    var pin = getPin(i);
    pins.push(pin);
  }

  return pins;
}

var pins = getPins(8);
console.log(pins);
