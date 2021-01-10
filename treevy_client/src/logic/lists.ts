import axios from "axios";
import { API_LIST_URL } from "./util";

/**
 * Gets all the non-deleted lists associated with an email.
 * @param email of user whose lists are to be retrieved.
 */
export const getLists = async (email: string) => {
    // API get request
    return await axios.get(API_LIST_URL, { params: {e: email}})
        .then((res: any) => {
            // Check response
            switch (res.status) {
                case 200: return res.data;  // Successful
                default: throw new Error("Something went wrong...");  // Something weird
            }
        })
        .catch((err: any) => {
            // Failed to connect to the backend
            if (!err.response) {
                throw new Error("Failed to connect, please check your connection and try again")
            }
    
            // Other error
            console.log(err.response)
            switch (err.response.status) {
                case 404: throw new Error("The email address entered does not match any account");;           // Email does not exist in database
                case 500: throw new Error("Oops, our servers seem to be having a bit of difficulty. Sorry!")  // Internal server error
                default: throw new Error("Something went wrong...")                                           // Something has gone wrong
            }
        });

}