var GLOBALID = 0;
/*app start*/
function app() {

}

app.changeView = function (text, subpage, callback) { //changeView
    var who = document.getElementById(text);
    var link = document.querySelectorAll('#nav ul li a[href="' + text + '"]')[0];
    siblingsAddRemoveClass(who, 'active');
    if (typeof link !== "undefined") {
        siblingsAddRemoveClass(link.parentElement, 'active');
    }
    if (subpage) {
        location.hash = '!/' + text + '#!/' + subpage + '';
        callback(subpage);
    } else {
        location.hash = '!/' + text + '';
    }
}

app.addPhoto = function (params, itemid) {
    var itemsrow = document.querySelector('#items .row'); //simple check on empty row
    if (itemsrow.innerHTML === '<div class="col-xs-12">you don\'t have any albums yet</div>') {
        itemsrow.innerHTML = "";
    }
    itemid = itemid || 'item' + GLOBALID + ''; //if we add new global id will be the last element
    var div = document.createElement('div');
    div.className = "col-md-3";
    div.innerHTML = '<div class="block" id="' + itemid + '">' + '<div class="b-img"><a href="javacript:void(0)" onclick="app.remove(\'' + itemid + '\')" class="remove"><i class="material-icons">clear</i></a><a href="javacript:void(0)" onclick="app.photoPage(\'' + itemid + '\')"><img id="myImage" src="' + params.img + '"></a></div>' + '<div class="b-name h2">' + params.name + '</div>' + '<div class="b-cat additional"><i class="material-icons inline-block">folder</i> ' + params.cat + '</div>' + '<div class="b-desc">' + params.desc + '</div>' + '</div>';
    append(div, 'items');
}
app.addToStorage = function (params, itemid) {
    itemid = itemid || 'item' + GLOBALID + ''; //if we add new global id will be the last element
    try {
        localStorage.setItem('item' + GLOBALID + '', JSON.stringify(params));
        GLOBALID++;
    } catch (err) {
        alert(err);
    }
    var loaderdiv = document.getElementById('addform');
    addRemoveClass(loaderdiv, 'loader');
}
app.photoPage = function (item) {
    //go to localstorage and output data from it
    var parsed = JSON.parse(localStorage.getItem(item));
    document.getElementById('mainphoto').innerHTML = '<img src="' + parsed.img + '">';
    document.getElementById('maindesc').innerHTML = '<div class="b-name h2">' + parsed.name + '</div><div class="b-cat additional"><i class="material-icons inline-block">folder</i> ' + parsed.cat + '</div><div class="b-desc">' + parsed.desc + '</div>';
    app.changeView('photo');
}
app.catPage = function (item, event) {
    event.preventDefault();
    app.changeView('gallery', item.text, app.onlySelected);
}

app.onlySelected = function(subpage) {
    var itemsrow = document.querySelector('#items .row');
    itemsrow.innerHTML = "";
    for (var i = 0; i < localStorage.length; i++) {
        var thiskey = localStorage.key(i);
        var parsed = JSON.parse(localStorage.getItem(thiskey));
        if (thiskey.indexOf('item') > -1) { //check if localStorage has items
            if (parsed.cat === subpage) {
                app.addPhoto(parsed, thiskey);
            }
        }
    }
}

app.remove = function (item) {
    var divtoremove = document.getElementById(item).parentElement; //col-md-3
    divtoremove.parentElement.removeChild(divtoremove);
    localStorage.removeItem(item);
}
app.addCat = function (event) {
    event.preventDefault();

    var arr = [],
        newcat = addform2.elements["inputcat"].value;
    app.addFrontendCat(newcat);
    addform2.elements["inputcat"].value = ""; //frontend end

    //backend
    if (localStorage.getItem('albums')) { //if cats exists take cats from it and set arr
        arr = JSON.parse(localStorage.getItem('albums'));
    }
    arr.push(newcat);
    try {
        localStorage.setItem('albums', JSON.stringify(arr));
    } catch (err) {
        alert(err);
    }
}
app.addFrontendCat = function(cat){
    var firstli = document.querySelector('#catlist ul li:first-child'),
        secondli = document.querySelector('#catlist2 ul li:first-child'),
        li = document.createElement('li'),
        li2 = document.createElement('li'),
        option = document.createElement('option');
    if (firstli.innerHTML === 'you don\'t have any albums yet') { //check if it is first cat
        firstli.parentNode.removeChild(firstli);
        secondli.parentNode.removeChild(secondli);
    }
    li.innerHTML = '<a href="javascript:void(0)" onclick="app.catPage(this, event)">'+cat+'</a>';
    li2.innerHTML = '<a href="javascript:void(0)" onclick="app.catPage(this, event)">'+cat+'</a>';
    option.innerHTML = cat;
    append(li, 'catlist');
    append(li2, 'catlist2');
    append(option, 'formselect');
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
    function changeRoute() {
        var route = location.hash.substr(3);
        if (route.indexOf('#') > 0) {
            var subcat = route.split('/')[1];
            app.changeView('gallery',subcat, app.onlySelected);
        } else {
            app.changeView(route);
        }
    }
    window.addEventListener('hashchange', hashChangeCallback, false);
    window.addEventListener('popstate', function(event) { //for <- and -> history buttons
        if (event.state) {
            changeRoute();
        }
    }, false);

    if (!window.location.hash) {
        //check if index.html without hash onload
        app.changeView('home');
        hashChangeCallback();
    } else {
        changeRoute();
        hashChangeCallback();
    }
    //check if hass local stored item then append them to page
    if (localStorage.length) {
        for (var i = 0; i < localStorage.length; i++) {
            var thiskey = localStorage.key(i);
            var parsed = JSON.parse(localStorage.getItem(thiskey));
            if (thiskey.indexOf('item') > -1) { //check if localStorage has items
                app.addPhoto(parsed, thiskey);
                GLOBALID = parseInt(thiskey.split('item')[1]);
                GLOBALID++;
            } else if (thiskey.indexOf('albums') > -1) { //check if localStorage has cats
                for (var j = 0; j < parsed.length; j++) {
                    var cat = parsed[j];
                    app.addFrontendCat(cat);
                }
            }
        }
    }
    //check if items is empty
    checkIfEmpty('#items .row', function () {
        var itemsrow = document.querySelector('#items .row');
        itemsrow.innerHTML = '<div class="col-xs-12">you don\'t have any albums yet</div>';
    });
}

app.init(); //initialize app
