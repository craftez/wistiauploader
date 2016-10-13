import template from './wistia-player.html';
import controller from './wistia-player.controller';

const wistiaPlayerDirective = () => {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      video: '=',
      onDelete: '&'
    },
    template,
    controller,
    bindToController: true,
    controllerAs:'vm',
    link: (scope, element, attrs, controller) => {
      angular.element(element.find('.video-container')).html(controller.video.embedCode);
    }
  };
};

export default wistiaPlayerDirective;
