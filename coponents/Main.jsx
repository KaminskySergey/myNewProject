import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from '@react-navigation/native';

import { useRoute } from '../router';
import { useState } from "react";

import {auth} from '../firebase/config'
import { onAuthStateChanged } from "firebase/auth";
import {authStateChangeUser} from '../Screens/redux/auth/authOperations'
import { useEffect } from "react";

const Main = () => {
    
    const dispatch = useDispatch()
    const {stateChange} = useSelector(state => state.auth)
    console.log(stateChange)
    
    
    useEffect(() => {
      dispatch(authStateChangeUser())
    }, [])
    const routing = useRoute(stateChange)
    // onAuthStateChanged(auth, (user) => {
    //     if (user) {
    //       setIsAuth(user)
          
    //       const uid = user.uid;
    //       console.log(uid, 'uid')
    //     } else {
          
    //     }
    //   }); 
    
    return (
        <NavigationContainer> 
      {routing}
        </NavigationContainer>
    )
}

export default Main;