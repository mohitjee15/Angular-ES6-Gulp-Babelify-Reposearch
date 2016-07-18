import UserRepos from './UserRepos.js';
import angular from 'angular';

const factoriesModule = angular.module('GithubSearch.factories', []);
factoriesModule.factory('UserRepos', UserRepos);

export default UserRepos;