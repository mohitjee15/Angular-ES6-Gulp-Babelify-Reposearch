import angular from 'angular';
import root from './root/root.js';
import errorMessage from './errorMessage/errorMessage.js';
import loader from './loader/loader.js';
import reposList from './reposList/reposList.js';
import reposSearchForm from './reposSearchForm/reposSearchForm.js';

const componentsModule = angular.module('GithubSearch.components', []);

componentsModule.component('root', root);
componentsModule.component('errorMessage', errorMessage);
componentsModule.component('loader', loader);
componentsModule.component('reposList', reposList);
componentsModule.component('reposSearchForm', reposSearchForm);

export default componentsModule;