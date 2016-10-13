import angular from 'angular';
import progressBarComponent from './progress-bar.component';

const ProgressBarModule = angular.module('progressBarModule',[]);

ProgressBarModule.component('progressBar', progressBarComponent);

export default ProgressBarModule;
