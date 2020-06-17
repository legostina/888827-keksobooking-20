'use strict';

var PlacementType = {
  PLACE: 'place',
  FLAT: 'flat',
  HOUSE: 'house',
  BUNGALO: 'bungalo'
};

var QuantityRooms = {
  ONE: '1',
  TWO: '2',
  THREE: '3',
  HUNDRED: '100'
};

var QuantityQuest = {
  ONE: '1',
  TWO: '2',
  THREE: '3',
  ZERO: '0'
};

var ENTER = 'Enter';
var TITLES = ['Уютная студия в черте города', 'Роскошные аппартаменты', 'Семейное гнездышко'];
var TYPES = [PlacementType.PLACE, PlacementType.FLAT, PlacementType.HOUSE, PlacementType.BUNGALO];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var DESCRIPTIONS = ['Окна выходят во двор, на запад. Напротив чудесный парк. В квартире светло, но не жарко. Прямые лучи солнца попадают в окна только вечером.', 'Близко к метро. В шаговой доступности торговые центры, бары и клубы.'];

var PriceFlat = {
  MIN: 1000,
  MAX: 5000,
};
var RoomFlat = {
  MIN: 1,
  MAX: 100,
};
var QuestFlat = {
  MIN: 1,
  MAX: 100,
};
var LocationVertical = {
  MIN: 130,
  MAX: 630,
};
var LocationHorizontal = {
  MIN: 300,
  MAX: 650,
};
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var AFTER_PIN = 22;
var MIN_TITLE_LENGTH = 30;
var MAX_TITLE_LENGTH = 100;

var pinButton = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPinsContainer = document.querySelector('.map__pins');
var mapCard = document.querySelector('#card').content.querySelector('.map__card');
var mapContainer = document.querySelector('.map');
var buttonHome = document.querySelector('.map__pin--main');
var formContainer = document.querySelector('.ad-form');
var userRoomNumber = document.querySelector('#room_number');
var capacityElement = document.querySelector('#capacity');
var titleInput = document.querySelector('#title');

var isPageActive = false;

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomItem = function (items) {
  var randomIndex = getRandomInt(0, items.length);
  return items[randomIndex];
};

var getRandomStrings = function (items) {
  var countElements = getRandomInt(0, items.length);
  var randomElements = [];

  for (var i = 0; i < countElements; i++) {
    randomElements.push(items[i]);
  }

  return randomElements;
};

var getDisplayPlacementType = function (type) {
  switch (type) {
    case PlacementType.PLACE: return 'Дворец';
    case PlacementType.FLAT: return 'Квартира';
    case PlacementType.HOUSE: return 'Дом';
    case PlacementType.BUNGALO: return 'Бунгало';
    default: return '';
  }
};

var getPin = function (index) {
  var pin = {
    author: {
      avatar: 'img/avatars/user0' + (++index) + '.png'
    },
    offer: {
      title: getRandomItem(TITLES),
      address: '600, 350',
      price: getRandomInt(PriceFlat.MIN, PriceFlat.MAX),
      type: getRandomItem(TYPES),
      rooms: getRandomInt(RoomFlat.MIN, RoomFlat.MAX),
      guests: getRandomInt(QuestFlat.MIN, QuestFlat.MAX),
      checkin: getRandomItem(TIMES),
      checkout: getRandomItem(TIMES),
      features: getRandomStrings(FEATURES),
      description: getRandomItem(DESCRIPTIONS),
      photos: getRandomStrings(PHOTOS),
    },
    location: {
      x: getRandomInt(LocationHorizontal.MIN, LocationHorizontal.MAX),
      y: getRandomInt(LocationVertical.MIN, LocationVertical.MAX)
    }
  };

  return pin;
};

var getPins = function (count) {
  var pins = [];

  for (var i = 0; i < count; i++) {
    var pin = getPin(i);
    pins.push(pin);
  }

  return pins;
};

var renderPin = function (pin) {
  var buttonElement = pinButton.cloneNode(true);

  buttonElement.style.top = pin.location.x - PIN_WIDTH / 2 + 'px';
  buttonElement.style.left = pin.location.y - PIN_HEIGHT + 'px';

  buttonElement.querySelector('img').src = pin.author.avatar;
  buttonElement.querySelector('img').alt = pin.offer.title;

  return buttonElement;
};

var renderPins = function (pins) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(renderPin(pins[i]));
  }
  mapPinsContainer.appendChild(fragment);
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

var renderPopup = function (pin) {
  var popupElement = mapCard.cloneNode(true);

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
};

var changeFormState = function () {
  var fieldsets = document.querySelectorAll('fieldset');
  Array.from(fieldsets).forEach(function (fieldset) {
    fieldset.disabled = !isPageActive;
  });
};

var setOfferAddress = function () {
  var x = 0;
  var y = 0;
  var addressInput = document.querySelector('#address');

  if (isPageActive) {
    x = buttonHome.offsetLeft + buttonHome.offsetWidth / 2;
    y = buttonHome.offsetTop + buttonHome.offsetHeight + AFTER_PIN;

  } else {
    x = buttonHome.offsetLeft + buttonHome.offsetWidth / 2;
    y = buttonHome.offsetTop + buttonHome.offsetHeight / 2;
  }
  addressInput.value = x + ', ' + y;
};

var startPage = function () {
  changeFormState();
  setOfferAddress();
};

var activatePage = function () {
  isPageActive = true;
  mapContainer.classList.remove('map--faded');
  formContainer.classList.remove('ad-form--disabled');
  // renderPins(pins);
  setOfferAddress();
  changeFormState();
};

var initEvents = function () {
  buttonHome.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    if (evt.button === 0) {
      activatePage();
    }
  });

  buttonHome.addEventListener('keydown', function (evt) {
    evt.preventDefault();
    if (evt.key === ENTER) {
      activatePage();
    }
  });
};

var validateCapacity = function () {
  var roomValue = document.querySelector('#room_number').value;
  var capacityValue = document.querySelector('#capacity').value;

  if (roomValue === QuantityRooms.ONE && capacityValue !== QuantityQuest.ONE) {
    capacityElement.setCustomValidity('Выберите не более одного гостя');
  } else if (roomValue === QuantityRooms.TWO && capacityValue !== QuantityQuest.ONE && capacityValue !== QuantityQuest.TWO) {
    capacityElement.setCustomValidity('Выберите не более двух гостей');
  } else if (roomValue === QuantityRooms.THREE && capacityValue === QuantityQuest.ZERO) {
    capacityElement.setCustomValidity('Выберите пункт с количеством гостей');
  } else if (roomValue === QuantityRooms.HUNDRED && capacityValue !== QuantityQuest.ZERO) {
    capacityElement.setCustomValidity('Выберите пункт "не для гостей"');
  } else {
    capacityElement.setCustomValidity('');
  }
};

var validateTitle = function () {
  var valueLength = titleInput.value.length;

  if (titleInput.validity.tooShort) {
    titleInput.setCustomValidity('Значение должно быть не менее ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
  } else if (titleInput.validity.tooLong) {
    titleInput.setCustomValidity('Значение должно быть не более ' + (valueLength - MAX_TITLE_LENGTH) + ' симв.');
  } else if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity('Поле обязательно для заполнения');
  } else {
    titleInput.setCustomValidity('');
  }
};

var filterChangeFieldset = function (evt) {
  if (evt.target.id === userRoomNumber.id || (evt.target.id === capacityElement.id)) {
    validateCapacity();
  } if (evt.target.id === titleInput.id) {
    validateTitle();
  }
};

formContainer.addEventListener('change', filterChangeFieldset);

var pins = getPins(8);
startPage(validateCapacity(), validateTitle());
initEvents();

renderPins(pins);
renderPopup(pins[0]);

console.log(pins);
