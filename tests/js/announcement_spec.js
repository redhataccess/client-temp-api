/*global angular */
'use strict';

describe('Unit: Announcement', function () {
    var apiService,
        httpBackend,
        url = '/test/announcements',
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
            })
        });
        angular.mock.inject(function (Announcement, $httpBackend) {
            apiService = Announcement;
            httpBackend = $httpBackend;
            httpBackend.when('GET', url).respond(200, baseData);
        });
    });

   	afterEach(function () {
     	httpBackend.verifyNoOutstandingExpectation();
     	httpBackend.verifyNoOutstandingRequest();
   	});

    it('should exist', function () {
        expect(apiService).toBeDefined();
    });

    it('should get announcements', function () {
        httpBackend.expectGET(url);
        apiService.getAnnouncements().then(function (res) {
            expect(res.status).toEqual(200);
            expect(res.data).toEqual(baseData);
        });
        httpBackend.flush();
    });

    it('should get announcements with limit param', function () {
        httpBackend.expectGET(url + '?limit=1').respond(200, baseData[0]);
        apiService.getAnnouncements({limit: 1}).then(function (res) {
            expect(res.status).toEqual(200);
            expect(res.data).toEqual(baseData[0]);
        });
        httpBackend.flush();
    });

    it('should get announcement by id', function () {
        httpBackend.expectGET(url + '/2').respond(200, baseData[1]);;
        apiService.byId('2').then(function (res) {
            expect(res.status).toEqual(200);
            expect(res.data).toEqual(baseData[1]);
            expect(res.data.title).toBe(baseData[1].title);
        });
        httpBackend.flush();
    });

    it('should get announcement by slug', function () {
        httpBackend.expectGET(url + '/slug-test').respond(200, baseData[0]);
        apiService.bySlug('slug-test').then(function (res) {
            expect(res.status).toEqual(200);
        });
        httpBackend.flush();
    });

    it('should post a new announcement', function () {
        httpBackend.expectPOST(url + '?internal=true',
            function (data) {
                var jsonData = JSON.parse(data);
                expect(jsonData.title).toBe(postData.title);
                return true;
            }
        ).respond(200, postData);
        apiService.createAnnouncement(postData).then(function (res) {
            expect(res.status).toEqual(200);
            expect(res.data).toEqual(postData);
        });
        httpBackend.flush();
    });

    it('should put an update to an announcement', function () {
        httpBackend.expectPUT(url + '/' + baseData[0].id,
            function (data) {
                var jsonData = JSON.parse(data);
                expect(jsonData.title).toBe(putData.title);
                return true;
            }
        ).respond(200, putData);
        apiService.updateAnnouncement(putData).then(function (res) {
            expect(res.status).toEqual(200);
            expect(res.data.id).toEqual(putData.id);
        });
        httpBackend.flush();
    });

    it('should delete an announcement', function () {
        httpBackend.expectDELETE(url + '/' + baseData[0].id).respond(200);
        apiService.deleteAnnouncement(baseData[0]).then(function (res) {
            expect(res.status).toEqual(200);
        });
        httpBackend.flush();
    });

    it('should post to announcement_id/ack', function () {
        httpBackend.expectPOST(url + '/' + baseData[0].id + '/ack').respond(200);
        apiService.acknowledge(baseData[0]).then(function (res) {
            expect(res.status).toEqual(200);
        });
        httpBackend.flush();
    });
});
