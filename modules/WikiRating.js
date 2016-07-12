$( document ).ready(function () {

/*
    var $rating = $('<progress value="66" max="100" >33%</progress><br>');
    var $ratingText="Page Rating: ";
    $( "#siteSub" ).append($ratingText);
    $rating.appendTo(document.getElementById("siteSub"));
    $( "#siteSub" ).append("Title: "+mw.config.get("wgPageName")+"<br>"+" User: "+mw.config.get("wgUserName")+"<br>");

    var badgeImage = $('<img />', {src : 'extensions/WikiRating/modules/im.png'});
    badgeImage.appendTo('#siteSub');*/
/*
    $.get("http://localhost:8080/WikiRating/engine/employee/search", { param1:1324, param2:"Ducktown" },function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
        //$( "#contentSub" ).text("hellp");
      }).fail(function(err, status) {
       $( "#contentSub" ).text(err+status);
});*/
/*
$.ajax({
     url:"http://localhost:8080/WikiRating/engine/employee/search",
     dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
     success:function(json){
         // do stuff with json (in this case an array)
         alert("Success");
     },
     error:function(){
         alert("Error");
     }
});*/

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

$.ajax({
    type: 'GET',
    url: "http://localhost:8080/WikiRating/engine/employee/search?callback=?",
    data: {param1: 44 , param2:"Ducktown"},
    dataType: 'jsonp',
    success: function(data) {
        alert("Success");
      //  $( "#test" ).text(data.status);
      console.log( data['PageName'] );

    },
    /*error: function(e) {
       alert("Error");
    }*/

    error: function(jqXHR, textStatus, errorThrown) {
       console.log(errorThrown); console.log(textStatus);
     }


});

});
