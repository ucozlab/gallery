function hasClass(elem, klass) {
    return (" " + elem.className + " ").indexOf(" " + klass + " ") > -1; //check if hasClass
}

function addRemoveClass(who, andclass) { // add or remove Class
    if (hasClass(who, andclass)) {
        who.classList.remove(andclass);
    } else {
        who.classList.add(andclass);
    }
}

function siblingsAddRemoveClass(who, andclass) { // remove siblings class and add it to this
    var siblings = who.parentNode.childNodes;
    for (var i = 0; i < siblings.length; i++) {
        if (siblings[i].nodeType != 1) {
            continue;
        }
        // check if not spaces text
        siblings[i].classList.remove(andclass);
    }
    who.classList.add(andclass);
}

function mainMenu(elem) { // menubutton click
    addRemoveClass(elem, 'opened');
    return false;
}

function capitalizeFirstLetter(string) { // Uppercase first letter
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/*indexedDB https://habrahabr.ru/post/213515/ */
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
if (!indexedDB) {
    alert("Your browser doesn't support a stable version of IndexedDB");
}

function connectDB(f) {
    var request = indexedDB.open("myBase", 1);
    request.onerror = function (err) {
        console.log(err);
    };
    request.onsuccess = function () {
        // При успешном открытии вызвали коллбэк передав ему объект БД
        f(request.result);
    }
    request.onupgradeneeded = function (e) {
        // Если БД еще не существует, то создаем хранилище объектов.
        e.currentTarget.result.createObjectStore("myObjectStore", {
            keyPath: "key"
        });
        connectDB(f);
    }
}
/*end*/

/*app start*/
function app() {
    //var section = document.getElementById, nav;
}

app.changeView = function (text) { //changeView
    var who = document.getElementById(text);
    var link = document.querySelectorAll('#nav ul li a[href="' + text + '"]')[0];
    siblingsAddRemoveClass(who, 'active');
    siblingsAddRemoveClass(link.parentElement, 'active');
    location.hash = '!/' + text + '';
}
app.init = function () {

    function hashChangeCallback() { //changeHistory
        if (/^\#\!/.test(location.hash)) {
            var stateParameters = {
                foo: "bar"
            };
            route = location.hash.substr(3);
            history.replaceState(stateParameters, "" + capitalizeFirstLetter(route) + " - MyGallery SPA", location.hash);
            history.pathname = location.hash;
            document.title = "" + capitalizeFirstLetter(route) + " - MyGallery SPA";
        }
    }
    window.addEventListener('hashchange', hashChangeCallback, false);
    window.onpopstate = function (event) {
        var route = location.hash.substr(3);
        app.changeView(route);
        //document.getElementById(targ);
        // app.changeView()alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
    };
    if (!window.location.hash) {
        //check if index.html without hash onload
        app.changeView('home');
        hashChangeCallback();
    } else {
        var route = location.hash.substr(3);
        app.changeView(route);
        hashChangeCallback();
    }
}

/*click functions*/
var viewlinks = document.querySelectorAll('#nav ul li a');
var viewlinksItems = [].slice.call(viewlinks);
viewlinksItems.forEach(function (item, i) {
    var linktext = item.getAttribute("href");
    item.addEventListener('click', function (event) {
        event.preventDefault();
        app.changeView(linktext);
    });
});
/*click functions end*/

app.init(); //initialize app
