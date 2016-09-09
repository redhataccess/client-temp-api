/*global angular */
'use strict';

describe('Unit: Topic', function () {
    var apiService,
        httpBackend,
        url = '/test/v1/topics',
        baseData = [
            {
                id: '1',
                title: 'test1'
            }, 
            {
                id: '2',
                title: 'test2'
            }
        ],
        postData = {
            id: '3',
            title: 'test3'
        },
        putData = {
            id: '1',
            title: 'put_test'
        }

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
        angular.mock.inject(function (Topic, $httpBackend) {
            apiService = Topic;
            httpBackend = $httpBackend;
        });
    });

   	afterEach(function () {
     	httpBackend.verifyNoOutstandingExpectation();
     	httpBackend.verifyNoOutstandingRequest();
   	});

    it('should exist', function () {
        expect(apiService).toBeDefined();
    });

    it('should get all with filters and limit search params', function () {
        httpBackend.expectGET(url + '?account_number=1234567890&filter=test&limit=1').respond(200);
        apiService.getAll({filter: 'test'}, 1).then(function (res) {
            expect(res.status).toEqual(200);
        });
        httpBackend.flush();
    });

    it('should get all with no params', function () {
        httpBackend.expectGET(url +'?account_number=1234567890').respond(200);
        apiService.getAll().then(function (res) {
            expect(res.status).toEqual(200);
        });
        httpBackend.flush();
    });

    it('should get topics/admin', function () {
        httpBackend.expectGET(url + '/admin').respond(200);
        apiService.admin().then(function (res) {
            expect(res.status).toEqual(200);
        });
        httpBackend.flush();
    });

    it('should get topics/id with product param', function () {
        httpBackend.expectGET(url + '/test-id?account_number=1234567890&product=rhel').respond(200);
        apiService.get('test-id', 'rhel').then(function (res) {
            expect(res.status).toEqual(200);
        });
        httpBackend.flush();
    });

    it('should get topics/id with no params', function () {
        httpBackend.expectGET(url + '/test-id?account_number=1234567890').respond(200);
        apiService.get('test-id', null).then(function (res) {
            expect(res.status).toEqual(200);
        });
        httpBackend.flush();
    });

    it('should post a topic', function () {
        httpBackend.expectPOST(url, postData).respond(200);
        apiService.create(postData).then(function (res) {
            expect(res.status).toEqual(200);
        });
        httpBackend.flush();
    });

    it('should put to update a topic', function () {
        httpBackend.expectPUT(url + '/' + putData.id, putData).respond(200);
        apiService.update(putData).then(function (res) {
            expect(res.status).toEqual(200);
        });
        httpBackend.flush();
    });

    it('should post to topics/preview', function () {
        httpBackend.expectPOST(url + '/preview', postData).respond(200);
        apiService.preview(postData).then(function (res) {
            expect(res.status).toEqual(200);
        });
        httpBackend.flush();
    });

    it('should delete a topic by id', function () {
        httpBackend.expectDELETE(url + '/' + baseData[0].id).respond(200);
        apiService.remove(baseData[0].id).then(function (res) {
            expect(res.status).toEqual(200);
        });
        httpBackend.flush();
    });
});
