import 'fetch';
import 'babel/browser-polyfill';
import * as es6Promise from 'es6-promise';
import URI from 'urijs';

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
export function init(root) {
    var _url = URI(root + 'account/settings');
    return {

        url: _url.toString(),

        /**
         *
         */
        getSettings: function() {
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
            })
            .then(function (response) {
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
        updateSettings: function(settings) {
            return fetch(_url.toString(), {
                method: 'POST',
                body: settings
            })
                .then(checkStatus)
                .then(parseJSON)
                .catch(handleError);
        }
    };
}
