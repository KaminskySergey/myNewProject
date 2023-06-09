import { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, Image, TextInput, TouchableOpacity } from "react-native";

import { EvilIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Font from "expo-font";
import AppLoading from 'expo-app-loading';

import {firestore} from '../../../firebase/config'
import { collection, onSnapshot } from "firebase/firestore";



const loadFonts = async () => {
    await Font.loadAsync({
        'RobotoRegular': require('../../../assets/fonts/Roboto-Regular.ttf'),
        'RobotoMedium': require('../../../assets/fonts/Roboto-Medium.ttf'),
    })
}
const PostsScreen = ({route, navigation}) => {
    const [isReady, setIsReady] = useState(false)
    const [posts, setPosts] = useState([])
    const [comment, setComment] = useState([])
    
    

    const getAllPost = async () => {
        try {
            
            // get()
            await onSnapshot(collection(firestore, 'posts'), (snapshot) => {
            let item = []
            snapshot.docs.forEach((doc) => {
                console.log(doc.data(), 'clg')
                item.push({ ...doc.data(), id: doc.id}) 
                return item;
            })
            setPosts(item)
        })
        } catch (error) {
            
        }
};
    const getAllComment = async () => {
        // try {
        //     await onSnapshot(collection(firestore, 'posts', photo, "comment"), (snapshot) => {
        //         let item = []
        //         snapshot.docs.forEach((doc) => {
        //             console.log(doc.data(), 'clg')
        //             item.push({ ...doc.data(), id: doc.id}) 
        //             return item;
        //         })
        //         setComment(item)
        //     })
        // } catch (error) {
            
        // }
    }

    useEffect(() => {
        getAllPost()

        getAllComment()
    }, [])

// useEffect(() => {
//     if(route.params){
//         setPosts(pS => [...pS, route.params])

//     }
// }, [route.params])
// console.log(posts, 'posts')


console.log(comment, 'wewqwqweqweqweqweqwew')
    if (!isReady) {
        return <AppLoading startAsync={loadFonts} onFinish={() => setIsReady(true)} onError={() => console.warn}/>;
      }

    return (
        <>
        <View style={styles.container}>
            <FlatList data={posts} keyExtractor={(item, idx) => idx.toString()} renderItem={({item}) => 
            
            <View style={{marginBottom: 32, width: '100%', height: 250}}>
                <Image style={{width: '100%', height: 200}} source={item.photo ? {uri: item.photo} : null}/>
                <View> 
                    <Text style={styles.name}>{item.name}</Text>
                </View>
                <View style={{flex: 1, flexDirection: "row", justifyContent: 'space-between'}}>
                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', flexDirection: "row"}}  activeOpacity={0.8}  onPress={() => navigation.navigate('CommentsScreen', {postId: item.id, photo: item.photo})}> 
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
    name: {
        fontFamily: 'RobotoMedium',
        fontSize: 16,
        lineHeight: 19,
        marginBottom: 10,
        color: '#212121',
}
})

export default PostsScreen;