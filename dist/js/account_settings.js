'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.init = init;

require('fetch');

require('babel/browser-polyfill');

var _es6Promise = require('es6-promise');

var es6Promise = _interopRequireWildcard(_es6Promise);

var _urijs = require('urijs');

var _urijs2 = _interopRequireDefault(_urijs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

es6Promise.polyfill();

function checkStatus(response) {
    console.log('Checking status');
    console.log(response);
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

function parseJSON(response) {
    console.log('Parsing json');
    return response.json();
}

function handleError(error) {
    console.log('request failed', error);
}

/**
 *
 */
function init(root) {
    var _url = (0, _urijs2.default)(root + 'account/settings');
    return {

        url: _url.toString(),

        /**
         *
         */
        getSettings: function getSettings() {
            var myHeaders = new Headers();
            myHeaders.append('Accept', 'text/plain');
            myHeaders.append('Accept', 'application/json');
            myHeaders.append('Accept', '*/*');
            myHeaders.append('X-Omit', 'WWW-Authenticate');
            //myHeaders.append('cache-control', 'cache');
            return fetch(_url.toString(), {
                credentials: 'same-origin',
                cache: 'default',
                //mode: 'no-cors',
                headers: myHeaders
            }).then(function (response) {
                console.log('Checking status');
                console.log(response);
                if (response.status >= 200 && response.status < 300) {
                    return Promise.resolve(response);
                } else {
                    var error = new Error(response.statusText);
                    error.response = response;
                    throw error;
                }
            }).then(function (response) {
                return response.json();
            });
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
}