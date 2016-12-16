
$(document).ready(init);

function init() {
    $('#logout-link').on('click', function () {
        logout().then(function () {
            window.location.assign("index.html");
        })
    });

    //http://www.w3schools.com/jquery/event_stoppropagation.asp
    $('#find-car').on('click', function (event) {
        event.stopPropagation();
        findCars($('#find-car-input').val())
    });

    getName().then(function (data) {
        $('#user_loading').addClass('user_loading_hidden').removeClass('user_loading');
        $('#username').html(data);
    });

    $('#rented-tab').on('click', function () {
        findRentals();
    })

    $('#returned-tab').on('click', function () {
        findReturns();
    });
}

function authenticate() {
    var deferred = $.Deferred();
    $.ajax({
        method: "POST",
        url: "server/cars.php",
        dataType: "text",
        data: {type: 'authenticate'}
    }).then(function (data) {
        deferred.resolve(data)
    })
    return deferred.promise()
}

function getName() {
    $('#user_loading').removeClass('user_loading_hidden').addClass('user_loading');
    
    //https://api.jquery.com/jQuery.Deferred/
    //https://docs.angularjs.org/api/ng/service/$q
    var deferred = $.Deferred();
    
    $.ajax({
        method: "POST",
        url: "server/cars.php",
        dataType: "text",
        data: {type: 'getName'}
    }).then(function (data) {
        console.log(data);
        deferred.resolve(data)
    }).then(function (error) {
        console.log(error)
    })
    
    //https://api.jquery.com/promise/
    return deferred.promise();
}

function findCars(value) {
    var loading = '<img src="images/loading.gif">';
    $('#search_results').html(loading);
    console.log(value)
    
    getCars(value).then(function (data) {
        $('#user_loading').addClass('user_loading_hidden').removeClass('user_loading');
        var template = $('#find-car-template').html();
        var html_maker = new htmlMaker(template);
        var html = html_maker.getHTML(data);
        $('#search_results').html(html);

        $('.car_rent').on('click', function () {
            $('#find-car-input').val('');
            rentCar($(this).attr('id'));
            findCars('');

        })
    })


}
function getCars(value) {
    var deferred = $.Deferred();
    
    $.ajax({
        method: "POST",
        url: "server/cars.php",
        dataType: "json",
        data: {type: 'getCars', value: value}
    }).then(function (data) {
        deferred.resolve(data)
    })
    return deferred.promise();
}

function findRentals() {
    var loading = '<img src="images/loading.gif">';
    $('#rented_cars').html(loading);
    
    getRentals().then(function (data) {
        var template = $('#rented-car-template').html();
        var html_maker = new htmlMaker(template);
        var html = html_maker.replace_Block('rented_car', data, template);
        $('#rented_cars').html(html);

        $('.return_car').on('click', function () {
            returnCar($(this).attr('data-rental-id'));
            findRentals();
        })

    })
}

function getRentals() {
    var deferred = $.Deferred();
    $.ajax({
        method: "POST",
        url: "server/cars.php",
        dataType: "json",
        data: {type: 'getRentals'}
    }).then(function (data) {
        $('#find-car').html(data);
        console.log(data);
        deferred.resolve(data)
    })
    return deferred.promise();
}

function findReturns() {
    var loading = '<img src="images/loading.gif">';
    
    $('#returned_cars').html(loading);
    getReturns().then(function (data) {
        var template = $('#returned-car-template').html();
        var html_maker = new htmlMaker(template);
        var html = html_maker.replace_Block('returned_car', data, template);
        $('#returned_cars').html(html);
    });

}

function getReturns() {
    var deferred = $.Deferred();
    
    $.ajax({
        method: "POST",
        url: "server/cars.php",
        dataType: "json",
        data: {type: 'getReturns'}
    }).then(function (data) {
        console.log(data);
        deferred.resolve(data)
    })
    return deferred.promise();
}

function rentCar(value) {
    var deferred = $.Deferred();
    
    $.ajax({
        method: "POST",
        url: "server/cars.php",
        data: {type: 'rentCar', value: value}, //needs to be changed back to 'value' instead of 1
        success: function () {
            alert('Car Rented Successfully!');
        }
    }).then(function (data) {
        deferred.resolve(data)
    })
    return deferred.promise();
}

function returnCar(value) {
    var deferred = $.Deferred();
    $.ajax({
        method: "POST",
        url: "server/cars.php",
        data: {type: 'returnCar', value: value}, //needs to be changed back to 'value' instead of 1
        success: function () {
            alert('Car Returned Successfully!');
        }
    }).then(function (data) {
        deferred.resolve(data)
    })
    return deferred.promise();
}

function logout() {
    var deferred = $.Deferred();
    $.ajax({
        method: "POST",
        url: "server/cars.php",
        dataType: "text",
        data: {type: 'logout'}
    }).then(function (data) {
        deferred.resolve(data)
    })
    return deferred.promise()
}

