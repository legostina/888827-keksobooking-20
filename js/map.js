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

  var PinSizeMain = {
    WIDTH: 65,
    HEIGHT: 65,
    AFTER: 22,
    HALF_WIDTH: 32.5,
    HALF_HEIGHT: 32.5
  };

  var Limit = {
    MIN_LEFT: MIN_MOVE_LEFT - PinSizeMain.HALF_WIDTH,
    MAX_RIGHT: mapOverlay.getBoundingClientRect().width - PinSizeMain.HALF_WIDTH,
    MIN_TOP: window.util.LocationVertical.MIN - (PinSizeMain.HEIGHT + PinSizeMain.AFTER),
    MAX_BOTTOM: window.util.LocationVertical.MAX - (PinSizeMain.HEIGHT + PinSizeMain.AFTER),
  };

  var isActive = false;

  var activate = function () {
    isActive = true;
    mapContainer.classList.remove('map--faded');
    window.backend.load(window.filter.initialize, window.form.showError);
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
      if (evt.button === window.util.KeyType.LEFT_MOUSE && !window.form.isPageActive) {
        evt.preventDefault();
        activate();
      }

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

        if (left > Limit.MAX_RIGHT) {
          left = Limit.MAX_RIGHT;
        } else if (left < Limit.MIN_LEFT) {
          left = Limit.MIN_LEFT;
        }

        if (top > Limit.MAX_BOTTOM) {
          top = Limit.MAX_BOTTOM;
        } else if (top < Limit.MIN_TOP) {
          top = Limit.MIN_TOP;
        }

        mapPinMain.style.left = left + 'px';
        mapPinMain.style.top = top + 'px';

        setOfferAddress();
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

    mapPinMain.addEventListener('keydown', function (evt) {
      if (evt.key === window.util.KeyType.ENTER && !window.form.isPageActive) {
        evt.preventDefault();
        activate();
      }
    });
  };

  var setOfferAddress = function () {
    var x = mapPinMain.offsetLeft + PinSizeMain.HALF_WIDTH;
    var y = mapPinMain.offsetTop + PinSizeMain.HALF_HEIGHT;

    if (isActive) {
      x = mapPinMain.offsetLeft + PinSizeMain.HALF_WIDTH;
      y = mapPinMain.offsetTop + PinSizeMain.HEIGHT + PinSizeMain.AFTER;
    }
    addressInput.value = Math.floor(x) + ', ' + Math.round(y);
  };

  window.map = {
    mapContainer: mapContainer,
    deactivate: deactivate,
    returnDefault: returnDefault
  };
})();
