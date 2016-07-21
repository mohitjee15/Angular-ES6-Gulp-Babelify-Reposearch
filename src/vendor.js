import angular from 'angular';
import ngResource from 'angular-resource';
import uiBootstrap from 'angular-ui-bootstrap';

const vendorModule = angular.module('GithubSearch.vendor', [
    'ngResource',
    'ui.bootstrap'
]);

export default vendorModule;