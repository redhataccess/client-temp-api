'use strict';
import URI from 'urijs';
import URITemplate from 'urijs/src/URITemplate';
import bbPromise from 'bluebird';
Promise = bbPromise;
Promise.config({
	warnings: false
})
if (!('fetch' in window))
	// *****DEV***** This will be changed to use es6 import if
	// a conditional import gets added as a standard in es6.
	require('fetch');