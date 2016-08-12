import URI from 'urijs';
import Promise from 'bluebird';
if (!('fetch' in window))
	require('fetch');