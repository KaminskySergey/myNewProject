import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged } from "firebase/auth";
import {auth} from '../../../firebase/config'
import {authSlice} from './authReducer'
// const auth = getAuth();
 


export const authSignUpUser = ({name, email, password}) => async (dispatch, getState) => {
    const state = {name, email, password}
    // console.log(state, 'state')
    
    try {
    await createUserWithEmailAndPassword(auth, state.email, state.password)
    
    const user = await auth.currentUser
    console.log(user)
    
    await updateProfile(user, {
        displayName: name
        
      }).then(() => {
        
        dispatch(authSlice.actions.updateUserProfile({
            userId: user.uid,
            nickname: user.displayName
        }))
      }).catch((error) => {
         console.log("Не вдалося оновити профіль")
      });
} catch (error) {
        console.log('errrrrrrrrrr')
}
}

export const authSignInUser = ({email, password}) => async (dispatch, getState) => {
    const state = {email, password}
    console.log(state, 'state')
    
    try {
    const user = await signInWithEmailAndPassword(auth, state.email, state.password)
    console.log(user.user, 'user')
} catch (error) {
        console.log('errrrrrrrrrr')
        console.log(error.message, 'message')
}
}

export const authSignOutUser = () => async (dispatch, getState) => {
    try {
        await auth.signOut()
        dispatch(authSlice.actions.authLogOut())
    } catch (error) {
        console.log('errrrrrrrrrr')
    }
}


export const authStateChangeUser = () => async (dispatch, getState) => {
    try {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                
                dispatch(authSlice.actions.updateUserProfile({
                    userId: user.uid,
                    nickname: user.displayName
                }))

                dispatch(authSlice.actions.authStateChange({stateChange: true}))
            } 
          }); 
    } catch (error) {
        
    }
}