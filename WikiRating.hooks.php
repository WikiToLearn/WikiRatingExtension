<?php

class WikiRatingHooks
{
  public static function onBeforePageDisplay( OutputPage &$out, Skin &$skin ) {
    global $wgWikiRatingNamespaces;
    $out->addJsConfigVars('wgWikiRatingNamespaces', $wgWikiRatingNamespaces);
    $out->addModules( 'ext.WikiRating' );
  }
}
