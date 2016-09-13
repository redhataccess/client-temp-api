/*global angular */
'use strict';

describe('Unit: System', function () {
	var stubedRequester;
	Promise           = require('bluebird');
	var URI           = require('urijs');
	var apiService    = require('../../src/js/api_client_test/system.js').System();
	var apiRoot       = 'test';
	var	fakeProdCode  = 'randomProdCode';
	var randomID      = '01234567890123456789';
	var accountNumber = '540155';
	var randomQuery   = {
		random: 'query'
	};
	var baseOptions   = {
		credentials: 'same-origin'
	};
	var	urlValidation = {
			getSingleSystem: function (fetchedURL, options) {
				var validURI   = URI('/test/systems/01234567890123456789?account_number=540155');
				var fetchedURI = URI(fetchedURL);
				var res = {
					status: 400,
					data: 'FAIL',
					json: function () {
						return this.data;
					}
				};

				if (options && (options.method === 'GET' || !options.method)
				&& options.credentials === baseOptions.credentials
				&& URI(validURI).equals(fetchedURI)) {
					res.status = 200;
					res.data = 'OK';
					return Promise.resolve(res);
				}

				return Promise.resolve(res);
			},
			getSystemTypes: function (fetchedURL, options) {
				var validURI   = URI('/test/system_types');
				var fetchedURI = URI(fetchedURL);
				var res = {
					status: 400,
					data: 'FAIL',
					json: function () {
						return this.data;
					}
				};

				if (options && (options.method === 'GET' || !options.method)
				&& options.credentials === baseOptions.credentials
				&& URI(validURI).equals(fetchedURI)) {
					res.status = 200;
					res.data = 'OK';
					return Promise.resolve(res);
				}

				return Promise.resolve(res);
			},
			getSystemLinks: function (fetchedURL, options) {
				var validURI   = URI('/test/systems/' + randomID + '/links?account_number=540155&random=query');
				var fetchedURI = URI(fetchedURL);
				var res = {
					status: 400,
					data: 'FAIL',
					json: function () {
						return this.data;
					}
				};

				if (options && (options.method === 'GET' || !options.method)
				&& options.credentials === baseOptions.credentials
				&& URI(validURI).equals(fetchedURI)) {
					res.status = 200;
					res.data = 'OK';
					return Promise.resolve(res);
				}

				return Promise.resolve(res);
			},
			getSystems: function (fetchedURL, options) {
				var validURI   = URI('/test/systems?account_number=540155');
				var fetchedURI = URI(fetchedURL);
				var res = {
					status: 400,
					data: 'FAIL',
					json: function () {
						return this.data;
					}
				};

				if (options && (options.method === 'GET' || !options.method)
				&& options.credentials === baseOptions.credentials
				&& URI(validURI).equals(fetchedURI)) {
					res.status = 200;
					res.data = 'OK';
					return Promise.resolve(res);
				}

				return Promise.resolve(res);
			},
			headSystemsLatest: function (fetchedURL, options) {
				var validURI   = URI('/test/systems?account_number=540155&random=query');
				var fetchedURI = URI(fetchedURL);
				var res = {
					status: 400,
					data: 'FAIL',
					json: function () {
						return this.data;
					}
				};

				if (options && options.method === 'HEAD'
				&& options.credentials === baseOptions.credentials
				&& URI(validURI).equals(fetchedURI)) {
					res.status = 200;
					res.data = 'OK';
					return Promise.resolve(res);
				}

				return Promise.resolve(res);
			},
			getSystemsLatest: function (fetchedURL, options) {
				var validURI   = URI('/test/systems?account_number=540155&random=query');
				var fetchedURI = URI(fetchedURL);
				var res = {
					status: 400,
					data: 'FAIL',
					json: function () {
						return this.data;
					}
				};

				if (options && (options.method === 'GET' || !options.method)
				&& options.credentials === baseOptions.credentials
				&& URI(validURI).equals(fetchedURI)) {
					res.status = 200;
					res.data = 'OK';
					return Promise.resolve(res);
				}

				return Promise.resolve(res);
			},
			getSystemStatus: function (fetchedURL, options) {
				var validURI   = URI('/test/systems/status?account_number=540155&random=query');
				var fetchedURI = URI(fetchedURL);
				var res = {
					status: 400,
					data: 'FAIL',
					json: function () {
						return this.data;
					}
				};

				if (options && (options.method === 'GET' || !options.method)
				&& options.credentials === baseOptions.credentials
				&& URI(validURI).equals(fetchedURI)) {
					res.status = 200;
					res.data = 'OK';
					return Promise.resolve(res);
				}

				return Promise.resolve(res);
			},
			getSystemSummary: function (fetchedURL, options) {
				var validURI   = URI('/test/systems?account_number=540155&summary=true&random=query');
				var fetchedURI = URI(fetchedURL);
				var res = {
					status: 400,
					data: 'FAIL',
					json: function () {
						return this.data;
					}
				};

				if (options && (options.method === 'GET' || !options.method)
				&& options.credentials === baseOptions.credentials
				&& URI(validURI).equals(fetchedURI)) {
					res.status = 200;
					res.data = 'OK';
					return Promise.resolve(res);
				}

				return Promise.resolve(res);
			},
			getSystemReports: function (fetchedURL, options) {
				var validURI   = URI('/test/systems/01234567890123456789/reports?account_number=540155');
				var fetchedURI = URI(fetchedURL);
				var res = {
					status: 400,
					data: 'FAIL',
					json: function () {
						return this.data;
					}
				};

				if (options && (options.method === 'GET' || !options.method)
				&& options.credentials === baseOptions.credentials
				&& URI(validURI).equals(fetchedURI)) {
					res.status = 200;
					res.data = 'OK';
					return Promise.resolve(res);
				}

				return Promise.resolve(res);
			},
			getSystemMetadata: function (fetchedURL, options) {
				var validURI   = URI('/test/systems/01234567890123456789/metadata?account_number=540155');
				var fetchedURI = URI(fetchedURL);
				var res = {
					status: 400,
					data: 'FAIL',
					json: function () {
						return this.data;
					}
				};

				if (options && (options.method === 'GET' || !options.method)
				&& options.credentials === baseOptions.credentials
				&& URI(validURI).equals(fetchedURI)) {
					res.status = 200;
					res.data = 'OK';
					return Promise.resolve(res);
				}

				return Promise.resolve(res);
			},
			deleteSystem: function (fetchedURL, options) {
				var validURI   = URI('/test/systems/01234567890123456789?account_number=540155');
				var fetchedURI = URI(fetchedURL);
				var res = {
					status: 400,
					data: 'FAIL',
					json: function () {
						return this.data;
					}
				};

				if (options && options.method === 'DELETE'
				&& options.credentials === baseOptions.credentials
				&& URI(validURI).equals(fetchedURI)) {
					res.status = 200;
					res.data = 'OK';
					return Promise.resolve(res);
				}

				return Promise.resolve(res);
			}
		};

	beforeEach(function () {
		apiService.init(apiRoot, accountNumber);
		stubedRequester = spyOn(window, 'fetch');
	});

	it('should exist', function (done) {
		expect(apiService).toBeDefined();
		done();
	});

	it('should get /test/systems/:systemid?account_number=540155', function (done) {
		stubedRequester.and.callFake(urlValidation.getSingleSystem);
		apiService.getSingleSystem(randomID).then(function (res) {
			expect(res.data).toBe('OK');
			expect(res.status).toBe(200);
			done();
		});
	});

	it('should get /test/systems?account_number=540155', function (done) {
		stubedRequester.and.callFake(urlValidation.getSystems);
		apiService.getSystems().then(function (res) {
			expect(res.data).toBe('OK');
			expect(res.status).toBe(200);
			done();
		});
	});

	it('should get /test/systems/parent_system_id/links?queryparams', function (done) {
		stubedRequester.and.callFake(urlValidation.getSystemLinks);
		apiService.getSystemLinks(randomID, randomQuery).then(function (res) {
			expect(res.data).toBe('OK');
			expect(res.status).toBe(200);
			done();
		});
	});

	it('should get /test/systems?account_number=540155&random=query', function (done) {
		stubedRequester.and.callFake(urlValidation.getSystemsLatest);
		apiService.getSystemsLatest(randomQuery).then(function (res) {
			expect(res.data).toBe('OK');
			expect(res.status).toBe(200);
			done();
		});
	});

	it('should get /test/systems/status?queryparams', function (done) {
		stubedRequester.and.callFake(urlValidation.getSystemStatus);
		apiService.getSystemStatus(randomQuery).then(function (res) {
			expect(res.data).toBe('OK');
			expect(res.status).toBe(200);
			done();
		});
	});

	it('should get /test/systems?summary=true&queryparams', function (done) {
		stubedRequester.and.callFake(urlValidation.getSystemSummary);
		apiService.getSystemSummary(randomQuery).then(function (res) {
			expect(res.data).toBe('OK');
			expect(res.status).toBe(200);
			done();
		});
	});

	it('should get /test/systems/machine_id/reports?account_number=540155', function (done) {
		stubedRequester.and.callFake(urlValidation.getSystemReports);
		apiService.getSystemReports(randomID).then(function (res) {
			expect(res.data).toBe('OK');
			expect(res.status).toBe(200);
			done();
		});
	});

	it('should get /test/systems/machine_id/metadata?account_number=540155', function (done) {
		stubedRequester.and.callFake(urlValidation.getSystemMetadata);
		apiService.getSystemMetadata(randomID).then(function (res) {
			expect(res.data).toBe('OK');
			expect(res.status).toBe(200);
			done();
		});
	});

	it('should delete a system at /test/systems/machine_id?account_number=540155', function (done) {
		stubedRequester.and.callFake(urlValidation.deleteSystem);
		apiService.deleteSystem(randomID).then(function (res) {
			expect(res.data).toBe('OK');
			expect(res.status).toBe(200);
			done();
		});
	});
});