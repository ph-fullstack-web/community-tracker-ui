import { useLocalStorage } from "hooks";
import { createContext, useReducer, useContext, useEffect } from "react"

const AuthContext = createContext();

const authState = {
    success: 'fail',
    error: '',
    loading: false,
    credentials: {}
}
const authReducer = (state, action) => {
    switch (action.type) {
        case "AUTH_LOADING": {
            return {
                ...state,
                loading: true
            }
        }
        case 'LOGIN': {
            const { success, data } = action.payload;
            return {
                ...state,
                loading: false,
                credentials: { ...data },
                success
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                loading: false,
                credentials: {}
            }
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

const AuthProvider = ({ children }) => {
    let persistedState = JSON.parse(localStorage.getItem('authKey'))
    if (!persistedState) {
        persistedState = authState
    }
    const [state, dispatch] = useReducer(authReducer, persistedState)

    //persist state to localstorage
    const {setValue} = useLocalStorage("authKey", {});
    useEffect(() => {
        setValue(state)
    }, [state])
    // NOTE: you *might* need to memoize this value
    // Learn more in http://kcd.im/optimize-context
    const value = { state, dispatch }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthProvider')
    }
    return context
}

export { AuthProvider, useAuthContext }