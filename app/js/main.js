function hasClass(elem, klass) {
    return (" " + elem.className + " ").indexOf(" " + klass + " ") > -1;
}

function addRemoveClass(who, andclass) {
    if (hasClass(who, andclass)) {
        who.classList.remove(andclass);
    } else {
        who.classList.add(andclass);
    }
}
function siblingsAddRemoveClass(who, andclass) {
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
function mainMenu(elem) {
    addRemoveClass(elem, 'opened');
    return false;
}

function capitalizeFirstLetter(string) {
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

/*app*/
function app() {
    //var section = document.getElementById, nav;
}
app.changeView = function (elem, event) {
    event.preventDefault();
    var targ = elem.getAttribute("href");
    var who = document.getElementById(targ);
    siblingsAddRemoveClass(who, 'active')  //changeView
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
        var sect = document.getElementById('home');
        var siblings = sect.parentNode.childNodes;
        for (var i = 0; i < siblings.length; i++) {
            if (siblings[i].nodeType != 1) {
                continue;
            }
            // Any code here that accesses siblings[i] will sure to be an element(check if not spaces text)
            siblings[i].classList.remove('active');
        }
        sect.classList.add('active');  //changeView
    }
}
app.init(); //start app

/*not to work but to read  !! https://habrahabr.ru/post/200720/

(function ($, window, undefined) {

  var $sections, $nav;

  $(function () {
      $sections = $('section'),
      $nav = $('ul.nav');

      window.addEventListener('hashchange', hashChangeCallback, false);
      location.hash = '!/';
  })

  function hashChangeCallback () {
      if (/^\#\!/.test(location.hash)) {
        var route = location.hash.substr(2),
            anchor = $('a[name="!' + route + '"]');
        if (anchor.length) {
          $('li.active', $nav).removeClass('active');
          $('li:has(a[href="#!'+route+'"])', $nav).addClass('active');
          $sections.hide();
          anchor.closest('section').show();
        }
      }
  }



}(window.jQuery, window))

*/
