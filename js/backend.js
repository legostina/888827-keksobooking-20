'use strict';

(function () {
  var TIMEOUT_IN_MS = 10000;

  var StatusCode = {
    OK: 200
  };
  var Types = {
    GET: 'GET',
    POST: 'POST'
  };
  var Url = {
    LOAD: 'https://javascript.pages.academy/keksobooking/data',
    UPDATE: 'https://javascript.pages.academy/keksobooking'
  };

  var load = function (onSuccess, onError) {
    var xhr = getXhrInstance(Types.GET, Url.LOAD, onSuccess, onError);
    xhr.send();
  };

  var update = function (data, onSuccess, onError) {
    var xhr = getXhrInstance(Types.POST, Url.UPDATE, onSuccess, onError);
    xhr.send(data);
  };

  var getXhrInstance = function (type, url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case StatusCode.OK:
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


    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(type, url);
    return xhr;
  };

  window.backend = {
    load: load,
    update: update
  };
})();
