/*global angular */
'use strict';

describe('Unit: Rule', function () {
	var apiService,
		httpBackend;
	var testRule = {
		rule_id: 'randomRule'
	}

	beforeEach(function () {
		angular.mock.module('insights', function ($provide) {
			//mock out AccountService
			$provide.service('AccountService', function () {
				return {
					current: function (seporator) {
						var acctStr = ((seporator) ? seporator : '?');
						acctStr += ('account_number=540155');
						return acctStr;
					}
				}
			});
			$provide.provider('InsightsConfig', function () {
				return {
					$get: function () {
						return {
							apiRoot: '/test/'
						}
					}
				}
			});
			$provide.service('Utils', function () {
				return {
					addQueryToUrl: function (url, query) {
						var key;
				        var prependChar;
				        for (key in query) {
				            prependChar = this.getNextQueryPrependChar(url);
				            url += prependChar + key + '=' + query[key];
				        }

				        return url;
					},
					getNextQueryPrependChar: function (url) {
						var prependChar = '?';
				        if (url.indexOf('?') > -1) {
				            prependChar = '&';
				        }

				        return prependChar;
					}
				}
			});
			$provide.service('PreferenceService', function () {
				return  {
					appendProductToUrl: function (url, type) {
						url += ('&type=' + type);
			            return url;
					}
				}
			});
		});

		angular.mock.inject(function (Rule, $httpBackend) {
			apiService = Rule;
			httpBackend = $httpBackend;
			httpBackend.when('GET', /\/test\/(.+\/)?rules(\/)?(.+)/).respond('test');

			httpBackend.when('POST', /\/test\/(.+\/)?rules(\/)?(.+)/,
			function (data) {
				if (data.indexOf('{"rule_id":"randomRule"}') !== -1 || data.indexOf('{"rule":{"rule_id":"randomRule"},"debug":"randomDebug"}') !== -1)
					return true;
				else
					return false;
			}).respond('test');

			httpBackend.when('PUT', /\/test\/(.+\/)?rules(\/)?(.+)/, 
			function (data) { 
				return (data.indexOf('description') !== -1 || data.indexOf('rule_id') !== -1);
			}).respond('test');

			httpBackend.when('DELETE', /\/test\/(.+\/)?rules(\/)?(.+)/).respond('deleted');
		});
	});

	it('should exist', function () {
		expect(apiService).toBeDefined();
	});

	it('should get /test/latest/rules?account_number=540155&product_id=randomProduct', function () {
		var url = '/test/latest/rules?account_number=540155&product_id=randomProduct';
		var query = {
			product_id: 'randomProduct'
		}

		httpBackend.expectGET(url);
		apiService.getRulesLatest(query).then(function (res) {
			expect(res.data).toBe('test');
			expect(res.status).toBe(200);
		});
		httpBackend.flush();
	});

	it('should get /test/rules?plugins=true', function () {
		var url = '/test/rules?plugins=true';

		httpBackend.expectGET(url);
		apiService.plugins().then(function (res) {
			expect(res.data).toBe('test');
			expect(res.status).toBe(200);
		});
		httpBackend.flush();
	});

	it('should get /test/rules/admin?internal=true', function () {
		var url = '/test/rules/admin?internal=true';

		httpBackend.expectGET(url);
		apiService.admin().then(function (res) {
			expect(res.data).toBe('test');
			expect(res.status).toBe(200);
		});
		httpBackend.flush();
	});

	it('should get /test/rules?summary=true', function () {
		var url = '/test/rules?summary=true&account_number=540155&type=all';

		httpBackend.expectGET(url);
		apiService.summary().then(function (res) {
			expect(res.data).toBe('test');
			expect(res.status).toBe(200);
		});
		httpBackend.flush();
	});

	it('should get /test/rules/rule_id', function () {
		var url = '/test/rules/randomRule';
		var skipCache = false;

		httpBackend.expectGET(url);
		apiService.byId(testRule.rule_id, skipCache).then(function (res) {
			expect(res.data).toBe('test');
			expect(res.status).toBe(200);
			expect(res.config.cache).toBe(true);
		});
		httpBackend.flush();
	});

	it('should get /test/rules/tags', function () {
		var url = '/test/rules/tags';

		httpBackend.expectGET(url);
		apiService.getAvailableTags().then(function (res) {
			expect(res.data).toBe('test');
			expect(res.status).toBe(200);
		});
		httpBackend.flush();
	});

	it('should expect a post to /test/rules', function () {
		var url = '/test/rules?internal=true';

		httpBackend.expectPOST(url, testRule);
		apiService.create(testRule).then(function (res) {
			expect(res.data).toBe('test');
			expect(res.status).toBe(200);
		});
		httpBackend.flush();
	});

	it('should expect a post to /test/rules/preview', function () {
		var url   = '/test/rules/preview?internal=true',
			debug = 'randomDebug';
			
		var expectedObj = {
			rule: testRule,
			debug: debug
		}
		httpBackend.expectPOST(url, expectedObj);
		apiService.preview(testRule, debug).then(function (res) {
			expect(res.data).toBe('test');
			expect(res.status).toBe(200);
		});
		httpBackend.flush();
	});

	it('should put the updated rule in /test/rules/rule_id', function () {
		var url = '/test/rules/randomRule?internal=true';

		httpBackend.expectPUT(url, testRule);
		apiService.update(testRule).then(function (res) {
			expect(res.data).toBe('test');
			expect(res.status).toBe(200);
		});
		httpBackend.flush();
	});

	it('should put the updated ruletag in /test/rules/tags/tagName', function () {
		var url = '/test/rules/tags/randomTag';
		var tag = {
			name: 'randomTag',
			description: 'randomDescription'
		}

		httpBackend.expectPUT(url, {description: tag.description});
		apiService.updateTag(tag).then(function (res) {
			expect(res.data).toBe('test');
			expect(res.status).toBe(200);
		});
		httpBackend.flush();
	});

	it('should delete the given rule at /test/rules/rule_id', function () {
		var url = '/test/rules/randomRule?internal=true';

		httpBackend.expectDELETE(url);
		apiService.delete(testRule).then(function (res) {
			expect(res.data).toBe('deleted');
			expect(res.status).toBe(200);
		});
		httpBackend.flush();
	});

	it('should delete the given ruletag at /test/rules/tags/tagName', function () {
		var url = '/test/rules/tags/randomTag';

		httpBackend.expectDELETE(url);
		apiService.deleteTag('randomTag').then(function (res) {
			expect(res.data).toBe('deleted');
			expect(res.status).toBe(200);
		});
		httpBackend.flush();
	});
});