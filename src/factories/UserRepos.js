const UserRepos = ($resource) => {
    return $resource('https://api.github.com/users/:id/repos', {}, {timeout: 10000});
};


UserRepos.$inject = ['$resource'];

export default UserRepos;