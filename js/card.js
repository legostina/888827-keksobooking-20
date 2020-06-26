'use strict';

(function () {
  var mapCard = document.querySelector('#card').content.querySelector('.map__card');
  var popupElement = null;

  var getPopupElement = function () {
    return popupElement;
  };

  var addCloseEvents = function () {
    var closeButton = window.card.getPopupElement().querySelector('.popup__close');

    closeButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      if (evt.button === window.map.UserClick.LEFT_MOUSE) {
        window.card.removePopup(closeButton);
      }
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.key === window.map.UserClick.ESCAPE) {
        evt.preventDefault();
        window.card.removePopup();
      }
    });
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

    addCloseEvents();
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

  window.card = {
    renderPopup: renderPopup,
    removePopup: removePopup,
    getPopupElement: getPopupElement
  };
})();
