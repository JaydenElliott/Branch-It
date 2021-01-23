const axios = require("axios");

const config = require("../../config/endpoint_config.json");
const loginEndpoint = config.backendEndpoints.login;

export function postLogin(credentials) {
  return axios
    .post(loginEndpoint, credentials)
    .then((res) => {
      return res.status;
    })
    .catch((err) => {
      // Failed to connect to the backend
      if (!err.response) {
        return err; // bad connection or not connected to server
      }
    });
}
