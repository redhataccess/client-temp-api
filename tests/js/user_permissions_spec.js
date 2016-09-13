/*global angular */
'use strict';

describe('Unit: UserPermissions', function () {
	var apiService,
		httpBackend,
		mockResource;
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

		angular.mock.inject(function (UserPermissions, $httpBackend) {
			apiService = UserPermissions;
			httpBackend = $httpBackend;
		}); 
	});

	it('should exist', function () {
		expect(apiService).toBeDefined();
	});

	it('should get /test/permissions/:permissionId', function () {
		// Url should only contain /test/user_permissions because
		// $resource GET actions ignore the parameter arugment
		httpBackend.expectGET('/test/user_permissions').respond([{id: 'randomUserPerm'}]);
		apiService.init();
		apiService.initial.then(function (res) {
			expect(res[0].id).toEqual('randomUserPerm');
		});
		httpBackend.flush();
	});
});