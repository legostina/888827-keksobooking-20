'use strict';

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
    case PlacementType.PALACE: return 'Дворец';
    case PlacementType.FLAT: return 'Квартира';
    case PlacementType.HOUSE: return 'Дом';
    case PlacementType.BUNGALO: return 'Бунгало';
    default: return '';
  }
};
