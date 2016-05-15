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

function loader(div) {
    var loaderdiv = document.getElementById(div);
    addRemoveClass(loaderdiv, 'loader');
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

//validate input type file
var fileToRead = document.getElementById("file");
fileToRead.addEventListener("change", function(event) {
    var files = fileToRead.files;
    var len = files.length;
    // we should read just one file
    if (len) {
        var checked = document.getElementById('checked');
        if (checked) {
            checked.parentNode.removeChild(checked);
        }
        var div = document.createElement('div');
        div.id = 'checked';
        div.className = "inline-block green margin10";
        div.innerHTML = '<i class="material-icons">check</i>';
        document.getElementById('filediv').appendChild(div);
    } else {
        var divtoremove = document.getElementById('checked');
        divtoremove.parentElement.removeChild(divtoremove);
    }

}, false);


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
        loader('addform');
        if (localStorage.length) { // check if localstorage allready have item with "trying to added" name
            for (var i = 0; i < localStorage.length; i++) {
                var thiskey = localStorage.key(i);
                var parsed = JSON.parse(localStorage.getItem(thiskey));
                if (parsed.name === photoname) { //check if localStorage has items
                    alert('this photo allready exists!');
                    loader('addform');
                    return false;
                }
            }
        }
        datatosend = {
            cat: photocat,
            name: photoname,
            desc: photodesc
        }
        if (document.getElementById("file").value.length) {
            if (!photofile.name.match(/\.(jpg|jpeg|png|gif)$/)) {
                alert('please choose a image file');
                loader('addform');
                return false;
            } else {
                createImg(datatosend, app.addPhoto, app.addToStorage); //get data from fields and send to createImg function
                clearForm();
            }
        } else {
            //var videoImage = document.getElementById("videoImage");
            datatosend.img = document.getElementById("videoImage").src;
            app.addPhoto(datatosend);
            app.addToStorage(datatosend);
            app.changeView('gallery');
            clearForm();
        }
    }
}

function clearForm() {
    addform.elements["category"].value = "";
    addform.elements["photoname"].value = "";
    addform.elements["description"].value = "";
    addform.elements["file"].value = "";
    var checked = document.getElementById('checked');
    checked.parentNode.removeChild(checked);
}

function createImg(datatosend, callback, callback2) { // using fileAPI
    var input, file, fr, img;

    if (typeof window.FileReader !== 'function') {
        write("The file API isn't supported on this browser yet.");
        return;
    }

    input = document.getElementById('file');
    if (!input) {
        alert("Um, couldn't find the imgfile element.");
        loader('addform');
    } else if (!input.files) {
        alert("This browser doesn't seem to support the `files` property of file inputs.");
        loader('addform');
    } else if (!input.files[0]) {
        alert("Please select a file before clicking 'Submit'");
        loader('addform');
    } else {
        file = input.files[0];
        fr = new FileReader();
        fr.onload = function () {
            img = new Image();
            img.onload = function () {
                var canvas = document.getElementById("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                datatosend.img = canvas.toDataURL("image/png");
                app.changeView('gallery');
                callback(datatosend); //app.addPhoto(created_image, data_from_fields)
                callback2(datatosend);
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

function cleardiv(div) {
    var itemsrow = document.querySelector(div);
    itemsrow.innerHTML = "";
}

var mediaStream = null;

function videoStart(event) {
    event.preventDefault();
    var div = document.getElementById('fader');
    addRemoveClass(div, 'active');
    var btn = document.getElementById('addToForm');
    btn.style.display = 'none';
    var takephoto = document.getElementById('takephoto');
    takephoto.setAttribute('onclick','takePhoto(this, event)');
    takephoto.innerHTML = 'take a photo <i class="material-icons">photo_camera</i>';
    videoRun(event);
    if (document.getElementById('camera').children.length > 1) {
        var ch = document.getElementById('camera').children[1];
        ch.parentNode.removeChild(ch);
    }
}
function videoRun(event, elem) {
    event.preventDefault();
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    if (navigator.getUserMedia) {
        navigator.getUserMedia({
                audio: false,
                video: {
                    width: 640,
                    height: 480
                }
            },
            function (stream) {
                var video = document.querySelector('video');
                var img = document.getElementById('videoImage');
                img.style.display = 'none';
                video.src = window.URL.createObjectURL(stream);
                video.style.display = 'block';
                video.onloadedmetadata = function (e) {
                    video.play();
                };
                mediaStream = stream;
            },
            function (err) {
                alert("The following error occurred: " + err.name);
            }
        );
    } else {
        alert("getUserMedia not supported");
    }
    if (elem) {
        elem.innerHTML = 'take a photo <i class="material-icons">photo_camera</i>';
        elem.setAttribute('onclick','takePhoto(this, event)');
        var btn = document.getElementById('addToForm');
        btn.style.display = 'none';
    }
}

function videoStop(event) {
    event.preventDefault();
    var video = document.querySelector('video'),
        div = document.getElementById('fader'),
        btn = document.getElementById('addToForm');
    addRemoveClass(div, 'active');
    mediaStream.getVideoTracks()[0].stop();
    video.src="";
    video.style.display = 'none';
    btn.style.display = 'none';
}

function takePhoto(elem, event) {
    event.preventDefault();
    var video = document.querySelector('video'),
        canvas = document.getElementById('canvas2'),
        img = document.getElementById('videoImage'),
        btn = document.getElementById('addToForm');
    canvas.getContext('2d').drawImage(video, 0, 0, 640, 480);
    // "image/webp" works in Chrome 18. In other browsers, this will fall back to image/png.
    img.src = canvas.toDataURL('image/png');
    img.style.display = 'block';
    mediaStream.getVideoTracks()[0].stop();
    video.src="";
    video.style.display = 'none';
    btn.style.display = 'inline-block';
    elem.innerHTML = 'take another<i class="material-icons">videocam</i>';
    elem.setAttribute('onclick','videoRun(event, this)');
}

function addToForm(event){
    event.preventDefault();
    var fader = document.getElementById('fader');
    addRemoveClass(fader, 'active');

    document.getElementById("file").value = ""; // remove value from file
    var checked = document.getElementById('checked');
    if (checked) {
        checked.parentNode.removeChild(checked);
    } // end remove value from file

    var div = document.createElement('div');
    div.id = 'checked';
    div.className = "inline-block green";
    div.innerHTML = '<i class="material-icons">check</i>';
    document.getElementById('camera').appendChild(div);
}

