function hasClass(elem, klass) {
    return (" " + elem.className + " ").indexOf(" " + klass + " ") > -1;
}

function mainMenu(elem) {
    if (hasClass(elem, 'opened')) {
        elem.classList.remove('opened');
    } else {
        elem.classList.add('opened');
    }
}
