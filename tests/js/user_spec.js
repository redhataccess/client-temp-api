/*global angular */
'use strict';

describe('Unit: User', function () {
	var apiService,
		httpBackend,
		scope,
		location,
		apiWindow,
		user = {
			current_entitlements: {
				unlimitedRHEL: true,
				systemLimitReached: null,
				whitelist: {
					osp: true
				}
			},
			permissions: {
				permission1: {
					code: 'randomPermCode'
				},
				permission2: {
					code: 'randomPermCode1'
				}
			},
			is_internal: null,
			demo_mode: null
		};

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
						if (type !== 'all')
							url += ('&type=' + type);
						else 
							url += '&type=all';
			            return url;
					},
					set: function (arg, arg1, arg2) {
						return;
					}
				}
			});
		});

		angular.mock.inject(function (User, $httpBackend, $rootScope, $location, $window) {
			scope = $rootScope.$new();
			scope.$on('user:loaded', function (event, data) {
				expect(data).toBe(undefined);
			});

			apiWindow = $window;
			apiWindow.localStorage.getItem = function (value) {
				if (value === 'insights:fake:entitlements')
					return {
						unlimitedRhel: true,
						systemLimitReached: null,
					};
				else
					return 'true';
			};

			apiService = User;
			location = $location;

			httpBackend = $httpBackend;
			httpBackend.when('GET', '/test/me').respond(user);
		}); 
	});

	it('should exist', function () {
		expect(apiService).toBeDefined();
	});

	it('should get /test/me and initialize the user that is returned', function () {
		var url = '/test/me';
		var permissionsIndexByCode = {
			randomPermCode: {
				code: 'randomPermCode'
			},
			randomPermCode1: {
				code: 'randomPermCode1'
			}
		}

		// Calls the function twice so the test goes into every branch in the functions
		// that are being tested
		httpBackend.expectGET(url);
		apiService.init().then(function (res) {
			expect(res.permissions).toEqual(permissionsIndexByCode);
			expect(res.current_entitlements.systemLimitReached).toBe(false);
			expect(res.is_internal).toBe(false);
			expect(res.demo_mode).toBe(true);
		});

		apiService.init().then(function (res) {
			expect(res.permissions).toEqual(permissionsIndexByCode);
			expect(res.current_entitlements.systemLimitReached).toBe(false);
			expect(res.is_internal).toBe(false);
			expect(res.demo_mode).toBe(true);
		});
		httpBackend.flush();
	});

	it('should get /test/me and initialize the user with minimal data', function () {
		var url = '/test/me';
		var permissionsIndexByCode = {
			randomPermCode: {
				code: 'randomPermCode'
			},
			randomPermCode1: {
				code: 'randomPermCode1'
			}
		}

		apiWindow.localStorage.getItem = function (value) {
			if (value === 'insights:fake:entitlements')
				return null;
			else
				return 'false';
		};		

		user.current_entitlements.unlimitedRHEL = false;

		// Calls the function twice so the test goes into every branch in the functions
		// that are being tested
		httpBackend.expectGET(url);
		apiService.init().then(function (res) {
			expect(res.permissions).toEqual(permissionsIndexByCode);
			expect(res.current_entitlements).toEqual(user.current_entitlements);
			expect(res.is_internal).toBe(user.is_internal);
			expect(res.demo_mode).toBe(user.demo_mode);
		});
		httpBackend.flush();

		user.current_entitlements.unlimitedRHEL = true;
	});

	it('should asynchronusly get the current user', function () {
		var url = '/test/me';
		var currentUser;
		var cb = function (user) {
			return user;
		};

		// Calls the function twice so the test goes into every branch in the functions
		// that are being tested
		httpBackend.expectGET(url);
		apiService.init().then(function (res) {
			currentUser = res;
		});
		httpBackend.flush();

		expect(apiService.asyncCurrent(cb)).toEqual(currentUser);

		apiService.current.loaded = false;

		expect(apiService.asyncCurrent(cb)).toBe(undefined);
	});

	it('should asynchronusly get the user through the defered promise', function () {
		var cb = function (user) {
			return user;
		};

		apiService.current.loaded = false;

		expect(apiService.asyncCurrent(cb)).toBe(undefined);
	});

	it('should return true when the user is on the osp whitelist', function () {
		var url = '/test/me';
		location.absUrl = function () {
			return '/test/insightsbeta/me?test=test';
		}

		httpBackend.expectGET(url);
		apiService.init();
		httpBackend.flush();

		expect(apiService.isOnOSPWhitelist()).toBe(true);
	});

	it('should return false when the user is not using insightsbeta', function () {
		location.absUrl = function () {
			return '/test/me?test=test';
		}

		expect(apiService.isOnOSPWhitelist()).toBe(false);
	});

	it('should return false when the user is not on the osp whitelist', function () {
		var url = '/test/me';
		location.absUrl = function () {
			return '/test/insightsbeta/me?test=test';
		}

		httpBackend.expectGET(url);
		apiService.init();
		httpBackend.flush();

		apiService.current.current_entitlements = null;
		
		expect(apiService.isOnOSPWhitelist()).toBe(false);
	});
});