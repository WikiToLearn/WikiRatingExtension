<?php
/**
* WikiRatingRestClient is a static class to consume the WikiRating RESTful API
*
* @author Alessandro Tundo <alessandrotundo94@gmail.com>
* @access public
*/
public static class WikiRatingRestClient{

  /**
  * Use WikiRating RESTful API to get the latest revision rating information
  * @param string $title the page title
  * @return string the JSON response
  * @access public
  */
  public static function getLatestRevisionRating($title){
    global $wgLanguageCode, $wgWikiRatingRestApi;
    $pageTitle = Title::newFromTextThrow($title);
    $wikiPage = WikiPage::factory($pageTitle);
    $pageId = $wikiPage->getId();

    $curl = curl_init();
    curl_setopt_array($curl, array(
      CURLOPT_FRESH_CONNECT => 1,
      CURLOPT_RETURNTRANSFER => 1,
      CURLOPT_FORBID_REUSE => 1,
      CURLOPT_URL => "$wgWikiRatingRestApi/$wgLanguageCode/pages/$pageId"
    ));
    $response = curl_exec($curl);
    curl_close($curl);

    return $response;
  }

  /**
  * Use WikiRating RESTful API to get rating information
  * requested revision
  * @param string $title the page title
  * @param string $revisionId the revision id
  * @return string the JSON response
  * @access public
  */
  public static function getRevisionRatingById($title, $revisionId = null){
    global $wgLanguageCode, $wgWikiRatingRestApi;
    $pageTitle = Title::newFromTextThrow($title);
    $wikiPage = WikiPage::factory($pageTitle);
    $pageId = $wikiPage->getId();
    if ($revisionId == null) {
      $revisionId = $wikiPage->getLatest();
    }

    $curl = curl_init();
    curl_setopt_array($curl, array(
      CURLOPT_FRESH_CONNECT => 1,
      CURLOPT_RETURNTRANSFER => 1,
      CURLOPT_FORBID_REUSE => 1,
      CURLOPT_URL => "$wgWikiRatingRestApi/$wgLanguageCode/pages/$pageId/revisions/$revisionId"
    ));
    $response = curl_exec($curl);
    curl_close($curl);

    return $response;
  }

  /**
  * Use WikiRating RESTful API to get the all revision rating information
  * @param string $title the page title
  * @return string the JSON response
  * @access public
  */
  public static function getAllRevisionsRating($title){
    global $wgLanguageCode, $wgWikiRatingRestApi;
    $pageTitle = Title::newFromTextThrow($title);
    $wikiPage = WikiPage::factory($pageTitle);
    $pageId = $wikiPage->getId();

    $curl = curl_init();
    curl_setopt_array($curl, array(
      CURLOPT_FRESH_CONNECT => 1,
      CURLOPT_RETURNTRANSFER => 1,
      CURLOPT_FORBID_REUSE => 1,
      CURLOPT_URL => "$wgWikiRatingRestApi/$wgLanguageCode/pages/$pageId/revisions"
    ));
    $response = curl_exec($curl);
    curl_close($curl);

    return $response;
  }

  /**
  * Use WikiRating RESTful API to get all the votes of the requested revision
  * @param string $title the page title
  * @param string $revisionId the revision id
  * @return string the JSON response
  * @access public
  */
  public static function getVotes($title, $revisionId = null){
    global $wgLanguageCode, $wgWikiRatingRestApi;
    $pageTitle = Title::newFromTextThrow($title);
    $wikiPage = WikiPage::factory($pageTitle);
    $pageId = $wikiPage->getId();
    if ($revisionId == null) {
      $revisionId = $wikiPage->getLatest();
    }

    $curl = curl_init();
    curl_setopt_array($curl, array(
      CURLOPT_FRESH_CONNECT => 1,
      CURLOPT_RETURNTRANSFER => 1,
      CURLOPT_FORBID_REUSE => 1,
      CURLOPT_URL => "$wgWikiRatingRestApi/$wgLanguageCode/pages/$pageId/revisions/$revisionId/votes"
    ));
    $response = curl_exec($curl);
    curl_close($curl);

    return $response;
  }

  /**
  * Use WikiRating RESTful API to vote the requested revision
  * @param string $title the page title
  * @param int $userId the user id
  * @param double $vote the vote value
  * @param int $revisionId the revision id
  * @return string the JSON response
  * @access public
  */
  public static function vote($title, $userId, $vote, $revisionId = null){
    global $wgLanguageCode, $wgWikiRatingRestApi;
    $pageTitle = Title::newFromTextThrow($title);
    $wikiPage = WikiPage::factory($pageTitle);
    $pageId = $wikiPage->getId();
    if ($revisionId == null) {
      $revisionId = $wikiPage->getLatest();
    }

    $params = [
      'userId' => $userId,
      'vote' => $vote
    ];
    $curl = curl_init();
    curl_setopt_array($curl, array(
      CURLOPT_FRESH_CONNECT => 1,
      CURLOPT_RETURNTRANSFER => 1,
      CURLOPT_FORBID_REUSE => 1,
      CURLOPT_URL => "$wgWikiRatingRestApi/$wgLanguageCode/pages/$pageId/revisions/$revisionId/votes",
      CURLOPT_POST => 1,
      CURLOPT_POSTFIELDS => http_build_query($params),
    ));
    $response = curl_exec($curl);
    curl_close($curl);

    return $response;
  }
}
