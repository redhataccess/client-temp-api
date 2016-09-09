/*global angular */
'use strict';

describe('Unit: Maintenance', function () {
	var apiService,
		httpBackend,
		apiWindow,
		scope,
		plan = {
			maintenance_id: 'randomPlan'
		};

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
			$provide.service('AccountService', function () {
				return {
					current: function (seporator) {
						var acctStr = ((seporator) ? seporator : '?');
						acctStr += ('account_number=540155');
						return acctStr;
					}
				}
			});
			$provide.service('DataUtils', function () {
				return {
					readArray: function (array) {
						return array;
					},
					readPlan: function(plan) {
						return plan;
					}
				}
			});
		});

		angular.mock.inject(function (Maintenance, $httpBackend, $window, $rootScope) {
			apiService = Maintenance;
			apiWindow = $window;
			scope = $rootScope.$new();

			httpBackend = $httpBackend;
			httpBackend.when('GET', /\/test\/maintenance(.+)/).respond('test');
			httpBackend.when('POST', /\/test\/maintenance(.+)/).respond('test');
			httpBackend.when('PUT', /\/test\/maintenance(.+)/).respond('test');
			httpBackend.when('DELETE', /\/test\/maintenance(.+)/).respond('test')
		}); 
	});

	it('should exist', function () {
		expect(apiService).toBeDefined();
	});

	it('should get /test/maintenance?filter=future', function () {
		var url = '/test/maintenance?filter=future&account_number=540155';

		httpBackend.expectGET(url);
		apiService.getFutureMaintenancePlans().then(function (res) {
			expect(res.status).toBe(200);
		});
		httpBackend.flush();
	});

	it('should get /test/maintenance?filter=past', function () {
		var url = '/test/maintenance?filter=past&account_number=540155';

		httpBackend.expectGET(url);
		apiService.getPastMaintenancePlans().then(function (res) {
			expect(res.status).toBe(200);
		});
		httpBackend.flush();

	});

	it('should get /test/maintenance?filter=overdue', function () {
		var url = '/test/maintenance?filter=overdue&account_number=540155';

		httpBackend.expectGET(url);
		apiService.getOverdueMaintenancePlans().then(function (res) {
			expect(res.status).toBe(200);
		});
		httpBackend.flush();
	});

	it('should get /test/maintenance?account_number=540155', function () {
		var url = '/test/maintenance?account_number=540155';

		httpBackend.expectGET(url);
		apiService.getMaintenancePlans().then(function (res) {
			expect(res.status).toBe(200);
		});
		httpBackend.flush();
	});

	it('should get /test/maintenance/id?account_number=540155', function () {
		var url = '/test/maintenance/randomID?account_number=540155';

		httpBackend.expectGET(url);
		apiService.getMaintenancePlan('randomID').then(function (res) {
			expect(res.status).toBe(200);
		});
		httpBackend.flush();
	});

	it('should post to /test/maintenance?account_number=540155', function () {
		var url = '/test/maintenance?account_number=540155';

		httpBackend.expectPOST(url, plan);
		apiService.createPlan(plan).then(function (res) {
			expect(res.status).toBe(200);
		});
		httpBackend.flush();
	});

	it('should put /test/maintenance/planId?account_number=540155 to silence a plan', function () {
		var url = '/test/maintenance/' + plan.maintenance_id + '?account_number=540155';
		var data = {
			silenced: true
		};

		scope.$on('maintenance:planChanged', function (event, data) {
			expect(data).toBe(plan.maintenance_id);
		});

		httpBackend.expectPUT(url, data);
		apiService.silence(plan).then(function (res) {
			expect(res).toBe(undefined);
		});
		httpBackend.flush();
	});

	it('should delete /test/maintenance/planId?account_number=540155', function () {
		var url = '/test/maintenance/' + plan.maintenance_id + '?account_number=540155';

		scope.$on('maintenance:planDeleted', function (event, data) {
			expect(data).toBe(plan.maintenance_id);
		});

		httpBackend.expectDELETE(url);
		apiService.deletePlan(plan).then(function (res) {
			expect(res).toBe(undefined);
		});
		httpBackend.flush();
	});

	it('should post to /test/maintenance/planId/actions?report=reportId&account_number=540155', function () {
		var url = '/test/maintenance/' + plan.maintenance_id + '/actions?report=randomRepo&account_number=540155';

		httpBackend.expectPOST(url);
		apiService.addAction(plan.maintenance_id, 'randomRepo').then(function (res) {
			expect(res.status).toBe(200);
		});
		httpBackend.flush();
	});

	it('should delete /test/maintenance/planId/actions/actionId?account_number=540155', function () {
		var url = '/test/maintenance/' + plan.maintenance_id + '/actions/randomAction?account_number=540155';

		httpBackend.expectDELETE(url);
		apiService.deleteAction(plan.maintenance_id, 'randomAction').then(function (res) {
			expect(res.status).toBe(200);
		});
		httpBackend.flush();
	});

	it('should delete /test/maintenance/planId?account_number=540155', function () {
		var url = '/test/maintenance/' + plan.maintenance_id + '?account_number=540155';
		var actions = [{
			id: 'action1'
		}, {
			id: 'action2'
		}];

		var data = {
			delete: ['action1', 'action2']
		}

		httpBackend.expectPUT(url, data);
		apiService.deleteActions(plan.maintenance_id, actions).then(function (res) {
			expect(res.status).toBe(200);
		});
		httpBackend.flush();
	});

	it('should export the plan to the window object', function () {
		var url = '/test/maintenance/' + plan.maintenance_id + '?accept=csv&account_number=540155';

		apiWindow.location.assign = function (inputUrl) {
			expect(inputUrl).toBe(url);
		};
		apiService.exportPlan(plan.maintenance_id);
	});

	it('should return a frozen object', function () {
		var frozenObj = apiService.SUGGESTION;
		expect(frozenObj).toBeDefined();
		expect(Object.isFrozen(frozenObj)).toBe(true);
		expect(frozenObj.PROPOSED).toBe('proposed');
		expect(frozenObj.ACCEPTED).toBe('accepted');
		expect(frozenObj.REJECTED).toBe('rejected');
	});
});