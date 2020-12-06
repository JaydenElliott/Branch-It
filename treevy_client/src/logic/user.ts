import axios from "axios";

// API urls TODO: placeholders
const API_BASE_URL = "http://0.0.0.0:" + (process.env.PORT || 5000) + "/";
const API_LOGIN_URL = API_BASE_URL + "api/users/login";

// Defines login/register format to be sent to the backend
export interface LoginDetails {
  email: string;
  password: string;
}

export const loginRequest = async (details: LoginDetails): Promise<boolean | null> => {
  // API POST request
  return await axios.post(API_LOGIN_URL, details)
    .then((res: any) => {
      // Check response
      switch (res.status) {
        case 200: return true;  // Successful
        default: throw new Error("Something went wrong...");  // Something weird
      }
    })
    .catch((err: any) => {
      // Failure to connect or other error
      console.log(err.response)
      switch (err.response.status) {
        case 401: throw new Error("The password provided is incorrect");                              // Incorrect password
        case 400: throw new Error("Please provide an email and password");                            // Email or password was not provided
        case 404: throw new Error("The email address entered does not match any account");;           // Email does not exist in database
        case 500: throw new Error("Oops, our servers seem to be having a bit of difficulty. Sorry!")  // Internal server error
        default: throw new Error("Failed to connect, please check your connection and try again")     // Connection error
      }
    });
}

// /**
//  * Registers a user in the backend database
//  * @param details UserDetails to register in backend
//  * @returns true if successful, false if not and null otherwise
//  */
// const register = async (details: UserDetails): Promise<boolean | null> => {
//   // API POST request
//   await fetch(API_REGISTER_URL, {
//     method: "POST",
//     body: JSON.stringify(details),
//     mode: "cors", // For cross-origin requests
//   })
//     .then((res) => {
//       // Check operation success
//       if (!res.ok) {
//         res
//           .text()
//           .then((err) =>
//             console.log(
//               "Backend operations failed, status: " +
//                 res.status +
//                 " error: " +
//                 err
//             )
//           );
//         return false;
//       } else {
//         // Successful
//         return true;
//       }
//     })
//     .catch((err) => {
//       // Failure to connect or other error
//       console.log(err);
//       return null;
//     });

//   return false;
// };

// /**
//  * Attempts to login and retrieve to backend and retrieve user details
//  * @param details UserDetails for retrieve request
//  * @returns ListState[] if successful, null otherwise
//  */
// const retrieve = async (details: UserDetails): Promise<ListState[] | null> => {
//   let data: ListState[] = [];

//   // API POST request
//   await fetch(API_RETRIEVE_URL, {
//     method: "POST",
//     body: JSON.stringify(details),
//     mode: "cors", // For cross-origin requests
//   })
//     .then((res) => {
//       // Check operation success
//       if (!res.ok) {
//         res
//           .text()
//           .then((err) =>
//             console.log(
//               "Backend operations failed, status: " +
//                 res.status +
//                 " error: " +
//                 err
//             )
//           );
//         return null;
//       }

//       res.json().then((json) => (data = json));
//     })
//     .catch((err) => {
//       // Failure to connect or other error
//       console.log(err);
//       return null;
//     });

//   return data;
// };
