import './wistia-player.scss';
import angular from 'angular';
import wistiaPlayerDirective from './wistia-player.directive';

const WistiaPlayerModule = angular.module('WistiaPlayerModule', []);

WistiaPlayerModule.directive('wistiaPlayer', wistiaPlayerDirective);

export default WistiaPlayerModule;
