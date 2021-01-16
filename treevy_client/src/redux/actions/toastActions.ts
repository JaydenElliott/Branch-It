// Structures object correctly for the corresponding listener
export const displayToast = (message: string = "", time: number = 2500) => {
    return {
        type: "toast/display",
        payload: {
            message: message,
            time: time,
        }
    }
}