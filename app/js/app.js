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
        if (text === 'photo') {
            location.hash = '!/gallery#!/' + subpage + '';
        } else {
            location.hash = '!/' + text + '#!/' + subpage + '';
        }
        if (callback) {
            callback(subpage);
        }
    } else {
        location.hash = '!/' + text + '';
        if (text === 'gallery') {
            app.buildContent();
        }
    }
}

app.addPhoto = function (params, itemid) {
    var itemsrow = document.querySelector('#items .row'); //simple check on empty row
    if (itemsrow.innerHTML === '<div class="col-xs-12">you don\'t have any photos yet</div>') {
        itemsrow.innerHTML = "";
    }
    itemid = itemid || 'item' + GLOBALID + ''; //if we add, new global id will be the last element
    var div = document.createElement('div');
    div.className = "col-md-3";
    div.innerHTML = '<div class="block" id="' + itemid + '">' + '<div class="b-img"><a href="javacript:void(0)" onclick="app.remove(\'' + itemid + '\')" class="remove"><i class="material-icons">clear</i></a><a href="javacript:void(0)" onclick="app.photoPage(\'' + itemid + '\',event)"><img id="myImage" src="' + params.img + '"></a></div>' + '<div class="b-name h2"><a href="javacript:void(0)" onclick="app.photoPage(\'' + itemid + '\',event)">' + params.name + '</a></div>' + '<div class="b-cat additional"><i class="material-icons inline-block">folder</i> ' + params.cat + '</div>' + '<div class="b-desc">' + params.desc + '</div>' + '</div>';
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
    loader('addform');
}

app.photoPage = function (item, event) {
    event.preventDefault();
    //go to localstorage and output data from it
    var parsed = JSON.parse(localStorage.getItem(item));
    document.getElementById('mainphoto').innerHTML = '<div class="block"><img src="' + parsed.img + '"></div><div class="b-desc">' + parsed.desc + '</div>';
    document.getElementById('maindesc').innerHTML = '<div class="b-name h2">' + parsed.name + '</div><div class="b-cat additional"><i class="material-icons inline-block">folder</i> ' + parsed.cat + '</div>';
    app.changeView('photo', ''+parsed.cat +'#!/'+item+'');
}

app.buildContent = function () {
    cleardiv('#items .row');
    if (localStorage.length) {
        for (var i = 0; i < localStorage.length; i++) {
            var thiskey = localStorage.key(i);
            var parsed = JSON.parse(localStorage.getItem(thiskey));
            if (thiskey.indexOf('item') > -1) { //check if localStorage has items
                app.addPhoto(parsed, thiskey);
                GLOBALID = parseInt(thiskey.split('item')[1]);
                GLOBALID++;
            }
        }
    }
    //check if items is empty
    checkIfEmpty('#items .row', function () {
        var itemsrow = document.querySelector('#items .row');
        itemsrow.innerHTML = '<div class="col-xs-12">you don\'t have any photos yet</div>';
    });
}

app.catPage = function (item, event) {
    event.preventDefault();
    app.changeView('gallery', item.text, app.onlySelected);
}

app.onlySelected = function (subpage) {
    cleardiv('#items .row');
    for (var i = 0; i < localStorage.length; i++) {
        var thiskey = localStorage.key(i);
        var parsed = JSON.parse(localStorage.getItem(thiskey));
        if (thiskey.indexOf('item') > -1) { //check if localStorage has items
            if (parsed.cat === subpage) {
                app.addPhoto(parsed, thiskey);
            }
        }
    }
    checkIfEmpty('#items .row', function () {
        var itemsrow = document.querySelector('#items .row');
        itemsrow.innerHTML = '<div class="col-xs-12">there are no photos in this cat</div>';
    });
    app.addActiveClassToAsideCats(subpage);
}

app.addActiveClassToAsideCats = function (subpage) {
    var divs = document.querySelectorAll('#catlist2 .catlist li a'); // add Active class
        for (var i = 0, len = divs.length; i < len; i++) {
            if (divs[i].text === subpage){
            siblingsAddRemoveClass(divs[i].parentElement, 'active');
        }
    }
}

app.remove = function (item) {
    var divtoremove = document.getElementById(item).parentElement; //col-md-3
    divtoremove.parentElement.removeChild(divtoremove);
    localStorage.removeItem(item);
    var route = location.hash.substr(3);
    if (route.indexOf('#') > 0) {
        checkIfEmpty('#items .row', function () {
            var itemsrow = document.querySelector('#items .row');
            itemsrow.innerHTML = '<div class="col-xs-12">there are no photos in this cat</div>';
        });
    } else {
        checkIfEmpty('#items .row', function () {
            var itemsrow = document.querySelector('#items .row');
            itemsrow.innerHTML = '<div class="col-xs-12">you don\'t have any photos yet</div>';
        });
    }
}
app.addCat = function (event) {
    event.preventDefault();

    var arr = [],
        newcat = addform2.elements["inputcat"].value;

    //backend
    if (localStorage.getItem('albums')) { //if cat exists return false
        arr = JSON.parse(localStorage.getItem('albums'));
        for (var i = 0; i < arr.length; i++) {
            if ( newcat === arr[i] ) {
                alert('This cat allready exists!');
                return false;
            }
        }
    }

    app.addFrontendCat(newcat);
    addform2.elements["inputcat"].value = ""; //frontend end

    arr.push(newcat);
    try { // try is needed to see if the image is too big
        localStorage.setItem('albums', JSON.stringify(arr));
    } catch (err) {
        alert(err);
    }
}
app.addFrontendCat = function (cat) {
    var firstli = document.querySelector('#catlist ul li:first-child'),
        secondli = document.querySelector('#catlist2 ul li:first-child'),
        li = document.createElement('li'),
        li2 = document.createElement('li'),
        li3 = document.createElement('li'),
        option = document.createElement('option');
    if (firstli.innerHTML === 'you don\'t have any albums yet') { //check if it is first cat
        firstli.parentNode.removeChild(firstli);
        secondli.parentNode.removeChild(secondli);
        li3.innerHTML = '<a href="javascript:void(0)" onclick="app.changeView(\'gallery\');siblingsAddRemoveClass(this.parentElement, \'active\');">All</a>';
        append(li3, 'catlist2');
    }
    li.innerHTML = '<a href="javascript:void(0)" onclick="app.catPage(this, event)">' + cat + '</a>';
    li2.innerHTML = '<a href="javascript:void(0)" onclick="app.catPage(this, event)">' + cat + '</a>';
    option.innerHTML = cat;
    append(li, 'catlist');
    append(li2, 'catlist2');
    append(option, 'formselect');

    var route = location.hash.substr(3); //add active class
    if (route.indexOf('#') > 0) {
        var subcat = route.split('/')[1];
        app.addActiveClassToAsideCats(subcat);
    } else if (route === 'gallery'){
        app.addActiveClassToAsideCats('All');
    }

}

app.init = function () {

    function hashChangeCallback() { //changeHistory
        if (/^\#\!/.test(location.hash)) {
            var stateParameters = {
                foo: "bar" //test
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
            if (route.indexOf('item') > 0) {
                var photoItem = route.split('/')[2];
                app.photoPage(photoItem);
            } else {
                var subcat = route.split('/')[1];
                app.changeView('gallery', subcat, app.onlySelected);
            }
        } else {
            app.changeView(route);
        }
    }
    window.addEventListener('hashchange', hashChangeCallback, false);
    window.addEventListener('popstate', function (event) { //for <- and -> history buttons
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
    //check if hass local stored cats then append them to page
    if (localStorage.length) {
        for (var i = 0; i < localStorage.length; i++) {
            var thiskey = localStorage.key(i);
            var parsed = JSON.parse(localStorage.getItem(thiskey));
            if (thiskey.indexOf('albums') > -1) {
                for (var j = 0; j < parsed.length; j++) {
                    var cat = parsed[j];
                    app.addFrontendCat(cat);
                }
            }
        }
    }
}

app.init(); //initialize app
