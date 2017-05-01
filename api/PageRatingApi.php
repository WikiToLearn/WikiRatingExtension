<?php
/**
* PageRatingApi extends ApiBase in order to expose an action API module
*
* @author Alessandro Tundo <alessandrotundo94@gmail.com>
* @access public
*/
class PageRatingApi extends ApiBase {
	/**
	* Evaluates the parameters, performs the requested query
	* and sets up the result
	* @return boolean true
	* @access public
	*/
	public function execute() {
    global $wgContLang;
		$title = $this->getMain()->getVal( 'title' );
		$revId = $this->getMain()->getVal( 'revid' );
		$revisions = $this->getMain()->getVal( 'revisions' );

    if(is_null($title) || empty($title)){
      if (is_callable([$this, 'dieWithError'])){
        $this->dieWithError(
          [ 'apierror-param-empty', $this->encodeParamName( 'title' ) ], 'notitle'
        );
      } else {
        $this->dieUsage( 'No title selected', '_notitle' );
      }
    }

		$result = $this->getResult();

		if(isset($revisions)){
			$this->getAllRevisionsRating($title, $result);
		}elseif(isset($revId)){
			$this->getRevisionRatingById($title, $revId, $result);
		}else {
			$this->getLatestRevisionRating($title, $result);
		}

		return true;
  }

	/**
	* Get rating information about the latest revision of the requested page
	* and add it to the API result object
	* @param string $title the page title
	* @param ApiResult $result the API result
	* @access public
	*/
	public function getLatestRevisionRating($title, &$result){
		$latestRevisionRatingJson = WikiRatingRestClient::getLatestRevisionRating($title);
		$latestRevisionRatingObj = json_decode($latestRevisionRatingJson);
		$apiResponse = $this->setApiResponse($latestRevisionRatingObj);
		$result->addValue(null, $this->getModuleName(), $apiResponse);
	}

	/**
	* Get rating information about the specified revision of the requested page
	* and add it to the API result object
	* @param string $title the page title
	* @param ApiResult $result the API result
	* @access public
	*/
	public function getRevisionRatingById($title, $revId, &$result){
		$revisionRatingJson = WikiRatingRestClient::getRevisionRatingById($title, $revId);
		$revisionRatingObj = json_decode($revisionRatingJson);
		$apiResponse = $this->setApiResponse($revisionRatingObj);
		$result->addValue(null, $this->getModuleName(), $apiResponse);
	}

	/**
	* Get rating information about all revisions of the requested page
	* and add them to the API result object
	* @param string $title the page title
	* @param ApiResult $result the API result
	* @access public
	*/
	public function getAllRevisionsRating($title, &$result){
		$revisionsRatingJson = WikiRatingRestClient::getAllRevisionsRating($title);
		$revisionsRatingObj = json_decode($revisionsRatingJson);
		$apiResponse = $this->setApiResponse($revisionsRatingObj);
		$result->addValue(null, $this->getModuleName(), $apiResponse);
	}

	/**
	* Set the response value to be added to API result
	* @param Object $ratingObj the WikiRating RESTful API response
	* @return array the response value to be added to API result
	* @access private
	*/
	private function setApiResponse($ratingObj){
		$apiResponse = array('status' => '', 'response' => $ratingObj);
		if (isset($ratingObj->errors) || isset($ratingObj->exception)) {
			$apiResponse['status'] = 'error';
		}else {
			$apiResponse['status'] = 'success';
		}
		return $apiResponse;
	}

	/**
	* Return the allowed parameters in order to document the API
	* @return array the allowed API parameters
	* @access public
	*/
	public function getAllowedParams() {
		return array_merge( parent::getAllowedParams(), array(
			'title' => array (
				ApiBase::PARAM_TYPE => 'string',
				ApiBase::PARAM_REQUIRED => true,
        ApiBase::PARAM_HELP_MSG => 'api-help-param-title'
			),
			'revid' => array(
				ApiBase::PARAM_TYPE => 'string',
				ApiBase::PARAM_REQUIRED => false,
        ApiBase::PARAM_HELP_MSG => 'api-help-param-revid'
			),
			'revisions' => array(
				ApiBase::PARAM_TYPE => 'boolean',
				ApiBase::PARAM_REQUIRED => false,
				ApiBase::PARAM_HELP_MSG => 'api-help-param-revisions'
			)
		) );
	}

	/**
	* Return the some useful examples in order to document the API
	* @return array the API usage examples
	* @access protected
	*/
  protected function getExamplesMessages() {
		return [
			'action=pagerating&title=Course:Modern%20Physics&format=json' =>
				'api-help-pagerating-example'
		];
	}
}
?>
