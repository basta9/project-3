'use strict'


function toggleMenu(ev) {
    if (ev) {
        ev.stopPropagation();
    }
    document.body.classList.toggle('open');
}
