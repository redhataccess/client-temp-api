/*global angular */
'use strict';

describe('Unit: Cluster', function () {
    var apiService,
        httpBackend,
        scope,
        url = '/test/',
        baseData = [
            {
                id: '1',
                rule_id: 'test1'
            }, 
            {
                id: '2',
                rule_id: 'test2'
            }
        ];

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
            }),
            $provide.service('AccountService', function () {
                return {
                    current: function (separator) {
                        var accountStr = ((separator) ? separator : '?');
                        accountStr += 'account_number=1234567890';
                        return accountStr;
                    }
                }
            });
        });
        angular.mock.inject(function (Cluster, $httpBackend, $rootScope) {
            apiService = Cluster;
            httpBackend = $httpBackend;
            scope = $rootScope.$new();
            httpBackend.when('GET', url + 'reports?system_id=test&type=all&product=osp').respond(200);
        });
    });

   	afterEach(function () {
     	httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
   	});

    it('should exist', function () {
        expect(apiService).toBeDefined();
    });

    it('should get clusters', function () {
        scope.$on('clusters:loaded', function (event, data) {
            expect(data).toEqual(baseData);
        });
        httpBackend.expectGET(url + 'systems?type=cluster&product=osp&account_number=1234567890').respond(200, baseData);
        apiService.getClusters().then(function (res) {
            // the getClusters() function returns the response here. Just verifying it wasn't corrupted anywhere
            expect(res.data).toEqual(baseData);
            expect(res.status).toEqual(200);
        });
        httpBackend.flush();
    });

    it('should get cluster reports', function() {
        httpBackend.expectGET(url + 'reports?system_id=test&type=all&product=osp');
        apiService.getClusterReports('test').then(function (res) {
            expect(res.status).toEqual(200);
        });
        httpBackend.flush();
    });

    it('should reload the data with $rootScope', function () {
        httpBackend.expectGET(url + 'systems?type=cluster&product=osp&account_number=1234567890').respond('test1');
        apiService.getClusters().then(function (res) {
            expect(res.data).toEqual('test1');
        });
        scope.$emit('reload:data');
        httpBackend.expectGET(url + 'systems?type=cluster&product=osp&account_number=1234567890').respond('test2');
        apiService.getClusters().then(function (res) {
            expect(res.data).toEqual('test2');
        });

        // Verify that if _clustersDfd is not null it just returns previous data
        apiService.getClusters().then(function (res) {
            expect(res.data).toEqual('test2');
        });
        httpBackend.flush();
    });
});
