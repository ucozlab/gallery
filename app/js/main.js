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
app.changeView = function (elem, event) { //changeView
    event.preventDefault();
    var targ = elem.getAttribute("href");
    var who = document.getElementById(targ);
    var link = document.querySelectorAll('#nav ul li a[href="'+targ+'"]')[0];
    siblingsAddRemoveClass(who, 'active');
    siblingsAddRemoveClass(link.parentElement, 'active');
    location.hash = '!/'+targ+'';
}
app.init = function () {

    function hashChangeCallback() { //changeHistory
        if (/^\#\!/.test(location.hash)) {
            var stateParameters = {
                foo: "bar"
            };
            route = location.hash.substr(3);
            history.pushState(stateParameters, ""+capitalizeFirstLetter(route)+" - MyGallery SPA", location.hash);
            history.pathname = location.hash;
            document.title = ""+capitalizeFirstLetter(route)+" - MyGallery SPA";
        }
    }
    window.addEventListener('hashchange', hashChangeCallback, false);

    //check if index.html without hash onload
    if(!window.location.hash) {
        history.replaceState("", "Home - MyGallery SPA", "#!/home");
        location.hash = '!/home';
        history.pathname = location.hash;
        document.title = "Home - MyGallery SPA";
        var who = document.getElementById('home');
        var link = document.querySelectorAll('#nav ul li a[href="home"]')[0];
        siblingsAddRemoveClass(who, 'active');  //changeView
        siblingsAddRemoveClass(link.parentElement, 'active'); //change link class
    }
}
app.init(); //initialize app






