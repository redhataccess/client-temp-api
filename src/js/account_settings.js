import 'whatg-fetch';
import * as URI from 'urijs';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
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
export default function(root) {
    return {

        url : URI(root + 'account/settings');

        /**
         *
         */
        getSettings: function() {
            fetch(url.toString())
                .then(checkStatus)
                .then(parseJSON)
                .catch(handleError);
        };

        /**
         *
         */
        updateSettings: function(settings) {
            fetch(url.toString(), {
                method: 'POST',
                body: settings
            })
                .then(checkStatus)
                .then(parseJSON)
                .catch(handleError);
        };
    };
};
