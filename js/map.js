'use strict';

(function () {
  var mapContainer = document.querySelector('.map');
  var buttonHome = document.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');
  var UserClick = {
    ENTER: 'Enter',
    ESCAPE: 'Escape',
    LEFT_MOUSE: 0
  };

  var addClickEvent = function (pinElement, pin) {
    pinElement.addEventListener('click', function (evt) {
      evt.preventDefault();
      window.card.renderPopup(pin);
    });
  };

  var addCloseEvents = function () {
    var closeButton = window.card.popupElement.querySelector('.popup__close');

    closeButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      if (evt.button === UserClick.LEFT_MOUSE) {
        window.card.removePopup(closeButton);
      }
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.key === UserClick.ESCAPE) {
        evt.preventDefault();
        window.card.removePopup();
      }
    });
  };

  var activatePage = function (pins) {
    window.form.isPageActive = true;
    mapContainer.classList.remove('map--faded');
    window.form.formContainer.classList.remove('ad-form--disabled');
    window.pin.renderPins(pins);
    setOfferAddress();
    window.form.changeFormState();
  };

  var initEvents = function (pins) {
    buttonHome.addEventListener('mousedown', function (evt) {
      if (evt.button === UserClick.LEFT_MOUSE) {
        evt.preventDefault();
        activatePage(pins);
      }
    });

    buttonHome.addEventListener('keydown', function (evt) {
      if (evt.key === UserClick.ENTER) {
        evt.preventDefault();
        activatePage(pins);
      }
    });
  };

  var setOfferAddress = function () {
    var x = 0;
    var y = 0;

    if (window.form.isPageActive) {
      x = buttonHome.offsetLeft + buttonHome.offsetWidth / 2;
      y = buttonHome.offsetTop + buttonHome.offsetHeight + window.pin.PinSize.AFTER;

    } else {
      x = buttonHome.offsetLeft + buttonHome.offsetWidth / 2;
      y = buttonHome.offsetTop + buttonHome.offsetHeight / 2;
    }
    addressInput.value = x + ', ' + y;
  };

  var startPage = function () {
    window.form.changeFormState();
    setOfferAddress();
    window.form.minimalType();
    window.form.validateCapacity();
    window.form.validateTitle();
    window.form.validateType();
    window.form.validatePrice();
    window.form.checkTimes(window.form.timeinSelect);
  };

  window.map = {
    mapContainer: mapContainer,
    addClickEvent: addClickEvent,
    addCloseEvents: addCloseEvents,
    startPage: startPage,
    initEvents: initEvents
  };
})();
