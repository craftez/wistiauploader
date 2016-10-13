import template from './progress-bar.html';

const progressBarComponent = {
  bindings: {
    progress: '<',
    striped: '<',
    style: '@',
    message: '@'
  },
  template
};

export default progressBarComponent;
