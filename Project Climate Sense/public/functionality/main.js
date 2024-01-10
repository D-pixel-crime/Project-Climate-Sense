$(document).ready(function () {
    $(".weather-boxes").addClass("slide-down");
    setTimeout(() => {
        $(".weather-boxes").removeClass("slide-down");
    }, 1500);
});
