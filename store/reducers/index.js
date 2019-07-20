import { 
    JOIN,
    PERSONAL,
    WORK,
    SUBMIT,
    GO,
    RESET } from '../types';

const initialState = {
    stage: 0,
    payload: {},
    groups: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case JOIN:
        case PERSONAL:
        case WORK:
        case SUBMIT:   
        case GO:
        case RESET:              
            const { stage, data, groups = [] } = action.payload;
            return {
                ...state,
                stage,
                payload: {
                    ...data
                },
                groups
            };
        default:
            return state;
    }
}
