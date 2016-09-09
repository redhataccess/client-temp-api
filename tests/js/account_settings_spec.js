/*global angular */
'use strict';

describe('Unit: AccountSettings', function () {
    var stubedRequester;
    var apiRoot       = '/test';
    var accountNumber = '540155';
    var url           = '/test/account/settings';
    var apiService    = require('../../src/js/api_client_test/account_settings.js').AccountSettings();
    var URI           = require('urijs');
    Promise           = require('bluebird');
    var postOptions   = {
        method: 'POST',
        Body: 'test',
        credentials: 'same-origin'
    };
    var getOptions    = {
        credentials: 'same-origin'
    };

    var requestValidation = {
        getSettings: function (fetchedUrl, options) {
            var validURI = URI(url);
            var fetchedURI = URI(fetchedUrl);
            var res = {
                status: 400,
                data: 'FAIL',
                json: function () {
                    return this.data;
                }
            };

            console.log(
                options.credientials 
                )

            if (options && (options.method === 'GET' || !options.method)
                && options.credientials === getOptions.credentials
                && URI(validURI).equals(fetchedURI)) {
                res.status = 200;
                res.data = 'OK';
                return Promise.resolve(res);
            }

            return Promise.resolve(res);
        },
        updateSettings: function (fetchedUrl, options) {
            var validURI = URI(url);
            var fetchedURI = URI(fetchedUrl);
            var res = {
                status: 400,
                data: 'FAIL',
                json: function () {
                    return this.data;
                }
            };

            console.log('in update validation')

            if (options && options.method && options.method === 'POST' 
                && options.credientials === postOptions.credentials
                && URI(validURI).equals(fetchedURI) && options.body) {
                console.log('inside if')
                res.status = 200;
                res.data = 'OK';
                return Promise.resolve(res);
            }

            return Promise.resolve(res);
        }
    }

    beforeEach(function () {
        apiService.init(apiRoot);
        stubedRequester = spyOn(window, 'fetch');
    });

    it('should exist', function (done) {
        expect(apiService).toBeDefined();
        done();
    });

    it('should get ' + url, function () {
        stubedRequester.and.callFake(requestValidation.getSettings);
        apiService.getSettings().then(function (res) {
            console.log(res)
            expect(res.data).toBe('OK');
            expect(res.status).toBe(200);
            done();
        });
    });

    it('should post "test" settings', function () {
        stubedRequester.and.callFake(requestValidation.updateSettings)
        apiService.updateSettings(postOptions.Body).then(function (res) {
            expect(res.data).toBe('OK');
            expect(res.status).toBe(200);
            done();
        });
    });
});