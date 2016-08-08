/**
 *
 */
export function Ack() {
    var _url = URI();
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
                .then(checkStatus)
                .then(parseJSON)
                .then(promisifyJSON)
                .catch(handleError);
            
        }
    };
}
