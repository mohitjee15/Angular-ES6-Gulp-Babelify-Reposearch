import UserRepos from './UserRepos.js'

const factoriesModule = angular.module('GithubSearch.factories', []);
factoriesModule.factory('UserRepos', UserRepos);

export default factoriesModule;