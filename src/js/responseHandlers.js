/**
 * Checks to see if the http request is valid and 
 * throws an error if it is not.
 * 
 * @param  {Object} response  The http(fetch) response object.
 * @return {Promise}          The returned object from the 
 *                            http fetch request.
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
  }
}

/**
 * Returns the response data as a JSON object
 * @param  {Object} response The http(fetch) response object.
 * @return {Promise}         The http(fetch) response object data
 *                           as a JSON object.
 */
function parseJSON(response) {
    return response.json();
}

/**
 * Formats the returned http fetch response data to make
 * it compatible with angularjs $http response format.
 * 
 * @param  {Object}   json Data from http(fetch) response.
 * @return {Promise}       Data from http(fetch) response
 *                         in the return format of angularjs's
 *                         $http response.
 */
function formatJSON(response) {
  response.data = response.json();
  return response;
}

/**
 * handles any error encountered during http(fetch) requests.
 * 
 * @param  {Error}  error The error thrown by the http(fetch) request.
 */
function handleError(error) {
  console.log('request failed', error.statusText);
  throw error;
}