'use strict';

(function () {
  var formContainer = document.querySelector('.map__filters');
  var houseType = document.querySelector('#housing-type');
  var houseRoom = document.querySelector('#housing-rooms');
  var houseGuest = document.querySelector('#housing-guests');
  var housePrice = document.querySelector('#housing-price');
  var mapFilters = document.querySelector('.map__filters');

  var PlacementPrice = {
    ANY: 'any',
    MIDDLE: 'middle',
    LOW: 'low',
    HIGH: 'high'
  };

  var QuantityRooms = {
    ANY: 'any',
    ONE: 1,
    TWO: 2,
    THREE: 3
  };

  var QuantityGuest = {
    ANY: 'any',
    ONE: 2,
    TWO: 1,
    THREE: 0
  };

  var PriceScope = {
    LOW: 10000,
    HIGH: 50000
  };

  var MAX_PINS_COUNT = 5;
  var pins = null;

  var initialize = function (items) {
    pins = items;
    addFormEvent();
    filterPins();
  };

  var filterPinsByHouseType = function (pin) {
    return houseType.value === window.util.placementType.ANY || pin.offer.type === houseType.value;
  };

  var filterPinsByHouseRoom = function (pin) {
    return houseRoom.value === QuantityRooms.ANY || pin.offer.rooms == houseRoom.value;
  };

  var filterPinsByHouseGuest = function (pin) {
    return houseGuest.value === QuantityGuest.ANY || pin.offer.guests == houseGuest.value;
  };

  var filterPinsByHousePrice = function (pin) {
    switch (housePrice.value) {
      case PlacementPrice.LOW:
        return pin.offer.price < PriceScope.LOW;
      case PlacementPrice.HIGH:
        return pin.offer.price > PriceScope.HIGH;
      case PlacementPrice.MIDDLE:
        return pin.offer.price >= PriceScope.LOW && pin.offer.price <= PriceScope.HIGH;
      default:
        return true;
    }
  };

  var filterPinsByHouseFeatures = function (pin) {
    var checkedFeatures = mapFilters.querySelectorAll('input:checked');

    return Array.from(checkedFeatures).every(function (element) {
      return pin.offer.features.includes(element.value);
    });
  };

  var filterPins = function () {
    window.pin.deletePins();
    window.card.removePopup();
    window.pin.renderPins(getFilteredPins());
  };

  var getFilteredPins = function () {
    var filteredPins = pins.filter(filterPinsByHouseType).filter(filterPinsByHousePrice).filter(filterPinsByHouseRoom).filter(filterPinsByHouseGuest).filter(filterPinsByHouseFeatures);

    if (filteredPins.length > MAX_PINS_COUNT) {
      return filteredPins.slice(0, MAX_PINS_COUNT);
    }
    return filteredPins;
  };

  var addFormEvent = function () {
    formContainer.addEventListener('change', window.debounce(function () {
      filterPins();
    }));
  };

  window.filter = {
    initialize: initialize
  };
})();
