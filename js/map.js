'use strict';

(function () {
  var MIN_MOVE_LEFT = 0;

  var mapContainer = document.querySelector('.map');
  var mapOverlay = document.querySelector('.map__overlay');
  var mapPinMain = document.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');
  
  var PinMainDefault = {
    LEFT: 570,
    TOP: 375
  };

  var LimitsMoving = {
    MIN_LEFT: MIN_MOVE_LEFT - window.pin.PinSizeMain.HALF_WIDTH,
    MAX_RIGHT: mapOverlay.getBoundingClientRect().width - window.pin.PinSizeMain.HALF_WIDTH,
    MIN_TOP: window.util.LocationVertical.MIN - (window.pin.PinSizeMain.HEIGHT + window.pin.PinSizeMain.AFTER),
    MAX_BOTTOM: window.util.LocationVertical.MAX - (window.pin.PinSizeMain.HEIGHT + window.pin.PinSizeMain.AFTER),
  };

  var isActive = false;

  var activate = function () {
    isActive = true;
    mapContainer.classList.remove('map--faded');
    window.backend.load(window.filter.initialize);
    setOfferAddress();
    window.form.activate();
  };

  var deactivate = function () {
    isActive = false;
    mapContainer.classList.add('map--faded');
    restoreDefaultPosition();
    setOfferAddress();
  };

  var restoreDefaultPosition = function () {
    mapPinMain.style.top = PinMainDefault.TOP + 'px';
    mapPinMain.style.left = PinMainDefault.LEFT + 'px';
  };

  var returnDefault = function () {
    addEvents();
    deactivate();
  };

  var addEvents = function () {
    mapPinMain.addEventListener('mousedown', function (evt) {
      if (evt.button === window.util.UserClick.LEFT_MOUSE && !window.form.isPageActive) {
        evt.preventDefault();
        activate();
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

        setOfferAddress();
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
      if (evt.key === window.util.UserClick.ENTER && !window.form.isPageActive) {
        evt.preventDefault();
        activate();
      }
    });
  };

  var setOfferAddress = function () {
    var x = mapPinMain.offsetLeft + window.pin.PinSizeMain.HALF_WIDTH;
    var y = mapPinMain.offsetTop + window.pin.PinSizeMain.HALF_HEIGHT;

    if (isActive) {
      x = mapPinMain.offsetLeft + window.pin.PinSizeMain.HALF_WIDTH;
      y = mapPinMain.offsetTop + window.pin.PinSizeMain.HEIGHT + window.pin.PinSizeMain.AFTER;
    }
    addressInput.value = Math.floor(x) + ', ' + Math.round(y);
  };

  window.map = {
    mapContainer: mapContainer,
    deactivate: deactivate,
    returnDefault: returnDefault
  };
})();
