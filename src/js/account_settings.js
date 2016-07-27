import 'fetch';
import 'babel/browser-polyfill';
import URI from 'urijs';

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
                return fetch(_url.toString())
                .then(checkStatus(response))
                .then(parseJSON(response))
                .catch(handleError(error));
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
