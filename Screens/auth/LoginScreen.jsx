import { useEffect, useState } from "react"
import { StyleSheet, StatusBar, View, Image, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Keyboard, Dimensions, Button, Platform, ImageBackground, TouchableWithoutFeedback } from "react-native"

import * as Font from "expo-font";
import AppLoading from 'expo-app-loading';

const loadFonts = async () => {
    await Font.loadAsync({
        'RobotoRegular': require('../../assets/fonts/Roboto-Regular.ttf'),
        'RobotoMedium': require('../../assets/fonts/Roboto-Medium.ttf'),
    })
}

const LoginScreen = ({navigation}) => {
    const [isKeyBoardActive, setIsBoardActive] = useState(false)
    const [isReady, setIsReady] = useState(false)
    
    const [dimensions, setdimensions] = useState(
        Dimensions.get("window").width - 20 * 2
      );

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
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
        console.log(`${email}, ${password}`)
        
        setEmail('')
        setPassword('')
        // if(email.length === 0 || password.length === 0){
        //     return
        // }
        navigation.navigate('Home')
    }
    if (!isReady) {
        return <AppLoading startAsync={loadFonts} onFinish={() => setIsReady(true)} onError={() => console.warn}/>;
      }

    return (
        <>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={styles.cont}>
      
      <ImageBackground style={styles.image} source={require('../../assets/Berg.png')}>
        <View style={{...styles.container }}>
            <View>
                <Text style={styles.title}>Увійти</Text>
            </View>
        
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >

        <View style={{...styles.form, marginBottom: isKeyBoardActive ? 32 : 100, width: dimensions}}>
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
                 <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={KeyboardHide}> 
                     <Text style={styles.btnText}>Увійти</Text> 
                 </TouchableOpacity>

                 <TouchableOpacity activeOpacity={0.8} style={styles.registerBtn} onPress={() => navigation.navigate('Register')}> 
                     <Text style={styles.register}>Не має акаунта? Зареєструватися</Text>
            </TouchableOpacity>
        </View>

        </KeyboardAvoidingView>
        </View>
        </ImageBackground>
      
      
      <StatusBar style="auto" />
    </View>
    </TouchableWithoutFeedback>
        </>
    )
}

export default LoginScreen;



const styles = StyleSheet.create({
    cont: {
        flex: 1,
        backgroundColor: '#fff',
        
      },
      image: {
        flex: 1, 
        resizeMode: 'cover', 
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
    container: {
        backgroundColor: '#FFFFFF', 
        borderTopLeftRadius: 25, 
        borderTopRightRadius: 25, 
        width: '100%',
        height: '61%', 
        position: "relative",
        alignItems: 'center',
        paddingTop: 32,
        
      
    },
    title: {
        fontFamily: 'RobotoMedium',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 30,
        lineHeight: 35,
        textAlign: 'center',
        marginBottom: 33,
    },
    form: {
        marginBottom: 100
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
registerBtn: {
    backgroundColor: 'transparent',
    alignItems: 'center'
    },
    
register: {
    fontFamily: 'RobotoMedium',
    fontSize: 16,
    lineHeight: 19,
    color: '#1B4371',
    
    }
    
    
  });