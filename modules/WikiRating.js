$( document ).ready(function () {


    var $rating = $('<progress value="66" max="100" >33%</progress><br>');
    var $ratingText="Page Rating: ";
    $( "#siteSub" ).append($ratingText);
    $rating.appendTo(document.getElementById("siteSub"));
    $( "#siteSub" ).append("Title: "+mw.config.get("wgPageName")+"<br>"+" User: "+mw.config.get("wgUserName")+"<br>");

    var badgeImage = $('<img />', {src : 'extensions/WikiRating/modules/im.png'});
    badgeImage.appendTo('#siteSub');

    //var $ratingText=$('<p align=centre>Page Rating</p>');
    //var $ratingText="hello I am good";
    /*$ratingText.appendTo(document.getElementById("siteSub"));
    $rating.appendTo(document.getElementById("siteSub"));*/
    //$testContent=load("www.google.com");
    //$testContent.appendTo(document.getElementById("contentSub"));
    //http://www.json-generator.com/api/json/get/crcEHvmyZK?indent=2
    //$( "#contentSub" ).load( "extensions/WikiRating/modules/sc.php" );

    //$( "#contentSub" ).text(mw.config.get("wgArticleId"));
    //$( "#contentSub" ).text(mw.config.get("wgUserId"));



    });
