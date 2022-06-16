import {createContext, useReducer, useContext} from 'react'


const NotificationContext = createContext(null);

const initialState = {
    visible: false,
    type: 'success',
    message: ''
}

const notificationReducer = (state, {type, payload}) => {
    switch (type) {
        case 'RESET':
            return initialState;
        case 'NOTIFY': 
            return {
                ...state,
                visible: true,
                type: payload.type,
                message: payload.message
            };
        default:
            return state;
    }
}

const NotificationProvider = ({children}) => {

    const [state, dispatch] = useReducer(notificationReducer, initialState)

    return (
        <NotificationContext.Provider value={{state, dispatch}}>
            {children}
        </NotificationContext.Provider>
    )
}


const useNotificationContext = () => {
    return useContext(NotificationContext)
}

export {NotificationProvider, useNotificationContext}

