import { firebase, googleProvider } from '../firebase/firebase';


export const login = (uid) => {
    return {
        type: 'LOGIN',
        uid
    }
};

export const logout = () => {
    return {
        type: 'LOGOUT'
    }
}

export const startLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleProvider);
    }
}

export const startLogOut = () => {
    return () => {
        return firebase.auth().signOut();
    }
}