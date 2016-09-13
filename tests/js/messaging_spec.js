/*global angular */
'use strict';

describe('Unit: Messaging', function () {
    var apiService,
        httpBackend,
        scope,
        url = '/test/messaging',
        baseData = [
            {
                id: '1',
                rule_id: 'test1'
            }, 
            {
                id: '2',
                rule_id: 'test2'
            }
        ],
        postData = {
            id: '3',
            rule_id: 'test3'
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
            })
        });
        angular.mock.inject(function (Messaging, $httpBackend, $rootScope) {
            apiService = Messaging;
            httpBackend = $httpBackend;
            scope = $rootScope.$new();
            httpBackend.when('GET', url + '/campaigns').respond(200, baseData);
        });
    });

   	afterEach(function () {
     	httpBackend.verifyNoOutstandingExpectation();
     	httpBackend.verifyNoOutstandingRequest();
   	});

    it('should exist', function () {
        expect(apiService).toBeDefined();
    });

    it('should get messaging/campaigns', function () {
        httpBackend.expectGET(url + '/campaigns');
        apiService.init();
        httpBackend.flush();
        expect(apiService.campaigns).toEqual(baseData);
    });

    it('should post campaigns to messaging/users', function () {
        apiService.init();
        httpBackend.flush();
        httpBackend.expectPOST(url + '/users', baseData).respond(200);
        apiService.savePrefs().then(function (res) {
            expect(res.status).toEqual(200);
        });
        httpBackend.flush();
    });
});
