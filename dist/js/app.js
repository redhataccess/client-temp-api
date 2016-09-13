'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.System = System;

var _urijs = require('urijs');

var _urijs2 = _interopRequireDefault(_urijs);

var _URITemplate = require('urijs/src/URITemplate');

var _URITemplate2 = _interopRequireDefault(_URITemplate);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Promise = _bluebird2.default;
Promise.config({
	warnings: false
});
if (!('fetch' in window)) require('fetch');

function System() {
	var _url = (0, _urijs2.default)(''),
	    templateApiModule = new _URITemplate2.default('/{root}/{apiModule}{?account_number,query*}'),
	    templateId = new _URITemplate2.default('/{root}/{apiModule}/{id}{?account_number,query*}'),
	    templateEndpoint = new _URITemplate2.default('/{root}/{apiModule}/{id}/{endpoint}{?account_number,query*}'),
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

		init: function init(root, accountNumber) {
			templateParams.root = root;
			templateParams.account_number = accountNumber;
		},

		getSingleSystem: function getSingleSystem(system_id) {
			templateParams.id = system_id;
			templateParams.query = null;
			_url.href(templateId.expand(templateParams));
			_url.normalize();

			return fetch(_url.toString(), {
				credentials: 'same-origin'
			}).then(checkStatus).then(formatJSON).catch(handleError);
		},

		getSystemTypes: function getSystemTypes() {
			_url = (0, _urijs2.default)(templateApiModule.expand({
				root: templateParms.root,
				apiModule: 'system_types'
			}));
			_url.normalize();

			return fetch(_url.toString(), {
				credentials: 'same-origin'
			}).then(checkStatus).then(formatJSON).catch(handleError);
		},

		getSystems: function getSystems() {
			templateParams.query = null;
			_url.href(templateApiModule.expand(templateParams));
			_url.normalize();

			return fetch(_url.toString(), {
				credentials: 'same-origin'
			}).then(checkStatus).then(formatJSON).catch(handleError);
		},

		getSystemLinks: function getSystemLinks(parent_system_id, query) {
			templateParams.id = parent_system_id;
			templateParams.query = query;
			templateParams.endpoint = 'links';

			_url.href(templateEndpoint.expand(templateParams));
			_url.normalize();

			return fetch(_url.toString(), {
				credentials: 'same-origin'
			}).then(checkStatus).then(formatJSON).catch(handleError);
		},

		headSystemsLatest: function headSystemsLatest(query) {
			templateParams.query = query;
			_url.href(templateApiModule.expand(templateParams));
			_url.normalize();

			return fetch(_url.toString(), {
				method: 'HEAD',
				credentials: 'same-origin'
			}).then(checkStatus).catch(handleError);
		},

		getSystemsLatest: function getSystemsLatest(query) {
			templateParams.query = query;
			_url.href(templateApiModule.expand(templateParams));
			_url.normalize();

			return fetch(_url.toString(), {
				credentials: 'same-origin'
			}).then(checkStatus).then(formatJSON).catch(handleError);
		},

		getSystemStatus: function getSystemStatus(query) {
			templateParams.id = 'status';
			templateParams.query = query;
			_url.href(templateId.expand(templateParams));
			_url.normalize();

			return fetch(_url.toString(), {
				credentials: 'same-origin'
			}).then(checkStatus).then(formatJSON).catch(handleError);
		},

		getSystemSummary: function getSystemSummary(query) {
			templateParams.query = query;
			templateParams.query.summary = true;
			_url.href(templateApiModule.expand(templateParams));
			_url.normalize();

			return fetch(_url.toString(), {
				credentials: 'same-origin'
			}).then(checkStatus).then(formatJSON).catch(handleError);
		},

		getSystemReports: function getSystemReports(machine_id) {
			templateParams.id = machine_id;
			templateParams.endpoint = 'reports';
			templateParams.query = null;
			_url.href(templateEndpoint.expand(templateParams));
			_url.normalize();

			return fetch(_url.toString(), {
				credentials: 'same-origin'
			}).then(checkStatus).then(formatJSON).catch(handleError);
		},

		getSystemMetadata: function getSystemMetadata(machine_id) {
			templateParams.id = machine_id;
			templateParams.endpoint = 'metadata';
			templateParams.query = null;
			_url.href(templateEndpoint.expand(templateParams));
			_url.normalize();

			return fetch(_url.toString(), {
				credentials: 'same-origin'
			}).then(checkStatus).then(formatJSON).catch(handleError);
		},

		deleteSystem: function deleteSystem(machine_id) {
			templateParams.id = machine_id;
			templateParams.query = null;
			_url.href(templateId.expand(templateParams));
			_url.normalize();

			return fetch(_url.toString(), {
				method: 'DELETE',
				credentials: 'same-origin'
			}).then(checkStatus).then(formatJSON).catch(handleError);
		}
	};
}

function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	} else {
		var error = new Error(response.statusText);
		error.response = response;
		return Promise.reject(error);
	}
}

function parseJSON(response) {
	return response.json();
}

function formatJSON(response) {
	response.data = response.json();
	return response;
}

function handleError(error) {
	console.log('request failed', error.statusText);
	throw error;
}