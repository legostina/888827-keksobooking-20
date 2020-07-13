'use strict';

(function () {
  var PinSize = {
    WIDTH: 50,
    HEIGHT: 70,
    AFTER: 22,
    HALF_WIDTH: 25
  };

  var PinSizeMain = {
    WIDTH: 65,
    HEIGHT: 65,
    AFTER: 22,
    HALF_WIDTH: 32.5,
    HALF_HEIGHT: 32.5
  };

  var pinButton = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPinsContainer = document.querySelector('.map__pins');

  var renderPin = function (pin) {
    var buttonElement = pinButton.cloneNode(true);

    buttonElement.style.top = pin.location.y - PinSize.HALF_WIDTH + 'px';
    buttonElement.style.left = pin.location.x - PinSize.HEIGHT + 'px';

    buttonElement.querySelector('img').src = pin.author.avatar;
    buttonElement.querySelector('img').alt = pin.offer.title;

    return buttonElement;
  };

  var pinItems = null;

  var renderPins = function (pins) {
    pinItems = [];

    var fragment = document.createDocumentFragment();
    pins.forEach(function (pin, index) {
      var pinElement = renderPin(pin);
      fragment.appendChild(pinElement);

      pinItems.push(pinElement);

      pinElement.tabIndex = index + 1;
      window.card.addClickEvent(pinElement, pin);
    });
    mapPinsContainer.appendChild(fragment);
  };

  var deletePins = function () {
    if (pinItems !== null) {
      pinItems.forEach(function (pin) {
        pin.remove();
      });
      pinItems = null;
    }
  };

  window.pin = {
    PinSizeMain: PinSizeMain,
    renderPins: renderPins,
    deletePins: deletePins
  };
})();
