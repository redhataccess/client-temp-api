import 'fetch';
import 'es6-promise';
import URI from 'urijs';

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
export function init(root) {
		var _url = URI(root + 'account/settings');
    return {

        url: _url.toString(),

        /**
         *
         */
        getSettings: function() {
            return fetch(_url.toString())
                .then(checkStatus)
                .then(parseJSON)
                .catch(handleError);
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
