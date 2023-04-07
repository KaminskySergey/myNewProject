import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeDefault from '../main/nestedScreens/HomeDefault'
import CommentsScreen from '../main/nestedScreens/CommentsScreen'
import MapScreen from '../main/nestedScreens/MapScreen'

const NestedScreen = createNativeStackNavigator()

const PostsScreen = () => {
    return (
        
        <NestedScreen.Navigator>
            <NestedScreen.Screen name='HomeDefault' component={HomeDefault}/>
            <NestedScreen.Screen name="CommentsScreen" component={CommentsScreen}/>
            <NestedScreen.Screen name="MapScreen" component={MapScreen}/>
        </NestedScreen.Navigator>
        
    )
}


export default PostsScreen;