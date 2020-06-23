'use strict';

(function () {
  var mapContainer = document.querySelector('.map');
  var buttonHome = document.querySelector('.map__pin--main');
  var formContainer = document.querySelector('.ad-form');
  var addressInput = document.querySelector('#address');
  var UserClick = {
    ENTER: 'Enter',
    ESCAPE: 'Escape',
    LEFT_MOUSE: 0
  };

  var isPageActive = false;

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

  var activatePage = function () {
    isPageActive = true;
    mapContainer.classList.remove('map--faded');
    formContainer.classList.remove('ad-form--disabled');
    window.pin.renderPins(window.data.pins);
    setOfferAddress();
    window.form.changeFormState();
  };

  var initEvents = function () {
    buttonHome.addEventListener('mousedown', function (evt) {
      if (evt.button === UserClick.LEFT_MOUSE) {
        evt.preventDefault();
        activatePage();
      }
    });

    buttonHome.addEventListener('keydown', function (evt) {
      if (evt.key === UserClick.ENTER) {
        evt.preventDefault();
        activatePage();
      }
    });
  };

  var setOfferAddress = function () {
    var x = 0;
    var y = 0;

    if (isPageActive) {
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

  startPage();
  initEvents();
  window.map = {
    mapContainer: mapContainer,
    formContainer: formContainer,
    isPageActive: isPageActive,
    addClickEvent: addClickEvent,
    addCloseEvents: addCloseEvents,
  };
})();
