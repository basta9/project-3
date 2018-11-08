'use strict'


function toggleMenu(ev) {
    ev.stopPropagation();
    document.body.classList.toggle('open');
}
