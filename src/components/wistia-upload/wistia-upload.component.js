import template from './wistia-upload.html';
import controller from './wistia-upload.controller';

const wistiaUploadDirective = () => {
  'ngInject';
  return {
    restrict: 'E',
    template,
    replace: true,
    controller,
    link: function(scope, element, attrs, controller) {
      $(element.find('#fileupload')).fileupload(controller.uploadOptions);
    },
    scope: {
      id: '@',
      pwd: '@wistiapass'
    }
  };
};

export default wistiaUploadDirective;
