let vm;
class RootController {
    constructor(UserRepos) {
        vm = this;
        vm.UserRepos = UserRepos;
        vm.resultsPerPage = 10;
        vm.pageNo = 1;
    }

    searchUser(userName, pageNo = 1) {
        let query = {
            per_page: vm.resultsPerPage,
            page: pageNo,
            id: userName
        };
        vm.repos = this.UserRepos.query(query);
    }

};

RootController.$inject = ['UserRepos'];

export default RootController;