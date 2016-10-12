import angular from 'angular';
import wistiaComponent from './wistia-upload.component';
import wistiaConst from './wistia-upload.constant';

const wistiaModule = angular.module('WistiaModule', []);
wistiaModule.directive('wistiaUpload', wistiaComponent);
wistiaModule.constant('wistiaConst', wistiaConst);

export default wistiaModule;
