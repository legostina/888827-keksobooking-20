'use strict';

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
var PinSize = {
  WIDTH: 50,
  HEIGHT: 70,
  AFTER: 22,
};

var pinButton = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPinsContainer = document.querySelector('.map__pins');

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

var renderPin = function (pin) {
  var buttonElement = pinButton.cloneNode(true);

  buttonElement.style.top = pin.location.x - PinSize.WIDTH / 2 + 'px';
  buttonElement.style.left = pin.location.y - PinSize.HEIGHT + 'px';

  buttonElement.querySelector('img').src = pin.author.avatar;
  buttonElement.querySelector('img').alt = pin.offer.title;

  return buttonElement;
};

var renderPins = function (pins) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    var pin = pins[i];
    var pinElement = renderPin(pin);
    fragment.appendChild(pinElement);

    pinElement.tabIndex = i + 1;
    addClickEvent(pinElement, pin);
  }
  mapPinsContainer.appendChild(fragment);
};
