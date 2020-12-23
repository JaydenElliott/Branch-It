// Defines actions that can be taken on the relevant state
export const setSize = (size: number) => {
    return {
        type: 'sideBar/resize',
        payload: size,
    }
}