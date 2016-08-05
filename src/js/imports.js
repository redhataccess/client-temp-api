import 'fetch';
import URI from 'urijs';
import 'babel/browser-polyfill';
import nnPromise from 'bluebird'; // nnPromise = non native Promise
//import {polyfill} from 'es6-promise';
fetch.Promise = nnPromise