'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.init = init;

require('fetch');

require('babel/babel-polyfill');

var _urijs = require('urijs');

var _urijs2 = _interopRequireDefault(_urijs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
function init(root) {
    var _url = (0, _urijs2.default)(root + 'account/settings');
    return {

        url: _url.toString(),

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
}