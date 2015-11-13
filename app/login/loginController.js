(function () {
    'use strict';

    var countUpTime = 0,
        intervalCount = null;

    var loginController = function ($scope, $location, $interval) {

        var vm = this;
        vm.intervalCount = '';

        if (intervalCount) {
            $interval.cancel(intervalCount);
        }
        intervalCount = $interval(function () {
            if ($location.url() === '/login') {
                countUpTime++;
                vm.countUpTime = countUpTime.toString().toHHMMSS();
            }
        }, 1000);

        vm.login = function () {
            gapi.auth.authorize({ client_id: clientId, scope: scopes, immediate: false }, function (authResult) {                
                if (authResult && !authResult.error) { // ### Logado ### //                        
                    gapi.client.setApiKey();
                    gapi.client.load('plus', 'v1').then(function () {
                        gapi.client.plus.people.get({ 'userId': 'me', 'collection': 'visible'  }).then(function (resp) {
                            window.location = '#/application';
                        }, function (reason) {
                            console.log('Error: ' + reason.result.error.message);
                        });
                    });
                }
            });
        };
    };

    angular.module('pixeonApp')
        .controller('loginController', loginController);
})();
