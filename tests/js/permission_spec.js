/*global angular */
'use strict';

describe('Unit: Permission', function () {
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

		angular.mock.inject(function (Permission, $httpBackend) {
			apiService = Permission;
			httpBackend = $httpBackend;
		}); 
	});

	it('should exist', function () {
		expect(apiService).toBeDefined();
	});

	it('should get /test/permissions/:permissionId', function () {
		// Url should only contain /test/permissions because
		// $resource GET actions ignore the parameter argument
		httpBackend.expectGET('/test/permissions').respond([{id: 'randomPerm'}]);
		apiService.init();
		apiService.initial.then(function (res) {
			expect(res[0].id).toEqual('randomPerm');
		});
		httpBackend.flush();
	});
});