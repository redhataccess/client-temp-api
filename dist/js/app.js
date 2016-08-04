'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Account = Account;
exports.AccountSettings = AccountSettings;

require('fetch');

var _urijs = require('urijs');

var _urijs2 = _interopRequireDefault(_urijs);

require('babel/browser-polyfill');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// nnPromise = non native Promise
/**
 * @return {JSON} Json object containing the functions needed
 * 						 for client-to-server communication.
 */
function Account() {
    var _url = new _urijs2.default();
    return {
        url: _url.toString(),

        /**
         * @param  {String} root The root of the url path.
         * @return {Promise} A promise containing the 
         */
        init: function init(root) {
            _url.segment(root + 'account/products');
        },

        /**
         * 
         */
        getProducts: function getProducts(query) {
            _url.setQuery(query);

            return fetch(_url.toString(), {
                credentials: 'same-origin'
            }).then(checkStatus).then(parseJSON).then(formatJSON).then(promisifyJSON).catch(handleError);
        }
    };
}
/**
 *
 */
function AccountSettings() {
    var _url = new _urijs2.default();
    return {

        url: _url.toString(),

        /*
         *
         */
        init: function init(root) {
            _url.segment(root + 'account/settings');
        },

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
            }).then(checkStatus).then(parseJSON).then(promisifyJSON).catch(handleError);
        },

        /**
         *
         */
        updateSettings: function updateSettings(settings) {
            return fetch(_url.toString(), {
                method: 'POST',
                body: settings
            }).then(checkStatus).then(parseJSON).then(promisifyJSON).catch(handleError);
        }
    };
}
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

function formatJSON(json) {
    return {
        data: json
    };
}

function promisifyJSON(json) {
    return _bluebird2.default.resolve(json);
}

function handleError(error) {
    console.log('request faild', error);
}