( function ( $, mw ) {
    'use strict';

    /**
     * Variables to be used
     */
    var nameSpace,badgeNumberStats,pageRank,totalVotes,
    currentPageVote,pageReliability,maxPageRank,maxPageReliability;
    // var url = 'http://localhost:8080/WikiRating/engine/display/pageRating?callback=?';
    
    var pageTitle       = mw.config.get('wgPageName');
    var userName        = mw.config.get('wgUserName');
    var nameSpaceNumber = mw.config.get('wgNamespaceNumber');
    var voteGiven       = 0; // the vote give by the user. 0 means he hasn't voted yet

    // getDataFromServer();
    /**
     * Here one should send the ajax request and get the response.
     * I will recreate the response data as a plain object just to do some tests.
     */
    var data = {
        status: "success",
        response: {
            graphId                           :1766,
            lang                              :"de",
            timestamp                         :1488023495000,
            changeCoefficient                 :0,
            currentMeanVote                   :3.2,
            currentVotesReliability           :0,
            currentNormalisesVotesReliability :0.43,
            totalMeanVote                     :0,
            totalVotesReliability             :0,
            totalNormalisesVotesReliability   :0.78,
            langRevId                         :"de_1282",
            previousRevision                  :null,
            votes                             :51,
            author                            :null,
            revid                             :1282,
            userid                            :2395,
            parentid                          :957,
            size                              :0,
            pageRank                          : 4
        }
    };

    populateData(data);

    $('.rating__star').on('click', function (data) {
        // this will be an array with the classes of the matched element
        var starClassList = this.classList;
        // We take the second class from the star element and get 
        // the characters to identify the number of the star from the 
        // class name. "rating__star--{number}" is the format of the class.
        var stringNumber = starClassList[1].substr(14);
        var starNumber = getNumberFromString(stringNumber);

        console.info("The user will vote with these parameters");
        console.debug("Page: " + pageTitle);
        console.debug("User: " + userName);
        console.debug("Vote:" + starNumber);

        // TODO: handle ajax request
        // Insert AJAX vote action here
        // Let's say it returns a boolean of a succesful request:
        var success = true;
        if (success) {
            // set the vote on the stars
            setVote(starNumber);
            console.info('Set Vote star to ' + starNumber);
            // On success display a "feedback for the vote"
            var thankyouDiv = $('.rating__thank-you');
            thankyouDiv.addClass('rating--visible');
            setTimeout(function () {
                thankyouDiv.fadeTo( 1000, 0, function () {
                    thankyouDiv.removeClass('rating--visible');
                });
            }, 3000);
        } else {
            // TODO: add warning 
        }
    });

    /**
     * Load the html content from the server
     * and put it on bottom of the page. 
     * Once the data has been loaded toggle
     * its visibility on scroll.
     */
    function enableWidget(contentPath) {
        $el = $('<div class="rating__wrapper"></div>').insertAfter('.article__wrapper');
        // Load the data from the server
        $el.load(contentPath, function () {
            // Display the content of rating when the user scrolls on bottom
            $(window).scroll(function () {
                displayRatingBox();
            });
        });
    }

    /**
     * Function that append values and badges to
     * the html
     * @param  {object} data response of the ajax request
     */
    function populateData(data) {
        if (data.pageRank) {
            setVote(data.pageRank);
        }
        // percentual value of the rank
        displayStatsNumber(Math.floor(data.pageRank / data.maxPageRank * 100));
        displayBadge(data.badgeNumber);
    }

    /**
     * Function that toggles the visibility of the rating box
     * when the user window is scrolled down to the bottom
     * of the page
     */
    function displayRatingBox() {
        var $ratingContent   = $('.rating__content');
        var $window          = $(window);
        var ratingContentTop = $ratingContent.offset().top;
        var windowTop        = $window.scrollTop();
        var windowBottom     = windowTop + $window.height();
        if (ratingContentTop > windowTop && ratingContentTop < windowBottom) {
            $ratingContent.addClass("rating--visible");
        }
    }

    /**
     * Function that given the vote, sets the class 
     * "colored" to all the the stars from 1 to vote
     * @param {integer} voteNumber the vote
     */
    function setVote(voteNumber) {
        // First, remove the colored class to all the stars
        $('.rating__star').removeClass('rating__star--colored');
        var starClass = '.rating__star--';
        var element = '';
        for (var i = 1; i <= voteNumber; i++) {
            element =  starClass + getStringFromNumber(i);
            $(starClass + getStringFromNumber(i)).addClass('rating__star--colored');
        }
    }

    /**
     * Function that converts a number written
     * in letters to an integer
     * @param  {string} voteString from 'one' to 'five'
     * @return {integer} the corresponding number
     */
    function getNumberFromString(voteString) {
        var numbers = {
            'zero': 0,
            'one': 1,
            'two': 2,
            'three': 3,
            'four': 4,
            'five': 5
        };
        return numbers[voteString];
    }

    /**
     * Function that takes an integer up to 5 and 
     * returns the corresponding number in words
     * @param {integer} the integer number
     * @return  {string} the corresponding
     */
    function getStringFromNumber(voteInteger) {
        var numbers = ['zero', 'one', 'two', 'three', 'four', 'five'];
        return numbers[voteInteger];
    } 

    /**
     * Function that append the percentual value
     * of the rank to the proper html element
     * @param  {integer} percentualValue
     */
    function displayStatsNumber(percentualValue) {
        $('.rating__value').append(percentualValue + '%');
    }

    /**
     * Function that takes an integer from 1 to 3
     * and append the corresponding unicode 
     * medal character from 1 to 3
     * @param  {integer} badgeNumber 
     */
    function displayBadge(badgeNumber) {
        var trophySpan  = $('.rating__trophy');
        switch (badgeNumber) {
            case 1:
                trophySpan.append('🥉'); // Bronze
                break;
            case 2:
                trophySpan.append('🥈'); // Silver
                break;
            case 3:
                trophySpan.append('🥇'); // Gold
                break;
            default:
                trophySpan.empty();
                break;
        }
    }

} )( jQuery, mediaWiki );