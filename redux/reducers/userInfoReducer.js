import { INFO_USER } from '../constants';

const initialState = {
    userId: '',
    firstName: '',
    lastName: '',
    profilImage: ''
}

const userInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case INFO_USER:
            return {
                userId: action.infos.userId,
                firstName: action.infos.firstName,
                lastName: action.infos.lastName,
                profilImage: action.infos.profilImage
            }
    
        default:
            return state
    }
}

export default userInfoReducer;