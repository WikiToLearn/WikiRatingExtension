var nameSpace,badgeNumberStats,pageRank,totalVotes,currentPageVote,pageReliability,maxPageRank,maxPageReliability;

//To wait for the page to load completely
$( document ).ready(function () {

    var maxPageRating,currentPageRating,pageTitle,badgeNumber,badgeImage;

    if(mw.config.get("wgNamespaceNumber")!=-1){


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


//Code to display the stats
$.ajax({
  type: 'GET',
  url: "http://localhost:8080/WikiRating/engine/stats/display?callback=?",
  data: {pageTitle: mw.config.get("wgPageName")},
  dataType: 'jsonp',
  success: function(data) {

 nameSpace=data['nameSpace'];
 badgeNumberStats=data['badgeNumber'];
 pageRank=data['pageRank'];
 totalVotes=data['totalVotes'];
 currentPageVote=data['currentPageVote'];
 pageReliability=data['pageReliability'];
 maxPageRank=data['maxPageRank'];
 maxPageReliability=data['maxPageReliability'];

  },
error: function(jqXHR, textStatus, errorThrown) {
  console.log(errorThrown); console.log(textStatus);
}

});

}

});




  //code to handle click event on MORE button
       $(document).on('click','#stats', function()
       {

        console.log(badgeNumberStats);
        var specialPageURL="http://en.tuttorotto.biz/Special:WikiRating?"+"nameSpace="+nameSpace+"&"+"badgeNumberStats="+badgeNumberStats+"&"+"pageRank="+pageRank+"&"+"totalVotes="+totalVotes+"&"+"currentPageVote="+currentPageVote+"&"+"pageReliability="+pageReliability+"&"+"maxPageRank="+maxPageRank+"&"+"maxPageReliability="+maxPageReliability;
        var popup=window.open(specialPageURL,"newwin");


       });
