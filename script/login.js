$(document).ready(init);

function init() {
    $("#search-button").on("click", login);
    $("#password-input").on("keydown", function (event) {
        maybe_login(event);
    });
}

//event handler for logging in with enter press
function maybe_login(event) {
    if (event.keyCode == 13)
        login();
}

function login() {
    //displays loading icon while login in processes
    $('#loading').removeClass('loading_hidden').addClass('loading');

    $.ajax({
        method: "POST",
        url: "server/login.php",
        dataType: "text",
        data: {type: 'login', username: $("#name-input").val(), password: $("#password-input").val()},
    }).then(function (data) {
        console.log(data);
        $('#loading').removeClass('loading').addClass('loading_hidden'); //removes loading icon
        if ($.trim(data) == "success") //on successful login
            window.location.assign("cars.html"); //redirect the page to cars.html
        else {
            $('#loading').removeClass('loading').addClass('loading_hidden'); //removes loading icon
            $("#login_feedback").html("Invalid username or password"); //show feedback of bad login
        }
    })
}


function authenticate() {
    var deferred = $.Deferred();
    $.ajax({
        method: "POST",
        url: "server/login.php",
        dataType: "text",
        data: {type: 'authenticate'}
    }).then(function () {
        deferred.resolve(true)
    })
    return deferred.promise()
}










