'use strict';

// renderPins(pins);
// renderPopup(pins[0]);

var pins = window.data.getPins(8);

window.form.startPage();
window.map.initEvents(pins);

console.log(pins);
