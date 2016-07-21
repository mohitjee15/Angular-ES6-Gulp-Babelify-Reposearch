let vm;
class RootController {
    constructor(UserRepos) {
        vm = this;
        vm.UserRepos = UserRepos;
        vm.resultsPerPage = 10;
        vm.pageNo = 1;
        vm.message = 'Enter a github username and hit search';
    }

    searchUser(userName) {
        let query = {
            id: userName
        };

        vm.message = '';
        vm.isLoading = true;
        vm.repos = this.UserRepos.query(query);

        const error = (response) => {
            vm.message = response.data ? response.data.message :  'Github API is not responding or you are offline';
        };

        vm.repos.$promise.then(angular.noop, error)['finally'](() => {
            vm.isLoading = false;
        });
    }
}

RootController.$inject = ['UserRepos'];

export default RootController;