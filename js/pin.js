'use strict';

(function () {
  var PinSize = {
    WIDTH: 50,
    HEIGHT: 70,
    AFTER: 22,
  };

  var PinSizeMain = {
    WIDTH: 65,
    HEIGHT: 65,
    AFTER: 22,
  };

  var pinButton = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPinsContainer = document.querySelector('.map__pins');

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
      window.map.addClickEvent(pinElement, pin);
    }
    mapPinsContainer.appendChild(fragment);
  };

  window.pin = {
    PinSize: PinSize,
    PinSizeMain: PinSizeMain,
    renderPins: renderPins,
    mapPinsContainer: mapPinsContainer,
  };
})();
