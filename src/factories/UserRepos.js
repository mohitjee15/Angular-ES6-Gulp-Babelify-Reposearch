const UserRepos = ($resource) => {
    return $resource('https://api.github.com/users/:id/repos');
};


UserRepos.$inject = ['$resource'];

export default UserRepos;