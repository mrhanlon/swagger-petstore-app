/*globals SwaggerApi, $*/
'use strict';

window.authorizations.add( 'api_key', new window.ApiKeyAuthorization( 'api_key', 'special-key', 'header' ) );

var Petstore = new SwaggerApi('http://localhost:8002/api/api-docs', {
  useJQuery: true,
  success: function() {
    console.log('Petstore ready!');
  }
} );


$( 'form[name="file-upload"]' ).on('submit', function(e) {
  e.preventDefault();
  var file = new FormData(document.forms.namedItem('file-upload'));
  Petstore.apis.pet.uploadFile( { 'body': file }, { requestContentType: 'multipart/form-data' } );
});

$( 'form[name="blob-upload"]' ).on('submit', function(e) {
  e.preventDefault();
  var file = new FormData();
  file.append( 'file', new Blob( [ $('#blob').val() ], { type: 'text/plain' } ), 'test.txt' );
  Petstore.apis.pet.uploadFile( { 'body': file }, { requestContentType: 'multipart/form-data' } );
});
