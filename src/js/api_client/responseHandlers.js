function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function parseJSON(response) {
    return response.json();
}

function formatJSON(json) {
  return {
    data: json
  };
}

function promisifyJSON(json) {
  return nnPromise.resolve(json);
}

function handleError(error) {
    console.log('request faild', error);
}