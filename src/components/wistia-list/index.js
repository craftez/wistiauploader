import angular from 'angular';
import wistiaListComponent from './wistia-list.component';

const WistiaListModule = angular.module('wistia-list', []);

WistiaListModule.component('wistiaList', wistiaListComponent);

export default WistiaListModule;
