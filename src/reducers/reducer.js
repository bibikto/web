const { useReducer } = require("react")

const defaultState = {
    currentUser: {
        name: ""
    }
}

function reducer(state = defaultState , action) {
    switch(action.type){
        case "SET_USER":
            return {
                ...state,
                currentUser: action.payload
            }
            default: return state
    }
}

export default reducer