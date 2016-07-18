import angular from 'angular';
import ngResource from 'angular-resource';
import uiBootstrap from 'angular-ui-bootstrap';

import factories from './factories/factoriesModule';
import components from './components/componentsModule';
//import bootstrap from 'bootstrap-webpack';

angular.module('GithubSearch', [
    'ngResource',
    'ui.bootstrap',
    'GithubSearch.factories',
    'GithubSearch.components'
]);

