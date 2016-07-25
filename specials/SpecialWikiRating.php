<?php
/**
 * WikiRating Special page for displaying the ratings
 *
 * @file
 * @ingroup Extensions
 */

class SpecialWikiRating extends SpecialPage {
	public function __construct() {
		parent::__construct( 'WikiRating' );
	}

	/**
	 * Show the page to the user
	 *
	 * @param string $sub The subpage string argument (if any).
	 *  [[Special:WikiRating/subpage]].
	 */
	public function execute( $sub ) {
		$request = $this->getRequest();
		$output = $this->getOutput();
		$this->setHeaders();

		# Get request data from the URL

		$nameSpace = $request->getText( 'nameSpace' );
		$badgeNumberStats = $request->getText( 'badgeNumberStats' );
		$pageRank = $request->getText( 'pageRank' );
		$totalVotes = $request->getText( 'totalVotes' );
		$currentPageVote = $request->getText( 'currentPageVote' );
		$pageReliability = $request->getText( 'pageReliability' );
		$maxPageRank = $request->getText( 'maxPageRank' );
		$maxPageReliability = $request->getText( 'maxPageReliability' );

		#Output on the Page

		$output->addWikiText( "*'''NAMESPACE:'''	".$nameSpace );
		$output->addWikiText( "*'''BADGE_NUMBER:'''	".$badgeNumberStats );
		$output->addWikiText( "*'''PAGE_RANK/MAX_PAGE_RANK:'''	".$pageRank."/".$maxPageRank );
		$output->addWikiText( "*'''TOTAL_VOTES:'''	".$totalVotes );
		$output->addWikiText( "*'''CURRENT_PAGE_VOTE:'''	".$currentPageVote );
		$output->addWikiText( "*'''PAGE_RELIABILITY/MAX_PAGE_RELIABILITY:'''	".$pageReliability."/".$maxPageReliability );


	}

}
