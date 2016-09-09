/*global angular */
'use strict';

describe('Unit: Account', function () {
	var server,
		stubedRequester;

	var accountNumber =	'540155';
	var apiRoot       = '/test';
	var base          = 'account';
	var url           = '/test/account/products?account_number=540155';
	var apiService    = require('../../src/js/api_client_test/account.js').Account();
	var URI           = require('urijs');
	Promise           = require('bluebird');
	var baseOptions   = {
		credientials: 'same-origin'
	};

	var requestValidation = {
		getProducts: function (fetchedUrl, options) {
			var validURI = URI(url);
			var fetchedURI = URI(fetchedUrl);
			var res = {
				status: 400,
				data: 'FAIL',
				json: function () {
					return this.data;
				}
			};

			if (options && (options.method === 'GET' || !options.method)
				&& options.credientials === baseOptions.credentials
				&& URI(validURI).equals(fetchedURI)) {
				res.status = 200;
				res.data = 'OK';
				return Promise.resolve(res);
			}

			return Promise.resolve(res);
		}
	}

	beforeEach(function () {
		apiService.init(apiRoot, accountNumber);
		stubedRequester = spyOn(window, 'fetch');
	});

	it('should exist', function (done) {
		expect(apiService).toBeDefined();
		done();
	});

	it('should retrive products from the constructed url', function (done) {
		stubedRequester.and.callFake(requestValidation.getProducts);
		apiService.getProducts().then(function (res) {
			expect(res.data).toBe('OK')
			expect(res.status).toBe(200);
			done();
		});
	});
});