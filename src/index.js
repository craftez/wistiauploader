/* The jQuery UI widget factory, can be omitted if jQuery UI is already included */
require('imports?define=>false&exports=>false!blueimp-file-upload/js/vendor/jquery.ui.widget.js');
/* The Iframe Transport is required for browsers without support for XHR file uploads */
require('imports?define=>false&exports=>false!blueimp-file-upload/js/jquery.iframe-transport.js');
/* The basic File Upload plugin */
require('imports?define=>false&exports=>false!blueimp-file-upload/js/jquery.fileupload.js');
/* The File Upload processing plugin */
require('imports?define=>false&exports=>false!blueimp-file-upload/js/jquery.fileupload-process.js');
/* The File Upload validation plugin */
require('imports?define=>false&exports=>false!blueimp-file-upload/js/jquery.fileupload-validate.js');
/* The File Upload Angular JS module */
require('imports?define=>false&exports=>false!blueimp-file-upload/js/jquery.fileupload-angular.js');


import angular from 'angular';
import app from './layout';

$('#fileupload').fileupload({
  dataType: 'json',
  done: function (e, data) {
    $.each(data.result.files, function (index, file) {
      $('<p/>').text(file.name).appendTo(document.body);
    });
  }
});

angular.element(document).ready(() => {
  angular.bootstrap(document, [app.name]);
});
