(function () {
    'use strict';

    var countUpTime = 0,
        intervalCount = null;

    var applicationController = function ($scope, $location, $interval, loginService, applicationService) {

        var vm = this;

        if (intervalCount) {
            $interval.cancel(intervalCount);
        }
        intervalCount = $interval(function () {
            if ($location.url() === '/application') {
                countUpTime++;
                vm.countUpTime = countUpTime.toString().toHHMMSS();
            }
        }, 1000);

        loginService.checkAuthorize(function (authInfo, plusInfo) {         
            vm.userData = {
                displayName: plusInfo.displayName,
                imageUrl: plusInfo.image.url
            };

            vm.stringValue = null;
            vm.numericValue = 2;
            vm.resultValue = null;

            vm.process = function () {
                var result = [];
                var firstElements = applicationService.removeSpaces(vm.stringValue.split(' ').unique().sort());
                result.push('[' + firstElements.join(', ') + ']');
                result.push('---');

                var combinations = applicationService.process(vm.stringValue, vm.numericValue);
                combinations.forEach(function (combination, i, arr) {
                    result.push('[' + combination.join(', ') + ']');
                });
                vm.resultValue = result.join(', ');
            };

        }, function () {
            window.location = '#/login';
        });

    };    

    angular.module('pixeonApp')
        .controller('applicationController', applicationController);
})();