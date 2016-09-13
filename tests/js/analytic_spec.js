/*global angular */
'use strict';

describe('Unit: analytic', function () {
	var apiService,
		httpBackend,
		http;

	beforeEach(function () {
		angular.mock.module('insights', function ($provide) {
			$provide.provider('InsightsConfig', function () {
				return {
					$get: function () {
						return {
							apiRoot: '/test/'
						}
					}
				}
			});
		});

		angular.mock.inject(function (Analytic, $httpBackend) {
			apiService = Analytic;
			httpBackend = $httpBackend;
			httpBackend.when('GET', /\/test\/analytics\/(.+)/).respond('test');
		});
	});

	it('should exist', function () {
		expect(apiService).toBeDefined();
	});

	it('should get /test/analytics/reports', function () {
		var url = '/test/analytics/reports';

		httpBackend.expectGET(url);
		apiService.reports().then(function (res) {
			expect(res.data).toBe('test');
			expect(res.status).toBe(200);
		});
		httpBackend.flush();
	});

	it('should get /test/analytics/systems', function () {
		var url = '/test/analytics/systems';

		httpBackend.expectGET(url);
		apiService.systems().then(function (res) {
			expect(res.data).toBe('test');
			expect(res.status).toBe(200);
		});
		httpBackend.flush();
	});
});