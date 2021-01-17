// Defines the redux reducer for the web page toast.
interface ToastState {
    message: string,    // Message to be displayed.
    time: number,       // Time in milliseconds for toast to be displayed.
}
const toastListener = (state: ToastState = {
    message: "",
    time: 2500,
}, action: any) => {
    // Redux actions
    switch (action.type) {
        case 'toast/display':
            // Get values, default if not provided.
            const message = action.payload.message || "";
            const time = action.payload.time || 2500;
            state = {
                ...state,
                message: message,
                time: time,
            }
            // Attempt to display the message
            if (document) {
                const toast = document.getElementById("toast");
                document.documentElement.style.setProperty('--toast-length', time + "ms");
                if (toast) {
                  toast.innerHTML = message;
                  toast.className = "show";
                  setTimeout(() => { toast.className = ""; }, time + 500);
                }
            }
        default:
            break;
    }

    return state;
}

export default toastListener;