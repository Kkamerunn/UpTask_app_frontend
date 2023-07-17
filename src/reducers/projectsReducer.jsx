import {
    GET_PROJECTS,
    GET_PROJECTS_SUCCESS,
    GET_PROJECTS_ERROR
} from '../types' 

const initialState = {
    projects: [],
    project: {},
    task: {},
    alert: {},
    modalForm: false,
    deleteTaskModal: false,
    collaborator: {},
    deleteCollaboratorModal: false,
    searcher: false,
    loading: false,
    error: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case AUTHENTICATE_USER:
            return {
                ...state,
                loading: action.payload
            }
        case AUTHENTICATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                auth: action.payload
            }
        case AUTHENTICATE_USER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case SIGNOUT_USER:
            return {
                ...state,
                auth: {}
            }
        default:
            return state
    }
}