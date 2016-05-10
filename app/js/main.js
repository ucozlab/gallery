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

function append(what, to) { //simple append
    var appenddiv = document.getElementById(to);
    if (appenddiv.childNodes.length > 0) {
        var arr = [];
        for (var i = 0; i < appenddiv.childNodes.length; i++) {
            if (appenddiv.childNodes[i].nodeType == 1) { // check if text
                arr.push(appenddiv.childNodes[i]);
            }
        };
        arr[0].appendChild(what);
    } else {
        appenddiv.appendChild(what);
    }
}

//check if localstorage
function supports_html5_storage() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}
//run
if (!supports_html5_storage()) {
    alert('You can\'t use localstorage, please allow it or use another browser!');
}

/*indexedDB*/
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
/*IndexedDBend*/


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

function formValidate(event) { //create img and callback add.photo
    event.preventDefault();
    var datatosend,
        photocat = addform.elements["category"].value,
        photoname = addform.elements["photoname"].value,
        photodesc = addform.elements["description"].value,
        photofile = addform.elements["file"].files[0]; // using HTML5 fileAPI
    if ((photocat == '') || (photoname == '')) { // test on html5 attr required
        alert('Fill in required fields');
    } else {
        var loaderdiv = document.getElementById('addform');
        addRemoveClass(loaderdiv, 'loader');
        datatosend = {
            cat: photocat,
            name: photoname,
            desc: photodesc
        }
        createImg(datatosend, app.addPhoto, app.addToStorage); //get data from fields and send to createImg function
    }
}

function createImg(datatosend, callback, callback2) { // using fileAPI
    var input, file, fr, img, loaderdiv = document.getElementById('addform');

    if (typeof window.FileReader !== 'function') {
        write("The file API isn't supported on this browser yet.");
        return;
    }

    input = document.getElementById('file');
    if (!input) {
        alert("Um, couldn't find the imgfile element.");
        addRemoveClass(loaderdiv, 'loader');
    } else if (!input.files) {
        alert("This browser doesn't seem to support the `files` property of file inputs.");
        addRemoveClass(loaderdiv, 'loader');
    } else if (!input.files[0]) {
        alert("Please select a file before clicking 'Submit'");
        addRemoveClass(loaderdiv, 'loader');
    } else {
        file = input.files[0];
        fr = new FileReader();
        fr.onload = function () {
            img = new Image();
            img.onload = function () {
                var canvas = document.getElementById("canvas")
                canvas.width = img.width;
                canvas.height = img.height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                datatosend.img = canvas.toDataURL("image/png");
                callback(datatosend); //app.addPhoto(created_image, data_from_fields)
                callback2(datatosend);
                app.changeView('gallery');
            };
            img.src = fr.result;
        };
        fr.readAsDataURL(file);
    }
}
function checkIfEmpty(div, callback) {
    var link = document.querySelector(div);
    if (link.children.length < 1) {
        if (callback) {
            callback();
            return;
        } else {
            return true;
        }
    } else {
        return false;
    }
}
function cleardiv(div){
    var itemsrow = document.querySelector(div);
    itemsrow.innerHTML = "";
}
