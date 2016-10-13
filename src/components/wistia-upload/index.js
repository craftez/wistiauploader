import './wistia-upload.scss';
import angular from 'angular';
import wistiaComponent from './wistia-upload.directive';
import wistiaConst from './wistia-upload.constant';
import WistiaUploadService from './wistia-upload.service';

const wistiaModule = angular.module('WistiaModule', []);
wistiaModule.directive('wistiaUpload', wistiaComponent);
wistiaModule.constant('wistiaConst', wistiaConst);
wistiaModule.service('WistiaUploadService', WistiaUploadService);

export default wistiaModule;
