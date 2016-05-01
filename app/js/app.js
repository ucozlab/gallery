/*app start*/
function app() {

}

app.changeView = function (text, nothing) { //changeView
    var who = document.getElementById(text);
    var link = document.querySelectorAll('#nav ul li a[href="' + text + '"]')[0] || nothing;
    siblingsAddRemoveClass(who, 'active');
    if (typeof nothing != 'undefined') {
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
    GLOBALID = 1;
}

app.addPhoto = function (img, params) {
    var div = document.createElement('div');
    div.className = "col-md-3";
    div.innerHTML = '<div class="block" id="' + GLOBALID + '">' + '<div class="b-img"><a href="app.photopage(this)"><img id="myImage" src="' + img + '"></a></div>' + '<div class="b-name h2">' + params.name + '</div>' + '<div class="b-cat additional"><i class="material-icons inline-block">folder</i> ' + params.cat + '</div>' + '<div class="b-desc">' + params.desc + '</div>' + '</div>';
    var list = document.getElementById('albums');
    var arr = [];
    for (var i = 0; i < list.childNodes.length; i++) {
        if (list.childNodes[i].nodeType == 1) { // check if text
            arr.push(list.childNodes[i]);
        }
    }
    //localStorage.setItem('foo',imgsrc);
    arr[0].appendChild(div);
    GLOBALID++;
    console.log(params);
    var loaderdiv = document.getElementById('addform');
    addRemoveClass(loaderdiv, 'loader');
}

app.photoPage = function(link) {
    var parent = link.parentNode;
    var photo = document.querySelector('.mainphoto .b-img');
    photo.innerHTML(parent.childNodes[0]);
    //<i class="material-icons inline-block">folder</i>
}

app.init(); //initialize app
