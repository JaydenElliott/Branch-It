const axios = require("axios");

const config = require("../../config/endpoint_config.json");
const loginEndpoint = config.backendEndpoints.login;

export function postLogin(credentials) {
  return axios
    .post(loginEndpoint, credentials)
    .then((res) => {
      return { status: res.status, data: res.data };
    })
    .catch((err) => {
      // Check that a response was received
      if (err.response) {
        return { status: err.response.status, data: err.response.data, headers: err.response.headers }
      } else if (err.request) {
        // Request made but no response, most likely a connection failure.
        return { status: 503, data: 'Service unavailable' }
      } else {
        // Something else happened.
        console.log(err);
        return { data: 'Something went wrong...' }
      }
    });
}