import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Keyboard, Dimensions, Button } from "react-native"
import { useEffect, useState } from "react"


import * as Font from "expo-font";
import AppLoading from 'expo-app-loading';




const loadFonts = async () => {
    await Font.loadAsync({
        'RobotoRegular': require('../assets/fonts/Roboto-Regular.ttf'),
        'RobotoMedium': require('../assets/fonts/Roboto-Medium.ttf'),
    })
}

const RegistrationScreen = () => {
    const [isKeyBoardActive, setIsBoardActive] = useState(false)
    const [isReady, setIsReady] = useState(false)
    
    const [dimensions, setdimensions] = useState(
        Dimensions.get("window").width - 20 * 2
      );
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const handleName = (value) => setName(value)
    const handleEmail = (value) => setEmail(value)
    const handlePassword = (value) => setPassword(value)
    
    useEffect(() => {
        const onChange = () => {
          const width = Dimensions.get("window").width - 20 * 2;
    
          setdimensions(width);
        };
        const dimensionsHandler = Dimensions.addEventListener("change", onChange);
        return () => {
            dimensionsHandler.remove();
        };
      }, []);

    const KeyboardHide = () => {
        setIsBoardActive(false)
        Keyboard.dismiss()
        console.log(`${name}, ${email}, ${password}`)
        setName('')
        setEmail('')
        setPassword('')
    }
    
    if (!isReady) {
        return <AppLoading startAsync={loadFonts} onFinish={() => setIsReady(true)} onError={() => console.warn}/>;
      }
      
    return (
        <>
        
        <View style={{...styles.container}}>
            <View style={styles.avatar}>
                {/* fotos */}
                
            </View>
                
            <View style={{ textAlign: 'center' , marginTop: 92, marginBottom: 17}}>
                    <Text style={styles.title}>Реєстрація</Text>
            </View>
            {/* form */}
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >

             <View style={{...styles.form, marginBottom: isKeyBoardActive ? 32 : 0, width: dimensions}}> 
                 <View> 
                     <TextInput style={styles.input} value={name} placeholder="Логін" onFocus={() => setIsBoardActive(true)} onChangeText={handleName}> 
                        
                     </TextInput>
                </View>
                <View> 
                    <TextInput style={styles.input}  value={email} placeholder="Електронна пошта"  onFocus={() => setIsBoardActive(true)} onChangeText={handleEmail}> 
                        
                    </TextInput> 
                </View> 
                <View style={{position: 'relative'}}> 
                     <TextInput style={{...styles.input, paddingRight: 128}} value={password} placeholder="Пароль" secureTextEntry={true} onFocus={() => setIsBoardActive(true)} onChangeText={handlePassword}> 
                     </TextInput> 
                     <View style={{position: "absolute", top: '47%', right: '5%', }}>
                     <Text style={{fontSize: 16, lineHeight: 19, color: '#1B4371', textDecorationLine: 'underline'}}>Показати</Text>
                     </View>
                 </View>  
                <TouchableOpacity  activeOpacity={0.8} style={styles.btn} > 
                     <Text style={styles.btnText}>Зареєструватися</Text> 
                 </TouchableOpacity>
                
            <TouchableOpacity activeOpacity={0.8} style={styles.loginBtn} onPress={KeyboardHide}> 
                     <Text style={styles.login}>У вас вже є aкаунт? Увійти</Text> 
            </TouchableOpacity>
            </View>
            </KeyboardAvoidingView>
        </View>
        </>
    )
}


const styles = StyleSheet.create({
container: {
    backgroundColor: '#FFFFFF', 
    borderTopLeftRadius: 25, 
    borderTopRightRadius: 25, 
    width: '100%',
    height: '67%', 
    // paddingLeft: 16, 
    // paddingRight: 16, 
    position: "relative",
    alignItems: 'center',
    // justifyContent: 'flex-end'
},
avatar: {
    position: 'absolute',
    top: -60, 
    // left: 120,
    
    backgroundColor: '#F6F6F6', 
    width: 130, 
    height: 120, 
    borderRadius: 16,
},
title: {
fontFamily: 'RobotoMedium',
fontStyle: 'normal',
fontWeight: '500',
fontSize: 30,
lineHeight: 35,
textAlign: 'center',
// letterSpacing: 0.01,
},
form: {
    // width: '100%'
    
},
input: {
height: 50,
borderWidth: 1,
borderRadius: 8,
borderColor: '#E8E8E8',
backgroundColor: '#F6F6F6',
width: '100%',
paddingLeft: 16,
paddingRight: 16,
marginTop: 16,
fontFamily: 'RobotoRegular',
fontSize: 16,

},
btn: {
    height: 50,
    backgroundColor: '#FF6C00',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 44,
    fontFamily: 'RobotoRegular',
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 16,
},
btnText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: '#FFFFFF',
fontSize: 16,
lineHeight: 19,
},
loginBtn: {
backgroundColor: 'transparent',
alignItems: 'center'
},
login: {
fontFamily: 'RobotoMedium',
fontSize: 16,
lineHeight: 19,
color: '#1B4371',
}

})


export default RegistrationScreen;
