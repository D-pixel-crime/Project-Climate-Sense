$(document).ready(function () {
    var cityName = $(".city-name").text().trim();
    $(".city-name").css('animation', `typing 1s steps(${cityName.length})`)
});

$(document).ready(function () {
    $(".weather-boxes").addClass("slide-down");
    setTimeout(() => {
        $(".weather-boxes").removeClass("slide-down");
    }, 1500);
});