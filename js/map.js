'use strict';

(function () {
  var mapContainer = document.querySelector('.map');
  var mapOverlay = document.querySelector('.map__overlay');
  var mapPin = document.querySelector('.map-pin');
  var mapPinMain = document.querySelector('.map__pin--main');
  var UserClick = {
    ENTER: 'Enter',
    ESCAPE: 'Escape',
    LEFT_MOUSE: 0
  };
  var PinMainDefault = {
    LEFT: 970,
    TOP: 375
  };
  var MIN_MOVE_LEFT = 0;
  var LimitsMoving = {
    MIN_LEFT: MIN_MOVE_LEFT - window.pin.PinSizeMain.HALF_WIDTH,
    MAX_RIGHT: mapOverlay.getBoundingClientRect().width - window.pin.PinSizeMain.HALF_WIDTH,
    MIN_TOP: window.util.LocationVertical.MIN - (window.pin.PinSizeMain.HEIGHT + window.pin.PinSizeMain.AFTER),
    MAX_BOTTOM: window.util.LocationVertical.MAX - (window.pin.PinSizeMain.HEIGHT + window.pin.PinSizeMain.AFTER),
  };

  var activatePage = function () {
    window.form.changePageActive(true);
    window.form.changeFormValidation();
    mapContainer.classList.remove('map--faded');
    window.form.formContainer.classList.remove('ad-form--disabled');
    window.backend.load(window.pin.renderPins);
    setOfferAddress();
    window.form.changeFormState();
  };

  var deactivatePage = function () {
    window.form.changePageActive(false);
    window.map.mapContainer.classList.add('map--faded');
    window.form.formContainer.classList.add('ad-form--disabled');
    mapPin.classList.remove('map__pin');
    restoreDefaultPosition();
    setOfferAddress();
  };

  var restoreDefaultPosition = function () {
    mapPinMain.style.top = PinMainDefault.TOP;
    mapPinMain.style.left = PinMainDefault.LEFT;
  };

  var initEvents = function () {
    mapPinMain.addEventListener('mousedown', function (evt) {
      if (evt.button === UserClick.LEFT_MOUSE && !window.form.isPageActive) {
        evt.preventDefault();
        activatePage();
      }

      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var mouseMoveHandler = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var left = mapPinMain.offsetLeft - shift.x;
        var top = mapPinMain.offsetTop - shift.y;

        if (left > LimitsMoving.MAX_RIGHT) {
          left = LimitsMoving.MAX_RIGHT;
        } else if (left < LimitsMoving.MIN_LEFT) {
          left = LimitsMoving.MIN_LEFT;
        }

        if (top > LimitsMoving.MAX_BOTTOM) {
          top = LimitsMoving.MAX_BOTTOM;
        } else if (top < LimitsMoving.MIN_TOP) {
          top = LimitsMoving.MIN_TOP;
        }

        mapPinMain.style.left = left + 'px';
        mapPinMain.style.top = top + 'px';

        window.map.setOfferAddress();
      };

      var mouseUpHandler = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
      };
      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    });

    mapPinMain.addEventListener('keydown', function (evt) {
      if (evt.key === UserClick.ENTER && !window.form.isPageActive) {
        evt.preventDefault();
        activatePage();
      }
    });
  };

  var setOfferAddress = function () {
    var x = 0;
    var y = 0;

    if (window.form.getIsPageActive()) {
      x = mapPinMain.offsetLeft + window.pin.PinSizeMain.HALF_WIDTH;
      y = mapPinMain.offsetTop + window.pin.PinSizeMain.HEIGHT + window.pin.PinSizeMain.AFTER;

    } else {
      x = mapPinMain.offsetLeft + window.pin.PinSizeMain.HALF_WIDTH;
      y = mapPinMain.offsetTop + window.pin.PinSizeMain.HALF_HEIGHT;
    }
    window.form.addressInput.value = Math.floor(x) + ', ' + Math.round(y);
  };

  window.map = {
    mapContainer: mapContainer,
    deactivatePage: deactivatePage,
    setOfferAddress: setOfferAddress,
    initEvents: initEvents,
    UserClick: UserClick
  };
})();
