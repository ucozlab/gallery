var GLOBALID = 0;
/*app start*/
function app() {

}

app.changeView = function (text, nothing) { //changeView
    var who = document.getElementById(text);
    var link = document.querySelectorAll('#nav ul li a[href="' + text + '"]')[0] || nothing;
    siblingsAddRemoveClass(who, 'active');
    if (typeof nothing !== 'undefined') {
        siblingsAddRemoveClass(link.parentElement, 'active');
    }
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
    //check if hass local stored item then append them to page
    if (localStorage.length) {
        for ( var i = 0; i < localStorage.length; i++ ) {
            var thiskey = localStorage.key(i);
            if (thiskey.indexOf('item') > -1) { //check if localStorage has key, but not item
                var parsed = JSON.parse(localStorage.getItem(thiskey));
                app.addPhoto(parsed, thiskey);
                GLOBALID = parseInt(thiskey.split('item')[1]);
                GLOBALID++;
            }
        }
    }
}

app.addPhoto = function (params, itemid) {
    itemid = itemid || 'item'+GLOBALID+''; //if we add new global id will be the last element
    var div = document.createElement('div');
    div.className = "col-md-3";
    div.innerHTML = '<div class="block" id="' + itemid + '">' + '<div class="b-img"><a href="javacript:void(0)" onclick="app.remove(\'' + itemid + '\')" class="remove"><i class="material-icons">clear</i></a><a href="javacript:void(0)" onclick="app.photoPage(\'' + itemid + '\')"><img id="myImage" src="' + params.img + '"></a></div>' + '<div class="b-name h2">' + params.name + '</div>' + '<div class="b-cat additional"><i class="material-icons inline-block">folder</i> ' + params.cat + '</div>' + '<div class="b-desc">' + params.desc + '</div>' + '</div>';
    append(div,'albums');
}
app.addToStorage = function (params, itemid) {
    itemid = itemid || 'item'+GLOBALID+''; //if we add new global id will be the last element
    try {
        localStorage.setItem('item'+GLOBALID+'',JSON.stringify(params));
        GLOBALID++;
    } catch (err) {
        alert(err);
    }
    var loaderdiv = document.getElementById('addform');
    addRemoveClass(loaderdiv, 'loader');
}
app.photoPage = function(item) {
    app.changeView('photo');
    //go to localstorage and output data from it
    var parsed = JSON.parse(localStorage.getItem(item));
    var div1 = document.createElement('div');
    div1.className = "b-img";
    div1.innerHTML = '<img src="' + parsed.img + '">';
    append(div1,'mainphoto');
    var div2 = document.createElement('div');
    div2.className = "b-content";
    div2.innerHTML = '<div class="b-name h2">' + parsed.name + '</div><div class="b-cat additional"><i class="material-icons inline-block">folder</i> ' + parsed.cat + '</div><div class="b-desc">' + parsed.desc + '</div>';
    append(div2,'maindesc');
}
app.remove = function(item) {
    var divtoremove = document.getElementById(item).parentElement; //col-md-3
    divtoremove.parentElement.removeChild(divtoremove);
    localStorage.removeItem(item);
}
app.init(); //initialize app
