var yourCity = [];
var yourCitiesName;

whatCity();
pullTheWeather();

function getYourCity() {
    $("#yourCity").empty();
    $("#cityInput").val("");

    for (i = 0; i < yourCity.length; i++) {
        var a = $("<a>");
        a.addClass("list-group-item list-group-item-action list-group-item-primary city");
        a.attr("data-name", yourCity[i]);
        a.text(yourCity[i]);
        $("#yourCity").prepend(a);
    }
}

function whatCity() {
    var theSavedCities = JSON.parse(localStorage.getItem("cities"));

    if (theSavedCities !== null) {
        yourCity = theSavedCities;
    }

    getYourCity();
}

function pullTheWeather() {
    var storedWeather = JSON.parse(localStorage.getItem("currentCity"));

    if (storedWeather !== null) {
        yourCitiesName = storedWeather;

        seeWeather();
        theWeeklyWeather();
    }
}

function stringCities() {
    localStorage.setItem("cities", JSON.stringify(yourCity));
}

function saveYourCity() {

    localStorage.setItem("currentCity", JSON.stringify(yourCitiesName));
}

$("#lookUpYourCity").on("click", function (event) {
    event.preventDefault();

    yourCitiesName = $("#cityInput").val().trim();
    if (yourCitiesName === "") {
        alert("Please enter a city to look up")

    } else if (yourCity.length >= 5) {
        yourCity.shift();
        yourCity.push(yourCitiesName);

    } else {
        yourCity.push(yourCitiesName);
    }
    saveYourCity();
    stringCities();
    seeWeather();
    theWeeklyWeather();
    getYourCity();

});
$("#cityInput").keypress(function (e) {
    if (e.which == 13) {
        $("#lookUpYourCity").click();
    }
})
async function seeWeather() {

    var theCityLink = "https://api.openweathermap.org/data/2.5/weather?q=" + yourCitiesName + "&units=imperial&appid=87624b9751322679cee59fd587116636"
    var yourCity = [];
    var yourCitiesName;

    whatCity();
    pullTheWeather();

    function getYourCity() {
        $("#yourCity").empty();
        $("#cityInput").val("");

        for (i = 0; i < yourCity.length; i++) {
            var a = $("<a>");
            a.addClass("list-group-item list-group-item-action list-group-item-primary city");
            a.attr("data-name", yourCity[i]);
            a.text(yourCity[i]);
            $("#yourCity").prepend(a);
        }
    }

    function whatCity() {
        var theSavedCities = JSON.parse(localStorage.getItem("cities"));

        if (theSavedCities !== null) {
            yourCity = theSavedCities;
        }

        getYourCity();
    }

    function pullTheWeather() {
        var storedWeather = JSON.parse(localStorage.getItem("currentCity"));

        if (storedWeather !== null) {
            yourCitiesName = storedWeather;

            seeWeather();
            theWeeklyWeather();
        }
    }

    function stringCities() {
        localStorage.setItem("cities", JSON.stringify(yourCity));
    }

    function saveYourCity() {

        localStorage.setItem("currentCity", JSON.stringify(yourCitiesName));
    }

    $("#lookUpYourCity").on("click", function (event) {
        event.preventDefault();

        yourCitiesName = $("#cityInput").val().trim();
        if (yourCitiesName === "") {
            alert("Please enter a city to look up")

        } else if (yourCity.length >= 5) {
            yourCity.shift();
            yourCity.push(yourCitiesName);

        } else {
            yourCity.push(yourCitiesName);
        }
        saveYourCity();
        stringCities();
        seeWeather();
        theWeeklyWeather();
        getYourCity();

    });
    $("#cityInput").keypress(function (e) {
        if (e.which == 13) {
            $("#lookUpYourCity").click();
        }
    })
    async function seeWeather() {

        var theCityLink = "https://api.openweathermap.org/data/2.5/weather?q=" + yourCitiesName + "&units=imperial&appid=87624b9751322679cee59fd587116636";

        var waitingRes = await $.ajax({
            url: theCityLink,
            method: "GET"
        })
        console.log(waitingRes);
        var theCurrentCity = $("<h3 class = 'card-body'>").text(getCurrentCity + " (" + val + ")");
        theCurrentCity.append(weatherIcon);
        DivTheCurrentWeather.append(theCurrentCity);
        var pullTheWind = waitingRes.wind.speed.toFixed(1);
        var theWind = $("<p class='card-text'>").text("Wind Speed: " + pullTheWind + " mph");
        DivTheCurrentWeather.append(theWind);
        var longitude = waitingRes.coord.lon;
        var latitude = waitingRes.coord.lat;
        var pullTemp = waitingRes.main.temp.toFixed(1);
        var DivTheCurrentWeather = $("<div class='card-body' id='currentWeather'>");
        var getCurrentCity = waitingRes.name;
        var theDates = new Date();
        var val = (theDates.getMonth() + 1) + "/" + theDates.getDate() + "/" + theDates.getFullYear();
        var whatIsCurrentWeather = waitingRes.weather[0].icon;
        var weatherIcon = $("<img src = http://openweathermap.org/img/wn/" + whatIsCurrentWeather + "@2x.png />");
        var theTemp = $("<p class='card-text'>").text("Temperature: " + pullTemp + "° F");
        DivTheCurrentWeather.append(theTemp);
        var pullHumidity = waitingRes.main.humidity;
        var theHumidity = $("<p class='card-text'>").text("Humidity: " + pullHumidity + "%");
        DivTheCurrentWeather.append(theHumidity);


        var uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=87624b9751322679cee59fd587116636&lat=" + latitude + "&lon=" + longitude;
        var uvRays = await $.ajax({
            url: uvURL,
            method: "GET"
        })
        var pullTheUVIndex = uvRays.value;
        var theUVNum = $("<span>");
        if (pullTheUVIndex > 0 && pullTheUVIndex <= 2.99) {
            theUVNum.addClass("low");
        } else if (pullTheUVIndex >= 3 && pullTheUVIndex <= 5.99) {
            theUVNum.addClass("moderate");
        } else if (pullTheUVIndex >= 6 && pullTheUVIndex <= 7.99) {
            theUVNum.addClass("high");
        } else if (pullTheUVIndex >= 8 && pullTheUVIndex <= 10.99) {
            theUVNum.addClass("vhigh");
        } else {
            theUVNum.addClass("extreme");
        }
        theUVNum.text(pullTheUVIndex);
        var theUVelement = $("<p class='card-text'>").text("UV Index: ");
        theUVNum.appendTo(theUVelement);
        DivTheCurrentWeather.append(theUVelement);
        $("#weatherContainer").html(DivTheCurrentWeather);
    }
    async function theWeeklyWeather() {

        var theCityLink = "https://api.openweathermap.org/data/2.5/forecast?q=" + yourCitiesName + "&units=imperial&appid=87624b9751322679cee59fd587116636";

        var waitingRes = await $.ajax({
            url: theCityLink,
            method: "GET"
        })
        var divForecast = $("<div  id='fiveDayForecast'>");
        var theForecastHead = $("<h5 class='card-header border-secondary'>").text("5 Day Forecast");
        divForecast.append(theForecastHead);
        var cardDeck = $("<div  class='card-deck'>");
        divForecast.append(cardDeck);

        console.log(waitingRes);
        for (i = 0; i < 5; i++) {
            varforecastBody = $("<div class='card mb-3 mt-3'>");
            var cardBody = $("<div class='card-body'>");
            var theDates = new Date();
            var val = (theDates.getMonth() + 1) + "/" + (theDates.getDate() + i + 1) + "/" + theDates.getFullYear();
            var forecastDate = $("<h5 class='card-title'>").text(val);

            cardBody.append(forecastDate);
            var whatIsCurrentWeather = waitingRes.list[i].weather[0].icon;
            console.log(whatIsCurrentWeather);
            varseeWeatherIcon = $("<img src = http://openweathermap.org/img/wn/" + whatIsCurrentWeather + ".png />");
            cardBody.append(displayWeatherIcon);
            var pullTemp = waitingRes.list[i].main.temp;
            var theTemp = $("<p class='card-text'>").text("Temp: " + pullTemp + "° F");
            cardBody.append(theTemp);
            var pullHumidity = waitingRes.list[i].main.humidity;
            var theHumidity = $("<p class='card-text'>").text("Humidity: " + pullHumidity + "%");
            cardBody.append(theHumidity);
            forecastBody.append(cardBody);
            cardDeck.append(forecastCard);
        }
        $("#forecastContainer").html(divForecast);
    }

    function allWeather() {
        yourCitiesName = $(this).attr("data-name");
        seeWeather();
        theWeeklyWeather();
        console.log(yourCitiesName);

    }

    $(document).on("click", ".city", allWeather);

    var waitingRes = await $.ajax({
        url: theCityLink,
        method: "GET"
    })
    console.log(waitingRes);
    var theCurrentCity = $("<h3 class = 'card-body'>").text(getCurrentCity + " (" + val + ")");
    theCurrentCity.append(weatherIcon);
    DivTheCurrentWeather.append(theCurrentCity);
    var pullTheWind = waitingRes.wind.speed.toFixed(1);
    var theWind = $("<p class='card-text'>").text("Wind Speed: " + pullTheWind + " mph");
    DivTheCurrentWeather.append(theWind);
    var longitude = waitingRes.coord.lon;
    var latitude = waitingRes.coord.lat;
    var pullTemp = waitingRes.main.temp.toFixed(1);
    var DivTheCurrentWeather = $("<div class='card-body' id='currentWeather'>");
    var getCurrentCity = waitingRes.name;
    var theDates = new Date();
    var val = (theDates.getMonth() + 1) + "/" + theDates.getDate() + "/" + theDates.getFullYear();
    var whatIsCurrentWeather = waitingRes.weather[0].icon;
    var weatherIcon = $("<img src = http://openweathermap.org/img/wn/" + whatIsCurrentWeather + "@2x.png />");
    var theTemp = $("<p class='card-text'>").text("Temperature: " + pullTemp + "° F");
    DivTheCurrentWeather.append(theTemp);
    var pullHumidity = waitingRes.main.humidity;
    var theHumidity = $("<p class='card-text'>").text("Humidity: " + pullHumidity + "%");
    DivTheCurrentWeather.append(theHumidity);


    var uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=87624b9751322679cee59fd587116636&lat=" + latitude + "&lon=" + longitude;
    var uvRays = await $.ajax({
        url: uvURL,
        method: "GET"
    })
    var pullTheUVIndex = uvRays.value;
    var theUVNum = $("<span>");
    if (pullTheUVIndex > 0 && pullTheUVIndex <= 2.99) {
        theUVNum.addClass("low");
    } else if (pullTheUVIndex >= 3 && pullTheUVIndex <= 5.99) {
        theUVNum.addClass("moderate");
    } else if (pullTheUVIndex >= 6 && pullTheUVIndex <= 7.99) {
        theUVNum.addClass("high");
    } else if (pullTheUVIndex >= 8 && pullTheUVIndex <= 10.99) {
        theUVNum.addClass("vhigh");
    } else {
        theUVNum.addClass("extreme");
    }
    theUVNum.text(pullTheUVIndex);
    var theUVelement = $("<p class='card-text'>").text("UV Index: ");
    theUVNum.appendTo(theUVelement);
    DivTheCurrentWeather.append(theUVelement);
    $("#weatherContainer").html(DivTheCurrentWeather);
}
async function theWeeklyWeather() {

    var theCityLink = "https://api.openweathermap.org/data/2.5/forecast?q=" + yourCitiesName + "&units=imperial&appid=87624b9751322679cee59fd587116636";

    var waitingRes = await $.ajax({
        url: theCityLink,
        method: "GET"
    })
    var divForecast = $("<div  id='fiveDayForecast'>");
    var theForecastHead = $("<h5 class='card-header border-secondary'>").text("5 Day Forecast");
    divForecast.append(theForecastHead);
    var cardDeck = $("<div  class='card-deck'>");
    divForecast.append(cardDeck);

    console.log(waitingRes);
    for (i = 0; i < 5; i++) {
        varforecastBody = $("<div class='card mb-3 mt-3'>");
        var cardBody = $("<div class='card-body'>");
        var theDates = new Date();
        var val = (theDates.getMonth() + 1) + "/" + (theDates.getDate() + i + 1) + "/" + theDates.getFullYear();
        var forecastDate = $("<h5 class='card-title'>").text(val);

        cardBody.append(forecastDate);
        var whatIsCurrentWeather = waitingRes.list[i].weather[0].icon;
        console.log(whatIsCurrentWeather);
        varseeWeatherIcon = $("<img src = http://openweathermap.org/img/wn/" + whatIsCurrentWeather + ".png />");
        cardBody.append(displayWeatherIcon);
        var pullTemp = waitingRes.list[i].main.temp;
        var theTemp = $("<p class='card-text'>").text("Temp: " + pullTemp + "° F");
        cardBody.append(theTemp);
        var pullHumidity = waitingRes.list[i].main.humidity;
        var theHumidity = $("<p class='card-text'>").text("Humidity: " + pullHumidity + "%");
        cardBody.append(theHumidity);
        forecastBody.append(cardBody);
        cardDeck.append(forecastCard);
    }
    $("#forecastContainer").html(divForecast);
}

function allWeather() {
    yourCitiesName = $(this).attr("data-name");
    seeWeather();
    theWeeklyWeather();
    console.log(yourCitiesName);

}

$(document).on("click", ".city", allWeather);