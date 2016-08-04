/**
 * @return {JSON} Json object containing the functions needed
 * 						 for client-to-server communication.
 */
export function Account() {
	var _url = new URI();
	return {
		url: _url.toString(),

		/**
		 * @param  {String} root The root of the url path.
		 * @return {Promise} A promise containing the 
		 */
		init: function (root) {
			_url.segment(root + 'account/products');
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
                .then(promisifyJSON)
                .catch(handleError);
		}
	}
}