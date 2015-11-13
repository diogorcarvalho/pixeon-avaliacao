(function () {
    'use strict';
    
    var loginService = function () {

        var _checkAuthorize = function (handleAuthResult, handleAuthFail) {
            gapi.auth.authorize({ client_id: clientId, scope: scopes, immediate: true }, function (authResult) {
                if (authResult && !authResult.error) { // ### Logado ### //
                    gapi.client.setApiKey(); // Chamada necessária para recarregar o módulo "client".
                    gapi.client.load('plus', 'v1').then(function () {
                        gapi.client.plus.people.get({ 'userId': 'me' }).then(function (resp) {
                            handleAuthResult(authResult, resp.result);
                        }, function (reason) {
                            console.log('Error: ' + reason.result.error.message);
                            window.location = '#/login';
                        });
                    });
                } else { // ### Deslogado ### //
                    handleAuthFail();
                }
            });
        };

        return {
            checkAuthorize: _checkAuthorize
        };
    };

    angular.module('pixeonApp')
        .factory('loginService', loginService);

})();