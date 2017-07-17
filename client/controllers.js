angular.module('AngularBlog.controllers', [])
    .controller('PostListController', ['$scope', 'Post', function($scope, Post) {
        $scope.posts = Post.query();
    }])
    .controller('SinglePostController', ['$scope', '$routeParams', '$location', 'Post', function($scope, $routeParams, $location, Post) {
        $scope.post = Post.get({ id: $routeParams.id });

        $scope.edit = function() {
            $location.path('/' + $routeParams.id + '/update');

        }

        $scope.delete = function() {
            if (confirm("Are you sure you want to delete this post?")) {
                $scope.post.$delete(function () {
                    $location.replace().path('/');
                });
            }
        }
    }])
    .controller('ComposePostController', ['$scope', 'Post', 'Category', 'User', '$location', function($scope, Post, Category, User, $location) {
        $scope.users = User.query();
        $scope.categories = Category.query();

        $scope.save = function() {
            var p = new Post($scope.post);
            p.$save(function() {
                $location.path('/');
            }, function(err) {
                console.log(err);
            });
        }
    }])

    .controller('UpdatePostController', ['$scope', 'Post', 'Category', '$location', '$routeParams', function($scope, Post, Category, $location, $routeParams) {
        $scope.categories = Category.query();
        $scope.post = Post.get({ id: $routeParams.id }, function() {
            $scope.post.categoryid = String($scope.post.categoryid);
        });

        $scope.save = function() {
            $scope.post.$update(function() {
                $location.replace().path('/' + $routeParams.id);
            });
        }
    }])
    .controller('LoginController', ['$scope', 'UserService', '$location', function($scope, UserService, $location) {
        UserService.me().then(function() {
            redirect();
        });


        $scope.login = function () {
            UserService.login($scope.email, $scope.password)
                .then(function() {
                    redirect();
                }, function (err) {
                    console.log(err);
                });
        }

        function redirect() {
            var dest = $location.search().dest;
            if (!dest) { dest = '/'; }
            $location.replace().path(dest).search('dest', null);
        }

    }])
    .controller('UserListController', ['$scope', 'User', function($scope, User) {
        $scope.users = User.query();

        $scope.createUser = function() {
            var u = new User($scope.newUser);
            u.$save(function() {
                $scope.newUser = {};
                $scope.users = User.query();
            });
        }
    }])
    .controller('DonationController', ['$scope', '$location', 'Donation', function($scope, $location, Donation) {
        var elements = stripe.elements();
        var card = elements.create('card');
        card.mount('#card-field');

        $scope.errorMesage = '';
        
        $scope.processDonation = function() {
            stripe.createToken(card, {
                name: $scope.name,
                address_lne1: $scope.line1,
                address_line2: $scope.line2,
                address_city: $scope.city,
                address_state: $scope.state
            }).then(function(result) {
                if (result.error) {
                    $scope.errorMesage = result.error.message;
                } else {
                    var d = new Donation({
                        token: result.token.id,
                        amount: $scope.amount
                    });
                    d.$sae(function() {
                        alert('Thank you for your donation.');
                        $location.path('/');
                    }, function(err) {
                        console.log(err);
                    });
                }
            });
        }
    }]);