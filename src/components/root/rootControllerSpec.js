(function() {

    var controller, UserRepos, dummyUserList, successCb, errorCb, finallyCb;
    describe('Root Controller', function() {
        beforeEach(function() {
            module('GithubSearch');
        });

        describe('When controller is initialized', function() {
            beforeEach(inject(function($componentController) {
                dummyUserList = [
                    'Jens'
                ];

                dummyUserList.$promise = {
                    then: function(success, error) {
                        successCb = success;
                        errorCb = error;

                        var promise = {};

                        promise['finally'] = function(cb) {
                            finallyCb = cb;
                        };

                        return promise;
                    }
                };
                UserRepos = {
                    query: jasmine.createSpy('UserRepos.query').and.returnValue(dummyUserList)
                };
                controller = $componentController('root', {
                    UserRepos: UserRepos
                });
            }));

            it('should have some value for default message', function() {
                expect(controller.message).toBeDefined();
            });

            it('should have some value for error default message', function() {
                expect(controller.genericErrorMessage).toBeDefined();
            });

            it('should have some value for "no repos found" message', function() {
                expect(controller.noReposMessage).toBeDefined();
            });

            describe('And a search for user is made', function() {
                var userName;
                beforeEach(function() {
                    userName = 'Mohit';
                    controller.searchUser(userName);
                });

                it('should reset the default message by default', function() {
                    expect(controller.message).toBe('');
                });

                it('should set isLoading to be true by default', function() {
                    expect(controller.isLoading).toBe(true);
                });

                describe('And backend call is successful but no repos are there', function() {
                    beforeEach(function() {
                        controller.repos.length = 0;
                        successCb();
                    });

                    it('should set the message to generic', function() {
                        expect(controller.message).toBe(controller.noReposMessage);
                    });
                });

                describe('And backend call fails', function() {
                    describe('And response contains a message', function() {
                        beforeEach(function() {
                            errorCb({data: {message : 'baba'}});
                        });

                        it('should set the message according to server response', function() {
                            expect(controller.message).toBe('baba');
                        });
                    });

                    describe('And response does not contain a message', function() {
                        beforeEach(function() {
                            errorCb({});
                        });

                        it('should set the message according to generic message', function() {
                            expect(controller.message).toBe(controller.genericErrorMessage);
                        });
                    });
                });

            });
        });
    });
})();