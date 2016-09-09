/**
 * Used to get information about the given account.
 * 
 * @return {Object} Contains the functions needed
 * 				    for client-to-server communication.
 */
export function Account() {
		// Url path constructor.
	var _url = URI(''),

		// The headers needed when contacting the server.
		// Object inside of new Headers() are default
		// headers that are used within all the functions.
		fetchHeaders = new Headers({
			credentials: 'same-origin'
		}),

		// The initial parts of the baseQuery that 
	    // will never change after initialization.
		baseQuery = {
			account_number: null,
		};

	return {
		url: _url.toString(),

		/**
		 * Initializes the static parts of the url path.
		 * 
		 * @param  {String} root          The root of the url path. (must look like /anynameyouwant/)
		 * @return {String} accountNumber The account number of the current account. 
		 */
		init: function (root, accountNumber) {
			if (root.substring(0, 1) !== '/')
				throw 'Root of the path must begin with a /';

			baseQuery.account_number = accountNumber;
			_url.pathname(root);
            _url.segment('account/products');
		},

		/**
		 * fetch {get} the list of available products connected to the 
		 * current account.
		 *
		 * @return {Promise} list of available products connected
		 *                   the current account.
		 */
		getProducts: function (headers) {
			var temp;
			_url.setQuery(baseQuery);
			_url.normalize();


			return fetch(_url.toString(), fetchHeaders)
				.then(checkStatus)
                .then(formatJSON)
                .catch(handleError);
		}
	}
}