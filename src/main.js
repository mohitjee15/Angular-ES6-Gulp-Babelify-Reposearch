import './factories/factoriesModule.js';
import './components/componentsModule.js';

angular.module('GithubSearch', [
    'GithubSearch.vendor',
    'GithubSearch.templates',
    'GithubSearch.factories',
    'GithubSearch.components'
]);



