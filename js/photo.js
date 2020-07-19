'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var IMAGE_SIZE = '70px';

  var avatarInput = document.querySelector('.ad-form input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');

  var avatarPreviewDefaultSrc = avatarPreview.src;

  var photoInput = document.querySelector('.ad-form__upload input[type=file]');
  var photoPreview = document.querySelector('.ad-form__photo');

  var readFile = function (file, cb) {
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        cb(reader.result);
      });
      reader.readAsDataURL(file);
    }
  };

  var onPhotoReadFileSuccess = function (result) {
    var img = document.createElement('img');
    img.src = result;
    img.style.width = IMAGE_SIZE;
    img.style.height = IMAGE_SIZE;
    photoPreview.append(img);
  };

  var onAvatarReadFileSuccess = function (result) {
    avatarPreview.src = result;
  };

  var onInputPhotoChange = function () {
    var file = photoInput.files[0];
    readFile(file, onPhotoReadFileSuccess);
  };

  var onInputAvatarChange = function () {
    var file = avatarInput.files[0];
    readFile(file, onAvatarReadFileSuccess);
  };

  var addEvents = function () {
    photoInput.addEventListener('change', onInputPhotoChange);
    avatarInput.addEventListener('change', onInputAvatarChange);
  };

  var reset = function () {
    photoInput.removeEventListener('change', onInputPhotoChange);
    avatarInput.removeEventListener('change', onInputAvatarChange);
    avatarPreview.src = avatarPreviewDefaultSrc;
    photoPreview.innerHTML = '';
  };

  window.photo = {
    addEvents: addEvents,
    reset: reset
  };
})();
