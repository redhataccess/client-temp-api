'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Account = Account;
exports.AccountSettings = AccountSettings;
exports.Ack = Ack;

require('fetch');

var _urijs = require('urijs');

var _urijs2 = _interopRequireDefault(_urijs);

require('babel/browser-polyfill');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//polyfill();
//fetch.Promise = Promise;
/**
 * @return {JSON} Json object containing the functions needed
 * 						 for client-to-server communication.
 */
function Account() {
    var _url = (0, _urijs2.default)('');
    return {
        url: _url.toString(),

        /**
         * @param  {String} root The root of the url path.
         * @return {Promise} A promise containing the 
         */
        init: function init(root) {
            _url.pathname(root);
            _url.segment('account/products');
        },

        /**
         * 
         */
        getProducts: function getProducts(query) {
            _url.setQuery(query);

            return fetch(_url.toString(), {
                credentials: 'same-origin'
            }).then(checkStatus).then(parseJSON).then(formatJSON).catch(handleError);
        }
    };
}
/**
 *
 */

//import {polyfill} from 'es6-promise';
function AccountSettings() {
    var _url = (0, _urijs2.default)('');
    return {

        url: _url.toString(),

        /*
         *
         */
        init: function init(root) {
            _url.pathname(root);
            _url.segment('account/settings');
        },

        /**
         *
         */
        getSettings: function getSettings() {
            return fetch(_url.toString(), {
                credentials: 'same-origin'
            }).then(checkStatus).then(parseJSON).catch(handleError);
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

/**
 *
 */
function Ack() {
    var _url = (0, _urijs2.default)('');
    return {

        url: _url.toString(),

        /*
         *
         */
        init: function init(root) {
            _url.segment(root);
            _url.segment('acks');
        },

        /**
         *
         */
        getAcks: function getAcks(account) {
            var _getUrl = _url.clone();
            _getUrl.addSearch('include', 'rule');
            if (account) {
                _getUrl.addSearch('account_number', account);
            }

            return fetch(_getUrl.toString(), {
                credentials: 'same-origin'
            }).then(checkStatus).then(parseJSON).catch(handleError);
        },

        /**
         *
         */
        createAck: function createAck(account, rule) {
            var _createUrl = _url.clone();
            if (account) {
                _createUrl.addSearch('account_number', account);
            }

            return fetch(_createUrl.toString(), {
                method: 'POST',
                credentials: 'same-origin',
                body: JSON.stringify(rule)
            }).then(checkStatus).then(parseJSON).catch(handleError);
        }
    };
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return _bluebird2.default.resolve(response);
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

function handleError(error) {
    console.log('request faild', error);
}