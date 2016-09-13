/*global angular */
'use strict';

describe('Unit: Ack', function () {
    var apiService,
        httpBackend,
        scope,
        url = '/test/acks',
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
        angular.mock.inject(function (Ack, $httpBackend, $rootScope) {
            apiService = Ack;
            httpBackend = $httpBackend;
            scope = $rootScope.$new();
            httpBackend.when('GET', url + '?include=rule&account_number=1234567890' ).respond(200, baseData);
            httpBackend.when('POST', url + '?account_number=1234567890',
                function (data) {
                    var jsonData = JSON.parse(data);
                    expect(jsonData.rule_id).toBe(postData.rule_id);
                    return true;
                }
            ).respond(200, postData);
            httpBackend.when('DELETE', url + '/1?account_number=1234567890').respond(200);
        });
    });

   	afterEach(function () {
     	httpBackend.verifyNoOutstandingExpectation();
     	httpBackend.verifyNoOutstandingRequest();
   	});

    it('should exist', function () {
        expect(apiService).toBeDefined();
    });

    it('should get acks', function () {
        httpBackend.expectGET(url + '?include=rule&account_number=1234567890');
        apiService.init();
        httpBackend.flush();
        expect(apiService.acks).toEqual(baseData);
        expect(apiService.ackMap.hasOwnProperty('test1')).toBe(true);
        expect(apiService.ackMap.hasOwnProperty('test2')).toBe(true);
    });

    it('should reload the data with $rootScope', function () {
        httpBackend.expectGET(url + '?include=rule&account_number=1234567890');
        scope.$emit('reload:data');
        httpBackend.flush();
        expect(apiService.acks).toEqual(baseData);
        expect(apiService.ackMap.hasOwnProperty('test1')).toBe(true);
        expect(apiService.ackMap.hasOwnProperty('test2')).toBe(true);
    });

    it('should post a new ack', function () {
        httpBackend.expectPOST(url + '?account_number=1234567890');
        apiService.init();
        apiService.createAck(postData);
        httpBackend.flush();
        expect(apiService.acks[2]).toEqual(postData);
        expect(apiService.ackMap.hasOwnProperty(postData.rule_id)).toBe(true);
    });

    it('should delete an ack', function () {
        httpBackend.expectDELETE(url + '/1?account_number=1234567890');
        apiService.init();
        apiService.deleteAck({id: '1', rule_id: 'test1'});
        httpBackend.flush();
        expect(apiService.acks.length).toEqual(1);
        expect(apiService.ackMap.hasOwnProperty('test1')).toBe(false);
    });
});
