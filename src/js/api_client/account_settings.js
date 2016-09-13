/**
 * Used to get and update the account settings.
 * 
 * @return {Object} Contains the functions needed
 *                  for client-to-server communication.
 */
export function AccountSettings() {
    var _url = URI('');

    return {

        url: _url.toString(),

        /**
         * Initializes the static parts of the url path.
         * 
         * @param  {String} root          The root of the url path.
         */
        init: function (root) {
            if (root && root.substring(0, 1) !== '/')
                throw new Error('Root of the path must begin with a /');

            _url.pathname(root);
            _url.segment('account/settings');
        },

        /**
         * fetch {get} The current settings of the app.
         * 
         * @return {Promise} the http(fetch) response data
         *                   that has been parsed into an Object.
         */
        getSettings: function() {
            return fetch(_url.toString(), {
                credentials: 'same-origin'
            })
                .then(checkStatus)
                .then(parseJSON)
                .catch(handleError);
            
        },

        /**
         * Update the app settings.
         * 
         * @param  {Object[]} settings The updated settings for the app.
         * @return {Promise}           The http(fetch) response.
         */
        updateSettings: function(settings) {
            return fetch(_url.toString(), {
                method: 'POST',
                body: settings,
                credentials: 'same-origin'
            })
                .then(checkStatus)
                .then(parseJSON)
                .catch(handleError);
        }
    };
}