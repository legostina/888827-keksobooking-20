'use strict';

(function () {
  var ANY_VALUE = 'any';
  var MAX_PINS_COUNT = 5;

  var formContainer = document.querySelector('.map__filters');
  var houseType = document.querySelector('#housing-type');
  var houseRoom = document.querySelector('#housing-rooms');
  var houseGuest = document.querySelector('#housing-guests');
  var housePrice = document.querySelector('#housing-price');
  var mapFilters = document.querySelector('.map__filters');

  var PlacementPrice = {
    MIDDLE: 'middle',
    LOW: 'low',
    HIGH: 'high'
  };

  var PriceScope = {
    LOW: 10000,
    HIGH: 50000
  };

  var pins = null;

  var initialize = function (items) {
    pins = items;
    addFormEvent();
    applyFilter();
  };

  var filterByHouseType = function (pin) {
    return houseType.value === ANY_VALUE || pin.offer.type === houseType.value;
  };

  var filterByHouseRoom = function (pin) {
    return houseRoom.value === ANY_VALUE || pin.offer.rooms === +houseRoom.value;
  };

  var filterByHouseGuest = function (pin) {
    return houseGuest.value === ANY_VALUE || pin.offer.guests === +houseGuest.value;
  };

  var filterByHousePrice = function (pin) {
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

  var filterByHouseFeatures = function (pin) {
    var checkedFeatures = mapFilters.querySelectorAll('input:checked');

    return Array.from(checkedFeatures).every(function (element) {
      return pin.offer.features.includes(element.value);
    });
  };

  var applyFilter = function () {
    window.pin.remove();
    window.card.removePopup();
    window.pin.render(getFilteredPins());
  };

  var getFilteredPins = function () {
    var filteredPins = pins.filter(filterByHouseType).filter(filterByHousePrice).filter(filterByHouseRoom).filter(filterByHouseGuest).filter(filterByHouseFeatures);

    if (filteredPins.length > MAX_PINS_COUNT) {
      return filteredPins.slice(0, MAX_PINS_COUNT);
    }
    return filteredPins;
  };

  var addFormEvent = function () {
    formContainer.addEventListener('change', window.debounce(function () {
      applyFilter();
    }));
  };

  var reset = function () {
    formContainer.reset();
  };

  window.filter = {
    initialize: initialize,
    reset: reset
  };
})();
