'use strict';

(function () {
  var mapCard = document.querySelector('#card').content.querySelector('.map__card');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapOverlay = document.querySelector('.map__overlay');

  var minMoveLeft = 0;

  var LimitsMoving = {
    MIN_LEFT: minMoveLeft - window.pin.PinSizeMain.HALF_WIDTH,
    MAX_RIGHT: mapOverlay.getBoundingClientRect().width - window.pin.PinSizeMain.HALF_WIDTH,
    MIN_TOP: window.data.LocationVertical.MIN - (window.pin.PinSizeMain.HEIGHT + window.pin.PinSizeMain.AFTER),
    MAX_BOTTOM: window.data.LocationVertical.MAX - (window.pin.PinSizeMain.HEIGHT + window.pin.PinSizeMain.AFTER),
  };

  var popupElement = null;

  var getPopupElement = function () {
    return popupElement;
  };

  var renderPopup = function (pin) {
    removePopup();
    popupElement = mapCard.cloneNode(true);

    popupElement.querySelector('.popup__title').textContent = pin.offer.title;
    popupElement.querySelector('.popup__text--address').textContent = pin.offer.address;
    popupElement.querySelector('.popup__text--price').textContent = pin.offer.price + '₽/ночь';
    popupElement.querySelector('.popup__type').textContent = window.data.getDisplayPlacementType(pin.offer.type);
    popupElement.querySelector('.popup__text--capacity').textContent = pin.offer.rooms + ' комнаты для ' + pin.offer.guests + ' гостей';
    popupElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;
    popupElement.querySelector('.popup__features').textContent = pin.offer.features.join(', ');
    popupElement.querySelector('.popup__description').textContent = pin.offer.description;
    popupElement.querySelector('.popup__avatar').src = pin.author.avatar;

    var popupPhotosContainer = popupElement.querySelector('.popup__photos');

    if (pin.offer.photos !== 0) {
      renderPhotos(popupPhotosContainer, pin.offer.photos);
    } else {
      popupPhotosContainer.remove();
    }

    window.map.mapContainer.insertAdjacentElement('afterbegin', popupElement);

    window.map.addCloseEvents();
  };

  var renderPhotos = function (popupPhotosContainer, photos) {
    var photoTemplate = popupPhotosContainer.querySelector('img');
    var photoElement = photoTemplate.cloneNode(true);
    var fragment = document.createDocumentFragment();

    photoTemplate.remove();

    for (var i = 0; i < photos.length; i++) {
      var photoElementNew = photoElement.cloneNode(true);

      photoElementNew.src = photos[i];
      fragment.appendChild(photoElementNew);
    }

    popupPhotosContainer.appendChild(fragment);
  };

  var removePopup = function () {
    if (popupElement !== null) {
      popupElement.remove();
    }
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

  window.card = {
    renderPopup: renderPopup,
    removePopup: removePopup,
    getPopupElement: getPopupElement,
    initMapPinEvent: initMapPinEvent,
    mapPinMain: mapPinMain
  };
})();
