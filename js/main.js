'use strict';

// renderPins(pins);
// renderPopup(pins[0]);

var pins = window.data.getPins(8);

window.form.changeFormValidation();
window.map.initEvents(pins);
window.map.initMapPinEvent();

// console.log(pins);
