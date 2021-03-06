'use strict';

(function () {
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
  var TitleSize = {
    MIN_LENGTH: 30,
    MAX_LENGTH: 100,
  };
  var PriceMinimal = {
    MIN_BUNGALO: 0,
    MIN_FLAT: 1000,
    MIN_HOUSE: 5000,
    MIN_PALACE: 10000,
  };
  var PricePlaceholder = {
    ZER0: '0',
    THOUSAND: '1000',
    FIVE: '5000',
    TEN: '10000'
  };
  var PriceMinValue = {
    ZER0: '0',
    THOUSAND: '1000',
    FIVE: '5000',
    TEN: '10000'
  };

  var roomNumberInput = document.querySelector('#room_number');
  var capacityInput = document.querySelector('#capacity');
  var titleInput = document.querySelector('#title');
  var typeInput = document.querySelector('#type');
  var priceInput = document.querySelector('#price');
  var timeinSelect = document.querySelector('#timein');
  var timeoutSelect = document.querySelector('#timeout');
  var formContainer = document.querySelector('.ad-form');
  var resetButton = document.querySelector('.ad-form__reset');
  var mainContainer = document.querySelector('main');
  var errorWindow = document.querySelector('#error').content.querySelector('.error');
  var successWindow = document.querySelector('#success').content.querySelector('.success');

  var successElement = null;
  var errorElement = null;

  var changeFormState = function (isActive) {
    var fieldsets = document.querySelectorAll('fieldset');
    Array.from(fieldsets).forEach(function (fieldset) {
      fieldset.disabled = !isActive;
    });
  };

  var activate = function () {
    changeFormState(true);
    formContainer.classList.remove('ad-form--disabled');
    window.photo.addEvents();
  };

  var deactivate = function () {
    formContainer.reset();
    changeFormState(false);
    formContainer.classList.add('ad-form--disabled');
    window.photo.reset();
    applyMinimalType();
  };

  var changeFormValidation = function () {
    applyMinimalType();
    validateCapacity();
    validateTitle();
    validateType();
    validatePrice();
    checkTimes(timeinSelect);
  };

  var validateCapacity = function () {
    var roomValue = roomNumberInput.value;
    var capacityValue = capacityInput.value;

    if (roomValue === QuantityRooms.ONE && capacityValue !== QuantityQuest.ONE) {
      capacityInput.setCustomValidity('Выберите не более одного гостя');
    } else if (roomValue === QuantityRooms.TWO && capacityValue !== QuantityQuest.ONE && capacityValue !== QuantityQuest.TWO) {
      capacityInput.setCustomValidity('Выберите не более двух гостей');
    } else if (roomValue === QuantityRooms.THREE && capacityValue === QuantityQuest.ZERO) {
      capacityInput.setCustomValidity('Выберите пункт с количеством гостей');
    } else if (roomValue === QuantityRooms.HUNDRED && capacityValue !== QuantityQuest.ZERO) {
      capacityInput.setCustomValidity('Выберите пункт "не для гостей"');
    } else {
      capacityInput.setCustomValidity('');
    }
  };

  var validateTitle = function () {
    var valueLength = titleInput.value.length;

    if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity('Поле обязательно для заполнения');
    } else if (valueLength < TitleSize.MIN_LENGTH) {
      titleInput.setCustomValidity('Значение должно быть не менее ' + (TitleSize.MIN_LENGTH - valueLength) + ' симв.');
    } else if (valueLength > TitleSize.MAX_LENGTH) {
      titleInput.setCustomValidity('Значение должно быть не более ' + (valueLength - TitleSize.MAX_LENGTH) + ' симв.');
    } else {
      titleInput.setCustomValidity('');
    }
  };

  var validateType = function () {
    var valueType = typeInput.value;
    var valuePrice = priceInput.value;

    if (valueType === window.util.placementType.BUNGALO && valuePrice < PriceMinimal.MIN_BUNGALO) {
      priceInput.setCustomValidity('Минимальная цена за ночь 0');
    } else if (valueType === window.util.placementType.FLAT && valuePrice < PriceMinimal.MIN_FLAT) {
      priceInput.setCustomValidity('Минимальная цена за ночь 1 000');
    } else if (valueType === window.util.placementType.HOUSE && valuePrice < PriceMinimal.MIN_HOUSE) {
      priceInput.setCustomValidity('Минимальная цена 5 000');
    } else if (valueType === window.util.placementType.PALACE && valuePrice < PriceMinimal.MIN_PALACE) {
      priceInput.setCustomValidity('Минимальная цена 10 000');
    } else {
      priceInput.setCustomValidity('');
    }
  };

  var validatePrice = function () {
    if (priceInput.validity.valueMissing) {
      priceInput.setCustomValidity('Поле обязательно для заполнения');
    } else {
      priceInput.setCustomValidity('');
    }
  };

  var applyMinimalType = function () {
    if (typeInput.value === window.util.placementType.BUNGALO) {
      priceInput.placeholder = PricePlaceholder.ZER0;
      priceInput.min = PriceMinValue.ZER0;
    } else if (typeInput.value === window.util.placementType.FLAT) {
      priceInput.placeholder = PricePlaceholder.THOUSAND;
      priceInput.min = PriceMinValue.THOUSAND;
    } else if (typeInput.value === window.util.placementType.HOUSE) {
      priceInput.placeholder = PricePlaceholder.FIVE;
      priceInput.min = PriceMinValue.FIVE;
    } else {
      priceInput.placeholder = PricePlaceholder.TEN;
      priceInput.min = PriceMinValue.TEN;
    }
  };

  var checkTimes = function (target) {
    switch (target.id) {
      case timeinSelect.id:
        timeoutSelect.value = timeinSelect.value;
        break;
      case timeoutSelect.id:
        timeinSelect.value = timeoutSelect.value;
        break;
    }
  };

  var onFormChange = function (evt) {
    if (evt.target.id === roomNumberInput.id || evt.target.id === capacityInput.id) {
      validateCapacity();
    } else if (evt.target.id === titleInput.id) {
      validateTitle();
    } else if (evt.target.id === typeInput.id || evt.target.id === priceInput.id) {
      applyMinimalType();
      validateType();
    } else if (evt.target.id === timeinSelect.id || evt.target.id === timeoutSelect.id) {
      checkTimes(evt.target);
    }
  };

  var onDocumentMouseDownError = function (evt) {
    if (evt.button === window.util.KeyType.LEFT_MOUSE && errorElement !== null) {
      evt.preventDefault();
      hideError();
    }
  };

  var onDocumentKeyDownError = function (evt) {
    if (evt.key === window.util.KeyType.ESCAPE && errorElement !== null) {
      evt.preventDefault();
      hideError();
    }
  };

  var onDocumentMouseDownSuccess = function (evt) {
    if (evt.button === window.util.KeyType.LEFT_MOUSE && successElement !== null) {
      evt.preventDefault();
      hideSuccess();
    }
  };

  var onDocumentKeyDownSuccess = function (evt) {
    if (evt.key === window.util.KeyType.ESCAPE && successElement !== null) {
      evt.preventDefault();
      hideSuccess();
    }
  };

  var showError = function () {
    errorElement = errorWindow.cloneNode(true);

    mainContainer.insertAdjacentElement('afterbegin', errorElement);

    addErrorEvents();
  };

  var onError = function () {
    showError();
  };

  var addErrorEvents = function () {
    document.addEventListener('mousedown', onDocumentMouseDownError);
    document.addEventListener('keydown', onDocumentKeyDownError);
  };

  var showSuccess = function () {
    successElement = successWindow.cloneNode(true);

    document.body.insertAdjacentElement('afterbegin', successElement);
    addSuccessEvents();
  };

  var addSuccessEvents = function () {
    document.addEventListener('mousedown', onDocumentMouseDownSuccess);
    document.addEventListener('keydown', onDocumentKeyDownSuccess);
  };

  var hideSuccess = function () {
    successElement.remove();
    successElement = null;
    document.removeEventListener('mousedown', onDocumentMouseDownSuccess);
    document.removeEventListener('keydown', onDocumentKeyDownSuccess);
  };

  var hideError = function () {
    errorElement.remove();
    errorElement = null;

    document.removeEventListener('mousedown', onDocumentMouseDownError);
    document.removeEventListener('keydown', onDocumentKeyDownError);
  };

  var onSuccess = function () {
    deactivate();
    window.pin.remove();
    window.card.removePopup();
    window.map.deactivate();
    window.filter.reset();
    showSuccess();
  };

  var onResetButtonClick = function (evt) {
    evt.preventDefault();

    deactivate();
    window.pin.remove();
    window.card.removePopup();
    window.map.deactivate();
    window.filter.reset();
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.update(new FormData(formContainer), onSuccess, onError);
  };

  var returnDefault = function () {
    addEvents();
    changeFormValidation();
    deactivate();
  };

  var addEvents = function () {
    formContainer.addEventListener('change', onFormChange);
    formContainer.addEventListener('submit', onFormSubmit);
    resetButton.addEventListener('click', onResetButtonClick);
  };

  window.form = {
    returnDefault: returnDefault,
    activate: activate,
    showError: showError
  };
})();
