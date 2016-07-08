$( document ).ready(function () {
    

    var $rating = $('<progress value="50" max="100" style="float: left ">33%</progress>');
    var $ratingText=$('<p align=centre>Page Rating</p>');
    $ratingText.appendTo(document.getElementById("siteSub"));
    $rating.appendTo(document.getElementById("siteSub"));

    });

