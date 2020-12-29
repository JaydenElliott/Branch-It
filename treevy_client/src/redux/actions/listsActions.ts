import TreevyList from "../../components/listHandling/treevyList"

// Defines actions that can be taken on the relevant state
export const setSelected = (selected: TreevyList | undefined | null) => {
    return {
        type: 'lists/select',
        payload: selected,
    }
}

export const setLists = (lists: TreevyList[]) => {
    return {
        type: 'lists/update',
        payload: lists,
    }
}