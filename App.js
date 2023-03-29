import { StatusBar } from 'expo-status-bar';
import RegistrationScreen from './Screens/RegistrationScreen';
import { StyleSheet, Platform, View, ImageBackground, TouchableWithoutFeedback, Keyboard  } from 'react-native';
import LoginScreen from './Screens/LoginScreen';

export default function App() {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={styles.container}>
      
      <ImageBackground style={styles.image} source={require('./assets/Berg.png')}>
          <RegistrationScreen />
          {/* <LoginScreen /> */}
      </ImageBackground>
      
      
      <StatusBar style="auto" />
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  image: {
    flex: 1, 
    resizeMode: 'cover', 
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  
  
});
