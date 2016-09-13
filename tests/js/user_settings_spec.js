/*global angular */
'use strict';

describe('Unit: UserSettings', function () {
	var apiService,
		httpBackend;

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

		angular.mock.inject(function (UserSettings, $httpBackend) {
			apiService = UserSettings;

			httpBackend = $httpBackend;
			httpBackend.when('POST', '/test/me/settings').respond('test');
		}); 
	});

	it('should exist', function () {
		expect(apiService).toBeDefined();
	});

	it('should post to /test/me/settings', function () {
		httpBackend.expectPOST('/test/me/settings', 'settings');
		apiService.update('settings').then(function (res) {
			expect(res.status).toBe(200);
		});
		httpBackend.flush();
	});
});