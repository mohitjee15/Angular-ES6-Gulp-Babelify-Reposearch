let vm;
class RootController {
    constructor(UserRepos) {
        vm = this;
        vm.UserRepos = UserRepos;
        vm.message = 'Enter a github username and hit search';
        vm.genericErrorMessage = 'Github API is not responding or you are offline';
        vm.noReposMessage = 'The user has no git repositories';
    }

    searchUser(userName) {
        let query = {
            id: userName
        };

        vm.message = '';
        vm.isLoading = true;
        vm.repos = this.UserRepos.query(query);

        const error = (response) => {
            vm.message = response.data ? response.data.message : vm.genericErrorMessage;
        };

        const success = () => {
            if(!vm.repos.length) {
                vm.message = vm.noReposMessage;
            }
        };

        vm.repos.$promise.then(success, error)['finally'](() => {
            vm.isLoading = false;
        });
    }
}

RootController.$inject = ['UserRepos'];

export default RootController;