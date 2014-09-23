/*globals SwaggerApi, $*/
'use strict';

window.authorizations.add( 'api_key', new window.ApiKeyAuthorization( 'api_key', 'special-key', 'header' ) );

// var host = 'localhost:8002';
var host = 'petstore.swagger.wordnik.com';
var Petstore = new SwaggerApi('http://' + host + '/api/api-docs', {
  useJQuery: true,
  success: function() {
    if (this.ready) {
      // apparently this is a bug in the petstore app; don't mix form + body paramTypes
      Petstore.apis.pet.operations.uploadFile.parameters[1].paramType = 'form';
      console.log( 'Petstore ready!' );
    }
  }
});

$( 'form[name="file-upload"]' ).on('submit', function(e) {
  e.preventDefault();
  Petstore.apis.pet.uploadFile({
    'additionalMetadata': $( '#additionalMetadata0' ).val(),
    'file': $('#file')[0].files[0]
  }, {
    requestContentType: 'multipart/form-data'
  });
});

$( 'form[name="blob-upload"]' ).on('submit', function(e) {
  e.preventDefault();
  Petstore.apis.pet.uploadFile({
    'additionalMetadata': $( '#additionalMetadata1' ).val(),
    'file': new Blob( [ $( '#blob' ).val() ], { type: 'text/plain' } )
  }, {
    requestContentType: 'multipart/form-data'
  });
});
