import {
    REGISTER,
    REGISTER_FAILED,
    REGISTER_SUCCESS
} from './../actions/userActions';

const INITIAL_STATE = {
    user: {}
};

export default function register(state = INITIAL_STATE, action) {
    let error;
    switch(action.type) {
        case REGISTER:
            return {
                ...state,
                response: null,
                loading: true,
                error: null
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                response: action.payload,
                loading: false,
                error: null
            };
        case REGISTER_FAILED:
            error = action.payload || {message: action.payload.message};
            return {
                ...state,
                response: null,
                loading: false,
                error: error
            };
        default:
            return state;
    }
}