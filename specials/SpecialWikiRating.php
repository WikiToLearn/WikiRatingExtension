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

		# Get request data from, e.g.
		$param = $request->getText( 'pagename' );




		# Do stuff
		# ...
		$wikitext ='Hello world this is Abhimanyu!'.'this us foo';
		$output->addWikiText( $wikitext.$param );
		$output->addWikiText( $param );



	}

}
