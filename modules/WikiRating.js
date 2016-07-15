$( document ).ready(function () {

    var maxPageRating,currentPageRating,pageTitle,badgeNumber,badgeImage;



    //Code to fetch the Current Page Parameters

    $.ajax({
      type: 'GET',
      url: "http://localhost:8080/WikiRating/engine/display/pageRating?callback=?",
      data: {pageTitle: mw.config.get("wgPageName")},
      dataType: 'jsonp',
      success: function(data) {

        displayRatingBar(data);
        displayPageInfo();
        $( "#siteSub" ).append("Rating Score -- "+Math.round(currentPageRating*100)/100+"/"+Math.round(maxPageRating*100)/100+"<br>");
        displayBadge(data);

        console.log( data['pageTitle'] );


      },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(errorThrown); console.log(textStatus);
    }

  });


//Function to display the Rating bar.
function displayRatingBar(data){
  pageTitle=data['pageTitle'];
  currentPageRating=data['currentPageRating'];
  maxPageRating=data['maxPageRating'];
  badgeNumber=data['badgeNumber'];
  console.log(pageTitle+" "+currentPageRating+" "+maxPageRating+" "+badgeNumber);

  var $rating = $('<progress value='+currentPageRating+' max='+maxPageRating+' ></progress><br>');
  var $ratingText="Page Rating: ";
  $( "#siteSub" ).append($ratingText);
  $rating.appendTo(document.getElementById("siteSub"));
}

//Function to display the PageInfo
function displayPageInfo(){

  $( "#siteSub" ).append("Title: "+mw.config.get("wgPageName")+"<br>"+" User: "+mw.config.get("wgUserName")+"<br>");

}



//Function to display a suitable badge
function displayBadge(data){

  badgeNumber=data['badgeNumber'];

  if(badgeNumber==1){
    badgeImage = $('<img />', {src : 'extensions/WikiRating/modules/resources/images/platinum.png'});
    badgeImage.appendTo('#siteSub');
  }
  else if (badgeNumber==2) {
    badgeImage = $('<img />', {src : 'extensions/WikiRating/modules/resources/images/gold.png'});
    badgeImage.appendTo('#siteSub');
  }

  else if (badgeNumber==3) {
    badgeImage = $('<img />', {src : 'extensions/WikiRating/modules/resources/images/silver.png'});
    badgeImage.appendTo('#siteSub');
  }
  else if (badgeNumber==4) {
    badgeImage = $('<img />', {src : 'extensions/WikiRating/modules/resources/images/bronze.png'});
    badgeImage.appendTo('#siteSub');
  }

  else{
    badgeImage = $('<img />', {src : 'extensions/WikiRating/modules/resources/images/stone.png'});
    badgeImage.appendTo('#siteSub');
  }


}

});

  //Misc comments
  /*  $( "#siteSub" ).append("Title: "+mw.config.get("wgPageName")+"<br>"+" User: "+mw.config.get("wgUserName")+"<br>");
  var badgeImage = $('<img />', {src : 'extensions/WikiRating/modules/im.png'});
  badgeImage.appendTo('#siteSub');*/
  /*
  $.ajax({
  type: 'GET',
  url:"http://localhost:8080/WikiRating/engine/display/pageRating1?callback=?",
  data: {pageTitle: mw.config.get("wgPageName")},
  dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
  success:function(data){
  // do stuff with json (in this case an array)
  //alert("Success");
  console.log(data['Ratings']);
},
error: function(jqXHR, textStatus, errorThrown) {
console.log(errorThrown); console.log(textStatus);
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
