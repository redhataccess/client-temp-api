/*global angular */
'use strict';

describe('Unit: Report', function () {
	var apiService,
		httpBackend,
		scope,
		apiWindow;

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
			$provide.service('PreferenceService', function () {
				return  {
					appendProductToUrl: function (url, type) {
						url += ('&type=all');
			            return url;
					}
				}
			});
			$provide.service('DataUtils', function () {
				return {
					readArray: function (array) {
						return array;
					},
					readReport: function(report) {
						return report;
					}
				}
			});
			$provide.factory('Group', function () {
				return {
					appendCurrentGroup: function (url) {
						url += '&group=randomGroup';
						return url
					}
				}
			});
		});

		angular.mock.inject(function (Report, $httpBackend, $rootScope, $window) {
			scope = $rootScope.$new();
			apiService = Report;

			apiWindow = $window;
			apiWindow.location.assign = function (url) {
				if (url.indexOf('category') !== -1)
					expect(url).toBe('/test/reports?accept=csv&account_number=540155&category=randomCat&group=randomGroup');
				else
					expect(url).toBe('/test/reports?accept=csv&account_number=540155&group=randomGroup');
			};

			httpBackend = $httpBackend;
			httpBackend.when('GET', /\/test\/reports(.+)/).respond('test');
		}); 
	});

	it('should exist', function () {
		expect(apiService).toBeDefined();
	});

	it('should get /test/reports?accept=host&account_number=540155', function () {
		var url = '/test/reports?accept=host&account_number=540155';

		httpBackend.expectGET(url);
		apiService.groupByHost().then(function (res) {
			expect(res.data).toBe('test');
			expect(res.status).toBe(200);
		});
		httpBackend.flush();
	});

	it('shoud export reports without a category to the browser object', function () {
		apiService.exportReports();
	});

	it('should export reports with a category to the browser object', function () {
		apiService.exportReports('randomCat');
	});

	it('should get /test/reports?accept=countMap&account_number=540155&group=randomGroup&type=all', function () {
		var url = '/test/reports?accept=countMap&account_number=540155&group=randomGroup&type=all';

		scope.$emit('reload:data');
		httpBackend.expectGET(url);
		apiService.countMap(true, null).then(function (res) {
			expect(res.data).toBe('test');
			expect(res.status).toBe(200);
		});

		// tests the othe other branch of the first if statement
		// to make sure that it returns the same thing as the previous call. 
		// the only change is that the force function parameter is false instead of true.
		apiService.countMap(false, null).then(function (res) {
			expect(res.data).toBe('test');
			expect(res.status).toBe(200);
		});
		httpBackend.flush();
	});

	it('should get /test/reports?accept=countMap&account_number=1234567&group=randomGroup&type=all', function () {
		var url = '/test/reports?accept=countMap&account_number=1234567&group=randomGroup&type=all';

		scope.$emit('reload:data');
		httpBackend.expectGET(url);
		apiService.countMap(true, '1234567').then(function (res) {
			expect(res.data).toBe('test');
			expect(res.status).toBe(200);
		});
		httpBackend.flush();
	});

	it('should get /test/reports?rule_id=randomRule&account_number=540155&group=randomGroup&randomAttr=true&type=all', function () {
		var url = '/test/reports?rule_id=randomRule&account_number=540155&group=randomGroup&randomAttr=true&type=all';

		httpBackend.expectGET(url);
		apiService.ruleReports('randomRule', 'randomAttr').then(function (res) {
			expect(res.data).toBe('test');
			expect(res.status).toBe(200);
		});
		httpBackend.flush();
	});

	it('should get /test/reports?rule=randomRule&account_number=540155&group=randomGroup&type=all', function () {
		var url = '/test/reports?rule=randomRule&account_number=540155&group=randomGroup&type=all';

		httpBackend.expectGET(url);
		apiService.ruleReports('randomRule', null).then(function (res) {
			expect(res.data).toBe('test');
			expect(res.status).toBe(200);
		});
		httpBackend.flush();
	});

	it('should get /test/reports?product=randomProd&account_number=540155', function () {
		var url = '/test/reports?product=randomProd&account_number=540155';

		httpBackend.expectGET(url);
		apiService.getReports('randomProd').then(function (res) {
			expect(res.data).toBe('test');
			expect(res.status).toBe(200);
		});
		httpBackend.flush();
	});

	// this tests the other branch of the ternary operator
	it('should get /test/reports?product=rhel&account_number=540155', function () {
		var url = '/test/reports?product=rhel&account_number=540155';

		httpBackend.expectGET(url);
		apiService.getReports().then(function (res) {
			expect(res.data).toBe('test');
			expect(res.status).toBe(200);
		});
		httpBackend.flush();
	});

	it('should get /test/reports?account_number=540155', function () {
		var url = '/test/reports?account_number=540155';

		httpBackend.expectGET(url);
		apiService.getAllReports().then(function (res) {
			expect(res.data).toBe('test');
			expect(res.status).toBe(200);
		});
		httpBackend.flush();
	});
});