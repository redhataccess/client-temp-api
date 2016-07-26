'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (root) {
    var _url = URI(root + 'account/settings');
    return {

        url: _url,

        /**
         *
         */
        getSettings: function getSettings() {
            return fetch(_url.toString()).then(checkStatus).then(parseJSON).catch(handleError);
        },

        /**
         *
         */
        updateSettings: function updateSettings(settings) {
            return fetch(_url.toString(), {
                method: 'POST',
                body: settings
            }).then(checkStatus).then(parseJSON).catch(handleError);
        }
    };
};

require('fetch');

var _urijs = require('urijs');

var URI = _interopRequireWildcard(_urijs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

function parseJSON(response) {
    return response.json();
}

function handleError(error) {
    console.log('request faild', error);
}

/**
 *
 */