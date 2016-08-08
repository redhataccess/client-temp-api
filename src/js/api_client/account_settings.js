/**
 *
 */
export function AccountSettings() {
    var _url = URI('');
    return {

        url: _url.toString(),

        /*
         *
         */
        init: function (root) {
            _url.pathname(root);
            _url.segment('account/settings');
        },

        /**
         *
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
