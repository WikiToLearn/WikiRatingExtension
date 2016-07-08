<?php
if (function_exists('wfLoadExtension')) {
    wfLoadExtension('WikiRating');
    // Keep i18n globals so mergeMessageFileList.php doesn't break
    $wgMessagesDirs['WikiRating'] = __DIR__.'/i18n';
    wfWarn(
        'Deprecated PHP entry point used for WikiRating extension. Please use wfLoadExtension instead, '.'see https://www.mediawiki.org/wiki/Extension_registration for more details.'
    );

    return true;
} else {
    die('This version of the WikiRating extension requires MediaWiki 1.25+');
}
