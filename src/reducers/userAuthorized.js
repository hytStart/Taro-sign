import { TEST } from '@constants/userAuthorized.js'

const INITIAL_STATE = {
    stuId: 1,
}

export default function userAuthorized(state = INITIAL_STATE, action) {
    switch (action.type) {
        case TEST:
            return {
                ...state,
                stuId: 2222,
            }
        default:
            return state
    }
}
