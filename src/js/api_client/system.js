/**
 * Returns an object whose properties are functions that are used
 * to fetch system data from the server.
 *
 * @return {JSON} JSON object containing the functions needed
 * 						 for client-to-server communication for stored systems.
 */
export function System() {

	    // the constructor object that creates the path for the http requrests
	    // to the insights servers.
	var _url = URI(''),

		// URIjs templates used to store the different variations of the
		// available paths.
		// 
		// query* explodes objects into a query string format ?query=q&so=on
		// e.g.
		// query = {
		// 	product: 'randomProd',
		// 	type: 'machine'
		// }
		// path => /random/path?product=randomProd&type=machine
		templateApiModule = new URITemplate('/{root}/{apiModule}{?account_number,query*}'),
		templateId        = new URITemplate('/{root}/{apiModule}/{id}{?account_number,query*}'),
		templateEndpoint  = new URITemplate('/{root}/{apiModule}/{id}/{endpoint}{?account_number,query*}'),

		// URI template object used to populate
		// the variables in the URIjs template path.
		templateParams = {
			root: null,
			apiModule: 'systems',
			id: null,
			endpoint: null,
			account_number: null,
			query: null
		};

	return {

		url: _url.toString(),

		/**
		 * Initializes the root of the url and the static parts of
		 * the query.
		 *
		 * @param  {String} root The base of the url path.
		 */
		init: function (root, accountNumber) {
			templateParams.root = root;
			templateParams.account_number = accountNumber;
		},

		/**
		 * fetch {get} returns a single system based on the given system id.
		 *
		 * @return {Promise}       The http(fetch) response.
		 */
		getSingleSystem: function (system_id) {
			templateParams.id = system_id;
			templateParams.query = null;
			_url.href(templateId.expand(templateParams));
			_url.normalize();

			return fetch(_url.toString(), {
				credentials: 'same-origin'
			})
				.then(checkStatus)
                .then(formatJSON)
                .catch(handleError);
		},

		/**
		 * fetch {get} the different types of systems.
		 * 
		 * @return {Promise}       The http(fetch) response.
		 */
		getSystemTypes: function () {
			_url = URI(templateApiModule.expand({
				root: templateParms.root,
				apiModule: 'system_types',
			}));
			_url.normalize();

			return fetch(_url.toString(), {
				credentials: 'same-origin'
			})
				.then(checkStatus)
				.then(formatJSON)
                .catch(handleError);
		},

		/**
		 * fetch {get} the systems connected to the current account.
		 *
		 * @return {Promise}       The http(fetch) response.
		 */
		getSystems: function () {
			templateParams.query = null;
			_url.href(templateApiModule.expand(templateParams));
			_url.normalize();

			return fetch(_url.toString(), {
				credentials: 'same-origin'
			})
				.then(checkStatus)
				.then(formatJSON)
                .catch(handleError);
		},

		/**
		 * fetch {get} the systems that are linked to the given system id.
		 *
		 * @param  {String} parent_system_id The system id of the system whose system links
		 *                                   are being searched for.
		 * @param  {Object} query            Added to the end of the path and contains
		 *                                   which attributes to look for in systems.
		 * @return {Promise}                 The http(fetch) response.
		 */
		getSystemLinks: function (parent_system_id, query) {
	        templateParams.id = parent_system_id;
	        templateParams.query = query;
	        templateParams.endpoint = 'links';

	        _url.href(templateEndpoint.expand(templateParams));
			_url.normalize();

			return fetch(_url.toString(), {
				credentials: 'same-origin'
			})
				.then(checkStatus)
				.then(formatJSON)
                .catch(handleError);
		},

		/**
		 * fetch {head} returns the headers to find the number of systems for each
		 * possible product and rule combinations.
		 *
		 * @param  {Object} query Added to the end of the path and contains
		 *                        which attributes to look for in systems.
		 * @return {Promise}      The http(fetch) response.
		 */
		headSystemsLatest: function (query) {
			templateParams.query = query;
	        _url.href(templateApiModule.expand(templateParams));
	        _url.normalize();

			return fetch(_url.toString(), {
				method: 'HEAD',
				credentials: 'same-origin'
			})
				.then(checkStatus)
                .catch(handleError);
		},

		/**
		 * fetch {get} the systems connected to the current account and whose
		 * properties match the given query.
		 *
		 * @param  {Object}  query Added to the end of the path and contains
		 *                         which attributes to look for in systems.
		 * @return {Promise}       The http(fetch) response.
		 */
		getSystemsLatest: function (query) {
			templateParams.query = query;
			_url.href(templateApiModule.expand(templateParams));
			_url.normalize();

	        return fetch(_url.toString(), {
				credentials: 'same-origin'
			})
				.then(checkStatus)
				.then(formatJSON)
                .catch(handleError);
		},

		/**
		 * fetch {get} the status of the of systems on the current account.
	     *
	     * @param  {Object} query Added to the end of the path and contains
		 *                        which attributes to look for in systems.
		 * @return {Promise}      The http(fetch) response.
		 */
		getSystemStatus: function (query) {
			templateParams.id = 'status';
			templateParams.query = query;
	        _url.href(templateId.expand(templateParams));
			_url.normalize();

	        return fetch(_url.toString(), {
				credentials: 'same-origin'
			})
				.then(checkStatus)
				.then(formatJSON)
                .catch(handleError);
		},

		/**
		 * fetch {get} the summary of systems connected to the specified account.
		 *
		 * @param  {Object} query Added to the end of the path and contains
		 *                        which attributes to look for in systems.
		 * @return {Promise}      The http(fetch) response.
		 */
		getSystemSummary: function (query) {
	        templateParams.query = query;
	        templateParams.query.summary = true;
	        _url.href(templateApiModule.expand(templateParams));
			_url.normalize();

	        return fetch(_url.toString(), {
				credentials: 'same-origin'
			})
				.then(checkStatus)
				.then(formatJSON)
                .catch(handleError);
		},

	    /**
	     * fetch {get} the system reports of the systems connected to the specified account
	     * and machine.
	     *
	     * @param  {String}	 machine_id The id of the machine whose reports are being fetched.
	     * @return {Promise}            The http(fetch) response.
	     */
		getSystemReports: function (machine_id) {
			templateParams.id = machine_id;
			templateParams.endpoint = 'reports';
			templateParams.query = null;
			_url.href(templateEndpoint.expand(templateParams));
			_url.normalize();

			return fetch(_url.toString(), {
				credentials: 'same-origin'
			})
				.then(checkStatus)
				.then(formatJSON)
                .catch(handleError);
		},

		/**
		 * fetch {get} the metadata of the specified account and machine.
		 *
		 * @param  {String} machine_id The id of the machine whose metadata is wanted.
		 * @return {Promise}           The http(fetch) response.
		 */
		getSystemMetadata: function (machine_id) {
			templateParams.id = machine_id;
			templateParams.endpoint = 'metadata';
			templateParams.query = null;
			_url.href(templateEndpoint.expand(templateParams));
			_url.normalize();

			return fetch(_url.toString(), {
				credentials: 'same-origin'
			})
				.then(checkStatus)
				.then(formatJSON)
                .catch(handleError);
		},

		/**
		 * Delete the system with the given machine_id.
		 *
		 * @param  {String} machine_id The id of the system that is being
		 *                             deleted.
		 * @return {Promise}           The http(fetch) response.
		 */
		deleteSystem: function (machine_id) {
			templateParams.id = machine_id;
			templateParams.query = null;
			_url.href(templateId.expand(templateParams));
			_url.normalize();

			return fetch(_url.toString(), {
				method: 'DELETE',
				credentials: 'same-origin'
			})
				.then(checkStatus)
				.then(formatJSON)
                .catch(handleError);
		}
	}
}