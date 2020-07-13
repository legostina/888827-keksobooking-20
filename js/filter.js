'use strict';

(function () {
  var formContainer = document.querySelector('.map__filters');
  var houseType = document.querySelector('#housing-type');

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

  var filterPins = function () {
    var filteredPins = getFilteredPins();
    window.pin.deletePins();
    window.card.removePopup();
    window.pin.renderPins(filteredPins);
  };

  var getFilteredPins = function () {
    var filteredPins = pins.filter(filterPinsByHouseType);

    if (filteredPins.length > MAX_PINS_COUNT) {
      return filteredPins.slice(0, MAX_PINS_COUNT);
    }
    return filteredPins;
  };

  var addFormEvent = function () {
    formContainer.addEventListener('change', function () {
      filterPins();
    });
  };

  window.filter = {
    initialize: initialize
  };
})();
