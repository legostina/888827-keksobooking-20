'use strict';

(function () {
  var mapCard = document.querySelector('#card').content.querySelector('.map__card');
  var popupElement = null;

  var getPopupElement = function () {
    return popupElement;
  };

  var addClickEvent = function (pinElement, pin) {
    pinElement.addEventListener('click', function (evt) {
      evt.preventDefault();
      window.card.renderPopup(pin);
    });
  };

  var addCloseEvents = function () {
    var closeButton = window.card.getPopupElement().querySelector('.popup__close');

    closeButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      if (evt.button === window.util.UserClick.LEFT_MOUSE) {
        window.card.removePopup(closeButton);
      }
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.key === window.util.UserClick.ESCAPE) {
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
    popupElement.querySelector('.popup__type').textContent = window.util.getDisplayPlacementType(pin.offer.type);
    popupElement.querySelector('.popup__text--capacity').textContent = pin.offer.rooms + ' комнаты для ' + pin.offer.guests + ' гостей';
    popupElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;
    popupElement.querySelector('.popup__description').textContent = pin.offer.description;
    popupElement.querySelector('.popup__avatar').src = pin.author.avatar;

    var popupPhotosContainer = popupElement.querySelector('.popup__photos');

    renderPhotos(popupPhotosContainer, pin.offer.photos);

    var popupFeaturesContainer = popupElement.querySelector('.popup__features');
    addPopupFeatures(popupFeaturesContainer, pin.offer.features);

    window.map.mapContainer.insertAdjacentElement('afterbegin', popupElement);

    addCloseEvents();
  };

  var addPopupFeatures = function (container, features) {
    if (features.length === 0) {
      container.remove();
      return;
    }

    var fragment = document.createDocumentFragment();
    container.innerHTML = '';

    features.forEach(function (feature) {
      var popupFeature = document.createElement('li');
      popupFeature.className = 'popup__feature popup__feature--' + feature;
      fragment.appendChild(popupFeature);
    });

    container.appendChild(fragment);
  };

  var renderPhotos = function (container, photos) {
    if (photos.length === 0) {
      container.remove();
      return;
    }

    var photoTemplate = container.querySelector('img');
    var photoElement = photoTemplate.cloneNode(true);
    var fragment = document.createDocumentFragment();

    photoTemplate.remove();

    photos.forEach(function (photo) {
      var photoElementNew = photoElement.cloneNode(true);
      photoElementNew.src = photo;
      fragment.appendChild(photoElementNew);
    });
    container.appendChild(fragment);
  };

  var removePopup = function () {
    if (popupElement !== null) {
      popupElement.remove();
    }
  };

  window.card = {
    renderPopup: renderPopup,
    removePopup: removePopup,
    getPopupElement: getPopupElement,
    addClickEvent: addClickEvent,
  };
})();
