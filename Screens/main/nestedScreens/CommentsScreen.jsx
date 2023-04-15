import { useEffect, useState } from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView, TextInput, Dimensions, TouchableOpacity, Button, FlatList, SafeAreaView, Image } from "react-native";

import {firestore} from '../../../firebase/config'
import { useSelector } from "react-redux";
import { collection, onSnapshot, addDoc, setDoc, doc, updateDoc, getDoc, Timestamp} from "firebase/firestore";

import { AntDesign } from '@expo/vector-icons'; 
const CommentsScreen = ({route}) => {
    const [isKeyBoardActive, setIsBoardActive] = useState(false)
    const [time, setTime] = useState('')
    const [comment, setComment] = useState('')
    const [allComments, setAllComments] = useState([])
    const [dimensions, setdimensions] = useState(
        Dimensions.get("window").width - 20 * 2
    );
    const {nickname} = useSelector(state => state.auth)
    
    const {postId, photo} = route.params
    const date = new Date()
    console.log(date, 'datte')
    useEffect(() => {
        getAllPosts()
    }, [])

    const createPost = async () => {
        try {
            const date = new Date()
            setTime(date)
            // додаю "collection " в основну документі
        const newPostsRef = await doc(collection(firestore, "posts", postId, "comment"))
        const data = {
            comment,
            nickname,
            time: Timestamp.fromDate(new Date())
        }
        await setDoc(newPostsRef, data);
        // додаю "comment" в основну частину
const washingtonRef = doc(firestore, "posts", postId);
await updateDoc(washingtonRef, {
  comment: data.comment
});

setComment('')
        } catch (error) {
            
        }
}

// const func = (ms) => {
//     let sec = ms / 1000
//     , hours = sec / 3600  % 24
//     , minutes = sec / 60 % 60
//     , seconds = sec % 60
//   ;

//   return num(hours) + ":" + num(minutes) + ":" + num(seconds);
// }


const getAllPosts = async () => {
    try {
        await onSnapshot(collection(firestore, "posts", postId, 'comment'), (snapshot) => {
            let item = []
            snapshot.docs.forEach((doc) => {
                console.log(doc.data(), 'clg')
                item.push({ ...doc.data(), id: doc.id}) 
                return item;
            })
            setAllComments(item)
            console.log(item, 'item')
        })
    } catch (error) {
        
    }
}
console.log(allComments, 'allc')
    return (
        <View style={styles.container}>
            <View>
            <Image style={{width: '100%', height: 200, borderRadius: 8}} source={photo}/>
            </View>
            <SafeAreaView>
                <FlatList
                    data={allComments}
                    renderItem={({item}) => 
                    <View style={styles.commentContainer}>
                        <Text>{item.comment}</Text>
                        <Text>{new Date(item.time.seconds*1000).toUTCString().split(/ /)[4]}</Text>
                    </View>}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
            {/* <View style={styles.form}> */}
            <View style={{...styles.form, marginBottom: isKeyBoardActive ? 16 : 100, width: dimensions}}>
            <View style={{position: 'relative'}}> 
                <TextInput style={styles.input}    placeholder="Коментар" value={comment} onFocus={() => setIsBoardActive(true)}  onChangeText={setComment}> 
                    
                </TextInput> 
                <AntDesign onPress={createPost} name="arrowup" size={14} color="white" style={{position: 'absolute',right: 8,top: '35%',height: 34,width: 34,borderRadius: 50/2, backgroundColor: '#FF6C00', padding: 10}}/>
            </View> 
            </View>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        paddingTop: 32,
        paddingLeft: 16,
        paddingRight: 16,
        justifyContent: 'flex-end'
        
    },
    commentContainer: {
        borderWidth: 1,
        marginHorizontal: 16,
        padding: 16,
        backgroundColor:'rgba(0, 0, 0, 0.03)',
        borderRadius: 6,
        marginBottom: 24,
    },
    
    name: {
        // fontFamily: 'RobotoMedium',
        fontSize: 16,
        lineHeight: 19,
        marginBottom: 10,
        color: '#BDBDBD',
    },
    form: {
        // marginBottom: 100
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 100,
        borderColor: '#E8E8E8',
        backgroundColor: '#F6F6F6',
        width: '100%',
        paddingLeft: 16,
        paddingRight: 16,
        marginTop: 16,
        // fontFamily: 'RobotoRegular',
        fontSize: 16,
    }
})

export default CommentsScreen;





