const axios = require("axios");

const config = require("../config/endpoint_config.json");
const listsEndpoint = config.backendEndpoints.lists;


/**
 * Retrieve lists associated with user
 * @param email string of user's email
 * @returns { status: number, data: string, headers: object }
 */
export function get(email) {
    return axios
        .get(listsEndpoint + '/' + email)
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
 * Makes a request to create a list in the backend database
 * @param { email: string, list: object } listDetails 
 * @returns { status: number, data: string, headers: object }
 */
export function create(listDetails) {
    return axios
        .post(listsEndpoint, listDetails)
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