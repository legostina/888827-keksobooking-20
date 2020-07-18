'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var IMAGE_SIZE = '70px';
  var IMAGE_MARGIN = '-56px';

  var fileChooser = document.querySelector('.ad-form__field input[type=file]');
  var preview = document.querySelector('.ad-form-header__preview');

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var img = document.createElement('img');
        img.src = reader.result;
        img.style.width = IMAGE_SIZE;
        img.style.height = IMAGE_SIZE;
        img.style.marginLeft = IMAGE_MARGIN;
        preview.append(img);
      });

      reader.readAsDataURL(file);
    }
  });
  var deleteImage = function () {
    preview.removeChild(preview.lastChild);
  };
  window.avatar = {
    deleteImage: deleteImage
  };
})();
