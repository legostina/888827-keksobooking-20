'use strict';

(function () {
  var PinSize = {
    WIDTH: 50,
    HEIGHT: 70,
    AFTER: 22,
    HALF_WIDTH: 25
  };

  var pinButton = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPinsContainer = document.querySelector('.map__pins');

  var getElement = function (pin) {
    var buttonElement = pinButton.cloneNode(true);

    buttonElement.style.top = pin.location.y - PinSize.HALF_WIDTH + 'px';
    buttonElement.style.left = pin.location.x - PinSize.HEIGHT + 'px';

    buttonElement.querySelector('img').src = pin.author.avatar;
    buttonElement.querySelector('img').alt = pin.offer.title;

    return buttonElement;
  };

  var pinItems = null;

  var render = function (pins) {
    pinItems = [];

    var fragment = document.createDocumentFragment();
    pins.forEach(function (pin, index) {
      var pinElement = getElement(pin);
      fragment.appendChild(pinElement);

      pinItems.push(pinElement);

      pinElement.tabIndex = index + 1;
      window.card.addClickEvent(pinElement, pin);
    });
    mapPinsContainer.appendChild(fragment);
  };

  var remove = function () {
    if (pinItems !== null) {
      pinItems.forEach(function (pin) {
        pin.remove();
      });
      pinItems = null;
    }
  };

  window.pin = {
    render: render,
    remove: remove
  };
})();
