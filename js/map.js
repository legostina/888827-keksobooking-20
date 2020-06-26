'use strict';

(function () {
  var mapContainer = document.querySelector('.map');
  var mapOverlay = document.querySelector('.map__overlay');
  var mapPinMain = document.querySelector('.map__pin--main');
  var UserClick = {
    ENTER: 'Enter',
    ESCAPE: 'Escape',
    LEFT_MOUSE: 0
  };
  var MIN_MOVE_LEFT = 0;
  var LimitsMoving = {
    MIN_LEFT: MIN_MOVE_LEFT - window.pin.PinSizeMain.HALF_WIDTH,
    MAX_RIGHT: mapOverlay.getBoundingClientRect().width - window.pin.PinSizeMain.HALF_WIDTH,
    MIN_TOP: window.data.LocationVertical.MIN - (window.pin.PinSizeMain.HEIGHT + window.pin.PinSizeMain.AFTER),
    MAX_BOTTOM: window.data.LocationVertical.MAX - (window.pin.PinSizeMain.HEIGHT + window.pin.PinSizeMain.AFTER),
  };

  var addClickEvent = function (pinElement, pin) {
    pinElement.addEventListener('click', function (evt) {
      evt.preventDefault();
      window.card.renderPopup(pin);
    });
  };

  var activatePage = function (pins) {
    window.form.changePageActive(true);
    window.form.changeFormValidation();
    mapContainer.classList.remove('map--faded');
    window.form.formContainer.classList.remove('ad-form--disabled');
    window.pin.renderPins(pins);
    setOfferAddress();
    window.form.changeFormState();
  };

  var initEvents = function (pins) {
    mapPinMain.addEventListener('mousedown', function (evt) {
      if (evt.button === UserClick.LEFT_MOUSE) {
        evt.preventDefault();
        activatePage(pins);
      }
    });

    mapPinMain.addEventListener('keydown', function (evt) {
      if (evt.key === UserClick.ENTER) {
        evt.preventDefault();
        activatePage(pins);
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
    window.form.addressInput.value = Math.floor(x) + ', ' + y;
  };

  var initMapPinEvent = function () {
    mapPinMain.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
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

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };
  window.map = {
    mapContainer: mapContainer,
    addClickEvent: addClickEvent,
    setOfferAddress: setOfferAddress,
    initEvents: initEvents,
    initMapPinEvent: initMapPinEvent,
    UserClick: UserClick
  };
})();
