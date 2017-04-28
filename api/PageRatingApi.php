<?php
class PageRatingApi extends ApiBase {
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

	public function getLatestRevisionRating($title, &$result){
		$latestRating = WikiRatingRestClient::getLatestRevisionRating($title);
    $result->addValue(null, $this->getModuleName(),
      array (
        'success' => 'true',
        'response' => $latestRating
      )
    );
	}

	public function getRevisionRatingById($title, $revId, &$result){
		$revisionsRating = WikiRatingRestClient::getRevisionRatingById($title, $revId);
    $result->addValue(null, $this->getModuleName(),
      array (
        'success' => 'true',
        'response' => $revisionsRating
      )
    );
	}

	public function getAllRevisionsRating($title, &$result){
		$revisionsRating = WikiRatingRestClient::getRevisionsRating($title);
    $result->addValue(null, $this->getModuleName(),
      array (
        'success' => 'true',
        'response' => $revisionsRating
      )
    );
	}

	public function getAllowedParams() {
		return array_merge( parent::getAllowedParams(), array(
			'title' => array (
				ApiBase::PARAM_TYPE => 'string',
				ApiBase::PARAM_REQUIRED => 'true',
        ApiBase::PARAM_HELP_MSG => 'api-help-param-title'
			),
			'revid' => array(
				ApiBase::PARAM_TYPE => 'string',
				ApiBase::PARAM_REQUIRED => 'false',
        ApiBase::PARAM_HELP_MSG => 'api-help-param-revid'
			),
			'revisions' => array(
				ApiBase::PARAM_TYPE => 'boolean',
				ApiBase::PARAM_REQUIRED => 'false',
				ApiBase::PARAM_HELP_MSG => 'api-help-param-revisions'
			)
		) );
	}

  protected function getExamplesMessages() {
		return [
			'action=pagerating&title=Course:Modern%20Physics&format=json' =>
				'api-help-pagerating-example'
		];
	}
}
