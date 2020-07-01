'use strict';

(function () {
  var onError = function (message) {
    console.error(message);
  };

  var load = function (onSuccess) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;

        default:
          onError('Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });


    xhr.timeout = 1000;

    xhr.open('GET', 'https://javascript.pages.academy/keksobooking/data');
    xhr.send();
  };

  window.backend = {
    load: load
  };
})();