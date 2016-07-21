(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _root = require('./root/root.js');

var _root2 = _interopRequireDefault(_root);

var _loader = require('./loader/loader.js');

var _loader2 = _interopRequireDefault(_loader);

var _reposList = require('./reposList/reposList.js');

var _reposList2 = _interopRequireDefault(_reposList);

var _reposSearchForm = require('./reposSearchForm/reposSearchForm.js');

var _reposSearchForm2 = _interopRequireDefault(_reposSearchForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var componentsModule = angular.module('GithubSearch.components', []);

componentsModule.component('root', _root2.default);
componentsModule.component('loader', _loader2.default);
componentsModule.component('reposList', _reposList2.default);
componentsModule.component('reposSearchForm', _reposSearchForm2.default);

exports.default = componentsModule;

},{"./loader/loader.js":2,"./reposList/reposList.js":3,"./reposSearchForm/reposSearchForm.js":4,"./root/root.js":5}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    templateUrl: 'components/loader/loader.tpl.html'
};

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    templateUrl: 'components/reposList/reposList.tpl.html',
    bindings: {
        repos: '<'
    }
};

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    templateUrl: 'components/reposSearchForm/reposSearchForm.tpl.html',
    bindings: {
        callback: '&'
    }
};

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _rootController = require('./rootController.js');

var _rootController2 = _interopRequireDefault(_rootController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    templateUrl: 'components/root/root.tpl.html',
    controller: _rootController2.default
};

},{"./rootController.js":6}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var vm = void 0;

var RootController = function () {
    function RootController(UserRepos) {
        _classCallCheck(this, RootController);

        vm = this;
        vm.UserRepos = UserRepos;
        vm.resultsPerPage = 10;
        vm.pageNo = 1;
        vm.message = 'Enter a github username and hit search';
    }

    _createClass(RootController, [{
        key: 'searchUser',
        value: function searchUser(userName) {
            var query = {
                id: userName
            };

            vm.message = '';
            vm.isLoading = true;
            vm.repos = this.UserRepos.query(query);

            var error = function error(response) {
                vm.message = response.data ? response.data.message : 'Github API is not responding or you are offline';
            };

            vm.repos.$promise.then(angular.noop, error)['finally'](function () {
                vm.isLoading = false;
            });
        }
    }]);

    return RootController;
}();

RootController.$inject = ['UserRepos'];

exports.default = RootController;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var UserRepos = function UserRepos($resource) {
    return $resource('https://api.github.com/users/:id/repos', {}, { timeout: 10000 });
};

UserRepos.$inject = ['$resource'];

exports.default = UserRepos;

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _UserRepos = require('./UserRepos.js');

var _UserRepos2 = _interopRequireDefault(_UserRepos);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var factoriesModule = angular.module('GithubSearch.factories', []);
factoriesModule.factory('UserRepos', _UserRepos2.default);

exports.default = factoriesModule;

},{"./UserRepos.js":7}],9:[function(require,module,exports){
'use strict';

require('./factories/factoriesModule.js');

require('./components/componentsModule.js');

angular.module('GithubSearch', ['GithubSearch.vendor', 'GithubSearch.templates', 'GithubSearch.factories', 'GithubSearch.components']);

},{"./components/componentsModule.js":1,"./factories/factoriesModule.js":8}]},{},[9]);
