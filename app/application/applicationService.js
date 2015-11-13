(function () {
    'use strict';

    var applicationService = function () {

        Array.prototype.unique = function () {
            var a = [];
            for (var i = 0; i < this.length; i++) {
                var current = this[i];
                if (a.indexOf(current) < 0) a.push(current);
            }
            return a;
        }

        var _removeSpaces = function (arr) {
            var result = [];
            arr.forEach(function (e, i, a) {
                if (e !== '') result.push(e);
            });
            return result;
        };

        var _combinations = function (set, num) {
            var arr = (function acc(xs, set) {
                var x = xs[0];
                if (typeof x === "undefined")
                    return set;
                for (var i = 0, l = set.length; i < l; ++i)
                    set.push(set[i].concat(x));
                return acc(xs.slice(1), set);
            })(set, [[]]).slice(1);
            var result = [];
            arr.forEach(function (e, i, a) {
                if (e.length == num) result.push(e);
            });
            return result;
        };

        var _process = function (stg, num) {
            return _combinations(_removeSpaces(stg.split(' ').unique().sort()), num);
        };

        return {
            removeSpaces: _removeSpaces,
            combinations: _combinations,
            process: _process
        };
    };

    angular.module('pixeonApp')
        .factory('applicationService', applicationService);

})();