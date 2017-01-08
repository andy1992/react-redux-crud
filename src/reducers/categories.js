// a reducer takes in 2 things:
// 1. the action (information about what happened)
// 2. copy of current state

//import Constant from './../helpers/constants';

function categories(state = [], action) {
    //console.log('The post will change');
    //console.log(state, action);
    //switch(action.type) {
        /*case Constant.STORE_PRODUCT:
            const i = action.index;
            return [
                ...state.slice(0, i), // before the one we are updating
                {...state[i], likes: state[i].likes + 1},
                ...state.slice(i + 1), // after the one we are updating
            ]*/
    //    default:
    //        return state;
    //}
    return state;
}

export default categories;