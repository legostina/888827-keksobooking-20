'use strict';

(function () {
  var PlacementType = {
    PALACE: 'palace',
    FLAT: 'flat',
    HOUSE: 'house',
    BUNGALO: 'bungalo'
  };
  var LocationVertical = {
    MIN: 130,
    MAX: 630,
  };
  var UserClick = {
    ENTER: 'Enter',
    ESCAPE: 'Escape',
    LEFT_MOUSE: 0
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
  window.util = {
    getDisplayPlacementType: getDisplayPlacementType,
    placementType: PlacementType,
    LocationVertical: LocationVertical,
    UserClick: UserClick
  };
})();
