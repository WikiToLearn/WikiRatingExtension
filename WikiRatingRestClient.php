<?php
static class WikiRatingRestClient{

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

  public static function getRevisionRatingById($title, $revisionId){
    global $wgLanguageCode, $wgWikiRatingRestApi;
    $pageTitle = Title::newFromTextThrow($title);
    $wikiPage = WikiPage::factory($pageTitle);
    $pageId = $wikiPage->getId();

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

  public static function getVotes($title, $revisionId){
    global $wgLanguageCode, $wgWikiRatingRestApi;
    $pageTitle = Title::newFromTextThrow($title);
    $wikiPage = WikiPage::factory($pageTitle);
    $pageId = $wikiPage->getId();

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

  public static function vote($title, $userId, $vote){
    global $wgLanguageCode, $wgWikiRatingRestApi;
    $pageTitle = Title::newFromTextThrow($title);
    $wikiPage = WikiPage::factory($pageTitle);
    $pageId = $wikiPage->getId();
    
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
