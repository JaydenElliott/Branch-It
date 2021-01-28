const axios = require("axios");

const config = require("../config/endpoint_config.json");
const loginEndpoint = config.backendEndpoints.login;
const usersEndpoint = config.backendEndpoints.users;

/**
 * Login to the backend
 * @param { email: string, password: string } credentials 
 * @returns { status: number, data: string, headers: object }
 */
export function login(credentials) {
  return axios
    .post(loginEndpoint, credentials)
    .then(res => {
      return { status: res.status, data: res.data, headers: res.headers };
    })
    .catch(err => {
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

/**
 * Retrieves user data.
 * @param email string - email of user
 * @returns { status: number, data: string, headers: object }
 */
export function get(email) {
  return axios
    .get(usersEndpoint + '/'+ email)
    .then(res => {
      return { status: res.status, data: res.data, headers: res.headers };
    })
    .catch(err => {
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

/**
 * Creates a new user in the backend.
 * @param { email: string, password: string } credentials
 * @returns { status: number, data: string, headers: object }
 */
export function create(credentials) {
  return axios
  .post(usersEndpoint, credentials)
  .then(res => {
    return { status: res.status, data: res.data, headers: res.headers };
  })
  .catch(err => {
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