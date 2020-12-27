import ListHandler from "../../components/listHandling/listHandler"

// Defines actions that can be taken on the relevant state

export const setSelected = (selected: ListHandler | undefined | null) => {
    return {
        type: 'lists/select',
        payload: selected,
    }
}

export const setLists = (lists: ListHandler[]) => {
    return {
        type: 'lists/update',
        payload: lists,
    }
}