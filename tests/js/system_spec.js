/*global angular */
'use strict';

var apiService = require('src/js/api_client_test/system.js'),

describe('Unit: System', function () {
	var server,
		filter,
		apiRoot      = 'test',
		basePath     = 'systems',
		fakeProdCode = 'randomProdCode',

		paths = {
			getSingleSystem: {
				base: 'systems'
			},
			getSystemTypes: {
				base: 'system_types'
			},
			getSystems: {
				base: 'systems'
			},
			headSystemsLatest: {
				base: 'systems'
			},
			getSystemsLatest: {
				base: 'systems'
			},
			getSystemSummary: {
				base: 'systems'
			},
		},

		// get used by getSystems, headSystemsLatest, getSystemsLatest, getSystemSummary
		staticParts  = {
			root: apiRoot,
			get: {
				base: basePath,
			}
			getSingleSystem: {
				base: basePath,
			},
			getSystemTypes: {
				base: 'system_types'
			},

		},
		urlsPresent  = {
			// get used by getSystems, headSystemsLatest, getSystemsLatest, getSystemSummary
			get: new URITemplate('/{root}/systems'),
			getSingleSystem: new URITemplate('/{root}/{base}/{id}'),
			getSystemTypes: new URITemplate('/{root}/system_types'),
			getSystemsLinks: new URITemplate('/{root}/{base}/{id}/{endpoint}'),
			getSystemReports: new URITemplate('/{root}/{base}/{id}/{endpoint}'),
			rootBaseEnd: new URITemplate('/{root}/{base}/{id}/{endpoint}'),
		},
		urlValidation = {
			getSingleSystem: function (uriParts) {
				var path      = uriParts.path.split('/');
				var query     = uriParts.query;
				var baseIndex = path.indexOf(base);

				// Check path and query validity 
				// (this applies to all if statements in urlValidation functions)
				if (path.indexOf(apiRoot) !== -1 && baseIndex !== -1 
					&& path[baseIndex + 1] === undefined && query.account_number && Object.keys(query).length === 1)
					return true;

				return false;
			},
			getSystemTypes: function (uriParts) {
				var path      = uriParts.path.split('/');
				var query     = uriParts.query;
				var baseIndex = path.indexOf('system_types');

				if (path.indexOf(apiRoot) !== -1 && baseIndex !== -1 
					&& !path[baseIndex + 1] && !query)
					return true;

				return false;
			},
			getSystemLinks: function (uriParts) {
				var path      = uriParts.path.split('/');
				var query     = uriParts.query;
				var baseIndex = path.indexOf(base);

				if (path.indexOf(apiRoot) !== -1 && baseIndex !== -1
					&& path[baseIndex + 1] && path.indexOf('links') !== -1
					&& query.account_number && Object.keys(query).length === 1)
					return true;

				return false;
			},
			getSystems: function (uriParts) {
				var path      = uriParts.path.split('/');
				var query     = uriParts.query;
				var baseIndex = path.indexOf(base);

				if (path.indexOf(apiRoot) !== -1 && baseIndex !== -1 
					&& !path[baseIndex + 1] === undefined && query.account_number && Object.keys(query).length === 1)
					return true;

				return false;
			},
			headSystemsLatest: function (uriParts) {
				var path      = uriParts.path.split('/');
				var query     = uriParts.query;
				var baseIndex = path.indexOf(base);

				if (path.indexOf(apiRoot) !== -1 && baseIndex !== -1 
					&& !path[baseIndex + 1] === undefined && query.account_number && Object.keys(query).length === 1)
					return true;

				return false;
			},
		};

	function UrlValidation() {
		return {
			getSingleSystem: function (uriParts) {
				var path      = uriParts.path.split('/');
				var query     = uriParts.query;
				var baseIndex = path.indexOf(base);

				// Check path and query validity 
				// (this applies to all if statements in urlValidation functions)
				if (path.indexOf(apiRoot) !== -1 && baseIndex !== -1 
					&& path[baseIndex + 1] === undefined && query.account_number 
					&& Object.keys(query).length === 1)
					return true;

				return false;
			},
			getSystemTypes: function (uriParts) {
				var path      = uriParts.path.split('/');
				var query     = uriParts.query;
				var baseIndex = path.indexOf('system_types');

				if (path.indexOf(apiRoot) !== -1 && baseIndex !== -1 
					&& !path[baseIndex + 1] && !query)
					return true;

				return false;
			},
			getSystemLinks: function (uriParts) {
				var path      = uriParts.path.split('/');
				var query     = uriParts.query;
				var baseIndex = path.indexOf(base);

				if (path.indexOf(apiRoot) !== -1 && baseIndex !== -1
					&& path[baseIndex + 1] && path.indexOf('links') !== -1
					&& !path[baseIndex + 2] && query.account_number 
					&& Object.keys(query).length >== 1)
					return true;

				return false;
			},
			getSystems: function (uriParts) {
				var path      = uriParts.path.split('/');
				var query     = uriParts.query;
				var baseIndex = path.indexOf(base);

				if (path.indexOf(apiRoot) !== -1 && baseIndex !== -1 
					&& !path[baseIndex + 1] && query.account_number 
					&& Object.keys(query).length === 1)
					return true;

				return false;
			},
			headSystemsLatest: function (uriParts) {
				var path      = uriParts.path.split('/');
				var query     = uriParts.query;
				var baseIndex = path.indexOf(base);

				if (path.indexOf(apiRoot) !== -1 && baseIndex !== -1 
					&& !path[baseIndex + 1] && query.account_number 
					&& Object.keys(query).length >== 1)
					return true;

				return false;
			},
			getSystemsLatest: function (uriParts) {
				var path      = uriParts.path.split('/');
				var query     = uriParts.query;
				var baseIndex = path.indexOf(base);

				if (path.indexOf(apiRoot) !== -1 && baseIndex !== -1 
					&& !path[baseIndex + 1] && query.account_number 
					&& Object.keys(query).length >== 1)
					return true;

				return false;
			},
			getSystemStatus: function (uriParts) {
				var path      = uriParts.path.split('/');
				var query     = uriParts.query;
				var baseIndex = path.indexOf(base);

				if (path.indexOf(apiRoot) !== -1 && baseIndex !== -1 
					&& path.indexOf('status') !== -1 && !path[baseIndex + 1]
					&& query.account_number && Object.keys(query).length >== 1)
					return true;

				return false;
			},
			getSystemSummary: function (uriParts) {
				var path      = uriParts.path.split('/');
				var query     = uriParts.query;
				var baseIndex = path.indexOf(base);

				if (path.indexOf(apiRoot) !== -1 && baseIndex !== -1 
					&& query.account_number && query.summary
					&& Object.keys(query).length >== 1)
					return true;

				return false;
			},
			getSystemReports: function (uriParts) {
				var path      = uriParts.path.split('/');
				var query     = uriParts.query;
				var baseIndex = path.indexOf(base);

				if (path.indexOf(apiRoot) !== -1 && baseIndex !== -1 
					&& path.indexOf('reports') !== -1 && path[baseIndex + 1]
					&& query.account_number && Object.keys(query).length === 1)
					return true;

				return false;
			}

		}
	}

	function parseReqUrl(req) {
		var url = URI(req.url).normalize().toString();
		return URI.parse(url);
	}

	beforeEach(function () {
	});

	afterEach(function () {
	});

	it('should exist', function () {
		expect(apiService).toBeDefined();
	});

	// it('should get /test/systems/:systemid?account_number=540155', function () {
	// 	var url = '/test/systems/randomID?account_number=540155';
	// 	apiService.init(url);

	// 	apiService.getSingleSystem('randomID').then(function (res) {
	// 		expect(res.data).toBe('test');
	// 		expect(res.status).toBe(200);
	// 	});
	// });

	// it('should get /test/systems?account_number=540155', function () {
	// 	var url = '/test/systems?account_number=540155';
	// 	scope.$emit('reload:data');

	// 	apiService.getSystems().then(function (res) {
	// 		expect(res.data).toBe('test');
	// 		expect(res.status).toBe(200);
	// 	});

	// 	// checks to see if the function returns the 
	// 	// previously defined http.get() to cover the 
	// 	// branch inside getSystems
	// 	apiService.getSystems().then(function (res) {
	// 		expect(res.data).toBe('test');
	// 		expect(res.status).toBe(200);
	// 	});
	// });

	// it('should get /test/systems/parent_system_id/links?queryparams', function () {
	// 	var url = '/test/systems/randomParentID/links?account_number=540155&randomQueryParam=randomParam';
	// 	var query = {
	// 		randomQueryParam: 'randomParam'
	// 	};

	// 	apiService.getSystemLinks('randomParentID', query).then(function (res) {
	// 		expect(res.data).toBe('test');
	// 		expect(res.status).toBe(200);
	// 	});
	// });

	// it('should get /test/systems?account_number=540155&randomQueryParam=randomParam', function () {
	// 	var url = '/test/systems?account_number=540155&randomQueryParam=randomParam';
	// 	var query = {
	// 		randomQueryParam: 'randomParam'
	// 	};

	// 	apiService.getSystemsLatest(query).then(function (res) {
	// 		expect(res.data).toBe('test');
	// 		expect(res.status).toBe(200);
	// 	});
	// });

	// it('should get /test/systems/status?queryparams', function () {
	// 	var url = '/test/systems/status?account_number=540155&type=machine';

	// 	apiService.getSystemStatus(true).then(function (res) {
	// 		expect(res.data).toBe('test');
	// 		expect(res.status).toBe(200);
	// 	});

	// 	apiService.getSystemStatus(false).then(function (res) {
	// 		expect(res.data).toBe('test');
	// 		expect(res.status).toBe(200);
	// 	});
	// });

	// it('should get /test/systems?summary=true&queryparams', function () {
	// 	var url = '/test/systems?summary=true&account_number=540155&type=machine';
	// 	var groupUrl = '/test/systems?summary=true&account_number=540155&type=machine&group=randomGroup';

	// 	apiService.getSystemSummary().then(function (res) {
	// 		expect(res.data).toBe('test');
	// 		expect(res.status).toBe(200);
	// 	});

	// 	includeGroup = false;

	// 	// this tests the group/group.id if branch when
	// 	// there is no group id defined 
		
	// 	apiService.getSystemSummary().then(function (res) {
	// 		expect(res.data).toBe('test');
	// 		expect(res.status).toBe(200);
	// 	});
	// });

	// it('should get /test/systems/machine_id/reports?account_number=540155', function () {
	// 	var url = '/test/systems/randomID/reports?account_number=540155';

	// 	apiService.getSystemReports('randomID').then(function (res) {
	// 		expect(res.data).toBe('test');
	// 		expect(res.status).toBe(200);
	// 	});
	// });

	// it('should get /test/systems/machine_id/metadata?account_number=540155', function () {
	// 	var url = '/test/systems/randomID/metadata?account_number=540155';

	// 	apiService.getSystemMetadata('randomID').then(function (res) {
	// 		expect(res.data).toBe('test');
	// 		expect(res.status).toBe(200);
	// 	});
	// });

	// it('should delete a system at /test/systems/machine_id?account_number=540155', function () {
	// 	var url = '/test/systems/randomID?account_number=540155';

	// 	apiService.deleteSystem('randomID').then(function (res) {
	// 		expect(res.data).toBe('deleted');
	// 		expect(res.status).toBe(200);
	// 	});
	// });

	// it('should not be able to populate osp deployments when there is no data given in the response', function () {
	// 	var url = '/test/systems?account_number=540155&product_code=osp&role=cluster';

	// 	apiService.populateOSPDeployments().then(function (res) {
	// 		expect(res).toBe(undefined);
	// 		expect(filter.getSelectedOSPDeployment()).toEqual({});
	// 		expect(filter.getOSPDeployments()).toEqual([]);
	// 	});
	// });

	// it('should populate osp deployments when the selected osp deployment is undefined', function () {
	// 	var url = '/test/systems?account_number=540155&product_code=osp&role=cluster';
	// 	var data = {
	// 		systems: [{
	// 			display_name: 'randomName',
	// 			system_id: 'randomID'
	// 		}, {
	// 			display_name: 'randomName1',
	// 			system_id: 'randomID1'
	// 		}]
	// 	};
	// 	var dataWithSplice = {
	// 		systems: [{
 //                display_name: 'All Deployments',
 //                system_id: 'all'
 //            }, {
 //            	display_name: 'randomName',
	// 			system_id: 'randomID'
	// 		}, {
	// 			display_name: 'randomName1',
	// 			system_id: 'randomID1'
	// 		}]
	// 	};

	// 	apiService.populateOSPDeployments().then(function (res) {
	// 		expect(res).toBe(undefined);
	// 		expect(filter.getOSPDeployments()).toEqual(dataWithSplice.systems);
	// 		expect(filter.getSelectedOSPDeployment()).toEqual(dataWithSplice.systems[0]);
	// 	});
	// });

	// it('should populate osp deployments when the selected osp deployment is defined', function () {
	// 	var url = '/test/systems?account_number=540155&product_code=osp&role=cluster';
	// 	var data = {
	// 		systems: [{
	// 			display_name: 'randomName',
	// 			system_id: 'randomID'
	// 		}, {
	// 			display_name: 'randomName1',
	// 			system_id: 'randomID1'
	// 		}]
	// 	};
	// 	var dataWithSplice = {
	// 		systems: [{
 //                display_name: 'All Deployments',
 //                system_id: 'all'
 //            }, {
 //            	display_name: 'randomName',
	// 			system_id: 'randomID'
	// 		}, {
	// 			display_name: 'randomName1',
	// 			system_id: 'randomID1'
	// 		}]
	// 	};


	// 	apiService.populateOSPDeployments().then(function (res) {
	// 		expect(res).toBe(undefined);
	// 		expect(filter.getOSPDeployments()).toEqual(dataWithSplice.systems);
	// 		expect(filter.getSelectedOSPDeployment()).toEqual(dataWithSplice.systems[1]);
	// 	});
	// });

	// it('should not be able to populate docker hosts when there is no data given in the response', function () {
	// 	var url = '/test/systems?account_number=540155&product_code=docker&role=host';

	// 	apiService.populateDockerHosts().then(function (res) {
	// 		expect(res).toBe(undefined);
	// 		expect(filter.getSelectedDockerHost()).toEqual({});
	// 		expect(filter.getDockerHosts()).toEqual([]);
	// 	});
	// });

	// it('should populate docker hosts when the selected docker host is undefined', function () {
	// 	var url = '/test/systems?account_number=540155&product_code=docker&role=host';
	// 	var data = {
	// 		systems: [{
	// 			hostname: 'randomName',
	// 			system_id: 'randomID'
	// 		}, {
	// 			hostname: 'randomName1',
	// 			system_id: 'randomID1'
	// 		}]
	// 	};
	// 	var dataWithSplice = {
	// 		systems: [{
 //                hostname: 'All Hosts',
 //                system_id: 'all'
 //            }, {
 //            	hostname: 'randomName',
	// 			system_id: 'randomID'
	// 		}, {
	// 			hostname: 'randomName1',
	// 			system_id: 'randomID1'
	// 		}]
	// 	};

	// 	apiService.populateDockerHosts().then(function (res) {
	// 		expect(res).toBe(undefined);
	// 		expect(filter.getDockerHosts()).toEqual(dataWithSplice.systems);
	// 		expect(filter.getSelectedDockerHost()).toEqual(dataWithSplice.systems[0]);
	// 	});
	// });

	// it('should populate docker hosts when the selected docker host is defined', function () {
	// 	var url = '/test/systems?account_number=540155&product_code=docker&role=host';
	// 	var data = {
	// 		systems: [{
	// 			hostname: 'randomName',
	// 			system_id: 'randomID'
	// 		}, {
	// 			hostname: 'randomName1',
	// 			system_id: 'randomID1'
	// 		}]
	// 	};
	// 	var dataWithSplice = {
	// 		systems: [{
 //                hostname: 'All Hosts',
 //                system_id: 'all'
 //            }, {
 //            	hostname: 'randomName',
	// 			system_id: 'randomID'
	// 		}, {
	// 			hostname: 'randomName1',
	// 			system_id: 'randomID1'
	// 		}]
	// 	};

	// 	filter.setSelectedDockerHost(data.systems[0]);

	// 	apiService.populateDockerHosts().then(function (res) {
	// 		expect(res).toBe(undefined);
	// 		expect(filter.getDockerHosts()).toEqual(dataWithSplice.systems);
	// 		expect(filter.getSelectedDockerHost()).toEqual(dataWithSplice.systems[1]);
	// 	});
	// });

	// it('should return an undefined object', function () {
	// 	apiService.getProductSpecificData().then(function (res) {
	// 		expect(res).toBe(undefined);
	// 	});
	// });

	// it('should retrieve docker specific data', function () {
	// 	var url = '/test/systems?account_number=540155&product_code=docker&role=host';
	// 	var data = {
	// 		systems: [{
	// 			hostname: 'randomName',
	// 			system_id: 'randomID'
	// 		}, {
	// 			hostname: 'randomName1',
	// 			system_id: 'randomID1'
	// 		}]
	// 	};
	// 	var dataWithSplice = {
	// 		systems: [{
 //                hostname: 'All Hosts',
 //                system_id: 'all'
 //            }, {
 //            	hostname: 'randomName',
	// 			system_id: 'randomID'
	// 		}, {
	// 			hostname: 'randomName1',
	// 			system_id: 'randomID1'
	// 		}]
	// 	};

	// 	filter.setSelectedDockerHost(data.systems[0]);
	// 	filter.setSelectedProduct('docker');

	// 	apiService.getProductSpecificData().then(function (res) {
	// 		expect(res).toBe(undefined);
	// 		expect(filter.getDockerHosts()).toEqual(dataWithSplice.systems);
	// 		expect(filter.getSelectedDockerHost()).toEqual(dataWithSplice.systems[1]);
	// 	});
	// 	fetchBackend.flush()
	// });

	// it('should retrieve osp specific data', function () {
	// 	var url = '/test/systems?account_number=540155&product_code=osp&role=cluster';
	// 	var data = {
	// 		systems: [{
	// 			display_name: 'randomName',
	// 			system_id: 'randomID'
	// 		}, {
	// 			display_name: 'randomName1',
	// 			system_id: 'randomID1'
	// 		}]
	// 	};
	// 	var dataWithSplice = {
	// 		systems: [{
 //                display_name: 'All Deployments',
 //                system_id: 'all'
 //            }, {
 //            	display_name: 'randomName',
	// 			system_id: 'randomID'
	// 		}, {
	// 			display_name: 'randomName1',
	// 			system_id: 'randomID1'
	// 		}]
	// 	};

	// 	filter.setSelectedOSPDeployment(data.systems[0]);
	// 	filter.setSelectedProduct('osp');

	// 	fetchBackend.expect(url).respond(data);
	// 	apiService.getProductSpecificData().then(function (res) {
	// 		expect(res).toBe(undefined);
	// 		expect(filter.getOSPDeployments()).toEqual(dataWithSplice.systems);
	// 		expect(filter.getSelectedOSPDeployment()).toEqual(dataWithSplice.systems[1]);
	// 	});
	// 	fetchBackend.flush()
	// });

	// it('should get /test/system_types', function () {
	// 	var url = '/test/system_types';
	// 	var prevRes;

		
	// 	apiService.getSystemTypes().then(function (res) {
	// 		// makes sure that the systemtypes are initialized correctly
	// 		// as well as covering all the branches inside the initialization
	// 		// functions
	// 		for(var i = 0; i < res.length; i++) {
	// 			if (res[i].product_code === prods.docker.code) {
	// 			    if (res[i].role === prods.docker.roles.host.code) {
	// 			        expect(res[i].imageClass).toBe(prods.docker.roles.host.icon);
	// 			        expect(res[i].displayName).toBe(prods.docker.roles.host.fullName);
	// 			        expect(res[i].displayNameShort).toBe(prods.docker.shortName2 + ' ' +
	// 			            prods.docker.roles.host.shortName);
	// 			    } else if (res[i].role === prods.docker.roles.container.code) {
	// 			        expect(res[i].imageClass).toBe(prods.docker.roles.container.icon);
	// 			        expect(res[i].displayName).toBe(prods.docker.roles.container.fullName);
	// 			        expect(res[i].displayNameShort).toBe(prods.docker.roles.container.shortName);
	// 			    } else if (res[i].role === prods.docker.roles.image.code) {
	// 			        expect(res[i].imageClass).toBe(prods.docker.roles.image.icon);
	// 			        expect(res[i].displayName).toBe(prods.docker.roles.image.fullName);
	// 			        expect(res[i].displayNameShort).toBe(prods.docker.shortName2 + ' ' +
	// 			            prods.docker.roles.image.shortName);
	// 			    }
	// 			} else if (res[i].product_code === prods.osp.code) {
	// 			    if (res[i].role === prods.osp.roles.controller.code) {
	// 			        expect(res[i].imageClass).toBe(prods.osp.roles.controller.icon);
	// 			        expect(res[i].displayName).toBe(prods.osp.roles.controller.fullName);
	// 			        expect(res[i].displayNameShort).toBe(prods.osp.shortName + ' ' +
	// 			            prods.osp.roles.controller.shortName);
	// 			    } else if (res[i].role === prods.osp.roles.compute.code) {
	// 			        expect(res[i].imageClass).toBe(prods.osp.roles.compute.icon);
	// 			        expect(res[i].displayName).toBe(prods.osp.roles.compute.fullName);
	// 			        expect(res[i].displayNameShort).toBe(prods.osp.shortName + ' ' +
	// 			            prods.osp.roles.compute.shortName);
	// 			    } else if (res[i].role === prods.osp.roles.director.code) {
	// 			        expect(res[i].imageClass).toBe(prods.osp.roles.director.icon);
	// 			        expect(res[i].displayName).toBe(prods.osp.roles.director.fullName);
	// 			        expect(res[i].displayNameShort).toBe(prods.osp.shortName + ' ' +
	// 			            prods.osp.roles.director.shortName);
	// 			    } else if (res[i].role === prods.osp.roles.deployment.code) {
	// 			        expect(res[i].imageClass).toBe(prods.osp.roles.deployment.icon);
	// 			        expect(res[i].displayName).toBe(prods.osp.roles.deployment.fullName);
	// 			        expect(res[i].displayNameShort).toBe(prods.osp.shortName + ' ' +
	// 			            prods.osp.roles.deployment.shortName);
	// 			    }
	// 			} else if (res[i].product_code === prods.rhev.code) {
	// 			    if (res[i].role === prods.rhev.roles.manager.code) {
	// 			        expect(res[i].imageClass).toBe(prods.rhev.roles.manager.icon);
	// 			        expect(res[i].displayName).toBe(prods.rhev.roles.manager.fullName);
	// 			        expect(res[i].displayNameShort).toBe(prods.rhev.shortName + ' ' +
	// 			            prods.rhev.roles.manager.shortName);
	// 			    } else if (res[i].role === prods.rhev.roles.hypervisor.code) {
	// 			        expect(res[i].imageClass).toBe(prods.rhev.roles.hypervisor.icon);
	// 			        expect(res[i].displayName).toBe(prods.rhev.roles.hypervisor.fullName);
	// 			        expect(res[i].displayNameShort).toBe(prods.rhev.shortName + ' ' +
	// 			            prods.rhev.roles.hypervisor.shortName);
	// 			    } else if (res[i].role === prods.rhev.roles.deployment.code) {
	// 			        expect(res[i].imageClass).toBe(prods.rhev.roles.deployment.icon);
	// 			        expect(res[i].displayName).toBe(prods.rhev.roles.deployment.fullName);
	// 			        expect(res[i].displayNameShort).toBe(prods.rhev.shortName + ' ' +
	// 			            prods.rhev.roles.deployment.shortName);
	// 			    }
	// 			} else if (res[i].product_code === prods.rhel.code) {
	// 			    expect(res[i].imageClass).toBe(prods.rhel.icon);
	// 			    expect(res[i].displayName).toBe(prods.rhel.fullName);
	// 			    expect(res[i].displayNameShort).toBe(prods.rhel.shortName);
	// 			} else if (res[i].product_code === fakeProdCode) {
	// 				expect(res[i].imageClass).toBe(null);
	// 			    expect(res[i].displayName).toBe(null);
	// 			    expect(res[i].displayNameShort).toBe(null);
	// 			}
	// 		}

	// 		prevRes = res;
	// 	});

	// 	// Checks to see if the system types is the same as the last
	// 	// call to getSystemTypes since they have already been defined.
	// 	apiService.getSystemTypes().then(function (res) {
	// 		expect(res).toBe(prevRes);
	// 	});
	// 	fetchBackend.flush();
	// });
});