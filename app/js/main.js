function hasClass(elem, klass) {
    return (" " + elem.className + " ").indexOf(" " + klass + " ") > -1;
}

function mainMenu(elem) {
    if (hasClass(elem, 'opened')) {
        elem.classList.remove('opened');
    } else {
        elem.classList.add('opened');
    }
    return false;
}

function changeView(elem) {
    var stateParameters = {
        foo: "bar"
    };
    var uri = elem; // предварительно формирование uri
    history.pushState(stateParameters, "New page title", uri);
    history.pathname = uri;
}

/*indexedDB https://habrahabr.ru/post/213515/ */
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
if (!indexedDB) {
    alert("Your browser doesn't support a stable version of IndexedDB");
}
function connectDB(f){
	var request = indexedDB.open("myBase", 1);
	request.onerror = function(err){
		console.log(err);
	};
	request.onsuccess = function(){
		// При успешном открытии вызвали коллбэк передав ему объект БД
		f(request.result);
	}
	request.onupgradeneeded = function(e){
		// Если БД еще не существует, то создаем хранилище объектов.
		e.currentTarget.result.createObjectStore("myObjectStore", { keyPath: "key" });
		connectDB(f);
	}
}

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
