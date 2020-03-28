var currentscrumbledword = "";
var currentans = "";
var currentindex = "";
var wordDictionay = [];
var words = ["wonderful", "unmatched"];
// "delivery","awesome","delightfull","cylinder","painful","alternate"];
function getRandomInt(n) {
    return Math.floor(Math.random() * n);
}

function shuffle(s) {
    var arr = s.split(''); // Convert String to array
    var n = arr.length; // Length of the array

    for (var i = 0; i < n - 1; ++i) {
        var j = getRandomInt(n); // Get random of [0, n-1]

        var temp = arr[i]; // Swap arr[i] and arr[j]
        arr[i] = arr[j];
        arr[j] = temp;
    }

    s = arr.join(''); // Convert Array to string
    return s; // Return shuffled string
}

function onload() {
    words.forEach(function(word) {
        var w = word.toUpperCase();
        wordDictionay.push({
            key: shuffle(w),
            value: w
        });

    });
    LoadGui();
}

function LoadGui() {
    clearBox();
    currentindex = randomKeyFromDict(Object.keys(wordDictionay));
    currentscrumbledword = wordDictionay[currentindex].key;
    currentans = wordDictionay[currentindex].value;
    DrawWords(currentscrumbledword);
}

function randomKeyFromDict(items) {
    return items[Math.floor(Math.random() * items.length)];
}

function DrawWords(word) {
    var count = Object(word).length;
    var input = 0;
    word.split('').forEach(function(c) {
        drawLabel(c, count, input);
        input++;
    });
}

function clearBox() {
    document.getElementById("puzzleword").innerHTML = "";
    document.getElementById("puzzlesolution").value = "";
}

function drawLabel(cha, count, input) {
    var bg = randDarkColor();
    var cg = getRandomLightColor();
    var size = count - 3;
    var font = size - 2;
    // document.getElementById("#puzzleword").innerHTML = " ";
    $("#puzzleword").append("<input type='button' class='puzzle-char' id='" + cha + input + "' onmousedown= 'charOnClick(this.value,this.id);' style='background-color: " + bg + ";color:" + cg + " ;border-color: " + cg + ";' value ='" + cha + "'></input>");
    // $("#myAlert").css('visibilty','initial');  
    // width:"+size+"vw;height:"+size+"vw;font-size:"+font+"vw;
}

function randDarkColor() {
    var lum = -0.25;
    var hex = String('#' + Math.random().toString(16).slice(2, 8).toUpperCase()).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    var rgb = "#",
        c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00" + c).substr(c.length);
    }
    return rgb;
}

function getRandomLightColor() {
    var letters = 'BCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}

function charOnClick(chrs, id) {
    var text = document.getElementById("puzzlesolution").value;
    document.getElementById("puzzlesolution").value = text + chrs;

    document.getElementById(id).value = "";
    Logic();
}

function Logic() {
    var input = document.getElementById("puzzlesolution").value;

    if (input.length == currentans.length) {
        if (wordDictionay[currentindex].value == input) {
            Showmessage("Voila!!! Correct Answer Loading New Quiz.")
            wordDictionay.pop(currentscrumbledword);
            LoadGui();
        } else {
            Showmessage("Oops! Wrong Answer Please Try Again")
            wordDictionay.push({
                key: currentscrumbledword,
                value: currentans
            });
            document.getElementById("puzzlesolution").setAttribute("type", "hidden");
            document.getElementById("puzzleword").innerHTML = "";
            showAlert("Oops!!", "You Lost Please Click on Button to Start", 'Danger', "down");
        }
    }
    if (Object(wordDictionay).length == 0) {
        showAlert("Oops!!", "You Win Want to Play Again Pless button", 'success', "up");
    }
}

function CorrectAnsMessage() {


}

function Showmessage(msg) {
    var x = document.getElementById("snackbar");
    x.innerHTML = msg;
    x.className = "show";
    setTimeout(function() { x.className = x.className.replace("show", ""); }, 3000);
}

function showAlert(status, msg, type, thumb) {
    document.getElementById("myAlert").innerHTML = "";
    $("#myAlert").append("<div class='jumbotron jumbotron-fluid bg-" + type + "'>  <div class='container'><h1><i class='fas fa-thumbs-" + thumb + "'></i> " + status + "</h1><p style='padding-left:9%;'>" + msg + "</p></div></div>");
    $("#myAlert").css('visibilty', 'visible');
}