//
// Copyright (c) 2015, 2016 Revolution Financial Technology, Inc.
//
import angular from 'angular';

import WistiaModule from './wistia-upload';
import ProgressBarModule from './progress-bar';
import WistiaPlayerModule from './wistia-player';
import WistiaListModule from './wistia-list';

export default angular.module('components', [
  WistiaModule.name,
  ProgressBarModule.name,
  WistiaPlayerModule.name,
  WistiaListModule.name
]);
