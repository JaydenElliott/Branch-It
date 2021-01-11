import ListContainer from "../../components/listHandling/listContainer";

// Defines actions that can be taken on the relevant state
export const setSelected = (selected: ListContainer | undefined | null) => {
    return {
        type: 'lists/select',
        payload: selected,
    }
}

export const setLists = (lists: ListContainer[]) => {
    return {
        type: 'lists/update',
        payload: lists,
    }
}

export const updateSelected = (updatedSelected: ListContainer) => {
    return {
        type: 'selected/update',
        payload: updatedSelected,
    }
}