<?php

class WikiRatingHooks
{
  public static function onBeforePageDisplay( OutputPage &$out, Skin &$skin ) {
    $out->addModules( 'ext.WikiRating' );
  }
}

