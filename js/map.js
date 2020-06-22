'use strict';

var mapContainer = document.querySelector('.map');
var buttonHome = document.querySelector('.map__pin--main');
var formContainer = document.querySelector('.ad-form');
var UserClick = {
  ENTER: 'Enter',
  ESCAPE: 'Escape',
  LEFT_MOUSE: 0
};

var addClickEvent = function (pinElement, pin) {
  pinElement.addEventListener('click', function (evt) {
    evt.preventDefault();
    renderPopup(pin);
  });
};

var addCloseEvents = function () {
  var closeButton = popupElement.querySelector('.popup__close');

  closeButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (evt.button === UserClick.LEFT_MOUSE) {
      removePopup(closeButton);
    }
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.key === UserClick.ESCAPE) {
      evt.preventDefault();
      removePopup();
    }
  });
};

var activatePage = function () {
  isPageActive = true;
  mapContainer.classList.remove('map--faded');
  formContainer.classList.remove('ad-form--disabled');
  renderPins(pins);
  setOfferAddress();
  changeFormState();
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

var startPage = function () {
  changeFormState();
  setOfferAddress();
  minimalType();
  validateCapacity();
  validateTitle();
  validateType();
  validatePrice();
  checkTimes(timeinSelect);
};

var pins = getPins(8);
startPage();
initEvents();
