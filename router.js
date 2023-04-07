
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
// icons
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import RegistrationScreen from './Screens/auth/RegistrationScreen';
import LoginScreen from './Screens/auth/LoginScreen';


import PostsScreen from './Screens/main/PostsScreen.jsx';
import CreatePostsScreen from './Screens/main/CreatePostsScreen';
import ProfileScreen from './Screens/main/ProfileScreen';

const AuthStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();


export const useRoute = (isAuth) => {
    if(!isAuth){
      return <AuthStack.Navigator>
  
      <AuthStack.Screen options={{headerShown: false}} name='Login' component={LoginScreen} />
      <AuthStack.Screen options={{headerShown: false}} name="Register" component={RegistrationScreen} />
    
    </AuthStack.Navigator>
    }
      return   <MainTab.Navigator screenOptions={{headerTitleAlign: 'center'}}  tabBarOptions={{activeTintColor: 'black', activeBackgroundColor: '#FF6C00', showLabel: false, tabStyle: {width: 70, heigth: 40, borderRadius: 20 }}}>
      <MainTab.Screen options={{
        tabBarIcon: ({focused, size, color}) => (<Ionicons name="md-grid-outline" size={24} color="black" />),
        headerRight: () => (<MaterialIcons  style={{paddingRight: 10, alignItems: 'center'}} name="logout" size={24} color="#BDBDBD"  />)
      }} name="PostsScreen" component={PostsScreen}/>
      
      <MainTab.Screen options={{
        tabBarIcon: ({focused, size, color}) => (<Ionicons name="add-outline"  size={24} color="black" />),
        headerLeft: () => (<AntDesign name="arrowleft" style={{paddingLeft: 10}} size={24} color="#BDBDBD" />),
      }} name="CreatePostsScreen" component={CreatePostsScreen}/>
      
      <MainTab.Screen options={{
        tabBarIcon: ({focused, size, color}) => (<Feather name="user" size={24}  color="black" />)
      }} name="ProfileScreen" component={ProfileScreen}/>
    
    </MainTab.Navigator>
  } 