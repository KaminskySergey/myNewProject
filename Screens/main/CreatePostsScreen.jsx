import { Camera } from "expo-camera";
import { StyleSheet, View, Text, TouchableOpacity, Image, KeyboardAvoidingView, TextInput, Dimensions, Keyboard } from "react-native";



import { ref, getDownloadURL, uploadBytes  } from "firebase/storage";

import {storage, firestore} from '../../firebase/config'
import { collection, addDoc } from "firebase/firestore"; 
import * as Location from 'expo-location';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";


const CreatePostsScreen = ({navigation}) => {
    const [isKeyBoardActive, setIsBoardActive] = useState(false)
    const [camera, setCamera] = useState(null)
    const [photo, setPhoto] = useState('')
    const [name, setName] = useState('')
    const [nameLocation, setNameLocation] = useState('')
    const [location, setLocation] = useState(null);
    const [currentUrl, setCurrentUrl] = useState('')
    const [dimensions, setdimensions] = useState(
        Dimensions.get("window").width - 20 * 2
      );
    
      const { userId, nickname } = useSelector((state) => state.auth)

useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let locationRef = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest, maximumAge: 10000});
      setLocation(locationRef);
    })();
  }, []);


    const takeFoto = async () => {
        try {
            const foto = await camera.takePictureAsync()
            
            console.log(foto.uri, ']]]]]]]]]]]]]]]]]')
            setPhoto(foto.uri)
            console.log(photo, 'в функции photo')
            console.log(name, 'в функции name')
            console.log(nameLocation, 'в функции nameLocation')
            
        } catch (error) {
            console.log('не працює на телефоні')
        }
        
    }
    const submmitFoto = () => {
        // uploadPhotoToServer()
        uploadPostToServer()
        console.log(navigation, 'navigation')
        navigation.navigate('HomeDefault', {photo})
        setIsBoardActive(false)
        Keyboard.dismiss()
        setName('')
        setNameLocation('')
        setPhoto('')
        console.log('photo', photo)
        console.log('current', currentUrl)
    }
    
    
    const uploadPostToServer = async () => {
        try {
            const photo = await uploadPhotoToServer()
            console.log(photo, 'bb')
            
            const docRef = await addDoc(collection(firestore, "posts"), {
              name,
              location,
              nameLocation,
              photo,
              user: {
                userId,
                nickname,
              }

              
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (err) {
            console.error("Error adding document: ", err);
          }
    }

    const uploadPhotoToServer = async () => {
        try {
            const response = await fetch(photo)
            
            const file = await response.blob()
            console.log(file, 'file')
            const id = Date.now().toString()
            
            const mountainsRef = await ref(storage, `postsImage/${id}`);
            const uploadTask = await uploadBytes(mountainsRef, file);

            const currentURL = await getDownloadURL(uploadTask.ref).then((url) => {
                return url
            })
            console.log(currentURL, 'current')
            return currentURL
            
            } catch (error) {
            
        }
    }
    
    
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

    const handleChangeName = (value) => setName(value)
    const handleChangeNameLocation = (value) => setNameLocation(value)
    
    
    return (
        <>
        <View style={styles.container}>
            <Camera style={styles.camera} ref={setCamera}>
                {photo && (
                    <View style={styles.photoContainer}>
                        <Image source={{uri: photo}} style={{width: '100%', height: '90%'}}/>
                    </View>
                )}
                <TouchableOpacity onPress={takeFoto} style={styles.button}>
                    <Text style={{color: '#fff'}}>
                    <MaterialIcons name="photo-camera" size={24} color="#fff" />
                    </Text>
                </TouchableOpacity>
                
            </Camera>
            <View style={{marginBottom: 48}}> 
                <Text style={styles.name}>Редагувати фото</Text>
            </View>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
            <View style={{...styles.form, marginBottom: isKeyBoardActive ? 32 : 100, width: dimensions}}>
            <View style={{ borderBottomColor: '#E8E8E8', borderBottomWidth: 1, marginBottom: 32}}> 
                <TextInput style={styles.input}    placeholder="Ім'я" value={name} onFocus={() => setIsBoardActive(true)}  onChangeText={handleChangeName}> 
                    
                </TextInput> 
            </View> 
            <View style={{flexDirection: 'row', alignItems: 'center', borderBottomColor: '#E8E8E8', borderBottomWidth: 1, marginBottom: 32}}> 
            <MaterialCommunityIcons name="google-maps" size={24} color="#BDBDBD" />
                <TextInput style={{...styles.input, paddingLeft: 8}}   placeholder="Місце" value={nameLocation} onFocus={() => setIsBoardActive(true)} onChangeText={handleChangeNameLocation}> 
                
                </TextInput> 
            </View> 
            <TouchableOpacity disabled={photo.length === 0 && true} onPress={submmitFoto} style={{
                width: '100%',
                height: 51,
                borderRadius: 100,
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                alignItems: 'center',
                justifyContent: 'center',
                // backgroundColor: '#FF6C00',
                backgroundColor: `${photo.length === 0 ? '#E8E8E8' : '#FF6C00'}`,
            }}>
                    <Text style={{color: '#000'}}>
                    Опублікувати
                    </Text>
            </TouchableOpacity>
            </View>
            </KeyboardAvoidingView>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    
},
camera: {
    
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: '#000'
},
button: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
},
photoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#fff',
},
buttonPost: {
    // width: '100%',
    // height: 51,
    // borderRadius: 100,
    // backgroundColor: 'rgba(255, 255, 255, 0.3)',
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: '#FF6C00',
},

name: {
    fontFamily: 'RobotoMedium',
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 10,
    color: '#BDBDBD',
},
form: {
    marginBottom: 100
},
input: {
    padding: 10,
}
})

export default CreatePostsScreen;