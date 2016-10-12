import angular from 'angular';
import CategoriesModel from './models/categories.model';
import BookmarksModel from './models/bookmarks.model';

export default angular
	.module('app.common', [])
	.service('CategoriesModel', CategoriesModel)
	.service('BookmarksModel', BookmarksModel);