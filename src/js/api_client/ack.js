/**
 *
 */
export function Ack() {
    var _url = URI('');
    return {

        url: _url.toString(),

        /*
         *
         */
        init: function (root) {
            _url.segment(root);
            _url.segment('acks');
        },

        /**
         *
         */
        getAcks: function(account) {
            var _getUrl = _url.clone();
            _getUrl.addSearch('include', 'rule');
            if (account) {
                _getUrl.addSearch('account_number', account);
            }

            return fetch(_getUrl.toString(), {
                credentials: 'same-origin'
            })
                .then(checkStatus)
                .then(parseJSON)
                .catch(handleError);
            
        },

        /**
         *
         */
        createAck: function(account, rule) {
            var _createUrl = _url.clone();
            if (account) {
                _createUrl.addSearch('account_number', account);
            }

            return fetch(_createUrl.toString(), {
                method: 'POST',
                credentials: 'same-origin',
                body: JSON.stringify(rule)
            })
                .then(checkStatus)
                .then(parseJSON)
                .catch(handleError);
        }
    };
}
