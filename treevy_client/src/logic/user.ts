import ListState from '../components/treevyList';

// API urls TODO: placeholders
const API_BASE_URL = "http://localhost:" + (process.env.PORT || 8080) + "/";
const API_RETRIEVE_URL = API_BASE_URL + "Retrieve/";
const API_REGISTER_URL = API_BASE_URL + "Retrieve/";

// Defines login/register format to be sent to the backend
interface UserDetails {
    username: string,
    password_hash: string
}

/**
 * Registers a user in the backend database
 * @param details UserDetails to register in backend
 * @returns true if successful, false if not and null otherwise
 */
const register = async (details: UserDetails) : Promise<boolean | null> => {
    // API POST request
    await fetch(API_REGISTER_URL, {
        method: 'POST',
        body: JSON.stringify(details),
        mode: "cors"    // For cross-origin requests
    })
    .then(res => {
        // Check operation success
        if (!res.ok) {
            res.text().then(err => console.log('Backend operations failed, status: ' + res.status + ' error: ' + err));
            return false;
        } else {
            // Successful
            return true;
        }
    }).catch(err => {
        // Failure to connect or other error
        console.log(err);
        return null;
    })

    return false;
}

/**
 * Attempts to login and retrieve to backend and retrieve user details
 * @param details UserDetails for retrieve request
 * @returns ListState[] if successful, null otherwise
 */
const retrieve = async (details: UserDetails) : Promise<ListState[] | null> => {
    let data : ListState[] = [];

    // API POST request
    await fetch(API_RETRIEVE_URL, {
        method: 'POST',
        body: JSON.stringify(details),
        mode: 'cors'    // For cross-origin requests
    })
    .then(res => {
        // Check operation success
        if (!res.ok) {
            res.text().then(err => console.log('Backend operations failed, status: ' + res.status + ' error: ' + err));
            return null;
        }

        res.json().then(json => data = json);
    })
    .catch(err => {
        // Failure to connect or other error
        console.log(err);
        return null;
    });

    return data;
}