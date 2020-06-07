'use strict';

var TITLES = ['Уютная студия в черте города', 'Роскошные аппартаменты', 'Семейное гнездышко'];
var TYPES = ['place', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', "13:00", "14:00"];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var DESCRIPTIONS = ['Окна выходят во двор, на запад. Напротив чудесный парк. В квартире светло, но не жарко. Прямые лучи солнца попадают в окна только вечером.', 'Близко к метро. В шаговой доступности торговые центры, бары и клубы.'];
var PriceFlat = {
  MIN: 1000,
  MAX: 5000,
}
var RoomFlat = {
  MIN: 1,
  MAX: 4,
}
var QuestFlat = {
  MIN: 1,
  MAX: 5,
}
var LocationVertical = {
  MIN: 130,
  MAX: 630,
}
var LocationHorizontal = {
  MIN: 10,
  MAX: 200,
}
var PIN_WIDTH = 40;
var PIN_HEIGHT = 40;

// var map = element.getBoundingClientRect();

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var getRandomItem = function (items) {
  var randomIndex = getRandomInt(0, items.length);
  return items[randomIndex];
}

var getPin = function (index) {
  var pin = {
    author: {
      avatar: 'img/avatars/user0' + (++index) + '.png'
    } ,
    offer: {
      title: getRandomItem(TITLES),
      address: '600, 350',
      price: getRandomInt(PriceFlat.MIN, PriceFlat.MAX),
      type: getRandomItem(TYPES),
      rooms: getRandomInt(RoomFlat.MIN, RoomFlat.MAX),
      guests: getRandomInt(QuestFlat.MIN, QuestFlat.MAX),
      checkin: getRandomItem(TIMES),
      checkout: getRandomItem(TIMES),
      features: getRandomItem(FEATURES),
      description: getRandomItem(DESCRIPTIONS),
      photos: getRandomItem(PHOTOS),
    },
    location: {
      x: getRandomInt(LocationHorizontal.MIN, LocationHorizontal.MAX),
      y: getRandomInt(LocationVertical.MIN, LocationVertical.MAX)
    }
  };

  return pin;
}

var getPins = function (count) {
  var pins = [];

  for(var i=0; i <count; i++) {
    var pin = getPin(i);
    pins.push(pin);
  }

  return pins;
}

var pinTemplate = document.querySelector('#pin');
var mapPinsContainer = document.querySelector('.map__pins');

var renderPin = function (pin) {
  var pinButton = pinTemplate.content;
  var buttonElement = pinButton.cloneNode(true);

  buttonElement.querySelector('img').src = pin.author.avatar;
  buttonElement.querySelector('img').alt = pin.offer.title;
  buttonElement.querySelector('img').style.top = pin.location.x + PIN_WIDTH + 'px';
  buttonElement.querySelector('img').style.left = pin.location.y + PIN_HEIGHT + 'px';

  return buttonElement;
}

var renderPins = function(pins) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(renderPin(pins[i]));
  }
  mapPinsContainer.appendChild(fragment);
}

var pins = getPins(8);
console.log(pins);

renderPins(pins);
