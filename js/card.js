'use strict';

var mapCard = document.querySelector('#card').content.querySelector('.map__card');
var addressInput = document.querySelector('#address');

var isPageActive = false;

var popupElement = null;

var renderPopup = function (pin) {
  removePopup();
  popupElement = mapCard.cloneNode(true);

  popupElement.querySelector('.popup__title').textContent = pin.offer.title;
  popupElement.querySelector('.popup__text--address').textContent = pin.offer.address;
  popupElement.querySelector('.popup__text--price').textContent = pin.offer.price + '₽/ночь';
  popupElement.querySelector('.popup__type').textContent = getDisplayPlacementType(pin.offer.type);
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

  mapContainer.insertAdjacentElement('afterbegin', popupElement);

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

var setOfferAddress = function () {
  var x = 0;
  var y = 0;

  if (isPageActive) {
    x = buttonHome.offsetLeft + buttonHome.offsetWidth / 2;
    y = buttonHome.offsetTop + buttonHome.offsetHeight + PinSize.AFTER;

  } else {
    x = buttonHome.offsetLeft + buttonHome.offsetWidth / 2;
    y = buttonHome.offsetTop + buttonHome.offsetHeight / 2;
  }
  addressInput.value = x + ', ' + y;
};
