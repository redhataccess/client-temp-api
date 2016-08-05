/**
 * @return {JSON} Json object containing the functions needed
 * 						 for client-to-server communication.
 */
export function Account() {
	var _url = URI();
	return {
		url: _url.toString(),

		/**
		 * @param  {String} root The root of the url path.
		 * @return {Promise} A promise containing the 
		 */
		init: function (root) {
			_url.pathname(root);
            _url.segment('account/products');
		},

		/**
		 * 
		 */
		getProducts: function (query) {
			_url.setQuery(query);

			return fetch(_url.toString(), {
				credentials: 'same-origin'
			})
				.then(checkStatus)
                .then(parseJSON)
                .then(formatJSON)
                .catch(handleError);
		}
	}
}