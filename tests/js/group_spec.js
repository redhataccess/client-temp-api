/*global angular */
'use strict';

describe('Unit: Group', function () {
    var apiService,
        httpBackend,
        scope,
        url = '/test/groups',
        baseData =
        [{
            id: '1',
            systems: [{
                id: '1',
                system_id: 'test1'
            }, {
                id: '2',
                system_id: 'test2'
            }]
        }],
        postData = 
        [{
            id: '3',
            system_id: 'test3'
        }, {
            id: '4',
            system_id: 'test4'
        }];


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
        angular.mock.inject(function (Group, $httpBackend, $rootScope) {
            apiService = Group;
            httpBackend = $httpBackend;
            scope = $rootScope.$new();
            httpBackend.when('GET', url + '?include=systems&account_number=1234567890').respond(200, baseData);
        });
    });

   	afterEach(function () {
     	httpBackend.verifyNoOutstandingExpectation();
     	httpBackend.verifyNoOutstandingRequest();
   	});

    it('should exist', function () {
        expect(apiService).toBeDefined();
    });

    it('should get groups', function () {
        httpBackend.expectGET(url + '?include=systems&account_number=1234567890');
        apiService.init();
        httpBackend.flush();
        expect(apiService.groups).toEqual(baseData);
    });

    it('should reload data', function () {
        httpBackend.expectGET(url + '?include=systems&account_number=1234567890');
        apiService.reload();
        httpBackend.flush();
        expect(apiService.groups).toEqual(baseData);
    });

    it('should reload the data with $rootScope', function () {
        httpBackend.expectGET(url + '?include=systems&account_number=1234567890');
        scope.$emit('reload:data');
        httpBackend.flush();
        expect(apiService.groups).toEqual(baseData);
    });

    it('should change the current group', function () {
        expect(apiService.current()).toEqual({});
        apiService.setCurrent('test-group');
        expect(apiService.current()).toEqual('test-group');
        apiService.setCurrent();
        expect(apiService.current()).toEqual({});
    });

    it('should append url with current group', function () {
        apiService.setCurrent({id: 'test-group'});
        expect(apiService.appendCurrentGroup(url)).toEqual(url + '&group=test-group');
    });

    it('should remove a system', function () {
        apiService.init();
        httpBackend.flush();
        httpBackend.expectDELETE(url + '/' + baseData[0].id + '/systems/' + baseData[0].systems[0].system_id + '?account_number=1234567890').respond(200);
        apiService.removeSystem(baseData[0], baseData[0].systems[0]).then(function (res) {
            expect(res.status).toEqual(200);
        });
        httpBackend.flush();
        expect(apiService.groups[0].systems.length).toEqual(1);
        expect(apiService.groups[0].systems[0]).toEqual(baseData[0].systems[1]);
    });

    it('should remove two systems', function () {
        apiService.init();
        httpBackend.flush();
        httpBackend.expectDELETE(url + '/' + baseData[0].id + '/systems/' + baseData[0].systems[0].system_id + '?account_number=1234567890').respond(200);
        httpBackend.expectDELETE(url + '/' + baseData[0].id + '/systems/' + baseData[0].systems[1].system_id + '?account_number=1234567890').respond(200);
        apiService.removeSystems(baseData[0], [baseData[0].systems[0].system_id, baseData[0].systems[1].system_id]).then(function (res) {
        expect(res[0].status).toEqual(200);
        expect(res[1].status).toEqual(200);
        });
        httpBackend.flush();
        expect(apiService.groups[0].systems).toEqual([]);
    });

    it('should add/put two systems', function () {
        var testGroup = {id: 'test-group'};
        httpBackend.expectPUT(url + '/' + testGroup.id + '/systems?account_number=1234567890', baseData[0].systems).respond(200);
        apiService.addSystems(testGroup, baseData[0].systems).then(function (res) {
            expect(res.status).toEqual(200);
        });
        httpBackend.flush();
    });

    it('should post/create a new group', function () {
        var testGroup = {id: 'test-group'};
        // Got to return a 201 status here for the code being tested
        httpBackend.expectPOST(url + '?account_number=1234567890', testGroup).respond(201, testGroup);
        apiService.createGroup(testGroup).then(function (res) {
            expect(res).toBeDefined();
        });
        httpBackend.flush();
        expect(apiService.groups[0].id).toEqual(testGroup.id);
    });

    it('should delete a group', function () {
        apiService.init();
        httpBackend.flush();
        httpBackend.expectDELETE(url + '/' + baseData[0].id + '?account_number=1234567890').respond(200);
        apiService.deleteGroup(baseData[0]).then(function (res) {
            expect(res.status).toEqual(200);
        });
        httpBackend.flush();
        expect(apiService.groups).toEqual([]);
    });
});
