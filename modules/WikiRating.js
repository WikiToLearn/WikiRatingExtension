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
        voteBar();

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

//Function to display Vote Bar
function voteBar(){
  $voteSlider=$('<div id="slider" align="center" ><input id="slide" type="range" min="0" max="10" step="1" value="0"  style="width: 25%;" /><p id ="jd" style="font-size : 20px;">0</p><button type="button" id="voteButton" style="font-size : 12px; width: 10%; height: 5%;" >Vote</button>  <button type="button" id="stats" style="font-size : 12px; width: 10%; height: 5%;" >More!</button></div><br/>');
  $("#firstHeading").append($voteSlider);
  $( "#slide" ).change(function() {
    console.log($( "#slide" ).val());
    $("#jd").text($( "#slide" ).val());
});

}

// Function to handle the click event on the Vote button and submit the vote to the server

$(document).on('click','#voteButton', function()
{

    var userName=mw.config.get("wgUserName");
    var pageTitle=mw.config.get("wgPageName");
    var userVote=$( "#slide" ).val();
    console.log(userVote);

    $.ajax({
      type: 'POST',
      url: "http://localhost:8080/WikiRating/engine/votePage/userVote?callback=?",
      data: {
              pageTitle:pageTitle,
              userName:userName,
              userVote:userVote
    },
      dataType: 'jsonp',
      success: function(data) {

        console.log( data['pageTitle'] );


      },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(errorThrown); console.log(textStatus);
    }

  });



});

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

//Code to display the stats



function getStats(popup){

  $.ajax({
    type: 'GET',
    url: "http://localhost:8080/WikiRating/engine/stats/display?callback=?",
    data: {pageTitle: mw.config.get("wgPageName")},
    dataType: 'jsonp',
    success: function(data) {
      displayStats(data,popup);
    //  createPopup(popup);
    },
  error: function(jqXHR, textStatus, errorThrown) {
    console.log(errorThrown); console.log(textStatus);
  }

});

}

function displayStats(data,popup){




  //var popup = open("", "Popup", "width=1366,height=368");

  var nameSpace=popup.document.createTextNode("NameSpace : "+data['nameSpace']);
  var badgeNumber=popup.document.createTextNode("Badge Number : "+data['badgeNumber']);
  var pageRank=popup.document.createTextNode("Page Rank / Max Page Rank: "+data['pageRank']+"/"+data['maxPageRank']);
  var totalVotes=popup.document.createTextNode("Total Votes : "+data['totalVotes']);
  var currentPageVote=popup.document.createTextNode("Current Page Vote : "+data['currentPageVote']);
  var pageReliability=popup.document.createTextNode("Page Reliability / Max Page Reliability: "+data['pageReliability']+"/"+data['maxPageReliability']);

  popup.document.body.appendChild(nameSpace);
  var br = document.createElement("br");
  popup.document.body.appendChild(br);

  popup.document.body.appendChild(badgeNumber);
  var br = document.createElement("br");
  popup.document.body.appendChild(br);

  popup.document.body.appendChild(pageRank);
  var br = document.createElement("br");
  popup.document.body.appendChild(br);

  popup.document.body.appendChild(totalVotes);
  var br = document.createElement("br");
  popup.document.body.appendChild(br);

  popup.document.body.appendChild(currentPageVote);
  var br = document.createElement("br");
  popup.document.body.appendChild(br);

  popup.document.body.appendChild(pageReliability);

console.log(data);

}

       $(document).on('click','#stats', function()
       {

            //var popup = open("", "Popup", "width=1366,height=368");
            var popup=window.open("about:blank","newwin");
            getStats(popup);

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
