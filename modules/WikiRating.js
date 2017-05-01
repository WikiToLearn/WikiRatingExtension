$( document ).ready(function () {
  var wikiRatingNamespaces =  mw.config.get( 'wgWikiRatingNamespaces' );
  var currentNamespace = mw.config.get("wgNamespaceNumber");

  if (wikiRatingNamespaces.indexOf(currentNamespace) !== -1 ) {
    var api = new mw.Api();
    api.get( {
      action: 'pagerating',
      title: mw.config.get( 'wgPageName' ),
      format: 'json'
    } ).done( function ( data ) {
      if(data.pagerating.status === "success"){
        var ratingInformation = data.pagerating.response;
        console.log(ratingInformation);
      }
    } );
  }
});
