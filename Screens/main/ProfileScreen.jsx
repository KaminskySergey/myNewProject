import { StyleSheet, StatusBar, View, Image, Text, ScrollViews, TextInput, TouchableOpacity, KeyboardAvoidingView, Keyboard, Dimensions, Button, Platform, ImageBackground, FlatList, ScrollView } from "react-native"
import { useEffect, useState } from "react"

import { collection, query, where, getDocs } from "firebase/firestore";

import {firestore} from '../../firebase/config'
import { useSelector } from "react-redux";

import { EvilIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AppLoading from 'expo-app-loading';




const loadFonts = async () => {
    await Font.loadAsync({
        'RobotoRegular': require('../../assets/fonts/Roboto-Regular.ttf'),
        'RobotoMedium': require('../../assets/fonts/Roboto-Medium.ttf'),
    })
}

const ProfileScreen = () => {
    const [isReady, setIsReady] = useState(false)
    const [posts, setPosts] = useState([])
    const {userId, nickname} = useSelector(state => state.auth)
    console.log(userId, 'ttt')

    useEffect(() => {
        getPostsAll()
        
    }, [])
    const getPostsAll = async () => {
        const q = query(collection(firestore, "posts"), where("user.userId", "==", userId));

        const querySnapshot = await getDocs(q);
        let item = []
        querySnapshot.forEach((doc) => {
            item.push({ ...doc.data()}) 
            return item;
        });
        setPosts(item)
    }

    if (!isReady) {
        return <AppLoading startAsync={loadFonts} onFinish={() => setIsReady(true)} onError={() => console.warn}/>;
      }
    return (
        <>
        
    <View  style={styles.cont}>
      
      <ImageBackground style={styles.image} source={require('../../assets/Berg.png')}>
        <View style={{...styles.container}}>
            <View style={styles.avatar}>
                {/* fotos */}
                
            </View>
            <View style={{ textAlign: 'center' , marginTop: 92, marginBottom: 16}}>
                <Text style={styles.title}>{nickname}</Text>
            </View> 

            <View style={{width: '100%', paddingLeft: 16, paddingRight: 16}}>
            <FlatList data={posts} keyExtractor={(item, idx) => idx.toString()} renderItem={({item}) => 
            
            <View style={{marginBotom: 32, width: '100%', height: 250 }}>
                <Image style={{width: '100%', height: 200, borderRadius: 8}} source={item.photo ? {uri: item.photo} : null}/>
                <View> 
                    <Text style={styles.name}>{item.name}</Text>
                </View>
                <View style={{flex: 1, flexDirection: "row", justifyContent: 'space-between'}}>
                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', flexDirection: "row"}}  activeOpacity={0.8}  onPress={() => navigation.navigate('CommentsScreen', {postId: item.id})}> 
                    <Text>
                     <EvilIcons  name="comment" size={24} color="#BDBDBD" />
                    </Text> 
                        <Text style={{color: '#BDBDBD'}}>0</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', flexDirection: "row"}}  activeOpacity={0.8} onPress={() => navigation.navigate('MapScreen', {location: item.location}) }> 
                 <Text>
                 <MaterialCommunityIcons name="google-maps" size={24} color="#BDBDBD" />
                </Text> 
                <Text style={{color: '#212121', textDecorationLine: 'underline'}}>{item.nameLocation}</Text>
                 </TouchableOpacity>
                </View>
            </View>}/>
            </View>
        </View >
    </ImageBackground>
    
    
      
      <StatusBar style="auto" />
    </View>
    
        </>
    )
}



export default ProfileScreen;





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
    height: '70%', 
    // paddingLeft: 16, 
    // paddingRight: 16, 
    position: "relative",
    alignItems: 'center',
    // justifyContent: 'flex-end'
    
},
avatar: {
    position: 'absolute',
    top: -60, 
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


})