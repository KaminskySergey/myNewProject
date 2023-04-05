
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



import { useRoute } from './router';

const AuthStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();
console.log(MainTab)


export default function App() {
  const routing = useRoute(true)

  return (
    <NavigationContainer> 
      {routing}
    </NavigationContainer>
      
  );
}

